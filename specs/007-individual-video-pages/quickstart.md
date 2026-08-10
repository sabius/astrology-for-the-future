# Quickstart & Validation Guide: Dedicated Video Pages

## Quick Verification Steps

### 1. Build Static Production Assets

Run static site generation:

```bash
npm run build
```

### 2. Verify Video Pages Generated in `dist/`

Check that dedicated video page HTML files exist:

```bash
# English video watch pages
ls dist/videos/*/index.html

# Spanish video watch pages
ls dist/es/videos/*/index.html
```

### 3. Verify VideoObject JSON-LD & Head Metadata

Inspect `<head>` and `VideoObject` scripts in generated HTML:

```bash
# Check VideoObject structured data
grep -i "VideoObject" dist/videos/most-relevant-events-2025/index.html

# Check canonical tag
grep -i "canonical" dist/videos/most-relevant-events-2025/index.html

# Check hreflang tags
grep -i "hreflang" dist/videos/most-relevant-events-2025/index.html
```

### Expected Output Criteria

- Every dedicated video page contains a valid `schema.org/VideoObject` JSON-LD block with `name`, `description`, `thumbnailUrl`, `uploadDate`, and `embedUrl`.
- `<link rel="canonical">` points to `https://glendaferreira.com/videos/<slug>/` (or `/es/videos/<slug>/`).
- `<link rel="alternate" hreflang="...">` tags link English and Spanish video page pairs.
- Main `/videos/` and `/es/videos/` listing pages render lightweight video card thumbnails with links to watch pages.
- `dist/sitemap-0.xml` lists all dedicated video URLs.
