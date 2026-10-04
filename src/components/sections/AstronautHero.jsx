import React, { useRef, useEffect, useState, useMemo, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, useAnimations, Center } from '@react-three/drei';
import * as THREE from 'three';
import { CanvasErrorBoundary } from '../ui/CanvasErrorBoundary';
import { getTheme, themes } from '../../themeConfig';
import { isMobileDevice } from '../../utils/deviceUtils';

/* ─────────────────────────────────────────────────────────────────────────────
   PHOTOREALISTIC ASTRONAUT MODEL COMPONENT (Zero-G Spacewalk EVA)
   ───────────────────────────────────────────────────────────────────────────── */
function AstronautModel({ onReady, isLoaded }) {
  const group = useRef();
  const [hasWaved, setHasWaved] = useState(false);

  const { scene, animations } = useGLTF('/models/astronaut.glb');
  const { actions } = useAnimations(animations, group);

  // Enhance PBR materials with high-definition texture scaling and realistic spacesuit physics
  useEffect(() => {
    scene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
        if (child.material) {
          const mat = child.material;

          if (mat.map) {
            mat.map.colorSpace = THREE.SRGBColorSpace;
          }
          if (mat.normalMap) {
            mat.normalScale = new THREE.Vector2(1.5, 1.5);
          }
          if (mat.roughnessMap) {
            mat.roughness = 0.65;
          }

          // Check if mesh is the helmet visor (mesh bounds at face height)
          const geom = child.geometry;
          if (geom && !geom.boundingBox) geom.computeBoundingBox();
          const bb = geom?.boundingBox;
          const isVisor = bb && bb.max.y > 135 && bb.min.y > 110 && (bb.max.x - bb.min.x < 55);

          if (isVisor || mat.name?.toLowerCase().includes('visor')) {
            // Authentic NASA tinted obsidian helmet visor with deep-space specular reflection
            mat.color = new THREE.Color('#0a101d');
            mat.metalness = 0.94;
            mat.roughness = 0.08;
            mat.envMapIntensity = 2.4;
          } else {
            // Natural authentic NASA white nylon/Nomex Ortho-fabric weave
            mat.metalness = 0.08;
            mat.roughness = 0.68;
            mat.envMapIntensity = 1.2;
          }

          mat.needsUpdate = true;
        }
      }
    });

    // Notify that astronaut model is ready
    if (onReady) {
      requestAnimationFrame(() => {
        onReady();
      });
    }
  }, [scene, onReady]);

  // 1. Initial idle/floating pose while preloader is active (before home page appears)
  useEffect(() => {
    if (!actions) return;
    if (!isLoaded) {
      if (actions['floating']) {
        actions['floating'].reset().fadeIn(0.4).play();
      } else if (actions['idle']) {
        actions['idle'].reset().fadeIn(0.4).play();
      }
    }
  }, [actions, isLoaded]);

  // 2. Wave Greeting Sequence: When home page appears (isLoaded === true), wave "Hi" 3 to 4 times!
  useEffect(() => {
    if (!actions || !isLoaded) return;

    if (actions['wave']) {
      const waveAction = actions['wave'];

      // Cross-fade from idle into active wave greeting
      if (actions['floating']) actions['floating'].fadeOut(0.3);
      if (actions['idle']) actions['idle'].fadeOut(0.3);

      waveAction.reset().fadeIn(0.35).play();
      // Wave exactly 4 times from left to right (2 clip cycles)
      waveAction.setLoop(THREE.LoopRepeat, 2);
      waveAction.clampWhenFinished = true;

      const mixer = waveAction.getMixer();
      const handleFinish = (event) => {
        if (event.action === waveAction) {
          waveAction.fadeOut(0.8);
          setHasWaved(true);
          if (actions['floating']) {
            actions['floating'].reset().fadeIn(0.8).play();
          } else if (actions['idle']) {
            actions['idle'].reset().fadeIn(0.8).play();
          }
        }
      };

      mixer.addEventListener('finished', handleFinish);
      return () => mixer.removeEventListener('finished', handleFinish);
    } else if (actions['floating']) {
      setHasWaved(true);
      actions['floating'].play();
    } else if (actions['idle']) {
      setHasWaved(true);
      actions['idle'].play();
    }
  }, [actions, isLoaded]);

  // Track position Y: Positioned naturally in the hero viewport below navbar
  const currentBaseY = useRef(-0.88);

  useFrame((state, delta) => {
    if (group.current) {
      const t = state.clock.getElapsedTime();

      // ─────────────────────────────────────────────────────────────────────────────
      // AUTHENTIC ZERO-G SPACEWALK (EVA) MICROGRAVITY DRIFT
      // Real space movement has compound harmonic inertia (Lissajous curve) without
      // artificial hard clamping or rigid bobbing.
      // ─────────────────────────────────────────────────────────────────────────────
      
      // 1. Dual-harmonic vertical drift (slow, majestic ~14s and ~28s orbital wave periods)
      const primaryFloat = Math.sin(t * 0.45) * 0.028;
      const secondaryFloat = Math.sin(t * 0.22) * 0.014;
      const targetBaseY = hasWaved ? -0.86 : -0.92;
      currentBaseY.current = THREE.MathUtils.damp(currentBaseY.current, targetBaseY, 0.9, delta);

      group.current.position.y = currentBaseY.current + primaryFloat + secondaryFloat;

      // 2. Slow lateral drift across the cosmic vista (conserves orbital momentum)
      const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
      const baseX = isMobile ? 0 : -0.28;
      group.current.position.x = baseX + Math.cos(t * 0.32) * 0.026 + Math.sin(t * 0.16) * 0.01;

      // 3. Subtle zero-G roll & pitch tilt (Newtonian rotational drift in vacuum)
      const zeroGRoll = Math.sin(t * 0.38) * 0.038;
      const zeroGPitch = Math.cos(t * 0.42) * 0.022;

      // 4. Inertial Look-At (Heavy 150kg spacesuit rotates with natural dampening and mass)
      const targetRotationY = (state.pointer.x * Math.PI) / 6.0;
      const targetRotationX = -(state.pointer.y * Math.PI) / 12.0 + zeroGPitch;

      group.current.rotation.y = THREE.MathUtils.damp(
        group.current.rotation.y,
        targetRotationY,
        1.8,
        delta
      );
      group.current.rotation.x = THREE.MathUtils.damp(
        group.current.rotation.x,
        targetRotationX,
        1.8,
        delta
      );
      group.current.rotation.z = THREE.MathUtils.damp(
        group.current.rotation.z,
        zeroGRoll,
        1.5,
        delta
      );
    }
  });

  return (
    <group ref={group}>
      <Center>
        <primitive
          object={scene}
          scale={1.05}
        />
      </Center>
    </group>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   ZERO-GRAVITY SPACEWALK CAMERA RIG (Realistic EVA Observer Float)
   ───────────────────────────────────────────────────────────────────────────── */
function SpacewalkCameraRig() {
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    const targetCamX = Math.sin(t * 0.3) * 0.04 + (state.pointer.x * 0.08);
    const targetCamY = -0.05 + Math.cos(t * 0.4) * 0.015 - (state.pointer.y * 0.035);

    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, targetCamX, 0.035);
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, targetCamY, 0.035);
    state.camera.lookAt(0, -0.25, 0);
  });

  return null;
}

/* Helper to generate a luminous circular astronomical star texture with zero pixelated box edges */
let _heroStarTex = null;
function getHeroStarTexture() {
  if (_heroStarTex) return _heroStarTex;
  if (typeof document === 'undefined') return null;
  const canvas = document.createElement('canvas');
  canvas.width = 64;
  canvas.height = 64;
  const ctx = canvas.getContext('2d');
  const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
  gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
  gradient.addColorStop(0.2, 'rgba(255, 255, 255, 0.95)');
  gradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.4)');
  gradient.addColorStop(0.8, 'rgba(255, 255, 255, 0.1)');
  gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
  ctx.fillStyle = gradient;
  ctx.beginPath();
  ctx.arc(32, 32, 32, 0, Math.PI * 2);
  ctx.fill();
  _heroStarTex = new THREE.CanvasTexture(canvas);
  return _heroStarTex;
}

/* ─────────────────────────────────────────────────────────────────────────────
   LIVE MOVING PINPOINT STARS IN HERO VIEWPORT (Authentic Visible Orbital Drift)
   Clearly visible, gliding horizontally across the cosmic sky with multi-depth parallax
   ───────────────────────────────────────────────────────────────────────────── */
function HeroDriftingStars() {
  const fieldRef = useRef();
  const beaconRef = useRef();
  const starMap = useMemo(() => getHeroStarTexture(), []);

  // 1. Fine Drifting Star Dust (800 stars)
  const { fieldPos, fieldCol, fieldSpd } = useMemo(() => {
    const count = 800;
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const spd = new Float32Array(count);

    const palette = [
      new THREE.Color('#ffffff'),
      new THREE.Color('#e0f2fe'),
      new THREE.Color('#fef08a'),
      new THREE.Color('#fed7aa'),
      new THREE.Color('#93c5fd')
    ];

    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 26;
      pos[i * 3 + 1] = Math.random() * 9 - 2.0;
      pos[i * 3 + 2] = -Math.random() * 5 - 2.0;

      const c = palette[Math.floor(Math.random() * palette.length)];
      const brightness = Math.random() * 0.5 + 0.5;
      col[i * 3] = c.r * brightness;
      col[i * 3 + 1] = c.g * brightness;
      col[i * 3 + 2] = c.b * brightness;

      // Unmistakably visible orbital drift speed (0.35 to 0.7 units/sec)
      spd[i] = Math.random() * 0.35 + 0.35;
    }
    return { fieldPos: pos, fieldCol: col, fieldSpd: spd };
  }, []);

  // 2. High-Visibility Major Navigational Beacon Stars (120 prominent luminous stars)
  const { beaconPos, beaconCol, beaconSpd, beaconPhase } = useMemo(() => {
    const count = 120;
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const spd = new Float32Array(count);
    const phase = new Float32Array(count);

    const beaconPalette = [
      new THREE.Color('#ffffff'), // Sirius Pure Diamond
      new THREE.Color('#93c5fd'), // Rigel Ice Blue
      new THREE.Color('#fef08a'), // Solar Gold
      new THREE.Color('#dbeafe')  // Vega Stellar Silver
    ];

    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 24;
      pos[i * 3 + 1] = Math.random() * 8.5 - 1.5;
      pos[i * 3 + 2] = -Math.random() * 4 - 1.5;

      const c = beaconPalette[Math.floor(Math.random() * beaconPalette.length)];
      col[i * 3] = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;

      // Faster prominent lateral drift (0.55 to 0.95 units/sec)
      spd[i] = Math.random() * 0.4 + 0.55;
      phase[i] = Math.random() * Math.PI * 2;
    }
    return { beaconPos: pos, beaconCol: col, beaconSpd: spd, beaconPhase: phase };
  }, []);

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();

    // 1. Move field stars
    if (fieldRef.current) {
      const posAttr = fieldRef.current.geometry.attributes.position;
      const arr = posAttr.array;
      for (let i = 0; i < arr.length / 3; i++) {
        arr[i * 3] -= fieldSpd[i] * delta;
        // Wrap around horizon seamlessly
        if (arr[i * 3] < -13) {
          arr[i * 3] = 13;
        }
      }
      posAttr.needsUpdate = true;
    }

    // 2. Move major beacon stars with visible drift & twinkling
    if (beaconRef.current) {
      const posAttr = beaconRef.current.geometry.attributes.position;
      const arr = posAttr.array;
      for (let i = 0; i < arr.length / 3; i++) {
        arr[i * 3] -= beaconSpd[i] * delta;
        if (arr[i * 3] < -13) {
          arr[i * 3] = 13;
        }
      }
      posAttr.needsUpdate = true;

      // Subtle radiant twinkle pulse
      beaconRef.current.material.opacity = 0.85 + Math.sin(t * 2.5) * 0.15;
    }
  });

  return (
    <group>
      {/* Dense Drifting Celestial Field */}
      <points ref={fieldRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={fieldPos.length / 3}
            array={fieldPos}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            count={fieldCol.length / 3}
            array={fieldCol}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.095}
          map={starMap}
          vertexColors
          transparent
          opacity={0.92}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>

      {/* Prominent High-Magnitude Navigational Beacon Stars (Clearly Visible Motion) */}
      <points ref={beaconRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={beaconPos.length / 3}
            array={beaconPos}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            count={beaconCol.length / 3}
            array={beaconCol}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.19}
          map={starMap}
          vertexColors
          transparent
          opacity={1.0}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>
    </group>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   AUTHENTIC SINGLE-LINE ROCKET (Strictly 1 Single-Line Rocket Every 5 Seconds)
   Hypervelocity glowing line streak cutting through the upper orbital sky
   ───────────────────────────────────────────────────────────────────────────── */
function HeroShootingRockets() {
  const lineRef = useRef();
  // First rocket launches 5.0 seconds after page mount
  const nextLaunchTime = useRef(5.0);
  const rocket = useRef({ active: false, x: 0, y: 0, z: -4.5, vx: 0, vy: 0, progress: 0, length: 3.4 });

  const points = useMemo(() => [new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, 0)], []);
  const geom = useMemo(() => new THREE.BufferGeometry().setFromPoints(points), [points]);

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();
    const r = rocket.current;

    if (!r.active) {
      // Trigger strictly once every 5 seconds
      if (t >= nextLaunchTime.current) {
        r.active = true;
        r.x = 8.5 + (Math.random() - 0.5) * 1.5;
        r.y = 2.4 + (Math.random() - 0.5) * 1.0;
        r.z = -4.8;
        const angle = Math.PI * 0.82 + (Math.random() - 0.5) * 0.1;
        const speed = 14.0;
        r.vx = -Math.cos(angle) * speed;
        r.vy = -Math.sin(angle) * speed;
        r.progress = 1.0;
        r.length = 3.4;

        // Schedule next rocket strictly 5.0 seconds later
        nextLaunchTime.current = t + 5.0;
      }
    } else {
      r.x += r.vx * delta;
      r.y += r.vy * delta;
      r.progress -= delta * 1.35; // Streaks for ~0.74 seconds across the sky

      if (r.progress <= 0 || r.x < -9.5 || r.y < -4.5) {
        r.active = false;
        if (lineRef.current) lineRef.current.material.opacity = 0;
      } else if (lineRef.current) {
        const head = new THREE.Vector3(r.x, r.y, r.z);
        const norm = Math.hypot(r.vx, r.vy);
        const tail = new THREE.Vector3(
          r.x - (r.vx / norm) * r.length,
          r.y - (r.vy / norm) * r.length,
          r.z
        );
        geom.setFromPoints([tail, head]);
        lineRef.current.material.opacity = Math.max(0, r.progress * 0.95);
      }
    }
  });

  return (
    <line ref={lineRef} geometry={geom}>
      <lineBasicMaterial
        color="#ffffff"
        transparent
        opacity={0}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        linewidth={2}
      />
    </line>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   SMALL 3D ORBITAL SATELLITE (Matching User Uploaded Image 3)
   White bus chassis, top parabolic dish, blue sensor window, twin 3-segment solar wings
   ───────────────────────────────────────────────────────────────────────────── */
function SmallSatelliteModel({ scale = 1, ledPhase = 0 }) {
  const ledRef = useRef();

  useFrame(({ clock }) => {
    if (ledRef.current) {
      const t = clock.getElapsedTime() * 3 + ledPhase;
      ledRef.current.material.opacity = Math.sin(t) > 0 ? 0.95 : 0.2;
    }
  });

  return (
    <group scale={scale}>
      {/* 1. Main Central Satellite Body (White Cube Bus) */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[0.32, 0.28, 0.22]} />
        <meshStandardMaterial
          color="#f8fafc"
          metalness={0.4}
          roughness={0.3}
        />
      </mesh>

      {/* Front Blue Solar Sensor / Window (Matching Image 3) */}
      <mesh position={[0, 0.02, 0.112]}>
        <planeGeometry args={[0.16, 0.1]} />
        <meshStandardMaterial
          color="#2563eb"
          emissive="#1d4ed8"
          emissiveIntensity={0.5}
          roughness={0.2}
        />
      </mesh>

      {/* Top Parabolic Dish Antenna / Telemetry Dome */}
      <group position={[0, 0.19, 0]}>
        {/* Antenna Stem */}
        <mesh position={[0, -0.02, 0]}>
          <cylinderGeometry args={[0.02, 0.02, 0.06, 12]} />
          <meshStandardMaterial color="#94a3b8" metalness={0.8} roughness={0.2} />
        </mesh>
        {/* Antenna Dish Dome */}
        <mesh position={[0, 0.04, 0]} rotation={[0.3, 0, 0]}>
          <sphereGeometry args={[0.09, 16, 12, 0, Math.PI * 2, 0, Math.PI / 2]} />
          <meshStandardMaterial color="#e2e8f0" metalness={0.7} roughness={0.3} side={THREE.DoubleSide} />
        </mesh>
      </group>

      {/* 2. Left Solar Array Wing (3 Blue Photovoltaic Segments) */}
      <group position={[-0.16, 0, 0]}>
        {/* Connector Truss */}
        <mesh position={[-0.05, 0, 0]}>
          <boxGeometry args={[0.1, 0.03, 0.03]} />
          <meshStandardMaterial color="#94a3b8" metalness={0.9} roughness={0.2} />
        </mesh>
        {/* Solar Wing Frame */}
        <mesh position={[-0.32, 0, 0]}>
          <boxGeometry args={[0.44, 0.22, 0.02]} />
          <meshStandardMaterial color="#e2e8f0" metalness={0.6} roughness={0.4} />
        </mesh>
        {/* 3 Blue Photovoltaic Cell Segments */}
        {[-0.13, 0, 0.13].map((off, i) => (
          <mesh key={i} position={[-0.32 + off, 0, 0.012]}>
            <planeGeometry args={[0.11, 0.18]} />
            <meshStandardMaterial
              color="#1d4ed8"
              emissive="#1e3a8a"
              emissiveIntensity={0.35}
              metalness={0.85}
              roughness={0.15}
            />
          </mesh>
        ))}
      </group>

      {/* 3. Right Solar Array Wing (3 Blue Photovoltaic Segments) */}
      <group position={[0.16, 0, 0]}>
        {/* Connector Truss */}
        <mesh position={[0.05, 0, 0]}>
          <boxGeometry args={[0.1, 0.03, 0.03]} />
          <meshStandardMaterial color="#94a3b8" metalness={0.9} roughness={0.2} />
        </mesh>
        {/* Solar Wing Frame */}
        <mesh position={[0.32, 0, 0]}>
          <boxGeometry args={[0.44, 0.22, 0.02]} />
          <meshStandardMaterial color="#e2e8f0" metalness={0.6} roughness={0.4} />
        </mesh>
        {/* 3 Blue Photovoltaic Cell Segments */}
        {[-0.13, 0, 0.13].map((off, i) => (
          <mesh key={i} position={[0.32 + off, 0, 0.012]}>
            <planeGeometry args={[0.11, 0.18]} />
            <meshStandardMaterial
              color="#1d4ed8"
              emissive="#1e3a8a"
              emissiveIntensity={0.35}
              metalness={0.85}
              roughness={0.15}
            />
          </mesh>
        ))}
      </group>

      {/* 4. Blinking Navigation Telemetry Beacon */}
      <mesh ref={ledRef} position={[0, -0.15, 0.05]}>
        <sphereGeometry args={[0.035, 12, 12]} />
        <meshBasicMaterial color="#ef4444" transparent opacity={0.9} />
      </mesh>
    </group>
  );
}

/* Multiple small satellites moving around the home page background */
function HomeSatellitesSwarm() {
  const sat1Ref = useRef();
  const sat2Ref = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    // Satellite 1: Upper orbital arc traversal from left to right (~28s loop)
    if (sat1Ref.current) {
      const p1 = (t * 0.035) % 1;
      const x1 = -7.5 + p1 * 15;
      const y1 = 1.45 + Math.sin(p1 * Math.PI) * 0.4;
      const z1 = -5.2;
      sat1Ref.current.position.set(x1, y1, z1);
      // Gentle tumbling and solar wing glint
      sat1Ref.current.rotation.y = t * 0.4;
      sat1Ref.current.rotation.z = Math.sin(t * 0.6) * 0.15;
      sat1Ref.current.rotation.x = 0.25 + Math.cos(t * 0.4) * 0.1;
    }

    // Satellite 2: Elliptical orbital path circling in the background
    if (sat2Ref.current) {
      const angle = t * 0.2;
      const x2 = Math.cos(angle) * 5.5;
      const y2 = -0.4 + Math.sin(angle) * 1.6;
      const z2 = -5.8 + Math.sin(angle) * 0.6;
      sat2Ref.current.position.set(x2, y2, z2);
      sat2Ref.current.rotation.y = -angle + Math.PI / 2;
      sat2Ref.current.rotation.z = Math.sin(t * 0.5) * 0.1;
    }
  });

  return (
    <group>
      {/* Primary Satellite across upper sky (small distant orbital scale) */}
      <group ref={sat1Ref}>
        <SmallSatelliteModel scale={0.18} ledPhase={0} />
      </group>

      {/* Secondary Satellite orbiting in background (smaller distant scale) */}
      <group ref={sat2Ref}>
        <SmallSatelliteModel scale={0.13} ledPhase={1.5} />
      </group>
    </group>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   3D COSMIC BACKGROUND GROUP BEHIND ASTRONAUT
   Rotates celestial stars, satellites, and streak rockets when the mouse moves
   ───────────────────────────────────────────────────────────────────────────── */
function HeroCosmicBackgroundGroup({ children }) {
  const groupRef = useRef();

  useFrame((state) => {
    if (groupRef.current) {
      // Rotation behind the astronaut when the mouse moves
      const targetRotationY = (state.pointer.x * Math.PI) / 6.5;
      const targetRotationX = -(state.pointer.y * Math.PI) / 14;

      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        targetRotationY,
        0.05
      );
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        targetRotationX,
        0.05
      );
    }
  });

  return <group ref={groupRef}>{children}</group>;
}

/* ─────────────────────────────────────────────────────────────────────────────
   MAIN HERO COMPONENT
   Photorealistic Orbital Vista (With Zero-G Flight & Parallax) + 3D Astronaut
   ───────────────────────────────────────────────────────────────────────────── */
export default function AstronautHero({
  currentTheme = 'orbital_sunrise',
  onModelLoaded,
  isLoaded = false
}) {
  const activeTheme = getTheme(currentTheme);
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });

  // Mouse parallax for the background vista (creates realistic 3D depth)
  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      setMouseOffset({ x, y });
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section id="home" className="snap-section relative w-full h-screen flex flex-col md:flex-row items-center justify-between px-5 sm:px-10 md:px-16 pt-24 pb-12 sm:pt-28 sm:pb-16 md:py-0 overflow-hidden select-none font-sans">

      {/* ── 0. BREATHTAKING PHOTOREALISTIC ORBITAL VISTA BACKGROUND (With Continuous Zero-G Flight & Parallax) ── */}
      <div 
        className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden z-0"
        style={{ perspective: '1200px' }}
      >
        {themes.map((theme) => {
          const isActive = theme.id === currentTheme;
          return (
            <div
              key={theme.id}
              className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-out ${isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
                }`}
              style={{
                transform: `rotateY(${mouseOffset.x * 6.5}deg) rotateX(${-mouseOffset.y * 5.5}deg) translate(${mouseOffset.x * -18}px, ${mouseOffset.y * -12}px) scale(1.10)`,
                transformStyle: 'preserve-3d',
                transition: 'transform 0.25s cubic-bezier(0.2, 0.8, 0.2, 1)'
              }}
            >
              <img
                src={theme.bgImage}
                alt={theme.nebulaName}
                className="orbital-flight-drift w-full h-full object-cover object-center"
                style={{
                  maskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.98) 25%, rgba(0,0,0,1) 60%, rgba(0,0,0,1) 85%, rgba(0,0,0,0) 100%)',
                  WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.98) 25%, rgba(0,0,0,1) 60%, rgba(0,0,0,1) 85%, rgba(0,0,0,0) 100%)'
                }}
              />
            </div>
          );
        })}

        {/* Living Atmospheric Ionosphere Horizon Scattering Glow */}
        <div
          className="absolute inset-x-0 bottom-0 h-3/5 pointer-events-none transition-all duration-1000"
          style={{
            background: `radial-gradient(ellipse 110% 55% at 50% 100%, ${activeTheme.rimRight}2a 0%, ${activeTheme.gasPrimary || activeTheme.rimLeft}18 50%, transparent 80%)`,
            filter: 'blur(35px)'
          }}
        />

        {/* Cinematic deep space radial vignette */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at 50% 45%, transparent 35%, rgba(0,1,4,0.4) 75%, rgba(0,1,4,0.85) 100%)'
          }}
        />
      </div>

      {/* 1. Left / Top Column: Hello! I'm DEVAKI NANDAN */}
      <div className="z-20 pointer-events-none max-w-lg md:mt-14 text-center md:text-left">
        <p className="text-slate-300 font-mono tracking-widest text-xs sm:text-base md:text-lg mb-0.5 sm:mb-1 drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]">
          Hello! I'm
        </p>
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight drop-shadow-[0_0_40px_rgba(255,255,255,0.4)]">
          DEVAKI NANDAN
        </h1>
      </div>

      {/* 2. Center 3D Viewport: Moving Stars + Floating 3D Astronaut in front of Vista */}
      <div 
        className="absolute inset-0 w-full h-full pointer-events-auto cursor-grab active:cursor-grabbing z-10"
        style={{ touchAction: 'pan-y' }}
      >
        {!isMobileDevice() && (
          <CanvasErrorBoundary>
            <Canvas
            camera={{ position: [0, -0.05, 4.5], fov: 45 }}
            gl={{
            antialias: true,
            alpha: true,
            powerPreference: 'high-performance',
            toneMapping: THREE.ACESFilmicToneMapping,
            toneMappingExposure: 1.25
          }}
        >
          {/* Spacewalk Zero-G Camera Float */}
          <SpacewalkCameraRig />

          {/* ── 3D COSMIC BACKGROUND FIELD BEHIND ASTRONAUT (Rotates when mouse moves) ── */}
          <HeroCosmicBackgroundGroup>
            {/* ── LIVE VISIBLY MOVING 3D STARS IN HERO VIEWPORT ── */}
            <HeroDriftingStars />

            {/* ── SINGLE-LINE ROCKET (Strictly 1 Time Every 5 Seconds) ── */}
            <HeroShootingRockets />

            {/* ── AUTHENTIC PASSING ORBITAL SATELLITES (Matching Uploaded Image 3) ── */}
            <HomeSatellitesSwarm />
          </HeroCosmicBackgroundGroup>

          {/* ── CINEMATIC PHOTOREALISTIC SPACE LIGHTING (High-Contrast Solar Key + Earthshine) ── */}
          {/* Low ambient space fill preventing flat washout */}
          <ambientLight intensity={0.35} color="#dbeafe" />

          {/* Direct Solar Radiation (Key light creating sharp, photorealistic spacesuit folds & shadows) */}
          <directionalLight
            position={[5, 7, 4]}
            intensity={2.6}
            color="#ffffff"
            castShadow
            shadow-bias={-0.0001}
          />

          {/* Earthshine Planetary Atmospheric Reflection (Subtle upward blue bounce light from the vista below) */}
          <directionalLight
            position={[-4, -5, 2]}
            intensity={0.9}
            color="#60a5fa"
          />

          {/* Cosmic Silhouette Rim Light */}
          <pointLight
            position={[3, 2, -3]}
            color="#e0e7ff"
            intensity={1.6}
            distance={12}
          />

          {/* Specular Helmet Faceplate Fill */}
          <pointLight
            position={[-1, 1, 3]}
            color="#ffffff"
            intensity={0.7}
            distance={8}
          />

          {/* ── 3D PHOTOREALISTIC ASTRONAUT MODEL ── */}
          <Suspense fallback={null}>
            <AstronautModel onReady={onModelLoaded} isLoaded={isLoaded} />
          </Suspense>
          </Canvas>
          </CanvasErrorBoundary>
        )}
      </div>

      {/* 3. Right / Bottom Column: Roles & Action */}
      <div className="z-20 text-center md:text-right pointer-events-none max-w-lg flex flex-col items-center md:items-end md:mt-14">
        <p className="text-slate-400 font-mono tracking-widest text-xs sm:text-sm mb-0.5 sm:mb-1 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">An</p>

        {/* Dynamic Theme Gradient Headline */}
        <h2
          className={`text-xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold bg-gradient-to-r ${activeTheme.accentGradient} bg-clip-text text-transparent leading-tight transition-all duration-500`}
          style={{ filter: `drop-shadow(0 0 30px ${activeTheme.textGlow})` }}
        >
          AI/ML ENGINEER &amp;
        </h2>
        <h2 className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-white leading-tight drop-shadow-[0_0_30px_rgba(255,255,255,0.3)]">
          FULL-STACK DEVELOPER
        </h2>
      </div>

    </section>
  );
}

// Preload GLB model asset on desktop only to avoid mobile RAM crashes
if (!isMobileDevice()) {
  useGLTF.preload('/models/astronaut.glb');
}