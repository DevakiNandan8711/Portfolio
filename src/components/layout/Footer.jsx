import React, { useState } from 'react';
import { FiArrowUp, FiX, FiExternalLink } from 'react-icons/fi';
import { getTheme } from '../../themeConfig';

export default function Footer({ currentTheme = 'orbital_sunrise' }) {
  const theme = getTheme(currentTheme);
  const accentColor = theme?.rimLeft || '#f59e0b';
  const [activeModal, setActiveModal] = useState(null); // 'terms' | 'privacy' | 'credits' | null

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <footer className="relative w-full border-t border-white/10 bg-[#03050a]/95 backdrop-blur-2xl text-slate-400 z-20 overflow-hidden">
        {/* Subtle Theme Accent Glow Line across the top */}
        <div 
          className="absolute top-0 left-0 right-0 h-[1px] opacity-75 transition-colors duration-500"
          style={{
            background: `linear-gradient(90deg, transparent 0%, ${accentColor} 50%, transparent 100%)`
          }}
        />

        <div className="w-full max-w-6xl mx-auto px-4 sm:px-8 py-4 sm:py-5 flex flex-col gap-2.5 sm:gap-3">
          
          {/* ── Top Row: Brand & Legal Navigation ── */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2.5 text-xs text-slate-400">
            {/* Brand & Copyright */}
            <div className="flex items-center gap-2">
              <span className="font-medium text-slate-300 text-xs sm:text-[13px]">
                © 2026 Devaki Nandan. All rights reserved.
              </span>
            </div>

            {/* Legal Links & Back to Top */}
            <div className="flex items-center gap-3 sm:gap-4 text-xs">
              <button
                onClick={() => setActiveModal('terms')}
                className="hover:text-white transition-colors cursor-pointer"
              >
                Terms
              </button>
              <span className="text-slate-600">·</span>
              <button
                onClick={() => setActiveModal('privacy')}
                className="hover:text-white transition-colors cursor-pointer"
              >
                Privacy
              </button>
              <span className="text-slate-600">·</span>
              <button
                onClick={scrollToTop}
                title="Scroll back to top"
                className="inline-flex items-center gap-1.5 text-slate-300 hover:text-white transition-colors cursor-pointer font-medium"
              >
                <span>Back to Top</span>
                <FiArrowUp className="w-3 h-3 text-slate-400" />
              </button>
            </div>
          </div>

          {/* ── Bottom Row: Single 3D Models Attribution Line (100% CC BY 4.0 Compliant) ── */}
          <div className="border-t border-white/5 pt-2 text-[11px] sm:text-xs text-slate-400 leading-relaxed text-center sm:text-left">
            <p>
              <span className="text-slate-500 font-medium">3D models: </span>
              <a
                href="https://skfb.ly/o9pPT"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sky-400 hover:text-sky-300 underline underline-offset-2"
              >
                "Animated Floating Astronaut in Space Suit Loop"
              </a>
              {" "}and{" "}
              <a
                href="https://skfb.ly/o9nHu"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sky-400 hover:text-sky-300 underline underline-offset-2"
              >
                "Animated Astronaut Character in Space Suit Loop"
              </a>
              {" "}by{" "}
              <a
                href="https://sketchfab.com/LasquetiSpice"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-300 hover:text-white underline underline-offset-2"
              >
                LasquetiSpice
              </a>
              , licensed under{" "}
              <a
                href="https://creativecommons.org/licenses/by/4.0/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sky-400 hover:text-sky-300 underline underline-offset-2"
              >
                CC BY 4.0
              </a>
              . Modified for this website.
            </p>
          </div>

        </div>
      </footer>

      {/* ── Unified Legal & Attribution Modal ── */}
      {activeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-lg rounded-3xl bg-[#090e1a] border border-white/15 p-6 sm:p-8 shadow-[0_25px_60px_rgba(0,0,0,0.9)] text-slate-300 text-sm">
            <button
              onClick={() => setActiveModal(null)}
              className="absolute top-5 right-5 p-1.5 rounded-full bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            >
              <FiX className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-bold text-white mb-4">
              {activeModal === 'terms' && 'Terms & Conditions'}
              {activeModal === 'privacy' && 'Privacy Policy'}
              {activeModal === 'credits' && '3D Assets, Animation & License Attribution'}
            </h3>

            <div className="space-y-4 leading-relaxed text-xs sm:text-sm text-slate-300 max-h-[60vh] overflow-y-auto pr-1">
              {activeModal === 'terms' && (
                <>
                  <p>
                    Welcome to the personal portfolio of <strong>Devaki Nandan</strong>. By accessing this website, you agree to view the content for personal review, recruitment, or professional collaboration.
                  </p>
                  <p>
                    All project code, media demonstrations, and portfolio assets belong to Devaki Nandan or their respective third-party licensors. Unauthorized commercial redistribution is prohibited.
                  </p>
                </>
              )}

              {activeModal === 'privacy' && (
                <>
                  <p>
                    Your privacy is respected. This website does not sell, track, share, or monetize any personal information.
                  </p>
                  <p>
                    Inquiries submitted through the contact form are securely delivered solely to <strong>devakinandan076@gmail.com</strong> for communication and collaboration purposes.
                  </p>
                </>
              )}

              {activeModal === 'credits' && (
                <>
                  <p>
                    The 3D astronaut character model and skeletal animation loops used in the Hero and Experience sections are licensed under the <strong>Creative Commons Attribution 4.0 International (CC BY 4.0)</strong> license:
                  </p>
                  
                  {/* Model 1 Attribution */}
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1.5">
                    <div className="font-semibold text-white">
                      1. "Animated Floating Astronaut in Space Suit Loop"
                    </div>
                    <div className="text-xs text-slate-400">
                      Author: <span className="text-slate-200 font-medium">LasquetiSpice</span> on Sketchfab
                    </div>
                    <div className="text-xs text-slate-400">
                      License: <a href="https://creativecommons.org/licenses/by/4.0/" target="_blank" rel="noopener noreferrer" className="text-sky-400 underline">CC BY 4.0</a>
                    </div>
                    <div className="text-xs text-slate-400">
                      Assets Used: 3D character mesh, suit textures, zero-g floating loop &amp; skeletal rig.
                    </div>
                    <div className="pt-1">
                      <a 
                        href="https://skfb.ly/o9pPT" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-sky-400 hover:text-sky-300 underline inline-flex items-center gap-1 text-xs"
                      >
                        Model 1 Source on Sketchfab <FiExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>

                  {/* Model 2 Attribution */}
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1.5">
                    <div className="font-semibold text-white">
                      2. "Animated Astronaut Character in Space Suit Loop"
                    </div>
                    <div className="text-xs text-slate-400">
                      Author: <span className="text-slate-200 font-medium">LasquetiSpice</span> on Sketchfab
                    </div>
                    <div className="text-xs text-slate-400">
                      License: <a href="https://creativecommons.org/licenses/by/4.0/" target="_blank" rel="noopener noreferrer" className="text-sky-400 underline">CC BY 4.0</a>
                    </div>
                    <div className="text-xs text-slate-400">
                      Assets Used: Skeletal waving greeting animation track &amp; character loop.
                    </div>
                    <div className="pt-1">
                      <a 
                        href="https://skfb.ly/o9nHu" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-sky-400 hover:text-sky-300 underline inline-flex items-center gap-1 text-xs"
                      >
                        Model 2 Source on Sketchfab <FiExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>

                  {/* Honest Modifications Disclosure */}
                  <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 text-xs space-y-2 text-slate-300">
                    <div className="font-semibold text-white">
                      Modifications &amp; Adaptations Disclosure (Honest &amp; Transparent):
                    </div>
                    <ul className="list-disc list-inside space-y-1 text-slate-400">
                      <li>
                        <strong className="text-slate-200">3D Mesh Geometry &amp; Skeletal Rig:</strong> Unmodified. The original 3D geometry vertices and bone hierarchy created by LasquetiSpice are fully preserved.
                      </li>
                      <li>
                        <strong className="text-slate-200">Runtime WebGL Rendering:</strong> Customized Three.js PBR material properties (tinted obsidian helmet visor with specular reflection, calibrated fabric roughness/metalness), interactive real-time solar lighting, dynamic camera kinematics, and programmatic animation clip playback (greeting wave on initial load, followed by the zero-g floating loop).
                      </li>
                    </ul>
                  </div>

                  {/* Verification of No Other External Assets */}
                  <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 text-xs space-y-1.5 text-slate-400">
                    <div className="font-semibold text-white">
                      Third-Party Asset Audit:
                    </div>
                    <p>
                      Zero other third-party 3D models, external rigs, or animation packages (such as "Hello my friends" by Urpo or Lottie animations) are used on this website. All other 3D components—including the Cyber Mars Rover, Orbital Satellite, Spaceship Cockpit, Cyber Recon Drone, Sentient AI Companion, and cosmic starfields—were procedurally coded from scratch in Three.js by Devaki Nandan.
                    </p>
                  </div>

                  {/* Strict License Separation */}
                  <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-200/90 leading-relaxed">
                    <strong>License Scope &amp; Separation:</strong> The Creative Commons Attribution 4.0 International (CC BY 4.0) license applies exclusively to the third-party astronaut 3D assets and skeletal animation tracks cited above. All portfolio application code, procedural 3D scenes, custom shaders, and UI design are copyright © 2026 Devaki Nandan under the permissive <strong>MIT License</strong>.
                  </div>
                </>
              )}
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setActiveModal(null)}
                className="px-5 py-2 rounded-full bg-white text-slate-950 font-bold text-xs hover:bg-slate-200 transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
