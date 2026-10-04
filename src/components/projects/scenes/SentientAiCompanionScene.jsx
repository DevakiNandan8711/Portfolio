import React, { useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import VideoScreenMesh from '../VideoScreenMesh';

/**
 * Scene 6: Sentient Robotic AI Companion Droid (AI Personal Assistant)
 * Features a friendly levitating robotic AI companion droid with an expressive optical eye,
 * aura halo ring, and magnetic levitation thruster, floating beside the interactive video screen.
 */
export default function SentientAiCompanionScene({
  texture,
  isReady,
  prefersReducedMotion = false
}) {
  const companionRef = useRef();
  const eyeRef = useRef();
  const auraRef = useRef();

  useFrame(({ clock }) => {
    if (prefersReducedMotion) return;
    const t = clock.getElapsedTime();

    // Sentient Droid bobbing & zero-g curiosity tilt
    if (companionRef.current) {
      companionRef.current.position.y = 0.25 + Math.sin(t * 1.8) * 0.06;
      companionRef.current.rotation.y = Math.sin(t * 0.8) * 0.12;
      companionRef.current.rotation.z = Math.cos(t * 1.2) * 0.05;
    }

    // Optical Eye pulse
    if (eyeRef.current) {
      const pulse = 1.0 + Math.sin(t * 3.5) * 0.12;
      eyeRef.current.scale.set(pulse, pulse, 1);
    }

    // AI Core Aura rotation
    if (auraRef.current) {
      auraRef.current.rotation.z = t * 0.7;
    }
  });

  return (
    <group position={[0, -0.05, 0]}>
      {/* ── 1. Levitating Robotic AI Companion Droid (Right Side) ── */}
      <group ref={companionRef} position={[1.4, 0.25, 0.2]}>
        {/* Composite Core Shell */}
        <mesh>
          <sphereGeometry args={[0.36, 28, 28]} />
          <meshStandardMaterial
            color="#f8fafc"
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>

        {/* Central Black Visor Band */}
        <mesh rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.365, 0.365, 0.2, 28]} />
          <meshBasicMaterial color="#020617" />
        </mesh>

        {/* Expressive Glowing Optical Eye */}
        <mesh ref={eyeRef} position={[-0.08, 0, 0.36]}>
          <circleGeometry args={[0.09, 20]} />
          <meshBasicMaterial color="#38bdf8" />
        </mesh>

        {/* Floating Aura Halo Ring */}
        <mesh ref={auraRef} position={[0, 0, 0]}>
          <torusGeometry args={[0.52, 0.015, 12, 32]} />
          <meshBasicMaterial color="#38bdf8" transparent opacity={0.6} />
        </mesh>

        {/* Magnetic Thruster Glow underneath */}
        <mesh position={[0, -0.36, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <circleGeometry args={[0.11, 16]} />
          <meshBasicMaterial color="#38bdf8" transparent opacity={0.8} />
        </mesh>

        {/* Communication Antenna Node */}
        <mesh position={[0, 0.44, 0]}>
          <cylinderGeometry args={[0.015, 0.02, 0.18, 8]} />
          <meshStandardMaterial color="#64748b" metalness={0.9} />
        </mesh>
        <mesh position={[0, 0.54, 0]}>
          <sphereGeometry args={[0.035, 12, 12]} />
          <meshStandardMaterial color="#94a3b8" metalness={0.9} roughness={0.2} />
        </mesh>
      </group>


      {/* ── 3. Interactive Video Display Screen (Standardized x=0, y=0.08 net, z=0.0) ── */}
      <group position={[0, 0.13, 0]}>
        {/* Chassis Backplate Housing (Matches Cosmic Background) */}
        <mesh position={[0, 0, -0.04]}>
          <boxGeometry args={[2.46, 1.42, 0.08]} />
          <meshStandardMaterial
            color="#0b0f19"
            metalness={0.9}
            roughness={0.25}
          />
        </mesh>

        {/* Video Screen Mesh (Standardized 2.35 x 1.32) */}
        <VideoScreenMesh
          texture={texture}
          width={2.35}
          height={1.32}
          blur={1.5}
          isReady={isReady}
          glowColor="#38bdf8"
          position={[0, 0, 0.02]}
        />
      </group>
    </group>
  );
}
