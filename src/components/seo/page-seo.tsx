import { Metadata } from 'next';

interface SEOProps {
  title: string;
  description: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'profile';
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  section?: string;
  tags?: string[];
  noIndex?: boolean;
}

export function generateSEOMetadata({
  title,
  description,
  keywords = [],
  image = '/images/og-image.jpg',
  url,
  type = 'website',
  publishedTime,
  modifiedTime,
  author,
  section,
  tags = [],
  noIndex = false
}: SEOProps): Metadata {
  const baseUrl = 'https://kenyacic.org';
  const fullUrl = url ? `${baseUrl}${url}` : baseUrl;
  const fullTitle = title.includes('KCIC') ? title : `${title} | KCIC`;

  return {
    title: fullTitle,
    description,
    keywords: [...keywords, 'KCIC', 'Kenya Climate Innovation Centre', 'climate innovation', 'sustainability'],
    authors: author ? [{ name: author }] : [{ name: 'Kenya Climate Innovation Centre' }],
    robots: noIndex ? 'noindex,nofollow' : 'index,follow',
    openGraph: {
      title: fullTitle,
      description,
      url: fullUrl,
      siteName: 'Kenya Climate Innovation Centre',
      images: [
        {
          url: image.startsWith('http') ? image : `${baseUrl}${image}`,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: 'en_US',
      type,
      ...(publishedTime && { publishedTime }),
      ...(modifiedTime && { modifiedTime }),
      ...(section && { section }),
      ...(tags.length > 0 && { tags }),
    },
    twitter: {
      card: 'summary_large_image',
      site: '@kcic_kenya',
      creator: '@kcic_kenya',
      title: fullTitle,
      description,
      images: [image.startsWith('http') ? image : `${baseUrl}${image}`],
    },
    alternates: {
      canonical: fullUrl,
    },
  };
}

// Structured data generators
export function generateOrganizationSchema() {
  return {
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
      "streetAddress": "University of Nairobi",
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
  };
}

export function generateArticleSchema({
  headline,
  description,
  image,
  datePublished,
  dateModified,
  author = "Kenya Climate Innovation Centre",
  url
}: {
  headline: string;
  description: string;
  image: string;
  datePublished: string;
  dateModified?: string;
  author?: string;
  url: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": headline,
    "description": description,
    "image": image.startsWith('http') ? image : `https://kenyacic.org${image}`,
    "datePublished": datePublished,
    "dateModified": dateModified || datePublished,
    "author": {
      "@type": "Organization",
      "name": author
    },
    "publisher": {
      "@type": "Organization",
      "name": "Kenya Climate Innovation Centre",
      "logo": {
        "@type": "ImageObject",
        "url": "https://kenyacic.org/images/logo.png"
      }
    },
    "url": `https://kenyacic.org${url}`,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://kenyacic.org${url}`
    }
  };
}

export function generateBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url.startsWith('http') ? item.url : `https://kenyacic.org${item.url}`
    }))
  };
}

export function generateFAQSchema(faqs: Array<{ question: string; answer: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };
}

export function generateEventSchema({
  name,
  description,
  startDate,
  endDate,
  location,
  image,
  url
}: {
  name: string;
  description: string;
  startDate: string;
  endDate?: string;
  location: string;
  image: string;
  url: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Event",
    "name": name,
    "description": description,
    "startDate": startDate,
    "endDate": endDate,
    "location": {
      "@type": "Place",
      "name": location,
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Nairobi",
        "addressCountry": "Kenya"
      }
    },
    "image": image.startsWith('http') ? image : `https://kenyacic.org${image}`,
    "url": `https://kenyacic.org${url}`,
    "organizer": {
      "@type": "Organization",
      "name": "Kenya Climate Innovation Centre",
      "url": "https://kenyacic.org"
    }
  };
}