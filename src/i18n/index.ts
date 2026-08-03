// src/i18n/index.ts

const locales = {
  en: () => import("./en.json").then((m) => m.default),
  es: () => import("./es.json").then((m) => m.default),
};

export async function t(key: string, locale: string = "en"): Promise<string> {
  if (!(locale in locales)) locale = "en";
  const dict = await locales[locale]();
  return dict && key in dict ? dict[key] : key;
}

export const SUPPORTED_LOCALES = ["en", "es"] as const;
export type Locale = (typeof SUPPORTED_LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "en";

interface AstroContext {
  url: URL;
}

/**
 * Derives the current locale from the URL pathname.
 * e.g. /es/contact -> 'es', /en/videos -> 'en', /videos -> 'en'
 */
export function getCurrentLocaleFromAstro(Astro: AstroContext): Locale {
  const [, maybeLocale] = Astro.url.pathname.split("/");
  return SUPPORTED_LOCALES.find((l) => l === maybeLocale) ?? DEFAULT_LOCALE;
}

/**
 * Client-side helper to detect preferred locale from localStorage or navigator.language.
 */
export function detectUserLocale(): Locale {
  if (typeof window === "undefined") return DEFAULT_LOCALE;
  try {
    const saved = localStorage.getItem("user_lang");
    if (saved === "en" || saved === "es") return saved;
  } catch (e) {
    // localStorage unavailable or blocked
  }

  const nav = typeof navigator !== "undefined" ? navigator : null;
  const browserLang = (
    nav?.language ||
    (nav as any)?.userLanguage ||
    ""
  ).toLowerCase();

  if (browserLang.startsWith("es")) return "es";
  return DEFAULT_LOCALE;
}

/**
 * Client-side helper to persist user locale choice.
 */
export function saveUserLocale(locale: Locale): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem("user_lang", locale);
  } catch (e) {
    // localStorage unavailable
  }
}

