import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Supported locales
const locales = ['en', 'fr'] as const;
type Locale = typeof locales[number];
const defaultLocale: Locale = 'en';

// Cookie name for locale persistence
const LOCALE_COOKIE = 'NEXT_LOCALE';

/**
 * Get the preferred locale from various sources
 * Priority: URL path > Cookie > Accept-Language header > Default
 */
function getLocale(request: NextRequest): Locale {
  const { pathname } = request.nextUrl;
  
  // Check if locale is in the pathname
  const pathnameLocale = locales.find(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );
  if (pathnameLocale) return pathnameLocale;

  // Check cookie
  const cookieLocale = request.cookies.get(LOCALE_COOKIE)?.value;
  if (cookieLocale && locales.includes(cookieLocale as Locale)) {
    return cookieLocale as Locale;
  }

  // Check Accept-Language header
  const acceptLanguage = request.headers.get('accept-language');
  if (acceptLanguage) {
    // Parse Accept-Language header (e.g., "fr-FR,fr;q=0.9,en-US;q=0.8,en;q=0.7")
    const languages = acceptLanguage
      .split(',')
      .map((lang) => {
        const [code] = lang.trim().split(';');
        return code.split('-')[0]; // Get base language code (fr from fr-FR)
      });

    // Find first matching locale
    const matchedLocale = languages.find((lang) => 
      locales.includes(lang as Locale)
    );
    if (matchedLocale) return matchedLocale as Locale;
  }

  // Default to English
  return defaultLocale;
}

export function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  // Skip middleware for:
  // - API routes
  // - Next.js internals (_next)
  // - Static files (images, icons, etc.)
  // - Files with extensions
  // - Public files (manifest, robots, sw.js, etc.)
  const shouldSkip =
    pathname.startsWith('/api') ||
    pathname.startsWith('/_next') ||
    pathname.startsWith('/images') ||
    pathname.startsWith('/video') ||
    pathname.startsWith('/icons') ||
    pathname.includes('.') ||
    pathname === '/manifest.json' ||
    pathname === '/robots.txt' ||
    pathname === '/sw.js' ||
    pathname === '/offline.html';

  if (shouldSkip) {
    return NextResponse.next();
  }

  // Check if pathname already has a locale
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  // If pathname already has locale, just continue
  if (pathnameHasLocale) {
    const response = NextResponse.next();
    
    // Extract locale from pathname and set cookie
    const locale = locales.find(
      (loc) => pathname.startsWith(`/${loc}/`) || pathname === `/${loc}`
    );
    if (locale) {
      response.cookies.set(LOCALE_COOKIE, locale, {
        maxAge: 60 * 60 * 24 * 365, // 1 year
        path: '/',
        sameSite: 'lax',
      });
    }
    
    return response;
  }

  // Get preferred locale
  const locale = getLocale(request);

  // Redirect to locale-prefixed path
  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname === '/' ? '' : pathname}`;
  
  const response = NextResponse.redirect(url);
  
  // Set locale cookie for future visits
  response.cookies.set(LOCALE_COOKIE, locale, {
    maxAge: 60 * 60 * 24 * 365, // 1 year
    path: '/',
    sameSite: 'lax',
  });

  return response;
}

// Configure which routes the middleware should run on
export const config = {
  matcher: [
    // Match all pathnames except:
    // - API routes (/api/*)
    // - Next.js internals (/_next/*)
    // - Static files with extensions
    // - Public files
    '/((?!api|_next/static|_next/image|images|video|icons|favicon.ico|robots.txt|manifest.json|sw.js|offline.html|.*\\..*).*)',
  ],
};
