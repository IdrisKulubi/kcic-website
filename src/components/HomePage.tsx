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
import { HeroImageCarousel } from "@/components/sections/HeroImageCarousel";
import { ScrollProgress } from "@/components/animations/SectionReveal";
import { ScrollOrchestrator, AnimatedSection, ScrollProgressIndicator } from "@/components/animations/ScrollOrchestrator";
import { SectionDivider, FloatingElements } from "@/components/animations/SectionDivider";

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
import FoundingBeliefs from "./sections/FoundingBeliefs";
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


  // Hero data — single centered message
  const translatedHeroData = {
    title: "Catalyzing Climate Entrepreneurship in Africa",
    description: "",
    ctaButtons: [] as Array<{ text: string; href: string; variant: "primary" | "secondary" }>,
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
      content: article.content,
      publishedAt:
        typeof article.publishedAt === "string"
          ? article.publishedAt
          : article.publishedAt.toISOString().split("T")[0],
      category: article.category,
      imageUrl: article.thumbnail,
      slug: article.slug!,
      readTime: article.readTime || "5 min",
      featured: article.featured,
      type: (article.category?.toLowerCase().includes("podcast") ? "podcast" : "article") as "podcast" | "article",
      youtubeUrl: article.content || "",
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

  // Hero video configuration

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

        {/* Floating decorative elements for depth */}
        <FloatingElements variant="mixed" color="#7FD134" count={5} />

        {/* Navigation */}
        <MinimalNavbar {...navData} />

        {/* Scroll Progress Indicator */}
        <ScrollProgress />

        <ScrollOrchestrator>
          {/* Hero Section - GSAP image carousel */}
          <div id="hero">
            <HeroImageCarousel data={translatedHeroData} />
          </div>

          {/* Main Content Sections with smooth transitions */}
          <div className="space-y-0">
            {/* SECTION 1: About Us - Combined (Climate Challenge + History + Beliefs) */}
            <div id="about">
              <SectionDivider variant="wave" fromColor="#ffffff" toColor="#ffffff" height={18} />
              <AnimatedSection direction="up" className="bg-section-green">
                <ClimateChallenge />
              </AnimatedSection>
            
              <AnimatedSection direction="up" delay={0.1} className="border-t border-cyan-200/70 bg-[#eef8fb]">
                <FoundingBeliefs />
              </AnimatedSection>
            </div>

            {/* SECTION 2: Impact Journey (Slide 4) — green bg */}
            <div id="impact">
              <SectionDivider variant="angle" fromColor="#eef8fb" toColor="#17351b" height={28} />
              <div className="relative" style={{ background: "linear-gradient(180deg, #17351b 0%, #14311b 52%, #102717 100%)" }}>
                <MinimalStatsSection
                  stats={thirteenYearsOnData}
                  targets={targetsData}
                  variant="dark"
                  title="Our Impact Journey"
                  subtitle="Thirteen years of measurable progress and the targets guiding our next phase of growth."
                  imageSrc="/images/KCIC-Map.png"
                  imageAlt="Map of Africa highlighting countries where KCIC has supported climate enterprises"
                  imageSide="left"
                  showToggle={true}
                />
              </div>
            </div>

            {/* SECTION 2B: Awards & Recognition (Slide 5) */}
            <div id="awards">
              <SectionDivider variant="wave" fromColor="#102717" toColor="#10243d" height={24} />
              <div className="relative" style={{ background: "linear-gradient(180deg, #10243d 0%, #14311b 55%, #10243d 100%)" }}>
                <AnimatedSection direction="up">
                  <AwardsSection />
                </AnimatedSection>
              </div>
            </div>


           

          

            {/* SECTION 6: News */}
            <div id="news">
              <SectionDivider variant="curve" fromColor="#ffffff" toColor="#f7fbf8" height={24} />
              <AnimatedSection direction="up" className="bg-[#f7fbf8]">
                <NewsSection news={newsItems} />
              </AnimatedSection>
            </div>

            {/* SECTION 7: Partners */}
            <div id="partners">
              <SectionDivider variant="dots" fromColor="#f7fbf8" toColor="#edf7fb" height={20} />
              <AnimatedSection direction="up" className="bg-linear-to-b from-[#edf7fb] to-[#f5fbfd]">
                <PartnersSection partners={partnersDataTransformed} />
              </AnimatedSection>
            </div>
          </div>
        </ScrollOrchestrator>

        {/* Footer */}
        <Footer data={footerData} />
      </div>
    </>
  );
}
