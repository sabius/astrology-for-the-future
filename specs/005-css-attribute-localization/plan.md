# Implementation Plan: Pure CSS Attribute Root Localization Refactoring

**Branch**: `005-css-attribute-localization` | **Date**: 2026-08-03 | **Spec**: [spec.md](file:///d:/Projects/astrology-for-the-future/specs/005-css-attribute-localization/spec.md)

**Input**: User request: Refactor hardcoded JS string-injected CSS rules (`style.innerHTML = "..."`) to pure CSS attribute rules (`html[lang="es"] .lang-en { display: none !important; }` and `html:not([lang="es"]) .lang-es { display: none !important; }`).

## Summary

Replace JS string-injected style rules with declarative CSS attribute rules in `src/styles/global.css`. The inline pre-paint script on `/` and footer click handlers shrink down to setting `document.documentElement.lang = lang`, completely eliminating string concatenation, dynamic `<style>` creation, and layout distortion.

## Technical Context

**Language/Version**: TypeScript / Astro 5 (Static Site Generation)
**Primary Dependencies**: Astro, Tailwind CSS v4
**Storage**: Client `localStorage` for persisting user language preference across visits
**Testing**: `npm run build` (SSG HTML validation), manual attribute toggling
**Target Platform**: Web (Static HTML / Cloudflare Pages)

## Constitution Check

- **Principle I (Code Quality & Architecture)**: Complies. Eliminates brittle string manipulation in JS.
- **Principle III (i18n Parity & Design System)**: Complies. 100% design system alignment; native layout classes preserved.
- **Principle IV (Performance & Core Web Vitals)**: Complies. Inline script execution reduced to <0.1ms; CLS = 0.

## Project Structure

### Source Code

```text
src/
├── styles/
│   └── global.css        # [MODIFY] Add html:not([lang="es"]) .lang-es and html[lang="es"] .lang-en rules
├── pages/
│   └── index.astro       # [MODIFY] Remove style.innerHTML string manipulation; simplify inline script
└── components/
    └── Global/
        └── Footer.astro  # [MODIFY] Remove style.innerHTML string manipulation in click handler
```

## Phase 0: Outline & Research
Completed. Documented in `research.md`.

## Phase 1: Design & Contracts
Completed. Documented in `data-model.md`, `quickstart.md`.
