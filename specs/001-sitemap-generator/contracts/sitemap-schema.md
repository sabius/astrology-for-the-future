# Interface Contract: Sitemap Protocol Output

## Overview

The Sitemap Generator outputs standard XML files in the build output directory (`dist/`) upon running `npm run build`.

## Deliverable Files

1. **`dist/sitemap-index.xml`** (or `dist/sitemap-0.xml`): Primary sitemap entry file linking all generated sitemap chunks.
2. **`dist/sitemap-0.xml`**: XML document containing URL nodes conforming to the [Sitemap Protocol 0.9](https://www.sitemaps.org/protocol.html).

## XML Schema Contract

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
  <url>
    <loc>https://astrology-for-the-future.pages.dev/en/about</loc>
    <lastmod>2026-07-26T00:00:00.000Z</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
    <xhtml:link rel="alternate" hreflang="en" href="https://astrology-for-the-future.pages.dev/en/about"/>
    <xhtml:link rel="alternate" hreflang="es" href="https://astrology-for-the-future.pages.dev/es/about"/>
  </url>
  <url>
    <loc>https://astrology-for-the-future.pages.dev/es/about</loc>
    <lastmod>2026-07-26T00:00:00.000Z</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
    <xhtml:link rel="alternate" hreflang="en" href="https://astrology-for-the-future.pages.dev/en/about"/>
    <xhtml:link rel="alternate" hreflang="es" href="https://astrology-for-the-future.pages.dev/es/about"/>
  </url>
</urlset>
```

## Validation Rules

1. XML content must start with `<?xml version="1.0" encoding="UTF-8"?>`.
2. Roots must include `xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"` and `xmlns:xhtml="http://www.w3.org/1999/xhtml"`.
3. Every `<loc>` MUST be a valid absolute HTTP/HTTPS URL starting with the canonical origin (`https://astrology-for-the-future.pages.dev`).
4. Excluded routes (`/404`, draft pages) MUST NOT appear as `<url>` nodes.
