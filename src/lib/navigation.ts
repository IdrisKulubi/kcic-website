// Shared navigation data for all pages - Updated based on client feedback
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
          label: "Who we are",
          href: "/about/who-we-are",
          description:
            "Learn about our mission, vision, and impact in climate innovation",
          icon: "Building2",
        },
        {
          label: "Our team",
          href: "/about/our-team",
          description:
            "Meet the dedicated professionals driving climate solutions",
          icon: "Users",
        },
        // {
        //   label: "Policies and disclosures",
        //   href: "/about/policies-disclosures",
        //   description: "Transparency in governance and operational policies",
        //   icon: "Shield",
        // },
        {
          label: "Procurement",
          href: "/about/procurement",
          description:
            "Transparent procurement policies and supplier opportunities",
          icon: "FileText",
        },
        {
          label: "Careers",
          href: "/about/careers",
          description: "Join our team and help drive climate innovation",
          icon: "Briefcase",
        },
        {
          label: "Contact us",
          href: "/about/contact-us",
          description: "Get in touch with our team",
          icon: "Phone",
        },
      ],
    },
    {
      label: "How we work",
      href: "/how-we-work/focus-sectors",
      subItems: [
        {
          label: "Focus sectors",
          href: "/how-we-work/focus-sectors",
          description: "Key climate sectors we support and develop",
          icon: "Target",
        },
      ],
    },
    {
      label: "Our Programmes",
      href: "/programmes",
    },

    // {
    //   label: "Newsroom",
    //   href: "/newsroom",
    //   subItems: [
    //     {
    //       label: "Publications",
    //       href: "/newsroom/publications",
    //       description: "Research reports and industry insights",
    //       icon: "FileText",
    //     },
    //     {
    //       label: "Events",
    //       href: "/newsroom/events",
    //       description: "Upcoming and past events, conferences, and workshops",
    //       icon: "Calendar",
    //     },
    //     {
    //       label: "Press Release",
    //       href: "/newsroom/press-release",
    //       description: "Latest press releases and media coverage",
    //       icon: "Megaphone",
    //     },
    //     {
    //       label: "Fact sheets",
    //       href: "/newsroom/fact-sheets",
    //       description: "Key facts and figures about our work",
    //       icon: "ClipboardList",
    //     },
    //   ],
    // },
    {
      label: "FAQs",
      href: "/faqs",
    },
  ],
};
