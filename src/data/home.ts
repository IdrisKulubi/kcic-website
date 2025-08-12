// TypeScript interfaces for all content
export interface HeroData {
  headline: string;
  subtext: string;
  backgroundVideo?: string;
  ctaButtons: Array<{
    text: string;
    href: string;
    variant: 'primary' | 'secondary';
  }>;
}

export interface StatData {
  id: string;
  label: string;
  value: number;
  suffix?: string;
  icon: string;
}

export interface ProgrammeData {
  id: string;
  title: string;
  description: string;
  image: string;
  href: string;
  color: string;
}

export interface NewsData {
  id: string;
  title: string;
  excerpt: string;
  thumbnail: string;
  href: string;
  publishedAt: string;
}

export interface PartnerData {
  id: string;
  name: string;
  logo: string;
  website?: string;
}

export interface CTABannerData {
  headline: string;
  subtext?: string;
  ctaButton: {
    text: string;
    href: string;
  };
}

export interface FooterData {
  quickLinks: Array<{
    label: string;
    href: string;
  }>;
  socialMedia: Array<{
    platform: string;
    href: string;
    icon: string;
  }>;
  contact: {
    address: string;
    phone: string;
    email: string;
  };
  newsletter: {
    title: string;
    description: string;
    placeholder: string;
  };
  copyright: string;
}

export interface HomePageData {
  hero: HeroData;
  stats: StatData[];
  programmes: ProgrammeData[];
  news: NewsData[];
  partners: PartnerData[];
  ctaBanner: CTABannerData;
  footer: FooterData;
}

// Centralized content data
export const homePageData: HomePageData = {
  hero: {
    headline: "Empowering Climate Innovation in Kenya",
    subtext: "Accelerating green growth through innovative climate solutions, supporting SMEs, and building a sustainable future for Kenya.",
    ctaButtons: [
      {
        text: "Join Our Programs",
        href: "/programs",
        variant: "primary"
      },
      {
        text: "Learn More",
        href: "/about",
        variant: "secondary"
      }
    ]
  },
  stats: [
    {
      id: "jobs-created",
      label: "Jobs Created",
      value: 2500,
      suffix: "+",
      icon: "users"
    },
    {
      id: "smes-supported",
      label: "SMEs Supported",
      value: 450,
      suffix: "+",
      icon: "building"
    },
    {
      id: "climate-solutions",
      label: "Climate Solutions Implemented",
      value: 180,
      suffix: "+",
      icon: "leaf"
    },
    {
      id: "investment-mobilized",
      label: "Investment Mobilized",
      value: 25,
      suffix: "M USD",
      icon: "dollar-sign"
    }
  ],
  programmes: [
    {
      id: "kcic",
      title: "KCIC Programme",
      description: "Supporting climate innovation and green entrepreneurship across Kenya through incubation and acceleration services.",
      image: "/images/programmes/kcic.jpg",
      href: "/programmes/kcic",
      color: "climate-green"
    },
    {
      id: "agribiz",
      title: "Agribiz Programme",
      description: "Transforming agriculture through climate-smart solutions and sustainable farming practices.",
      image: "/images/programmes/agribiz.jpg",
      href: "/programmes/agribiz",
      color: "climate-yellow"
    },
    {
      id: "kcv",
      title: "KCV Programme",
      description: "Kenya Climate Ventures - investing in scalable climate solutions and green technologies.",
      image: "/images/programmes/kcv.jpg",
      href: "/programmes/kcv",
      color: "climate-blue"
    }
  ],
  news: [
    {
      id: "climate-summit-2024",
      title: "KCIC Hosts Major Climate Innovation Summit",
      excerpt: "Over 200 entrepreneurs and investors gathered to discuss the future of climate innovation in East Africa.",
      thumbnail: "/images/news/climate-summit.jpg",
      href: "/news/climate-summit-2024",
      publishedAt: "2024-01-15"
    },
    {
      id: "new-funding-round",
      title: "KCIC Announces $5M Funding for Green Startups",
      excerpt: "New funding initiative will support 50 climate-focused startups across Kenya over the next two years.",
      thumbnail: "/images/news/funding-announcement.jpg",
      href: "/news/new-funding-round",
      publishedAt: "2024-01-10"
    },
    {
      id: "partnership-announcement",
      title: "Strategic Partnership with Global Climate Fund",
      excerpt: "KCIC partners with international organizations to scale climate solutions across Africa.",
      thumbnail: "/images/news/partnership.jpg",
      href: "/news/partnership-announcement",
      publishedAt: "2024-01-05"
    }
  ],
  partners: [
    {
      id: "world-bank",
      name: "World Bank",
      logo: "/images/partners/world-bank.png",
      website: "https://worldbank.org"
    },
    {
      id: "unep",
      name: "UN Environment Programme",
      logo: "/images/partners/unep.png",
      website: "https://unep.org"
    },
    {
      id: "giz",
      name: "GIZ",
      logo: "/images/partners/giz.png",
      website: "https://giz.de"
    },
    {
      id: "kenya-government",
      name: "Government of Kenya",
      logo: "/images/partners/kenya-gov.png",
      website: "https://kenya.go.ke"
    },
    {
      id: "african-development-bank",
      name: "African Development Bank",
      logo: "/images/partners/afdb.png",
      website: "https://afdb.org"
    },
    {
      id: "climate-investment-funds",
      name: "Climate Investment Funds",
      logo: "/images/partners/cif.png",
      website: "https://climateinvestmentfunds.org"
    }
  ],
  ctaBanner: {
    headline: "Join us in building a sustainable future",
    subtext: "Be part of Kenya's climate innovation revolution. Apply to our programmes and help create lasting environmental impact.",
    ctaButton: {
      text: "Apply Now",
      href: "/apply"
    }
  },
  footer: {
    quickLinks: [
      { label: "About", href: "/about" },
      { label: "Programmes", href: "/programmes" },
      { label: "Media Centre", href: "/media" },
      { label: "Clients Centre", href: "/clients" },
      { label: "Join Our Programs", href: "/programs" },
      { label: "Contacts", href: "/contacts" },
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" }
    ],
    socialMedia: [
      { platform: "Twitter", href: "https://twitter.com/kcic_kenya", icon: "twitter" },
      { platform: "LinkedIn", href: "https://linkedin.com/company/kcic-kenya", icon: "linkedin" },
      { platform: "Facebook", href: "https://facebook.com/kcic.kenya", icon: "facebook" },
      { platform: "Instagram", href: "https://instagram.com/kcic_kenya", icon: "instagram" },
      { platform: "YouTube", href: "https://youtube.com/c/kcickenya", icon: "youtube" }
    ],
    contact: {
      address: "Kenya Climate Innovation Centre, University of Nairobi, Nairobi, Kenya",
      phone: "+254 20 123 4567",
      email: "info@kenyacic.org"
    },
    newsletter: {
      title: "Stay Updated",
      description: "Get the latest news on climate innovation and our programmes delivered to your inbox.",
      placeholder: "Enter your email address"
    },
    copyright: "© 2024 Kenya Climate Innovation Centre. All rights reserved."
  }
};