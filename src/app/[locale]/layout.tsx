import { notFound } from 'next/navigation';
import { ReactNode } from 'react';

const locales = ['en', 'fr'];

interface LocaleLayoutProps {
  children: ReactNode;
  params: { locale: string };
}

export default function LocaleLayout({ children, params: { locale } }: LocaleLayoutProps) {
  // Validate that the locale is supported
  if (!locales.includes(locale)) {
    notFound();
  }

  return <>{children}</>;
}

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}