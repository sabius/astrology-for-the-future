# Data Model & Schema Changes: Homepage Focus and SEO Redesign

## Content Collection Frontmatter Entity

### Homepage Frontmatter (`src/content/pages/[lang]/index.md`)

```yaml
meta:
  title: string # Target ES: "Consultas de Astrología Online | Glenda Ferreira"
                # Target EN: "Online Astrology Readings | Glenda Ferreira"
  description: string # Target ES: "Consultas de astrología online con Glenda Ferreira, astróloga bilingüe radicada en Bogotá. Sesiones en español e inglés para clientes en Colombia, Estados Unidos y Europa."
                      # Target EN: "Online astrology consultations with Glenda Ferreira, bilingual astrologer based in Bogotá. Sessions in Spanish and English for clients in Colombia, the United States, and Europe."
  image: string # Cloudflare/Cloudinary OpenGraph image URL

content:
  - component: "hero"
    hidden_h1: string # Target ES: "Astrología con Glenda Ferreira: consultas presenciales y online"
                      # Target EN: "Astrology with Glenda Ferreira: in-person and online consultations"
    header: string    # Target ES: "Tu Carta Natal Como Herramienta de Comprensión"
                      # Target EN: "Your Birth Chart as a Tool for Understanding"
    copy: string      # Target ES: "Consultas presenciales y online con Glenda Ferreira, médica cirujana y astróloga con formación en astrología médica."
                      # Target EN: "In-person and online consultations with Glenda Ferreira, M.D., surgeon and astrologer with training in medical astrology."
    background_image: string
    image_alt: string
    button:
      text: string
      url: string
  # ... other section components
```

## Component Props Contracts

### `Hero.astro` Props
- `hidden_h1` (optional string): Rendered inside `<h1 class="sr-only">` tag for SEO and screen reader accessibility (Apple-style pattern).
- `header` (optional string): Rendered as visual display heading (`<p class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-white leading-tight">` when `hidden_h1` present, or `<h1>` when `hidden_h1` absent).
- `copy` (optional string): Rendered inside `<p>` tag below header.
- `button` (optional object): `{ text: string, url: string }`.
- `background_image` (optional string): Image URL for hero backdrop.
- `image_alt` (optional string): Alt text for hero background image (prioritized over `hidden_h1`/`header`).

### `ImageOverlay.astro` Props
- `headline` (optional string): Rendered inside a single `<h2>` tag, styled responsively across viewports.
- `subheadline` (optional string): Rendered inside `<h3>` tag.
- `body_copy` (string or string[]): Paragraph list rendered inside body text area.
- `background_image` (optional string): Image URL.
- `image_alt` (optional string): Accessibility alt text.
