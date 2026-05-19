# Portfolio — The Wanderer (Medieval / RPG Theme)

## Original Problem Statement
> https://www.sebastien-lempens.com can u build me this level of portfolio website

User pivoted to a **full medieval RPG-themed portfolio** inspired by Shubham Goyal's viral portfolio (Character Sheet, Quest Log, Achievement medallions, Journey trail map). Calm soothing tone with a 3D bonfire opening scene.

## User Personas
- **Software developer & CS student** — own portfolio, identity is placeholder ("The Wanderer") to be replaced.

## Core Requirements
- Sebastien-lempens-quality polish in a fantasy RPG aesthetic
- 3D bonfire with adventurers at hero (Three.js / R3F)
- Sections: About (Character Sheet) · Experience (Journey Trail) · Projects (Quest Log) · Connect (Send a Raven)
- Achievements Unlocked medallion grid
- Contact form persists to MongoDB (no email integration)
- Mobile responsive

## Architecture
- **Backend (FastAPI + MongoDB)**:
  - `/api/projects` (4 seeded "quests" with rarity tiers)
  - `/api/projects/{id}` + 404
  - `/api/experiences` (4 journey stops with level/period/current flag)
  - `/api/achievements` (6 medallions with rank)
  - `/api/contact` (POST + GET, MongoDB persistence)
- **Frontend (React + R3F + Lenis + framer-motion)**:
  - `Hero.jsx` — "The Wanderer" massive Fraunces serif title, kicker "A NEW QUEST BEGINS", moon, starfield, 3D bonfire embedded at bottom
  - `BonfireScene.jsx` — React Three Fiber scene built with `React.createElement` to avoid `@emergentbase/visual-edits` babel plugin polluting R3F intrinsics (`x-line-number` bug)
  - `About.jsx` — parchment Character Sheet card (portrait + Lv. + class), skills chips, social icons, Resume button, Achievements grid of medallions
  - `Experience.jsx` — SVG **trail map** with curve through campsite nodes (clickable, highlights active stop) + experience cards on right
  - `Work.jsx` — Quest Log with parchment cards: rarity tag, stack chips, Link + Demo buttons
  - `Contact.jsx` — "Send a Raven" form with parchment styling
  - `Nav.jsx` — floating pill nav (About / Experience / Projects / Connect)
  - `Cursor.jsx` — custom magnetic cursor (orange)
  - `SmoothScroll.jsx` — Lenis (disable with `?nosmooth=1`)
- **Design**: Fraunces (display) + Manrope (body) + Cinzel (UPPERCASE labels). Palette: deep navy `#070a14` night sky, parchment `#f3e7cf` text, quest orange `#ff8128`, gold `#d4a13a`. Parchment cards with 4 gold corner markers.

## Implemented (2026-05-19)
- All endpoints (projects, experiences, achievements, contact) + MongoDB persistence
- Hero with 3D bonfire (logs, flame + point light, embers, hooded adventurers, mountains, trees, stars, moon)
- Character Sheet (portrait, skills, socials, achievements grid)
- Journey Trail SVG with interactive campsite nodes
- Quest Log parchment project cards with rarity tiers
- "Send a Raven" contact form, MongoDB persistence
- Smooth scroll (Lenis), framer-motion reveals, magnetic cursor, film grain overlay
- 100% backend tests, 100% frontend e2e tests (iteration_2)

## Backlog
- **P1**: User to provide real name, bio, real projects, social URLs, photo. Currently uses "The Wanderer" placeholder.
- **P2**: Optional ambient audio (fire crackle + wind) with mute toggle
- **P2**: Click-to-enter intro screen
- **P2**: Per-project detail pages (each quest opens its own page)
- **P3**: Real journey trail with parallax mountains, snow particles, day/night toggle

## Next Tasks
1. Collect real identity & content from user
2. Replace placeholder content & images
