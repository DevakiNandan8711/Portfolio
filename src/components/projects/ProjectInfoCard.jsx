import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiChevronLeft,
  FiChevronRight,
  FiExternalLink,
  FiChevronDown,
  FiChevronUp
} from 'react-icons/fi';
import {
  SiReact,
  SiPython,
  SiNodedotjs,
  SiTailwindcss,
  SiPostgresql,
  SiMongodb,
  SiStreamlit,
  SiOpencv,
  SiExpress,
  SiOpenai,
  SiTypescript,
  SiDocker,
  SiFastapi,
  SiFlask,
  SiVite,
  SiSupabase,
  SiBootstrap,
  SiSqlite,
  SiPandas
} from 'react-icons/si';
import { TbBrandThreejs } from 'react-icons/tb';

// Mapping of tech keywords to recognizable brand icons
function getTechIcon(techName) {
  const lower = techName.toLowerCase();
  if (lower.includes('react')) return <SiReact className="w-3.5 h-3.5 text-sky-400" />;
  if (lower.includes('three')) return <TbBrandThreejs className="w-3.5 h-3.5 text-emerald-400" />;
  if (lower.includes('python')) return <SiPython className="w-3.5 h-3.5 text-yellow-400" />;
  if (lower.includes('fastapi')) return <SiFastapi className="w-3.5 h-3.5 text-teal-400" />;
  if (lower.includes('flask')) return <SiFlask className="w-3.5 h-3.5 text-slate-300" />;
  if (lower.includes('node')) return <SiNodedotjs className="w-3.5 h-3.5 text-green-500" />;
  if (lower.includes('vite')) return <SiVite className="w-3.5 h-3.5 text-purple-400" />;
  if (lower.includes('docker')) return <SiDocker className="w-3.5 h-3.5 text-sky-400" />;
  if (lower.includes('bootstrap')) return <SiBootstrap className="w-3.5 h-3.5 text-purple-500" />;
  if (lower.includes('supabase')) return <SiSupabase className="w-3.5 h-3.5 text-emerald-400" />;
  if (lower.includes('sqlite')) return <SiSqlite className="w-3.5 h-3.5 text-sky-300" />;
  if (lower.includes('pandas')) return <SiPandas className="w-3.5 h-3.5 text-blue-400" />;
  if (lower.includes('tailwind')) return <SiTailwindcss className="w-3.5 h-3.5 text-cyan-400" />;
  if (lower.includes('postgres')) return <SiPostgresql className="w-3.5 h-3.5 text-blue-400" />;
  if (lower.includes('mongo')) return <SiMongodb className="w-3.5 h-3.5 text-green-400" />;
  if (lower.includes('streamlit')) return <SiStreamlit className="w-3.5 h-3.5 text-rose-500" />;
  if (lower.includes('opencv')) return <SiOpencv className="w-3.5 h-3.5 text-red-400" />;
  if (lower.includes('express')) return <SiExpress className="w-3.5 h-3.5 text-slate-300" />;
  if (lower.includes('openai') || lower.includes('gpt')) return <SiOpenai className="w-3.5 h-3.5 text-teal-400" />;
  if (lower.includes('typescript')) return <SiTypescript className="w-3.5 h-3.5 text-blue-400" />;
  return null;
}

export default function ProjectInfoCard({
  project,
  currentIndex,
  totalProjects,
  direction,
  onPrev,
  onNext,
  onSelectProject
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [iconError, setIconError] = useState(false);

  // Reset expanded state and error state on project change
  useEffect(() => {
    setIsExpanded(false);
    setIconError(false);
  }, [project.id]);

  const slideVariants = {
    initial: (dir) => ({
      opacity: 0,
      x: dir * 24,
      filter: 'blur(3px)'
    }),
    animate: {
      opacity: 1,
      x: 0,
      filter: 'blur(0px)',
      transition: { duration: 0.28, ease: [0.25, 1, 0.5, 1] }
    },
    exit: (dir) => ({
      opacity: 0,
      x: -dir * 24,
      filter: 'blur(3px)',
      transition: { duration: 0.18, ease: [0.5, 0, 0.75, 0] }
    })
  };

  return (
    <div className="relative w-full lg:h-full min-h-[460px] flex flex-col justify-between py-2 sm:py-4 bg-transparent">
      {/* Top Header & Project Body Animated with Framer Motion */}
      <div className="relative z-10">
        {/* Project Meta Bar: Counter */}
        <div className="flex items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-2.5">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500" />
            </span>
            <span className="text-[11px] font-mono tracking-widest text-amber-300 uppercase font-semibold">
              Project 0{currentIndex + 1} / 0{totalProjects}
            </span>
          </div>
        </div>

        {/* Animated Project Content Container */}
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={project.id}
            custom={direction}
            variants={slideVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="flex flex-col gap-4"
          >
            {/* Project Icon & Heading */}
            <div className="flex items-center gap-4">
              {/* Rounded Square Project Icon */}
              <div className="relative flex-shrink-0 w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-white/5 p-0.5 border border-white/10 shadow-lg overflow-hidden group">
                {!iconError ? (
                  <img
                    src={project.icon}
                    alt={`${project.name} icon`}
                    onError={() => setIconError(true)}
                    className="w-full h-full object-cover rounded-2xl transition-transform duration-300 group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-slate-900 text-amber-400 font-bold font-mono text-base rounded-2xl">
                    0{currentIndex + 1}
                  </div>
                )}
              </div>

              {/* Heading */}
              <div>
                <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight leading-tight">
                  {project.name}
                </h3>
                <span className="text-xs font-mono text-slate-400 tracking-wide">
                  Deployed Application
                </span>
              </div>
            </div>

            {/* Description clamped to 4 lines with Read More toggle */}
            <div className="mt-1">
              <p
                className={`text-slate-300 text-sm sm:text-base leading-relaxed transition-all duration-300 ${
                  isExpanded ? 'line-clamp-none' : 'line-clamp-4'
                }`}
              >
                {project.description}
              </p>

              <button
                type="button"
                onClick={() => setIsExpanded(!isExpanded)}
                aria-expanded={isExpanded}
                className="mt-2 inline-flex items-center gap-1.5 text-xs font-mono font-medium text-amber-400 hover:text-amber-300 focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:outline-none rounded transition-colors"
              >
                <span>{isExpanded ? 'Read Less' : 'Read More'}</span>
                {isExpanded ? (
                  <FiChevronUp className="w-3.5 h-3.5" />
                ) : (
                  <FiChevronDown className="w-3.5 h-3.5" />
                )}
              </button>
            </div>

            {/* Tech Badges Row */}
            <div className="mt-1 flex flex-wrap items-center gap-2">
              {project.tech?.map((item, idx) => {
                const icon = getTechIcon(item);
                return (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-mono bg-white/[0.05] hover:bg-white/[0.1] text-slate-300 border border-white/10 transition-colors shadow-sm"
                  >
                    {icon}
                    <span>{item}</span>
                  </span>
                );
              })}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom Controls: Live Site Button, Arrows, and Progress Dots */}
      <div className="relative z-10 pt-6 mt-6 border-t border-white/10 flex flex-col gap-4">
        {/* Primary Action Button */}
        <div>
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Check live site for ${project.name} (opens in a new tab)`}
            className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3 rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-400 hover:to-orange-500 text-slate-950 font-semibold text-sm shadow-[0_0_25px_rgba(245,158,11,0.35)] hover:shadow-[0_0_35px_rgba(245,158,11,0.55)] transition-all duration-300 focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:outline-none active:scale-[0.98]"
          >
            <span>Check live site</span>
            <FiExternalLink className="w-4 h-4" />
          </a>
        </div>

        {/* Carousel Progress Dots & Navigation Arrows Row */}
        <div className="flex items-center justify-between gap-4 pt-2">
          {/* 6 Progress Dots */}
          <div className="flex items-center gap-2" role="tablist" aria-label="Project selection dots">
            {Array.from({ length: totalProjects }).map((_, idx) => {
              const isActive = idx === currentIndex;
              return (
                <button
                  key={idx}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-label={`Go to project ${idx + 1}`}
                  onClick={() => onSelectProject(idx)}
                  className={`relative transition-all duration-300 rounded-full focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:outline-none ${
                    isActive
                      ? 'w-7 h-2.5 bg-gradient-to-r from-amber-400 to-orange-400 shadow-[0_0_12px_rgba(245,158,11,0.6)]'
                      : 'w-2.5 h-2.5 bg-white/20 hover:bg-white/40'
                  }`}
                />
              );
            })}
          </div>

          {/* Previous & Next Arrow Buttons */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onPrev}
              aria-label="Previous project"
              className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 active:bg-white/20 border border-white/10 text-white transition-all duration-200 focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:outline-none"
            >
              <FiChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={onNext}
              aria-label="Next project"
              className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 active:bg-white/20 border border-white/10 text-white transition-all duration-200 focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:outline-none"
            >
              <FiChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
