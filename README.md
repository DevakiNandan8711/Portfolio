<<<<<<< HEAD
# Portfolio
=======
# Devaki Nandan — AI Engineer & Full Stack Developer Portfolio

A cosmic, space-themed interactive 3D developer portfolio showcasing full-stack applications and AI engineering projects. Built with **React 18**, **Three.js** / **React Three Fiber**, **Tailwind CSS**, and **Framer Motion**.

---

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start local development server (http://localhost:3000)
npm run dev

# Build optimized production bundle
npm run build

# Preview production build locally
npm run preview
```

---

## 🛠️ Technology Stack

| Layer | Technology | Version | Purpose |
|---|---|---|---|
| **Core Framework** | [React](https://react.dev/) | `18.3.1` | Component-based UI architecture |
| **Build Tool** | [Vite](https://vitejs.dev/) | `6.4.3` | Ultra-fast HMR and build bundling |
| **3D & WebGL Engine** | [Three.js](https://threejs.org/) | `0.174.0` | 3D graphics rendering, shaders, and materials |
| **React 3D Bridge** | [@react-three/fiber](https://docs.pmnd.rs/react-three-fiber) | `8.18.0` | Declarative Three.js component tree |
| **3D Utilities** | [@react-three/drei](https://github.com/pmndrs/drei) | `9.122.0` | Orbit controls, shaders, GLTF loading helpers |
| **Motion & Transitions** | [Framer Motion](https://www.framer.com/motion/) | `11.18.2` | Smooth layout transitions and slide effects |
| **Styling** | [Tailwind CSS](https://tailwindcss.com/) | `3.4.19` | Modern responsive styling & glassmorphism |
| **Icons** | [React Icons](https://react-icons.github.io/react-icons/) | `5.5.0` | Vector icons for tech badges and controls |

---

## 📂 Project Structure

```
portfolio/
├── public/                       # Static public assets served at root
│   ├── astronaut.glb             # 3D interactive hero astronaut model
│   ├── devaki.jpg                # Profile photo (with devaki.png fallback)
│   ├── real_*.jpg                # NASA/ISS public domain cosmic vista themes
│   ├── icons/                    # Project application badge icons (project-1 to project-6)
│   └── videos/                   # Project video recordings & poster fallbacks (project-1 to project-6)
│
├── src/
│   ├── main.jsx                  # React application entry point
│   ├── App.jsx                   # Master layout, navigation state & active section tracker
│   ├── index.css                 # Global CSS styles, custom scrollbar & font imports
│   ├── themeConfig.js            # 6 selectable cosmic themes (Orbit Sunrise, Earth Aurora, etc.)
│   │
│   ├── data/
│   │   └── projects.js           # Single source of truth for all projects & technical stacks
│   │
│   └── components/               # Modular UI and 3D components
│       ├── index.js              # Master barrel export for all components
│       │
│       ├── Navbar.jsx            # Top glassmorphic navigation bar & theme switcher
│       ├── GlobalCosmicBackground.jsx # Dynamic procedural starfield & planetary horizon
│       ├── AstronautHero.jsx     # Hero section with interactive 3D orbiting astronaut
│       ├── AboutConnectSection.jsx # About Me card + Interactive Connect/Get In Touch card
│       ├── SkillsSection.jsx     # Categorized skill badges (AI, Frontend, Backend, Cloud)
│       ├── ProjectsSection.jsx   # Master projects split-panel showcase (Left: Info, Right: 3D Scene)
│       ├── ExperienceSection.jsx # Education and engineering milestone timeline
│       ├── OrbitalPreloader.jsx  # Initial cosmic loading screen with smooth reveal
│       ├── CustomSpaceCursor.jsx # Smooth lag-free cosmic pointer tracker
│       │
│       └── projects/             # Projects 3D scene & video subsystem
│           ├── index.js          # Barrel export for projects subsystem
│           ├── ProjectInfoCard.jsx  # Left panel: title, description, live links & tech badges
│           ├── Project3DPanel.jsx   # Right panel: Three.js Canvas container & OrbitControls
│           ├── SceneSwitcher.jsx    # Switches active 3D procedural environment per project index
│           ├── VideoScreenMesh.jsx  # Standardized 2.35m × 1.32m 3D monitor frame with glass sheen
│           ├── VideoShaderMaterial.js # Custom 9-tap Gaussian blur fragment shader
│           ├── useProjectVideo.js   # HTML5 video element manager & THREE.VideoTexture hook
│           │
│           └── scenes/           # 6 Custom Procedural 3D Space Environments
│               ├── index.js                 # Barrel export for all 6 scenes
│               ├── MarsRoverScene.jsx       # Project 1: Cyber Space Rover Explorer
│               ├── SatelliteScreenScene.jsx  # Project 2: Orbital Satellite with Solar Arrays
│               ├── FloatingAstronautScene.jsx # Project 3: Spacewalking Astronaut holding tablet
│               ├── SpaceshipCockpitScene.jsx # Project 4: Spaceship Bridge & Flight Console
│               ├── CyberDroneScene.jsx      # Project 5: Autonomous Recon Drone with thrusters
│               ├── SentientAiCompanionScene.jsx # Project 6: Levitating Robotic AI Companion
│               └── SharedSpaceBackground.jsx # Background star particles & subtle nebula light
│
├── package.json                  # Dependencies & scripts
├── tailwind.config.js            # Tailwind typography, theme extensions & animations
├── vite.config.js                # Vite build & dev server configuration
└── ASSETS_AND_LICENSES.md        # Comprehensive open-source and public-domain license audit
```

---

## 🎨 3D Procedural Space Scenes

Each project features a custom procedural 3D space environment rendered in Three.js (zero external 3D downloads needed):

| # | Project | 3D Scene Theme | Description |
|---|---|---|---|
| **1** | **SnapClass** | **Mars Rover Explorer** | Cyber rover with 6 all-terrain wheels, suspension struts, avionics deck, and articulated mast holding the video display screen. |
| **2** | **AI Real-time GYM Coach** | **Orbital Satellite** | Spacecraft chassis with dual articulated photovoltaic solar wings, telemetry status LEDs, and dish antenna. |
| **3** | **HackSynth** | **Floating Astronaut** | Spacewalker in a life-support spacesuit hovering in zero gravity holding an interactive cyber tablet. |
| **4** | **StayNest** | **Spaceship Cockpit** | Starship flight deck bridge equipped with dual control sticks, instrument panel dashboard, and HUD monitor. |
| **5** | **ai-youtube-analyzer** | **Cyber Recon Drone** | Autonomous survey probe with 4 diagonal ion thruster arms, glowing plasma engine rings, and 360° sensor dome. |
| **6** | **AI Personal Assistant** | **Sentient AI Companion** | Levitating robotic AI assistant with pulsing optical eye, aura halo ring, and floating data crystals. |

---

## 📹 Video & WebGL Pipeline

- **Standard Screen Geometry**: All screens are standardized at `2.35m × 1.32m` (16:9 aspect ratio) with an identical bezel frame, metallic rim accent, and high-gloss specular glass sheen.
- **Resource Management**: Video playback is automatically paused when scrolled out of view or when switching browser tabs via `IntersectionObserver` and the `visibilitychange` API.
- **Custom Shader**: `VideoShaderMaterial.js` applies a hardware-accelerated 9-tap 2D Gaussian blur fragment shader directly on `THREE.VideoTexture`.

---

## ➕ Adding or Editing Projects

To add or modify projects, edit [`src/data/projects.js`](./src/data/projects.js). Each project adheres to the following schema:

```javascript
{
  id: 1,
  name: "Project Name",
  description: "Comprehensive overview of the application, architecture, and features.",
  liveUrl: "https://your-live-deployment.app",
  icon: "/icons/project-1.png",       // Placed in public/icons/
  video: "/videos/project-1.mp4",     // Placed in public/videos/
  poster: "/videos/project-1.jpg",    // Fallback poster image
  tech: ["React", "FastAPI", "Docker"] // List of technologies used
}
```

---

## 📄 License & Attribution

- **Source Code & Procedural 3D Scenes**: MIT License (c) 2026 Devaki Nandan.
- **Hero 3D Astronaut Model & Animations**: ["Animated Floating Astronaut in Space Suit Loop"](https://skfb.ly/o9pPT) and ["Animated Astronaut Character in Space Suit Loop"](https://skfb.ly/o9nHu) by [LasquetiSpice](https://sketchfab.com/LasquetiSpice) licensed under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/). Original geometry and rig unmodified; custom Three.js PBR shader parameters and dynamic lighting applied.
- **Fonts**: SIL Open Font License 1.1 ([Plus Jakarta Sans](https://fonts.google.com/specimen/Plus+Jakarta+Sans), [Playfair Display](https://fonts.google.com/specimen/Playfair+Display), [JetBrains Mono](https://fonts.google.com/specimen/JetBrains+Mono)).
- **Planetary Images**: United States Public Domain ([NASA / JPL](https://www.jpl.nasa.gov/)).
- For complete audit details and legal compliance, see [`ASSETS_AND_LICENSES.md`](./ASSETS_AND_LICENSES.md).
>>>>>>> c713778 (Initial commit of portfolio)
