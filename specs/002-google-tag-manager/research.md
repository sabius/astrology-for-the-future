# Research & Technology Decisions: Google Tag Manager Integration

## Research Summary

This document details the architectural decisions and technical choices for integrating Google Tag Manager / Google Tag tracking into the Astro 5 static site generation (SSG) project.

---

### Decision 1: Tracking Component Architecture

- **Decision**: Create a dedicated, reusable Astro component `src/components/Analytics/GoogleTagManager.astro` and include it within `src/layouts/BaseLayout.astro` (and `src/layouts/DocsLayout.astro`).
- **Rationale**: 
  - Keeps analytics script injection isolated, testable, and reusable across all page layouts.
  - Ensures 100% coverage across all multilingual pages (`/` and `/es/`).
  - Astro layout integration allows the script to be placed directly in the `<head>` element for accurate pageview and initial load event capture without inline runtime errors.
- **Alternatives Considered**:
  - *Direct hardcoding in `BaseLayout.astro`*: Rejected because it reduces component modularity and makes conditional environment loading or unit testing harder.
  - *Third-party Astro integration packages (`astro-google-tag-manager` or `@astrolib/seo`)*: Rejected to avoid unnecessary third-party package dependencies and potential version mismatch with Astro 5, keeping the implementation lightweight and framework-native.

---

### Decision 2: Google Tag Snippet Format & Tag ID Support

- **Decision**: Support Google Tag (`gtag.js`) loading targeting ID `G-ERLJ63MV2B` as default, while allowing `PUBLIC_GTM_ID` environment variable overrides via Astro's `import.meta.env`.
- **Rationale**:
  - The ID `G-ERLJ63MV2B` follows the Google Analytics 4 / Google Tag measurement format.
  - Asynchronous loading via `<script async src="...">` guarantees that page rendering is non-blocking, preserving Core Web Vitals targets (LCP < 2.5s, CLS < 0.1, INP < 200ms).
  - Environment variable fallback (`import.meta.env.PUBLIC_GTM_ID || 'G-ERLJ63MV2B'`) allows staging vs. production tag differentiation if required in the future without code changes.
- **Alternatives Considered**:
  - *Synchronous script loading*: Rejected because render-blocking script execution violates Principle IV (Core Web Vitals).
  - *Client-side dynamic script injection via JS framework button handlers*: Rejected because initial page views would miss early visitor traffic before hydration.

---

### Decision 3: Error Isolation & Ad-Blocker Handling

- **Decision**: Ensure global `window.dataLayer` initialization occurs safely with defensive null/undefined checks, preventing runtime crashes if third-party tracking URLs are blocked by browser extensions or ad blockers.
- **Rationale**:
  - Browser privacy features and ad blockers frequently block network requests to `googletagmanager.com`.
  - Defensive initialization (`window.dataLayer = window.dataLayer || [];`) ensures no unhandled JavaScript exceptions are thrown on visitor devices, fulfilling FR-005 and SC-003.
- **Alternatives Considered**:
  - *Unchecked global scope access*: Rejected due to potential runtime crashes under strict browser privacy modes.

---

### Decision 4: Testing & Verification Strategy

- **Decision**: Validate implementation via automated Astro SSG build check (`npm run build`), HTML output inspection for tag injection, and browser verification of `dataLayer` payload initialization.
- **Rationale**:
  - Fulfills Principle II (Zero Regression Quality Gate).
  - Guarantees pre-rendered HTML contains valid `<script>` tags across all language routes.
- **Alternatives Considered**:
  - *Manual browser-only testing*: Rejected because automated static HTML output checks provide instant regression prevention during CI/CD builds.
