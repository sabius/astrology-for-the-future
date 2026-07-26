# Feature Specification: Sitemap Generator

**Feature Branch**: `001-sitemap-generator`

**Created**: 2026-07-26

**Status**: Draft

**Input**: User description: "We need to create a sitemap generator"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Search Engine Site Indexing (Priority: P1)

As a search engine crawler (e.g., Googlebot, Bingbot), I want to access a standard XML sitemap at `/sitemap.xml` so that I can discover and index all public pages across all supported languages efficiently.

**Why this priority**: Discoverability and SEO are essential for driving organic traffic to the multilingual site. Without a sitemap, new and localized content pages might take longer to be indexed.

**Independent Test**: Can be verified by fetching `/sitemap.xml` after site build, checking that all published pages in all languages are listed with valid XML syntax, proper canonical URLs, and `lastmod` dates.

**Acceptance Scenarios**:

1. **Given** a published multilingual site with pages in English and Spanish, **When** a search crawler fetches `/sitemap.xml`, **Then** it receives a valid XML document containing entries for every published page URL.
2. **Given** a page that exists in multiple language translations, **When** the crawler inspects the page entry in the sitemap, **Then** it finds valid localized alternate links (`hreflang`) pointing to the corresponding language versions of that page.

---

### User Story 2 - Automated Build-Time Sitemap Maintenance (Priority: P2)

As a site maintainer, I want the sitemap to be automatically generated or updated during the production build process so that new or modified pages are included in the sitemap without manual maintenance.

**Why this priority**: Automatic generation prevents missing pages, stale sitemaps, or broken links as content collections expand over time.

**Independent Test**: Can be verified by adding a new markdown content page to a language directory, running the site build command, and confirming the new page URL appears automatically in `/sitemap.xml`.

**Acceptance Scenarios**:

1. **Given** a newly added content page frontmatter file, **When** the production site build is executed, **Then** the sitemap file is generated containing the exact URL path of the new page.
2. **Given** utility pages (e.g., custom 404 page or unlisted drafts), **When** the sitemap is generated, **Then** these internal or excluded pages are omitted from the XML sitemap output.

---

### Edge Cases

- What happens when a content page frontmatter specifies `draft: true` or `noindex: true`? The sitemap generator MUST exclude it from sitemap output.
- What happens when a page exists in English but does not yet have a Spanish translation? The sitemap MUST include the English page entry without generating invalid `hreflang` self-references or broken links to non-existent translations.
- How does the system handle site root domain canonicalization (e.g. `https://domain.com` vs relative paths)? The generator MUST prepend the configured canonical site origin to produce absolute URLs.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST automatically scan all published content pages and static routes during build time to generate a standard compliant `sitemap.xml`.
- **FR-002**: System MUST include full canonical absolute URLs for all valid published pages across all supported site languages.
- **FR-003**: System MUST attach multilingual cross-references (`xhtml:link` with `rel="alternate"` and matching `hreflang` attributes) for pages that exist in multiple language versions.
- **FR-004**: System MUST include standard metadata for each entry, including last modification date (`lastmod`), change frequency (`changefreq`), and priority score (`priority`) where available.
- **FR-005**: System MUST exclude error pages (e.g. 404 page), draft content, and pages marked for exclusion from indexing.
- **FR-006**: System MUST output valid XML adhering to the official Sitemap Protocol 0.9 schema.

### Key Entities

- **Sitemap Entry**: Represents a single discoverable URL on the site, including its canonical URL, last modified timestamp, priority, change frequency, and associated language alternate links (`hreflang`).
- **Locale Map**: Represents the mapping between canonical route slugs and their corresponding localized language versions (e.g. `/en/about` <-> `/es/about`).

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 100% of non-draft published pages across all supported languages are present in the generated sitemap upon site build completion.
- **SC-002**: Generated sitemap passes 100% of standard W3C / Sitemap Protocol XML schema validation checks without syntax or structural errors.
- **SC-003**: 0% of excluded pages (404 error pages, draft pages) appear in the output sitemap.
- **SC-004**: Search engine crawlers can fetch `/sitemap.xml` with a 200 OK response and correct `application/xml` content type header.

## Assumptions

- The site canonical domain URL is specified in project environment/configuration.
- Language routes follow the project's established i18n structure (`/en/...`, `/es/...`).
- Content page updates alter the file modification date or frontmatter `lastmod` field.
