# Data Model & Configuration Schema: Sitemap Generator

## Data Entities & Structures

### 1. Sitemap Entry Model

Represents a single URL entry generated in `sitemap-0.xml` / `sitemap.xml`.

| Property | Type | Description | Example / Validation |
| --- | --- | --- | --- |
| `url` | `string` | Absolute canonical URL of the pre-rendered static page. | `https://astrology-for-the-future.pages.dev/en/about` |
| `lastmod` | `string` (ISO 8601) | Date of last modification or build timestamp. | `2026-07-26T00:00:00.000Z` |
| `changefreq` | `enum` | Expected update frequency (`always`, `hourly`, `daily`, `weekly`, `monthly`, `yearly`, `never`). | `weekly` |
| `priority` | `number` (0.0 to 1.0) | Relative importance score of the page within the site. | `0.8` (default pages), `1.0` (landing pages) |
| `links` | `Array<AlternateLink>` | List of localized alternate versions for multilingual SEO (`hreflang`). | `[{ lang: 'es', url: '...' }]` |

### 2. Alternate Link Model (`hreflang`)

| Property | Type | Description | Example |
| --- | --- | --- | --- |
| `lang` | `string` | BCP 47 language code. | `en`, `es` |
| `url` | `string` | Absolute URL of the corresponding localized page. | `https://astrology-for-the-future.pages.dev/es/about` |

---

## Configuration Schema

Defined in `astro.config.mjs` via `@astrojs/sitemap`:

```typescript
interface SitemapConfiguration {
  site: string; // Canonical domain origin
  i18n?: {
    defaultLocale: string; // "en"
    locales: Record<string, string>; // { en: "en", es: "es" }
  };
  filter?: (page: string) => boolean;
  changefreq?: string;
  priority?: number;
  lastmod?: Date;
  serialize?: (item: SitemapEntry) => SitemapEntry | undefined;
}
```
