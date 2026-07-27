# Quickstart & Verification Guide: Homepage Focus and SEO Redesign

## Verification Steps

### 1. Build and Run Local Server
```bash
npm run build
```

### 2. Verify Generated Metadata in Built HTML
Inspect `dist/es/index.html` (or `dist/index.html` depending on SSG output):
- Title tag check: `<title>Consultas de Astrología Online | Glenda Ferreira</title>`
- Meta description check: `<meta name="description" content="Consultas de astrología online con Glenda Ferreira: carta natal, relaciones y ciclos predictivos. Sesiones en español e inglés por Zoom." />`

Inspect `dist/en/index.html`:
- Title tag check: `<title>Online Astrology Readings | Glenda Ferreira</title>`
- Meta description check: `<meta name="description" content="Online astrology readings with Glenda Ferreira: birth chart, relationships, and predictive cycles. Zoom sessions in Spanish and English." />`

### 3. Verify Heading Structure
Verify exact count of H1 and H2 tags in generated HTML:
- Exactly 1 `<h1>` tag per homepage containing "Consultas de astrología online con Glenda Ferreira" (ES) or "Online astrology readings with Glenda Ferreira" (EN).
- Zero duplicate "Navega Tu Vida con Propósito" `<h2>` elements in the HTML DOM output.

### 4. Responsive Visual Check
Start dev server:
```bash
npm run dev
```
Open browser to `http://localhost:4321/es/` and `http://localhost:4321/en/`:
- Check mobile view (375px width): Verify title text wraps cleanly andCTA button remains visible.
- Check desktop view (1280px width): Verify title text is crisp, centered/aligned, and background overlay looks balanced.
