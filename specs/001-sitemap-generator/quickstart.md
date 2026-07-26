# Quickstart & Verification Guide: Sitemap Generator

## Overview

This guide provides step-by-step instructions to verify that the sitemap generator correctly builds valid XML sitemaps containing all pre-rendered localized pages.

## Verification Steps

### Step 1: Install Dependency (if not already installed)

```bash
npm install @astrojs/sitemap
```

### Step 2: Build the Production Artifacts

Run the Astro production build process:

```bash
npm run build
```

Expected output: Astro compiles static pages and reports sitemap generation in the build logs.

### Step 3: Inspect Output Sitemaps

Verify that sitemap files are present in `dist/`:

- Powershell:
  ```powershell
  Test-Path dist/sitemap-index.xml
  Test-Path dist/sitemap-0.xml
  ```

### Step 4: Verify XML Contents & Hreflang Tags

Read `dist/sitemap-0.xml` or `dist/sitemap-index.xml` and verify:
1. Canonical domain matches `https://astrology-for-the-future.pages.dev`.
2. All published localized routes (e.g. `/en/...`, `/es/...`) are listed.
3. `xhtml:link` alternate links exist for translated pages.
4. Excluded pages (e.g. 404 error page) are omitted.
