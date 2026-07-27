# Tasks: Homepage Focus and SEO Redesign

**Input**: Design documents from `/specs/003-homepage-redesign/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, quickstart.md

## Organization: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `- [x] [ID] [P?] [Story?] Description with file path`
- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Verification of environment and baseline setup before starting feature implementation.

- [x] T001 Verify local dev server and environment using `npm run dev`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure prerequisites

- [x] T002 Confirm Content Collection Zod schemas in `src/content/config.ts` align with page metadata and section block definitions

---

## Phase 3: User Story 1 - Descriptive Homepage Title & Meta Description for SEO (Priority: P1) 🎯 MVP

**Goal**: Ensure search engine crawlers and users see descriptive title tags and meta descriptions clearly positioning Glenda Ferreira's online astrology service.

**Independent Test**: Build HTML output and inspect `<title>` and `<meta name="description">` tags in `dist/es/index.html` and `dist/en/index.html`.

### Implementation for User Story 1

- [x] T003 [P] [US1] Update frontmatter title and description in `src/content/pages/es/index.md`
- [x] T004 [P] [US1] Update frontmatter title and description in `src/content/pages/en/index.md`

**Checkpoint**: At this point, home page `<title>` and `<meta name="description">` are completely updated for both Spanish and English locales.

---

## Phase 4: User Story 2 - Clear Service-Oriented H1 and Hero Messaging (Priority: P1)

**Goal**: Update the primary hero block header and copy to explicitly state the service offered ("Consultas de astrología online con Glenda Ferreira") and ensure responsive typography.

**Independent Test**: Render hero section on 320px to 1920px viewports; verify single H1 tag content and elegant visual presentation.

### Implementation for User Story 2

- [x] T005 [P] [US2] Update primary hero block header and copy frontmatter in `src/content/pages/es/index.md`
- [x] T006 [P] [US2] Update primary hero block header and copy frontmatter in `src/content/pages/en/index.md`
- [x] T007 [US2] Adjust responsive font sizing (`text-3xl sm:text-4xl md:text-5xl lg:text-6xl`) in `src/components/Sections/Hero.astro` to accommodate longer H1 title smoothly on mobile and desktop

**Checkpoint**: Primary H1 and hero copy clearly convey the online astrology service without layout or text wrapping defects.

---

## Phase 5: User Story 3 - Elimination of Duplicate H2 Headings in DOM (Priority: P2)

**Goal**: Refactor `ImageOverlay.astro` so section headline `<h2>` is rendered as a single DOM node styled responsively across viewports.

**Independent Test**: Search DOM output of `dist/es/index.html` to confirm exactly one `<h2>` tag exists for "Navega Tu Vida con Propósito".

### Implementation for User Story 3

- [x] T008 [US3] Refactor `src/components/Sections/ImageOverlay.astro` to eliminate dual mobile/desktop `<h2>` DOM elements

**Checkpoint**: `ImageOverlay` section renders clean, non-duplicated H2 structure for accessibility and SEO.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Build verification and quality gate checks

- [x] T009 Execute static site build (`npm run build`) to ensure zero errors or warnings
- [x] T010 Perform end-to-end verification following `specs/003-homepage-redesign/quickstart.md`

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion
- **User Story 1 (P1)** & **User Story 2 (P1)**: Depend on Foundational phase completion
- **User Story 3 (P2)**: Depends on Foundational phase completion; can be implemented in parallel with US1/US2
- **Polish (Phase 6)**: Depends on completion of all user story tasks

### Parallel Opportunities

- **T003** (`es/index.md` meta) and **T004** (`en/index.md` meta) can run in parallel
- **T005** (`es/index.md` hero) and **T006** (`en/index.md` hero) can run in parallel
- **User Story 1**, **User Story 2**, and **User Story 3** edit distinct sections/files and can proceed concurrently

---

## Implementation Strategy

### MVP First (User Story 1 & User Story 2)
1. Complete Setup and Foundational check (T001-T002)
2. Update metadata (T003-T004) and Hero messaging (T005-T007)
3. Fix ImageOverlay duplicate H2 bug (T008)
4. Execute `npm run build` and validate generated HTML output against quickstart guide (T009-T010)
