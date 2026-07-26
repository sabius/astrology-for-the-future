---
description: "Task list for sitemap generator implementation"
---

# Tasks: Sitemap Generator

**Input**: Design documents from `/specs/001-sitemap-generator/`

**Prerequisites**: [plan.md](file:///d:/Projects/astrology-for-the-future/specs/001-sitemap-generator/plan.md), [spec.md](file:///d:/Projects/astrology-for-the-future/specs/001-sitemap-generator/spec.md), [research.md](file:///d:/Projects/astrology-for-the-future/specs/001-sitemap-generator/research.md), [data-model.md](file:///d:/Projects/astrology-for-the-future/specs/001-sitemap-generator/data-model.md), [contracts/sitemap-schema.md](file:///d:/Projects/astrology-for-the-future/specs/001-sitemap-generator/contracts/sitemap-schema.md), [quickstart.md](file:///d:/Projects/astrology-for-the-future/specs/001-sitemap-generator/quickstart.md)

**Tests**: Build verification and static XML output validation tasks are included per project quality standards.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2)
- Includes exact file paths in descriptions

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project dependency installation and initialization

- [x] T001 Install @astrojs/sitemap dependency in package.json

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Verify canonical site configuration required before sitemap generation

- [x] T002 Verify canonical site origin URL configuration in astro.config.mjs

---

## Phase 3: User Story 1 - Search Engine Site Indexing & Multilingual i18n (Priority: P1) 🎯 MVP

**Goal**: Generate standard XML sitemap at build time containing canonical page URLs and `xhtml:link` `hreflang` alternate cross-references for English and Spanish pages.

**Independent Test**: Execute `npm run build` and inspect `dist/sitemap-0.xml` to verify XML valid syntax, canonical URLs, and `hreflang` alternate tags.

### Implementation for User Story 1

- [x] T003 [P] [US1] Import and configure @astrojs/sitemap integration in astro.config.mjs
- [x] T004 [US1] Configure i18n locale mapping (defaultLocale: "en", locales: { en: "en", es: "es" }) in astro.config.mjs
- [x] T005 [US1] Verify multilingual URL generation and hreflang tags by executing npm run build

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently.

---

## Phase 4: User Story 2 - Automated Build-Time Sitemap Maintenance & Route Exclusion (Priority: P2)

**Goal**: Automatically filter out internal redirects (root redirect) and non-indexable routes (such as 404 pages) from the generated sitemap output.

**Independent Test**: Execute `npm run build` and confirm that excluded routes do not appear in `dist/sitemap-0.xml`.

### Implementation for User Story 2

- [x] T006 [P] [US2] Implement sitemap filter function to exclude root redirects and 404 error routes in astro.config.mjs
- [x] T007 [US2] Validate route exclusion and sitemap generation integrity across production build execution

**Checkpoint**: User Stories 1 and 2 are fully integrated and verified.

---

## Phase 5: Polish & Cross-Cutting Concerns

**Purpose**: Final validation and documentation checks

- [x] T008 [P] Execute quickstart.md verification procedure and validate XML schema compliance

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - install `@astrojs/sitemap` package.
- **Foundational (Phase 2)**: Depends on Setup phase.
- **User Story 1 (Phase 3)**: Depends on Foundational phase.
- **User Story 2 (Phase 4)**: Depends on User Story 1 phase.
- **Polish (Phase 5)**: Depends on all user stories completion.

### Parallel Opportunities

- T003 (`@astrojs/sitemap` import/config) can run in parallel after T001/T002.
- T006 (route exclusion filter) can be prepared alongside T004/T005.

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1 & 2 (Install package, verify `site` key).
2. Complete Phase 3 (Add `sitemap()` integration with `i18n` mapping in `astro.config.mjs`).
3. Run `npm run build` and verify `dist/sitemap-0.xml`.

### Full Feature Delivery

1. Add route exclusion filtering (Phase 4).
2. Run end-to-end validation with `quickstart.md` (Phase 5).
