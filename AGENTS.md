# Instructions for LLM Agents

## Project Overview
This is a **Multilingual Astro 5 Website** utilizing a "page builder" architecture driven by Content Collections.
- **Framework**: Astro 5 (Static Site Generation)
- **Styling**: Tailwind CSS v4 (with Lightning CSS transformer)
- **Language**: TypeScript
- **i18n**: Astro built-in routing + JSON dictionaries

## Architecture & Logic

### 1. Page Builder System
The core logic resides in `src/pages/[...slug].astro`.
- This file reads content from `src/content/pages`.
- It iterates over the `content` array defined in the frontmatter of each page.
- It dynamically renders components based on the `component` key (e.g., 'hero', 'split-content').

### 2. Content Structure (`src/content/`)
Pages are defined as Markdown/Frontmatter files in `src/content/pages/[lang]/`.
Example Frontmatter:
```yaml
meta:
  title: "My Page"
  description: "..."
content:
  - component: hero
    header: "Welcome"
    copy: "..."
  - component: feature-card
    ...
```

### 3. Component Mapping
- **Map File**: `src/components/componentMap.ts` maps string keys (used in frontmatter) to actual Astro components.
- **Schemas**: `src/content/config.ts` defines the Zod schemas for each component block.
- **Locations**: Section components generally live in `src/components/Sections/`.

## Common Tasks

### How to Add a New Page
1. Create a new `.md` file in `src/content/pages/[lang]/`.
2. Define the `meta` object and the `content` array in the frontmatter.

### How to Create a New Section Component
1. **Create the Component**: Add your new `.astro` file in `src/components/Sections/`.
   - Ensure it accepts props consistent with what you plan to define in the schema.
2. **Define Schema**: Add a Zod schema object in `src/content/config.ts` for this new block.
   - Add it to the `z.union([...])` if it exists, or the main page schema.
3. **Register Component**: Import it in `src/components/componentMap.ts` and add it to the `components` export object.
4. **Usage**: You can now use the new component key in any content file's frontmatter.

### How to Handle i18n
- **Content**: Translated content should exist in `src/content/pages/es/` (or other languages).
- **UI Strings**: Use `src/i18n/index.ts`.
  - Add keys to `src/i18n/en.json` and `src/i18n/es.json`.
  - Use the helper `t(key, currentLocale)` or `entry.slug` detection to switch languages.

## Styling
- Use **Tailwind CSS v4**.
- `styles/global.css` contains global imports and base styles.

## Development & Build
- `npm run dev`: Start dev server.
- `npm run build`: Build for production.
