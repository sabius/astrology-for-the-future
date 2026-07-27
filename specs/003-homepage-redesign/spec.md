# Feature Specification: Homepage Focus and SEO Redesign

**Feature Branch**: `003-homepage-redesign`
**Created**: 2026-07-26
**Status**: Draft
**Input**: User description: "Cambiar el enfoque de la página principal: título, H1, meta description, corrección de H2 duplicado y rediseño de hero si es necesario"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Descriptive Homepage Title & Meta Description for SEO (Priority: P1)

As a potential client searching for online astrology consultations, I want the home page title and meta description to clearly explain Glenda Ferreira's service offerings, so that I can easily find and understand the page in search engine results (Google) and browser tabs.

**Why this priority**: Correct meta titles and descriptions are fundamental for search engine indexing, click-through rates, and establishing clear service positioning.

**Independent Test**: Inspect the `<title>` and `<meta name="description">` in the HTML output of `/es/` and `/en/` homepages.
- ES Title: `Consultas de Astrología Online | Glenda Ferreira`
- ES Meta description: `Consultas de astrología online con Glenda Ferreira: carta natal, relaciones y ciclos predictivos. Sesiones en español e inglés por Zoom.`
- EN Title: `Online Astrology Readings | Glenda Ferreira`
- EN Meta description: `Online astrology readings with Glenda Ferreira: birth chart, relationships, and predictive cycles. Zoom sessions in Spanish and English.`

**Acceptance Scenarios**:
1. **Given** a visitor or search engine crawler visiting `/es/`, **When** the page loads, **Then** the page `<title>` is `Consultas de Astrología Online | Glenda Ferreira` and the meta description accurately describes online astrology consultations.
2. **Given** a visitor or search engine crawler visiting `/en/`, **When** the page loads, **Then** the page `<title>` is `Online Astrology Readings | Glenda Ferreira` and the meta description accurately describes the service in English.

---

### User Story 2 - Clear Service-Oriented H1 and Hero Messaging (Priority: P1)

As a homepage visitor, I want the primary heading (H1) and hero copy to explicitly state the service offered ("Consultas de astrología online con Glenda Ferreira") with clear value proposition ("Claridad y dirección para comprender tus ciclos, relaciones y decisiones"), so that I immediately understand what service is being offered upon landing on the page.

**Why this priority**: H1 is the primary semantic heading of the page and is critical for both accessibility and search engine clarity.

**Independent Test**: Render the homepage hero section and verify the `<h1>` text content and responsive visual presentation.

**Acceptance Scenarios**:
1. **Given** the ES homepage, **When** the hero section renders, **Then** the `<h1>` displays `Consultas de astrología online con Glenda Ferreira` and the supporting copy displays `Claridad y dirección para comprender tus ciclos, relaciones y decisiones.`.
2. **Given** the EN homepage, **When** the hero section renders, **Then** the `<h1>` displays `Online astrology readings with Glenda Ferreira` and the supporting copy displays `Clarity and direction to understand your cycles, relationships, and decisions.`.
3. **Given** mobile or desktop screen sizes, **When** viewing the hero section, **Then** the longer H1 text wraps gracefully without breaking layout or overflowing the container.

---

### User Story 3 - Elimination of Duplicate H2 Headings in DOM (Priority: P2)

As a search engine crawler and accessibility screen reader user, I want each section heading to appear exactly once in the DOM, so that outline structure is clean and SEO auditors do not report duplicate H2 tags.

**Why this priority**: Dual rendering of `<h2>` (one for desktop `hidden md:flex`, one for mobile `md:hidden`) creates duplicate headings in the HTML DOM structure.

**Independent Test**: Search the generated HTML DOM of `index.html` for duplicate `<h2>` text nodes (specifically "Navega Tu Vida con Propósito").

**Acceptance Scenarios**:
1. **Given** the `ImageOverlay` section, **When** inspecting the generated DOM structure, **Then** the headline is rendered in a single `<h2>` element styled responsively rather than two distinct `<h2>` tags.

---

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: Home page content frontmatter in `src/content/pages/es/index.md` MUST update `meta.title` to `Consultas de Astrología Online | Glenda Ferreira` and `meta.description` to `Consultas de astrología online con Glenda Ferreira: carta natal, relaciones y ciclos predictivos. Sesiones en español e inglés por Zoom.`.
- **FR-002**: Home page content frontmatter in `src/content/pages/en/index.md` MUST update `meta.title` to `Online Astrology Readings | Glenda Ferreira` and `meta.description` to `Online astrology readings with Glenda Ferreira: birth chart, relationships, and predictive cycles. Zoom sessions in Spanish and English.`.
- **FR-003**: The primary hero block in `src/content/pages/es/index.md` MUST set `header` to `Consultas de astrología online con Glenda Ferreira` and `copy` to `Claridad y dirección para comprender tus ciclos, relaciones y decisiones.`.
- **FR-004**: The primary hero block in `src/content/pages/en/index.md` MUST set `header` to `Online astrology readings with Glenda Ferreira` and `copy` to `Clarity and direction to understand your cycles, relationships, and decisions.`.
- **FR-005**: `src/components/Sections/Hero.astro` MUST accommodate longer titles with responsive text sizing (`text-3xl sm:text-4xl md:text-5xl lg:text-6xl`) and padding adjustments so hero text displays elegantly across all device viewport sizes.
- **FR-006**: `src/components/Sections/ImageOverlay.astro` MUST refactor its headline rendering to avoid duplicating `<h2>` tags in the HTML markup.

### Key Entities

- **Page Meta (Frontmatter)**: Title and description fields governing `<title>` and `<meta name="description">` tags in `BaseLayout.astro`.
- **Hero Section Component**: Top-of-page hero component presenting H1 title, subhead copy, background image, and CTA button.
- **Image Overlay Component**: Secondary section component presenting section headline H2, subheadline H3, and body text over background image.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 100% of homepage HTML documents (`/index.html` and `/en/index.html`) contain the new `<title>` and `<meta name="description">`.
- **SC-002**: 100% of homepage HTML documents contain exactly one `<h1>` matching the requested service title.
- **SC-003**: Zero duplicate `<h2>` tags with the text "Navega Tu Vida con Propósito" exist in the homepage HTML DOM.
- **SC-004**: Zero visual text overflows or layout breaks on viewports from 320px to 1920px width.

## Assumptions

- The CTA button in the hero continues to point to `/about` (or the booking link).
- The secondary image hero block (block without header/copy) remains as part of visual layout or is maintained without producing additional empty `<h1>` tags.
- English translations match the Spanish intent accurately.
