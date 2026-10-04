import React from 'react';
import { motion } from 'framer-motion';
import { getTheme } from '../../themeConfig';

export default function ExperienceSection({ currentTheme = 'orbital_sunrise' }) {
  const theme = getTheme(currentTheme);
  const accentColor = theme?.rimLeft || '#f59e0b';

  return (
    <section
      id="experience"
      className="snap-section relative w-full min-h-screen py-16 md:py-24 px-4 sm:px-8 md:px-12 flex flex-col items-center justify-center transition-colors duration-700 bg-transparent"
    >
      <div className="w-full max-w-6xl mx-auto flex flex-col">
        {/* ── Section Title: Playfair Display serif aligned on standard left line ── */}
        <div className="relative z-10 w-full mb-8 md:mb-10 flex flex-col items-start">
          <h2 className="font-['Playfair_Display',serif] text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-normal tracking-tight text-white drop-shadow-[0_4px_24px_rgba(255,255,255,0.25)]">
            Experience
          </h2>
        </div>

        {/* ── Experience Card: Structured cleanly according to reference design ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="relative w-full rounded-3xl bg-[#080c16]/85 border border-white/10 backdrop-blur-2xl p-5 sm:p-10 md:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.85)] transition-all duration-300 hover:border-white/20"
          style={{
            boxShadow: `0 20px 50px rgba(0,0,0,0.85), 0 0 40px ${accentColor}15`
          }}
        >
          {/* Top Header Row: Logo Box + Company Name & Role/Period */}
          <div className="flex items-center gap-3.5 sm:gap-7">
            {/* Square Logo Box with Accent Border & White Background */}
            <div
              className="w-13 h-13 sm:w-20 sm:h-20 rounded-2xl border p-2 bg-white shadow-md shrink-0 flex items-center justify-center overflow-hidden transition-colors duration-500"
              style={{ borderColor: `${accentColor}70` }}
            >
              <img
                src="/snipetech.png"
                alt="Snipe Tech Private Limited"
                className="w-full h-full object-contain"
              />
            </div>

            {/* Company & Role Information */}
            <div className="flex flex-col justify-center min-w-0">
              <h3
                className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight truncate transition-colors duration-500"
                style={{ color: accentColor }}
              >
                Snipe Tech Private Limited
              </h3>
              <p className="text-xs sm:text-base md:text-lg italic text-slate-300/90 font-medium mt-0.5 sm:mt-1">
                AI &amp; ML Intern — February 17, 2026 – May 17, 2026
              </p>
            </div>
          </div>

          {/* Body Row: Vertical Accent Stem Line + Description Text */}
          <div className="flex gap-3.5 sm:gap-7 mt-5 sm:mt-8 items-stretch">
            {/* Vertical Accent Stem Line directly aligned under the logo center */}
            <div className="w-13 sm:w-20 flex justify-center shrink-0">
              <div
                className="w-[2.5px] rounded-full self-stretch min-h-[120px] transition-colors duration-500"
                style={{ backgroundColor: accentColor }}
              />
            </div>

            {/* Clean Description Paragraph matching reference layout */}
            <div className="flex-1 flex flex-col justify-center">
              <p className="text-slate-200 text-xs sm:text-base md:text-lg leading-relaxed sm:leading-loose font-normal">
                Completed an intensive industrial internship focused on developing and implementing advanced AI, Deep Learning, and Computer Vision workflows. Engineered neural network architectures and computer vision pipelines using Python, TensorFlow, and OpenCV for feature extraction and real-time pattern classification. Developed and evaluated natural language processing (NLP) models for automated semantic understanding, gaining hands-on production experience under the guidance of Mr. Mallikarjuna G.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
