import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { auth } from '@/lib/auth';

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip middleware for api routes and static files
  if (
    pathname.startsWith('/api') ||
    pathname.startsWith('/_next') ||
    pathname.startsWith('/images') ||
    pathname.startsWith('/icons') ||
    pathname.includes('.')
  ) {
    return;
  }

  // Handle admin routes authentication
  if (pathname.startsWith('/admin')) {
    // Allow access to login page
    if (pathname === '/admin/login') {
      return NextResponse.next();
    }

    // Check if user is authenticated
    try {
      const session = await auth.api.getSession({
        headers: request.headers,
      });

      if (!session) {
        // Redirect to login page if not authenticated
        const url = request.nextUrl.clone();
        url.pathname = '/admin/login';
        return NextResponse.redirect(url);
      }

      // User is authenticated, allow access
      return NextResponse.next();
    } catch (error) {
      console.error('Auth middleware error:', error);
      // On error, redirect to login
      const url = request.nextUrl.clone();
      url.pathname = '/admin/login';
      return NextResponse.redirect(url);
    }
  }

  // Handle French locale routes - redirect /fr and /fr/* to home for now
  if (pathname === '/fr' || pathname.startsWith('/fr/')) {
    // For now, redirect French users to the home page with a locale parameter
    const url = request.nextUrl.clone();
    url.pathname = '/';
    url.searchParams.set('locale', 'fr');
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Skip all internal paths (_next, api, images, etc.)
    '/((?!api|_next/static|_next/image|images|favicon.ico|robots.txt|manifest.json|sw.js).*)',
  ],
};
