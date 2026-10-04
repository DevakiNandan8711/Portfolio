import React, { useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import VideoScreenMesh from '../VideoScreenMesh';

/**
 * Scene 4: Spaceship Cockpit / Starship Flight Deck (Staynest)
 * 
 * An immersive futuristic spacecraft cockpit looking out at deep space.
 * Features dual pilot flight control joysticks, glowing dashboard instruments,
 * and the main panoramic cockpit flight display screen showing the project.
 */
export default function SpaceshipCockpitScene({
  texture,
  isReady,
  prefersReducedMotion = false
}) {
  const cockpitRef = useRef();
  const leftJoyRef = useRef();
  const rightJoyRef = useRef();
  const hudGlowRef = useRef();

  useFrame(({ clock }) => {
    if (prefersReducedMotion) return;
    const t = clock.getElapsedTime();

    // Gentle starship cruising inertia
    if (cockpitRef.current) {
      cockpitRef.current.position.y = Math.sin(t * 1.2) * 0.03;
      cockpitRef.current.rotation.z = Math.sin(t * 0.5) * 0.015;
      cockpitRef.current.rotation.y = Math.sin(t * 0.7) * 0.02;
    }

    // Pilot control joysticks subtle micro-adjustments
    if (leftJoyRef.current) {
      leftJoyRef.current.rotation.x = Math.sin(t * 1.5) * 0.08;
      leftJoyRef.current.rotation.z = Math.cos(t * 1.1) * 0.06;
    }
    if (rightJoyRef.current) {
      rightJoyRef.current.rotation.x = Math.sin(t * 1.3) * 0.07;
      rightJoyRef.current.rotation.z = -Math.cos(t * 1.0) * 0.05;
    }

    // HUD neon glow pulse
    if (hudGlowRef.current) {
      hudGlowRef.current.material.opacity = 0.35 + Math.sin(t * 3.0) * 0.15;
    }
  });

  return (
    <group ref={cockpitRef} position={[0, -0.05, 0]}>
      {/* ── 1. Main Cockpit Flight Display Screen (Standardized x=0, y=0.08 net, z=0.0) ── */}
      <group position={[0, 0.13, 0]}>
        {/* Reinforced Cockpit Windshield Frame Backplate */}
        <mesh position={[0, 0, -0.04]}>
          <boxGeometry args={[2.46, 1.42, 0.08]} />
          <meshStandardMaterial
            color="#0b0f19"
            metalness={0.9}
            roughness={0.25}
          />
        </mesh>

        {/* Video Screen (Standardized 2.35 x 1.32) */}
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

      {/* ── 2. Cockpit Instrument Dashboard Console (Lower Deck) ── */}
      <group position={[0, -0.82, 0.25]} rotation={[-0.35, 0, 0]}>
        {/* Main Dashboard Deck Plate */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[2.6, 0.38, 0.65]} />
          <meshStandardMaterial
            color="#0f172a"
            metalness={0.88}
            roughness={0.25}
          />
        </mesh>

        {/* Dashboard Upper Rim Trim */}
        <mesh position={[0, 0.19, -0.3]}>
          <boxGeometry args={[2.64, 0.04, 0.08]} />
          <meshStandardMaterial color="#334155" metalness={0.9} />
        </mesh>

        {/* Illuminated Status Gauges / LED Instruments */}
        {[-0.6, -0.2, 0.2, 0.6].map((gx, gIdx) => (
          <mesh key={gIdx} position={[gx, 0.195, 0.05]}>
            <boxGeometry args={[0.22, 0.02, 0.14]} />
            <meshBasicMaterial
              color={gIdx === 1 ? '#10b981' : gIdx === 2 ? '#f59e0b' : '#38bdf8'}
              transparent
              opacity={0.85}
            />
          </mesh>
        ))}

        {/* ── Left Pilot Flight Control Joystick ── */}
        <group ref={leftJoyRef} position={[-0.95, 0.28, 0.1]}>
          {/* Base Mount Ring */}
          <mesh position={[0, -0.06, 0]}>
            <cylinderGeometry args={[0.09, 0.11, 0.06, 16]} />
            <meshStandardMaterial color="#1e293b" metalness={0.9} />
          </mesh>
          {/* Joystick Shaft */}
          <mesh position={[0, 0.12, 0]}>
            <cylinderGeometry args={[0.025, 0.025, 0.24, 12]} />
            <meshStandardMaterial color="#64748b" metalness={0.95} roughness={0.15} />
          </mesh>
          {/* Ergonomic Flight Grip Handle */}
          <mesh position={[0, 0.24, 0]}>
            <boxGeometry args={[0.06, 0.12, 0.08]} />
            <meshStandardMaterial color="#0b0f19" metalness={0.8} roughness={0.4} />
          </mesh>
          {/* Cyan Trigger Glow */}
          <mesh position={[0, 0.24, 0.045]}>
            <boxGeometry args={[0.03, 0.04, 0.02]} />
            <meshBasicMaterial color="#38bdf8" />
          </mesh>
        </group>

        {/* ── Right Pilot Throttle / Flight Joystick ── */}
        <group ref={rightJoyRef} position={[0.95, 0.28, 0.1]}>
          {/* Base Mount Ring */}
          <mesh position={[0, -0.06, 0]}>
            <cylinderGeometry args={[0.09, 0.11, 0.06, 16]} />
            <meshStandardMaterial color="#1e293b" metalness={0.9} />
          </mesh>
          {/* Joystick Shaft */}
          <mesh position={[0, 0.12, 0]}>
            <cylinderGeometry args={[0.025, 0.025, 0.24, 12]} />
            <meshStandardMaterial color="#64748b" metalness={0.95} roughness={0.15} />
          </mesh>
          {/* Ergonomic Flight Grip Handle */}
          <mesh position={[0, 0.24, 0]}>
            <boxGeometry args={[0.06, 0.12, 0.08]} />
            <meshStandardMaterial color="#0b0f19" metalness={0.8} roughness={0.4} />
          </mesh>
          {/* Cyan Trigger Glow */}
          <mesh position={[0, 0.24, 0.045]}>
            <boxGeometry args={[0.03, 0.04, 0.02]} />
            <meshBasicMaterial color="#38bdf8" />
          </mesh>
        </group>
      </group>
    </group>
  );
}
