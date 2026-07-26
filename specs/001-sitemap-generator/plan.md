# Implementation Plan: Sitemap Generator

**Branch**: `001-sitemap-generator` | **Date**: 2026-07-26 | **Spec**: [spec.md](file:///d:/Projects/astrology-for-the-future/specs/001-sitemap-generator/spec.md)

**Input**: Feature specification from `/specs/001-sitemap-generator/spec.md`

## Summary

Implement build-time XML sitemap generation for the Astro 5 multilingual site using `@astrojs/sitemap`. The sitemap generator will automatically scan all static routes generated from `src/pages/[...slug].astro`, emit W3C-compliant `sitemap.xml` / `sitemap-index.xml` artifacts into `dist/`, add `xhtml:link` `hreflang` alternate references for localized page variants (`/en/`, `/es/`), and filter out non-indexable routes (such as 404 error pages and redirects).

## Technical Context

**Language/Version**: TypeScript / Node.js (ESM), Astro 5.13+

**Primary Dependencies**: `astro`, `@astrojs/sitemap`

**Storage**: Static XML file outputs in `dist/` (build artifacts)

**Testing**: Build validation (`npm run build`), static file output assertions

**Target Platform**: Static Site Host (Cloudflare Pages)

**Project Type**: Multilingual Web Application (Static Site Generation)

**Performance Goals**: Zero client-side runtime impact (pre-rendered statically); build overhead < 1 second

**Constraints**: Compliant Sitemap Protocol 0.9 XML, valid canonical origins (`https://astrology-for-the-future.pages.dev`), proper `hreflang` cross-references

**Scale/Scope**: Multilingual site pages in `en` and `es` content collections

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

1. **Principle I: Code Quality & Architecture Discipline** - PASSED. Integrating standard `@astrojs/sitemap` in `astro.config.mjs` follows framework conventions cleanly without ad-hoc string regexes.
2. **Principle II: Testing Standards & Quality Gates** - PASSED. Build pipeline step (`npm run build`) validates static XML generation and output integrity.
3. **Principle III: User Experience Consistency & i18n Parity** - PASSED. Configured i18n alternate links (`hreflang`) maintain 100% equivalence between English and Spanish page versions.
4. **Principle IV: Performance Requirements & Core Web Vitals** - PASSED. Pre-rendered at build time with 0 client JS footprint.

## Project Structure

### Documentation (this feature)

```text
specs/001-sitemap-generator/
├── plan.md              # Implementation plan
├── research.md          # Integration & i18n research decisions
├── data-model.md        # Sitemap entry & configuration schema
├── quickstart.md        # Verification and build validation guide
└── contracts/
    └── sitemap-schema.md # XML output contract & schema rules
```

### Source Code Layout

```text
astro.config.mjs         # Add @astrojs/sitemap integration with i18n & filter options
package.json             # Add @astrojs/sitemap dependency
src/
├── pages/
│   ├── [...slug].astro  # Static page generator source
│   └── index.astro      # Root redirect route
└── content/
    └── pages/           # Multilingual page frontmatter content (en, es)
```

## Complexity Tracking

> No constitution violations. Complexity remains minimal using official Astro integration.

| Violation | Why Needed | Simpler Alternative Rejected Because |
|---|---|---|
| None | N/A | N/A |
