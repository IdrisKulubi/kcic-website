import React from "react";
import { MinimalNavbar } from "@/components/layout/MinimalNavbar";
import { MinimalHeroSection } from "@/components/sections/MinimalHeroSection";
import { MinimalStatsSection } from "@/components/sections/MinimalStatsSection";
import Footer from "@/components/layout/Footer";
import { homePageData } from "@/data/home";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "KCIC - Empowering Climate Innovation in Kenya",
  description:
    "Supporting 450+ SMEs • $25M+ Investment • 2500+ Jobs Created. Join Kenya's leading climate innovation center driving sustainable solutions across Africa.",
  keywords: [
    "climate innovation Kenya",
    "green entrepreneurship",
    "sustainable development Kenya",
    "climate solutions Africa",
    "environmental technology",
    "renewable energy Kenya",
    "climate finance",
    "green startups",
    "sustainability programs",
  ],
  openGraph: {
    title: "Empowering Climate Innovation in Kenya | KCIC",
    description:
      "Supporting 450+ SMEs • $25M+ Investment • 2500+ Jobs Created. Join Kenya's leading climate innovation center driving sustainable solutions across Africa.",
    images: [
      {
        url: "/images/og-homepage.jpg",
        width: 1200,
        height: 630,
        alt: "KCIC - Empowering Climate Innovation in Kenya",
      },
    ],
  },
  twitter: {
    title: "Empowering Climate Innovation in Kenya | KCIC",
    description:
      "Supporting 450+ SMEs • $25M+ Investment • 2500+ Jobs Created. Join Kenya's leading climate innovation center.",
    images: ["/images/twitter-homepage.jpg"],
  },
};

// Navigation data
const navData = {
  logo: {
    src: "/images/kcic-logo.png",
    alt: "KCIC Logo",
  },
  navigation: [
    { label: "About", href: "/about" },
    { label: "Programs", href: "/programs" },
    { label: "Impact", href: "/impact" },
    { label: "Contact", href: "/contact" },
  ],
  ctaButton: {
    text: "Apply Now",
    href: "/apply",
  },
};

// Hero section data
const heroData = {
  title: "Empowering Climate Innovation in Kenya",
  subtitle: "Building a Sustainable Future",
  description:
    "We accelerate green growth through innovative climate solutions, supporting SMEs and creating lasting environmental impact across Africa.",
  stats: "Supporting 450+ SMEs • $25M+ Investment • 2500+ Jobs Created",
  ctaButtons: [
    {
      text: "Join Our Programs",
      href: "/programs",
      variant: "primary" as const,
    },
    {
      text: "Learn More",
      href: "/about",
      variant: "secondary" as const,
    },
  ],
};

// Stats data
const statsData = [
  {
    value: "450+",
    description: "SMEs supported through our incubation and acceleration programs.",
  },
  {
    value: "$25M+",
    description: "Investment mobilized for climate-focused ventures.",
  },
  {
    value: "2,500+",
    description: "Green jobs created and supported in various sectors.",
  },
  {
    value: "15+",
    description: "Innovative climate solutions deployed in the market.",
  },
];

// Targets data for 2025
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

export default function HomePage() {
  return (
    <>
      {/* Structured Data for Homepage */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "Empowering Climate Innovation in Kenya",
            description:
              "Supporting 450+ SMEs • $25M+ Investment • 2500+ Jobs Created. Join Kenya's leading climate innovation center driving sustainable solutions across Africa.",
            url: "https://kenyacic.org",
            mainEntity: {
              "@type": "Organization",
              name: "Kenya Climate Innovation Centre",
              description: "Empowering Climate Innovation in Kenya",
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
            mentions: statsData.map((stat) => ({
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
        <MinimalHeroSection data={heroData} />

        {/* Stats Section */}
        <MinimalStatsSection 
          stats={statsData} 
          targets={targetsData}
        />

        {/* Footer */}
        <Footer data={homePageData.footer} />
      </div>
    </>
  );
}
