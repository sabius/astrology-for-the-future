# Research: Homepage Focus and SEO Redesign

## Technical Questions & Decision Findings

### 1. Title Tag & Meta Description Data Source Flow
- **Decision**: Update frontmatter `meta.title` and `meta.description` directly in `src/content/pages/es/index.md` and `src/content/pages/en/index.md`.
- **Rationale**: `[...slug].astro` passes `meta.title` and `meta.description` directly into `<BaseLayout>`, which renders `<title>{title}</title>` and `<Meta title={title} description={description} />`. Updating frontmatter automatically flows through to all rendered pages and SSG HTML output without needing custom layout logic.
- **Alternatives Considered**: Hardcoding titles in `BaseLayout` (rejected as it violates Content Collection driven architecture and breaks i18n).

### 2. Primary H1 Title in Hero Section
- **Decision**: Set frontmatter block 1 `header` to `Consultas de astrología online con Glenda Ferreira` (ES) / `Online astrology readings with Glenda Ferreira` (EN) and `copy` to `Claridad y dirección para comprender tus ciclos, relaciones y decisiones.` (ES) / `Clarity and direction to understand your cycles, relationships, and decisions.` (EN).
- **Rationale**: `Hero.astro` renders `{header}` inside `<h1>`. Updating frontmatter provides explicit service positioning directly in the primary `<h1>`.
- **Hero Responsiveness**: `Hero.astro` heading styling (`text-4xl md:text-6xl font-bold mb-4 text-white`) should be adjusted to `text-3xl sm:text-4xl md:text-5xl lg:text-6xl` to handle the longer 6-word title gracefully on 320px mobile screens without wrapping awkwardly.

### 3. Duplicate H2 Tag Elimination in ImageOverlay Component
- **Decision**: Refactor `src/components/Sections/ImageOverlay.astro` to render a single responsive `<h2>` node instead of dual `<h2>` nodes (`hidden md:flex` vs `md:hidden`).
- **Rationale**: Currently `ImageOverlay.astro` duplicates the `<h2>` tag in HTML (`<h2 class="hidden md:flex...">` and `<h2 class="md:hidden...">`). This causes Google SEO audits and screen readers to register two identical H2 elements. Refactoring to a single `<h2>` node placed cleanly above or within the content grid solves the SEO duplicate heading issue completely.
- **Alternatives Considered**: Using CSS `display:none` via `hidden` (rejected because screen readers and HTML parsers still parse duplicate H2 tags in the DOM).

### 4. Secondary Hero Block Check
- **Decision**: Ensure secondary hero blocks (e.g. image-only hero block at line 39 of `index.md`) do not emit empty `<h1>` tags.
- **Rationale**: In `Hero.astro`, lines 35-53 only render the header box if `header || copy` is truthy. Hence, secondary image-only heroes emit zero heading tags, preserving the single `<h1>` per page rule.
