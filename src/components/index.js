/**
 * Portfolio Components
 * 
 * Barrel export for all sections, layout, and UI components.
 */

// Global & Layout
export { default as Navbar } from './layout/Navbar';
export { default as GlobalCosmicBackground } from './ui/GlobalCosmicBackground';
export { default as CustomSpaceCursor } from './ui/CustomSpaceCursor';
export { CanvasErrorBoundary } from './ui/CanvasErrorBoundary';
export { default as OrbitalPreloader } from './layout/OrbitalPreloader';

// Sections
export { default as AstronautHero } from './sections/AstronautHero';
export { default as AboutConnectSection } from './sections/AboutConnectSection';
export { default as SkillsSection } from './sections/SkillsSection';
export { default as ProjectsSection } from './sections/ProjectsSection';
export { default as ExperienceSection } from './sections/ExperienceSection';
export { default as ContactSection } from './sections/ContactSection';
export { default as Footer } from './layout/Footer';

// Project Sub-Modules
export * from './projects';
export * from './experience';
