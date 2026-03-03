// src/i18n/index.ts

const locales = {
  en: () => import('./en.json').then(m => m.default),
  es: () => import('./es.json').then(m => m.default),
};

export async function t(key: string, locale: string = 'en'): Promise<string> {
  if (!(locale in locales)) locale = 'en';
  const dict = await locales[locale]();
  return dict && key in dict ? dict[key] : key;
}

const SUPPORTED_LOCALES = ['en', 'es'] as const;
type Locale = typeof SUPPORTED_LOCALES[number];

interface AstroContext {
  url: URL;
}

/**
 * Derives the current locale from the URL pathname.
 * e.g. /es/contact -> 'es', /en/videos -> 'en', /videos -> 'en'
 */
export function getCurrentLocaleFromAstro(Astro: AstroContext): Locale {
  const [, maybeLocale] = Astro.url.pathname.split('/');
  return (SUPPORTED_LOCALES as readonly string[]).includes(maybeLocale)
    ? (maybeLocale as Locale)
    : 'en';
}
