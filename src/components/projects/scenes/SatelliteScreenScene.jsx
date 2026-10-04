import React, { useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import VideoScreenMesh from '../VideoScreenMesh';

/**
 * Scene 2: Satellite Screen
 * Project displays directly on a high-tech orbital satellite's central screen panel
 * flanked by twin segmented solar arrays and telemetry antennas.
 */
export default function SatelliteScreenScene({
  texture,
  isReady,
  prefersReducedMotion = false,
  isLowEnd = false
}) {
  const satelliteGroupRef = useRef();
  const leftPanelRef = useRef();
  const rightPanelRef = useRef();
  const ledRef1 = useRef();
  const ledRef2 = useRef();

  useFrame(({ clock }) => {
    if (prefersReducedMotion) return;
    const t = clock.getElapsedTime();

    // Orbital satellite drift and gentle bank angle
    if (satelliteGroupRef.current) {
      satelliteGroupRef.current.position.y = Math.sin(t * 1.4) * 0.05;
      satelliteGroupRef.current.rotation.y = Math.sin(t * 0.7) * 0.08;
      satelliteGroupRef.current.rotation.z = Math.sin(t * 0.5) * 0.03;
      satelliteGroupRef.current.rotation.x = Math.sin(t * 0.9) * 0.03;
    }

    // Gentle solar wing flexibility
    if (leftPanelRef.current) {
      leftPanelRef.current.rotation.y = Math.sin(t * 1.2) * 0.04;
    }
    if (rightPanelRef.current) {
      rightPanelRef.current.rotation.y = -Math.sin(t * 1.2) * 0.04;
    }

    // Blinking telemetry status lights (matching red & amber dots from card illustration)
    if (ledRef1.current) {
      ledRef1.current.material.opacity = Math.sin(t * 4.0) > 0 ? 0.9 : 0.2;
    }
    if (ledRef2.current) {
      ledRef2.current.material.opacity = Math.cos(t * 3.0) > 0 ? 0.9 : 0.2;
    }
  });

  return (
    <group ref={satelliteGroupRef} position={[0, -0.05, 0]}>
      {/* ── 1. Central Satellite Mainframe Chassis (Sits Behind Video Screen) ── */}
      <group position={[0, 0.13, -0.06]}>
        {/* Main Chassis Backplate Housing (Dark cosmic titanium) */}
        <mesh position={[0, 0, -0.05]}>
          <boxGeometry args={[2.48, 1.44, 0.08]} />
          <meshStandardMaterial
            color="#0b0f19"
            metalness={0.85}
            roughness={0.3}
          />
        </mesh>

        {/* Status Indicator LEDs at Bottom-Left Corner */}
        <group position={[-0.92, -0.66, 0.08]}>
          <mesh ref={ledRef1} position={[0, 0, 0]}>
            <sphereGeometry args={[0.038, 16, 16]} />
            <meshBasicMaterial color="#ef4444" transparent opacity={0.9} />
          </mesh>
          <mesh ref={ledRef2} position={[0.13, 0, 0]}>
            <sphereGeometry args={[0.038, 16, 16]} />
            <meshBasicMaterial color="#f59e0b" transparent opacity={0.9} />
          </mesh>
        </group>

        {/* Telemetry Sensor Nodes & Top Communication Mast */}
        <mesh position={[0, 0.88, -0.04]}>
          <cylinderGeometry args={[0.02, 0.03, 0.32, 16]} />
          <meshStandardMaterial color="#94a3b8" metalness={0.9} roughness={0.2} />
        </mesh>
        <mesh position={[0, 1.06, -0.04]}>
          <sphereGeometry args={[0.045, 16, 16]} />
          <meshStandardMaterial color="#38bdf8" emissive="#0284c7" emissiveIntensity={0.6} />
        </mesh>

        {/* Parabolic Telemetry Dish on Back */}
        <mesh position={[0, 0.2, -0.25]} rotation={[0.4, 0, 0]}>
          <cylinderGeometry args={[0.35, 0.05, 0.12, 24, 1, true]} />
          <meshStandardMaterial color="#cbd5e1" metalness={0.85} roughness={0.25} side={THREE.DoubleSide} />
        </mesh>
      </group>

      {/* ── 2. Left Solar Array Wing ── */}
      <group ref={leftPanelRef} position={[-1.38, 0, -0.05]}>
        {/* Truss Arm Connector */}
        <mesh position={[-0.15, 0, 0]}>
          <boxGeometry args={[0.3, 0.06, 0.06]} />
          <meshStandardMaterial color="#475569" metalness={0.9} roughness={0.2} />
        </mesh>

        {/* Solar Wing Segment Frame */}
        <mesh position={[-0.95, 0, 0]}>
          <boxGeometry args={[1.3, 0.85, 0.03]} />
          <meshStandardMaterial color="#1e293b" metalness={0.8} roughness={0.3} />
        </mesh>

        {/* Photovoltaic Deep Blue Cells (3 Segmented panels like Card 2) */}
        {[-0.4, 0, 0.4].map((offset, i) => (
          <mesh key={i} position={[-0.95 + offset, 0, 0.02]}>
            <planeGeometry args={[0.36, 0.78]} />
            <meshStandardMaterial
              color="#1d4ed8"
              emissive="#1e3a8a"
              emissiveIntensity={0.25}
              metalness={0.9}
              roughness={0.15}
            />
          </mesh>
        ))}

        {/* Solar Panel Gold Foil Rim Trusses */}
        <mesh position={[-0.95, 0.44, 0]}>
          <boxGeometry args={[1.34, 0.02, 0.04]} />
          <meshStandardMaterial color="#d97706" metalness={0.8} roughness={0.3} />
        </mesh>
        <mesh position={[-0.95, -0.44, 0]}>
          <boxGeometry args={[1.34, 0.02, 0.04]} />
          <meshStandardMaterial color="#d97706" metalness={0.8} roughness={0.3} />
        </mesh>
      </group>

      {/* ── 3. Right Solar Array Wing ── */}
      <group ref={rightPanelRef} position={[1.38, 0, -0.05]}>
        {/* Truss Arm Connector */}
        <mesh position={[0.15, 0, 0]}>
          <boxGeometry args={[0.3, 0.06, 0.06]} />
          <meshStandardMaterial color="#475569" metalness={0.9} roughness={0.2} />
        </mesh>

        {/* Solar Wing Segment Frame */}
        <mesh position={[0.95, 0, 0]}>
          <boxGeometry args={[1.3, 0.85, 0.03]} />
          <meshStandardMaterial color="#1e293b" metalness={0.8} roughness={0.3} />
        </mesh>

        {/* Photovoltaic Deep Blue Cells */}
        {[-0.4, 0, 0.4].map((offset, i) => (
          <mesh key={i} position={[0.95 + offset, 0, 0.02]}>
            <planeGeometry args={[0.36, 0.78]} />
            <meshStandardMaterial
              color="#1d4ed8"
              emissive="#1e3a8a"
              emissiveIntensity={0.25}
              metalness={0.9}
              roughness={0.15}
            />
          </mesh>
        ))}

        {/* Solar Panel Gold Foil Rim Trusses */}
        <mesh position={[0.95, 0.44, 0]}>
          <boxGeometry args={[1.34, 0.02, 0.04]} />
          <meshStandardMaterial color="#d97706" metalness={0.8} roughness={0.3} />
        </mesh>
        <mesh position={[0.95, -0.44, 0]}>
          <boxGeometry args={[1.34, 0.02, 0.04]} />
          <meshStandardMaterial color="#d97706" metalness={0.8} roughness={0.3} />
        </mesh>
      </group>

      {/* ── 4. Main Video Screen Display Embedded on Satellite Front Panel ── */}
      <group position={[0, 0.13, 0.02]}>
        <VideoScreenMesh
          texture={texture}
          isReady={isReady}
          width={2.35}
          height={1.32}
          glowColor="#0284c7"
          brightness={1.08}
        />
      </group>
    </group>
  );
}
