# Tasks: Google Tag Manager Integration

**Input**: Design documents from `/specs/002-google-tag-manager/`

**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- File paths are explicitly specified in every task description

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Infrastructure setup for analytics components

- [x] T001 [P] Create analytics component directory `src/components/Analytics/`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core tag component contract and configuration structure

- [x] T002 Implement base Tag Manager Astro component in `src/components/Analytics/GoogleTagManager.astro` per contract in `specs/002-google-tag-manager/contracts/component-contract.md`

---

## Phase 3: User Story 1 - Automatic Site Analytics & Tag Ingestion (Priority: P1) 🎯 MVP

**Goal**: Load the Tag Manager tracking container with ID `G-ERLJ63MV2B` on all public site pages and multilingual routes.

**Independent Test**: Build site using `npm run build` and inspect `dist/index.html` and `dist/es/index.html` to confirm `G-ERLJ63MV2B` script tags are present in page `<head>`.

### Implementation for User Story 1

- [x] T003 [P] [US1] Import and embed `GoogleTagManager.astro` into `<head>` in `src/layouts/BaseLayout.astro`
- [x] T004 [P] [US1] Import and embed `GoogleTagManager.astro` into `<head>` in `src/layouts/DocsLayout.astro`
- [x] T005 [US1] Verify static script injection across English and Spanish page layouts in `src/layouts/BaseLayout.astro` and `src/layouts/DocsLayout.astro`

**Checkpoint**: At this point, User Story 1 is fully functional and delivers tag loading across all site pages.

---

## Phase 4: User Story 2 - Configurable Tag Container Identification (Priority: P2)

**Goal**: Allow central configuration of container ID via `PUBLIC_GTM_ID` environment variable with fallback to `G-ERLJ63MV2B`.

**Independent Test**: Test component with explicit `id` prop and environment variable fallback to ensure ID parameter correctly updates in output script tags.

### Implementation for User Story 2

- [x] T006 [US2] Update `src/components/Analytics/GoogleTagManager.astro` to support `PUBLIC_GTM_ID` environment variable via `import.meta.env` with fallback default ID `'G-ERLJ63MV2B'`
- [x] T007 [US2] Add defensive conditional check in `src/components/Analytics/GoogleTagManager.astro` to skip script rendering if container ID is empty or undefined

**Checkpoint**: User Story 2 complete - Container ID is configurable and safe against missing parameters.

---

## Phase 5: User Story 3 - Core Web Vitals & Performance Preservation (Priority: P3)

**Goal**: Ensure scripts load asynchronously (`async`) and fail silently under ad-blockers without blocking page rendering.

**Independent Test**: Verify `async` attribute is set on script tag and `window.dataLayer = window.dataLayer || []` initializes without throwing errors.

### Implementation for User Story 3

- [x] T008 [US3] Ensure `async` script loading and inline `is:inline` `dataLayer` initialization in `src/components/Analytics/GoogleTagManager.astro` preserve non-blocking Core Web Vitals targets

**Checkpoint**: User Story 3 complete - Performance and error isolation verified.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Validation and build verification

- [x] T009 Execute production SSG build (`npm run build`) and run HTML script presence checks per `specs/002-google-tag-manager/quickstart.md`

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Phase 1 - BLOCKS all user stories
- **User Story 1 (Phase 3)**: Depends on Phase 2
- **User Story 2 (Phase 4)**: Depends on Phase 3
- **User Story 3 (Phase 5)**: Depends on Phase 3
- **Polish (Phase 6)**: Depends on all implementation tasks being complete

### Parallel Opportunities

- `T003` and `T004` (in User Story 1) edit different layout files (`BaseLayout.astro` vs `DocsLayout.astro`) and can be implemented in parallel once `GoogleTagManager.astro` exists.

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1 & Phase 2 (`src/components/Analytics/GoogleTagManager.astro`)
2. Complete Phase 3 (`BaseLayout.astro` & `DocsLayout.astro` integration)
3. Validate MVP with `npm run build`
