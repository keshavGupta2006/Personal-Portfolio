# Portfolio — studio/k.

## Original Problem Statement
> https://www.sebastien-lempens.com can u build me this level of portfolio website

User extended the request to a **medieval-game inspired immersive experience** with a calm, soothing tone and an animated 3D bonfire with adventurers gathered around it as the opening scene.

## User Personas
- **Software developer & CS student** showcasing personal work — own portfolio.

## Core Requirements (static)
- Award-quality, dark cinematic portfolio at the level of sebastien-lempens.com
- 3D opening experience: animated bonfire with adventurers, calm medieval-game atmosphere
- Sections: Hero · About · Work · Contact
- Contact form persists to MongoDB (no email integration requested)
- Mobile responsive, smooth scroll, micro-interactions

## Architecture
- **Backend (FastAPI + MongoDB)**: `/api/projects` (4 seeded "tales"), `/api/projects/{id}`, `/api/contact` (POST + GET), `/api/status`
- **Frontend (React)**:
  - `BonfireScene.jsx` — React Three Fiber scene (no-JSX createElement to dodge `@emergentbase/visual-edits` babel-plugin injecting `x-line-number` attrs onto R3F intrinsics)
  - `Hero.jsx` — 3D canvas + overlay typography "Around the fire."
  - `Marquee.jsx`, `About.jsx`, `Work.jsx` (hover image follower), `Contact.jsx` (form), `Nav.jsx`, `Cursor.jsx`, `SmoothScroll.jsx` (Lenis)
- **Design**: Cabinet Grotesk + JetBrains Mono, near-black `#050505` + chartreuse `#D4ED31`, film-grain overlay
- **3D stack**: three.js, @react-three/fiber, @react-three/drei (Stars, Float)

## Implemented (2026-05-19)
- Backend Projects + Contact endpoints (4 themed tales), MongoDB persistence
- Dark cinematic frontend: nav, hero, marquee band, about, work list with hover-reveal, contact form, footer
- Custom magnetic cursor, Lenis smooth scroll, framer-motion reveals, grain overlay
- 3D bonfire hero scene: log tent, flickering flame + point light, rising ember particles, hooded silhouette adventurers around fire, distant mountains + pine trees, starry sky, idle camera sway
- Medieval theming: Tales / Traveler / Raven section labels, "Send a raven" contact CTA
- Testing: backend 100%, frontend ~95% (one minor invalid-email validation fixed via client-side regex)

## Backlog
- **P1**: User to provide real name, bio, projects, social URLs to replace placeholders ("studio/k.", invented project list, hello@studio-k.dev)
- **P1**: Optional ambient audio (fire crackle + wind) with mute toggle
- **P2**: Click-to-enter intro screen ("Sit by the fire") before scene starts
- **P2**: Per-project detail page with deeper case studies
- **P2**: Resume/CV download button in nav
- **P3**: Day/night cycle on scroll, snow particles seasonal variant

## Next Tasks
1. Collect personal details from user and personalize content
2. Replace project images with real screenshots / case studies
