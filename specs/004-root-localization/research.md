# Research & Architectural Decisions: Root Domain Localization

## Topic: Serving Multilingual Content at Root `/` without URL Redirection in Astro SSG

### Problem Statement
Currently, `src/pages/index.astro` acts as a pure redirect gateway: it checks `navigator.language` in client JS and immediately executes `window.location.replace('/es' | '/en')` or `<meta http-equiv="refresh" content="0; url=/en">`.
This forces the root URL `https://domain.com/` to always change to `https://domain.com/en` or `https://domain.com/es`.

### Research Findings & Technology Evaluation

| Strategy | URL Behavior | SEO & Static HTML | Local Dev Compatibility | Complexity |
|---|---|---|---|---|
| **1. Hybrid SSG Dual-Locale Pre-render + Inline Client Switcher** | Stays `/` | Full static HTML for default locale + clean DOM adaptation for detected browser locale | 100% standard Astro SSG | Low / Moderate |
| **2. Cloudflare Edge Rewrite Function (`_middleware.ts`)** | Stays `/` | Serves static ES/EN HTML depending on `Accept-Language` | Requires Cloudflare Functions environment | High |
| **3. Client-Side Hard Redirect (`window.location.replace`) [CURRENT]** | Changes to `/en` or `/es` | Redirects crawler / user | Standard | Low (Current Flawed Setup) |

### Decision
Adopt **Strategy 1: Hybrid SSG Pre-render with Client Browser Language Detection & Local Preference Persistence**.

### Rationale
1. **Zero Redirects**: Visiting `/` returns `200 OK` directly without forcing a location change to `/en` or `/es`.
2. **Instant Browser Language Detection**: On `/`, an inline blocking `<script>` checks `localStorage.getItem('lang_preference')` followed by `(navigator.language || 'en').toLowerCase()`. If Spanish (`es*`) is detected, it immediately activates the Spanish view and sets `<html lang="es">`.
3. **Pure SSG**: Keeps build process 100% static (`output: 'static'`) without requiring SSR runtime or edge worker adapters.
4. **Direct Route Parity**: Direct accesses to `/en`, `/es`, `/en/videos`, `/es/videos`, etc. continue to work seamlessly via Astro static route handling.

### Detailed Architecture

1. **`src/pages/index.astro`**:
   - Fetches both `en/index.md` and `es/index.md` content collections at build time.
   - Pre-renders the page sections with language containers or client-swappable data scopes (`data-lang="en"` and `data-lang="es"`).
   - Includes an inline `<script is:inline>` in `<head>` that runs before DOM paint to detect `navigator.language` / `localStorage` and set active locale class/attributes, preventing any layout shift or visual flash (FOUC).

2. **Language Preference Persistence**:
   - When a user selects a language in the header/navigation component, store the selection in `localStorage.setItem('user_lang', locale)`.
   - On subsequent visits to `/`, `localStorage` overrides `navigator.language`.

3. **Navigation Links (`src/components/Global/Navigation.astro`)**:
   - Header navigation links on `/` link to localized paths (`/es/*` or `/en/*`) when on explicit locale pages, or maintain locale context smoothly.
