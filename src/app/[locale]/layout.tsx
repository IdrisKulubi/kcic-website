import { notFound } from 'next/navigation';
import { ReactNode } from 'react';
import { LocaleProvider } from '@/contexts/locale-context';
import { getTranslations, LocaleCode } from '@/lib/i18n';

const locales = ['en', 'fr'];

interface LocaleLayoutProps {
  children: ReactNode;
  params: { locale: string };
}

export default async function LocaleLayout({ children, params: { locale } }: LocaleLayoutProps) {
  // Validate that the locale is supported
  if (!locales.includes(locale)) {
    notFound();
  }

  // Load translations for the locale
  const translations = await getTranslations(locale as LocaleCode, 'common');

  return (
    <html lang={locale}>
      <body>
        <LocaleProvider locale={locale as LocaleCode} translations={translations}>
          {children}
        </LocaleProvider>
      </body>
    </html>
  );
}

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}