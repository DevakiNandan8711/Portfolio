import React, { useState, useEffect, useRef, useMemo } from 'react';
import { getTheme } from '../../themeConfig';

/* ─────────────────────────────────────────────────────────────────────────────
   DEVAKI NANDAN — 3D CELESTIAL SPHERICAL SKILLS ARSENAL
   Interactive Fibonacci Sphere Word Cloud with 3D Depth, Inertia & Filtering
   ───────────────────────────────────────────────────────────────────────────── */

const SKILLS_DATA = [
  // 1. LANGUAGES (dot: #60a5fa)
  { name: 'Python', category: 'languages', weight: 1.45 },
  { name: 'SQL', category: 'languages', weight: 1.15 },

  // 2. AI / ML (dot: #c084fc)
  { name: 'Supervised Learning', category: 'ai_ml', weight: 1.05 },
  { name: 'Unsupervised Learning', category: 'ai_ml', weight: 1.05 },
  { name: 'ANN', category: 'ai_ml', weight: 0.95 },
  { name: 'CNN', category: 'ai_ml', weight: 1.15 },
  { name: 'RNN', category: 'ai_ml', weight: 0.95 },
  { name: 'Feature Engineering', category: 'ai_ml', weight: 1.05 },
  { name: 'Data Cleaning', category: 'ai_ml', weight: 0.9 },
  { name: 'Web Scraping', category: 'ai_ml', weight: 0.95 },
  { name: 'NLP', category: 'ai_ml', weight: 1.1 },
  { name: "LLM's", category: 'ai_ml', weight: 1.4 },
  { name: 'Transformers', category: 'ai_ml', weight: 1.3 },
  { name: 'Sentence Transformers', category: 'ai_ml', weight: 1.05 },
  { name: 'Hugging Face', category: 'ai_ml', weight: 1.2 },
  { name: 'RAG', category: 'ai_ml', weight: 1.35 },
  { name: 'Vector Databases', category: 'ai_ml', weight: 1.15 },
  { name: 'OpenAI APIs', category: 'ai_ml', weight: 1.35 },
  { name: 'gTTS', category: 'ai_ml', weight: 0.85 },
  { name: 'GANs', category: 'ai_ml', weight: 0.95 },
  { name: 'AI Agents', category: 'ai_ml', weight: 1.4 },
  { name: 'Agentic AI', category: 'ai_ml', weight: 1.4 },

  // 3. ROBOTICS & CV (dot: #34d399)
  { name: 'PyTorch', category: 'robotics_cv', weight: 1.35 },
  { name: 'Scikit-learn', category: 'robotics_cv', weight: 1.15 },
  { name: 'NumPy', category: 'robotics_cv', weight: 1.05 },
  { name: 'Pandas', category: 'robotics_cv', weight: 1.1 },
  { name: 'OpenCV', category: 'robotics_cv', weight: 1.25 },
  { name: 'MediaPipe', category: 'robotics_cv', weight: 1.2 },
  { name: 'Matplotlib', category: 'robotics_cv', weight: 0.95 },
  { name: 'spaCy', category: 'robotics_cv', weight: 1.0 },

  // 4. WEB, CLOUD & DATA (dot: #fbbf24)
  { name: 'FastAPI', category: 'web_cloud_data', weight: 1.3 },
  { name: 'Docker', category: 'web_cloud_data', weight: 1.3 },
  { name: 'LangChain', category: 'web_cloud_data', weight: 1.25 },
  { name: 'Agno', category: 'web_cloud_data', weight: 1.15 },
  { name: 'Flask', category: 'web_cloud_data', weight: 1.05 },
  { name: 'Streamlit', category: 'web_cloud_data', weight: 1.1 },
  { name: 'Kubernetes', category: 'web_cloud_data', weight: 1.2 },
  { name: 'CI/CD', category: 'web_cloud_data', weight: 1.05 },
  { name: 'Render', category: 'web_cloud_data', weight: 0.95 },
  { name: 'Vercel', category: 'web_cloud_data', weight: 1.0 },
  { name: 'Node.js', category: 'web_cloud_data', weight: 1.25 },
  { name: 'Express.js', category: 'web_cloud_data', weight: 1.1 },
  { name: 'RESTful APIs', category: 'web_cloud_data', weight: 1.15 },
  { name: 'MongoDB', category: 'web_cloud_data', weight: 1.2 },
  { name: 'Supabase', category: 'web_cloud_data', weight: 1.15 },
  { name: 'VSCode', category: 'web_cloud_data', weight: 1.0 },
  { name: 'Google Colab', category: 'web_cloud_data', weight: 1.0 },
  { name: 'Git', category: 'web_cloud_data', weight: 1.1 },
  { name: 'GitHub', category: 'web_cloud_data', weight: 1.15 }
];

const CATEGORIES = [
  { id: 'all', label: 'ALL', color: '#93c5fd', dot: null },
  { id: 'languages', label: 'LANGUAGES', color: '#60a5fa', dot: '#60a5fa' },
  { id: 'ai_ml', label: 'AI / ML', color: '#c084fc', dot: '#c084fc' },
  { id: 'robotics_cv', label: 'ROBOTICS & CV', color: '#34d399', dot: '#34d399' },
  { id: 'web_cloud_data', label: 'WEB, CLOUD & DATA', color: '#fbbf24', dot: '#fbbf24' }
];

const CATEGORY_COLORS = {
  languages: '#60a5fa',      // Electric Ice Blue
  ai_ml: '#c084fc',          // Vivid Lavender / Purple
  robotics_cv: '#34d399',    // Emerald / Mint
  web_cloud_data: '#fbbf24'  // Solar Amber / Golden
};

export default function SkillsSection({ currentTheme = 'orbital_sunrise' }) {
  const theme = getTheme(currentTheme);
  const [activeCategory, setActiveCategory] = useState('all');
  const [hoveredSkill, setHoveredSkill] = useState(null);

  const containerRef = useRef(null);
  const itemRefs = useRef([]);
  const rotX = useRef(0.2);
  const rotY = useRef(0.4);
  const velX = useRef(0);
  const velY = useRef(0);
  const isDragging = useRef(false);
  const lastMousePos = useRef({ x: 0, y: 0 });
  const sphereRadius = useRef(260);
  const [fontScale, setFontScale] = useState(13);

  // Compute Golden Spiral / Fibonacci Sphere coordinates on mount
  const baseCoords = useMemo(() => {
    const N = SKILLS_DATA.length;
    const coords = [];
    const phi = Math.PI * (3 - Math.sqrt(5)); // Golden ratio angle ~2.3999 rad

    for (let i = 0; i < N; i++) {
      const y = 1 - (i / (N - 1)) * 2; // y goes from 1 to -1
      const radiusAtY = Math.sqrt(Math.max(0, 1 - y * y));
      const theta = phi * i;

      const x = Math.cos(theta) * radiusAtY;
      const z = Math.sin(theta) * radiusAtY;

      coords.push({ x, y, z });
    }
    return coords;
  }, []);

  // Responsive radius adjustment
  useEffect(() => {
    const updateRadius = () => {
      if (typeof window === 'undefined') return;
      const width = window.innerWidth;
      
      // Prevent overlaps by sizing texts and radius correctly
      if (width < 450) {
        sphereRadius.current = 155;
        setFontScale(9.5); // Smaller text on very small phones
      } else if (width < 640) {
        sphereRadius.current = 180;
        setFontScale(11);
      } else if (width < 1024) {
        sphereRadius.current = 225;
        setFontScale(12.5);
      } else {
        sphereRadius.current = 285;
        setFontScale(13.5);
      }
    };
    updateRadius();
    window.addEventListener('resize', updateRadius);
    return () => window.removeEventListener('resize', updateRadius);
  }, []);

  // Interactive Drag Event Handlers
  const handlePointerDown = (e) => {
    isDragging.current = true;
    lastMousePos.current = { x: e.clientX || e.touches?.[0]?.clientX || 0, y: e.clientY || e.touches?.[0]?.clientY || 0 };
    velX.current = 0;
    velY.current = 0;
  };

  const handlePointerMove = (e) => {
    if (!isDragging.current) return;
    const clientX = e.clientX || e.touches?.[0]?.clientX || 0;
    const clientY = e.clientY || e.touches?.[0]?.clientY || 0;

    const dx = clientX - lastMousePos.current.x;
    const dy = clientY - lastMousePos.current.y;

    lastMousePos.current = { x: clientX, y: clientY };

    // Update rotations
    const sensitivity = 0.005;
    rotY.current += dx * sensitivity;
    rotX.current -= dy * sensitivity;

    // Track fling velocities
    velX.current = dx * sensitivity;
    velY.current = -dy * sensitivity;
  };

  const handlePointerUp = () => {
    isDragging.current = false;
  };

  // High-Performance 60FPS 3D Spherical Animation Loop (Direct DOM transforms)
  useEffect(() => {
    let animId;

    const renderLoop = () => {
      // Apply momentum decay or subtle auto-rotation
      if (!isDragging.current) {
        if (Math.abs(velX.current) > 0.0001 || Math.abs(velY.current) > 0.0001) {
          rotY.current += velX.current;
          rotX.current += velY.current;
          velX.current *= 0.93; // Smooth inertia damping
          velY.current *= 0.93;
        } else {
          // Slow continuous cosmic auto-rotation
          rotY.current += 0.0022;
          rotX.current += 0.0007;
        }
      }

      const rX = rotX.current;
      const rY = rotY.current;
      const R = sphereRadius.current;
      const D = R * 2.85; // Camera perspective distance

      const cosRX = Math.cos(rX);
      const sinRX = Math.sin(rX);
      const cosRY = Math.cos(rY);
      const sinRY = Math.sin(rY);

      for (let i = 0; i < SKILLS_DATA.length; i++) {
        const el = itemRefs.current[i];
        if (!el) continue;

        const base = baseCoords[i];

        // 3D Rotation Matrix Calculation
        // 1. Rotation around X
        const y1 = base.y * cosRX - base.z * sinRX;
        const z1 = base.y * sinRX + base.z * cosRX;
        const x1 = base.x;

        // 2. Rotation around Y
        const x2 = x1 * cosRY + z1 * sinRY;
        const z2 = -x1 * sinRY + z1 * cosRY;
        const y2 = y1;

        const x = x2 * R;
        const y = y2 * R;
        const z = z2 * R;

        // Perspective scale factor
        const scale = D / (D - z);
        const pz = (z + R) / (2 * R); // Depth normalized 0 (back) to 1 (front)

        const itemCategory = SKILLS_DATA[i].category;
        const isMatch = activeCategory === 'all' || itemCategory === activeCategory;
        const isHovered = hoveredSkill === SKILLS_DATA[i].name;

        // Opacity logic: Foreground is bright, background fades softly
        let opacity;
        if (isHovered) {
          opacity = 1.0;
        } else if (isMatch) {
          opacity = Math.max(0.22, pz * 0.78 + 0.2);
        } else {
          opacity = 0.08; // Dim out non-matching category items
        }

        const baseWeight = SKILLS_DATA[i].weight;
        const finalScale = scale * baseWeight * (isHovered ? 1.25 : 1.0);
        const zIndex = isHovered ? 999 : Math.round(pz * 100);

        const color = CATEGORY_COLORS[itemCategory] || '#ffffff';

        el.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${finalScale})`;
        el.style.opacity = opacity;
        el.style.zIndex = zIndex;

        if (isHovered) {
          el.style.filter = `drop-shadow(0 0 16px ${color}) brightness(1.35)`;
          el.style.color = '#ffffff';
        } else if (isMatch) {
          const glowRadius = Math.round(pz * 8);
          el.style.filter = `drop-shadow(0 0 ${glowRadius}px ${color}88)`;
          el.style.color = color;
        } else {
          el.style.filter = 'grayscale(0.8) blur(1.5px)';
          el.style.color = '#64748b';
        }
      }

      animId = requestAnimationFrame(renderLoop);
    };

    animId = requestAnimationFrame(renderLoop);
    return () => cancelAnimationFrame(animId);
  }, [baseCoords, activeCategory, hoveredSkill]);

  const activeSkillsCount = useMemo(() => {
    if (activeCategory === 'all') return SKILLS_DATA.length;
    return SKILLS_DATA.filter((s) => s.category === activeCategory).length;
  }, [activeCategory]);

  return (
    <section 
      id="skills" 
      className="snap-section relative w-full min-h-screen py-10 md:py-16 px-4 sm:px-8 md:px-12 flex flex-col justify-between select-none overflow-hidden"
    >
      
      {/* ── TOP BAR: "Skills" Title + Category Filter Pills directly underneath ── */}
      <div className="relative z-20 w-full max-w-6xl mx-auto flex flex-col items-start gap-4 sm:gap-6 pt-2">
        
        {/* Left: Elegant High-Contrast Editorial Serif Title */}
        <h2 className="font-['Playfair_Display',serif] text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-normal tracking-tight text-white drop-shadow-[0_4px_24px_rgba(255,255,255,0.25)]">
          Skills
        </h2>

        {/* Directly Below: Horizontal Capsule Filter Navigation Pills */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 rounded-full text-[11px] sm:text-xs font-mono font-medium tracking-wider transition-all duration-300 cursor-pointer ${
                  isActive
                    ? 'bg-[#93c5fd] text-[#020617] font-bold shadow-[0_0_20px_rgba(147,197,253,0.55)] scale-105'
                    : 'bg-black/50 border border-white/20 text-slate-300 hover:text-white hover:border-white/40 hover:bg-white/5'
                }`}
              >
                {cat.dot && (
                  <span 
                    className="w-2 h-2 rounded-full transition-transform duration-300"
                    style={{ 
                      backgroundColor: cat.dot,
                      boxShadow: isActive ? `0 0 8px ${cat.dot}` : 'none'
                    }}
                  />
                )}
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

      </div>

      {/* ── CENTER: 3D INTERACTIVE FIBONACCI CELESTIAL SPHERE ── */}
      <div 
        ref={containerRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        className="relative z-10 w-full flex-1 min-h-[380px] sm:min-h-[480px] md:min-h-[580px] flex items-center justify-center cursor-grab active:cursor-grabbing touch-pan-y my-2"
      >
        
        {/* Subtle Ambient Cosmic Coordinate Rings */}
        <div 
          className="absolute w-[280px] sm:w-[440px] md:w-[560px] h-[280px] sm:h-[440px] md:h-[560px] rounded-full border border-white/[0.04] pointer-events-none"
          style={{
            background: `radial-gradient(circle, ${theme.rimLeft}0c 0%, transparent 68%)`
          }}
        />
        <div 
          className="absolute w-[260px] sm:w-[340px] md:w-[430px] h-[260px] sm:h-[340px] md:h-[430px] rounded-full border border-dashed border-white/[0.06] pointer-events-none animate-spin"
          style={{ animationDuration: '90s' }}
        />

        {/* 3D Words Center Anchor */}
        <div className="absolute top-1/2 left-1/2 w-0 h-0 pointer-events-auto">
          {SKILLS_DATA.map((skill, idx) => (
            <div
              key={idx}
              ref={(el) => (itemRefs.current[idx] = el)}
              onMouseEnter={() => setHoveredSkill(skill.name)}
              onMouseLeave={() => setHoveredSkill(null)}
              onClick={() => setActiveCategory(skill.category)}
              className="absolute left-0 top-0 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap font-sans font-semibold tracking-tight transition-filter duration-200 cursor-pointer select-none"
              style={{
                fontSize: `${Math.round(skill.weight * fontScale)}px`,
                willChange: 'transform, opacity'
              }}
            >
              {skill.name}
            </div>
          ))}
        </div>

        {/* Floating Active Skill Badge on Hover */}
        {hoveredSkill && (
          <div className="absolute bottom-6 px-4 py-1.5 rounded-full bg-slate-900/90 border border-white/20 text-xs font-mono tracking-wider text-slate-200 backdrop-blur-md shadow-2xl pointer-events-none animate-fade-in flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            <span>TECHNOLOGY: <strong className="text-white">{hoveredSkill}</strong></span>
          </div>
        )}

      </div>

      {/* ── BOTTOM PROMPT: "DRAG TO SPIN" ── */}
      <div className="relative z-20 w-full flex items-center justify-center pb-2 pointer-events-none">
        <div className="flex items-center gap-2.5 text-slate-500 font-mono text-[11px] tracking-[0.28em] uppercase">
          <svg 
            className="w-3.5 h-3.5 animate-pulse text-slate-400" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
          </svg>
          <span>DRAG TO SPIN</span>
          <svg 
            className="w-3.5 h-3.5 animate-pulse text-slate-400" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
          </svg>
        </div>
      </div>

    </section>
  );
}
