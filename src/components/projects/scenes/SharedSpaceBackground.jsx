import React, { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

/**
 * Shared Space Background with procedural stars, cosmic lighting,
 * and 100% seamless transparency to blend with the global background.
 */
export default function SharedSpaceBackground({ isLowEnd = false, prefersReducedMotion = false }) {
  const starsRef = useRef();

  // Procedural star points
  const starCount = isLowEnd ? 180 : 450;
  const [starPositions, starColors] = useMemo(() => {
    const pos = new Float32Array(starCount * 3);
    const col = new Float32Array(starCount * 3);

    const palette = [
      new THREE.Color('#ffffff'),
      new THREE.Color('#93c5fd'), // soft blue
      new THREE.Color('#fef08a'), // warm starlight
      new THREE.Color('#c084fc')  // faint violet
    ];

    for (let i = 0; i < starCount; i++) {
      const r = 14 + Math.random() * 12;
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
  }, [starCount]);

  useFrame(({ clock }) => {
    if (prefersReducedMotion) return;
    const t = clock.getElapsedTime() * 0.03;
    if (starsRef.current) {
      starsRef.current.rotation.y = t * 0.2;
    }
  });

  return (
    <group>
      {/* Lighting Suite */}
      <ambientLight intensity={0.5} color="#e2e8f0" />
      <directionalLight position={[5, 7, 5]} intensity={1.2} color="#ffffff" />
      <directionalLight position={[-6, -3, -4]} intensity={0.4} color="#38bdf8" />
      <pointLight position={[0, 4, 3]} intensity={0.6} color="#ffffff" distance={15} />

      {/* Procedural Stars */}
      <points ref={starsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={starPositions.length / 3}
            array={starPositions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            count={starColors.length / 3}
            array={starColors}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={isLowEnd ? 0.07 : 0.055}
          vertexColors
          transparent
          opacity={0.85}
          sizeAttenuation
        />
      </points>
    </group>
  );
}
