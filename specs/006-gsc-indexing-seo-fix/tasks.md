# Tasks: Google Search Console Indexing & Canonical SEO Fix

**Feature Branch**: `006-gsc-indexing-seo-fix`
**Spec**: [spec.md](file:///d:/Projects/astrology-for-the-future/specs/006-gsc-indexing-seo-fix/spec.md)
**Plan**: [plan.md](file:///d:/Projects/astrology-for-the-future/specs/006-gsc-indexing-seo-fix/plan.md)

## Tasks

### Phase 1: Foundational & Configuration Alignment

- [x] T001 Align `@astrojs/sitemap` integration filter and production origin in `astro.config.mjs`

### Phase 2: Core Implementation (User Stories 1 & 2)

- [x] T002 [US1] [US2] Update `src/components/Global/Meta.astro` to render self-referencing canonical links and bidirectional `hreflang` tags (`en`, `es`, `x-default`)
- [x] T003 [US1] Streamline route generation in `src/pages/[...slug].astro` to ensure clean primary paths for default locale pages
- [x] T004 [US1] Ensure root homepage in `src/pages/index.astro` supplies correct canonical and hreflang metadata

### Phase 3: Build & Verification

- [x] T005 Run static build compilation (`npm run build`) via Git Bash and verify zero errors
- [x] T006 Inspect generated `dist/` HTML files and `dist/sitemap-0.xml` against quickstart validation criteria
