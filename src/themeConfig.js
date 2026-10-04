export const themes = [
  {
    id: 'orbital_sunrise',
    name: 'ORBIT SUNRISE',
    icon: '🌅',
    nebulaName: 'Atmospheric Orbital Sunrise & Daybreak',
    bgImage: '/real_orbital_sunrise.jpg',
    rimLeft: '#f59e0b',          // Brilliant Solar Flare Gold
    rimRight: '#38bdf8',         // Rayleigh Blue Atmospheric Edge
    gasPrimary: '#b45309',
    gasSecondary: '#0284c7',
    accentGradient: 'from-amber-200 via-yellow-200 to-sky-300',
    textGlow: 'rgba(245, 158, 11, 0.45)',
    starColor: '#fef08a',
    resumeBorder: 'border-yellow-500/40 hover:border-sky-300',
    resumeBg: 'bg-amber-950/40',
    bgCore: '#030201'
  },
  {
    id: 'earth_orbit',
    name: 'EARTH ORBIT',
    icon: '🌍',
    nebulaName: 'Low Earth Orbit (Orbital Spacewalk EVA)',
    bgImage: '/real_earth_orbit.jpg',
    rimLeft: '#38bdf8',          // Earthshine Blue Atmospheric Scatter
    rimRight: '#ffffff',         // Direct Vacuum Solar Light
    gasPrimary: '#0284c7',
    gasSecondary: '#0369a1',
    accentGradient: 'from-sky-300 via-blue-200 to-indigo-300',
    textGlow: 'rgba(56, 189, 248, 0.45)',
    starColor: '#e0f2fe',
    resumeBorder: 'border-sky-500/40 hover:border-sky-300',
    resumeBg: 'bg-sky-950/40',
    bgCore: '#01040a'
  },
  {
    id: 'aurora_orbit',
    name: 'AURORA ORBIT',
    icon: '✨',
    nebulaName: 'Earth Polar Aurora Borealis Orbit',
    bgImage: '/real_earth_aurora.jpg',
    rimLeft: '#10b981',          // Aurora Green Emission
    rimRight: '#06b6d4',         // Ionosphere Cyan
    gasPrimary: '#059669',
    gasSecondary: '#0d9488',
    accentGradient: 'from-emerald-300 via-teal-200 to-cyan-300',
    textGlow: 'rgba(16, 185, 129, 0.45)',
    starColor: '#a7f3d0',
    resumeBorder: 'border-emerald-500/40 hover:border-teal-300',
    resumeBg: 'bg-emerald-950/40',
    bgCore: '#000805'
  },
  {
    id: 'moon_earthrise',
    name: 'LUNAR ORBIT',
    icon: '🌕',
    nebulaName: 'Lunar Orbit & Earthrise (Deep Space EVA)',
    bgImage: '/real_moon_earthrise.jpg',
    rimLeft: '#94a3b8',          // Lunar Regolith Silver Fill
    rimRight: '#38bdf8',         // Earth Marble Blue Starlight
    gasPrimary: '#334155',
    gasSecondary: '#1e293b',
    accentGradient: 'from-slate-100 via-sky-200 to-slate-400',
    textGlow: 'rgba(226, 232, 240, 0.4)',
    starColor: '#f8fafc',
    resumeBorder: 'border-slate-500/40 hover:border-slate-300',
    resumeBg: 'bg-slate-900/85',
    bgCore: '#010103'
  },
  {
    id: 'night_earth',
    name: 'NIGHT EARTH',
    icon: '🌃',
    nebulaName: 'Earth Nightside & City Light Grid',
    bgImage: '/real_earth_night.jpg',
    rimLeft: '#f59e0b',          // Urban City Lights Amber
    rimRight: '#60a5fa',         // Upper Stratosphere Blue
    gasPrimary: '#d97706',
    gasSecondary: '#2563eb',
    accentGradient: 'from-amber-300 via-orange-200 to-sky-300',
    textGlow: 'rgba(245, 158, 11, 0.45)',
    starColor: '#fef3c7',
    resumeBorder: 'border-amber-500/40 hover:border-amber-300',
    resumeBg: 'bg-amber-950/40',
    bgCore: '#040201'
  },
  {
    id: 'mars_orbit',
    name: 'MARS MISSION',
    icon: '🔴',
    nebulaName: 'Mars Orbit & Valles Marineris (Crew EVA)',
    bgImage: '/real_mars_orbit.jpg',
    rimLeft: '#ea580c',          // Mars Ochre / Dust Terracotta
    rimRight: '#f59e0b',         // Desert Solar Gold
    gasPrimary: '#9a3412',
    gasSecondary: '#c2410c',
    accentGradient: 'from-orange-300 via-amber-200 to-rose-300',
    textGlow: 'rgba(234, 88, 12, 0.45)',
    starColor: '#fed7aa',
    resumeBorder: 'border-orange-500/40 hover:border-amber-300',
    resumeBg: 'bg-orange-950/40',
    bgCore: '#050201'
  }
];

export function getTheme(id) {
  return themes.find((t) => t.id === id) || themes[0];
}

