# Design System & Styling Rules — "Astrolabio Nocturno"

When building or modifying components in this project, you **must strictly adhere** to the established **Astrolabio Nocturno** design system defined in `src/styles/global.css`. This project uses **Tailwind CSS v4** and requires predefined theme utilities over arbitrary values to keep the site visually cohesive.

## 1. Typography (Serif + Sans UI)

- **Display & Editorial Font (`font-serif`)**: `Cormorant Garamond Variable` — used automatically on `h1`–`h4`, `blockquote`, and the brand wordmark.
- **UI & Body Font (`font-sans`)**: `Plus Jakarta Sans Variable` — used for body copy, navigation, buttons, pills, metadata, and legal pages.
- **Sizing**: Use standard Tailwind typography utilities (`text-sm`, `text-base`, `text-lg`, `text-xl`, `text-2xl`, `text-3xl`, `text-4xl`, `text-5xl`, etc.).
- **Tracking/Spacing**: Use standard utilities (`tracking-tight`, `tracking-normal`, `tracking-wide`, `tracking-widest`).
- 🚫 **NEVER** use arbitrary font sizes or letter spacing (e.g., `text-[2rem]`, `tracking-[0.01em]`).

## 2. Color Palette (Celestial Navy, Antique Gold & Warm Alabaster)

All tokens live in `src/styles/global.css`. Always use semantic classes instead of hardcoded hex colors.

- **Surfaces & Neutrals**:
  - `bg-canvas` (`#F7F5F0`): Warm Alabaster main page background.
  - `bg-surface` (`#FFFFFF`): Crisp Ivory cards, header, and elevated containers.
  - `bg-surface-alt` (`#EFECE4`): Soft Parchment band for subtle section alternation (e.g., CTA cushion above dark footer).
  - `border-border-subtle` (`#E2DDD2`): Warm hairline borders on light surfaces.
  - `bg-midnight` (`#0B1120`): Deep nocturnal background for the global footer.
  - `text-ink-muted` (`#4B5568`): Secondary body copy on light surfaces.
- **Primary Scale (`primary-50` to `primary-950` — Celestial Navy / Indigo)**:
  - `primary-50` to `primary-200`: Soft celestial tints (active pills, subtle highlights).
  - `primary-600` to `primary-800`: Celestial Indigo (`primary-800` is the primary button fill on light surfaces).
  - `primary-900` to `primary-950`: Deep Ink headings (`primary-900`) and nocturnal section bands (`primary-950`).
- **Accent Scale (`accent-50` to `accent-900` — Antique Gold / Champagne Brass)**:
  - `accent-100` to `accent-300`: Subtle gold highlights, star ornaments, and hairline borders on dark cards (`border-accent-300/30`).
  - `accent-500` / `accent-600`: Signature Antique Gold (`#B88A44` / hover `#9F7434`) for high-priority CTAs on dark surfaces and eyebrow labels.
- **Brand Colors**:
  - `bg-brand-whatsapp` (`#25D366`): Reserved strictly for the floating WhatsApp action button.
- 🚫 **NEVER** use arbitrary hex colors in classes (e.g., `text-[#4f3c57]`, `bg-[#2e2133]`).

## 3. Spacing & Layout

- Use standard Tailwind spacing utilities (`p-4`, `m-8`, `gap-10`, `py-16`).
- For constraints, use standard `max-w-*` utilities (e.g., `max-w-3xl`, `max-w-5xl`, `max-w-6xl`).
- 🚫 **NEVER** use arbitrary pixel or rem values for layout containers unless strictly unavoidable.

## 4. Components

- **Buttons**: Always use `Button.astro` with its `variant` prop (`primary`, `secondary`, `accent`, `outline`, `ghost`) instead of manually styling anchor tags.
  - On **light surfaces**: prefer `primary` (celestial indigo), `secondary`, or `outline`.
  - On **dark nocturnal surfaces** (Hero, Dark CTA): prefer `accent` (antique gold) for the primary action and `ghost` (translucent glass with gold hairline border) for the secondary action.
- **Responsiveness**: Always build mobile-first with `sm:`, `md:`, and `lg:` breakpoints.
- **Live Playground**: Explore tokens and live previews in dev via `/docs/design-system`.
