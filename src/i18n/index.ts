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

interface AstroContext {
  currentLocale?: string;
}

export function getCurrentLocaleFromAstro(Astro: AstroContext): string {
  return Astro?.currentLocale || 'en';
}
