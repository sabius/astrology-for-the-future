---
project_name: 'Astrology for the Future'
user_name: 'Sab'
date: '2026-06-09'
sections_completed: ['technology_stack', 'critical_implementation_rules', 'language_specific_rules', 'framework_specific_rules', 'testing_rules', 'code_quality_style_rules', 'development_workflow_rules', 'critical_dont_miss_rules']
existing_patterns_found: 8
status: 'complete'
rule_count: 67
optimized_for_llm: true
---

# Project Context for AI Agents

_This file contains critical rules and patterns that AI agents must follow when implementing code in this project. Focus on unobvious details that agents might otherwise miss._

---

## Technology Stack & Versions

- Node.js 18.17+ with npm 9+ as the required local and build toolchain
- Astro 5 static site generation via `astro@^5.13.10`; no SSR adapter is configured, so output is static by default
- TypeScript configuration inherits `astro/tsconfigs/base`; no standalone `typescript` package is pinned in `package.json`
- Tailwind CSS v4 via `tailwindcss@^4.1.12` and `@tailwindcss/vite@^4.1.12`
- CSS pipeline uses Lightning CSS via `lightningcss@^1.30.1`, plus `postcss@^8.5.6`, `autoprefixer@^10.4.21`, and `cssnano@^7.1.0`
- ESLint flat-config tooling via `eslint@^10.3.0`, `typescript-eslint@^8.59.1`, `@typescript-eslint/parser@^8.59.1`, `@typescript-eslint/eslint-plugin@^8.59.1`, and `eslint-plugin-astro@^1.7.0`
- Formatting via `prettier@^3.8.3` and `prettier-plugin-astro@^0.14.1`
- Content collections use `astro:content` with Astro-managed discriminated Zod schemas; `zod` is not directly pinned as a top-level dependency
- Rich-content rendering uses `marked@^17.0.1` with `isomorphic-dompurify@^2.35.0` for sanitized HTML output
- Deployment posture is static `dist/` output, with the current configured site URL pointing at Cloudflare Pages

## Critical Implementation Rules

- This repo is a content-driven Astro page builder. Pages are authored in `src/content/pages/{locale}/` and rendered dynamically from the `content` array in `src/pages/[...slug].astro`.
- Every new content block must be implemented in three places together: schema in `src/content/config.ts`, component registration in `src/components/componentMap.ts`, and the Astro component itself under `src/components/Sections/` or `src/components/UI/`.
- Content block identifiers are kebab-case strings such as `split-content`, `feature-card`, and `video-section`. Astro component files use PascalCase names such as `SplitContent.astro` and `FeatureCard.astro`.
- Route generation is locale-aware. `en` is the default locale, and English pages may be reachable both with and without the `/en/` prefix. Preserve this behavior when changing routing.
- Documentation pages under `/docs` are intentionally hidden from production builds and only shown in development or Cloudflare Pages preview branches.
- UI translations belong in `src/i18n/en.json` and `src/i18n/es.json`, and locale resolution should continue to flow through `src/i18n/index.ts`.
- Styling is driven by Tailwind v4 plus theme variables in `src/styles/global.css`. Reuse the existing design tokens and avoid introducing parallel color or font systems unless the design direction explicitly changes.
- The codebase uses ESM imports, double quotes, and semicolons consistently. Match existing formatting and keep TypeScript and Astro changes lint-clean.
- No dedicated test framework was discovered. For changes in this repo, validate with the narrowest available executable checks, typically `npm run lint` and `npm run build`.

### Language-Specific Rules

- Use ESM syntax consistently: `import` and `export`, double quotes, and semicolons to match the existing TypeScript and Astro files.
- Prefer Astro-provided type imports where available, such as `type CollectionEntry` and `type GetStaticPaths`, instead of introducing parallel local types.
- For content validation, extend the existing discriminated-union schema model in `src/content/config.ts` using the `z` helper exported from `astro:content`.
- Keep content block contracts schema-first: add or change the schema before relying on new frontmatter fields in section components.
- Preserve current naming conventions across TypeScript-facing code: kebab-case content block ids, PascalCase component filenames, and descriptive camelCase local variables.
- When importing types in Astro or TypeScript files, use explicit type imports where the codebase already does so.
- Keep route and content logic data-driven. Prefer deriving locale, slug, and block behavior from collection entries and config rather than duplicating constants in multiple places.
- Avoid assuming a repo-pinned standalone TypeScript compiler version, because this project inherits Astro's base TypeScript setup instead of pinning `typescript` directly.

### Framework-Specific Rules

- Treat `src/pages/[...slug].astro` as the canonical page-rendering entrypoint for content pages; new page-level behavior should fit the existing content-collection flow unless there is a strong architectural reason to change it.
- Extend the page builder through the existing registry pattern: add the block schema in `src/content/config.ts`, register the component in `src/components/componentMap.ts`, and implement the Astro component in the matching sections or UI directory.
- Preserve the locale-aware route generation logic: English content remains the default locale, and default-locale pages may resolve both with and without the `/en/` prefix.
- Do not bypass content collections for normal authored pages. Page content belongs in `src/content/pages/{locale}/` so it stays schema-validated and localized.
- Keep docs visibility logic intact: `/docs` content should remain excluded from production builds unless the release behavior is intentionally changed.
- Use the existing i18n helpers for UI strings and locale detection rather than duplicating pathname parsing or dictionary-loading logic inside components.
- Keep shared page chrome in layouts and global components such as the base layout, header, footer, meta tags, and WhatsApp button instead of re-implementing them inside individual sections.
- Prefer Astro components and static build-friendly patterns over client-heavy solutions unless interactivity is genuinely required.

### Testing Rules

- Treat `npm run lint` and `npm run build` as the default required validation checks for code changes in this repo unless a task adds a narrower executable test.
- Do not assume Jest, Vitest, Playwright, or Cypress are already configured for the site itself; verify before introducing test commands or test file conventions.
- For schema or content-model changes, validate by ensuring the affected content still conforms to `src/content/config.ts` and the site builds successfully.
- For routing, localization, or layout changes, prefer validating the affected user flow through the generated Astro build rather than inventing unconfigured test infrastructure.
- Keep validation scoped to the changed surface: lint for syntax and rule compliance, build for Astro and content integration, and only add broader test scaffolding when the task explicitly calls for it.
- If a new automated test framework is introduced later, document its config and conventions before relying on it as a default workflow requirement.
- Avoid placeholder or speculative tests that are not runnable in the current repo setup.

### Code Quality & Style Rules

- Match the existing formatting style: double quotes, semicolons, and ESM imports across TypeScript and Astro files.
- Follow the current naming scheme: PascalCase for Astro component files, kebab-case for content block identifiers, and descriptive camelCase for local variables and helper values.
- Keep component responsibilities narrow. Reuse existing layout, global, UI, and section component boundaries instead of collapsing unrelated concerns into a single file.
- Respect the current ESLint setup in `eslint.config.mjs`; new code should remain compatible with the recommended TypeScript and Astro lint rules without introducing local rule bypasses unless there is a documented need.
- Prefer small, schema-aligned changes over ad hoc runtime branching. If content shape changes, update the schema and component contract together.
- Keep comments sparse and useful. Only add comments where they explain non-obvious behavior, such as progressive enhancement or a routing constraint.
- Reuse existing theme tokens, utility classes, and styling patterns before introducing one-off design values or duplicate abstractions.
- When adding client-side behavior in Astro components, keep it progressive and lightweight so the static-first architecture remains intact.

### Development Workflow Rules

- Keep changes scoped to the requested surface area; avoid opportunistic refactors that are not needed for the current task.
- Validate meaningful code changes with the narrowest available executable checks first, typically `npm run lint` and `npm run build` in this repo.
- Treat the project as a static-site deployment target: changes should remain compatible with static `dist/` output unless the architecture is intentionally changed.
- Preserve the existing content and localization workflow by updating both locales when a shared UI or page-content structure change requires parity.
- Prefer task-oriented branch naming similar to the current `feature/...` pattern when creating new branches for work.
- Keep commit messages plain, direct, and descriptive of the actual change instead of using vague placeholders.
- Do not introduce new workflow assumptions such as CI gates, release automation, or mandatory PR templates unless they are explicitly added to the repo.
- When adding new tooling or build steps, document the requirement in the repo docs before treating it as part of the normal workflow.

### Critical Don't-Miss Rules

- Do not add a new content block in only one place. Every block change must keep schema, component registry, and component implementation in sync.
- Do not bypass content collections for normal page authoring. Unvalidated ad hoc data structures will drift from the established page-builder contract.
- Do not break default-locale routing behavior; English pages are expected to work with and without the locale prefix where currently supported.
- Do not ship locale-incomplete UX changes. If shared UI text or mirrored page structure changes, keep EN and ES aligned unless a deliberate exception is documented.
- Do not re-enable docs pages in production accidentally. Preserve the current environment-based docs visibility behavior unless release intent changes.
- Do not introduce client-heavy interactivity when static rendering is sufficient; prefer minimal progressive enhancement to protect performance and maintainability.
- Do not replace or bypass sanitized rich-content handling with unsafe HTML rendering patterns.
- Do not assume unconfigured test frameworks or CI gates exist; rely on runnable repo checks and document any new workflow requirements before enforcing them.
- Do not introduce parallel style or token systems; extend the existing design tokens and utility conventions instead.

---

## Usage Guidelines

**For AI Agents:**

- Read this file before implementing any code.
- Follow all rules as documented.
- When uncertain, prefer the more restrictive and schema-aligned option.
- Update this file when new stable patterns emerge.

**For Humans:**

- Keep this file lean and focused on agent execution needs.
- Update it when stack, routing, schema, or workflow patterns change.
- Review periodically and remove rules that become obsolete or obvious.

Last Updated: 2026-06-09
