# Assets and Licenses Inventory

This document provides a comprehensive, verified audit of all software packages, fonts, 3D scenes, shaders, textures, images, and data used in this portfolio, adhering strictly to permissive open-source, CC0, and public domain licensing rules.

---

## 1. NPM Packages (Dependencies)

All packages are pinned to exact versions without carets (`^`) or tildes (`~`). Every direct and transitive package in the dependency tree has been verified to be under a permissive license (MIT). There are **zero GPL or AGPL** dependencies.

| Package | Pinned Version | License | Source / Publisher | Purpose |
|---|---|---|---|---|
| **`react`** | `18.3.1` | MIT | [Meta Open Source](https://github.com/facebook/react) | UI framework |
| **`react-dom`** | `18.3.1` | MIT | [Meta Open Source](https://github.com/facebook/react) | DOM renderer for React |
| **`three`** | `0.174.0` | MIT | [Mr.doob / Three.js](https://github.com/mrdoob/three.js) | WebGL 3D engine |
| **`@react-three/fiber`** | `8.18.0` | MIT | [Poimandres](https://github.com/pmndrs/react-three-fiber) | React reconciler for Three.js |
| **`@react-three/drei`** | `9.122.0` | MIT | [Poimandres](https://github.com/pmndrs/drei) | Three.js helper utilities |
| **`framer-motion`** | `11.18.2` | MIT | [Motion / Framer](https://github.com/motiondivision/motion) | Smooth slide/fade text transitions |
| **`react-icons`** | `5.5.0` | MIT | [React Icons](https://github.com/react-icons/react-icons) | Technology badge & navigation icons |
| **`vite`** | `6.4.3` | MIT | [Vite Core Team](https://github.com/vitejs/vite) | Build tool & local dev server |
| **`@vitejs/plugin-react`** | `4.7.0` | MIT | [Vite Core Team](https://github.com/vitejs/vite-plugin-react) | Fast refresh React plugin for Vite |
| **`tailwindcss`** | `3.4.19` | MIT | [Tailwind Labs](https://github.com/tailwindlabs/tailwindcss) | Utility CSS framework |
| **`postcss`** | `8.5.28` | MIT | [PostCSS Team](https://github.com/postcss/postcss) | CSS transformation engine |
| **`autoprefixer`** | `10.6.1` | MIT | [Andrey Sitnik](https://github.com/postcss/autoprefixer) | CSS vendor prefixer |

*Transitive Dependency Audit*: Verified 0 GPL/AGPL packages across the entire lockfile.

---

## 2. Typography & Fonts

All web fonts are loaded via Google Fonts under the **SIL Open Font License 1.1 (OFL)**, which permits 100% free commercial and personal usage, embedding, and bundling.

| Font Family | Author / Foundry | License | Source |
|---|---|---|---|
| **Plus Jakarta Sans** | Tokotype / Gumpita Rahayu | SIL Open Font License 1.1 | [Google Fonts / Tokotype](https://fonts.google.com/specimen/Plus+Jakarta+Sans) |
| **Playfair Display** | Claus Eggers Sørensen | SIL Open Font License 1.1 | [Google Fonts / Claus Sørensen](https://fonts.google.com/specimen/Playfair+Display) |
| **JetBrains Mono** | JetBrains | SIL Open Font License 1.1 | [Google Fonts / JetBrains](https://fonts.google.com/specimen/JetBrains+Mono) |

## 3. Third-Party 3D Character Models & Animations (CC BY 4.0)

The hero 3D astronaut and its skeletal animation tracks are derived from Creative Commons-licensed works by 3D artist **LasquetiSpice**. Both companion assets are attributed in full accordance with the **Creative Commons Attribution 4.0 International (CC BY 4.0)** license.

| Asset File | Source Work Title | Author | License | Source Link | Purpose / Usage |
|---|---|---|---|---|---|
| `/public/astronaut.glb` | **"Animated Floating Astronaut in Space Suit Loop"** | LasquetiSpice | [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/) | [Sketchfab (skfb.ly/o9pPT)](https://skfb.ly/o9pPT) | 3D character mesh, suit textures, zero-g floating loop & skeletal rig |
| `/public/astronaut.glb` | **"Animated Astronaut Character in Space Suit Loop"** | LasquetiSpice | [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/) | [Sketchfab (skfb.ly/o9nHu)](https://skfb.ly/o9nHu) | Skeletal waving greeting animation track & character loop |

### Modifications & Adaptations Disclosure (Honest & Transparent Audit):
* **3D Mesh Geometry & Rigging**: **Unmodified**. The original 3D character mesh vertices, face normals, textures, and skeletal bone hierarchy created by LasquetiSpice are fully preserved as authored.
* **Runtime WebGL Rendering (Three.js)**: Configured custom PBR material rendering properties (tinted obsidian helmet visor with specular reflections, calibrated Nomex suit fabric roughness and metalness), real-time directional solar lighting and ambient rim illumination, camera zero-g kinematics, and programmatic animation trigger choreography (greeting wave sequence on initial load, smoothly transitioning into continuous zero-g floating drift).

### Comprehensive Third-Party Asset Audit:
* **Zero Other 3D Models or Animations**: Zero other downloaded 3D models, external rigs, or third-party animation libraries (such as *"Hello my friends"* by Urpo or Lottie animations) are used anywhere on this website.
* **License Scope & Separation**: The CC BY 4.0 license applies strictly and exclusively to the third-party astronaut 3D model assets and skeletal animation tracks. All portfolio application code, procedural 3D scenes, shaders, and UI design are copyright © 2026 Devaki Nandan under the permissive **MIT License**.

---

## 4. Custom Procedural 3D Space Scenes (Zero External Downloads)

Each project is paired with a distinct, procedurally generated 3D space environment designed to reflect the project's core functionality. All geometries are procedurally constructed using Three.js built-ins. **Zero external 3D model files are downloaded.**

| Project | Custom Space Setup | Procedural 3D Elements | Implementation File | License |
|---|---|---|---|---|
| **1. Snap-Ai-Attendance** | **Cyber Space Rover Explorer** | Zero-g cyber rover with 6 wheels, suspension struts, avionics deck, scanning dish, and articulated mast holding video display | `src/components/projects/scenes/MarsRoverScene.jsx` | Written from scratch (MIT) |
| **2. AI Real-time Gym Coach** | **Orbital Satellite Screen** | Orbital satellite body with dual segmented photovoltaic solar wings, status telemetry LEDs, and dish antenna | `src/components/projects/scenes/SatelliteScreenScene.jsx` | Written from scratch (MIT) |
| **3. Hacksynth** | **Floating Astronaut** | Zero-gravity astronaut in spacesuit holding a futuristic cyber tablet displaying the project video | `src/components/projects/scenes/FloatingAstronautScene.jsx` | Written from scratch (MIT) |
| **4. Staynest** | **Spaceship Cockpit & Flight Console** | Futuristic spacecraft bridge with dual flight control joysticks, instrument dashboard console, and front cockpit flight display | `src/components/projects/scenes/SpaceshipCockpitScene.jsx` | Written from scratch (MIT) |
| **5. AI Youtube Video Analyzer** | **Cyber AI Recon Drone** | Autonomous survey probe with 4 diagonal ion thruster arms with plasma rings, 360° optical scanner dome, and robotic clamp arms | `src/components/projects/scenes/CyberDroneScene.jsx` | Written from scratch (MIT) |
| **6. AI Personal Assistant** | **Sentient AI Companion Droid** | Friendly levitating robotic AI companion with pulsing optical eye, aura halo ring, orbiting data prisms, and cyber screen | `src/components/projects/scenes/SentientAiCompanionScene.jsx` | Written from scratch (MIT) |

---

## 5. Custom Video Shaders & WebGL Pipelines

| Component | Description | Implementation File | License |
|---|---|---|---|
| **Gaussian Blur Video Shader** | 9-tap 2D Gaussian kernel on `THREE.VideoTexture` with adjustable `uBlur` (default 1.5px), sRGB color management, and optional spherical curvature distortion (works natively in Safari without `ctx.filter`) | `src/components/projects/VideoShaderMaterial.js` | Written from scratch (MIT) |
| **Video Telemetry Manager** | Manages HTML5 video pooling, custom playback speed rates (`[2, 3, 2, 3, 2, 3]`), off-screen and tab-hidden pauses via `IntersectionObserver` & `visibilitychange`, and poster fallbacks | `src/components/projects/useProjectVideo.js` | Written from scratch (MIT) |

---

## 6. Planetary & Space Photography (Public Domain Vistas)

Under United States Federal Law (**17 U.S.C. § 105**), works created by the United States Federal Government (including NASA) automatically reside in the **Public Domain**. None of these images contain NASA logos, agency seals, watermarks, or third-party copyrighted elements.

| Image File | Description | License | Source / Attribution |
|---|---|---|---|
| `/public/videos/project-1.jpg` (mars) | Martian Surface & Horizon | **Public Domain** | NASA Jet Propulsion Laboratory (JPL) |
| `/public/videos/project-2.jpg` (earth) | Earth Horizon & Atmospheric Rayleigh Scattering | **Public Domain** | NASA Earth Observatory / ISS |
| `/public/videos/project-3.jpg` (aurora) | Earth Polar Aurora Borealis Emission | **Public Domain** | NASA Johnson Space Center (ISS Astronaut Photography) |
| `/public/videos/project-4.jpg` (night) | Earth Nightside & City Lights Grid | **Public Domain** | NASA Earth Observatory |
| `/public/videos/project-5.jpg` (moon) | Lunar Regolith & Earthrise Horizon | **Public Domain** | NASA Apollo / Lunar Reconnaissance Orbiter (LRO) |
| `/public/videos/project-6.jpg` (sunrise)| Orbital Sunrise over Low Earth Orbit | **Public Domain** | NASA Scientific Visualization Studio |

---

## 7. Project Assets & User Files

| Asset Path | Type | Ownership / License | Description |
|---|---|---|---|
| `/public/icons/project-1.png` to `project-6.png` | PNG | Owned by Devaki Nandan | Project application icons |
| `/public/videos/project-1.mp4` to `project-6.mp4` | MP4 | Owned by Devaki Nandan | Screen-recorded project walkthrough videos |
| `/public/devaki.jpg`, `/public/devaki.png` | JPG / PNG | Owned by Devaki Nandan | Portrait photo used in About Me section |
| `src/data/projects.js` | JS Data | MIT / User Content | Project metadata (name, description, liveUrl, tech, speed) |

---

## 8. Data Privacy, Tracking, and Network Rules Compliance

* **Self-Hosted & Offline Ready**: All libraries, fonts, and assets are bundled locally through npm and the Vite build. Zero CDN links.
* **No Analytics / Telemetry**: No Google Analytics, no tracking scripts, no telemetry SDKs.
* **No Cookies**: Zero cookies created, stored, or transmitted.
* **No External API Calls**: Zero runtime network requests to external servers.
* **No Paid / Trial Services**: All packages are permanently free and open-source under permissive licenses (MIT).
