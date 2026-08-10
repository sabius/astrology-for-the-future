# Quickstart & Validation Guide: GSC SEO & Canonical Fix

## Quick Verification Steps

### 1. Build Static Production Assets

Run static site generation to produce production output in `dist/`:

```bash
npm run build
```

### 2. Verify Canonical & `hreflang` Head Tags in Generated HTML

Check pre-rendered HTML files for canonical and `hreflang` tags:

```bash
# Check homepage root
grep -i "canonical" dist/index.html
grep -i "hreflang" dist/index.html

# Check Spanish homepage
grep -i "canonical" dist/es/index.html
grep -i "hreflang" dist/es/index.html

# Check subpage (e.g. videos)
grep -i "canonical" dist/videos/index.html
grep -i "hreflang" dist/videos/index.html
grep -i "canonical" dist/es/videos/index.html
grep -i "hreflang" dist/es/videos/index.html
```

### Expected Output Criteria

- `dist/index.html` canonical points to `https://glendaferreira.com/`
- `dist/videos/index.html` canonical points to `https://glendaferreira.com/videos/`
- `dist/es/videos/index.html` canonical points to `https://glendaferreira.com/es/videos/`
- Both `dist/videos/index.html` and `dist/es/videos/index.html` contain matching `hreflang="en"`, `hreflang="es"`, and `hreflang="x-default"` tags pointing to absolute `https://glendaferreira.com` URLs.

### 3. Verify XML Sitemap

Check entries in `dist/sitemap-0.xml`:

```bash
grep "<loc>" dist/sitemap-0.xml
```

Expected URLs present in sitemap:
- `https://glendaferreira.com/`
- `https://glendaferreira.com/es/`
- `https://glendaferreira.com/videos/`
- `https://glendaferreira.com/es/videos/`
- `https://glendaferreira.com/contact/`
- `https://glendaferreira.com/es/contact/`
- `https://glendaferreira.com/privacy-policy/`
- `https://glendaferreira.com/es/privacy-policy/`
- `https://glendaferreira.com/terms-of-service/`
- `https://glendaferreira.com/es/terms-of-service/`
