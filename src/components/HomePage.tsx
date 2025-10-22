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
import Footer from "@/components/layout/Footer";
import { homePageData } from "@/data/home";
import { newsData } from "@/data/news";
import { navData } from "@/lib/navigation";
import { useTranslation } from "@/lib/i18n.client";

// Static data that doesn't need translation
const partnersData: PartnerData[] = [
  {
    id: "1",
    name: "World Bank",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/World_Bank_logo.svg/200px-World_Bank_logo.svg.png",
    category: "donor",
    description: "Global development partner",
    website: "https://www.worldbank.org",
    featured: true,
  },
  {
    id: "2",
    name: "USAID",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/USAID-Identity.svg/200px-USAID-Identity.svg.png",
    category: "donor",
    description: "US Agency for International Development",
    website: "https://www.usaid.gov",
    featured: true,
  },
  {
    id: "3",
    name: "GIZ",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/GIZ-logo.svg/200px-GIZ-logo.svg.png",
    category: "donor",
    description: "German development cooperation",
    website: "https://www.giz.de",
    featured: true,
  },
  {
    id: "4",
    name: "DFID",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/UK_aid_logo.svg/200px-UK_aid_logo.svg.png",
    category: "donor",
    description: "UK development assistance",
    website: "https://www.gov.uk",
    featured: true,
  },
  {
    id: "5",
    name: "UNDP",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/UNDP_logo.svg/200px-UNDP_logo.svg.png",
    category: "partner",
    description: "UN Development Programme",
    website: "https://www.undp.org",
    featured: true,
  },
  {
    id: "6",
    name: "Climate-KIC",
    logo: "https://www.climate-kic.org/wp-content/themes/climate-kic/assets/img/logo.svg",
    category: "partner",
    description: "Europe's climate innovation initiative",
    website: "https://www.climate-kic.org",
    featured: true,
  },
  {
    id: "7",
    name: "Kenya Government",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Flag_of_Kenya.svg/200px-Flag_of_Kenya.svg.png",
    category: "partner",
    description: "Government of Kenya",
    website: "https://www.kenya.go.ke",
    featured: true,
  },
  {
    id: "8",
    name: "Strathmore University",
    logo: "https://strathmore.edu/wp-content/uploads/2023/03/Strathmore_University_Logo.png",
    category: "collaborator",
    description: "Academic partner",
    website: "https://strathmore.edu",
    featured: true,
  },
];

export default function HomePage() {
  const { t, locale } = useTranslation();

  // Update document title based on locale
  useEffect(() => {
    document.title = locale === 'fr' 
      ? 'KCIC - Autonomiser l\'innovation climatique au Kenya'
      : 'KCIC - Empowering Climate Innovation in Kenya';
  }, [locale]);

  // Create translated hero data
  const translatedHeroData = {
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

  // Create translated stats data
  const translatedStatsData = [
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

  // Create translated targets data
  const translatedTargetsData = [
    {
      value: "1,000+",
      description: t('pages.impact.targetStats.smes'),
    },
    {
      value: "$50M+",
      description: t('pages.impact.targetStats.investment'),
    },
    {
      value: "5,000+",
      description: t('pages.impact.targetStats.jobs'),
    },
    {
      value: "30+",
      description: t('pages.impact.targetStats.solutions'),
    },
  ];

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
        <MinimalStatsSection stats={translatedStatsData} targets={translatedTargetsData} />

        {/* News Section */}
        <NewsSection news={newsData} />

        {/* Partners Section */}
        <PartnersSection partners={partnersData} />

        {/* Footer */}
        <Footer data={homePageData.footer} />
      </div>
    </>
  );
}