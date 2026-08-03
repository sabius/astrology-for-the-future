# Tasks: Root Domain Localization & Browser Language Detection

**Input**: Design documents from `/specs/004-root-localization/`

**Prerequisites**: plan.md (required), spec.md (required), research.md, data-model.md, quickstart.md

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Explicit file paths included in descriptions

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and design artifact verification

- [X] T001 Verify feature specification and design artifacts in `specs/004-root-localization/`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core helper utilities required before implementing root localization

- [X] T002 Update locale detection and helper utilities in `src/i18n/index.ts` to support browser language detection and stored user preference fallback

---

## Phase 3: User Story 1 - Root Path Pure URL (No Redirect) Experience (Priority: P1) 🎯 MVP

**Goal**: Accessing `/` loads the homepage directly at the root URL without issuing HTTP or client-side JavaScript redirects to `/en` or `/es`.

**Independent Test**: Request `http://localhost:4321/` and verify status `200 OK` with full homepage HTML and URL remaining `/`.

### Implementation for User Story 1

- [X] T003 [US1] Remove client-side JS redirect (`window.location.replace`) and `<meta http-equiv="refresh">` redirect tag from `src/pages/index.astro`
- [X] T004 [US1] Update `src/pages/index.astro` to fetch and pre-render content collection entries for both English and Spanish in static HTML

**Checkpoint**: Visiting `/` renders homepage HTML directly without changing the browser URL.

---

## Phase 4: User Story 2 - Browser Language Detection at Root (Priority: P1)

**Goal**: Automatically present Spanish content for visitors with Spanish browser settings (`navigator.language`) or stored Spanish preference, and English for all others, without changing the URL.

**Independent Test**: Emulate `navigator.language = 'es-CO'` vs `en-US` in browser DevTools and verify matching language content displays at `/`.

### Implementation for User Story 2

- [X] T005 [US2] Implement synchronous inline `<head>` detection script in `src/pages/index.astro` to detect `navigator.language` / `localStorage` preference and toggle active language view before paint
- [X] T006 [US2] Update `src/components/Global/Header.astro` and `src/components/Global/Navigation.astro` to save explicit language selection to `localStorage`

**Checkpoint**: Root page dynamically adapts to browser language / stored preference seamlessly with zero visual flash.

---

## Phase 5: User Story 3 - Direct Localized URL Access (Priority: P1)

**Goal**: Direct links to `/en`, `/es`, `/en/*`, and `/es/*` serve content directly in the specified language without redirecting to `/`.

**Independent Test**: Navigate directly to `/en` and `/es` and verify explicit language pages load cleanly.

### Implementation for User Story 3

- [X] T007 [US3] Verify static path generation in `src/pages/[...slug].astro` for direct `/en`, `/es`, `/en/*`, and `/es/*` routes
- [X] T008 [US3] Update navigation link generator in `src/components/Global/Navigation.astro` to preserve locale context on both root `/` and explicit localized routes

**Checkpoint**: All direct localized paths remain fully accessible and functional.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Verification and build quality gates

- [X] T009 [P] Run production build verification (`npm run build`) via Git Bash to confirm zero compiler errors or SSG warnings
- [X] T010 Execute end-to-end quickstart validation per `specs/004-root-localization/quickstart.md`

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: Can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion
- **User Story 1 (Phase 3)**: Depends on Foundational phase (T002)
- **User Story 2 (Phase 4)**: Depends on User Story 1 (T003, T004)
- **User Story 3 (Phase 5)**: Can proceed after Foundational phase (T002)
- **Polish (Phase 6)**: Depends on completion of User Stories 1, 2, and 3

### Parallel Opportunities

- T009 can run in parallel with final manual quickstart verification T010.

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete T001 (Setup) and T002 (Foundational).
2. Complete T003 and T004 (User Story 1 - No Redirects on `/`).
3. Validate that `/` loads static HTML with 0 redirects.

### Incremental Delivery

1. Add User Story 2 (T005, T006) for client browser language detection & persistence.
2. Add User Story 3 (T007, T008) for navigation link and direct path polish.
3. Run `npm run build` (T009) and validation (T010).
