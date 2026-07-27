<!--
Sync Impact Report
------------------
Version Change: Initial Template -> 1.0.0
Type of Bump: Initial Ratification

Modified / Added Principles:
- Added: Principle I: Code Quality & Architecture Discipline
- Added: Principle II: Testing Standards & Quality Gates
- Added: Principle III: User Experience Consistency & i18n Parity
- Added: Principle IV: Performance Requirements & Core Web Vitals

Added Sections:
- Technical Constraints & Architecture Standards
- Development & Quality Workflow
- Governance Rules

Templates Status:
- ✅ .specify/templates/plan-template.md (Constitution Check gate aligned)
- ✅ .specify/templates/spec-template.md (Requirements & success criteria aligned)
- ✅ .specify/templates/tasks-template.md (Quality gates and testing discipline aligned)

Deferred Items / TODOs: None
-->

# Astrology for the Future Constitution

## Core Principles

### Principle I: Code Quality & Architecture Discipline
- **Strict Typing**: All TypeScript code MUST compile cleanly under strict mode with zero `any` types or suppressed compiler warnings.
- **Page Builder Schema Compliance**: Page section components residing in `src/components/Sections/` MUST strictly comply with Zod content schemas defined in `src/content/config.ts` and registered within `src/components/componentMap.ts`.
- **Modular Component Isolation**: Components MUST be single-responsibility, highly reusable, and free of untyped prop drilling or unhandled visual state fallbacks.
- **Maintainable & Self-Documenting**: Code structure MUST favor explicit naming, clean interfaces, and clear separation of content data (Content Collections) from presentational logic.

### Principle II: Testing Standards & Quality Gates
- **Automated Validation**: All Content Collection Zod schemas, helper utilities, and i18n lookup routines MUST be covered by unit tests.
- **Zero Regression Quality Gate**: Builds (`npm run build`) MUST execute without errors or unhandled warnings before code is merged into `main`.
- **Test Integrity**: Tests MUST be written to validate actual contracts and outcomes. Disabling assertions, mocking away core functionality without justification, or skipping failing tests is strictly prohibited.
- **i18n Key Parity**: Dictionaries (`src/i18n/en.json`, `src/i18n/es.json`) MUST maintain 100% key completeness across all supported locales, validated programmatically.

### Principle III: User Experience Consistency & i18n Parity
- **Unified Design System**: All section components MUST strictly adhere to the central design system tokens, typography scales, and color schemes defined in `styles/global.css` and Tailwind CSS v4.
- **Rich & Premium Aesthetics**: Interfaces MUST deliver a polished, modern visual feel (curated harmonious color palettes, dark/light visual harmony, fluid transitions, micro-animations) while avoiding generic default browser styling.
- **Complete Multilingual Parity**: Content and layout quality MUST remain structurally identical and accessible across all languages (e.g., English and Spanish). Hardcoded UI text outside of i18n dictionary files or Content Collections is strictly forbidden.

### Principle IV: Performance Requirements & Core Web Vitals
- **Static Site Generation (SSG)**: Astro 5 SSG MUST be leveraged to pre-render static HTML. Client-side JavaScript MUST be minimized, reserving client directives (`client:load`, `client:visible`) strictly for interactive components requiring dynamic client state.
- **Core Web Vitals Targets**: All pages MUST target and maintain top-tier Web Vitals metrics:
  - **LCP (Largest Contentful Paint)**: < 2.5 seconds
  - **CLS (Cumulative Layout Shift)**: < 0.1
  - **INP (Interaction to Next Paint)**: < 200 ms
- **Asset Optimization**: Images MUST utilize modern WebP/AVIF formats with explicit dimensions, optimized responsive loading (`loading="lazy"` for below-the-fold content), and Lightning CSS transforms.

## Technical Constraints & Architecture Standards

- **Core Tech Stack**: Astro 5 (Static Site Generation), TypeScript (Strict Mode), Tailwind CSS v4, Lightning CSS, Zod schema validation.
- **Page Builder Architecture**: Content defined in `src/content/pages/[lang]/` as Markdown/Frontmatter with structured component arrays. Section rendering dispatch via `src/pages/[...slug].astro` and `src/components/componentMap.ts`.
- **Localization Pattern**: Content translations organized by language folder (`src/content/pages/en/`, `src/content/pages/es/`); UI strings driven by dictionary files in `src/i18n/`.

## Development & Quality Workflow

- **Shell Execution Standard**: Agents MUST NOT execute terminal commands via PowerShell on Windows. Agents MUST use Git Bash (e.g. `& "C:\Program Files\Git\bin\bash.exe" -l -c "<command>"` or bash shell invocation) to ensure node environment variables, PATH configuration, and bash scripts run reliably.
- **No Automatic Commits or Pushes**: Agents MUST NEVER run `git commit`, `git push`, or automatically stage/commit code changes unless the user explicitly requests it in their message. Always leave code changes unstaged and uncommitted for explicit user review.
- **Pre-Commit / Pre-PR Validation**: Code changes MUST pass type checking, linting, unit tests, and local SSG build compilation (`npm run build`).
- **Feature Specification & Planning**: All non-trivial features MUST undergo formal specification (`/speckit-specify`) and implementation planning (`/speckit-plan`), including an explicit Constitution Check gate.
- **Code Reviews**: PRs MUST be reviewed for adherence to this Constitution, design system consistency, and zero breaking changes to Content Collection schemas.


## Governance

- **Supremacy**: This Constitution supersedes informal team conventions. All architectural decisions, pull requests, and feature plans MUST align with these principles.
- **Amendment Process**: Amendments to this Constitution require explicit documentation, approval by project maintainers, a documented migration path for affected content schemas or components, and a semantic version bump.
- **Versioning Policy**:
  - **MAJOR**: Removal or incompatible redefinition of a core principle or governance policy.
  - **MINOR**: Addition of new principles, structural sections, or material expansion of guidelines.
  - **PATCH**: Non-semantic rewording, clarifications, or formatting fixes.
- **Compliance Review**: Regular compliance checks MUST be performed during planning (`/speckit-plan`) and code review phases.

**Version**: 1.0.0 | **Ratified**: 2026-07-26 | **Last Amended**: 2026-07-26
