import React, { useState, useEffect, useRef } from 'react';

export default function OrbitalPreloader({ activeTheme, onComplete }) {
  const [progress, setProgress] = useState(0);
  const [stage, setStage] = useState('loading'); // 'loading' | 'emerge' | 'launch' | 'done'
  const [fadeOut, setFadeOut] = useState(false);
  const hasTriggeredRef = useRef(false);

  const primaryColor = activeTheme?.rimLeft || '#f59e0b';
  const secondaryColor = activeTheme?.rimRight || '#38bdf8';

  // 1. Progress: 0% to 100% completes smoothly in 2.5 seconds (slower, readable pace)
  useEffect(() => {
    const duration = 2500; // 2.5 seconds for steady, visible completion
    const startTime = performance.now();

    let frameId;
    const tick = (now) => {
      const elapsed = now - startTime;
      const pct = Math.min(100, Math.floor((elapsed / duration) * 100));
      setProgress(pct);

      if (pct < 100) {
        frameId = requestAnimationFrame(tick);
      } else {
        // Reached 100%! Trigger rocket emergence once
        if (!hasTriggeredRef.current) {
          hasTriggeredRef.current = true;
          triggerRocketLaunch();
        }
      }
    };

    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, []);

  const triggerRocketLaunch = () => {
    // Stage 1: Rocket emerges from the round orbit
    setStage('emerge');

    // Stage 2: After hovering for ~900ms so user clearly reads WELCOME, rocket blasts upward
    const launchTimer = setTimeout(() => {
      setStage('launch');
    }, 900);

    // Stage 3: Rocket is shooting up -> IMMEDIATELY fade preloader and reveal home page!
    // No lingering orbit, no delay!
    const revealHomeTimer = setTimeout(() => {
      setFadeOut(true);
      if (onComplete) onComplete();
    }, 1300);

    // Clean up
    const doneTimer = setTimeout(() => {
      setStage('done');
    }, 1600);

    return () => {
      clearTimeout(launchTimer);
      clearTimeout(revealHomeTimer);
      clearTimeout(doneTimer);
    };
  };

  if (stage === 'done') return null;

  return (
    <div 
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#020308] select-none transition-opacity duration-300 ease-out ${
        fadeOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <div className="relative flex flex-col items-center gap-4">

        {/* ────────────────────────────────────────────────────────────
            EXACT OLD ORBIT SPINNER
            Spins during 0-100%, then FADES OUT completely when rocket emerges!
            (Never rounds again after rocket!)
            ──────────────────────────────────────────────────────────── */}
        <div className="relative w-16 h-16 flex items-center justify-center">

          {/* Flash ring when hitting 100% */}
          {stage === 'emerge' && (
            <div 
              className="absolute inset-0 rounded-full border-2 animate-ping pointer-events-none"
              style={{ borderColor: primaryColor }}
            />
          )}

          {/* Original Spinning Orbital Ring (Fades out when rocket emerges, NEVER shows again) */}
          <div 
            className={`absolute inset-0 rounded-full border-2 border-white/10 transition-all duration-300 ${
              stage === 'loading'
                ? 'opacity-100 scale-100 animate-spin'
                : 'opacity-0 scale-125 pointer-events-none'
            }`}
            style={{ borderTopColor: primaryColor }}
          />

          {/* Original Pulsing Center Core (fades out as rocket appears) */}
          <div 
            className={`w-3 h-3 rounded-full animate-pulse transition-opacity duration-200 ${
              stage === 'loading' ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
            style={{ 
              backgroundColor: primaryColor,
              boxShadow: `0 0 16px ${primaryColor}` 
            }}
          />

          {/* ────────────────────────────────────────────────────────────
              ROCKET COMING OUT OF THE ROUND ORBIT WITH WELCOME FLAG
              Emerges from round orbit -> hovers for clarity -> launches straight UP
              ──────────────────────────────────────────────────────────── */}
          <div 
            className={`absolute flex flex-col items-center pointer-events-none transition-all ${
              stage === 'loading'
                ? 'opacity-0 scale-0'
                : stage === 'emerge'
                ? 'opacity-100 scale-100 translate-y-0 duration-300 ease-out'
                : 'opacity-100 scale-100 -translate-y-[150vh] duration-700 ease-in'
            }`}
            style={{
              willChange: 'transform, opacity'
            }}
          >
            {/* Rocket & Flag Assembly */}
            <div 
              className="relative flex items-center justify-center -translate-x-8 sm:-translate-x-9"
              style={{
                animation: stage === 'emerge' ? 'rocketZeroGHover 1.5s ease-in-out infinite' : 'none'
              }}
            >

              {/* WELCOME FLAG / BANNER (Waving in zero-g) */}
              <div 
                className="absolute left-[60px] top-1/2 -translate-y-1/2 flex items-center origin-left"
                style={{
                  animation: 'welcomeFlagWave 1.4s ease-in-out infinite'
                }}
              >
                {/* Tether Lines Attached to Rocket Wing */}
                <div className="flex flex-col justify-between h-10 w-5 relative">
                  <div 
                    className="h-[2px] w-full origin-left rotate-6"
                    style={{ backgroundColor: primaryColor }}
                  />
                  <div 
                    className="h-[2px] w-full origin-left -rotate-6"
                    style={{ backgroundColor: primaryColor }}
                  />
                </div>

                {/* Flag Cloth Pennant */}
                <div 
                  className="relative px-3.5 py-2 rounded-l-md border shadow-2xl backdrop-blur-md flex items-center gap-2"
                  style={{
                    backgroundColor: 'rgba(5, 10, 24, 0.96)',
                    borderColor: primaryColor,
                    boxShadow: `0 0 22px ${primaryColor}88, inset 0 0 10px ${primaryColor}33`
                  }}
                >
                  <span className="text-base select-none">🚀</span>
                  <div className="flex flex-col">
                    <span 
                      className="font-mono text-xs sm:text-sm font-black tracking-widest uppercase drop-shadow-[0_0_10px_rgba(255,255,255,0.9)]"
                      style={{ color: '#ffffff' }}
                    >
                      WELCOME
                    </span>
                    <span className="font-mono text-[8px] tracking-wider text-amber-200/90 font-semibold uppercase">
                      TO MY UNIVERSE
                    </span>
                  </div>
                  <span 
                    className="w-1.5 h-1.5 rounded-full animate-ping ml-0.5"
                    style={{ backgroundColor: primaryColor }}
                  />
                </div>

                {/* Swallowtail Pennant Notch */}
                <div 
                  className="w-0 h-0 border-y-[18px] border-y-transparent border-l-[12px]"
                  style={{ borderLeftColor: primaryColor }}
                />
              </div>

              {/* ROCKET BODY (SVG) */}
              <div className="relative z-10 flex flex-col items-center">
                <svg 
                  width="68" 
                  height="106" 
                  viewBox="0 0 60 96" 
                  fill="none" 
                  xmlns="http://www.w3.org/2000/svg"
                  className="drop-shadow-[0_0_24px_rgba(255,255,255,0.45)]"
                >
                  <defs>
                    <linearGradient id="fuselageBody" x1="0" y1="0" x2="60" y2="0" gradientUnits="userSpaceOnUse">
                      <stop offset="0%" stopColor="#94a3b8" />
                      <stop offset="35%" stopColor="#f8fafc" />
                      <stop offset="65%" stopColor="#ffffff" />
                      <stop offset="100%" stopColor="#64748b" />
                    </linearGradient>
                    <linearGradient id="cockpitVisor" x1="26" y1="26" x2="34" y2="34" gradientUnits="userSpaceOnUse">
                      <stop offset="0%" stopColor="#38bdf8" />
                      <stop offset="100%" stopColor="#0369a1" />
                    </linearGradient>
                  </defs>

                  {/* Left Fin */}
                  <path d="M19 56L6 76C4 79 7 82 10 82H19V56Z" fill="#334155" stroke={primaryColor} strokeWidth="1" />
                  
                  {/* Right Fin */}
                  <path d="M41 56L54 76C56 79 53 82 50 82H41V56Z" fill="#334155" stroke={primaryColor} strokeWidth="1" />

                  {/* Fuselage */}
                  <path 
                    d="M30 4C24 16 19 35 19 62C19 72 20 78 22 78H38C40 78 41 72 41 62C41 35 36 16 30 4Z" 
                    fill="url(#fuselageBody)" 
                    stroke="#cbd5e1" 
                    strokeWidth="1.2"
                  />

                  {/* Tip Needle */}
                  <line x1="30" y1="0" x2="30" y2="6" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
                  <circle cx="30" cy="1" r="1.5" fill={primaryColor} />

                  {/* Accent Livery Stripes */}
                  <path d="M20 46C23 48 37 48 40 46" stroke={primaryColor} strokeWidth="2.5" fill="none" />
                  <path d="M21 52C24 53 36 53 39 52" stroke={secondaryColor} strokeWidth="1" fill="none" />

                  {/* Cockpit Visor */}
                  <circle cx="30" cy="30" r="6.5" fill="#0f172a" stroke="#ffffff" strokeWidth="1" />
                  <circle cx="30" cy="30" r="5.5" fill="url(#cockpitVisor)" />
                  <ellipse cx="28.5" cy="28" rx="2.5" ry="1.2" fill="#ffffff" opacity="0.8" />

                  {/* Engine Nozzle */}
                  <path d="M25 78L23 85H37L35 78H25Z" fill="#1e293b" stroke="#475569" strokeWidth="1" />
                </svg>

                {/* Rocket Thruster Plasma Flame */}
                <div className="relative -mt-2 flex items-center justify-center">
                  <div 
                    className={`w-7 rounded-full blur-[1px] transition-all duration-200 ${
                      stage === 'launch' ? 'h-28 scale-y-150' : 'h-12'
                    }`}
                    style={{
                      background: 'linear-gradient(to bottom, #ffffff 0%, #38bdf8 25%, #f59e0b 65%, #ef4444 90%, transparent 100%)',
                      animation: 'rocketFlameFlicker 0.1s ease-in-out infinite alternate',
                      boxShadow: '0 0 20px #f59e0b'
                    }}
                  />
                  <div className="absolute top-0 w-2.5 h-7 rounded-full bg-white blur-[0.5px]" />
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* ────────────────────────────────────────────────────────────
            ORIGINAL TEXT WITH 0-100% COUNTER
            Fades away smoothly as rocket launches
            ──────────────────────────────────────────────────────────── */}
        <div 
          className={`flex items-center gap-2 font-mono text-xs tracking-widest text-slate-400 uppercase transition-opacity duration-300 ${
            stage === 'launch' || fadeOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
          }`}
        >
          <span 
            className="w-1.5 h-1.5 rounded-full animate-ping"
            style={{ backgroundColor: primaryColor }}
          />
          <span>INITIALIZING ORBITAL SYSTEMS</span>
          <span 
            className="font-bold ml-1 transition-all"
            style={{ color: primaryColor }}
          >
            {progress}%
          </span>
        </div>

      </div>

      {/* Flag & Flame Keyframe Animations */}
      <style>{`
        @keyframes welcomeFlagWave {
          0%, 100% {
            transform: perspective(300px) rotateY(0deg) skewY(0deg);
          }
          50% {
            transform: perspective(300px) rotateY(-18deg) skewY(-3deg) translateZ(3px);
          }
        }

        @keyframes rocketFlameFlicker {
          0% {
            transform: scaleY(1) scaleX(1);
            opacity: 0.95;
          }
          100% {
            transform: scaleY(1.3) scaleX(0.92);
            opacity: 1;
          }
        }

        @keyframes rocketZeroGHover {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-5px) rotate(0.4deg);
          }
        }
      `}</style>
    </div>
  );
}
