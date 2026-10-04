import React, { useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import VideoScreenMesh from '../VideoScreenMesh';

/**
 * Scene 3: Floating Astronaut
 * An astronaut floats in zero-g holding a futuristic cyber tablet that displays the project video.
 */
export default function FloatingAstronautScene({
  texture,
  isReady,
  prefersReducedMotion = false
}) {
  const wholeGroupRef = useRef();
  const astronautRef = useRef();
  const tabletRef = useRef();

  useFrame(({ clock }) => {
    if (prefersReducedMotion) return;
    const t = clock.getElapsedTime();

    // Zero-g overall drifting
    if (wholeGroupRef.current) {
      wholeGroupRef.current.position.y = Math.sin(t * 1.3) * 0.04;
    }

    // Astronaut playful zero-g tilt & bobbing
    if (astronautRef.current) {
      astronautRef.current.position.y = Math.sin(t * 1.5) * 0.03;
      astronautRef.current.rotation.z = Math.sin(t * 0.8) * 0.04;
      astronautRef.current.rotation.y = Math.sin(t * 0.6) * 0.05;
    }

    // Tablet micro-motion relative to hands
    if (tabletRef.current) {
      tabletRef.current.position.y = Math.sin(t * 1.5 + 0.3) * 0.02;
      tabletRef.current.rotation.y = -0.15 + Math.sin(t * 0.7) * 0.03;
    }
  });

  return (
    <group ref={wholeGroupRef} position={[0, -0.05, 0]}>
      {/* ── 1. Floating Astronaut Character (Procedural Three.js) ── */}
      <group ref={astronautRef} position={[-1.25, -0.15, 0]}>
        {/* Helmet Sphere */}
        <mesh position={[0, 0.72, 0]}>
          <sphereGeometry args={[0.34, 32, 32]} />
          <meshStandardMaterial
            color="#f8fafc"
            roughness={0.3}
            metalness={0.1}
          />
        </mesh>

        {/* Visor (Dark Obsidian Tinted with Golden Sheen) */}
        <mesh position={[0.12, 0.72, 0.16]} rotation={[0, 0.4, 0]}>
          <sphereGeometry args={[0.22, 24, 24, 0, Math.PI, 0, Math.PI]} />
          <meshStandardMaterial
            color="#0f172a"
            roughness={0.1}
            metalness={0.95}
          />
        </mesh>

        {/* Visor Golden Accent Border Rim */}
        <mesh position={[0.13, 0.72, 0.17]} rotation={[0, 0.4, 0]}>
          <ringGeometry args={[0.18, 0.22, 24]} />
          <meshBasicMaterial color="#38bdf8" side={THREE.DoubleSide} />
        </mesh>

        {/* Backpack / Life Support System (PLSS) */}
        <mesh position={[-0.22, 0.28, -0.05]}>
          <boxGeometry args={[0.26, 0.52, 0.34]} />
          <meshStandardMaterial
            color="#e2e8f0"
            roughness={0.5}
            metalness={0.3}
          />
        </mesh>

        {/* Torso Suit (White Spacesuit) */}
        <mesh position={[0, 0.25, 0]}>
          <capsuleGeometry args={[0.24, 0.38, 16, 24]} />
          <meshStandardMaterial
            color="#f1f5f9"
            roughness={0.65}
            metalness={0.08}
          />
        </mesh>

        {/* Chest Control Console */}
        <mesh position={[0.08, 0.32, 0.2]}>
          <boxGeometry args={[0.16, 0.14, 0.04]} />
          <meshStandardMaterial color="#334155" metalness={0.8} roughness={0.3} />
        </mesh>
        <mesh position={[0.08, 0.32, 0.22]}>
          <planeGeometry args={[0.12, 0.08]} />
          <meshBasicMaterial color="#38bdf8" />
        </mesh>

        {/* Left Arm (Reaching forward to hold tablet) */}
        <group position={[0.15, 0.35, 0.12]} rotation={[0.4, 0.6, -0.3]}>
          <mesh position={[0.28, 0, 0]}>
            <capsuleGeometry args={[0.08, 0.36, 12, 16]} />
            <meshStandardMaterial color="#f1f5f9" roughness={0.65} />
          </mesh>
          {/* Glove Hand */}
          <mesh position={[0.48, 0, 0]}>
            <sphereGeometry args={[0.09, 16, 16]} />
            <meshStandardMaterial color="#64748b" metalness={0.5} roughness={0.4} />
          </mesh>
        </group>

        {/* Right Arm (Reaching forward to support tablet bottom) */}
        <group position={[0.12, 0.12, 0.14]} rotation={[0.2, 0.5, -0.2]}>
          <mesh position={[0.28, 0, 0]}>
            <capsuleGeometry args={[0.08, 0.34, 12, 16]} />
            <meshStandardMaterial color="#f1f5f9" roughness={0.65} />
          </mesh>
          {/* Glove Hand */}
          <mesh position={[0.46, 0, 0]}>
            <sphereGeometry args={[0.09, 16, 16]} />
            <meshStandardMaterial color="#64748b" metalness={0.5} roughness={0.4} />
          </mesh>
        </group>

        {/* Left Leg (Zero-G floating drift) */}
        <group position={[-0.08, -0.16, 0]} rotation={[0.3, 0, -0.1]}>
          <mesh position={[0, -0.28, 0]}>
            <capsuleGeometry args={[0.1, 0.36, 12, 16]} />
            <meshStandardMaterial color="#f1f5f9" roughness={0.65} />
          </mesh>
          {/* Boot */}
          <mesh position={[0.04, -0.48, 0.04]}>
            <boxGeometry args={[0.13, 0.1, 0.22]} />
            <meshStandardMaterial color="#475569" metalness={0.6} roughness={0.3} />
          </mesh>
        </group>

        {/* Right Leg (Zero-G floating drift) */}
        <group position={[0.12, -0.16, 0]} rotation={[-0.2, 0.1, 0.15]}>
          <mesh position={[0, -0.28, 0]}>
            <capsuleGeometry args={[0.1, 0.36, 12, 16]} />
            <meshStandardMaterial color="#f1f5f9" roughness={0.65} />
          </mesh>
          {/* Boot */}
          <mesh position={[0.04, -0.48, 0.04]}>
            <boxGeometry args={[0.13, 0.1, 0.22]} />
            <meshStandardMaterial color="#475569" metalness={0.6} roughness={0.3} />
          </mesh>
        </group>
      </group>

      {/* ── 2. Futuristic Tablet Screen Held by Astronaut (Standardized x=0, y=0.08 net, z=0.0) ── */}
      <group ref={tabletRef} position={[0, 0.13, 0.0]}>
        {/* Tablet Outer Cyber Chassis */}
        <mesh position={[0, 0, -0.02]}>
          <boxGeometry args={[2.46, 1.44, 0.05]} />
          <meshStandardMaterial
            color="#0f172a"
            metalness={0.85}
            roughness={0.25}
          />
        </mesh>

        {/* Glowing Tablet Border Accent Frame */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[2.5, 1.48, 0.02]} />
          <meshBasicMaterial
            color="#38bdf8"
            transparent
            opacity={0.3}
          />
        </mesh>

        {/* Corner Grip Bumpers (Tablet rugged protective corners) */}
        {[
          [-1.21, 0.7],
          [1.21, 0.7],
          [-1.21, -0.7],
          [1.21, -0.7]
        ].map(([cx, cy], i) => (
          <mesh key={i} position={[cx, cy, 0.01]}>
            <boxGeometry args={[0.12, 0.12, 0.06]} />
            <meshStandardMaterial color="#0284c7" metalness={0.7} roughness={0.3} />
          </mesh>
        ))}

        {/* Video Screen on the Tablet */}
        <VideoScreenMesh
          texture={texture}
          isReady={isReady}
          width={2.35}
          height={1.32}
          glowColor="#38bdf8"
          brightness={1.08}
        />
      </group>
    </group>
  );
}
