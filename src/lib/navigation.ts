// Shared navigation data for all pages - Updated based on client feedback & new IA
export const navData = {
  logo: {
    src: "/images/kcic-logo.png",
    alt: "KCIC Logo",
  },
  navigation: [
    {
      label: "About Us",
      href: "/about",
      subItems: [
        {
          label: "Who We Are",
          href: "/about/who-we-are",
          description: "Our vision, mission, values, and strategy",
          icon: "Building2",
        },
        {
          label: "Our Team",
          href: "/about/staff",
          description: "Meet the Board and Staff behind KCIC",
          icon: "Users",
        },
        {
          label: "Policies & Disclosures",
          href: "/about/policies-disclosures",
          description: "Transparency in governance and operations",
          icon: "Shield",
        },
        {
          label: "Procurement",
          href: "/about/procurement",
          description: "Tender opportunities and supplier guidelines",
          icon: "FileText",
        },
        {
          label: "Careers",
          href: "/about/careers",
          description: "Join our team and drive climate innovation",
          icon: "Briefcase",
        },
        {
          label: "Contact Us",
          href: "/about/contact-us",
          description: "Get in touch with our team",
          icon: "Phone",
        },
      ],
    },
    {
      label: "Our Work",
      href: "/how-we-work",
      subItems: [
        {
          label: "Our Approach",
          href: "/how-we-work/our-approach",
          description: "How we support climate innovation",
          icon: "Lightbulb",
        },
        {
          label: "Key Sectors",
          href: "/how-we-work/focus-sectors",
          description: "Climate sectors we develop and support",
          icon: "Target",
        },
        {
          label: "Cross Cutting Issues",
          href: "/how-we-work/cross-cutting",
          description: "Gender, youth, and environmental themes",
          icon: "Network",
        },
        {
          label: "Our Partners",
          href: "/how-we-work/partners",
          description: "Organizations we collaborate with",
          icon: "Handshake",
        },
      ],
    },
    {
      label: "Our Programmes",
      href: "/programmes",
      subItems: [
        {
          label: "Flagship Programmes",
          href: "/programmes#flagship",
          description: "Our main programme initiatives",
          icon: "Star",
        },
        {
          label: "Special Projects",
          href: "/programmes#projects",
          description: "Current special projects and initiatives",
          icon: "Rocket",
        },
        {
          label: "Past Projects",
          href: "/programmes#past",
          description: "Completed programmes and outcomes",
          icon: "Archive",
        },
      ],
    },
    {
      label: "Impact",
      href: "/impact",
      subItems: [
        {
          label: "Overview",
          href: "/impact",
          description: "Our impact journey and achievements",
          icon: "TrendUp",
        },
        {
          label: "Theory of Change",
          href: "/impact/theory-of-change",
          description: "Our approach to creating lasting impact",
          icon: "Diagram",
        },
        {
          label: "Our Targets",
          href: "/impact/targets",
          description: "Key performance metrics and goals",
          icon: "Target",
        },
        {
          label: "Impact Reports",
          href: "/impact/reports",
          description: "Downloadable annual impact reports",
          icon: "FileText",
        },
        {
          label: "Impact Stories",
          href: "/impact/stories",
          description: "Real stories from our beneficiaries",
          icon: "BookOpen",
        },
      ],
    },
    {
      label: "Newsroom",
      href: "/newsroom",
      subItems: [
        {
          label: "News",
          href: "/newsroom/news",
          description: "Latest news and announcements",
          icon: "Newspaper",
        },
        {
          label: "Blogs",
          href: "/newsroom/blogs",
          description: "Insights and thought leadership",
          icon: "Article",
        },
        {
          label: "Events",
          href: "/newsroom/events",
          description: "Upcoming and past events",
          icon: "Calendar",
        },
        {
          label: "Podcast",
          href: "/newsroom/podcast",
          description: "Listen to climate innovation stories",
          icon: "Microphone",
        },
        {
          label: "Media Coverage",
          href: "/newsroom/media",
          description: "Press mentions and features",
          icon: "Megaphone",
        },
      ],
    },
   
  ],
};
