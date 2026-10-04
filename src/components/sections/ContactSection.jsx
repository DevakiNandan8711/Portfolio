import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiSend,
  FiCheckCircle,
  FiAlertCircle,
  FiMail,
  FiMapPin,
  FiCopy,
  FiCheck,
  FiArrowUpRight
} from 'react-icons/fi';
import { SiLinkedin, SiGithub } from 'react-icons/si';
import { getTheme } from '../../themeConfig';

export default function ContactSection({ currentTheme = 'orbital_sunrise' }) {
  const theme = getTheme(currentTheme);
  const accentColor = theme?.rimLeft || '#f59e0b';
  const emailAddress = 'devakinandan076@gmail.com';

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState({ type: '', message: '' });
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = (e) => {
    e.stopPropagation();
    navigator.clipboard.writeText(emailAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: '', message: '' });

    try {
      const response = await fetch(`https://formsubmit.co/ajax/${emailAddress}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          _subject: `New Portfolio Message from ${formData.name}`,
          _template: 'table'
        })
      });

      if (response.ok) {
        setStatus({
          type: 'success',
          message: 'Message delivered directly to Devaki Nandan! I will reply shortly.'
        });
        setFormData({ name: '', email: '', message: '' });
      } else {
        throw new Error('Network error');
      }
    } catch (err) {
      // Fallback: trigger user's default email client pre-filled
      const mailtoUrl = `mailto:${emailAddress}?subject=${encodeURIComponent(
        `Portfolio Message from ${formData.name}`
      )}&body=${encodeURIComponent(
        `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
      )}`;
      window.location.href = mailtoUrl;

      setStatus({
        type: 'info',
        message: 'Your email client was opened to deliver your message to Devaki Nandan.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      className="snap-section relative w-full min-h-screen py-14 md:py-24 px-4 sm:px-8 md:px-12 flex flex-col items-center justify-center transition-colors duration-700 bg-transparent overflow-hidden"
    >
      <div className="w-full max-w-6xl mx-auto flex flex-col">

        {/* ── Section Eyebrow & Title ── */}
        <div className="relative z-10 w-full mb-8 md:mb-14 flex flex-col items-start">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-3"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#34d399]" />
            <span className="text-[11px] sm:text-xs font-mono tracking-wider uppercase text-slate-300">
              Available for Opportunities &amp; Collaboration
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-['Playfair_Display',serif] text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-normal tracking-tight text-white drop-shadow-[0_4px_24px_rgba(255,255,255,0.2)]"
          >
            Let's Build Something Great.
          </motion.h2>

          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: '4rem' }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="h-1 rounded-full mt-4 transition-colors duration-500 shadow-[0_0_14px_currentColor]"
            style={{ backgroundColor: accentColor }}
          />
        </div>

        {/* ── Two-Column Modern Grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start w-full">

          {/* ──────────────────────────────────────────────────────────
              LEFT COLUMN: Interactive Contact Hub & Social Channels
              ────────────────────────────────────────────────────────── */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-lg font-light"
            >
              Have a high-impact AI or full-stack project in mind, want to explore an engineering opportunity, or just want to exchange ideas? I'd love to connect.
            </motion.p>

            {/* Quick Cards Stack */}
            <div className="flex flex-col gap-3.5 mt-2">

              {/* Direct Email Card with One-Click Copy */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: 0.2 }}
                onClick={() => window.location.href = `mailto:${emailAddress}`}
                className="group relative p-4 sm:p-5 rounded-2xl bg-white/[0.03] hover:bg-white/[0.07] border border-white/10 hover:border-white/20 backdrop-blur-xl transition-all duration-300 flex items-center justify-between cursor-pointer"
              >
                <div className="flex items-center gap-3.5 sm:gap-4 min-w-0">
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 border border-white/10 transition-transform duration-300 group-hover:scale-105"
                    style={{ backgroundColor: `${accentColor}18` }}
                  >
                    <FiMail className="w-5 h-5 transition-colors duration-300" style={{ color: accentColor }} />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-[11px] font-mono tracking-wider uppercase text-slate-400 font-semibold">
                      Direct Email
                    </span>
                    <span className="text-white text-sm sm:text-base font-medium truncate mt-0.5 group-hover:text-white transition-colors">
                      {emailAddress}
                    </span>
                  </div>
                </div>

                {/* Copy Button */}
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  title="Copy email to clipboard"
                  className="shrink-0 ml-3 p-2.5 rounded-xl bg-white/5 hover:bg-white/15 border border-white/10 text-slate-300 hover:text-white transition-all duration-200 flex items-center gap-1.5 cursor-pointer"
                >
                  {copied ? (
                    <>
                      <FiCheck className="w-4 h-4 text-emerald-400" />
                      <span className="text-xs font-mono text-emerald-300 hidden sm:inline">Copied!</span>
                    </>
                  ) : (
                    <FiCopy className="w-4 h-4" />
                  )}
                </button>
              </motion.div>

              {/* Location & Live Timezone Card */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: 0.25 }}
                className="p-4 sm:p-5 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-xl flex items-center justify-between"
              >
                <div className="flex items-center gap-3.5 sm:gap-4">
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 border border-white/10"
                    style={{ backgroundColor: `${accentColor}18` }}
                  >
                    <FiMapPin className="w-5 h-5" style={{ color: accentColor }} />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[11px] font-mono tracking-wider uppercase text-slate-400 font-semibold">
                      Based In
                    </span>
                    <span className="text-white text-sm sm:text-base font-medium mt-0.5">
                      Tumkur, Karnataka, India
                    </span>
                  </div>
                </div>
              </motion.div>

              {/* Social Channels Link Row */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: 0.3 }}
                className="grid grid-cols-2 gap-3.5 mt-1"
              >
                {/* LinkedIn Pill */}
                <a
                  href="https://www.linkedin.com/in/devaki-nandan8711"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between p-3.5 sm:p-4 rounded-2xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 hover:border-white/25 backdrop-blur-xl transition-all duration-300"
                >
                  <div className="flex items-center gap-2.5">
                    <SiLinkedin className="w-5 h-5 text-sky-400" />
                    <span className="text-sm font-semibold text-white">LinkedIn</span>
                  </div>
                  <FiArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200" />
                </a>

                {/* GitHub Pill */}
                <a
                  href="https://github.com/DevakiNandan8711"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between p-3.5 sm:p-4 rounded-2xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 hover:border-white/25 backdrop-blur-xl transition-all duration-300"
                >
                  <div className="flex items-center gap-2.5">
                    <SiGithub className="w-5 h-5 text-slate-200" />
                    <span className="text-sm font-semibold text-white">GitHub</span>
                  </div>
                  <FiArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200" />
                </a>
              </motion.div>

            </div>
          </div>

          {/* ──────────────────────────────────────────────────────────
              RIGHT COLUMN: Clean Minimalist Glassmorphic Contact Form
              ────────────────────────────────────────────────────────── */}
          <div className="lg:col-span-7 w-full">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="relative w-full rounded-3xl bg-[#070b16]/80 border border-white/10 hover:border-white/20 backdrop-blur-2xl p-5 sm:p-8 md:p-10 shadow-[0_20px_60px_rgba(0,0,0,0.85)] transition-all duration-300"
              style={{
                boxShadow: `0 20px 60px rgba(0,0,0,0.85), 0 0 50px ${accentColor}12`
              }}
            >
              {/* Subtle Ambient Rim Glow */}
              <div
                className="absolute top-0 left-12 right-12 h-[1px] opacity-60 bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none"
              />

              <div className="mb-6">
                <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                  Send a Direct Message
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 mt-1">
                  I typically respond within 24 hours.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="flex flex-col gap-4 sm:gap-5">
                {/* Name Input */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold pl-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. Ganesh "
                    required
                    className="w-full px-4 py-3.5 rounded-xl bg-black/40 border border-white/10 focus:border-white/40 focus:ring-2 focus:ring-sky-500/20 text-white placeholder-slate-500 focus:outline-none transition-all text-base font-sans"
                  />
                </div>

                {/* Email Input */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold pl-1">
                    Your Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="e.g. ganesh@gmail.com"
                    required
                    className="w-full px-4 py-3.5 rounded-xl bg-black/40 border border-white/10 focus:border-white/40 focus:ring-2 focus:ring-sky-500/20 text-white placeholder-slate-500 focus:outline-none transition-all text-base font-sans"
                  />
                </div>

                {/* Message Textarea */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold pl-1">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell me about your project, idea, or role..."
                    rows={5}
                    required
                    className="w-full px-4 py-3.5 rounded-xl bg-black/40 border border-white/10 focus:border-white/40 focus:ring-2 focus:ring-sky-500/20 text-white placeholder-slate-500 focus:outline-none resize-none transition-all text-base font-sans"
                  />
                </div>

                {/* Status Message */}
                <AnimatePresence>
                  {status.message && (
                    <motion.div
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      className={`flex items-start gap-2.5 p-4 rounded-xl text-xs sm:text-sm font-medium leading-relaxed ${status.type === 'success'
                        ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-300'
                        : 'bg-sky-500/10 border border-sky-500/30 text-sky-300'
                        }`}
                    >
                      {status.type === 'success' ? (
                        <FiCheckCircle className="w-4 h-4 shrink-0 mt-0.5 text-emerald-400" />
                      ) : (
                        <FiAlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-sky-400" />
                      )}
                      <span>{status.message}</span>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Send Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="group relative w-full sm:w-auto px-9 py-3.5 rounded-full font-bold text-sm text-slate-950 bg-white hover:bg-slate-100 transition-all duration-300 flex items-center justify-center gap-2.5 shadow-[0_0_30px_rgba(255,255,255,0.2)] hover:shadow-[0_0_35px_rgba(255,255,255,0.4)] active:scale-95 disabled:opacity-50 cursor-pointer"
                  >
                    <FiSend className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5 text-slate-900" />
                    <span>{isSubmitting ? 'Delivering...' : 'Send Message'}</span>
                  </button>
                </div>
              </form>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
