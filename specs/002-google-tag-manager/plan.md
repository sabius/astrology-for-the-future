# Implementation Plan: Google Tag Manager Integration

**Branch**: `002-google-tag-manager` | **Date**: 2026-07-26 | **Spec**: [spec.md](file:///d:/Projects/astrology-for-the-future/specs/002-google-tag-manager/spec.md)

**Input**: Feature specification from `/specs/002-google-tag-manager/spec.md`

## Summary

Integrate Google Tag / Tag Manager tracking container `G-ERLJ63MV2B` into the site layout hierarchy via a dedicated Astro component (`src/components/Analytics/GoogleTagManager.astro`). The component will load `gtag.js` asynchronously in page `<head>` elements across all language routes (`/` and `/es/`), supporting central environment variable overrides (`PUBLIC_GTM_ID`) while preserving static site generation (SSG) speed and Core Web Vitals targets.

## Technical Context

**Language/Version**: TypeScript 5+ / Node.js  
**Primary Dependencies**: Astro 5 (SSG), Tailwind CSS v4  
**Storage**: N/A (Static analytics tag injection)  
**Testing**: Astro build validation (`npm run build`), HTML script string verification, dev console `window.dataLayer` inspection  
**Target Platform**: Modern Web Browsers / Web Vitals compliant SSG pre-rendered HTML  
**Project Type**: Multilingual Web Application (Astro 5 SSG)  
**Performance Goals**: LCP < 2.5s, CLS < 0.1, INP < 200ms  
**Constraints**: Non-blocking script execution (`async`), zero unhandled console errors when scripts are blocked by ad-blockers, 100% i18n locale page coverage  
**Scale/Scope**: All pre-rendered pages across English (`en`) and Spanish (`es`) locales  

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- **Principle I: Code Quality & Architecture Discipline**: PASS — Component is strictly typed, modular, and cleanly isolated in `src/components/Analytics/GoogleTagManager.astro`.
- **Principle II: Testing Standards & Quality Gates**: PASS — Zero regression build check (`npm run build`) and HTML output checks validate tag presence.
- **Principle III: User Experience Consistency & i18n Parity**: PASS — Injected across `BaseLayout.astro` and `DocsLayout.astro`, ensuring 100% parity across all language routes without breaking visual layouts.
- **Principle IV: Performance Requirements & Core Web Vitals**: PASS — Script loaded asynchronously with non-blocking execution, maintaining LCP < 2.5s and CLS < 0.1.

## Project Structure

### Documentation (this feature)

```text
specs/002-google-tag-manager/
├── spec.md              # Feature specification
├── plan.md              # Implementation plan (this file)
├── research.md          # Technology decisions & rationale
├── data-model.md        # Data layer model & lifecycle flow
├── quickstart.md        # Run & verification guide
├── contracts/           # Component interface contract
│   └── component-contract.md
└── checklists/          # Quality checklists
    └── requirements.md
```

### Source Code (repository root)

```text
src/
├── components/
│   ├── Analytics/
│   │   └── GoogleTagManager.astro   # [NEW] Tag Manager script component
│   └── Global/
│       └── Meta.astro
├── layouts/
│   ├── BaseLayout.astro             # [MODIFY] Include GoogleTagManager component
│   └── DocsLayout.astro             # [MODIFY] Include GoogleTagManager component
└── pages/
    └── [...slug].astro
```

**Structure Decision**: Single project Astro web application layout. New component added under `src/components/Analytics/` and integrated into primary layouts in `src/layouts/`.

## Complexity Tracking

*No constitution violations. Zero complex workarounds required.*
