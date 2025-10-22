/**
 * Server-side internationalization utilities for KCIC website
 * Simple, maintainable i18n with EN/FR support.
 * Use these functions in Server Components only
 */

import { Metadata } from 'next';
import enTranslations from '../locales/en/common.json';

// Supported locales - English + French
export const LOCALES = {
  en: { code: 'en', name: 'English', flag: '🇬🇧', rtl: false },
  fr: { code: 'fr', name: 'Français', flag: '🇫🇷', rtl: false },
} as const;

export type LocaleCode = keyof typeof LOCALES;
export type TranslationKey = string;
export type Namespace = 'common' | 'navigation' | 'pages' | 'forms';

// Translation cache with namespace support
const translationCache = new Map<string, Record<string, unknown>>();

/**
 * Load translations for a specific locale and namespace
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
 * Server-side function to get translations for a specific locale and namespace
 * Use this in Server Components, generateMetadata, and other server-side contexts
 */
export async function getTranslations(
  locale: LocaleCode,
  namespace: Namespace = 'common'
): Promise<Record<string, unknown>> {
  return loadTranslations(locale, namespace);
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
 * Generate localized metadata with hreflang tags and proper SEO attributes
 * Use this in generateMetadata functions for pages
 */
export function getLocalizedMetadata(
  locale: LocaleCode,
  pagePath: string,
  customMetadata?: Partial<Metadata>
): Metadata {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://kenyacic.org';
  
  // Normalize page path (remove leading/trailing slashes)
  const normalizedPath = pagePath.replace(/^\/+|\/+$/g, '');
  const pathSegment = normalizedPath ? `/${normalizedPath}` : '';
  
  // Build canonical URL for current locale
  const canonicalUrl = `${baseUrl}/${locale}${pathSegment}`;
  
  // Build language alternates with hreflang
  const languages: Record<string, string> = {};
  Object.keys(LOCALES).forEach((loc) => {
    languages[loc] = `${baseUrl}/${loc}${pathSegment}`;
  });
  
  // Add x-default for English
  languages['x-default'] = `${baseUrl}/en${pathSegment}`;
  
  return {
    ...customMetadata,
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: canonicalUrl,
      languages,
      ...customMetadata?.alternates,
    },
    openGraph: {
      locale: locale,
      url: canonicalUrl,
      siteName: 'Kenya Climate Innovation Center',
      type: 'website',
      ...customMetadata?.openGraph,
    },
    twitter: {
      card: 'summary_large_image',
      ...customMetadata?.twitter,
    },
    robots: {
      index: true,
      follow: true,
      ...customMetadata?.robots,
    },
  };
}
