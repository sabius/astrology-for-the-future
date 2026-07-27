# Feature Specification: Homepage Focus and SEO Redesign

**Feature Branch**: `003-homepage-redesign`
**Created**: 2026-07-26
**Status**: Draft
**Input**: User description: "Cambiar el enfoque de la página principal: título, H1 (Apple-style sr-only), meta description, corrección de H2 duplicado y rediseño de hero"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Descriptive Homepage Title & Meta Description for SEO (Priority: P1)

As a potential client searching for online astrology consultations, I want the home page title and meta description to clearly explain Glenda Ferreira's service offerings, so that I can easily find and understand the page in search engine results (Google) and browser tabs.

**Why this priority**: Correct meta titles and descriptions are fundamental for search engine indexing, click-through rates, and establishing clear service positioning.

**Independent Test**: Inspect the `<title>` and `<meta name="description">` in the HTML output of `/es/` and `/en/` homepages.
- ES Title: `Consultas de Astrología Online | Glenda Ferreira`
- ES Meta description: `Consultas de astrología online con Glenda Ferreira, astróloga bilingüe radicada en Bogotá. Sesiones en español e inglés para clientes en Colombia, Estados Unidos y Europa.`
- EN Title: `Online Astrology Readings | Glenda Ferreira`
- EN Meta description: `Online astrology consultations with Glenda Ferreira, bilingual astrologer based in Bogotá. Sessions in Spanish and English for clients in Colombia, the United States, and Europe.`

**Acceptance Scenarios**:
1. **Given** a visitor or search engine crawler visiting `/es/`, **When** the page loads, **Then** the page `<title>` is `Consultas de Astrología Online | Glenda Ferreira` and the meta description accurately describes online astrology consultations with location reach.
2. **Given** a visitor or search engine crawler visiting `/en/`, **When** the page loads, **Then** the page `<title>` is `Online Astrology Readings | Glenda Ferreira` and the meta description accurately describes the service in English.

---

### User Story 2 - Accessible Apple-Style Visually Hidden H1 & Visual Display Heading (Priority: P1)

As a homepage visitor and screen reader user, I want the primary heading (H1) to be structured accessibly via an Apple-style `sr-only` H1 for search engines and screen readers, while presenting a striking visual display title ("Tu Carta Natal Como Herramienta de Comprensión"), so that the page is both SEO-optimized and visually compelling.

**Why this priority**: H1 accessibility with clean visual styling balances SEO keyword targeting with high-converting, modern typography.

**Independent Test**: Render the homepage hero section and verify the `<h1 class="sr-only">` text content, visual display header, and responsive visual presentation.

**Acceptance Scenarios**:
1. **Given** the ES homepage, **When** the hero section renders, **Then** the `<h1>` displays `Astrología con Glenda Ferreira: consultas presenciales y online` (visually hidden with `sr-only`), the visual header displays `Tu Carta Natal Como Herramienta de Comprensión`, and the copy displays `Consultas presenciales y online con Glenda Ferreira, médica cirujana y astróloga con formación en astrología médica.`.
2. **Given** the EN homepage, **When** the hero section renders, **Then** the `<h1>` displays `Astrology with Glenda Ferreira: in-person and online consultations` (visually hidden with `sr-only`), the visual header displays `Your Birth Chart as a Tool for Understanding`, and the copy displays `In-person and online consultations with Glenda Ferreira, M.D., surgeon and astrologer with training in medical astrology.`.
3. **Given** mobile or desktop screen sizes, **When** viewing the hero section, **Then** the visual header text wraps gracefully without breaking layout or overflowing the container.

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

- **FR-001**: Home page content frontmatter in `src/content/pages/es/index.md` MUST update `meta.title` to `Consultas de Astrología Online | Glenda Ferreira` and `meta.description` to `Consultas de astrología online con Glenda Ferreira, astróloga bilingüe radicada en Bogotá. Sesiones en español e inglés para clientes en Colombia, Estados Unidos y Europa.`.
- **FR-002**: Home page content frontmatter in `src/content/pages/en/index.md` MUST update `meta.title` to `Online Astrology Readings | Glenda Ferreira` and `meta.description` to `Online astrology consultations with Glenda Ferreira, bilingual astrologer based in Bogotá. Sessions in Spanish and English for clients in Colombia, the United States, and Europe.`.
- **FR-003**: The primary hero block in `src/content/pages/es/index.md` MUST set `hidden_h1` to `Astrología con Glenda Ferreira: consultas presenciales y online`, `header` to `Tu Carta Natal Como Herramienta de Comprensión`, and `copy` to `Consultas presenciales y online con Glenda Ferreira, médica cirujana y astróloga con formación en astrología médica.`.
- **FR-004**: The primary hero block in `src/content/pages/en/index.md` MUST set `hidden_h1` to `Astrology with Glenda Ferreira: in-person and online consultations`, `header` to `Your Birth Chart as a Tool for Understanding`, and `copy` to `In-person and online consultations with Glenda Ferreira, M.D., surgeon and astrologer with training in medical astrology.`.
- **FR-005**: `src/components/Sections/Hero.astro` MUST render `<h1 class="sr-only">{hidden_h1}</h1>` when `hidden_h1` is provided, and render visual header as a responsive display heading, while preferring `image_alt` for hero image alt text.
- **FR-006**: `src/components/Sections/ImageOverlay.astro` MUST refactor its headline rendering to avoid duplicating `<h2>` tags in the HTML markup.

### Key Entities

- **Page Meta (Frontmatter)**: Title and description fields governing `<title>` and `<meta name="description">` tags in `BaseLayout.astro`.
- **Hero Section Component**: Top-of-page hero component supporting accessible hidden H1, display header, subhead copy, background image, and CTA button.
- **Image Overlay Component**: Secondary section component presenting section headline H2, subheadline H3, and body text over background image.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 100% of homepage HTML documents (`/index.html` and `/en/index.html`) contain the new `<title>` and `<meta name="description">`.
- **SC-002**: 100% of homepage HTML documents contain exactly one `<h1>` matching the accessible service title (`<h1 class="sr-only">`).
- **SC-003**: Zero duplicate `<h2>` tags with the text "Navega Tu Vida con Propósito" exist in the homepage HTML DOM.
- **SC-004**: Zero visual text overflows or layout breaks on viewports from 320px to 1920px width.

## Assumptions

- The CTA button in the hero continues to point to `/about` (or the booking link).
- The secondary image hero block (block without header/copy) remains as part of visual layout or is maintained without producing additional empty `<h1>` tags.
- English translations match the Spanish intent accurately.
