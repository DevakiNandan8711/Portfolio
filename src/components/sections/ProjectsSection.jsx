import React, { useState, useEffect, useRef } from 'react';
import { projects } from '../../data/projects';
import { ProjectInfoCard, Project3DPanel } from '../projects';
import { getTheme } from '../../themeConfig';

/**
 * Projects Section
 * 
 * Features:
 * - Playfair Display serif title matching portfolio typography.
 * - 100% seamless background integration (no card boxes or separate card background colors).
 * - Left panel and Right 3D panel float directly over the cosmic space background.
 * - All videos playing at 3x speed rate.
 * - Arrow key navigation (← / →) with aria-labels.
 * - IntersectionObserver to pause off-screen and lazy load.
 */
export default function ProjectsSection({ currentTheme }) {
  const activeTheme = getTheme(currentTheme);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isSectionVisible, setIsSectionVisible] = useState(false);
  const [hasEnteredView, setHasEnteredView] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  const sectionRef = useRef(null);

  // Check prefers-reduced-motion media query
  useEffect(() => {
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mql.matches);
    const handleChange = (e) => setPrefersReducedMotion(e.matches);
    mql.addEventListener('change', handleChange);
    return () => mql.removeEventListener('change', handleChange);
  }, []);

  // IntersectionObserver for lazy loading and off-screen video pausing
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsSectionVisible(entry.isIntersecting);
        if (entry.isIntersecting) {
          setHasEnteredView(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Navigation handlers
  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev === 0 ? projects.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev === projects.length - 1 ? 0 : prev + 1));
  };

  const handleSelectProject = (index) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  // Keyboard navigation: Left and Right arrow keys
  useEffect(() => {
    const handleKeyDown = (e) => {
      const activeEl = document.activeElement;
      if (activeEl && ['INPUT', 'TEXTAREA'].includes(activeEl.tagName)) {
        return;
      }

      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        handleNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex]);

  const activeProject = projects[currentIndex] || projects[0];

  return (
    <section
      id="projects"
      ref={sectionRef}
      tabIndex={0}
      aria-label="Projects Section"
      className="snap-section relative w-full min-h-screen py-16 md:py-24 px-4 sm:px-8 md:px-12 flex flex-col items-center justify-center focus-visible:outline-none bg-transparent"
    >
      <div className="w-full max-w-6xl mx-auto flex flex-col">
        {/* ── Section Title: Playfair Display serif matching reference style ── */}
        <div className="relative z-10 w-full mb-8 md:mb-10 flex flex-col items-start">
          <h2 className="font-['Playfair_Display',serif] text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-normal tracking-tight text-white drop-shadow-[0_4px_24px_rgba(255,255,255,0.25)]">
            Projects
          </h2>
        </div>

        {/* ── Seamless Two-Column Layout (No Card Boxes, Same Background) ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start w-full min-h-[480px]">
          {/* Left Panel: Project Info (Mobile: order-2, Desktop: order-1) */}
          <div className="order-2 lg:order-1 w-full h-full">
            <ProjectInfoCard
              project={activeProject}
              currentIndex={currentIndex}
              totalProjects={projects.length}
              direction={direction}
              onPrev={handlePrev}
              onNext={handleNext}
              onSelectProject={handleSelectProject}
            />
          </div>

          {/* Right Panel: 3D Three.js Scene (Mobile: order-1 on top, Desktop: order-2) */}
          <div className="order-1 lg:order-2 w-full h-[280px] sm:h-[400px] lg:h-[520px]">
            {hasEnteredView ? (
              <Project3DPanel
                activeProject={activeProject}
                activeIndex={currentIndex}
                isSectionVisible={isSectionVisible}
                prefersReducedMotion={prefersReducedMotion}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <span className="text-xs font-mono text-slate-500 animate-pulse">
                  Initializing Orbital Telemetry...
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
