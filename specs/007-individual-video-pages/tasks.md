# Tasks: Dedicated Video Pages & Indexing Optimization

**Feature Branch**: `007-individual-video-pages`
**Spec**: [spec.md](file:///d:/Projects/astrology-for-the-future/specs/007-individual-video-pages/spec.md)
**Plan**: [plan.md](file:///d:/Projects/astrology-for-the-future/specs/007-individual-video-pages/plan.md)

## Tasks

### Phase 1: Schema & Meta Component Setup

- [x] T001 Update Zod content schemas in `src/content/config.ts` and add `VideoObject` JSON-LD support to `src/components/Global/Meta.astro`

### Phase 2: Component & Section Refactoring

- [x] T002 Refactor `src/components/Sections/VideoSection.astro` to render lightweight video preview cards linking to dedicated watch pages
- [x] T003 [P] Create `src/components/Sections/VideoDetail.astro` for single video watch pages featuring a prominent YouTube embed player and formatted notes
- [x] T004 Register new components in `src/components/componentMap.ts`

### Phase 3: Content Creation & Page Entries (User Stories 1 & 2)

- [x] T005 [US1] [US2] Update `src/content/pages/en/videos.md` and `src/content/pages/es/videos.md` main gallery entries
- [x] T006 [US1] Create 6 dedicated English video markdown files in `src/content/pages/en/videos/`
- [x] T007 [US1] Create 6 dedicated Spanish video markdown files in `src/content/pages/es/videos/`

### Phase 4: Build & Verification

- [x] T008 Ensure `src/pages/[...slug].astro` generates static routes for dedicated video subpages
- [x] T009 Execute `npm run build` via Git Bash and verify 0 errors
- [x] T010 Inspect `dist/` HTML files and `dist/sitemap-0.xml` against quickstart validation criteria
