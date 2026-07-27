# Data Model & Schema Changes: Homepage Focus and SEO Redesign

## Content Collection Frontmatter Entity

### Homepage Frontmatter (`src/content/pages/[lang]/index.md`)

```yaml
meta:
  title: string # Target ES: "Consultas de Astrología Online | Glenda Ferreira"
                # Target EN: "Online Astrology Readings | Glenda Ferreira"
  description: string # Target ES: "Consultas de astrología online con Glenda Ferreira: carta natal, relaciones y ciclos predictivos. Sesiones en español e inglés por Zoom."
                      # Target EN: "Online astrology readings with Glenda Ferreira: birth chart, relationships, and predictive cycles. Zoom sessions in Spanish and English."
  image: string # Cloudflare/Cloudinary OpenGraph image URL

content:
  - component: "hero"
    header: string # Target ES: "Consultas de astrología online con Glenda Ferreira"
                   # Target EN: "Online astrology readings with Glenda Ferreira"
    copy: string   # Target ES: "Claridad y dirección para comprender tus ciclos, relaciones y decisiones."
                   # Target EN: "Clarity and direction to understand your cycles, relationships, and decisions."
    background_image: string
    image_alt: string
    button:
      text: string
      url: string
  # ... other section components
```

## Component Props Contracts

### `Hero.astro` Props
- `header` (optional string): Rendered inside `<h1>` tag with responsive sizing (`text-3xl sm:text-4xl md:text-5xl lg:text-6xl`).
- `copy` (optional string): Rendered inside `<p>` tag below header.
- `button` (optional object): `{ text: string, url: string }`.
- `background_image` (optional string): Image URL for hero backdrop.

### `ImageOverlay.astro` Props
- `headline` (optional string): Rendered inside a single `<h2>` tag, styled responsively across viewports.
- `subheadline` (optional string): Rendered inside `<h3>` tag.
- `body_copy` (string or string[]): Paragraph list rendered inside body text area.
- `background_image` (optional string): Image URL.
- `image_alt` (optional string): Accessibility alt text.
