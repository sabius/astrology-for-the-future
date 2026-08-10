# Data Model & Schema: SEO & Canonical Metadata

## Meta Props Interface (`src/components/Global/Meta.astro`)

### Schema Definition

```typescript
interface AlternateLink {
  hreflang: string; // "en" | "es" | "x-default"
  href: string;     // Absolute URL e.g. "https://glendaferreira.com/es/videos/"
}

interface MetaProps {
  title: string;
  description?: string;
  image?: string;
  canonicalUrl?: string;       // Explicit canonical URL override if necessary
  alternateLinks?: AlternateLink[]; // List of localized alternate links
}
```

## URL Route Mapping Entity

| Logical Page | English Primary Canonical Path | Spanish Primary Canonical Path |
| :--- | :--- | :--- |
| Homepage | `/` | `/es/` |
| Videos | `/videos/` | `/es/videos/` |
| Contact | `/contact/` | `/es/contact/` |
| Privacy Policy | `/privacy-policy/` | `/es/privacy-policy/` |
| Terms of Service | `/terms-of-service/` | `/es/terms-of-service/` |

## Validation Rules

1. **Absolute Origin Requirement**: All `canonical` and `hreflang` URLs MUST start with `https://glendaferreira.com`.
2. **Canonical Equivalence**: The URL in `<link rel="canonical">` MUST match one of the `hreflang` alternate URLs for the current page language.
3. **Sitemap Synchronization**: Every URL listed in `dist/sitemap-0.xml` MUST match its pre-rendered page's canonical tag.
