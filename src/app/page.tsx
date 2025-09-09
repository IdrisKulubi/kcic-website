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
    value: "450",
    suffix: "+",
    label: "SMEs Supported",
  },
  {
    value: "$25M",
    suffix: "+",
    label: "Investment Mobilized",
  },
  {
    value: "2,500",
    suffix: "+",
    label: "Jobs Created",
  },
  {
    value: "15",
    suffix: "+",
    label: "Climate Solutions",
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
              name: stat.label,
              value: stat.value,
              unitText: stat.suffix || "",
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
        <MinimalStatsSection stats={statsData} />

        {/* Footer */}
        <Footer data={homePageData.footer} />
      </div>
    </>
  );
}
