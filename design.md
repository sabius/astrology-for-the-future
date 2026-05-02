# Design System & Styling Rules for LLM Agents

When building or modifying components in this project, you **must strictly adhere** to the established design system. This project uses **Tailwind CSS v4** and requires the use of predefined utility classes over arbitrary values to ensure visual consistency across the entire site.

## 1. Typography

- **Primary Font**: `Cormorant Garamond Variable` (Serif).
- **Fallback**: Built-in sans/serif fallbacks as configured in Tailwind.
- **Sizing**: Use standard Tailwind typography utilities (`text-sm`, `text-base`, `text-lg`, `text-xl`, `text-2xl`, `text-3xl`, `text-4xl`, `text-5xl`, etc.).
- **Tracking/Spacing**: Use standard utilities (`tracking-tight`, `tracking-normal`, `tracking-wide`). 
- 🚫 **NEVER** use arbitrary font sizes or letter spacing (e.g., `text-[2rem]`, `tracking-[0.01em]`).

## 2. Color Palette (The "Primary" Theme)

The project has a unified astrology-themed purple/violet palette defined in `src/styles/global.css`. You must use the `primary-*` classes instead of hardcoding hex colors.

- **Backgrounds**: `--color-background-gray` mapped to a soft purple-gray.
- **Brand Colors**: `--color-brand-whatsapp` (`#25D366`).
- **Primary Scale**: 
  - `primary-50` to `primary-400`: Light purple tints (used for soft backgrounds, active menu states).
  - `primary-500` to `primary-700`: Vibrant purples (used for accents, buttons, and hover states). `primary-600` is the main accent color.
  - `primary-800` to `primary-950`: Dark desaturated purples (used for standard text, headings, and high-contrast elements).

### Usage Examples:
- **Headings**: `text-primary-900` or `text-primary-950`
- **Body Text**: `text-primary-800` or standard `text-gray-700`
- **Buttons / Highlights**: `bg-primary-600`, `text-primary-600`
- 🚫 **NEVER** use arbitrary hex colors in classes (e.g., `text-[#4f3c57]`, `bg-[#2e2133]`).

## 3. Spacing & Layout

- Use standard Tailwind spacing utilities (`p-4`, `m-8`, `gap-10`, `py-16`).
- For constraints, use standard `max-w-*` utilities (e.g., `max-w-3xl`, `max-w-5xl`).
- 🚫 **NEVER** use arbitrary pixel or rem values for layout containers unless absolutely necessary for complex, custom grid alignments not supported by standard utilities.

## 4. Components

- **Buttons**: The `Button.astro` component handles its own styles based on the `variant` prop (`primary`, `secondary`, `outline`, `accent`). Use the component directly instead of manually styling anchor tags.
- **Responsiveness**: Always build mobile-first. Use `md:` and `lg:` prefixes to adjust font sizes and padding on larger screens (e.g., `text-2xl md:text-4xl py-12 md:py-20`).
