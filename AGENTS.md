# Instructions for LLM Agents

## Project Overview

This is a **Multilingual Astro 5 Website** utilizing a "page builder" architecture driven by Content Collections.

- **Framework**: Astro 5 (Static Site Generation)
- **Web Components**: Lit (`lit` + `@astrojs/lit`) for interactive client-side components
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

### How to Create a Lit Web Component

1. Add your Lit component class extending `LitElement` in `src/components/Lit/YourComponent.ts`.
2. Register the custom element using `@customElement('your-component')` or `customElements.define('your-component', YourComponent)`.
3. Import and use it in Astro pages/components using `<your-component client:only="lit" />` or standard custom element tags.

## Styling

- Use **Tailwind CSS v4** and follow `design.md` (**Astrolabio Nocturno** design system).
- `src/styles/global.css` contains global imports and semantic theme tokens.

## Brand Voice, Copy Ethics & Biographical Ground Truth

All copy written or edited for this site (English and Spanish) MUST stay strictly faithful to Dr. Glenda Ferreira's authentic voice, ethical standards, and verified biography:

### 1. Tone & Ethical Guardrails
- **Calm, grounded, reflective, and humble**: Frame astrology as a **symbolic language for reflecting on human experience**, recurring patterns, personal challenges, karmic/spiritual questions, life lessons, and periods of transition.
- **NEVER promise what astrology cannot deliver**: Do NOT write claims that guarantee outcomes, predict a fixed fate, cure/diagnose medical conditions, or promise certainty/answers (*avoid* "unlock your destiny", "align with the rhythm of the universe", "guided by the universe", "cosmic weather", "journey through the stars", "revelations", "guaranteed clarity", or New-Age/Instagram marketing clichés).
- Prefer invitational, reflective phrasing: *"an invitation to explore..."*, *"offers a different perspective..."*, *"encourages a more conscious understanding..."*, *"tool for self-understanding"*.

### 2. Verified Career & Biography (Do Not Invent or Inflate)
- **Medical background**: Physician (`M.D.`), studied Medicine four decades ago (Colegio Mayor de Nuestra Señora del Rosario, 1983), with a specialization in **Public Health Management** (2000).
  - **English title rule**: Always refer to her as **"physician"** or **"Glenda Ferreira, M.D."** — NEVER **"surgeon"** in English (in Colombia *Médica Cirujana* is the general M.D. diploma title, not a surgical specialty).
- **Astrology lineage & training**:
  - Began studying astrology in the early 1990s after a personal consultation with Colombian astrologer **Germán Rodríguez Sanabria**.
  - Studied with respected astrologers including **Mauricio Puerta**, **Deborah Houlding**, and **Dr. Lee Lehman** (including School of Traditional Astrology, 2022–2024).
  - Areas of study: **traditional astrology**, **horary astrology**, and **medical astrology** (exploring the relationship between astrological symbolism and health).
- **Practice & Teaching**:
  - Offering consultations since the **late 1990s** (**nearly three decades of experience**).
  - Continues to practice, teach, and study astrology.
  - Works as a **translator and interpreter** for the **Traditional Medical Astrology Program** at **Astrología Campus Virtual**.
  - Do NOT inflate roles (e.g., do not invent academic titles she hasn't claimed).

### 3. Services & Consultation Scope
- **Formats**: In-person (Bogotá) and online consultations via **Zoom**, recorded in high quality, available in **English and Spanish** worldwide.
- **Core offerings**: Natal Chart Reading (*Lectura de Carta Natal*), Relationship Astrology / Synastry & Composite Charts (*Astrología de Relaciones*), Predictive Astrology / Transits, Progressions & Solar Returns (*Astrología Predictiva*), Medical Astrology perspective (symbolic, never replacing clinical medical care), and personalized Digital Gift Cards (*Tarjeta Regalo*).
- **Booking channels**: WhatsApp (`+57 305 431 5796`) and email (`astrologyforthefuture@gmail.com`).

## Shell & Environment Rules

- **Use Git Bash for Commands**: Agents MUST NOT run terminal commands using PowerShell. Agents MUST use Git Bash (e.g. `& "C:\Program Files\Git\bin\bash.exe" -l -c "<command>"` or bash shell invocation) for all shell commands on Windows to ensure Node.js environment paths, bash profiles, and Unix-style utilities execute properly.

## Git & Version Control Rules

- **NEVER Commit or Push Automatically**: Agents MUST NEVER run `git commit`, `git push`, or stage/commit code changes automatically unless the user explicitly requests it in their message. Always leave code changes unstaged/uncommitted for the user to review.

## Development & Build

- `npm run build`: Build for production.
- `npm run dev`: Start dev server.


