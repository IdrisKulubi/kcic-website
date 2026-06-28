import { notFound } from 'next/navigation';
import { ReactNode } from 'react';

const locales = ['en', 'fr'];

interface LocaleLayoutProps {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = await params;
  
  // Validate that the locale is supported
  if (!locales.includes(locale)) {
    notFound();
  }

  return <>{children}</>;
}

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}