# Implementation Plan: Dedicated Video Pages & Indexing Optimization

**Branch**: `007-individual-video-pages` | **Date**: 2026-08-09 | **Spec**: [specs/007-individual-video-pages/spec.md](file:///d:/Projects/astrology-for-the-future/specs/007-individual-video-pages/spec.md)

**Input**: Feature specification from `/specs/007-individual-video-pages/spec.md`

## Summary

Optimize video presentation and search engine indexing by creating dedicated watch pages for every video in English (`/videos/<video-slug>/`) and Spanish (`/es/videos/<video-slug>/`), complete with `schema.org/VideoObject` JSON-LD structured data, prominent main-content video players, detailed notes/transcripts, self-referencing canonical links, and reciprocal `hreflang` alternate tags. Simplify main `/videos/` and `/es/videos/` gallery pages into lightweight card grids linking to dedicated watch pages.

## Technical Context

**Language/Version**: TypeScript 5 / Astro 5 (Static Site Generation)

**Primary Dependencies**: Astro 5, `@astrojs/sitemap`, Zod, `marked`, `isomorphic-dompurify`

**Storage**: Markdown/Frontmatter Content Collections (`src/content/pages/` and `src/content/videos/`)

**Testing**: Local SSG build (`npm run build`), HTML parsing/inspection scripts for VideoObject JSON-LD, canonical & hreflang tags

**Target Platform**: Cloudflare Pages / Web Hosting (`https://glendaferreira.com`)

**Project Type**: Static Site / Multilingual Web Application

**Performance Goals**: 0 build errors; >50% improvement in `/videos/` initial page load speed; 100% Google Video Indexing compliance with VideoObject JSON-LD

**Constraints**: Astro 5 SSG pre-rendering, Strict TypeScript, Page Builder Schema compliance

**Scale/Scope**: 6 dedicated video pages per language (`en`, `es`) + main video gallery listing pages

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- **Principle I (Code Quality & Architecture)**: Pass - Zod schemas defined in `src/content/config.ts`, strict TypeScript component props.
- **Principle II (Testing Standards & Quality Gates)**: Pass - Validated via `npm run build` and automated HTML string/tag assertions in build outputs.
- **Principle III (UX & i18n Parity)**: Pass - Complete 100% bilingual parity for English and Spanish dedicated video pages and listing cards.
- **Principle IV (Performance & Core Web Vitals)**: Pass - Pre-rendered SSG static HTML, lazy-loaded video card thumbnails instead of 6 simultaneous YouTube iframe embeds.

## Project Structure

### Documentation (this feature)

```text
specs/007-individual-video-pages/
├── plan.md              # This file
├── research.md          # Phase 0 research decisions
├── data-model.md        # Phase 1 schema & mapping entity
├── quickstart.md        # Phase 1 validation steps
└── spec.md              # Feature specification
```

### Source Code

```text
src/
├── components/
│   ├── Global/
│   │   └── Meta.astro                     # SEO canonical, hreflang, & VideoObject script support
│   └── Sections/
│       └── VideoSection.astro             # Simplified gallery card component
├── content/
│   ├── config.ts                          # Content Collection schemas
│   └── pages/                             # Video pages content entries
│       ├── en/
│       │   ├── videos.md                  # Main gallery page entry
│       │   └── videos/                    # Dedicated video markdown files (EN)
│       └── es/
│           ├── videos.md                  # Main gallery page entry
│           └── videos/                    # Dedicated video markdown files (ES)
└── pages/
    └── [...slug].astro                    # Static route generation for dedicated video pages
```

**Structure Decision**: Single project layout leveraging Astro 5 Content Collections and dynamic SSG route generation in `[...slug].astro`.

## Complexity Tracking

| Violation | Why Needed | Simpler Alternative Rejected Because |
|---|---|---|
| None | N/A | N/A |
