import React, { useState } from 'react';
import { getTheme } from '../../themeConfig';

export default function AboutConnectSection({ currentTheme = 'orbital_sunrise' }) {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const theme = getTheme(currentTheme);

  const emailAddress = "devakinandan076@gmail.com";
  const linkedinUrl = "https://www.linkedin.com/in/devaki-nandan8711";
  const githubUrl = "https://github.com/DevakiNandan8711";

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(emailAddress);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleSendMessage = () => {
    const contactEl = document.getElementById('contact');
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="about"
      className="snap-section relative w-full min-h-screen py-16 md:py-24 px-4 sm:px-8 md:px-12 flex flex-col items-center justify-center transition-colors duration-700"
    >

      {/* ── Standard Section Wrapper matching max-w-6xl ── */}
      <div className="w-full max-w-6xl mx-auto flex flex-col">
        {/* ── TOP: "About Me" Title matching reference design ── */}
        <div className="relative z-10 w-full mb-8 md:mb-10 flex flex-col items-start">
          <h2 className="font-['Playfair_Display',serif] text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-normal tracking-tight text-white drop-shadow-[0_4px_24px_rgba(255,255,255,0.25)]">
            About Me
          </h2>
        </div>

        {/* The 2 Cards Container */}
        <div className="relative w-full grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 items-stretch z-10">

        {/* ──────────────────────────────────────────────────────────
            CARD 1: About Me — Devaki Nandan
            ────────────────────────────────────────────────────────── */}
        <div
          className="flex flex-col p-6 sm:p-8 rounded-3xl bg-[#070b16]/75 border border-white/15 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.85)] text-slate-200 transition-all duration-300 hover:border-white/30"
          style={{
            boxShadow: `0 20px 50px rgba(0,0,0,0.85), 0 0 40px ${theme.rimLeft}15`
          }}
        >

          {/* Photo on Top */}
          <div
            className="w-full h-64 sm:h-72 lg:h-80 rounded-2xl overflow-hidden border p-1 bg-[#121624]/60 shadow-inner mb-6 transition-colors duration-500"
            style={{ borderColor: `${theme.rimLeft}70` }}
          >
            <img
              src="/devaki.jpg"
              alt="Devaki Nandan"
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = '/devaki.png';
              }}
              className="w-full h-full object-cover object-top rounded-xl"
            />
          </div>

          {/* Heading */}
          <h3 className="text-2xl sm:text-3xl font-bold text-white mb-1 tracking-tight">
            Devaki Nandan
          </h3>
          <p className="text-xs font-mono tracking-widest text-slate-400 uppercase mb-4">
            AI/ML Engineer & Full Stack Developer
          </p>

          {/* Bio Text */}
          <div className="text-slate-300 text-sm sm:text-base leading-relaxed space-y-3 font-normal">
            <p>
              Building intelligent systems that scale and make a real difference is what drives my work. I have worked across <span className="font-semibold text-white px-1.5 py-0.5 rounded bg-white/10" style={{ color: theme.rimRight }}>applied AI</span> and <span className="font-semibold text-white px-1.5 py-0.5 rounded bg-white/10" style={{ color: theme.rimLeft }}>full-stack development</span>, and I enjoy combining strong backend skills with modern web technologies to solve real-world problems.
            </p>
            <p>
              I am always exploring new ways to bring <span className="font-semibold text-white px-1.5 py-0.5 rounded bg-white/10" style={{ color: theme.rimRight }}>machine learning</span> into everyday situations.
            </p>
          </div>

        </div>

        {/* ──────────────────────────────────────────────────────────
            CARD 2: Let's Connect
            ────────────────────────────────────────────────────────── */}
        <div
          className="flex flex-col justify-between p-6 sm:p-8 rounded-3xl bg-[#070b16]/75 border border-white/15 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.85)] text-slate-200 transition-all duration-300 hover:border-white/30"
          style={{
            boxShadow: `0 20px 50px rgba(0,0,0,0.85), 0 0 40px ${theme.rimRight}15`
          }}
        >

          <div>
            {/* Top Mail Icon in Glowing Frame */}
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4 border transition-colors duration-500 shadow-lg"
              style={{
                backgroundColor: `${theme.rimLeft}15`,
                borderColor: `${theme.rimLeft}60`,
                color: theme.rimLeft,
                boxShadow: `0 0 25px ${theme.rimLeft}25`
              }}
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
            </div>

            {/* Title & Subtitle */}
            <h2 className="text-2xl sm:text-3xl font-bold text-white text-center tracking-tight">
              Let's Connect
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 text-center mt-1 mb-8 leading-normal">
              Open to collaborations, opportunities, and tech discussions
            </p>

            {/* EMAIL Section */}
            <div className="mb-6">
              <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                EMAIL
              </p>
              <div
                onClick={handleCopyEmail}
                className="flex items-center justify-between p-3.5 rounded-xl bg-black/40 border border-white/10 hover:border-white/25 transition cursor-pointer group"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <svg className="w-4 h-4 text-slate-400 group-hover:text-amber-300 transition-colors shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                  </svg>
                  <span className="text-xs sm:text-sm font-mono text-slate-200 truncate group-hover:text-white">
                    {emailAddress}
                  </span>
                </div>
                <span className="text-[11px] font-semibold px-2.5 py-1 rounded-lg bg-white/5 text-slate-300 group-hover:text-white group-hover:bg-white/15 transition shrink-0">
                  {copiedEmail ? 'Copied! ✓' : 'Copy'}
                </span>
              </div>
            </div>

            {/* SOCIAL Section */}
            <div className="mb-6">
              <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                SOCIAL
              </p>
              <div className="space-y-3">

                {/* LinkedIn */}
                <a
                  href={linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3.5 rounded-xl bg-black/40 border border-white/10 hover:border-sky-400/50 hover:bg-sky-950/20 text-slate-200 hover:text-white transition group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded bg-[#0077b5]/20 text-[#0077b5] flex items-center justify-center text-xs font-bold border border-[#0077b5]/30">
                      in
                    </div>
                    <span className="text-xs sm:text-sm font-semibold">LinkedIn</span>
                  </div>
                  <span className="text-slate-400 group-hover:text-sky-300 text-xs">↗</span>
                </a>

                {/* GitHub */}
                <a
                  href={githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3.5 rounded-xl bg-black/40 border border-white/10 hover:border-purple-400/50 hover:bg-purple-950/20 text-slate-200 hover:text-white transition group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded bg-white/10 flex items-center justify-center">
                      <svg className="w-4 h-4 fill-current text-slate-300 group-hover:text-white" viewBox="0 0 24 24">
                        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                      </svg>
                    </div>
                    <span className="text-xs sm:text-sm font-semibold">GitHub</span>
                  </div>
                  <span className="text-slate-400 group-hover:text-purple-300 text-xs">↗</span>
                </a>

              </div>
            </div>

          </div>

          {/* Send a Message Button */}
          <button
            onClick={handleSendMessage}
            className="w-full py-3.5 px-4 rounded-xl text-white font-bold text-xs sm:text-sm tracking-wider uppercase transition-all duration-300 flex items-center justify-center gap-2 mt-4 cursor-pointer shadow-lg active:scale-[0.99] hover:brightness-110"
            style={{
              backgroundImage: `linear-gradient(to right, ${theme.rimLeft}, ${theme.rimRight})`,
              boxShadow: `0 8px 25px ${theme.rimLeft}35`
            }}
          >
            <span>Send a Message →</span>
          </button>

        </div>
      </div>
    </div>

    </section>
  );
}
