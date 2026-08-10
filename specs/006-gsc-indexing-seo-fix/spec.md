# Feature Specification: Google Search Console Indexing & Canonical SEO Fix

**Feature Branch**: `006-gsc-indexing-seo-fix`

**Created**: 2026-08-09

**Status**: Draft

**Input**: User description: "I need to solve these google console issues the domain is glendaferreira.com"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Self-Referencing & Consistent Canonical Tag Generation (Priority: P1)

As a search engine crawler (Googlebot), I want every indexable page on `glendaferreira.com` to present a single, self-consistent canonical URL that matches the exact primary URL structure of the site, so that duplicate URL variants (such as `/en/videos` vs `/videos`) do not get flagged as "Alternate page with proper canonical tag" or rejected from indexing.

**Why this priority**: Eliminating canonical mismatches prevents Google Search Console indexing errors and ensures search engines index the primary intended pages.

**Independent Test**: Fetch `<link rel="canonical">` on `/`, `/videos`, `/contact`, `/privacy-policy`, `/terms-of-service`, `/es/`, `/es/videos`, `/es/contact`, `/es/privacy-policy`, `/es/terms-of-service`.
- Verify each page's canonical URL points directly to itself (or to the primary canonical clean URL) without cross-pointing between `/en/path` and `/path`.

**Acceptance Scenarios**:
1. **Given** a crawler visiting `https://glendaferreira.com/videos/`, **When** inspecting `<head>`, **Then** `<link rel="canonical" href="https://glendaferreira.com/videos/" />` (or without trailing slash, consistent across site) is returned.
2. **Given** a crawler visiting `https://glendaferreira.com/es/videos/`, **When** inspecting `<head>`, **Then** `<link rel="canonical" href="https://glendaferreira.com/es/videos/" />` is returned.
3. **Given** a crawler visiting `https://glendaferreira.com/`, **When** inspecting `<head>`, **Then** `<link rel="canonical" href="https://glendaferreira.com/" />` is returned.

---

### User Story 2 - Complete Multilingual `hreflang` Annotations (Priority: P1)

As a search engine crawler indexing multilingual pages in English and Spanish, I want explicit `rel="alternate" hreflang` annotations on all pages, so that Google accurately associates localized page pairs (`/videos` and `/es/videos`) and targets the appropriate audience in search results without marking localized variants as duplicate or unindexed content.

**Why this priority**: Without `hreflang` tags, search engines misinterpret localized page variants as duplicate content rather than language alternatives.

**Independent Test**: Inspect `<head>` elements on both English and Spanish page pairs.
- Verify presence of `hreflang="en"`, `hreflang="es"`, and `hreflang="x-default"` links pointing to correct absolute URLs.

**Acceptance Scenarios**:
1. **Given** any English page (e.g., `https://glendaferreira.com/videos/`), **When** inspecting page head tags, **Then** it includes:
   - `<link rel="alternate" hreflang="en" href="https://glendaferreira.com/videos/" />`
   - `<link rel="alternate" hreflang="es" href="https://glendaferreira.com/es/videos/" />`
   - `<link rel="alternate" hreflang="x-default" href="https://glendaferreira.com/videos/" />`
2. **Given** any Spanish page (e.g., `https://glendaferreira.com/es/videos/`), **When** inspecting page head tags, **Then** it includes matching reciprocal `hreflang` annotations.

---

### User Story 3 - XML Sitemap Alignment with Primary Canonical URLs (Priority: P1)

As a search engine crawler reading `sitemap-0.xml`, I want the sitemap to list 100% valid, primary canonical URLs (including root `/`, clean English paths, and `/es/` localized paths), so that Googlebot does not discover unindexed, redirected, or non-canonical URL entries.

**Why this priority**: Discrepancies between sitemap entries and canonical tags cause "Discovered - currently not indexed" and "Page with redirect" errors in Google Search Console.

**Independent Test**: Generate sitemap (`npm run build`) and inspect `dist/sitemap-0.xml`.
- Verify root `/` and clean paths (`/videos`, `/contact`, etc.) are present.
- Verify non-canonical duplicate routes (like `/en/videos`) are excluded from sitemap.

**Acceptance Scenarios**:
1. **Given** the generated `sitemap-0.xml`, **When** parsed, **Then** `https://glendaferreira.com/` is included as the primary root homepage entry.
2. **Given** the generated `sitemap-0.xml`, **When** parsed, **Then** all entries match 1-to-1 with canonical page URLs.

---

### User Story 4 - Clean URL Structure & Redirection Hygiene (Priority: P2)

As a site visitor or crawler accessing legacy or duplicate `/en/path` URLs, I want requests to respond consistently with clear canonical signaling or clean 301 redirects to primary routes without multi-hop redirect chains, so that Google Search Console reports 0 "Page with redirect" errors for valid pages.

**Why this priority**: Clean URL routing eliminates unnecessary redirects and ensures crawlers index pages efficiently.

**Independent Test**: Verify URL routing and build outputs for all site routes.

**Acceptance Scenarios**:
1. **Given** requests to localized and root pages, **When** accessed, **Then** responses serve direct valid HTML or clean canonical links without redirect loops.

---

### Edge Cases

- What happens when a localized page exists only in English (or Spanish)? Fallback defaults to `x-default` (English primary URL).
- How does system handle root `/` vs `/en` vs `/es`? Root `/` is the primary English homepage; `/es` is Spanish homepage; `/en` canonicalizes or redirects to `/`.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: Meta component (`src/components/Global/Meta.astro`) MUST generate exact self-referencing canonical URLs for all primary routes, avoiding stripped or mismatched paths.
- **FR-002**: Meta component MUST render bidirectional `<link rel="alternate" hreflang="...">` tags for `en`, `es`, and `x-default` across all pages.
- **FR-003**: Astro configuration (`astro.config.mjs`) sitemap filter MUST include the root URL (`/`), clean primary English routes (`/videos`, `/contact`, etc.), and Spanish routes (`/es/`, `/es/videos`, etc.), while filtering out non-canonical route duplicates.
- **FR-004**: Route generation (`src/pages/[...slug].astro`) MUST establish consistent primary URL paths for default locale pages without producing conflicting duplicate canonical declarations.
- **FR-005**: All sitemap URLs, canonical link hrefs, and hreflang hrefs MUST use the production origin `https://glendaferreira.com`.

### Key Entities

- **Meta Tags Data**: Primary URL, language locale, canonical URL, and localized alternate links array generated during build.
- **Sitemap XML Index**: Production XML file containing canonical page URLs and localized alternate mappings.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 100% of pages in `sitemap-0.xml` match their respective `<link rel="canonical">` hrefs exactly.
- **SC-002**: 100% of HTML pages output valid `<link rel="alternate" hreflang="...">` tags for `en`, `es`, and `x-default`.
- **SC-003**: `npm run build` completes with 0 errors, generating a clean sitemap and pre-rendered HTML pages.
- **SC-004**: Google Search Console canonical and sitemap validation tests report 0 canonical mismatch or sitemap exclusion errors.

## Assumptions

- Domain `glendaferreira.com` is hosted on Cloudflare Pages / Static Hosting.
- English (`en`) is the default fallback locale for `x-default`.
- Root `/` serves as the primary English homepage URL.
