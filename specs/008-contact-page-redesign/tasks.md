# Tasks: Contact Page Audit & Structure Redesign

**Input**: Design documents from `/specs/008-contact-page-redesign/`

**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Explicit file paths included in all task descriptions

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Verify asset infrastructure for brand icons

- [X] T001 Verify brand assets `email-icon.png` and `whatsapp-icon.png` exist in `public/img/`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Schema and component capabilities required before updating content pages

**⚠️ CRITICAL**: Must complete before updating contact pages

- [X] T002 Update `featureGridBlock` Zod schema in `src/content/config.ts` to support `icon_image` and `copy_text`
- [X] T003 Update `FeatureGrid.astro` in `src/components/Sections/FeatureGrid.astro` to render `icon_image` with proper alt text, responsive sizing, and hover effects

**Checkpoint**: Foundational component and schema ready - content updates can begin

---

## Phase 3: User Story 1 - Multi-Channel Contact & Booking Options (Priority: P1) 🎯 MVP

**Goal**: Present visually distinct contact channels (Email, WhatsApp, Global Reach) using custom brand PNG icons and direct CTAs.

**Independent Test**: Visit `/contact` (EN) and `/es/contact` (ES), confirm `public/img/email-icon.png` and `public/img/whatsapp-icon.png` display cleanly with interactive links.

- [X] T004 [P] [US1] Update English contact channels frontmatter in `src/content/pages/en/contact.md` with `icon_image` paths (`/img/email-icon.png`, `/img/whatsapp-icon.png`), mailto link, and pre-filled WhatsApp link
- [X] T005 [P] [US1] Update Spanish contact channels frontmatter in `src/content/pages/es/contact.md` with `icon_image` paths, mailto link, and Spanish pre-filled WhatsApp link
- [X] T006 [US1] Validate contact grid rendering and link functionality on `/contact` and `/es/contact` in browser

**Checkpoint**: User Story 1 MVP fully functional and independently testable

---

## Phase 4: User Story 2 - Clear Session & Gift Card Information Hierarchy (Priority: P2)

**Goal**: Structure Online Zoom Sessions details and Gift Card offerings clearly to eliminate pre-booking friction.

**Independent Test**: Scroll through `/contact` and `/es/contact`, verify Online Sessions and Gift Card sections display with complete list items and imagery.

- [X] T007 [P] [US2] Refactor Online Sessions section and Gift Card frontmatter in `src/content/pages/en/contact.md`
- [X] T008 [P] [US2] Refactor Online Sessions section and Gift Card frontmatter in `src/content/pages/es/contact.md` maintaining 100% i18n parity
- [X] T009 [US2] Validate layout hierarchy and Gift Card image rendering across mobile and desktop viewport sizes

**Checkpoint**: User Stories 1 and 2 working seamlessly together

---

## Phase 5: User Story 3 - Interactive Copy-to-Clipboard & Fallback Contact Actions (Priority: P2)

**Goal**: Allow visitors without a default desktop mail client to copy `astrologyforthefuture@gmail.com` with one click.

**Independent Test**: Click Copy Email action on `/contact`, verify email address copies to system clipboard with a "Copied!" badge.

- [X] T010 [P] [US3] Implement quick copy-to-clipboard action handler or Lit web component in `src/components/UI/Button.astro` or `src/components/Lit/CopyButton.ts`
- [X] T011 [US3] Connect copy action to email CTA in `src/content/pages/en/contact.md` and `src/content/pages/es/contact.md` and verify clipboard copy functionality

**Checkpoint**: All user stories complete and independently testable

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Quality control, build validation, and final verification

- [X] T012 [P] Execute `npm run build` via Git Bash to verify static site compilation with 0 errors or warnings
- [X] T013 Perform full end-to-end validation according to `specs/008-contact-page-redesign/quickstart.md`

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: Can start immediately
- **Foundational (Phase 2)**: Depends on Phase 1 completion - BLOCKS all content tasks
- **User Story 1 (Phase 3)**: Depends on Phase 2 completion (MVP Scope)
- **User Story 2 (Phase 4)**: Depends on Phase 2 completion
- **User Story 3 (Phase 5)**: Depends on Phase 2 & 3 completion
- **Polish (Phase 6)**: Depends on all user stories completion

### Parallel Opportunities

- T004 (EN contact page) and T005 (ES contact page) can be developed in parallel [P]
- T007 (EN session/gift card) and T008 (ES session/gift card) can be developed in parallel [P]
- T010 (Copy button component) can be built in parallel with content refactoring [P]

---

## Implementation Strategy

### MVP First (User Story 1 Only)
1. Complete Setup (Phase 1) & Foundational (Phase 2)
2. Complete User Story 1 (Phase 3: T004, T005, T006)
3. **STOP and VALIDATE**: Confirm brand icons and CTAs work in browser

### Full Feature Delivery
1. Add User Story 2 (Phase 4: T007, T008, T009)
2. Add User Story 3 (Phase 5: T010, T011)
3. Run Phase 6 build and quickstart validation
