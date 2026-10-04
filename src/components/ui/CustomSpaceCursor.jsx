import React, { useEffect, useState, useRef } from 'react';

/**
 * CustomSpaceCursor: High-Tech Sci-Fi Orbital Reticle Cursor with Target Lock Framing
 * 
 * - Seamlessly frames hovered interactive elements (nav links, buttons, badges)
 *   into a rectangular target box matching the user's reference image.
 * - Central luminous point is locked permanently in the dead center of the box.
 * - When in free space, contracts to a compact 26x26 HUD reticle.
 * - Trailing cosmic stardust motes matching background starlight.
 */
export default function CustomSpaceCursor({ activeTheme }) {
  const [isVisible, setIsVisible] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [boxDimensions, setBoxDimensions] = useState({ width: 26, height: 26 });
  const [isTargetLocked, setIsTargetLocked] = useState(false);

  const containerRef = useRef(null);
  const particlesRef = useRef([]);
  const mouse = useRef({ x: -100, y: -100 });
  const currentPos = useRef({ x: -100, y: -100 });
  const hoveredElementRef = useRef(null);

  // Theme-aware cosmic color palette matching the background
  const primaryColor = activeTheme?.rimRight || '#38bdf8';
  const secondaryColor = activeTheme?.rimLeft || '#818cf8';

  useEffect(() => {
    // Only activate on devices with fine pointer (mouse/trackpad), not touchscreens
    if (window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    // Hide default OS cursor
    document.documentElement.classList.add('custom-space-cursor-active');

    const handleMouseMove = (e) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;

      if (!isVisible) {
        setIsVisible(true);
        currentPos.current.x = e.clientX;
        currentPos.current.y = e.clientY;
      }

      // Spawn subtle cosmic stardust motes matching background
      if (Math.random() < 0.35 && particlesRef.current.length < 14) {
        particlesRef.current.push({
          x: e.clientX + (Math.random() - 0.5) * 12,
          y: e.clientY + (Math.random() - 0.5) * 12,
          size: Math.random() * 2 + 1,
          opacity: 0.65,
          life: 1.0,
          id: Math.random()
        });
      }
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    // Detect hover over interactive elements to trigger target lock framing
    const handleMouseOver = (e) => {
      const target = e.target;
      if (!target) return;
      const interactive = target.closest(
        'a, button, input, textarea, select, [role="button"], .cursor-pointer, [data-interactive], nav li'
      );

      if (interactive) {
        const rect = interactive.getBoundingClientRect();
        // Frame compact elements (buttons, nav links, badges), but not giant page sections
        if (rect.width > 8 && rect.width <= 320 && rect.height > 8 && rect.height <= 120) {
          hoveredElementRef.current = interactive;
          setIsTargetLocked(true);
          setBoxDimensions({
            width: Math.round(rect.width + 18),
            height: Math.round(rect.height + 12)
          });
          return;
        }
      }

      hoveredElementRef.current = null;
      setIsTargetLocked(false);
      setBoxDimensions({ width: 26, height: 26 });
    };

    const handleMouseOut = (e) => {
      if (hoveredElementRef.current) {
        const related = e.relatedTarget;
        if (!related || !hoveredElementRef.current.contains(related)) {
          hoveredElementRef.current = null;
          setIsTargetLocked(false);
          setBoxDimensions({ width: 26, height: 26 });
        }
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseover', handleMouseOver, { passive: true });
    document.addEventListener('mouseout', handleMouseOut, { passive: true });

    // Smooth animation loop for magnetic target lock & stardust motes
    let animId;
    const animate = () => {
      // 1. Calculate target coordinates
      let targetX = mouse.current.x;
      let targetY = mouse.current.y;

      if (hoveredElementRef.current) {
        const rect = hoveredElementRef.current.getBoundingClientRect();
        if (rect.width > 0 && rect.height > 0) {
          const centerX = rect.left + rect.width / 2;
          const centerY = rect.top + rect.height / 2;
          // Magnetic center lock with subtle responsive pull towards mouse
          targetX = centerX + (mouse.current.x - centerX) * 0.22;
          targetY = centerY + (mouse.current.y - centerY) * 0.22;
        }
      }

      // Smooth interpolation
      if (isTargetLocked) {
        currentPos.current.x += (targetX - currentPos.current.x) * 0.35;
        currentPos.current.y += (targetY - currentPos.current.y) * 0.35;
      } else {
        // Instant 1:1 hardware tracking when in free space
        currentPos.current.x = targetX;
        currentPos.current.y = targetY;
      }

      if (containerRef.current) {
        containerRef.current.style.transform = `translate3d(${currentPos.current.x}px, ${currentPos.current.y}px, 0) translate(-50%, -50%)`;
      }

      // 2. Trailing stardust motes update
      for (let i = particlesRef.current.length - 1; i >= 0; i--) {
        const p = particlesRef.current[i];
        p.life -= 0.045;
        p.opacity = p.life * 0.65;
        p.y += 0.25;
        if (p.life <= 0) {
          particlesRef.current.splice(i, 1);
        }
      }

      animId = requestAnimationFrame(animate);
    };
    animId = requestAnimationFrame(animate);

    return () => {
      document.documentElement.classList.remove('custom-space-cursor-active');
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
      cancelAnimationFrame(animId);
    };
  }, [isVisible, isTargetLocked]);

  if (!isVisible) return null;

  // Box dimensions with click recoil
  const finalWidth = isClicking ? Math.max(18, boxDimensions.width - 6) : boxDimensions.width;
  const finalHeight = isClicking ? Math.max(18, boxDimensions.height - 4) : boxDimensions.height;
  const bracketLength = isTargetLocked ? 11 : 7;
  const dotSize = isTargetLocked ? 6 : 5;

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999999] overflow-hidden select-none">
      {/* ── 1. Cosmic Stardust Trailing Behind ── */}
      {particlesRef.current.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full pointer-events-none"
          style={{
            left: `${p.x}px`,
            top: `${p.y}px`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            backgroundColor: primaryColor,
            opacity: p.opacity,
            boxShadow: `0 0 6px ${primaryColor}`,
            transform: 'translate(-50%, -50%)'
          }}
        />
      ))}

      {/* ── 2. Unified Reticle Container: Central Point & Box Move TOGETHER ── */}
      <div
        ref={containerRef}
        className="pointer-events-none fixed top-0 left-0 select-none will-change-transform"
        style={{
          transform: `translate3d(${currentPos.current.x}px, ${currentPos.current.y}px, 0) translate(-50%, -50%)`
        }}
      >
        <div
          className="relative flex items-center justify-center transition-all duration-200 ease-out"
          style={{
            width: `${finalWidth}px`,
            height: `${finalHeight}px`
          }}
        >
          {/* Central Luminous Point: Locked permanently into the exact center */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none transition-all duration-150 ease-out"
            style={{
              width: `${dotSize}px`,
              height: `${dotSize}px`,
              backgroundColor: '#ffffff',
              boxShadow: isTargetLocked
                ? `0 0 6px #ffffff, 0 0 14px ${primaryColor}`
                : `0 0 5px #ffffff, 0 0 10px ${primaryColor}cc`
            }}
          />

          {/* Top-Left Bracket ┌ */}
          <span
            className="absolute top-0 left-0 border-t-2 border-l-2 pointer-events-none transition-all duration-200 ease-out"
            style={{
              width: `${bracketLength}px`,
              height: `${bracketLength}px`,
              borderColor: '#ffffff',
              filter: `drop-shadow(0 0 4px #ffffff) drop-shadow(0 0 8px ${primaryColor})`
            }}
          />

          {/* Top-Right Bracket ┐ */}
          <span
            className="absolute top-0 right-0 border-t-2 border-r-2 pointer-events-none transition-all duration-200 ease-out"
            style={{
              width: `${bracketLength}px`,
              height: `${bracketLength}px`,
              borderColor: '#ffffff',
              filter: `drop-shadow(0 0 4px #ffffff) drop-shadow(0 0 8px ${primaryColor})`
            }}
          />

          {/* Bottom-Left Bracket └ */}
          <span
            className="absolute bottom-0 left-0 border-b-2 border-l-2 pointer-events-none transition-all duration-200 ease-out"
            style={{
              width: `${bracketLength}px`,
              height: `${bracketLength}px`,
              borderColor: '#ffffff',
              filter: `drop-shadow(0 0 4px #ffffff) drop-shadow(0 0 8px ${primaryColor})`
            }}
          />

          {/* Bottom-Right Bracket ┘ */}
          <span
            className="absolute bottom-0 right-0 border-b-2 border-r-2 pointer-events-none transition-all duration-200 ease-out"
            style={{
              width: `${bracketLength}px`,
              height: `${bracketLength}px`,
              borderColor: '#ffffff',
              filter: `drop-shadow(0 0 4px #ffffff) drop-shadow(0 0 8px ${primaryColor})`
            }}
          />

          {/* Atmospheric Corner Flare / Bloom matching user reference image */}
          <div
            className="absolute inset-0 pointer-events-none rounded-sm transition-opacity duration-200"
            style={{
              background: `radial-gradient(circle at center, transparent 50%, ${primaryColor}18 95%)`,
              opacity: isTargetLocked ? 0.95 : 0.5
            }}
          />
        </div>
      </div>
    </div>
  );
}
