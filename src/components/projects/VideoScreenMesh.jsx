import React, { useMemo, useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { VideoBlurShader } from './VideoShaderMaterial';

/**
 * Procedural Video Screen Mesh using custom Gaussian Blur Fragment Shader.
 */
export default function VideoScreenMesh({
  texture,
  width = 2.4,
  height = 1.35,
  blur = 1.5,
  curvature = 0.0,
  brightness = 1.05,
  vignette = 0.12,
  opacity = 1.0,
  cornerRadius = 0.06,
  isReady = true,
  glowColor = '#38bdf8',
  ...props
}) {
  const materialRef = useRef();

  // Create custom shader material with uniforms
  const shaderMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        uTexture: { value: texture },
        uResolution: { value: new THREE.Vector2(1920, 1080) },
        uBlur: { value: blur },
        uCurvature: { value: curvature },
        uVignette: { value: vignette },
        uBrightness: { value: brightness },
        uOpacity: { value: opacity }
      },
      vertexShader: VideoBlurShader.vertexShader,
      fragmentShader: VideoBlurShader.fragmentShader,
      transparent: opacity < 1.0,
      side: THREE.DoubleSide
    });
  }, []);

  // Update uniforms when props change
  useEffect(() => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTexture.value = texture;
      materialRef.current.uniforms.uBlur.value = blur;
      materialRef.current.uniforms.uCurvature.value = curvature;
      materialRef.current.uniforms.uVignette.value = vignette;
      materialRef.current.uniforms.uBrightness.value = brightness;
      materialRef.current.uniforms.uOpacity.value = opacity;
    }
  }, [texture, blur, curvature, vignette, brightness, opacity]);

  // Continuous frame update for HTML5 video textures
  useFrame(() => {
    if (materialRef.current && texture) {
      materialRef.current.uniforms.uTexture.value = texture;
      if (texture.image && texture.image.readyState >= 2) {
        texture.needsUpdate = true;
      }
    }
  });

  return (
    <group {...props}>
      {/* Sleek Bezel Frame */}
      <mesh position={[0, 0, -0.015]}>
        <boxGeometry args={[width + 0.08, height + 0.08, 0.03]} />
        <meshStandardMaterial
          color="#0f172a"
          metalness={0.85}
          roughness={0.25}
        />
      </mesh>

      {/* Screen Frame Border Accent Glow */}
      <mesh position={[0, 0, -0.005]}>
        <planeGeometry args={[width + 0.02, height + 0.02]} />
        <meshBasicMaterial
          color={glowColor}
          transparent
          opacity={0.35}
        />
      </mesh>

      {/* Actual Screen Plane with Video Texture */}
      <mesh position={[0, 0, 0.005]}>
        <planeGeometry args={[width, height, 16, 16]} />
        <primitive object={shaderMaterial} ref={materialRef} attach="material" />
      </mesh>

      {/* Glass Top Coat with High-Gloss Specular Sheen */}
      <mesh position={[0, 0, 0.008]}>
        <planeGeometry args={[width, height]} />
        <meshPhysicalMaterial
          roughness={0.05}
          metalness={0.1}
          transmission={0.4}
          ior={1.45}
          transparent
          opacity={0.18}
          color="#ffffff"
        />
      </mesh>
    </group>
  );
}
