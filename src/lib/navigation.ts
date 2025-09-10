// Shared navigation data for all pages
export const navData = {
  logo: {
    src: "/images/kcic-logo.png",
    alt: "KCIC Logo",
  },
  navigation: [
    { 
      label: "About", 
      href: "/about",
      subItems: [
        { 
          label: "About Us", 
          href: "/about", 
          description: "Learn about our mission, vision, and impact in climate innovation",
          icon: "Building2"
        },
        { 
          label: "Our Team", 
          href: "/about/staff", 
          description: "Meet the dedicated professionals driving climate solutions",
          icon: "Users"
        },
        { 
          label: "Board of Directors", 
          href: "/about/board", 
          description: "Leadership and governance guiding our strategic direction",
          icon: "Target"
        },
        { 
          label: "Procurement", 
          href: "/about/procurement", 
          description: "Transparent procurement policies and supplier opportunities",
          icon: "FileText"
        },
      ]
    },
    { 
      label: "Programs", 
      href: "/programs",
      subItems: [
        {
          label: "Incubation Program",
          href: "/programs/incubation",
          description: "Early-stage support for climate innovation startups",
          icon: "Lightbulb"
        },
        {
          label: "Acceleration Program", 
          href: "/programs/acceleration",
          description: "Scale-up support for growing climate ventures",
          icon: "Target"
        }
      ]
    },
    { label: "Impact", href: "/impact" },
    { 
      label: "Contact", 
      href: "/contact",
      subItems: [
        {
          label: "Get in Touch",
          href: "/contact",
          description: "Reach out to our team for partnerships and inquiries",
          icon: "Phone"
        }
      ]
    },
  ],
  ctaButton: {
    text: "Apply Now",
    href: "/apply",
  },
};