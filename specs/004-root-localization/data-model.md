# Data Model & Schema Definitions: Root Domain Localization

## Entities & Interfaces

### 1. Locale Type & Configuration
Defines supported locales and fallback rules.

```typescript
// src/i18n/types.ts or src/i18n/index.ts
export const SUPPORTED_LOCALES = ['en', 'es'] as const;
export type Locale = (typeof SUPPORTED_LOCALES)[number];
export const DEFAULT_LOCALE: Locale = 'en';

export interface LanguageDetectionResult {
  locale: Locale;
  source: 'storage' | 'browser' | 'default';
}
```

### 2. Browser Language Detection Contract (Client Script)
Logic executed synchronously in document `<head>` on root page `/`:

```typescript
function detectUserLocale(): Locale {
  try {
    const saved = localStorage.getItem('user_lang');
    if (saved === 'en' || saved === 'es') return saved;
  } catch (e) {
    // localStorage disabled/blocked
  }

  const browserLang = (navigator.language || navigator.userLanguage || '').toLowerCase();
  if (browserLang.startsWith('es')) return 'es';
  return 'en';
}
```

### 3. Root Page Content Structure (`src/pages/index.astro`)
Data structure passed to Astro pre-rendering logic:

```typescript
interface RootPageProps {
  enPage: CollectionEntry<'pages'>;
  esPage: CollectionEntry<'pages'>;
}
```

### 4. Navigation & Language Switcher Persistence
Event schema for updating user language preference:

```typescript
interface LanguageChangeEvent {
  targetLocale: Locale;
  persist: boolean;
}
```
When user switches language, `localStorage.setItem('user_lang', targetLocale)` is called to persist choice across sessions.
