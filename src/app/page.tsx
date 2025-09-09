import React from "react";
import { MinimalNavbar } from "@/components/layout/MinimalNavbar";
import { MinimalHeroSection } from "@/components/sections/MinimalHeroSection";
import { MinimalStatsSection } from "@/components/sections/MinimalStatsSection";
import { NewsSection } from "@/components/sections/NewsSection";
import { PartnersSection, PartnerData } from "@/components/sections/PartnersSection";
import Footer from "@/components/layout/Footer";
import { homePageData } from "@/data/home";
import { newsData } from "@/data/news";
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

// Partners data
const partnersData: PartnerData[] = [
  // Donors
  {
    id: '1',
    name: 'World Bank',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/World_Bank_logo.svg/200px-World_Bank_logo.svg.png',
    category: 'donor',
    description: 'Global development partner',
    website: 'https://www.worldbank.org',
    featured: true,
  },
  {
    id: '2',
    name: 'USAID',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/USAID-Identity.svg/200px-USAID-Identity.svg.png',
    category: 'donor',
    description: 'US Agency for International Development',
    website: 'https://www.usaid.gov',
    featured: true,
  },
  {
    id: '3',
    name: 'GIZ',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/GIZ-logo.svg/200px-GIZ-logo.svg.png',
    category: 'donor',
    description: 'German development cooperation',
    website: 'https://www.giz.de',
    featured: true,
  },
  {
    id: '4',
    name: 'DFID',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/UK_aid_logo.svg/200px-UK_aid_logo.svg.png',
    category: 'donor',
    description: 'UK development assistance',
    website: 'https://www.gov.uk',
    featured: true,
  },
  // Partners
  {
    id: '5',
    name: 'UNDP',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/UNDP_logo.svg/200px-UNDP_logo.svg.png',
    category: 'partner',
    description: 'UN Development Programme',
    website: 'https://www.undp.org',
    featured: true,
  },
  {
    id: '6',
    name: 'Climate-KIC',
    logo: 'https://www.climate-kic.org/wp-content/themes/climate-kic/assets/img/logo.svg',
    category: 'partner',
    description: 'Europe\'s climate innovation initiative',
    website: 'https://www.climate-kic.org',
    featured: true,
  },
  {
    id: '7',
    name: 'Kenya Government',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Flag_of_Kenya.svg/200px-Flag_of_Kenya.svg.png',
    category: 'partner',
    description: 'Government of Kenya',
    website: 'https://www.kenya.go.ke',
    featured: true,
  },
  {
    id: '8',
    name: 'Strathmore University',
    logo: 'https://strathmore.edu/wp-content/uploads/2023/03/Strathmore_University_Logo.png',
    category: 'collaborator',
    description: 'Academic partner',
    website: 'https://strathmore.edu',
    featured: true,
  },
  // Additional partners
  {
    id: '9',
    name: 'European Union',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/Flag_of_Europe.svg/200px-Flag_of_Europe.svg.png',
    category: 'donor',
    website: 'https://europa.eu',
  },
  {
    id: '10',
    name: 'SIDA',
    logo: 'https://cdn.sida.se/app/uploads/2020/10/13093627/sida-logo.svg',
    category: 'donor',
    website: 'https://www.sida.se',
  },
  {
    id: '11',
    name: 'AfDB',
    logo: 'https://www.afdb.org/themes/afdb_theme/logo.svg',
    category: 'supporter',
    website: 'https://www.afdb.org',
  },
  {
    id: '12',
    name: 'UNEP',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/UNEP_logo.svg/200px-UNEP_logo.svg.png',
    category: 'partner',
    website: 'https://www.unep.org',
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
