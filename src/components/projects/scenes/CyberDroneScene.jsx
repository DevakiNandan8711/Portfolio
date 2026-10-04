import React, { useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import VideoScreenMesh from '../VideoScreenMesh';

/**
 * Scene 5: Autonomous Cyber AI Recon Drone (AI YouTube Video Analyzer)
 * 
 * An autonomous zero-g survey drone / recon probe holding the video display.
 * Features 4 diagonal ion thruster arms with glowing blue plasma rings,
 * top rotating optical scanner dome, and twin robotic clamp arms holding the screen.
 */
export default function CyberDroneScene({
  texture,
  isReady,
  prefersReducedMotion = false
}) {
  const droneRef = useRef();
  const scannerDomeRef = useRef();
  const thrustersRef = useRef([]);

  useFrame(({ clock }) => {
    if (prefersReducedMotion) return;
    const t = clock.getElapsedTime();

    // Drone zero-g thruster stabilization hover
    if (droneRef.current) {
      droneRef.current.position.y = Math.sin(t * 1.5) * 0.035;
      droneRef.current.rotation.y = Math.sin(t * 0.6) * 0.04;
      droneRef.current.rotation.z = Math.sin(t * 0.8) * 0.02;
    }

    // Top optical scanner continuous 360° sweep
    if (scannerDomeRef.current) {
      scannerDomeRef.current.rotation.y = t * 1.2;
    }

    // Ion thruster pulse flicker
    thrustersRef.current.forEach((ring, idx) => {
      if (ring) {
        ring.material.opacity = 0.5 + Math.sin(t * 6.0 + idx * 1.2) * 0.35;
      }
    });
  });

  return (
    <group ref={droneRef} position={[0, -0.05, 0]}>
      {/* ── 1. Video Screen Display Assembly (Standardized x=0, y=0.08 net, z=0.0) ── */}
      <group position={[0, 0.13, 0]}>
        {/* Screen Backplate Housing */}
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

      {/* ── 2. Top Mounted Autonomous Drone Recon Core ── */}
      <group position={[0, 0.88, -0.08]}>
        {/* Core Avionics Pod */}
        <mesh>
          <cylinderGeometry args={[0.32, 0.38, 0.22, 20]} />
          <meshStandardMaterial
            color="#0f172a"
            metalness={0.88}
            roughness={0.25}
          />
        </mesh>

        {/* Rotating 360° Optical Scanner Dome */}
        <group ref={scannerDomeRef} position={[0, 0.14, 0]}>
          <mesh>
            <sphereGeometry args={[0.18, 20, 20, 0, Math.PI * 2, 0, Math.PI / 2]} />
            <meshStandardMaterial color="#1e293b" metalness={0.9} roughness={0.15} />
          </mesh>
          {/* Sweeping Optical Laser Lens */}
          <mesh position={[0.14, 0.04, 0]} rotation={[0, 0, -Math.PI / 2]}>
            <cylinderGeometry args={[0.035, 0.035, 0.08, 12]} />
            <meshBasicMaterial color="#38bdf8" />
          </mesh>
        </group>

        {/* 4 Diagonal Ion Maneuvering Thruster Arms */}
        {[
          [-0.85, 0.15, -0.2],
          [0.85, 0.15, -0.2],
          [-0.75, -0.25, -0.15],
          [0.75, -0.25, -0.15]
        ].map(([tx, ty, tz], tIdx) => (
          <group key={tIdx} position={[tx, ty, tz]}>
            {/* Carbon Truss Arm */}
            <mesh rotation={[0, 0, tx > 0 ? -0.4 : 0.4]}>
              <cylinderGeometry args={[0.025, 0.03, 0.65, 8]} />
              <meshStandardMaterial color="#334155" metalness={0.9} />
            </mesh>
            {/* Thruster Cowling */}
            <mesh position={[tx > 0 ? 0.28 : -0.28, ty > 0 ? 0.1 : -0.1, 0]}>
              <cylinderGeometry args={[0.1, 0.13, 0.18, 16]} />
              <meshStandardMaterial color="#1e293b" metalness={0.85} roughness={0.3} />
            </mesh>
            {/* Glowing Blue Plasma Exhaust Ring */}
            <mesh
              ref={(el) => (thrustersRef.current[tIdx] = el)}
              position={[tx > 0 ? 0.28 : -0.28, ty > 0 ? 0.2 : -0.2, 0]}
              rotation={[Math.PI / 2, 0, 0]}
            >
              <torusGeometry args={[0.09, 0.02, 12, 24]} />
              <meshBasicMaterial color="#38bdf8" transparent opacity={0.8} />
            </mesh>
          </group>
        ))}
      </group>

      {/* ── 3. Twin Robotic Mechanical Clamp Arms Gripping Screen ── */}
      {/* Left Clamp Arm */}
      <group position={[-1.28, 0.05, 0]}>
        <mesh position={[-0.1, 0, 0]}>
          <boxGeometry args={[0.22, 0.12, 0.1]} />
          <meshStandardMaterial color="#334155" metalness={0.85} />
        </mesh>
        {/* Clamp Jaw Grip */}
        <mesh position={[0.05, 0, 0.03]}>
          <boxGeometry args={[0.08, 0.18, 0.08]} />
          <meshStandardMaterial color="#475569" metalness={0.9} />
        </mesh>
        {/* Cyan Status LED on Arm */}
        <mesh position={[-0.1, 0.08, 0.04]}>
          <sphereGeometry args={[0.025, 12, 12]} />
          <meshBasicMaterial color="#38bdf8" />
        </mesh>
      </group>

      {/* Right Clamp Arm */}
      <group position={[1.28, 0.05, 0]}>
        <mesh position={[0.1, 0, 0]}>
          <boxGeometry args={[0.22, 0.12, 0.1]} />
          <meshStandardMaterial color="#334155" metalness={0.85} />
        </mesh>
        {/* Clamp Jaw Grip */}
        <mesh position={[-0.05, 0, 0.03]}>
          <boxGeometry args={[0.08, 0.18, 0.08]} />
          <meshStandardMaterial color="#475569" metalness={0.9} />
        </mesh>
        {/* Cyan Status LED on Arm */}
        <mesh position={[0.1, 0.08, 0.04]}>
          <sphereGeometry args={[0.025, 12, 12]} />
          <meshBasicMaterial color="#38bdf8" />
        </mesh>
      </group>
    </group>
  );
}
