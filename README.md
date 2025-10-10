# Astrology for the Future

Astrology for the Future is a multilingual marketing site for Glenda Ferreira P., M.D., offering astrology readings and educational resources. The site is built with [Astro](https://astro.build) and Tailwind CSS and renders statically so it can be hosted on any CDN or static hosting provider.

## Features

- **Content-driven pages** – Pages are assembled from reusable content blocks (hero, feature card, split content, call-to-action) defined in Markdown frontmatter.
- **Bilingual experience** – English and Spanish translations live side-by-side and are served through Astro's internationalized routing with locale-aware content collections.
- **Responsive UI** – Tailwind CSS utilities and custom components deliver a polished layout that adapts to all screen sizes.
- **Image-first storytelling** – Hero and feature sections support remote media URLs, making it easy to highlight offerings and promotions.

## Tech stack

- [Astro 5](https://docs.astro.build/) for static site generation
- Tailwind CSS 4 for utility-first styling
- [Astro Content Collections](https://docs.astro.build/en/guides/content-collections/) for structured page data
- TypeScript for type safety

## Getting started

### Prerequisites

- Node.js 18.17 or newer
- npm 9 or newer

### Installation

```bash
npm install
```

### Local development

```bash
npm run dev
```

The site will be available at the address printed in the terminal (defaults to http://localhost:4321).

### Static build

```bash
npm run build
```

The production-ready HTML, CSS, and JavaScript will be output to `dist/`.

### Preview production build locally

```bash
npm run preview
```

This serves the `dist/` directory locally so you can verify the production build before deploying.

## Project structure

```
├── src
│   ├── assets/              # Static assets referenced by components
│   ├── components/          # UI primitives and page sections
│   ├── content/             # Astro content collections (multilingual page data)
│   ├── i18n/                # Locale dictionaries and helpers
│   ├── layouts/             # Base layout wrapper
│   ├── pages/               # Astro routes (localized catch-all page renderer)
│   └── styles/              # Global stylesheet
├── static/                  # Files copied verbatim to the final build
├── astro.config.mjs         # Astro configuration
├── tailwind.config.mjs      # Tailwind CSS configuration
└── package.json             # Scripts and dependencies
```

## Authoring content

Pages are defined in `src/content/pages/<locale>/`. Each Markdown file contains frontmatter that describes a list of blocks. Blocks are validated with Zod schemas declared in `src/content/config.ts`, ensuring consistent structure.

Example snippet:

```yaml
content:
  - component: "hero"
    header: "Glenda Ferreira P., M.D."
    copy: "Expert Astrology Readings and Guidance"
    button:
      text: "Book a reading"
      url: "/about"
```

Available blocks include:

- `hero` – Large header section with optional copy, background image, and call-to-action button.
- `feature-card` – Highlight a single offering with imagery and bullet points.
- `split-content` – Two-column section for timelines or qualifications.
- `cta` – Focused call-to-action banner.

## Localization

Localized text and UI strings live in `src/i18n/*.json`. The helper in `src/i18n/index.ts` selects the appropriate dictionary based on the active locale. Add new locales by creating a JSON file and exporting it from the `locales` map.

## Deployment

`npm run build` outputs a fully static site to `dist/`. Deploy the contents of this folder to your preferred static hosting platform (Netlify, Vercel, GitHub Pages, etc.).

---

If you run into issues or have suggestions for improvement, please open an issue or submit a pull request.
