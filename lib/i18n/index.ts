// lib/i18n/index.ts
// Vedesh owns this — Phase 1

export type Locale = 'en' | 'hi' | 'kn';

// Will be filled out in Phase 1 with ~30 keys
export const strings: Record<Locale, Record<string, string>> = {
  en: {},
  hi: {},
  kn: {},
};

export function t(key: string, locale: Locale = 'en'): string {
  return strings[locale][key] ?? strings['en'][key] ?? key;
}
