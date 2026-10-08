import React, { useState, useEffect } from 'react';
import {
  Navbar,
  GlobalCosmicBackground,
  AstronautHero,
  AboutConnectSection,
  SkillsSection,
  ProjectsSection,
  ExperienceSection,
  ContactSection,
  Footer,
  OrbitalPreloader,
  CustomSpaceCursor
} from './components';
import { getTheme, themes } from './themeConfig';

export default function App() {
  const [currentTheme, setCurrentTheme] = useState('orbital_sunrise');
  const [activeNav, setActiveNav] = useState('Home');
  const [isModelReady, setIsModelReady] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const activeTheme = getTheme(currentTheme);

  // Safety fallback: ensure model readiness after max 2.5s even if network is slow
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsModelReady(true);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  // Dynamically update the theme-color meta tag for mobile browsers
  useEffect(() => {
    let metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (!metaThemeColor) {
      metaThemeColor = document.createElement('meta');
      metaThemeColor.name = 'theme-color';
      document.head.appendChild(metaThemeColor);
    }
    metaThemeColor.setAttribute('content', activeTheme.bgCore || '#020308');
    
    // Dynamically update body and html background color to ensure mobile overscroll bounce matches the theme
    document.body.style.backgroundColor = activeTheme.bgCore;
    document.documentElement.style.backgroundColor = activeTheme.bgCore;
  }, [activeTheme]);

  // Track active section during scroll
  useEffect(() => {
    const sections = ['home', 'about', 'skills', 'projects', 'experience', 'contact'];
    const handleScroll = () => {
      const windowHeight = window.innerHeight;

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= windowHeight * 0.45 && rect.bottom >= windowHeight * 0.45) {
            const capitalized = sections[i].charAt(0).toUpperCase() + sections[i].slice(1);
            setActiveNav(capitalized);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (item) => {
    setActiveNav(item);
    const lower = item.toLowerCase();
    const targetId = lower === 'contact' ? 'contact' : lower;
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div 
      className="relative w-full min-h-screen text-white selection:bg-amber-500/30 transition-colors duration-1000"
      style={{ backgroundColor: activeTheme.bgCore }}
    >
      
      {/* ────────────────────────────────────────────────────────────
          ORBITAL SYSTEMS LAUNCH PRELOADER
          0-100% telemetry -> Rocket emergence with WELCOME flag ->
          Launch above page -> Instant Home reveal
          ──────────────────────────────────────────────────────────── */}
      {!isLoaded && (
        <OrbitalPreloader 
          activeTheme={activeTheme}
          isModelReady={isModelReady}
          onComplete={() => setIsLoaded(true)}
        />
      )}

      {/* ────────────────────────────────────────────────────────────
          1. GLOBAL 3D COSMIC CANVAS (Rotating Orbits, Moving Stars, Meteors)
          Active across the entire single page!
          ──────────────────────────────────────────────────────────── */}
      <GlobalCosmicBackground currentTheme={currentTheme} />

      {/* ────────────────────────────────────────────────────────────
          2. DYNAMIC THEME NEBULA ATMOSPHERIC BACKSCATTERING GLOWS
          ──────────────────────────────────────────────────────────── */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div 
          className="absolute top-1/4 -left-48 w-[700px] h-[700px] rounded-full blur-[180px] opacity-20 transition-all duration-1000"
          style={{ backgroundColor: activeTheme.rimLeft }}
        />
        <div 
          className="absolute top-2/3 -right-48 w-[700px] h-[700px] rounded-full blur-[180px] opacity-20 transition-all duration-1000"
          style={{ backgroundColor: activeTheme.rimRight }}
        />
        <div 
          className="absolute top-1/2 left-1/3 w-[500px] h-[500px] rounded-full blur-[200px] opacity-10 transition-all duration-1000"
          style={{ backgroundColor: activeTheme.gasPrimary || activeTheme.rimLeft }}
        />

        {/* Cinematic Deep Space Radial Vignette */}
        <div 
          className="absolute inset-0 transition-colors duration-1000"
          style={{
            background: `radial-gradient(ellipse at center, transparent 35%, ${activeTheme.bgCore}A6 80%, ${activeTheme.bgCore} 100%)`,
            boxShadow: 'inset 0 0 160px rgba(0,0,0,0.95)'
          }}
        />
      </div>

      {/* Fixed High Z-Index Navbar across entire scrolling page */}
      <Navbar 
        currentTheme={currentTheme} 
        onThemeChange={setCurrentTheme} 
        activeNav={activeNav}
        onNavClick={handleNavClick}
      />

      {/* Main Scrollable Content (Stacked Sections) */}
      <div className="relative z-10 w-full">
        
        {/* 1. Hero Section (Home) */}
        <AstronautHero 
          currentTheme={currentTheme} 
          isLoaded={isLoaded}
          onModelLoaded={() => setIsModelReady(true)}
        />

        {/* 2. About Me & Let's Connect Cards (About / Contact) */}
        <AboutConnectSection currentTheme={currentTheme} />

        {/* 3. Skills & Arsenal */}
        <SkillsSection currentTheme={currentTheme} />

        {/* 4. Featured Projects */}
        <ProjectsSection currentTheme={currentTheme} />

        {/* 5. Experience & Milestones */}
        <ExperienceSection currentTheme={currentTheme} />

        {/* 6. Contact / Get in Touch */}
        <ContactSection currentTheme={currentTheme} />

        {/* Clean Footer Matching User Reference Design */}
        <Footer currentTheme={currentTheme} />

      </div>

      {/* High-Tech Sci-Fi Orbital Reticle Cursor matching background colors */}
      <CustomSpaceCursor activeTheme={activeTheme} />

    </div>
  );
}

