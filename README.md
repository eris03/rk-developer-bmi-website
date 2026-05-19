# BMI Housing — Home Version One

Luxury landing page for BMI Housing Co-Operative Society, blending three things into one runnable experience:

- **Luxury Architectural Minimalism** — slate / pearl / gold palette, Playfair + Inter, glassmorphism nav, magnet CTAs.
- **Cinematic zoom-out scroll flow** — scroll the wheel and the current section progressively zooms out as the next emerges from "behind" it. Stops where you stop. No auto-snap.
- **Immersive 3D site plan** — procedural Three.js model with hover-to-inspect tilt and slow camera orbit, mounted as one of the sections in the flow.

Built with **Next.js 14 (App Router)** + **Tailwind CSS** + **Framer Motion** + **Three.js**.

---

## Quick start

You need **Node.js 18.17 or newer**. In a terminal in this folder:

```bash
npm install
npm run dev
```

Open http://localhost:3000.

For a production build:

```bash
npm run build
npm run start
```

---

## What you'll see

The page is six full-viewport scenes, navigated by scrolling, arrow keys, the left progress rail, the top nav, or the side icons:

| # | Section          | What it shows                                                               |
|---|------------------|-----------------------------------------------------------------------------|
| 0 | Home             | Slow-zoom architectural background, line-by-line text reveal, magnet CTA   |
| 1 | The Society      | 3 pillars: Government Approved · Community Driven · Radical Transparency   |
| 2 | Amenities        | Arrow-driven luxury carousel: Clubhouse, Greens, Wellness, Streets, Future |
| 3 | 3D Tour          | Procedural Three.js site plan with hover-to-inspect, gold-accented assets  |
| 4 | Infrastructure   | Stat grid: 40ft roads · 100% underground · 24/7 drainage · 8min metro      |
| 5 | Membership       | Glass form with **Membership Interest** + **Investment Range** dropdowns   |

Floating side icons (right): WhatsApp, Ask BMI AI, Message Us, Contact, Call.
Left rail: progress dots with hover tooltips.

---

## Project structure

```
src/app/
├── layout.jsx                # Root layout, font loaders, metadata
├── page.jsx                  # Server entry → renders ClientHome
├── globals.css               # Tailwind + stage perspective + glass
└── components/
    ├── ClientHome.jsx        # Composes ZoomStage + chrome
    ├── ZoomStage.jsx         # Progressive zoom-out scroll engine
    ├── Header.jsx            # Glass nav (uses useZoom for active link)
    ├── ProgressRail.jsx      # Left dot rail
    ├── SideActions.jsx       # Floating right icons
    ├── Splash.jsx            # Initial brand reveal
    ├── Hero.jsx              # Section 0
    ├── Trust.jsx             # Section 1
    ├── Amenities.jsx         # Section 2 — arrow-driven carousel
    ├── Immersive3D.jsx       # Section 3 — wraps the 3D canvas
    ├── Immersive3DCanvas.jsx # Three.js scene (dynamic, ssr:false)
    ├── Infrastructure.jsx    # Section 4
    ├── Contact.jsx           # Section 5 (footer absorbed)
    ├── MagnetButton.jsx      # Cursor-following CTA
    └── RevealText.jsx        # Wipe-up text reveal helper
```

The previous pastel zoom-scroll prototype is preserved untouched in `_legacy/`.

---

## Design tokens

| Token | Value     | Use                          |
|-------|-----------|------------------------------|
| Slate | `#1a1a1a` | Background, body             |
| Pearl | `#f4f4f4` | Primary text                 |
| Gold  | `#c5a059` | Accents, CTA, brand emphasis |
| Playfair Display | serif | Headings, italic emphasis (gold) |
| Inter | sans     | Body text & UI                |

All in `tailwind.config.js`.

---

## Customizing

- **Hero background** → `Hero.jsx` → `HERO_BG`
- **Society pillars** → `Trust.jsx` → `pillars`
- **Amenity cards** → `Amenities.jsx` → `amenities`
- **Infrastructure stats** → `Infrastructure.jsx` → `features`
- **Form options** → `Contact.jsx` → `interests`, `ranges`
- **Phone numbers** → search `9999999999` and replace
- **3D scene assets** → `Immersive3DCanvas.jsx`, edit the `plots[]`, `trees[]`, pavilion, walls
- **Zoom feel** → `ZoomStage.jsx` constants: `WHEEL_SENS`, `LERP`, `SCALE_OUT`, `SCALE_IN`

---

## Browser support

Latest Chrome / Edge / Firefox / Safari (desktop and mobile).
Animations and 3D shadows degrade gracefully on `prefers-reduced-motion: reduce` and on screens ≤ 1024 px.

Built for production. Deploy to Vercel with a single click.
