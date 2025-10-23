'use client';

import React, { useEffect } from "react";
import { MinimalNavbar } from "@/components/layout/MinimalNavbar";
import { MinimalHeroSection } from "@/components/sections/MinimalHeroSection";
import { MinimalStatsSection } from "@/components/sections/MinimalStatsSection";
import { NewsSection } from "@/components/sections/NewsSection";
import {
  PartnersSection,
  PartnerData,
} from "@/components/sections/PartnersSection";
import ProgrammesSection from "@/components/sections/ProgrammesSection";
import { CTABanner } from "@/components/sections/CTABanner";
import Footer from "@/components/layout/Footer";
import { navData } from "@/lib/navigation";
import { useTranslation } from "@/lib/i18n";
import type { HeroSectionData } from "@/lib/actions/hero";
import type { StatisticData } from "@/lib/actions/stats";
import type { NewsData } from "@/lib/actions/news";
import type { PartnerData as DBPartnerData } from "@/lib/actions/partners";
import type { ProgrammeData } from "@/lib/actions/programmes";
import type { FooterSectionData, FooterLinkData, FooterSocialMediaData } from "@/lib/actions/footer";
import type { CTABannerData } from "@/lib/actions/cta";

// Targets data for 2025 (static for now)
const targetsData = [
  {
    value: "1,000+",
    description: "SMEs to be supported in our next phase of growth.",
  },
  {
    value: "$50M+",
    description: "To be mobilized to scale climate solutions.",
  },
  {
    value: "5,000+",
    description: "New green jobs to be created across the region.",
  },
  {
    value: "30+",
    description: "New climate technologies to be developed and launched.",
  },
];

interface HomePageProps {
  hero: HeroSectionData | null;
  stats: StatisticData[];
  news: NewsData[];
  partners: DBPartnerData[];
  programmes: ProgrammeData[];
  footer: {
    section: FooterSectionData;
    links: FooterLinkData[];
    socialMedia: FooterSocialMediaData[];
  } | null;
  cta: CTABannerData | null;
}

export default function HomePage({ hero, stats, news, partners, programmes, footer, cta }: HomePageProps) {
  const { t, locale } = useTranslation();

  // Update document title based on locale
  useEffect(() => {
    document.title = locale === 'fr' 
      ? 'KCIC - Autonomiser l\'innovation climatique au Kenya'
      : 'KCIC - Empowering Climate Innovation in Kenya';
  }, [locale]);

  // Transform hero data from database or use translations as fallback
  const translatedHeroData = hero ? {
    title: hero.headline,
    subtitle: t('hero.subtitle'),
    description: hero.subtext,
    stats: t('hero.stats'),
    ctaButtons: hero.buttons.map(btn => ({
      text: btn.text,
      href: btn.href,
      variant: btn.variant as "primary" | "secondary",
    })),
  } : {
    title: t('hero.title'),
    subtitle: t('hero.subtitle'),
    description: t('hero.description'),
    stats: t('hero.stats'),
    ctaButtons: [
      {
        text: t('hero.cta.programs'),
        href: "/programs",
        variant: "primary" as const,
      },
      {
        text: t('hero.cta.learn'),
        href: "/about",
        variant: "secondary" as const,
      },
    ],
  };

  // Transform stats data from database or use translations as fallback
  const translatedStatsData = stats.length > 0 ? stats.map(stat => ({
    value: `${stat.value}${stat.suffix || '+'}`,
    description: stat.label,
  })) : [
    {
      value: "450+",
      description: t('stats.smes'),
    },
    {
      value: "$25M+",
      description: t('stats.investment'),
    },
    {
      value: "2,500+",
      description: t('stats.jobs'),
    },
    {
      value: "15+",
      description: t('stats.solutions'),
    },
  ];

  // Transform news data from database
  const newsItems = news.map(article => ({
    id: article.id,
    title: article.title,
    excerpt: article.excerpt,
    publishedAt: typeof article.publishedAt === 'string' ? article.publishedAt : article.publishedAt.toISOString().split('T')[0],
    category: article.category,
    imageUrl: article.thumbnail,
    slug: article.slug,
    readTime: article.readTime || '5 min',
    featured: article.featured,
  }));

  // Transform partners data from database
  const partnersDataTransformed: PartnerData[] = partners.map(partner => ({
    id: partner.id,
    name: partner.name,
    logo: partner.logo,
    category: "partner", // Default category since DB doesn't have this field
    description: partner.name,
    website: partner.website || undefined,
    featured: true,
  }));

  // Transform programmes data from database
  const programmesDataTransformed = programmes.map(prog => ({
    id: prog.id,
    title: prog.title,
    description: prog.description,
    image: prog.image,
    href: prog.href,
    color: prog.color,
  }));

  // Transform CTA banner data from database
  const ctaBannerData = cta ? {
    headline: cta.headline,
    subtext: cta.subtext || undefined,
    ctaButton: {
      text: cta.buttonText,
      href: cta.buttonHref,
    },
  } : {
    headline: "Join us in building a sustainable future",
    subtext: "Be part of Kenya's climate innovation revolution.",
    ctaButton: {
      text: "Apply Now",
      href: "/apply",
    },
  };

  // Transform footer data from database
  const footerData = footer ? {
    quickLinks: footer.links.map(link => ({
      label: link.label,
      href: link.href,
    })),
    socialMedia: footer.socialMedia.map(sm => ({
      platform: sm.platform,
      href: sm.href,
      icon: sm.icon,
    })),
    contact: {
      address: footer.section.contactAddress,
      phone: footer.section.contactPhone,
      email: footer.section.contactEmail,
    },
    newsletter: {
      title: footer.section.newsletterTitle,
      description: footer.section.newsletterDescription,
      placeholder: footer.section.newsletterPlaceholder,
    },
    copyright: footer.section.copyright,
  } : {
    quickLinks: [
      { label: "About", href: "/about" },
      { label: "Programmes", href: "/programmes" },
      { label: "Media Centre", href: "/media" },
      { label: "Contacts", href: "/contacts" },
    ],
    socialMedia: [
      { platform: "Twitter", href: "https://twitter.com/kcic_kenya", icon: "twitter" },
      { platform: "LinkedIn", href: "https://linkedin.com/company/kcic-kenya", icon: "linkedin" },
    ],
    contact: {
      address: "Kenya Climate Innovation Centre, Nairobi, Kenya",
      phone: "+254 20 123 4567",
      email: "info@kenyacic.org",
    },
    newsletter: {
      title: "Stay Updated",
      description: "Get the latest news on climate innovation.",
      placeholder: "Enter your email address",
    },
    copyright: "© 2024 Kenya Climate Innovation Centre. All rights reserved.",
  };

  return (
    <>
      {/* Structured Data for Homepage */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: t('hero.title'),
            description: t('hero.description'),
            url: "https://kenyacic.org",
            mainEntity: {
              "@type": "Organization",
              name: "Kenya Climate Innovation Centre",
              description: t('hero.title'),
              sameAs: [
                "https://twitter.com/kenyacic",
                "https://linkedin.com/company/kenyacic",
                "https://facebook.com/kenyacic",
              ],
            },
            about: [
              {
                "@type": "Thing",
                name: "Climate Innovation",
              },
              {
                "@type": "Thing",
                name: "Sustainability",
              },
              {
                "@type": "Thing",
                name: "Green Technology",
              },
            ],
            mentions: translatedStatsData.map((stat) => ({
              "@type": "QuantitativeValue",
              name: stat.description,
              value: stat.value,
            })),
          }),
        }}
      />

      <div className="min-h-screen">
        {/* Navigation */}
        <MinimalNavbar {...navData} />

        {/* Hero Section */}
        <MinimalHeroSection data={translatedHeroData} />

        {/* Stats Section */}
        <MinimalStatsSection stats={translatedStatsData} targets={targetsData} />

        {/* News Section */}
        <NewsSection news={newsItems} />

        {/* Partners Section */}
        <PartnersSection partners={partnersDataTransformed} />

        {/* Programmes Section */}
        {programmesDataTransformed.length > 0 && (
          <ProgrammesSection programmes={programmesDataTransformed} />
        )}

        {/* CTA Banner */}
        <CTABanner data={ctaBannerData} />

        {/* Footer */}
        <Footer data={footerData} />
      </div>
    </>
  );
}