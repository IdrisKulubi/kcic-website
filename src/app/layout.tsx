import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/themes/theme-provider";
// Removed global navbar - each page now uses MinimalNavbar
import { skipLinkUtils, landmarkUtils } from "@/lib/accessibility";
import { PerformanceMonitor } from "@/components/performance-monitor";
import { ServiceWorkerRegistration } from "@/components/service-worker";
import { AccessibilityProvider } from "@/contexts/accessibility-context";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";
import { ourFileRouter } from "@/app/api/uploadthing/core";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://kenyacic.org'),
  title: {
    default: "KCIC - Kenya Climate Innovation Centre",
    template: "%s | KCIC - Kenya Climate Innovation Centre"
  },
  description: "Empowering Climate Innovation in Kenya - Accelerating green growth through innovative climate solutions, supporting SMEs, and building a sustainable future for Kenya.",
  keywords: [
    "climate innovation",
    "Kenya",
    "sustainability",
    "green growth",
    "SMEs",
    "climate solutions",
    "environmental technology",
    "climate change",
    "renewable energy",
    "sustainable development",
    "green entrepreneurship",
    "climate finance",
    "carbon reduction",
    "environmental impact",
    "clean technology"
  ],
  authors: [{ name: "Kenya Climate Innovation Centre", url: "https://kenyacic.org" }],
  creator: "Kenya Climate Innovation Centre",
  publisher: "Kenya Climate Innovation Centre",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://kenyacic.org",
    siteName: "Kenya Climate Innovation Centre",
    title: "KCIC - Kenya Climate Innovation Centre",
    description: "Empowering Climate Innovation in Kenya - Accelerating green growth through innovative climate solutions, supporting SMEs, and building a sustainable future for Kenya.",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Kenya Climate Innovation Centre - Empowering Climate Innovation",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@kcic_kenya",
    creator: "@kcic_kenya",
    title: "KCIC - Kenya Climate Innovation Centre",
    description: "Empowering Climate Innovation in Kenya - Accelerating green growth through innovative climate solutions, supporting SMEs, and building a sustainable future for Kenya.",
    images: ["/images/twitter-card.jpg"],
  },
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
    yahoo: "your-yahoo-verification-code",
  },
  alternates: {
    canonical: "https://kenyacic.org",
    languages: {
      'en': 'https://kenyacic.org',
      'fr': 'https://kenyacic.org/fr',
    },
  },
  category: 'Climate Innovation',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#10B981" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        
        {/* Structured Data - Organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Kenya Climate Innovation Centre",
              "alternateName": "KCIC",
              "url": "https://kenyacic.org",
              "logo": "https://kenyacic.org/images/logo.png",
              "description": "Empowering Climate Innovation in Kenya - Accelerating green growth through innovative climate solutions, supporting SMEs, and building a sustainable future for Kenya.",
              "foundingDate": "2010",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Strathmore University Campus, Ole Sangale Rd",
                "addressLocality": "Nairobi",
                "addressCountry": "Kenya"
              },
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+254-20-123-4567",
                "contactType": "customer service",
                "email": "info@kenyacic.org"
              },
              "sameAs": [
                "https://twitter.com/kcic_kenya",
                "https://linkedin.com/company/kcic-kenya",
                "https://facebook.com/kcic.kenya",
                "https://instagram.com/kcic_kenya",
                "https://youtube.com/c/kcickenya"
              ],
              "areaServed": {
                "@type": "Country",
                "name": "Kenya"
              },
              "knowsAbout": [
                "Climate Innovation",
                "Sustainability",
                "Green Technology",
                "Environmental Solutions",
                "Climate Finance",
                "Renewable Energy"
              ]
            })
          }}
        />
        
        {/* Structured Data - Website */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "Kenya Climate Innovation Centre",
              "url": "https://kenyacic.org",
              "description": "Empowering Climate Innovation in Kenya",
              "publisher": {
                "@type": "Organization",
                "name": "Kenya Climate Innovation Centre"
              },
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://kenyacic.org/search?q={search_term_string}",
                "query-input": "required name=search_term_string"
              }
            })
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased accessibility-enhanced`}
      >
        <NextSSRPlugin routerConfig={extractRouterConfig(ourFileRouter)} />
        <AccessibilityProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
          >
            {/* Skip to main content link for keyboard users */}
            <a
              {...skipLinkUtils.getSkipLinkProps('main-content')}
            >
              Skip to main content
            </a>

            {/* Main content landmark - each page handles its own navigation */}
            <main {...landmarkUtils.getMainProps()}>
              {children}
            </main>
            
            {/* Toast notifications */}
            <Toaster position="top-right" richColors closeButton />
            
            {/* Performance monitoring (development only) */}
            <PerformanceMonitor />
            
            {/* Service worker registration (production only) */}
            <ServiceWorkerRegistration />
          </ThemeProvider>
          </AccessibilityProvider>
      </body>
    </html>
  );
}
