'use client';

/**
 * Client-side internationalization utilities for KCIC website
 * Use these hooks in Client Components only
 */

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import enTranslations from '../locales/en/common.json';
import { LOCALES, LocaleCode, Namespace, TranslationKey, createTranslationFunction } from './i18n.server';

// Translation cache with namespace support
const translationCache = new Map<string, Record<string, unknown>>();

/**
 * Load translations for a specific locale and namespace (client-side)
 */
async function loadTranslations(
  locale: LocaleCode, 
  namespace: Namespace = 'common'
): Promise<Record<string, unknown>> {
  const cacheKey = `translations-${locale}-${namespace}`;
  
  if (translationCache.has(cacheKey)) {
    const cached = translationCache.get(cacheKey);
    if (cached) return cached;
  }

  try {
    // For English common namespace, use static import
    if (locale === 'en' && namespace === 'common') {
      translationCache.set(cacheKey, enTranslations as unknown as Record<string, unknown>);
      return enTranslations as unknown as Record<string, unknown>;
    }
    
    // Dynamic import of translation files
    const translations = await import(`../locales/${locale}/${namespace}.json`);
    translationCache.set(cacheKey, translations.default);
    return translations.default;
  } catch (error) {
    console.warn(`Failed to load translations for locale: ${locale}, namespace: ${namespace}`, error);
    
    // Fallback to English for the same namespace
    if (locale !== 'en') {
      try {
        const fallbackTranslations = await import(`../locales/en/${namespace}.json`);
        return fallbackTranslations.default;
      } catch (fallbackError) {
        console.warn(`Failed to load fallback translations for namespace: ${namespace}`, fallbackError);
      }
    }
    
    // Final fallback to English common
    if (namespace !== 'common') {
      return loadTranslations('en', 'common');
    }
    
    return enTranslations as unknown as Record<string, unknown>;
  }
}

/**
 * Hook for using translations in components
 */
export function useTranslation(namespace: Namespace = 'common') {
  const [locale, setLocale] = useState<LocaleCode>('en');
  const [translations, setTranslations] = useState<Record<string, unknown>>(enTranslations as unknown as Record<string, unknown>);

  // Detect locale from path (/fr/...) or ?locale=fr (fallback)
  useEffect(() => {
    const pathSeg = window.location.pathname.split('/')[1];
    const paramSeg = new URLSearchParams(window.location.search).get('locale');
    const detected = (pathSeg in LOCALES ? pathSeg : paramSeg) || 'en';
    setLocale(detected as LocaleCode);
  }, []);

  // Load translations when locale or namespace changes
  useEffect(() => {
    async function loadAndSetTranslations() {
      try {
        const loadedTranslations = await loadTranslations(locale, namespace);
        setTranslations(loadedTranslations);
      } catch (error) {
        console.error('Failed to load translations:', error);
      }
    }

    loadAndSetTranslations();
  }, [locale, namespace]);

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
