# Data Model: Contact Page & FeatureGrid Extensions

**Feature Branch**: `008-contact-page-redesign`

## Entities & Content Schemas

### 1. `featureGridBlock` (Zod Schema Extension in `src/content/config.ts`)

Represents a multi-column card grid section on pages.

```typescript
const featureGridCard = z.object({
  icon: z.string().optional(),          // Emoji or raw icon string
  icon_image: z.string().optional(),    // Path to image icon (e.g. "/img/email-icon.png")
  heading: z.string().optional(),       // Card title
  copy: z.string().optional(),          // Card body text or contact value
  button: z.object({
    text: z.string(),                   // Button label
    url: z.string(),                    // Destination URL (mailto:, wa.me, etc.)
    style: buttonStyle.optional(),      // "primary" | "secondary" | "accent" | "outline"
    copy_text: z.string().optional(),   // Optional text to copy to clipboard on click
  }).optional(),
});

const featureGridBlock = z.object({
  component: z.literal("feature-grid"),
  header: z.string().optional(),
  copy: z.string().optional(),
  cards: z.array(featureGridCard).optional(),
});
```

### 2. Contact Page Frontmatter Model (`src/content/pages/[lang]/contact.md`)

```yaml
meta:
  title: "Contact - Astrology for the Future" # or "Contacto - Astrología para el Futuro"
  description: "..."
content:
  - component: "hero"
    header: "..."
    copy: "..."
    background_image: "..."
    image_alt: "..."
    button:
      text: "..."
      url: "..."
  - component: "feature-grid"
    header: "Get in Touch"
    copy: "..."
    cards:
      - icon_image: "/img/email-icon.png"
        heading: "Email"
        copy: "astrologyforthefuture@gmail.com"
        button:
          text: "Send Email"
          url: "mailto:astrologyforthefuture@gmail.com"
          style: "primary"
      - icon_image: "/img/whatsapp-icon.png"
        heading: "WhatsApp"
        copy: "..."
        button:
          text: "Message Me"
          url: "https://wa.me/573054315796?text=..."
          style: "secondary"
      - icon: "🌍"
        heading: "Global Reach"
        ...
```
