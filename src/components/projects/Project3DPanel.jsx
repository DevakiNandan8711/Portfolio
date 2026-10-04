import React, { Suspense, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import SharedSpaceBackground from './scenes/SharedSpaceBackground';
import SceneSwitcher from './SceneSwitcher';
import { useProjectVideo } from './useProjectVideo';
import { CanvasErrorBoundary } from '../ui/CanvasErrorBoundary';

// Test WebGL availability
function checkWebGLSupport() {
  try {
    const canvas = document.createElement('canvas');
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext('webgl') ||
        canvas.getContext('experimental-webgl') ||
        canvas.getContext('webgl2'))
    );
  } catch (e) {
    return false;
  }
}

/**
 * 2D Fallback Frame when WebGL is unavailable
 */
function Fallback2DFrame({ project, prefersReducedMotion }) {
  const [videoError, setVideoError] = useState(false);
  const targetSpeed = prefersReducedMotion ? 1.0 : (project.speed || 4.0);

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center p-6 text-center bg-transparent">
      <div className="relative w-full max-w-lg aspect-video rounded-2xl overflow-hidden border border-white/10 bg-black/40 shadow-2xl">
        {!videoError ? (
          <video
            src={project.video}
            poster={project.poster}
            autoPlay
            loop
            muted
            playsInline
            onError={() => setVideoError(true)}
            ref={(el) => {
              if (el) el.playbackRate = targetSpeed;
            }}
            className="w-full h-full object-cover"
            style={{ filter: 'blur(2px)' }}
          />
        ) : (
          <img
            src={project.poster}
            alt={project.name}
            className="w-full h-full object-cover"
            style={{ filter: 'blur(2px)' }}
          />
        )}
      </div>
    </div>
  );
}

/**
 * Right Panel: Three.js 3D Scene with seamless transparent cosmic background.
 */
export default function Project3DPanel({
  activeProject,
  activeIndex,
  isSectionVisible = true,
  prefersReducedMotion = false
}) {
  const [hasWebGL, setHasWebGL] = useState(true);
  const [isLowEnd, setIsLowEnd] = useState(false);

  // Check hardware and WebGL support on mount
  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    const isWeakCpu = navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4;
    
    // Disable WebGL video textures on mobile to prevent out-of-memory crashes
    setHasWebGL(!isMobile && checkWebGLSupport());
    setIsLowEnd(isMobile || isWeakCpu);
  }, []);

  // Hook handles video loading, playbackRate = project.speed, visibility pauses, and poster fallback
  const { texture, isReady } = useProjectVideo(
    activeProject,
    isSectionVisible,
    prefersReducedMotion
  );

  if (!hasWebGL) {
    return <Fallback2DFrame project={activeProject} prefersReducedMotion={prefersReducedMotion} />;
  }

  return (
    <div className="relative w-full h-full min-h-[260px] sm:min-h-[380px] lg:min-h-[480px] rounded-3xl overflow-hidden bg-transparent group">
      {/* Three.js Shared Canvas with Transparent Canvas for Seamless Cosmic Background */}
      <CanvasErrorBoundary>
        <Canvas
          camera={{ position: [0, 0, 4.4], fov: 45 }}
          dpr={[1, 1.5]}
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: 'high-performance'
          }}
          className="w-full h-full cursor-grab active:cursor-grabbing bg-transparent"
        >
        <Suspense fallback={null}>
          <SharedSpaceBackground isLowEnd={isLowEnd} prefersReducedMotion={prefersReducedMotion} />

          <SceneSwitcher
            activeIndex={activeIndex}
            texture={texture}
            isReady={isReady}
            prefersReducedMotion={prefersReducedMotion}
            isLowEnd={isLowEnd}
          />

          <OrbitControls
            enableZoom={false}
            enablePan={false}
            minAzimuthAngle={-Math.PI / 4}
            maxAzimuthAngle={Math.PI / 4}
            minPolarAngle={Math.PI / 3}
            maxPolarAngle={Math.PI / 1.8}
            autoRotate={!prefersReducedMotion}
            autoRotateSpeed={0.7}
            dampingFactor={0.06}
          />
        </Suspense>
      </Canvas>
      </CanvasErrorBoundary>

    </div>
  );
}
