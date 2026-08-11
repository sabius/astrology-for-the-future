# Implementation Plan: Contact Page Audit & Structure Redesign

**Branch**: `008-contact-page-redesign` | **Date**: 2026-08-10 | **Spec**: [specs/008-contact-page-redesign/spec.md](file:///d:/Projects/astrology-for-the-future/specs/008-contact-page-redesign/spec.md)

**Input**: Feature specification from `/specs/008-contact-page-redesign/spec.md`

## Summary

Audit and overhaul the structure and visual hierarchy of the contact page (`/contact` and `/es/contact`). Extend `FeatureGrid.astro` and Zod schema in `src/content/config.ts` to support image icons (`icon_image`), integrating the custom brand icons (`email-icon.png` and `whatsapp-icon.png`) saved in `public/img/`. Improve copy, CTAs, session logistics, and gift card presentation across English and Spanish locales.

## Technical Context

**Language/Version**: TypeScript (Strict Mode), Astro 5 (Static Site Generation), Lit 3.
**Primary Dependencies**: `@astrojs/lit`, `lit`, `zod`, `marked`, `isomorphic-dompurify`, Tailwind CSS v4.
**Storage**: Content Collections (`src/content/pages/[lang]/contact.md`).
**Testing**: `npm run build` compilation check and local dev validation (`npm run dev`).
**Target Platform**: SSG pre-rendered web pages (browsers, search engine crawlers).
**Project Type**: Multilingual Astro 5 Web Application.
**Performance Goals**: Core Web Vitals LCP < 2.5s, CLS < 0.1, INP < 200ms.
**Constraints**: Tailwind CSS v4 styling rules, no hardcoded unlocalized UI strings, no unhandled `any` types.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- [x] **Principle I: Code Quality & Architecture Discipline**: `src/content/config.ts` Zod schema updated to explicitly type `icon_image` and `copy_text`.
- [x] **Principle II: Quality Gates**: Production build (`npm run build`) runs cleanly with 0 warnings.
- [x] **Principle III: UX & i18n Parity**: Full multilingual parity maintained between `en/contact.md` and `es/contact.md`. Rich design system tokens used for cards.
- [x] **Principle IV: Performance & Core Web Vitals**: Images stored in `public/img/` loaded with explicit width/height and responsive styling.

## Project Structure

### Documentation (this feature)

```text
specs/008-contact-page-redesign/
├── plan.md              # Implementation plan
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 data model & schemas
├── quickstart.md        # Validation guide
└── contracts/
    └── contact-schema.md # Component contracts
```

### Source Code Layout

```text
src/
├── components/
│   ├── Sections/
│   │   ├── FeatureGrid.astro # Updated to render card.icon_image
│   │   └── FeatureCard.astro # Styled card layout
│   └── Lit/                  # Interactive elements (if applicable)
├── content/
│   ├── config.ts             # Extended Zod schema for featureGridBlock
│   └── pages/
│       ├── en/contact.md     # Updated English contact page
│       └── es/contact.md     # Updated Spanish contact page
public/
└── img/
    ├── email-icon.png       # Email channel icon
    └── whatsapp-icon.png    # WhatsApp channel icon
```

## Complexity Tracking

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| None | N/A | N/A |

## Proposed Changes

### 1. Schema & Component Layer

#### [MODIFY] [config.ts](file:///d:/Projects/astrology-for-the-future/src/content/config.ts)
- Add `icon_image: z.string().optional()` to `featureGridBlock` card schema.

#### [MODIFY] [FeatureGrid.astro](file:///d:/Projects/astrology-for-the-future/src/components/Sections/FeatureGrid.astro)
- Add `icon_image` support in `Card` interface and card rendering template.
- Render `<img src={card.icon_image} alt={card.heading || "Icon"} class="w-16 h-16 md:w-20 md:h-20 object-contain mx-auto transition-transform hover:scale-105" />` when `icon_image` is provided.

### 2. Content & i18n Layer

#### [MODIFY] [en/contact.md](file:///d:/Projects/astrology-for-the-future/src/content/pages/en/contact.md)
- Update Hero copy to highlight personalized consultations with Dr. Glenda Ferreira.
- Update FeatureGrid cards to use `/img/email-icon.png` and `/img/whatsapp-icon.png`.
- Improve copy for WhatsApp direct link with pre-filled inquiry text.
- Elevate Online Sessions & Gift Card sections into cohesive content blocks.

#### [MODIFY] [es/contact.md](file:///d:/Projects/astrology-for-the-future/src/content/pages/es/contact.md)
- Maintain 100% structural parity with English page.
- Update Hero copy, card descriptions, and WhatsApp link with Spanish pre-filled message parameter (`Hola, quisiera recibir información sobre una consulta...`).

## Verification Plan

### Automated Tests
- Run `npm run build` using Git Bash to verify static generation succeeds without errors.

### Manual Verification
- Launch `npm run dev` and navigate to `/contact` and `/es/contact`.
- Verify icons render properly without layout shifts.
- Click Email and WhatsApp CTAs to verify link targets.
