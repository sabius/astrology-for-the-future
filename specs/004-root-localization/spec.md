# Feature Specification: Root Domain Localization & Browser Language Detection

**Feature Branch**: `004-root-localization`
**Created**: 2026-08-03
**Status**: Draft
**Input**: User request: "We need to improve the way localization works. The default path gets automatically redirected to the /en site. We need to improve this so users don't get redirected and instead stay in the root domain in their language. However, if they go directly to the localized page, they will be able to see it as well. Also, it would be proper to see the user's browser language to know what language to present to them."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Root Path Pure URL (No Redirect) Experience (Priority: P1)

As a visitor accessing the root domain (`/`), I want to view the site directly at the root URL (`/`) without being forcibly redirected (via HTTP refresh or `window.location.replace`) to `/en` or `/es`, so that the URL remains clean and user-friendly.

**Why this priority**: Eliminating automatic URL redirection at root improves UX, prevents browser history pollution, and complies with modern web standards.

**Independent Test**: Request `GET /` in the browser or via `curl -I`.
- Verify HTTP response status is `200 OK` (not `301`, `302`, or `<meta http-equiv="refresh">` redirect to `/en`).
- Verify the URL bar remains `/`.

**Acceptance Scenarios**:
1. **Given** a user visiting `https://domain.com/`, **When** the page loads, **Then** the URL remains `https://domain.com/` without redirecting to `/en` or `/es`.
2. **Given** a web crawler (Googlebot) visiting `/`, **When** parsing the response, **Then** it receives valid full HTML content for the homepage with status `200 OK`.

---

### User Story 2 - Browser Language Detection at Root (Priority: P1)

As a multilingual visitor accessing `/`, I want the root page content to automatically adapt to my browser's preferred language (e.g., Spanish for `es-*`, English for `en-*` or others), so that I immediately see content in a language I understand.

**Why this priority**: Automatic language presentation based on `navigator.language` provides a seamless first impression without requiring manual language switching.

**Independent Test**: Set browser `navigator.language` (or test with header/client storage) to `es-CO` vs `en-US` and load `/`.
- Verify `es-CO` presents Spanish content.
- Verify `en-US` or unrecognized locales present English fallback content.

**Acceptance Scenarios**:
1. **Given** a visitor with browser language set to Spanish (`es`, `es-ES`, `es-CO`), **When** visiting `/`, **Then** the content presented on `/` is in Spanish.
2. **Given** a visitor with browser language set to English (`en-US`, `en-GB`) or any non-Spanish language, **When** visiting `/`, **Then** the content presented on `/` is in English.
3. **Given** a visitor who previously selected a language preference (stored in `localStorage`), **When** returning to `/`, **Then** the stored preference takes precedence over browser default.

---

### User Story 3 - Direct Localized URL Access (Priority: P1)

As a user or external referrer following a specific link (e.g., `/es` or `/en`), I want direct localized URLs to serve content in their specified language without forcing a redirect back to `/`.

**Why this priority**: Direct URLs to `/en`, `/es`, `/en/videos`, `/es/contact`, etc., are essential for deep linking, marketing campaigns, and explicit locale targeting.

**Independent Test**: Navigate directly to `/en` and `/es`.
- `/en` loads English homepage at `/en`.
- `/es` loads Spanish homepage at `/es`.

**Acceptance Scenarios**:
1. **Given** a visitor navigating directly to `/es`, **When** the page loads, **Then** Spanish homepage content renders at URL `/es`.
2. **Given** a visitor navigating directly to `/en`, **When** the page loads, **Then** English homepage content renders at URL `/en`.

---

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: `src/pages/index.astro` MUST NOT issue client-side (`window.location.replace`) or meta refresh (`<meta http-equiv="refresh">`) redirects. It MUST render full HTML homepage content at the root path `/`.
- **FR-002**: Root page (`/`) MUST detect the visitor's browser language via `navigator.language` / `navigator.languages` on the client, and display Spanish or English content accordingly.
- **FR-003**: Direct localized routes (`/en`, `/es`, `/en/*`, `/es/*`) MUST remain fully functional and display content in the specified locale.
- **FR-004**: Navigation links and header components MUST respect the current URL context (root `/` vs explicit `/en` or `/es`) without breaking site navigation.
- **FR-005**: User language selection on root `/` or localized pages MUST persist in client storage (`localStorage`) so subsequent root visits honor the chosen language.

### Key Entities

- **Root Page Component (`src/pages/index.astro`)**: Pre-renders default static HTML for SSG and includes client-side language adaptation logic for `navigator.language` and `localStorage`.
- **Language Detector (`src/i18n/index.ts` / client script)**: Client and build-time helper functions for resolving locale from URL, browser settings, or storage.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 0% of visits to `/` result in an automatic HTTP or JS URL redirect to `/en` or `/es`.
- **SC-002**: 100% of direct requests to `/`, `/en`, and `/es` return `200 OK` with valid HTML.
- **SC-003**: Visitors with Spanish browser settings (`es-*`) see Spanish homepage content at `/` within <50ms of page load.
- **SC-004**: `npm run build` completes with 0 errors and 0 warnings.

## Assumptions

- Astro 5 Static Site Generation (SSG) output is retained.
- For SEO crawlers without JS, root `/` serves static HTML for the default locale (`en`), while client JS handles instant dynamic switching for Spanish visitors.
- Deep links (`/es/videos`, `/en/about`, etc.) retain explicit language paths.
