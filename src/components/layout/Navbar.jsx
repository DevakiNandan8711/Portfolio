import React, { useState, useEffect, useRef } from 'react';
import { FiMenu, FiX, FiCheck } from 'react-icons/fi';
import { themes } from '../../themeConfig';

export default function Navbar({ 
  currentTheme = 'orbital_sunrise', 
  onThemeChange,
  activeNav = 'Home',
  onNavClick
}) {
  const [themeOpen, setThemeOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);
  const mobileMenuRef = useRef(null);

  const navLinks = ['Home', 'About', 'Skills', 'Projects', 'Experience', 'Contact'];

  // Close dropdown & mobile menu when clicking outside
  useEffect(() => {
    function handleClickOutside(e) {
      // Close theme dropdown if clicked outside both desktop dropdown and mobile menu
      if (
        dropdownRef.current && !dropdownRef.current.contains(e.target) &&
        mobileMenuRef.current && !mobileMenuRef.current.contains(e.target)
      ) {
        setThemeOpen(false);
      }
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(e.target)) {
        setMobileMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close mobile menu on screen resize to desktop
  useEffect(() => {
    function handleResize() {
      if (window.innerWidth >= 768) {
        setMobileMenuOpen(false);
      }
    }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleSelect = (themeId) => {
    if (onThemeChange) {
      onThemeChange(themeId);
    }
    document.documentElement.setAttribute('data-theme', themeId);
    setThemeOpen(false);
  };

  const handleLinkClick = (e, item) => {
    e.preventDefault();
    if (onNavClick) {
      onNavClick(item);
    }
    setMobileMenuOpen(false);
  };

  const activeThemeObj = themes.find(t => t.id === currentTheme) || themes[0];

  return (
    <>
      {/* ────────────────────────────────────────────────────────────
          1. DESKTOP NAVBAR (Pinned Floating Pill for md: and above)
          ──────────────────────────────────────────────────────────── */}
      <header className="fixed top-5 right-6 z-50 pointer-events-none hidden md:flex justify-end items-center">
        <nav 
          className="pointer-events-auto flex items-center gap-4 sm:gap-6 px-4 sm:px-6 py-2.5 rounded-full border border-white/10 backdrop-blur-xl shadow-[0_15px_35px_rgba(0,0,0,0.6)] transition-all duration-300"
          style={{ backgroundColor: activeThemeObj.bgCore + 'D9' }}
        >
          
          {/* Navigation Links */}
          <div className="flex items-center gap-3 sm:gap-5">
            {navLinks.map((item) => (
              <button
                key={item}
                onClick={(e) => handleLinkClick(e, item)}
                className={`relative text-xs md:text-sm font-semibold tracking-wide transition-colors duration-200 cursor-pointer ${
                  activeNav === item ? 'text-white font-bold' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {item}
                {activeNav === item && (
                  <span 
                    className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full shadow-[0_0_8px_currentColor]"
                    style={{ backgroundColor: activeThemeObj.rimRight, color: activeThemeObj.rimRight }}
                  />
                )}
              </button>
            ))}
          </div>

          {/* Action Controls: Theme Selector */}
          <div className="flex items-center pl-2 border-l border-white/10">
            
            {/* Theme Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setThemeOpen(!themeOpen)}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold tracking-wider border transition-all duration-200 cursor-pointer ${
                  themeOpen
                    ? 'border-white/40 text-white shadow-[0_0_15px_rgba(255,255,255,0.2)]'
                    : 'border-white/10 bg-white/5 text-slate-300 hover:text-white hover:border-white/30'
                }`}
                style={{
                  borderColor: themeOpen ? activeThemeObj.rimRight : undefined,
                  boxShadow: themeOpen ? `0 0 15px ${activeThemeObj.rimRight}40` : undefined
                }}
              >
                <span className="text-sm">{activeThemeObj.icon}</span>
                <span className="hidden lg:inline">{activeThemeObj.name}</span>
              </button>

              {/* Dropdown Menu */}
              {themeOpen && (
                <div 
                  className="absolute top-full right-0 mt-2 w-48 py-1.5 rounded-xl border border-white/15 backdrop-blur-2xl shadow-[0_10px_30px_rgba(0,0,0,0.8)] flex flex-col z-50 animate-in fade-in zoom-in-95 duration-150"
                  style={{ backgroundColor: activeThemeObj.bgCore + 'F2' }}
                >
                  {themes.map((t) => (
                    <button
                      key={t.id}
                      onClick={() => handleSelect(t.id)}
                      className={`flex items-center justify-between px-3.5 py-2 text-xs font-medium transition duration-150 cursor-pointer ${
                        currentTheme === t.id
                          ? 'font-bold'
                          : 'text-slate-300 hover:bg-white/10 hover:text-white'
                      }`}
                      style={{
                        color: currentTheme === t.id ? t.rimLeft : undefined,
                        backgroundColor: currentTheme === t.id ? `${t.rimLeft}15` : undefined
                      }}
                    >
                      <span className="flex items-center gap-2">
                        <span className="text-base">{t.icon}</span>
                        <span>{t.name}</span>
                      </span>
                      {currentTheme === t.id && <FiCheck className="w-3.5 h-3.5" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

          </div>

        </nav>
      </header>

      {/* ────────────────────────────────────────────────────────────
          2. MOBILE NAVBAR & DRAWER (Touch-Optimized for screens < md)
          ──────────────────────────────────────────────────────────── */}
      <header className="fixed top-3 left-3 right-3 z-50 md:hidden flex flex-col pointer-events-none" ref={mobileMenuRef}>
        
        {/* Top Control Bar */}
        <div 
          className="pointer-events-auto flex items-center justify-between px-4 py-2.5 rounded-2xl border border-white/15 backdrop-blur-2xl shadow-[0_10px_30px_rgba(0,0,0,0.8)] transition-colors duration-300"
          style={{ backgroundColor: activeThemeObj.bgCore + 'E6' }}
        >
          
          {/* Brand Logo / Active Section Indicator */}
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: activeThemeObj.rimRight }} />
            <span className="font-extrabold tracking-wider text-xs text-white">
              DEVAKI NANDAN
            </span>
          </div>

          {/* Right Action Icons: Theme Quick Cycle + Hamburger Toggle */}
          <div className="flex items-center gap-2">
            {/* Theme Trigger Button */}
            <button
              onClick={() => setThemeOpen(!themeOpen)}
              title="Change Cosmic Theme"
              className="p-1.5 rounded-xl bg-white/5 border border-white/10 text-white cursor-pointer active:scale-95"
            >
              <span className="text-base">{activeThemeObj.icon}</span>
            </button>

            {/* Hamburger / Close Button */}
            <button
              onClick={() => {
                setMobileMenuOpen(!mobileMenuOpen);
                setThemeOpen(false);
              }}
              aria-label="Toggle navigation menu"
              className="p-1.5 rounded-xl bg-white/5 border border-white/10 text-slate-200 hover:text-white cursor-pointer active:scale-95"
            >
              {mobileMenuOpen ? <FiX className="w-5 h-5" /> : <FiMenu className="w-5 h-5" />}
            </button>
          </div>

        </div>

        {/* Mobile Theme Selector Popup */}
        {themeOpen && (
          <div 
            className="pointer-events-auto mt-2 p-2 rounded-2xl border border-white/15 backdrop-blur-2xl shadow-[0_15px_40px_rgba(0,0,0,0.9)] grid grid-cols-2 gap-1.5 animate-in fade-in zoom-in-95 duration-150"
            style={{ backgroundColor: activeThemeObj.bgCore + 'F2' }}
          >
            {themes.map((t) => (
              <button
                key={t.id}
                onClick={() => handleSelect(t.id)}
                className={`flex items-center gap-2 p-2 rounded-xl text-xs font-medium transition cursor-pointer ${
                  currentTheme === t.id
                    ? 'bg-white/10 font-bold border border-white/20'
                    : 'text-slate-300 hover:bg-white/5'
                }`}
                style={{
                  color: currentTheme === t.id ? t.rimLeft : undefined
                }}
              >
                <span>{t.icon}</span>
                <span className="truncate">{t.name}</span>
              </button>
            ))}
          </div>
        )}

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <nav 
            className="pointer-events-auto mt-2 p-3 rounded-2xl border border-white/15 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.95)] flex flex-col gap-1 animate-in fade-in slide-in-from-top-3 duration-200"
            style={{ backgroundColor: activeThemeObj.bgCore + 'F2' }}
          >
            {navLinks.map((item) => (
              <button
                key={item}
                onClick={(e) => handleLinkClick(e, item)}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold tracking-wide transition-all cursor-pointer ${
                  activeNav === item
                    ? 'bg-white/10 text-white font-bold'
                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                }`}
                style={{
                  color: activeNav === item ? activeThemeObj.rimRight : undefined
                }}
              >
                <span>{item}</span>
                {activeNav === item && (
                  <span 
                    className="w-1.5 h-1.5 rounded-full shadow-[0_0_8px_currentColor]"
                    style={{ backgroundColor: activeThemeObj.rimRight }}
                  />
                )}
              </button>
            ))}
          </nav>
        )}

      </header>
    </>
  );
}
