"use client";

import React, { useEffect, useLayoutEffect, useRef } from "react";
import { MinimalNavbar } from "@/components/layout/MinimalNavbar";
import { MinimalStatsSection } from "@/components/sections/MinimalStatsSection";
import { NewsSection } from "@/components/sections/NewsSection";
import { AwardsSection } from "@/components/sections";
import {
  PartnersSection,
  PartnerData,
} from "@/components/sections/PartnersSection";
import { HeroCarousel, DEFAULT_HERO_IMAGES } from "@/components/sections/HeroCarousel";

import Footer from "@/components/layout/Footer";
import { navData } from "@/lib/navigation";
import { useTranslation } from "@/lib/i18n";
import type { HeroSectionData } from "@/lib/actions/hero";
import type { StatisticData } from "@/lib/actions/stats";
import type { NewsData } from "@/lib/actions/news";
import type { PartnerData as DBPartnerData } from "@/lib/actions/partners";
import type {
  FooterSectionData,
  FooterLinkData,
  FooterSocialMediaData,
} from "@/lib/actions/footer";
import ClimateChallenge from "./sections/ClimateChallenge";
import HistoryTimeline from "./sections/HistoryTimeline";
import FoundingBeliefs from "./sections/FoundingBeliefs";
import WhatWeDo from "./sections/WhatWeDo";
import HowWeDoIt from "./sections/HowWeDoIt";
import KeySectors from "./sections/KeySectors";
import ProgramsShowcase from "./sections/ProgramsShowcase";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Vision 2030 Targets (2025-2030)
const targetsData = [
  {
    value: "12,000+",
    description: "Enterprises Supported",
    subdescription: "Across Africa",
  },
  {
    value: "$33M",
    description: "Leveraged",
    subdescription: "To support enterprises",
  },
  {
    value: "80%",
    description: "Commercialization Rate",
    subdescription: "Of supported enterprises",
  },
  {
    value: "$55M",
    description: "Mobilized",
    subdescription: "In climate finance across Africa",
  },
  {
    value: "100,000",
    description: "Green Jobs Created",
  },
  {
    value: "1.2M",
    description: "Tonnes CO2 Mitigated",
  },
  {
    value: "67,500",
    description: "Customers Reached",
    subdescription: "By supported enterprises",
  },
  {
    value: "60",
    description: "New Collaborations",
    subdescription: "Established",
  },
];

// 13 Years On Impact Data (static for now)
const thirteenYearsOnData = [
  {
    value: "57,517",
    description: "Jobs Created",
    subdescription: "56% women owned",
  },
  {
    value: "3,500+",
    description: "SMEs Supported",
    subdescription: "2,730 incubated/accelerated",
  },
  {
    value: "$63M",
    description: "Leveraged",
    subdescription: "For supported enterprises",
  },
  {
    value: "73",
    description: "Policy Initiatives",
    subdescription: "Legislative reforms & advocacy",
  },
  {
    value: "507,149",
    description: "Tonnes CO2 Mitigated",
  },
  {
    value: "67%",
    description: "Commercialization Rate",
    subdescription: "For incubated enterprises",
  },
  {
    value: "$85M",
    description: "Revenue Generated",
    subdescription: "By supported enterprises",
  },
  {
    value: "3",
    description: "Awards",
    subdescription: "Recent recognition (2024/2025)",
  },
];

interface HomePageProps {
  hero: HeroSectionData | null;
  stats: StatisticData[];
  news: NewsData[];
  partners: DBPartnerData[];
  footer: {
    section: FooterSectionData;
    links: FooterLinkData[];
    socialMedia: FooterSocialMediaData[];
  } | null;
}

export default function HomePage({
  hero,
  stats,
  news,
  partners,
  footer,
}: HomePageProps) {
  const { t, locale } = useTranslation();
  const bgRef = useRef<HTMLDivElement | null>(null);

  // Update document title based on locale
  useEffect(() => {
    document.title =
      locale === "fr"
        ? "KCIC - Autonomiser l'innovation climatique au Kenya"
        : "KCIC - Empowering Climate Innovation in Kenya";
  }, [locale]);

  // Subtle gradient parallax across the whole page
  useLayoutEffect(() => {
    if (!bgRef.current) return;
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.to(bgRef.current, {
        duration: 1,
        css: { "--g1x": "14%", "--g1y": "18%", "--g2x": "86%", "--g2y": "82%" },
        scrollTrigger: {
          trigger: document.documentElement,
          start: "top top",
          end: "bottom bottom",
          scrub: 1.2,
        },
      });
    });
    return () => ctx.revert();
  }, []);


  // Transform hero data from database or use translations as fallback
  const translatedHeroData = hero
    ? {
        title: hero.headline,
        description: hero.subtext,
        stats: t("hero.stats"),
        ctaButtons: hero.buttons.map((btn) => ({
          text: btn.text,
          href: btn.href,
          variant: btn.variant as "primary" | "secondary",
        })),
      }
    : {
        title: t("hero.title"),
        description: t("hero.description"),
        stats: t("hero.stats"),
        ctaButtons: [
          {
            text: t("hero.cta.programs"),
            href: "/programs",
            variant: "primary" as const,
          },
          {
            text: t("hero.cta.learn"),
            href: "/about",
            variant: "secondary" as const,
          },
        ],
      };

  // Transform stats data from database or use translations as fallback
  const translatedStatsData =
    stats.length > 0
      ? stats.map((stat) => ({
          value: `${stat.value}${stat.suffix || "+"}`,
          description: stat.label,
        }))
      : [
          {
            value: "450+",
            description: t("stats.smes"),
          },
          {
            value: "$25M+",
            description: t("stats.investment"),
          },
          {
            value: "2,500+",
            description: t("stats.jobs"),
          },
          {
            value: "15+",
            description: t("stats.solutions"),
          },
        ];

  // Transform news data from database
  const newsItems = news
    .filter((article) => article.id && article.slug) // Filter out items without id or slug
    .map((article) => ({
      id: article.id!,
      title: article.title,
      excerpt: article.excerpt,
      publishedAt:
        typeof article.publishedAt === "string"
          ? article.publishedAt
          : article.publishedAt.toISOString().split("T")[0],
      category: article.category,
      imageUrl: article.thumbnail,
      slug: article.slug!,
      readTime: article.readTime || "5 min",
      featured: article.featured,
    }));

  // Transform partners data from database
  const partnersDataTransformed: PartnerData[] = partners
    .filter((partner) => partner.id) // Filter out items without id
    .map((partner) => ({
      id: partner.id!,
      name: partner.name,
      logo: partner.logo,
      category: "partner", // Default category since DB doesn't have this field
      description: partner.name,
      website: partner.website || undefined,
      featured: true,
    }));

  // Transform footer data from database
  const footerData = footer
    ? {
        quickLinks: (footer.links || []).map((link) => ({
          label: link.label,
          href: link.href,
        })),
        socialMedia: (footer.socialMedia || []).map((sm) => ({
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
      }
    : {
        quickLinks: [
          { label: "About", href: "/about" },
          { label: "Programmes", href: "/programmes" },
          { label: "Media Centre", href: "/media" },
          { label: "Contacts", href: "/contacts" },
        ],
        socialMedia: [
          {
            platform: "Twitter",
            href: "https://twitter.com/kcic_kenya",
            icon: "twitter",
          },
          {
            platform: "LinkedIn",
            href: "https://linkedin.com/company/kcic-kenya",
            icon: "linkedin",
          },
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
        copyright:
          "© 2024 Kenya Climate Innovation Centre. All rights reserved.",
      };

  // Hero images for the carousel (can be moved to CMS/DB later)
  const heroImages = DEFAULT_HERO_IMAGES;

  return (
    <>
      {/* Structured Data for Homepage */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: t("hero.title"),
            description: t("hero.description"),
            url: "https://kenyacic.org",
            mainEntity: {
              "@type": "Organization",
              name: "Kenya Climate Innovation Centre",
              description: t("hero.title"),
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

      <div className="relative min-h-screen overflow-x-clip">
        {/* Global canvas background */}
        <div
          ref={bgRef}
          className="fixed inset-0 -z-10 pointer-events-none"
          aria-hidden
          style={{
            // CSS variables so GSAP can animate gradient focal points
            ["--g1x" as any]: "10%",
            ["--g1y" as any]: "20%",
            ["--g2x" as any]: "90%",
            ["--g2y" as any]: "80%",
          } as React.CSSProperties}
        >
          {/* Light mode canvas */}
          <div
            className="absolute inset-0 dark:hidden"
            style={{
              background:
                "radial-gradient(60% 40% at var(--g1x) var(--g1y), rgba(127,209,52,0.10) 0%, rgba(127,209,52,0) 60%)," +
                "radial-gradient(40% 35% at var(--g2x) var(--g2y), rgba(0,174,239,0.08) 0%, rgba(0,174,239,0) 60%)," +
                "linear-gradient(180deg, #FFFFFF 0%, #F7FBF4 35%, #FFFFFF 100%)",
              backgroundRepeat: "no-repeat",
            }}
          />
          {/* Dark mode canvas */}
          <div
            className="absolute inset-0 hidden dark:block"
            style={{
              background:
                "radial-gradient(60% 40% at var(--g1x) var(--g1y), rgba(127,209,52,0.18) 0%, rgba(127,209,52,0) 60%)," +
                "radial-gradient(40% 35% at var(--g2x) var(--g2y), rgba(0,174,239,0.12) 0%, rgba(0,174,239,0) 60%)," +
                "linear-gradient(180deg, #0B0F0A 0%, #0E1410 35%, #0B0F0A 100%)",
              backgroundRepeat: "no-repeat",
            }}
          />
        </div>

        {/* Navigation */}
        <MinimalNavbar {...navData} />

        {/* Hero Section - modern slideshow */}
        <HeroCarousel data={translatedHeroData} images={heroImages} />

        {/* Main Content Sections with proper spacing */}
        <div className="space-y-0">
          {/* SECTION 1: About Us - Combined (Climate Challenge + History + Beliefs) */}
          <div className="bg-white">
            <ClimateChallenge />
            <div className="border-t border-gray-100">
              <HistoryTimeline />
            </div>
            <div className="border-t border-gray-100">
              <FoundingBeliefs />
            </div>
          </div>

          {/* SECTION 2: Our Approach - Combined (What We Do + How We Do It) */}
          <div className="bg-gradient-to-b from-gray-50 to-white py-20 sm:py-32">
            <WhatWeDo />
            <div className="mt-16">
              <HowWeDoIt />
            </div>
          </div>

          {/* SECTION 3: Focus Areas & Programs - Combined */}
          <div className="bg-white py-20 sm:py-32">
            <KeySectors />
            <div className="mt-20">
              <ProgramsShowcase />
            </div>
          </div>

          {/* SECTION 4: Impact & Recognition - Combined (Stats + Awards) */}
          <div className="relative">
            <MinimalStatsSection
              stats={thirteenYearsOnData}
              targets={targetsData}
              variant="dark"
              title="Our Impact Journey"
              subtitle="From 13 years of achievements to our ambitious 2030 vision"
              imageSrc="/images/KCIC-Map.png"
              imageAlt="Map of Africa highlighting countries where KCIC has supported climate enterprises"
              imageSide="left"
              showToggle={true}
            />
            <div className="border-t border-white/10 relative">
              <AwardsSection />
            </div>
          </div>

          {/* SECTION 5: News */}
          <div className="bg-gray-50 py-20 sm:py-32">
            <NewsSection news={newsItems} />
          </div>

          {/* SECTION 6: Partners */}
          <div className="bg-white">
            <PartnersSection partners={partnersDataTransformed} />
          </div>
        </div>

        {/* Footer */}
        <Footer data={footerData} />
      </div>
    </>
  );
}
