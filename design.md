# Design System & Styling Rules for LLM Agents

This site uses a **celestial, deep-navy + gold, editorial** aesthetic (the "Star Map" redesign,
Direction B). It is built with **Astro 5 + Tailwind CSS v4**. Design tokens live in
`src/styles/global.css` under `@theme`. Prefer the predefined token utilities over hardcoded hex.

## 1. Typography

Editorial contrast between two families:

- **Display serif — Cormorant Garamond** (`font-serif`, self-hosted via `@fontsource-variable`).
  Used for all headings, numerals, pull-quotes, the Kepler quote, stat figures, and the logo wordmark.
  Headings (`h1`–`h6`) default to `font-serif` / weight 500 globally.
- **Sans — Work Sans** (`font-sans`, the default body font, loaded via Google Fonts in `BaseLayout`).
  Used for body copy, eyebrows/labels, nav, buttons, captions.

Fluid display sizes use `clamp()` (e.g. hero `clamp(54px,7vw,104px)`, section H2
`clamp(32px,4.2vw,56px)`). Eyebrows/labels: uppercase Work Sans, 11–12px, tracking `.26em`–`.42em`,
color `--color-gold`. Buttons: uppercase, weight 600, tracking `.18em`.

## 2. Color Palette (Celestial)

Defined as Tailwind theme colors — use the utilities (`text-gold`, `bg-bg-950`, `border-gold/16`,
`text-ivory-200`, etc.), and the `/<opacity>` modifier for gold-alpha hairlines.

| Token / utility | Hex | Usage |
|---|---|---|
| `bg-900` | `#070e18` | Page background |
| `bg-950` | `#060b13` | Deepest background (Direction B base) |
| `bg-850` | `#0b1626` | Mid gradient stop |
| `bg-panel` | `#0a1322` | Section panels (timeline, video) |
| `bg-footer` | `#05090f` | Footer background |
| `ink` | `#0a1422` | Text *on* gold buttons |
| `gold` | `#c9a227` | Primary accent (buttons, rules, eyebrows, nodes) |
| `gold-light` | `#e3c46a` | Hover/active gold, glints, italic accents |
| `gold-muted` | `#cbb978` | Italic pull-quotes |
| `ivory-100/200/300` | `#f6f0e6` / `#f3ece1` / `#f1eadd` | Headlines / quote text |
| `body`, `body-2` | `#aebccb` / `#b9c6d4` | Body copy / hero subtitle |
| `muted`, `muted-2` | `#9fb0c0` / `#8e9db0` | Secondary copy / captions, stat labels |
| `faint`, `faintest` | `#7c8aa0` / `#5d6b7d` | Footer body / legal line |
| `navlink` | `#cdd8e4` | Nav + footer links |

**Gold-alpha hairlines:** use `border-gold/10`–`/18` for dividers/card borders, `/25`–`/32` for
orbital rings, `/55` for active rules/button outlines. Selection is gold-on-navy (set globally).

🚫 Avoid raw hex in classes when a token exists. Arbitrary values **are** permitted for the
hifi specifics this design depends on: `clamp()` type scales, gold-alpha rings, and the exact
gradient/box-shadow strings the prototype specifies.

## 3. Spacing & layout

- Centered `.container`; section vertical rhythm ~`py-24`/`py-28` (96–112px), heroes `min-h-screen`.
- Two-column splits collapse to single column below `md`.

## 4. Motion

- **Scroll reveal:** add `data-reveal` to a section; the global runtime in `BaseLayout.astro` fades
  it in (`opacity 0→1`, `translateY(28px)→0`) via IntersectionObserver, once.
- **Starfield:** add `<canvas data-starfield>`; the same runtime twinkles ~150 stars.
- **Orbital rings:** `.animate-spinslow` (default 90s; override duration with inline `--dur`),
  `.animate-pulsering` (7s), `.animate-flcue`.
- All motion is gated behind `prefers-reduced-motion: reduce`.

## 5. Components

- **Page builder:** sections are content blocks in `src/content/pages/[lang]/*.md`, mapped by
  `src/components/componentMap.ts` and validated by `src/content/config.ts` (Zod). See `AGENTS.md`.
- **Buttons:** use `Button.astro` (`variant`: `primary` = solid gold; `outline`/`accent` = gold
  outline; `secondary` = tinted gold). Sharp 2px radius, uppercase label.
- **Responsiveness:** build mobile-first; use `md:`/`lg:` prefixes. `clamp()` type already fluid-scales.
