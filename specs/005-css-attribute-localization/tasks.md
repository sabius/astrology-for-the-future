# Tasks: Lit Web Components & Root Localization Refactoring

**Feature Branch**: `005-css-attribute-localization`
**Spec**: [spec.md](file:///d:/Projects/astrology-for-the-future/specs/005-css-attribute-localization/spec.md)
**Plan**: [plan.md](file:///d:/Projects/astrology-for-the-future/specs/005-css-attribute-localization/plan.md)

## Tasks List

### Phase 1: Setup & Project Documentation

- [x] **Task 1.1: Install Lit Dependencies**
  - Run `npm install lit @astrojs/lit` using Git Bash.
  - Register `lit()` integration in `astro.config.mjs`.

- [x] **Task 1.2: Update AGENTS.md Guidelines**
  - Update `AGENTS.md` to document **Lit Web Components** (`lit`) as an established framework technology for interactive client UI.

---

### Phase 2: Lit Component Implementation

- [x] **Task 2.1: Create Lit Language Switcher Component (`src/components/Lit/LanguageSwitcher.ts`)**
  - Create `<language-switcher>` custom element extending `LitElement`.
  - Handle locale selection (`en` / `es`), `localStorage` persistence, and `document.documentElement.lang` updates.

- [x] **Task 2.2: Add Declarative CSS Language Rules (`src/styles/global.css`)**
  - Add attribute-based CSS rules for `html:not([lang="es"]) .lang-es` and `html[lang="es"] .lang-en`.

---

### Phase 3: Integration & Cleanup

- [x] **Task 3.1: Refactor `src/pages/index.astro`**
  - Remove all inline `style.innerHTML` string manipulations.
  - Simplify inline pre-paint script to set `document.documentElement.lang`.

- [x] **Task 3.2: Refactor `src/components/Global/Footer.astro`**
  - Integrate Lit `<language-switcher>` component in the footer.

---

### Phase 4: Verification & Build

- [x] **Task 4.1: Production Build Verification**
  - Run `npm run build` via Git Bash to confirm clean compilation and zero warnings.
