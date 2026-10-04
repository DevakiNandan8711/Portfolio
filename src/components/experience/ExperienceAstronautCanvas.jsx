import React, { useRef, useEffect, useMemo, Suspense, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import * as SkeletonUtils from 'three/examples/jsm/utils/SkeletonUtils.js';
import { getTheme } from '../../themeConfig';
import { CanvasErrorBoundary } from '../ui/CanvasErrorBoundary';

/**
 * 3D Spacewalk Astronaut Model with Skinned Clone and Floating Animation
 */
function AstronautMesh({ currentTheme = 'orbital_sunrise' }) {
  const group = useRef();
  const ringRef = useRef();
  const satelliteRef = useRef();
  const theme = getTheme(currentTheme);

  const { scene, animations } = useGLTF('/models/astronaut.glb');

  // Clone with SkeletonUtils so bone weights and skins clone safely
  const clonedScene = useMemo(() => SkeletonUtils.clone(scene), [scene]);
  const mixer = useMemo(() => new THREE.AnimationMixer(clonedScene), [clonedScene]);

  // Play zero-g floating animation
  useEffect(() => {
    if (animations && animations.length > 0) {
      const clip =
        animations.find((a) => a.name.toLowerCase().includes('floating')) ||
        animations.find((a) => a.name.toLowerCase().includes('idle')) ||
        animations[0];

      if (clip) {
        const action = mixer.clipAction(clip);
        action.reset().fadeIn(0.5).play();
      }
    }

    return () => {
      mixer.stopAllAction();
    };
  }, [mixer, animations]);

  // Enhance suit materials and tinted obsidian helmet visor
  useEffect(() => {
    clonedScene.traverse((child) => {
      if (child.isMesh && child.material) {
        const mat = child.material;
        if (mat.map) mat.map.colorSpace = THREE.SRGBColorSpace;

        const geom = child.geometry;
        if (geom && !geom.boundingBox) geom.computeBoundingBox();
        const bb = geom?.boundingBox;
        const isVisor = bb && bb.max.y > 135 && bb.min.y > 110 && (bb.max.x - bb.min.x < 55);

        if (isVisor || mat.name?.toLowerCase().includes('visor')) {
          mat.color = new THREE.Color('#0a101d');
          mat.metalness = 0.94;
          mat.roughness = 0.08;
        } else {
          mat.metalness = 0.08;
          mat.roughness = 0.65;
        }
        mat.needsUpdate = true;
      }
    });
  }, [clonedScene]);

  // Continuous microgravity drift & orbital ring revolution
  useFrame((state, delta) => {
    mixer.update(delta);
    const t = state.clock.getElapsedTime();

    if (group.current) {
      // Gentle harmonic zero-g bobbing
      group.current.position.y = -1.15 + Math.sin(t * 0.8) * 0.035;
      group.current.rotation.z = Math.sin(t * 0.5) * 0.02;
    }

    if (ringRef.current) {
      ringRef.current.rotation.z = t * 0.15;
    }

    if (satelliteRef.current) {
      const satRadius = 1.35;
      satelliteRef.current.position.x = Math.cos(t * 0.6) * satRadius;
      satelliteRef.current.position.y = Math.sin(t * 0.6) * 0.25;
      satelliteRef.current.position.z = Math.sin(t * 0.6) * satRadius;
    }
  });

  return (
    <group>
      {/* 3D Spacewalk Astronaut */}
      <group ref={group} position={[0, -1.15, 0]} scale={1.12}>
        <primitive object={clonedScene} />
      </group>

      {/* Futuristic Orbital Telemetry Ring */}
      <group position={[0, 0, 0]} rotation={[Math.PI / 3, 0.2, 0]}>
        <mesh ref={ringRef}>
          <ringGeometry args={[1.32, 1.36, 64]} />
          <meshBasicMaterial
            color={theme.rimLeft || '#38bdf8'}
            side={THREE.DoubleSide}
            transparent
            opacity={0.35}
          />
        </mesh>

        {/* Orbiting Telemetry Micro-Satellite Beacon */}
        <mesh ref={satelliteRef}>
          <sphereGeometry args={[0.045, 16, 16]} />
          <meshStandardMaterial
            color={theme.rimRight || '#ffffff'}
            emissive={theme.rimLeft || '#38bdf8'}
            emissiveIntensity={2.0}
            roughness={0.2}
          />
        </mesh>
      </group>
    </group>
  );
}

/**
 * Procedural Celestial Starfield
 */
function ExperienceStarfield() {
  const [positions, colors] = useMemo(() => {
    const count = 180;
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const palette = [
      new THREE.Color('#ffffff'),
      new THREE.Color('#38bdf8'),
      new THREE.Color('#f59e0b')
    ];

    for (let i = 0; i < count; i++) {
      const r = 4 + Math.random() * 6;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);

      const color = palette[Math.floor(Math.random() * palette.length)];
      col[i * 3] = color.r;
      col[i * 3 + 1] = color.g;
      col[i * 3 + 2] = color.b;
    }

    return [pos, col];
  }, []);

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={positions.length / 3} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-color" count={colors.length / 3} array={colors} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.035} vertexColors transparent opacity={0.7} sizeAttenuation />
    </points>
  );
}

/**
 * Main 3D Canvas Container
 */
export default function ExperienceAstronautCanvas({ currentTheme = 'orbital_sunrise' }) {
  const theme = getTheme(currentTheme);
  const [hasWebGL, setHasWebGL] = useState(true);

  useEffect(() => {
    try {
      const canvas = document.createElement('canvas');
      const supported = !!(
        window.WebGLRenderingContext &&
        (canvas.getContext('webgl') || canvas.getContext('experimental-webgl') || canvas.getContext('webgl2'))
      );
      setHasWebGL(supported);
    } catch (e) {
      setHasWebGL(false);
    }
  }, []);

  if (!hasWebGL) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center">
        <span className="text-4xl mb-3">👨‍🚀</span>
        <span className="text-xs font-mono text-slate-400">Zero-G EVA Explorer Active</span>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full min-h-[460px] sm:min-h-[520px] lg:min-h-[620px] bg-transparent">
      <CanvasErrorBoundary>
        <Canvas
        camera={{ position: [0, 0.1, 3.4], fov: 42 }}
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance'
        }}
        className="w-full h-full cursor-grab active:cursor-grabbing bg-transparent"
      >
        <Suspense fallback={null}>
          {/* Dynamic Cosmic Lighting */}
          <ambientLight intensity={0.65} color="#e2e8f0" />
          <directionalLight position={[4, 5, 4]} intensity={1.5} color={theme.rimRight || '#ffffff'} />
          <directionalLight position={[-4, -3, -3]} intensity={0.8} color={theme.rimLeft || '#38bdf8'} />
          <pointLight position={[0, 1.5, 2]} intensity={0.7} color="#ffffff" distance={8} />

          {/* Starfield & Astronaut */}
          <ExperienceStarfield />
          <AstronautMesh currentTheme={currentTheme} />

          {/* User Interaction OrbitControls */}
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            autoRotate={true}
            autoRotateSpeed={0.9}
            minPolarAngle={Math.PI / 2.6}
            maxPolarAngle={Math.PI / 1.7}
            dampingFactor={0.06}
            enableDamping={true}
          />
        </Suspense>
        </Canvas>
      </CanvasErrorBoundary>
    </div>
  );
}
