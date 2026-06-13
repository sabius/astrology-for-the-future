# Handoff: Glenda Ferreira — Homepage Redesign & Design System

## Overview
A redesign of the **Glenda Ferreira** astrology homepage (currently a single long-scroll page at
`astrology-for-the-future.pages.dev`). Glenda is a physician/surgeon turned medical astrologer; the
redesign leads with that **credibility story** ("where clinical rigor meets cosmic wisdom") wrapped in a
**celestial, deep-navy + gold, editorial** aesthetic.

Two visual **directions** are included so the team can pick one (or mix). They share one design system
(colors, type, spacing, motion, components) and differ only in layout/composition:

- **Direction A — Editorial Celestial:** refined, lots of whitespace, gold hairline rules, numbered
  sections, a vertical experience timeline. The restrained, magazine-like option.
- **Direction B — Star Map / Cosmic Immersive:** layered and graphic — split hero with an orbital ring,
  concentric "star-map" rings behind the manifesto, circular portrait with credibility stats, service
  cards, and a horizontal timeline. The bolder, more atmospheric option.

## About the Design Files
The files in this bundle are **design references created in HTML** — a prototype showing the intended
look, layout, and motion. **They are not production code to copy line-for-line.** The task is to
**recreate these designs in the target codebase's existing environment** (the live site is built with
**Astro v5**, so Astro components + your CSS approach of choice is the natural fit), using its established
patterns. If no environment exists yet, choose the most appropriate framework and implement there.

The prototype is authored as a single "Design Component" HTML file with a small runtime (`support.js`)
and a floating **A / B switcher** at the bottom. The switcher is a **review tool only — do not ship it.**
In production each direction is just a normal page.

## Fidelity
**High-fidelity (hifi).** Final colors, typography, spacing, and interactions are specified below and
should be reproduced precisely. All hex values, font sizes, and timings are exact.

---

## Design Tokens

### Color
| Token | Hex | Usage |
|---|---|---|
| `--bg-900` | `#070e18` | Page background, Direction A |
| `--bg-950` | `#060b13` | Page background, Direction B |
| `--bg-850` | `#0b1626` | Mid gradient stop |
| `--bg-panel` | `#0a1322` | Section panels (timeline, about-B) |
| `--bg-ink` | `#0a1422` | Text color *on* gold buttons |
| `--footer-A` | `#060b13` | Footer bg, Direction A |
| `--footer-B` | `#05090f` | Footer bg, Direction B |
| `--gold` | `#c9a227` | Primary accent (buttons, rules, eyebrows, nodes) |
| `--gold-light` | `#e3c46a` | Hover/active gold, glints, italic accents |
| `--gold-muted` | `#cbb978` | Italic pull-quotes |
| `--ivory-100` | `#f6f0e6` | Largest display headlines |
| `--ivory-200` | `#f3ece1` | Standard headlines / logo |
| `--ivory-300` | `#f1eadd` | Quote text |
| `--text-body` | `#aebccb` | Body copy |
| `--text-body-2` | `#b9c6d4` | Hero subtitle |
| `--text-muted` | `#9fb0c0` | Secondary body / service descriptions |
| `--text-muted-2` | `#8e9db0` | Timeline captions / stat labels |
| `--text-faint` | `#7c8aa0` | Footer body, eyebrow-on-dark |
| `--text-faintest` | `#5d6b7d` | Legal line |
| `--nav-link` | `#cdd8e4` | Nav + footer links |

**Gold alpha hairlines / fills (use `--gold` = `201,162,39` at these opacities):**
`0.03` (tinted panel bg) · `0.05` (row/card hover bg) · `0.10–0.18` (section dividers, card borders) ·
`0.25–0.32` (orbital rings) · `0.5–0.55` (active rules, button outline).
Selection: `background:#c9a227; color:#070e18`.

### Typography
Two Google Fonts, editorial contrast:
- **Display serif — `Cormorant Garamond`** (weights 400/500/600, regular + italic). Headlines, numerals,
  pull-quotes, the Kepler quote, stat figures, logo wordmark.
- **Sans — `Work Sans`** (weights 300/400/500/600). Body, eyebrows/labels, nav, buttons, captions.

```
Import: https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500;1,600&family=Work+Sans:wght@300;400;500;600&display=swap
```

| Role | Family / weight | Size | Line-height | Tracking | Transform |
|---|---|---|---|---|---|
| Display H1 (hero) | Cormorant 500 | `clamp(52px, 9vw, 112px)` (A) / `clamp(54px,7vw,104px)` (B) | 1.05 / 1.02 | — | — |
| H2 (section) | Cormorant 500 | `clamp(32px, 4.2vw, 58px)` | 1.06–1.12 | — | — |
| H2 (CTA) | Cormorant 500 | `clamp(38px, 6vw, 82px)` | 1.04 | — | — |
| H3 (service/timeline) | Cormorant 500 | 22–28px | 1.1 | — | — |
| Pull-quote / Kepler | Cormorant **italic** 400 | 22px / `clamp(24px,3.2vw,40px)` | 1.4–1.5 | — | — |
| Stat figure | Cormorant 500 | 42px | 1 | — | — |
| Numeral (01/02/03) | Cormorant **italic** | 20–30px | — | — | — |
| Body | Work Sans 300 | 15–17px | 1.8–1.85 | — | — |
| Hero subtitle | Work Sans 300 | `clamp(15px,1.6vw,19px)` | 1.7 | — | — |
| Eyebrow / label | Work Sans 400 | 11–12px | — | `.26em–.42em` | uppercase |
| Nav link | Work Sans 400 | 12px | — | `.16em` | uppercase |
| Button label | Work Sans 600 | 11–12px | — | `.18em` | uppercase |
| Caption / legal | Work Sans 300 | 13–14px | 1.6–1.7 | — | — |

### Spacing & layout
- **Container max-width:** 1180px (A) / 1200px (B), centered.
- **Page gutters:** 52px (A) / 56px (B).
- **Section vertical rhythm:** 120–140px top/bottom (hero is `min-height:100vh`).
- **Grid gaps:** 26px (cards) · 36–40px · 70–80px (two-column editorial).
- **Two-column splits:** About-A `0.85fr / 1.15fr`; Hero-B / About-B `~1.05fr / 0.95fr`.

### Radius, borders, shadows
- **Button radius:** `2px` (intentionally sharp/editorial). **Pill/FAB radius:** `999px` / `50%`.
- **Cards (B):** square corners, `1px` gold-alpha border, `2px solid #c9a227` top border.
- **Button shadow:** `0 14px 40px rgba(201,162,39,.28–.3)`.
- **Card hover shadow:** `0 30px 60px rgba(0,0,0,.4)`.
- **Switcher (review-only) shadow:** `0 18px 50px rgba(0,0,0,.55)`, `backdrop-filter: blur(14px)`.
- **Timeline node:** 13px circle, `1px solid #c9a227`, halo `0 0 0 4px rgba(201,162,39,.12)` (current step `.2` + solid gold fill).

### Motion
- **Scroll reveal:** elements start `opacity:0; translateY(28px)`, animate to `opacity:1; none` over
  `1s cubic-bezier(.2,.7,.2,1)` via `IntersectionObserver` (`threshold:0.1`, `rootMargin:0 0 -6% 0`),
  reveal-once.
- **Twinkling starfield:** `<canvas>` behind heroes — ~150 stars, radius 0.3–1.7px, sinusoidal opacity
  twinkle (0.15–1.0), ~22% rendered in `#e3c46a` gold, rest `#f3ece1`. Respect `prefers-reduced-motion`.
- **Orbital rings (B):** `rotate 360°` over `90s`/`120s` linear infinite; faint ring `pulse opacity .25↔.6` over `7s`.
- **Hover transitions:** `0.3–0.4s` (color, transform, background, box-shadow).
- **Scroll-cue arrow:** float `translateY 0↔9px` + opacity over `2.4s`.

---

## Components

### Nav (transparent, over hero)
- Absolute/over-hero, padding `28–30px 52–56px`, space-between.
- **A:** serif wordmark "Glenda Ferreira" + links Home / Videos / Contact + **outline-gold "Book a reading"** button.
- **B:** wordmark prefixed with a 26px **orbital logo mark** (gold ring + center dot); links only (CTA lives in hero).
- Link hover → `#e3c46a`.

### Buttons
- **Primary (gold):** bg `#c9a227`, text `#0a1422`, label 11–12px/600/`.18em`/uppercase, padding `17–18px 38–44px`,
  radius 2px, gold shadow. **Hover:** bg `#e3c46a`, `translateY(-2px)`.
- **Outline (gold):** `1px solid rgba(201,162,39,.55)`, text `#e3c46a`, transparent. **Hover:** fill `#c9a227`, text `#0a1422`.
- **Text link w/ underline (B):** `border-bottom:1px solid rgba(201,162,39,.5)`, hover → `#e3c46a` (e.g. "Meet Glenda →").

### Hero
- **A:** full-bleed background image + dark radial/linear navy overlay + starfield canvas; centered eyebrow,
  giant serif "Clarity **&** Direction" (`&` italic gold), 540px subtitle, primary CTA, animated scroll cue.
- **B:** split grid — left text column on navy+starfield ("Clarity / and / *Direction*"), right image column
  with `1px` gold gradient mask + two concentric **orbital rings** (one rotating, with a glowing glint dot).

### Eyebrow label
Uppercase Work Sans, 11–12px, tracking `.3–.42em`, color `#c9a227`. Used above every section heading.

### Credential band (A) / Stats (B)
- **A:** centered inline row of italic serif credentials separated by gold `✦` glyphs
  (Physician ✦ Surgeon ✦ Public Health ✦ Medical Astrologer) on a faint gold-tinted band with top/bottom hairlines.
- **B:** 3-up stat grid — serif figure `#e3c46a` 42px + Work Sans caption ("40+ years of practice",
  "100s clients guided", "2 disciplines united"), divided by a top hairline.

### Services
- **A:** hairline-divided **list rows** — `80px / 1fr / 1.2fr / 40px` grid (italic numeral · serif title ·
  description · gold `→`). Row hover → `rgba(201,162,39,.05)` bg.
- **B:** **3-up cards** — square, `1px` gold border + `2px` gold top border, italic numeral, serif title, body.
  Hover → `translateY(-8px)`, tinted bg, dark shadow.

### Timeline (My Experience)
Four entries: **1983** Surgeon Physician · **1995–2022** Astrology · **2000** Public Health Management
Specialist · **2022–2024** Medical Astrology (current — solid gold node).
- **A:** vertical, gold gradient spine, circular nodes, gold date / serif title / muted institution.
- **B:** horizontal, gold gradient rule across the top, 4-column nodes hanging below.

### Quote band (Kepler)
Full-bleed cosmic image at `brightness(.4)` under a navy gradient; centered gold `✦`, large italic serif
quote, uppercase gold attribution "Johannes Kepler".

### CTA band
Eyebrow + huge serif "Let the stars give you direction" + subtitle + primary gold button. (B adds a slow
rotating orbital ring behind.)

### Footer
Three columns: wordmark + tagline · **Follow me** (Instagram / Facebook / YouTube) · **Language** (English / Español).
Bottom bar: `© 2026 Glenda Ferreira. All rights reserved.` + Privacy Policy / Terms of Service.

### WhatsApp FAB (shared)
Fixed bottom-right, 54px gold circle, `✆` glyph, `0 12px 30px rgba(0,0,0,.45)`, hover `scale(1.08)`.

---

## Interactions & Behavior
- **Scroll reveal** on every major section (see Motion).
- **Hover states:** nav/footer links → gold; buttons → lighter gold + lift; service rows → tinted bg;
  cards → lift + shadow; FAB → scale.
- **Smooth-scroll** anchor nav (`#a-top`, `#a-book`, etc.); `html { scroll-behavior:smooth }`.
- **Starfield + orbital rings** loop continuously; gate behind `prefers-reduced-motion: reduce`.
- **Direction switcher** is a prototype-only control — omit in production.
- **Responsive:** below ~900px collapse all two-column grids to single column, drop nav links into a menu,
  reduce section padding to ~72px, and keep the `clamp()` type scales (they already fluid-scale).
  The hero subtitle has a ~30px gap below the headline — preserve it when the headline wraps.

## State Management
Minimal. The only stateful piece is the **A/B switcher** (`dir: 'A' | 'B'`), which is review-only. The
production pages are static. Booking flows out to WhatsApp (external link). No data fetching.

## Assets
Hosted on the client's Cloudinary (`res.cloudinary.com/dvhwjf1zd/.../Glenda Ferreira/`), reused from the
current site — keep `f_auto,q_auto`:
- `image-asset_2_v5ailt.jpg` — starry night over mountains (Hero A bg, Quote B bg)
- `image-asset_zlvc49.webp` — cosmic sky (Hero B image, Quote A bg)
- `unsplash-image-kLqZ92hmqTw_ws9lzb.jpg` — aurora/celestial (About image, both directions)

**Note:** the About section currently uses a cosmic stock image as a stand-in. A **real portrait of Glenda**
is recommended there to reinforce the credibility story — treat that image slot as a placeholder.

**Links/handles:** Instagram `@11qanil`, Facebook `prima.vera.71619533`, YouTube `@glendaferreira`.
The "Book a reading" / FAB WhatsApp link uses a **placeholder number `1234567890`** — replace with the real number.

## Files
- `Glenda Ferreira Redesign.dc.html` — the prototype (both directions + switcher).
- `support.js` — the small runtime the prototype needs to render (open the HTML next to it). Reference only.
- Live, interactive version is viewable in the originating project.
