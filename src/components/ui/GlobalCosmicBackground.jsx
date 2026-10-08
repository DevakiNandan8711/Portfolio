import React, { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sparkles, Stars } from '@react-three/drei';
import * as THREE from 'three';
import { getTheme } from '../../themeConfig';
import { CanvasErrorBoundary } from './CanvasErrorBoundary';

/* Helper to generate a soft circular astronomical star texture so points are never square boxes */
let _cachedStarTexture = null;
function getCircularStarTexture() {
  if (_cachedStarTexture) return _cachedStarTexture;
  if (typeof document === 'undefined') return null;
  const canvas = document.createElement('canvas');
  canvas.width = 32;
  canvas.height = 32;
  const ctx = canvas.getContext('2d');
  const gradient = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
  gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
  gradient.addColorStop(0.25, 'rgba(255, 255, 255, 0.85)');
  gradient.addColorStop(0.55, 'rgba(255, 255, 255, 0.25)');
  gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
  ctx.fillStyle = gradient;
  ctx.beginPath();
  ctx.arc(16, 16, 16, 0, Math.PI * 2);
  ctx.fill();
  _cachedStarTexture = new THREE.CanvasTexture(canvas);
  return _cachedStarTexture;
}

/* ─────────────────────────────────────────────────────────────────────────────
   1. PINPOINT REALISTIC ASTROPHYSICAL STARFIELD (Deep Vacuum Space Starlight)
   Multi-spectral stellar classification: O/B (Blue-White), A (Pure White), G (Solar), K/M (Amber)
   ───────────────────────────────────────────────────────────────────────────── */
function DeepSpacePinpointStars({ theme, scrollOffset }) {
  const pointsRef = useRef();
  const starMap = useMemo(() => getCircularStarTexture(), []);

  const { positions, colors } = useMemo(() => {
    const count = 7500;
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);

    const stellarPalette = [
      new THREE.Color('#ffffff'), // Pure White
      new THREE.Color('#f8fafc'), // Crisp Starlight
      new THREE.Color('#dbeafe'), // Pale Blue (O/B Star)
      new THREE.Color('#fff7ed'), // Solar White (G Star)
      new THREE.Color('#fed7aa'), // Warm Amber (K/M Star)
      new THREE.Color('#93c5fd')  // Deep Starlight Blue
    ];

    for (let i = 0; i < count; i++) {
      const radius = Math.random() * 150 + 20;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      pos[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = radius * Math.cos(phi) - 10;

      const chosenColor = stellarPalette[Math.floor(Math.random() * stellarPalette.length)];
      const brightness = Math.random() * 0.75 + 0.25;

      col[i * 3] = chosenColor.r * brightness;
      col[i * 3 + 1] = chosenColor.g * brightness;
      col[i * 3 + 2] = chosenColor.b * brightness;
    }

    return { positions: pos, colors: col };
  }, []);

  useFrame((state) => {
    if (pointsRef.current) {
      const t = state.clock.getElapsedTime();
      const scroll = scrollOffset.current || 0;

      // Visible, majestic continuous galactic drift + mouse rotation
      const mouseRotY = (state.pointer.x * Math.PI) / 14;
      const mouseRotX = -(state.pointer.y * Math.PI) / 20;

      pointsRef.current.rotation.y = THREE.MathUtils.lerp(
        pointsRef.current.rotation.y,
        t * 0.038 + scroll * 0.35 + mouseRotY,
        0.04
      );
      pointsRef.current.rotation.x = THREE.MathUtils.lerp(
        pointsRef.current.rotation.x,
        t * 0.014 + scroll * 0.18 + mouseRotX,
        0.04
      );

      // Subtle mouse parallax
      const targetMouseX = state.pointer.x * 0.035;
      const targetMouseY = state.pointer.y * 0.035;
      pointsRef.current.rotation.z = THREE.MathUtils.lerp(pointsRef.current.rotation.z, targetMouseX, 0.03);
      pointsRef.current.position.y = THREE.MathUtils.lerp(pointsRef.current.position.y, targetMouseY * 3 - scroll * 15, 0.04);
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={colors.length / 3}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.048}
        map={starMap}
        vertexColors
        transparent
        opacity={0.95}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   2. BRIGHT NAVIGATIONAL STARS (High-Magnitude Major Celestial Beacons)
   Prominent stars (Sirius, Canopus, Rigel, Vega) with radiant intensity
   ───────────────────────────────────────────────────────────────────────────── */
function MajorNavigationalStars({ scrollOffset }) {
  const pointsRef = useRef();
  const starMap = useMemo(() => getCircularStarTexture(), []);

  const { positions, colors } = useMemo(() => {
    const count = 90; // Selected major navigational stars
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);

    const palette = [
      new THREE.Color('#ffffff'),
      new THREE.Color('#bfdbfe'),
      new THREE.Color('#fef08a'),
      new THREE.Color('#fed7aa')
    ];

    for (let i = 0; i < count; i++) {
      const radius = Math.random() * 110 + 30;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      pos[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = radius * Math.cos(phi) - 10;

      const c = palette[Math.floor(Math.random() * palette.length)];
      col[i * 3] = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;
    }
    return { positions: pos, colors: col };
  }, []);

  useFrame((state) => {
    if (pointsRef.current) {
      const t = state.clock.getElapsedTime();
      const scroll = scrollOffset.current || 0;
      const mouseRotY = (state.pointer.x * Math.PI) / 10;
      const mouseRotX = -(state.pointer.y * Math.PI) / 16;

      // Continuous synchronized drift + mouse rotation
      pointsRef.current.rotation.y = THREE.MathUtils.lerp(
        pointsRef.current.rotation.y,
        t * 0.038 + scroll * 0.35 + mouseRotY,
        0.04
      );
      pointsRef.current.rotation.x = THREE.MathUtils.lerp(
        pointsRef.current.rotation.x,
        t * 0.014 + scroll * 0.18 + mouseRotX,
        0.04
      );
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={colors.length / 3}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.092}
        map={starMap}
        vertexColors
        transparent
        opacity={1.0}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   3. HIGH-SPEED ION SHOOTING STARS & METEORS ACROSS THE VACUUM
   ───────────────────────────────────────────────────────────────────────────── */
function GlobalShootingStars() {
  const lineRef1 = useRef();
  const lineRef2 = useRef();

  const meteor1 = useRef({ active: false, x: 0, y: 0, z: -8, vx: 0, vy: 0, progress: 0, length: 4 });
  const meteor2 = useRef({ active: false, x: 0, y: 0, z: -12, vx: 0, vy: 0, progress: 0, length: 5 });

  const points1 = useMemo(() => [new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, 0)], []);
  const points2 = useMemo(() => [new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, 0)], []);
  const geom1 = useMemo(() => new THREE.BufferGeometry().setFromPoints(points1), [points1]);
  const geom2 = useMemo(() => new THREE.BufferGeometry().setFromPoints(points2), [points2]);

  const updateMeteor = (s, lineRef, geom, delta) => {
    if (!s.active) {
      if (Math.random() < 0.035) {
        s.active = true;
        s.x = (Math.random() - 0.35) * 28;
        s.y = Math.random() * 12 + 3;
        s.z = -Math.random() * 12 - 5;
        const angle = Math.PI / 4 + (Math.random() - 0.5) * 0.25;
        const speed = Math.random() * 24 + 18;
        s.vx = -Math.cos(angle) * speed;
        s.vy = -Math.sin(angle) * speed;
        s.progress = 1.0;
        s.length = Math.random() * 3.5 + 2.0;
      }
    } else {
      s.x += s.vx * delta;
      s.y += s.vy * delta;
      s.progress -= delta * 1.8;

      if (s.progress <= 0 || s.y < -14) {
        s.active = false;
      } else if (lineRef.current) {
        const head = new THREE.Vector3(s.x, s.y, s.z);
        const norm = Math.sqrt(s.vx * s.vx + s.vy * s.vy);
        const tail = new THREE.Vector3(
          s.x - (s.vx / norm) * s.length,
          s.y - (s.vy / norm) * s.length,
          s.z
        );
        geom.setFromPoints([tail, head]);
        lineRef.current.material.opacity = s.progress * 0.95;
      }
    }
  };

  useFrame((state, delta) => {
    updateMeteor(meteor1.current, lineRef1, geom1, delta);
    updateMeteor(meteor2.current, lineRef2, geom2, delta);
  });

  return (
    <>
      <line ref={lineRef1} geometry={geom1}>
        <lineBasicMaterial
          color="#ffffff"
          transparent
          opacity={0}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </line>
      <line ref={lineRef2} geometry={geom2}>
        <lineBasicMaterial
          color="#e0f2fe"
          transparent
          opacity={0}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </line>
    </>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   4. SEAMLESS DEEP SPACE CAMERA RIG WITH SCROLL CONTINUITY
   ───────────────────────────────────────────────────────────────────────────── */
function GlobalSpaceCameraRig({ scrollOffset }) {
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    const scroll = scrollOffset.current || 0;

    // Zero-g observer drifting breath
    const targetCamX = Math.sin(t * 0.22) * 0.18 + (state.pointer.x * 0.25);
    const targetCamY = Math.cos(t * 0.26) * 0.16 - (state.pointer.y * 0.18) - scroll * 6;
    const targetCamZ = 14 - scroll * 3;

    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, targetCamX, 0.04);
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, targetCamY, 0.04);
    state.camera.position.z = THREE.MathUtils.lerp(state.camera.position.z, targetCamZ, 0.04);

    state.camera.lookAt(0, -scroll * 4, -8);
  });

  return null;
}

/* ─────────────────────────────────────────────────────────────────────────────
   5. EXPORTED GLOBAL COSMIC BACKGROUND (Pitch-Black Vacuum + Real Stars Across Entire Page)
   ───────────────────────────────────────────────────────────────────────────── */
export default function GlobalCosmicBackground({ currentTheme = 'orbital_sunrise' }) {
  const activeTheme = getTheme(currentTheme);
  const scrollOffset = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || window.pageYOffset;
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      scrollOffset.current = totalScroll > 0 ? scrollY / totalScroll : 0;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div 
      className="fixed inset-0 w-full h-full pointer-events-none z-0 overflow-hidden transition-colors duration-1000"
      style={{ backgroundColor: activeTheme.bgCore }}
    >
      <div 
        className="absolute top-0 right-0 w-[800px] h-[800px] rounded-full blur-[180px] opacity-[0.06] pointer-events-none transition-all duration-1000 bg-sky-900"
      />
      <div 
        className="absolute bottom-0 left-0 w-[700px] h-[700px] rounded-full blur-[180px] opacity-[0.04] pointer-events-none transition-all duration-1000 bg-indigo-950"
      />
      <CanvasErrorBoundary fallback={<div className="fixed inset-0 bg-[#020308] z-0" />}>
        <Canvas
          camera={{ position: [0, 0, 14], fov: 48 }}
          gl={{
            antialias: true,
          alpha: true,
          powerPreference: 'default',
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.2
        }}
        dpr={[1, 1.2]}
      >
        {/* Dynamic Space Observer Camera Movement */}
        <GlobalSpaceCameraRig scrollOffset={scrollOffset} />

        {/* Ambient & Cosmic Fill Lights */}
        <ambientLight intensity={0.25} color="#030611" />

        {/* ── 1. Pinpoint Realistic Astrophysical Starfield Across Entire Page ── */}
        <DeepSpacePinpointStars theme={activeTheme} scrollOffset={scrollOffset} />

        {/* ── 2. Prominent High-Magnitude Navigational Beacon Stars ── */}
        <MajorNavigationalStars scrollOffset={scrollOffset} />

        {/* ── 3. Deep Space Distant Star Clusters ── */}
        <Stars
          radius={140}
          depth={80}
          count={2500}
          factor={4}
          saturation={0.1}
          fade
          speed={1.6}
        />
        </Canvas>
      </CanvasErrorBoundary>
    </div>
  );
}
