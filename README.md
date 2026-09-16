# Anfil — Cinematic Digital Portfolio

An award-winning caliber, full-screen cinematic portfolio website built with **React 18**, **TypeScript**, **Vite**, and **GSAP 3**, inspired by the visual language and interaction architecture of [christoph-nagel.dev](https://christoph-nagel.dev/#webentwicklung).

![Anfil Portfolio Preview](public/assets/media/intro.jpg)

---

## ✨ Features & Architecture

### 1. Viewport-Based Panel System
- **100vw × 100dvh Experience**: Replaces conventional scroll layouts with a full-screen panel viewport system.
- **Independent Panels**:
  - `#intro` — Monogram identity (`[ AP ]`), subline, and vertically rotating masked typography (`DESIGN.` → `DEVELOP.` → `DELIVER.`).
  - `#about` — Narrow editorial narrative (`35vw` desktop width) with custom scrollbar.
  - `#work` — Interactive project showcase (*Aether Studio*, *Synapse Engine*, *Kroma Design System*, *Veloce Commerce*).
  - `#skills` — Categorized architectural matrix (Creative Engineering, Frontend Architecture, Backend & Systems, AI & Automations).
  - `#experience` — Career milestone timeline.
  - `#contact` — Editorial CTA (*LET'S TALK →*), direct email, and social conduits.

### 2. Layered Cinematic Video & Canvas Stage
- **Visual Stacking Order**:
  1. 60fps Living Procedural Canvas (atmospheric dark particles & volumetric gradient).
  2. Independent section media backdrops with scale and crossfade dynamics.
  3. Desaturated monochrome grading (`grayscale(1) contrast(1.06) brightness(0.55)`).
  4. Radial & linear dark atmospheric vignettes.
  5. Directional left-side content shade gradient for optimal typography readability.
  6. Rapid stepped animated film grain overlay (`.grain`).
  7. Glowing 1px vertical wipe edge (`.wipe-edge`) that traverses across the screen on section transitions.

### 3. GSAP Animation Engine & Multi-Modal Controls
- **Central Transition Controller**: Choreographs exit transitions, wipe sweep, backdrop crossfade, and masked heading reveals (`yPercent: 110` → `0`) with transition locking to prevent race conditions.
- **Mouse Wheel**: Debounced wheel handler supporting seamless section transitions while respecting inner content scrolling.
- **Touch Gestures**: Mobile swipe detection (`touchstart` & `touchend`, >50px threshold).
- **Keyboard Navigation**: Full support for `ArrowDown`, `ArrowUp`, `PageDown`, `PageUp`, `Home`, `End`, and `Escape`.
- **URL Hash Synchronization**: Live synchronization with `#intro`, `#about`, `#work`, `#skills`, `#experience`, `#contact` and browser history (`popstate`).

### 4. Micro-Interactions & Glassmorphism
- **Desktop Custom Cursor**: 60px circular frosted glass circle displaying `"SCROLL"`, smoothly tracking with GSAP `quickTo`, morphing into a 12px white dot with dual expanding pulse rings over clickable elements.
- **Cinematic Preloader**: Audio VU-meter aesthetic with 20 reactive meter segments, analog needle sweep, percentage 0% → 100%, and blur/scale exit reveal.
- **Interactive Modals**:
  - Contact drawer with message dispatch simulation and copy-to-clipboard email feedback.
  - Architecture & Performance Audit diagnostic tool.
  - Legal modal dialogs (Impressum & Datenschutz / Privacy Policy).

---

## 🛠️ Tech Stack

- **Framework**: [React 18](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Bundler**: [Vite 6](https://vitejs.dev/)
- **Animation Engine**: [GSAP 3](https://greensock.com/gsap/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Typography**: Anton (Display) & Manrope (Body / UI)
- **Styling**: Modern CSS Custom Properties, Frosted Glassmorphism, BEM architecture

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- npm / yarn / pnpm

### Installation
```bash
# Clone the repository
git clone https://github.com/meappu7/Portfolio.git

# Navigate into the project
cd Portfolio

# Install dependencies
npm install

# Start development server
npm run dev
```

### Building for Production
```bash
npm run build
```
Preview the production build locally:
```bash
npm run preview
```

---

## 📄 License

MIT © [Anfil](https://github.com/meappu7)
