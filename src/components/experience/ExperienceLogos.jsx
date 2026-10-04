import React from 'react';

/**
 * High-definition vector logo badges for each experience milestone.
 */

// 1. Invicto Logo Badge
export function InvictoLogo({ className = "w-12 h-12" }) {
  return (
    <div className={`relative flex items-center justify-center rounded-2xl bg-white p-2 shadow-lg border border-white/20 overflow-hidden flex-shrink-0 ${className}`}>
      <div className="flex flex-col items-center justify-center">
        <span className="font-sans font-extrabold text-[15px] sm:text-[17px] tracking-tight text-[#0a1128] leading-none">
          Invicto
        </span>
        <span className="w-5 h-0.5 rounded-full bg-blue-600 mt-1" />
      </div>
    </div>
  );
}

// 2. Snipe Tech Official Logo Badge (from PDF letterhead)
export function SnipeTechLogo({ className = "w-12 h-12" }) {
  return (
    <div className={`relative flex items-center justify-center rounded-2xl bg-[#0b101d] p-1.5 shadow-lg border border-cyan-500/40 overflow-hidden flex-shrink-0 group ${className}`}>
      <div className="flex items-center justify-center w-full h-full">
        {/* Concentric Radar / Optical Target Vector matching Snipe Tech letterhead */}
        <svg viewBox="0 0 100 100" className="w-full h-full" fill="none">
          <circle cx="50" cy="50" r="44" stroke="#38bdf8" strokeWidth="3" opacity="0.6" strokeDasharray="4 2" />
          <circle cx="50" cy="50" r="34" stroke="#ffffff" strokeWidth="4" />
          <circle cx="50" cy="50" r="22" stroke="#38bdf8" strokeWidth="3" />
          <circle cx="50" cy="50" r="10" fill="#38bdf8" />
          {/* Sniper / Tech Crosshairs */}
          <line x1="50" y1="6" x2="50" y2="28" stroke="#ffffff" strokeWidth="4" strokeLinecap="round" />
          <line x1="50" y1="72" x2="50" y2="94" stroke="#ffffff" strokeWidth="4" strokeLinecap="round" />
          <line x1="6" y1="50" x2="28" y2="50" stroke="#ffffff" strokeWidth="4" strokeLinecap="round" />
          <line x1="72" y1="50" x2="94" y2="50" stroke="#ffffff" strokeWidth="4" strokeLinecap="round" />
        </svg>
      </div>
    </div>
  );
}

// 3. Infosys Springboard Logo Badge
export function InfosysSpringboardLogo({ className = "w-12 h-12" }) {
  return (
    <div className={`relative flex items-center justify-center rounded-2xl bg-white p-2 shadow-lg border border-white/20 overflow-hidden flex-shrink-0 ${className}`}>
      <div className="flex flex-col items-center justify-center text-center">
        <span className="font-serif font-bold text-[14px] sm:text-[15px] tracking-tight text-[#007cc3] leading-none">
          Infosys
        </span>
        <span className="font-sans font-semibold text-[8px] sm:text-[9px] tracking-wider uppercase text-amber-600 mt-0.5 leading-none">
          Springboard
        </span>
      </div>
    </div>
  );
}
