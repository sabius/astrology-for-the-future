# Research: Sitemap Generator

## Technical Decisions

### 1. Integration Choice: `@astrojs/sitemap`

- **Decision**: Use the official `@astrojs/sitemap` package integrated into `astro.config.mjs`.
- **Rationale**:
  - Native Astro 5 SSG integration hooks directly into `astro build` static page resolution.
  - Automatically discovers all generated static routes from `src/pages/[...slug].astro` and `index.astro`.
  - Built-in support for i18n, custom serialization (`lastmod`, `changefreq`, `priority`), and filtering (e.g. excluding redirects or 404 pages).
  - Out-of-the-box W3C Sitemap Protocol 0.9 and `xhtml:link` `hreflang` compliance.
- **Alternatives Considered**:
  - *Custom build script*: Writing a post-build node script to parse `dist/` HTML files or content collections. Rejected because it introduces custom parsing logic, requires manual canonical domain handling, and lacks native integration with Astro 5 routing.
  - *Dynamic XML Astro route (`src/pages/sitemap.xml.ts`)*: Building an Astro route endpoint that dynamically returns XML. Rejected because static build generation via official integration is faster, zero-runtime, and handles sitemap index chunking automatically if page count scales.

### 2. Multilingual `hreflang` Alternate Link Strategy

- **Decision**: Configure `@astrojs/sitemap` `i18n` option with `defaultLocale: "en"` and `locales: { en: "en", es: "es" }`, combined with custom `serialize` routing if necessary.
- **Rationale**:
  - Astro content pages exist under language prefixes `en/` and `es/` (e.g., `src/content/pages/en/...`, `src/content/pages/es/...`).
  - `@astrojs/sitemap` automatically pairs localized page paths and embeds `<xhtml:link rel="alternate" hreflang="es" href="..."/>` attributes when `i18n` locale settings are defined.

### 3. Route Exclusion & Filtering Criteria

- **Decision**: Implement a `filter` function in `sitemap()` config:
  - Exclude root redirect page (`https://astrology-for-the-future.pages.dev/`) if it only serves JS/meta redirect.
  - Exclude `/404` or error pages.
  - Exclude `/docs` when building for production if `showDocs` condition is disabled.
- **Rationale**: Search engine crawlers must not index 404 error pages or client-side redirect roots.

### 4. Canonical Site URL Resolution

- **Decision**: Rely on `site: "https://astrology-for-the-future.pages.dev"` configured in `astro.config.mjs`.
- **Rationale**: Astro uses the `site` configuration key as the canonical origin prefix for all sitemap absolute URLs.
