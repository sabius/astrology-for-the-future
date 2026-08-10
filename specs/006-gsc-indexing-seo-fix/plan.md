# Implementation Plan: Google Search Console Indexing & Canonical SEO Fix

**Branch**: `006-gsc-indexing-seo-fix` | **Date**: 2026-08-09 | **Spec**: [specs/006-gsc-indexing-seo-fix/spec.md](file:///d:/Projects/astrology-for-the-future/specs/006-gsc-indexing-seo-fix/spec.md)

**Input**: Feature specification from `/specs/006-gsc-indexing-seo-fix/spec.md`

## Summary

Resolve Google Search Console indexing issues ("Alternate page with proper canonical tag", "Page with redirect", "Discovered - currently not indexed") on `glendaferreira.com` by aligning canonical URL generation, rendering bidirectional multilingual `hreflang` annotations, updating `@astrojs/sitemap` configuration, and eliminating duplicate non-canonical routes.

## Technical Context

**Language/Version**: TypeScript 5 / Astro 5 (Static Site Generation)

**Primary Dependencies**: Astro 5, `@astrojs/sitemap`

**Storage**: N/A (Static HTML pre-rendering)

**Testing**: Local SSG build (`npm run build`), HTML parsing/inspection scripts for canonical & hreflang tags

**Target Platform**: Cloudflare Pages / Web Hosting (`https://glendaferreira.com`)

**Project Type**: Static Site / Multilingual Web Application

**Performance Goals**: 0 build errors; 100% canonical and hreflang tag alignment across all generated HTML pages

**Constraints**: Astro 5 SSG pre-rendering, Strict TypeScript, Zero breaking changes to existing i18n content routes

**Scale/Scope**: 5 primary pages in 2 languages (`en`, `es`) + root homepage `/`

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- **Principle I (Code Quality & Architecture)**: Pass - Fully typed TypeScript props for `Meta.astro` and clean configuration in `astro.config.mjs`.
- **Principle II (Testing Standards & Quality Gates)**: Pass - Validated via `npm run build` and automated HTML string/tag assertions in build outputs.
- **Principle III (UX & i18n Parity)**: Pass - Full 100% bidirectional `hreflang` parity (`en`, `es`, `x-default`) for all localized pages.
- **Principle IV (Performance & Core Web Vitals)**: Pass - Pre-rendered SSG static HTML, zero client JS overhead for SEO meta tags.

## Project Structure

### Documentation (this feature)

```text
specs/006-gsc-indexing-seo-fix/
├── plan.md              # This file
├── research.md          # Phase 0 research decisions
├── data-model.md        # Phase 1 schema & mapping entity
├── quickstart.md        # Phase 1 validation steps
└── spec.md              # Feature specification
```

### Source Code

```text
astro.config.mjs                           # Sitemap integration configuration
src/
├── components/
│   └── Global/
│       └── Meta.astro                     # Canonical & hreflang meta tag rendering
├── layouts/
│   └── BaseLayout.astro                   # Layout passing Astro context to Meta
└── pages/
    ├── [...slug].astro                    # Route paths & canonical route generation
    └── index.astro                        # Root homepage SEO metadata
```

**Structure Decision**: Single project layout using standard Astro 5 directory conventions.

## Complexity Tracking

| Violation | Why Needed | Simpler Alternative Rejected Because |
|---|---|---|
| None | N/A | N/A |
