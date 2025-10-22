'use client';

import { createContext, useContext, ReactNode, useMemo } from 'react';
import {
  LocaleCode,
  LOCALES,
  createTranslationFunction,
  formatDate as formatDateUtil,
  formatNumber as formatNumberUtil,
  Namespace,
} from '@/lib/i18n';

interface LocaleContextValue {
  locale: LocaleCode;
  t: (key: string, params?: Record<string, string | number>) => string;
  formatDate: (date: Date) => string;
  formatNumber: (num: number) => string;
  formatCurrency: (amount: number, currency?: string) => string;
  localeConfig: typeof LOCALES[LocaleCode];
}

const LocaleContext = createContext<LocaleContextValue | undefined>(undefined);

interface LocaleProviderProps {
  locale: LocaleCode;
  translations: Record<string, unknown>;
  children: ReactNode;
}

export function LocaleProvider({ locale, translations, children }: LocaleProviderProps) {
  const value = useMemo<LocaleContextValue>(() => {
    const t = createTranslationFunction(translations);
    
    return {
      locale,
      t,
      formatDate: (date: Date) => formatDateUtil(date, locale),
      formatNumber: (num: number) => formatNumberUtil(num, locale),
      formatCurrency: (amount: number, currency: string = 'KES') => {
        return new Intl.NumberFormat(locale, {
          style: 'currency',
          currency,
        }).format(amount);
      },
      localeConfig: LOCALES[locale],
    };
  }, [locale, translations]);

  return (
    <LocaleContext.Provider value={value}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale(): LocaleContextValue {
  const context = useContext(LocaleContext);
  
  if (context === undefined) {
    throw new Error('useLocale must be used within a LocaleProvider');
  }
  
  return context;
}
