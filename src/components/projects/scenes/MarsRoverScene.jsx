import React, { useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import VideoScreenMesh from '../VideoScreenMesh';

/**
 * Scene 1: Cyber Space Rover Explorer (Snap-Ai-Attendance)
 * 
 * Perfectly framed 3D Rover Explorer in zero-g deep space.
 * Both the entire Rover (chassis, 6 wheels, suspension, antenna, mast)
 * AND the entire Video Screen are 100% visible within the camera frustum without clipping.
 */
export default function MarsRoverScene({
  texture,
  isReady,
  prefersReducedMotion = false
}) {
  const roverGroupRef = useRef();
  const mastRef = useRef();
  const dishRef = useRef();
  const ledRef = useRef();

  useFrame(({ clock }) => {
    if (prefersReducedMotion) return;
    const t = clock.getElapsedTime();

    // Gentle zero-g floating and bank angle (matches Satellite & Astronaut)
    if (roverGroupRef.current) {
      roverGroupRef.current.position.y = Math.sin(t * 1.3) * 0.035;
      roverGroupRef.current.rotation.y = Math.sin(t * 0.6) * 0.04;
      roverGroupRef.current.rotation.z = Math.sin(t * 0.8) * 0.015;
    }

    // Mast micro-stabilization
    if (mastRef.current) {
      mastRef.current.rotation.y = Math.sin(t * 0.5) * 0.02;
    }

    // Telemetry dish slow scan
    if (dishRef.current) {
      dishRef.current.rotation.y = Math.sin(t * 0.8) * 0.15;
    }

    // Blinking telemetry status LED
    if (ledRef.current) {
      ledRef.current.material.opacity = 0.3 + Math.sin(t * 4.0) * 0.5;
    }
  });

  return (
    // Screen is at 100% scale (1.0) and z=0 so visual size is identical across all scenes
    <group ref={roverGroupRef} position={[0, -0.05, 0]}>
      {/* ── 1. Articulated Mast Holding Video Display Screen (Standardized x=0, y=0.08 net, z=0.0) ── */}
      <group ref={mastRef} position={[0, 0.13, 0]}>
        {/* Screen Backplate Housing (Matches Cosmic Background) */}
        <mesh position={[0, 0, -0.04]}>
          <boxGeometry args={[2.45, 1.42, 0.08]} />
          <meshStandardMaterial
            color="#0b0f19"
            metalness={0.9}
            roughness={0.25}
          />
        </mesh>


        {/* Video Screen Display Mesh (Standardized 2.35 x 1.32, z = 0.0) */}
        <VideoScreenMesh
          texture={texture}
          width={2.35}
          height={1.32}
          blur={1.5}
          isReady={isReady}
          glowColor="#38bdf8"
          position={[0, 0, 0.0]}
        />

        {/* Mast Articulation Bracket below Screen */}
        <mesh position={[0, -0.72, 0]}>
          <cylinderGeometry args={[0.04, 0.05, 0.2, 12]} />
          <meshStandardMaterial color="#475569" metalness={0.85} roughness={0.25} />
        </mesh>
        <mesh position={[0, -0.82, 0]}>
          <sphereGeometry args={[0.065, 12, 12]} />
          <meshStandardMaterial color="#1e293b" metalness={0.9} />
        </mesh>
      </group>

      {/* ── 2. Cyber Space Rover Body Chassis (Lower Section, scaled to fit) ── */}
      <group position={[0, -0.92, 0]} scale={[0.65, 0.65, 0.65]}>
        {/* Main Chassis Body (Deep Cosmic Titanium) */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[1.5, 0.32, 1.2]} />
          <meshStandardMaterial
            color="#0f172a"
            metalness={0.88}
            roughness={0.22}
          />
        </mesh>

        {/* Top Avionics Deck Plate */}
        <mesh position={[0, 0.17, -0.05]}>
          <boxGeometry args={[1.36, 0.03, 0.95]} />
          <meshStandardMaterial
            color="#1e293b"
            metalness={0.9}
            roughness={0.2}
          />
        </mesh>

        {/* Chassis Cyber Trim Accent (Cosmic Cyan Line) */}
        <mesh position={[0, 0, 0.61]}>
          <boxGeometry args={[1.42, 0.04, 0.02]} />
          <meshBasicMaterial color="#38bdf8" />
        </mesh>

        {/* Pulsing Telemetry LED on front bumper */}
        <mesh ref={ledRef} position={[0, 0.08, 0.62]}>
          <sphereGeometry args={[0.04, 16, 16]} />
          <meshBasicMaterial color="#38bdf8" transparent opacity={0.8} />
        </mesh>

        {/* Parabolic Telemetry Dish on rear deck */}
        <group ref={dishRef} position={[0.48, 0.3, -0.32]} rotation={[0.3, 0, 0]}>
          <mesh>
            <cylinderGeometry args={[0.02, 0.02, 0.2, 8]} />
            <meshStandardMaterial color="#64748b" metalness={0.9} />
          </mesh>
          <mesh position={[0, 0.1, 0]} rotation={[Math.PI, 0, 0]}>
            <coneGeometry args={[0.2, 0.08, 16, 1, true]} />
            <meshStandardMaterial
              color="#334155"
              metalness={0.9}
              roughness={0.2}
              side={THREE.DoubleSide}
            />
          </mesh>
        </group>

        {/* Power Generator Unit (Rear) */}
        <mesh position={[0, 0.12, -0.52]}>
          <cylinderGeometry args={[0.12, 0.12, 0.32, 12]} />
          <meshStandardMaterial color="#1e293b" metalness={0.85} roughness={0.3} />
        </mesh>

        {/* Rocker-Bogie Suspension Struts */}
        {[-0.72, 0.72].map((xSide, sideIdx) => (
          <group key={sideIdx}>
            <mesh position={[xSide, -0.06, 0]}>
              <boxGeometry args={[0.04, 0.04, 1.15]} />
              <meshStandardMaterial color="#334155" metalness={0.9} roughness={0.3} />
            </mesh>
            {[-0.45, 0, 0.45].map((zPos, zIdx) => (
              <mesh key={zIdx} position={[xSide, -0.16, zPos]}>
                <cylinderGeometry args={[0.022, 0.022, 0.18, 8]} />
                <meshStandardMaterial color="#475569" metalness={0.9} />
              </mesh>
            ))}
          </group>
        ))}

        {/* 6 Cyber Rover Wheels */}
        {[
          [-0.8, -0.25, -0.45],
          [-0.8, -0.25, 0.0],
          [-0.8, -0.25, 0.45],
          [0.8, -0.25, -0.45],
          [0.8, -0.25, 0.0],
          [0.8, -0.25, 0.45]
        ].map((wPos, wIdx) => (
          <group key={wIdx} position={wPos}>
            {/* Wheel Tread (Deep Cosmic Charcoal) */}
            <mesh rotation={[0, 0, Math.PI / 2]}>
              <cylinderGeometry args={[0.15, 0.15, 0.12, 16]} />
              <meshStandardMaterial color="#0b0f19" metalness={0.8} roughness={0.4} />
            </mesh>
            {/* Wheel Hub */}
            <mesh rotation={[0, 0, Math.PI / 2]}>
              <cylinderGeometry args={[0.09, 0.09, 0.13, 12]} />
              <meshStandardMaterial color="#1e293b" metalness={0.9} roughness={0.2} />
            </mesh>
            {/* Cyan Accent Ring */}
            <mesh rotation={[0, 0, Math.PI / 2]}>
              <ringGeometry args={[0.07, 0.085, 16]} />
              <meshBasicMaterial color="#38bdf8" side={THREE.DoubleSide} />
            </mesh>
          </group>
        ))}
      </group>
    </group>
  );
}
