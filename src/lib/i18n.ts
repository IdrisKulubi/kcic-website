/**
 * Internationalization utilities for KCIC website
 * Simple, maintainable i18n with EN/FR support.
 */

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import enTranslations from '../locales/en/common.json';

// Supported locales - English + French
export const LOCALES = {
  en: { code: 'en', name: 'English', flag: '🇬🇧', rtl: false },
  fr: { code: 'fr', name: 'Français', flag: '🇫🇷', rtl: false },
} as const;

export type LocaleCode = keyof typeof LOCALES;
export type TranslationKey = string;

// Translation cache
const translationCache = new Map<string, Record<string, unknown>>();

/**
 * Load translations for a specific locale
 */
async function loadTranslations(locale: LocaleCode): Promise<Record<string, unknown>> {
  const cacheKey = `translations-${locale}`;
  
  if (translationCache.has(cacheKey)) {
    const cached = translationCache.get(cacheKey);
    if (cached) return cached;
  }

  try {
    if (locale === 'en') {
      translationCache.set(cacheKey, enTranslations as unknown as Record<string, unknown>);
      return enTranslations as unknown as Record<string, unknown>;
    }
    // Dynamic import of translation files for non-default locales
    const translations = await import(`../locales/${locale}/common.json`);
    translationCache.set(cacheKey, translations.default);
    return translations.default;
  } catch (error) {
    console.warn(`Failed to load translations for locale: ${locale}`, error);
    // Fallback to English
    if (locale !== 'en') {
      return loadTranslations('en');
    }
    return enTranslations as unknown as Record<string, unknown>;
  }
}

/**
 * Get nested translation value using dot notation
 */
function getNestedTranslation(obj: Record<string, unknown>, path: string): string {
  const result = path.split('.').reduce((current: unknown, key: string) => {
    return current && typeof current === 'object' && current !== null && key in (current as Record<string, unknown>) 
      ? (current as Record<string, unknown>)[key] 
      : null;
  }, obj as unknown);
  
  return typeof result === 'string' ? result : '';
}

/**
 * Translation function with interpolation support
 */
export function createTranslationFunction(translations: Record<string, unknown>) {
  return function t(key: TranslationKey, params?: Record<string, string | number>): string {
    let translation = getNestedTranslation(translations, key);

    // Fallback to key if translation not found
    if (!translation) {
      translation = key;
    }

    // Simple interpolation support
    if (params && typeof translation === 'string') {
      Object.entries(params).forEach(([param, value]) => {
        translation = translation.replace(new RegExp(`{{${param}}}`, 'g'), String(value));
      });
    }

    return translation;
  };
}

/**
 * Hook for using translations in components
 */
export function useTranslation() {
  const [locale, setLocale] = useState<LocaleCode>('en');
  const [translations, setTranslations] = useState<Record<string, unknown>>(enTranslations as unknown as Record<string, unknown>);

  // Detect locale from path (/fr/...) or ?locale=fr (fallback)
  useEffect(() => {
    const pathSeg = window.location.pathname.split('/')[1];
    const paramSeg = new URLSearchParams(window.location.search).get('locale');
    const detected = (pathSeg in LOCALES ? pathSeg : paramSeg) || 'en';
    setLocale(detected as LocaleCode);
  }, []);

  // Load translations when locale changes
  useEffect(() => {
    async function loadAndSetTranslations() {
      try {
        const loadedTranslations = await loadTranslations(locale);
        setTranslations(loadedTranslations);
      } catch (error) {
        console.error('Failed to load translations:', error);
      }
    }

    loadAndSetTranslations();
  }, [locale]);

  const t = createTranslationFunction(translations);
  
  return {
    t,
    locale,
    isLoading: false,
    localeConfig: LOCALES[locale] || LOCALES.en,
  };
}

/**
 * Hook for language switching
 */
export function useLanguageSwitch() {
  const router = useRouter();
  const [currentLocale, setCurrentLocale] = useState<LocaleCode>('en');
  const availableLocales = Object.keys(LOCALES) as LocaleCode[];

  // Get current locale from path or query param
  useEffect(() => {
    const pathSeg = window.location.pathname.split('/')[1];
    const paramSeg = new URLSearchParams(window.location.search).get('locale');
    const detected = (pathSeg in LOCALES ? pathSeg : paramSeg) || 'en';
    setCurrentLocale(detected as LocaleCode);
  }, []);

  const switchLanguage = (newLocale: LocaleCode) => {
    // Update document direction for RTL languages
    const isRtl = LOCALES[newLocale]?.rtl || false;
    document.documentElement.dir = isRtl ? 'rtl' : 'ltr';
    document.documentElement.lang = newLocale;
    
    // Build new path with locale prefix (/fr) while preserving the rest of the path
    const segments = window.location.pathname.split('/');
    const first = segments[1];
    const hasLocalePrefix = first in LOCALES;
    const restPath = hasLocalePrefix ? `/${segments.slice(2).join('/')}` : window.location.pathname;
    const basePath = restPath === '' ? '/' : restPath;

    const newPath = newLocale === 'en' 
      ? basePath 
      : `/${newLocale}${basePath === '/' ? '' : basePath}`;

    // Preserve existing non-locale query params
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.delete('locale');
    const qs = searchParams.toString();
    const newUrl = qs ? `${newPath}?${qs}` : newPath;

    router.push(newUrl);
  };

  return {
    currentLocale,
    availableLocales,
    switchLanguage,
    localeConfig: LOCALES[currentLocale] || LOCALES.en,
  };
}

/**
 * Format date according to locale
 */
export function formatDate(date: Date, locale: LocaleCode): string {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  return new Intl.DateTimeFormat(locale, options).format(date);
}

/**
 * Format number according to locale
 */
export function formatNumber(number: number, locale: LocaleCode): string {
  return new Intl.NumberFormat(locale).format(number);
}

/**
 * Utility to get page metadata in current locale
 */
export function getLocalizedMetadata(baseMetadata: Record<string, unknown>, locale: LocaleCode) {
  const alternates = baseMetadata.alternates && typeof baseMetadata.alternates === 'object' 
    ? baseMetadata.alternates as Record<string, unknown>
    : {};
    
  const openGraph = baseMetadata.openGraph && typeof baseMetadata.openGraph === 'object'
    ? baseMetadata.openGraph as Record<string, unknown>
    : {};
  
  return {
    ...baseMetadata,
    alternates: {
      ...alternates,
      languages: Object.keys(LOCALES).reduce((acc, loc) => {
        acc[loc] = `https://kenyacic.org${loc === 'en' ? '' : `/${loc}`}`;
        return acc;
      }, {} as Record<string, string>),
    },
    openGraph: {
      ...openGraph,
      locale: locale,
    },
  };
}
