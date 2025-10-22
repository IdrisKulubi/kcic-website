/**
 * Internationalization utilities for KCIC website
 * This file re-exports from both server and client modules
 * 
 * For Server Components: import from '@/lib/i18n' (uses server functions)
 * For Client Components: import from '@/lib/i18n.client' (uses hooks)
 */

// Re-export server-side utilities (safe for both server and client)
export {
  LOCALES,
  getTranslations,
  createTranslationFunction,
  formatDate,
  formatNumber,
  getLocalizedMetadata,
  type LocaleCode,
  type TranslationKey,
  type Namespace,
} from './i18n.server';

// Note: Client-side hooks (useTranslation, useLanguageSwitch) are in i18n.client.ts
// Import them directly from '@/lib/i18n.client' in client components
