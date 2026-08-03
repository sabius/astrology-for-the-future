# Feature Specification: Lit Web Components & Root Localization Refactoring

**Feature Branch**: `005-css-attribute-localization`
**Created**: 2026-08-03
**Status**: Draft
**Input**: User request: Install and integrate Lit Web Components (`lit`), refactor root domain localization and footer language switcher to use Lit components, and update project documentation (`AGENTS.md`) so all agents know Lit is used.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Lit Language Switcher Component (Priority: P1)

As a user, I want the language switcher in the footer and locale provider on the page to be built using Lit Web Components, so that client-side language switching is reactive, encapsulated, and clean.

**Why this priority**: Web Components built with Lit provide standard DOM encapsulation, reactive state updates, and zero hardcoded script string injections.

**Independent Test**: Load `/` and click the Lit language switcher in the footer (`<language-switcher>`).
- Verify `document.documentElement.lang` updates reactively.
- Verify `user_lang` persists in `localStorage`.

---

### User Story 2 - Documentation Update for Agents (Priority: P1)

As a developer and AI agent, I want `AGENTS.md` and project architecture docs to document Lit Web Component usage, so that future development follows established Lit patterns.

**Why this priority**: Clear documentation ensures all LLM agents understand the project stack and use Lit for interactive custom elements.

---

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: Install `lit` and `@astrojs/lit` dependencies in `package.json` and configure `astro.config.mjs`.
- **FR-002**: Create Lit custom components under `src/components/Lit/`:
  - `LanguageSwitcher.ts`: `<language-switcher>` component managing locale selection and dispatching `locale-change` events.
  - `LocaleScope.ts`: `<locale-scope>` component reacting to language state.
- **FR-003**: Update `AGENTS.md` to list Lit Web Components as a core project technology under **Framework & Architecture**.
- **FR-004**: Refactor `Footer.astro` to use `<language-switcher>`.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Lit dependency installed and active in `astro.config.mjs`.
- **SC-002**: `AGENTS.md` contains explicit guidelines for Lit Web Components.
- **SC-003**: `npm run build` completes with 0 errors and 0 warnings.
