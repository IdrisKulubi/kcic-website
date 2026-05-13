import { FLAGSHIP_URLS } from "@/config/flagship-external-urls";

export type FlagshipCtaKey = "apply" | "explore" | "learnMore";

export type FlagshipCtaSpec = {
  key: FlagshipCtaKey;
  label: string;
  /** Explore / Learn more target */
  href?: string;
  /** Apply: used when `programme.applicationLink` is empty */
  fallbackHref?: string;
  external?: boolean;
};

export type FlagshipApproachBlock =
  | { kind: "paragraphs"; paragraphs: string[] }
  | { kind: "list"; title?: string; items: string[] }
  | { kind: "sectors"; title: string; items: string[] }
  | { kind: "pathways"; title: string; columns: { title: string; body: string }[] }
  | { kind: "components"; title: string; items: string[] }
  | {
      kind: "detailCards";
      title: string;
      lead?: string;
      items: { title: string; body: string }[];
    };

export type FlagshipImpactIconKey =
  | "hubs"
  | "users"
  | "jobs"
  | "finance"
  | "climate"
  | "enterprises"
  | "waste"
  | "generic";

export type FlagshipImpactMetric = {
  value: string;
  label: string;
  icon?: FlagshipImpactIconKey;
};

export type FlagshipStoryLink = {
  title: string;
  href: string;
  external?: boolean;
};

export type FlagshipFunderLogo = {
  name: string;
  logoSrc: string;
};

/** Hard-coded presentation layer so flagship pages do not depend on CMS copy for layout. */
export type FlagshipPageShell = {
  title: string;
  description: string;
  image: string;
  headerImage?: string | null;
  /** Hex or CSS color for accents (replaces DB `color` tokens on flagship pages) */
  color: string;
};

export interface FlagshipProgrammeContent {
  slug: string;
  /** Overrides programme title, hero imagery, and accent when set */
  shell?: FlagshipPageShell;
  heroEyebrow?: string;
  heroLead?: string;
  ctas: FlagshipCtaSpec[];
  approachTitle: string;
  approachBlocks: FlagshipApproachBlock[];
  outcomesTitle: string;
  outcomes: string[];
  impactTitle: string;
  impactMetrics: FlagshipImpactMetric[];
  /** Optional note below the impact grid (e.g. SWIFT reporting cycle) */
  impactNotes?: string;
  featuredStories?: {
    title: string;
    intro: string;
    links: FlagshipStoryLink[];
  };
  strategicPartners?: {
    title: string;
    subtitle: string;
    partners: { role: string; name: string; logoSrc: string }[];
  };
  /** Config-first funders strip (preferred over DB sponsors when set) */
  fundedBy?: FlagshipFunderLogo[];
  /** Schematic Kenya BIH map (AgriBiz) */
  showBihMap?: boolean;
}

/** Route or legacy DB slugs -> canonical flagship key in `FLAGSHIP_PROGRAMMES` */
export const FLAGSHIP_SLUG_ALIASES: Record<string, string> = {
  agribiz: "agribiz-programme",
  greenbiz: "greenbiz-programme",
  puse: "puse-programme",
  swift: "swift-programme",
  dreem: "dreem-hub",
};

export const FLAGSHIP_PROGRAMMES: Record<string, FlagshipProgrammeContent> = {
  "agribiz-programme": {
    slug: "agribiz-programme",
    shell: {
      title: "The AgriBiz Programme",
      description:
        "A five-year initiative catalysing women and youth participation in agricultural and livestock value chains across Kenya.",
      image: "/images/sectors/agriculture.webp",
      headerImage: "/images/sectors/agriculture.webp",
      color: "#a16207",
    },
    heroEyebrow: "Flagship programme",
    heroLead:
      "The AgriBiz Programme was commissioned in 2020 with support from the European Union (EU) and Danida. The five-year initiative was designed to catalyse and enable greater participation of women and youth in agricultural and livestock value chains. The programme primarily targets women and youth-owned early-stage agribusiness enterprises as well as Small and Medium Enterprises (SMEs).",
    ctas: [
      { key: "apply", label: "Apply", fallbackHref: FLAGSHIP_URLS.agribizApply, external: true },
      { key: "explore", label: "Explore Enterprises", href: FLAGSHIP_URLS.exploreStories },
      { key: "learnMore", label: "Learn More", href: FLAGSHIP_URLS.agribizWebsite, external: true },
    ],
    approachTitle: "Our Approach",
    approachBlocks: [
      {
        kind: "paragraphs",
        paragraphs: [
          "Agriculture remains the backbone of Kenya's economy and plays a critical role in food security, employment, and export earnings. The sector is a key driver of national development priorities under Vision 2030 and the government's economic transformation agenda.",
          "Support is delivered through eight Business Incubation Hubs (BIHs) located in Kiambu, Bungoma, Kilifi, Uasin Gishu, Meru, Isiolo, Machakos, and Kisii. These hubs provide access to finance, business advisory and technical assistance, shared services and facilities, and critical market information.",
        ],
      },
    ],
    outcomesTitle: "Expected Outcomes",
    outcomes: [
      "Create sustainable business and employment opportunities for youth and women in agribusiness.",
      "Increase access to finance through tailored financial instruments and blending mechanisms.",
      "Strengthen selected agricultural and bio-enterprise value chains while fostering climate-smart practices.",
      "Contribute to a supportive policy and regulatory environment for inclusive agribusiness growth.",
    ],
    impactTitle: "Impact to Date",
    impactMetrics: [
      { value: "8", label: "Business Incubation Hubs established across eight counties.", icon: "hubs" },
      {
        value: "2,100",
        label: "Women and youth-led agribusiness enterprises supported through financing, training, and mentorship.",
        icon: "enterprises",
      },
      { value: "19,000", label: "Jobs created directly and indirectly through programme interventions.", icon: "jobs" },
    ],
    fundedBy: [
      { name: "European Union (EU)", logoSrc: "/images/funders/eu.svg" },
      { name: "Danida", logoSrc: "/images/funders/danida.svg" },
    ],
    showBihMap: true,
  },

  "greenbiz-programme": {
    slug: "greenbiz-programme",
    shell: {
      title: "The GreenBiz Programme",
      description:
        "Accelerating the commercialisation and scale-up of climate-smart innovations for sustainable economic growth and climate resilience.",
      image: "/images/programmes/greenbiz.jpg",
      headerImage: "/images/programmes/greenbiz.jpg",
      color: "#15803d",
    },
    heroEyebrow: "Flagship programme",
    heroLead:
      "The GreenBiz Programme is designed to accelerate the commercialisation and scale-up of climate-smart innovations that contribute to sustainable economic growth and climate resilience. The programme supports entrepreneurs and enterprises developing solutions that address climate change while creating economic opportunities.",
    ctas: [
      { key: "apply", label: "Apply", fallbackHref: FLAGSHIP_URLS.corporateApplyFallback, external: true },
      { key: "explore", label: "Explore Enterprises", href: FLAGSHIP_URLS.exploreStories },
      { key: "learnMore", label: "Learn More", href: FLAGSHIP_URLS.greenbizLearnMore, external: true },
    ],
    approachTitle: "Our Approach",
    approachBlocks: [
      {
        kind: "paragraphs",
        paragraphs: [
          "GreenBiz focuses on accelerating climate innovation across five key sectors that are critical for sustainable development and climate resilience in Kenya:",
        ],
      },
      {
        kind: "sectors",
        title: "Focus sectors",
        items: [
          "Renewable Energy and Energy Efficiency",
          "Water Management",
          "Climate-Smart Agriculture",
          "Commercial Forestry",
          "Waste Management",
        ],
      },
      {
        kind: "paragraphs",
        paragraphs: ["To support enterprises at different stages of growth, the programme offers two tailored pathways:"],
      },
      {
        kind: "pathways",
        title: "Programme pathways",
        columns: [
          {
            title: "Incubation Programme",
            body: "Supports early-stage enterprises that have developed a prototype or proof of concept. The programme helps innovators validate their ideas, strengthen business models, and move toward commercialisation.",
          },
          {
            title: "Accelerator Programme",
            body: "Designed for growth-stage enterprises with proven business models and annual revenues above KES 2 million. The accelerator provides intensive and customised support to help enterprises scale operations and attract investment.",
          },
        ],
      },
      {
        kind: "list",
        title: "Enterprises in the programme benefit from a comprehensive package that includes:",
        items: [
          "Business advisory services and strategic coaching",
          "Mentorship from industry and sector experts",
          "Access to market intelligence and technical facilities",
          "Policy and regulatory engagement to strengthen the green innovation ecosystem",
          "Access to finance through direct programme support and connections to external investors, grants, and debt financing.",
        ],
      },
    ],
    outcomesTitle: "Expected Outcomes",
    outcomes: [
      "Accelerated commercialisation and scale-up of climate-smart enterprises.",
      "Increased access to finance for green businesses.",
      "Strengthened policy and regulatory environment for climate innovation.",
      "Support for 300 climate technologies and innovative business models.",
      "Creation of over 3,000 full-time job opportunities in green sectors.",
    ],
    impactTitle: "Impact to Date",
    impactMetrics: [
      { value: "USD 20 Million", label: "Mobilized for the growth and scaling of green enterprises.", icon: "finance" },
      {
        value: "150",
        label: "Enterprises supported through incubation and acceleration programmes.",
        icon: "enterprises",
      },
      { value: "3,000", label: "Jobs created across climate innovation sectors.", icon: "jobs" },
    ],
    fundedBy: [{ name: "Danish International Development Agency (Danida)", logoSrc: "/images/funders/danida.svg" }],
  },

  "puse-programme": {
    slug: "puse-programme",
    shell: {
      title: "PUSE Pilot Programme",
      description:
        "A two-year productive use of solar energy pilot across Kenya, Uganda, and Tanzania supporting solar-powered agricultural solutions.",
      image: "/images/programmes/puse.jpg",
      headerImage: "/images/programmes/puse.jpg",
      color: "#c2410c",
    },
    heroEyebrow: "Pilot programme",
    heroLead:
      "The Productive Use of Solar Energy (PUSE) Pilot Programme is a two-year pilot programme from January 2023 to December 2024 implemented across Kenya, Uganda, and Tanzania under the initiative \"Financing Solutions for Local Productive Use of Solar Energy Entrepreneurs in East Africa's Agriculture Sector.\"",
    ctas: [
      { key: "explore", label: "Explore Enterprises", href: FLAGSHIP_URLS.exploreStories },
      { key: "learnMore", label: "Learn More", href: FLAGSHIP_URLS.puseLearnMore, external: true },
    ],
    approachTitle: "Our Approach",
    approachBlocks: [
      {
        kind: "paragraphs",
        paragraphs: [
          "The Programme's main objective is to address barriers that limit the adoption of solar-powered productive technologies in key agricultural value chains including dairy, horticulture, and aquaculture by supporting enterprises to deploy solar-powered solutions that improve productivity, reduce energy costs, and strengthen climate resilience in rural communities.",
        ],
      },
      {
        kind: "list",
        title: "Participating enterprises received customised support tailored to their specific business needs, including:",
        items: [
          "Business advisory and strategic growth support",
          "Technical assistance to strengthen solar-powered product and service delivery",
          "Support to improve market access and customer outreach",
          "Facilitation of financing opportunities and investment linkages",
          "Capacity strengthening to scale productive-use solar solutions across agricultural value chains",
        ],
      },
    ],
    outcomesTitle: "Expected Outcomes",
    outcomes: [
      "Maximise the economic and social benefits of solar energy access.",
      "Advance SDG 7 by increasing access to clean, affordable, and renewable energy.",
      "Improve the economic sustainability of rural electrification projects and renewable energy markets.",
      "Support enterprises to scale PUSE solutions, create jobs, and strengthen community resilience.",
    ],
    impactTitle: "Impact to Date",
    impactMetrics: [
      { value: "407", label: "Direct jobs created (target 160) and 1,200+ indirect jobs supported.", icon: "jobs" },
      {
        value: "23,516",
        label: "New customers reached, marking a 68% increase in PUSE uptake (target 40%).",
        icon: "users",
      },
      {
        value: "USD 2.05M",
        label: "Revenue growth recorded among participating enterprises (19% increase).",
        icon: "finance",
      },
      { value: "USD 763,256", label: "External financing mobilised (target USD 50,000).", icon: "generic" },
      { value: "342,543 tonnes", label: "CO2e emissions reduced (target 100,000).", icon: "climate" },
    ],
    fundedBy: [{ name: "Charles Stewart Mott Foundation", logoSrc: "/images/funders/mott.png" }],
    featuredStories: {
      title: "Featured Enterprises",
      intro:
        "The programme supported 30 enterprises, 10 from each country, through tailored business advisory and technical support to scale solar-powered solutions that improve productivity, create jobs, and strengthen climate resilience in rural communities.",
      links: [
        { title: "Impact stories", href: "/impact/stories" },
        { title: "Kenya Climate Innovation Centre news", href: "https://kenyacic.org/", external: true },
      ],
    },
  },

  "swift-programme": {
    slug: "swift-programme",
    shell: {
      title: "SWIFT Programme",
      description:
        "Transforming waste management by helping Kenyan SMEs scale circular economy solutions from 2023 to 2026.",
      image: "/images/programmes/swift.jpg",
      headerImage: "/images/programmes/swift.jpg",
      color: "#0f766e",
    },
    heroEyebrow: "Transforming Waste Management",
    heroLead:
      "The Sustainable Waste Innovation for a Future in Transition (SWIFT) Programme is a three-year initiative (2023-2026) targeting Small and Medium Enterprises (SMEs) in the waste management sector in Kenya. The programme supports SMEs in the sector to develop innovative circular economy solutions that transform waste into valuable resources while creating jobs and improving environmental sustainability.",
    ctas: [
      { key: "apply", label: "Apply", fallbackHref: FLAGSHIP_URLS.corporateApplyFallback, external: true },
      { key: "explore", label: "Explore Enterprises", href: FLAGSHIP_URLS.exploreStories },
      { key: "learnMore", label: "Learn More", href: FLAGSHIP_URLS.swiftLearnMore, external: true },
    ],
    approachTitle: "Our Approach",
    approachBlocks: [
      {
        kind: "paragraphs",
        paragraphs: [
          "Kenya's waste management and circular economy sector holds significant potential for job creation, climate action, and inclusive growth. However, many promising enterprises face barriers related to technical capacity, access to finance, markets, and policy alignment.",
          "SWIFT was designed to bridge these gaps by providing targeted support that enables enterprises to scale responsibly while contributing to national development priorities.",
        ],
      },
      {
        kind: "pathways",
        title: "Tailored pathways",
        columns: [
          {
            title: "Incubation Programme",
            body: "Supports early-stage enterprises with a prototype or minimum viable product, focusing on market validation, product development, and commercialisation.",
          },
          {
            title: "Acceleration Programme",
            body: "Targets growth-stage enterprises with proven traction, helping them scale operations and strengthen investment readiness.",
          },
        ],
      },
      {
        kind: "detailCards",
        title: "Key Programme Components",
        lead: "SWIFT delivers targeted, end-to-end support to waste and circular economy enterprises through the following core components:",
        items: [
          {
            title: "Business Advisory Support",
            body: "Tailored incubation and acceleration services that strengthen enterprise strategy, operations, governance, and growth readiness.",
          },
          {
            title: "Compliance for Market Access",
            body: "Support to meet regulatory, quality, and standards requirements necessary for market entry, scale, and investment readiness.",
          },
          {
            title: "Technical Assistance",
            body: "Hands-on technical support to improve processes, product quality, operational efficiency, and environmental performance.",
          },
          {
            title: "Access to Finance",
            body: "Beyond comprehensive non-financial support, SWIFT provides financing options to successful enterprises admitted into the incubation or accelerator programmes. Financial support may include matching grants, repayable grants, and support to leverage external financing, alongside investment readiness support.",
          },
          {
            title: "Sustainability Integration",
            body: "Embedding circular economy principles and sustainability practices into enterprise models, operations, and decision-making to ensure long-term environmental and economic value.",
          },
          {
            title: "Policy & Advocacy Support",
            body: "Collaboration with national and county governments to strengthen policies and regulatory frameworks that enable private sector participation. SWIFT works closely with Nairobi, Kisumu, Mombasa, Nakuru, and Uasin Gishu counties to support policy development, advocacy, and coordination.",
          },
          {
            title: "Technology Solutions",
            body: "Support for the adoption, piloting, and scaling of innovative technologies that improve waste recovery, processing, and circularity across the value chain.",
          },
        ],
      },
    ],
    outcomesTitle: "Expected Outcomes",
    outcomes: [
      "Development of innovative and scalable business models in waste management.",
      "Strengthened enabling environment through national and county policy support.",
      "Growth of a circular, green, and inclusive economy.",
      "Creation of decent jobs and improved household livelihoods.",
      "Transformation of waste into a resource, advancing recycling, resource recovery, and reduced environmental impact.",
    ],
    impactTitle: "Impact to Date",
    impactMetrics: [
      {
        value: "57 / 53",
        label: "Enterprises onboarded for incubation and acceleration support in its first year of implementation, and in the second cohort.",
        icon: "enterprises",
      },
      { value: "XX", label: "Jobs created or sustained.", icon: "jobs" },
      { value: "XX", label: "Counties reached.", icon: "hubs" },
      { value: "XX", label: "Waste diverted or recycled.", icon: "waste" },
      { value: "XX", label: "Enterprises led by women and youth (percentage).", icon: "users" },
    ],
    fundedBy: [{ name: "IKEA Foundation", logoSrc: "/images/funders/ikea-foundation.svg" }],
  },

  "dreem-hub": {
    slug: "dreem-hub",
    shell: {
      title: "DREEM Hub Programme",
      description:
        "Solarising key agricultural value chains in last-mile communities through the Distributed Renewable Energy Ecosystem Model.",
      image: "/images/programmes/biz.jpg",
      headerImage: "/images/programmes/biz.jpg",
      color: "#1d4ed8",
    },
    heroEyebrow: "Solarising Agriculture for Rural Transformation",
    heroLead:
      "The Distributed Renewable Energy Ecosystem Model (DREEM) Hub Programme is a three-year initiative (2024-2027) that seeks to solarise key agricultural value chains, particularly dairy and horticulture, within last-mile communities in Kenya. By integrating renewable energy into agricultural production and processing, the programme improves productivity, reduces post-harvest losses, and strengthens rural livelihoods while contributing to national climate action goals.",
    ctas: [
      { key: "apply", label: "Apply", fallbackHref: FLAGSHIP_URLS.dreemLearnMore, external: true },
      { key: "explore", label: "Explore Enterprises", href: FLAGSHIP_URLS.dreemExploreEnterprises, external: true },
      { key: "learnMore", label: "Learn More", href: FLAGSHIP_URLS.dreemLearnMore, external: true },
    ],
    approachTitle: "Our Approach",
    approachBlocks: [
      {
        kind: "paragraphs",
        paragraphs: [
          "The DREEM Hub Programme applies a hub-and-spoke model, where KCIC provides central coordination while partners deliver specialised services to farmers, cooperatives, and agrisolar enterprises.",
        ],
      },
      {
        kind: "list",
        title: "Key programme interventions:",
        items: [
          "Enterprise support through mentorship, incubation, and acceleration for agrisolar entrepreneurs.",
          "Access to finance through a USD 460,000 concessional loan facility, low-interest loans, and a revolving PUSE Fund supporting cooperatives and enterprises.",
          "Skills development to train 1,000 youth and women in technical and business skills within the agrisolar sector.",
          "Market linkages through solar-powered cold chains and partnerships that strengthen agricultural value chains.",
          "Research and innovation, including a demonstration farm serving as a living laboratory to test and showcase scalable agrisolar technologies.",
        ],
      },
    ],
    outcomesTitle: "Expected Outcomes",
    outcomes: [
      "Increased agrisolar adoption: Expand access to solar-powered agricultural solutions among 1,000+ farmers and cooperatives.",
      "Economic empowerment: Raise annual incomes of agrisolar entrepreneurs by at least 30%.",
      "Job creation: Generate 700 direct and 2,100 indirect jobs.",
      "Climate impact: Reduce 300,000 tonnes of CO2 emissions in three years.",
      "Financial inclusion: Improve access to finance for 15 cooperatives through concessional loans and revolving funds.",
      "Ecosystem strengthening: Build a coordinated, multi-stakeholder platform supporting agrisolar innovation, financing, and market linkages.",
    ],
    impactTitle: "Impact to Date",
    impactMetrics: [
      { value: "1,000+", label: "Entrepreneurs supported", icon: "users" },
      { value: "2,800+", label: "Jobs created", icon: "jobs" },
      { value: "300,000", label: "Tons of CO2e reduced", icon: "climate" },
      { value: "$800,000+", label: "Funding mobilized", icon: "finance" },
    ],
    strategicPartners: {
      title: "Our Strategic Partners",
      subtitle: "Collaborating with leading organizations to drive sustainable impact across East Africa",
      partners: [
        { role: "Funder", name: "Charles Stewart Mott Foundation", logoSrc: "/images/funders/mott.png" },
        { role: "Hub Host (Kenya)", name: "Kenya Climate Innovation Centre", logoSrc: "/images/funders/kcic.png" },
        { role: "Hub Host (Tanzania)", name: "WWF Tanzania", logoSrc: "/images/funders/tanzania.png" },
        { role: "Hub Host (Uganda)", name: "Heifer International", logoSrc: "/images/funders/uganda.png" },
      ],
    },
  },
};

const flagshipRecord = FLAGSHIP_PROGRAMMES as Record<string, FlagshipProgrammeContent>;

export const FLAGSHIP_SLUGS = new Set(Object.keys(FLAGSHIP_PROGRAMMES));

/**
 * All slug strings to try when matching CMS / URL slugs to flagship config.
 * Handles casing, `the-` prefix, legacy `programmes-*` seed slugs, and `-programme` suffix.
 */
function collectFlagshipSlugVariants(input: string): string[] {
  const trimmed = input.trim();
  if (!trimmed) return [];
  const n = trimmed.toLowerCase();
  const out = new Set<string>();
  const add = (s: string) => {
    if (s) out.add(s);
  };
  add(trimmed);
  add(n);
  add(n.replace(/^the-/, ""));
  add(n.replace(/^programmes-/, ""));
  add(n.replace(/-programme$/, ""));
  add(n.replace(/^the-/, "").replace(/^programmes-/, ""));
  add(n.replace(/^the-/, "").replace(/-programme$/, ""));
  const legacy = n.match(/^programmes-(.+)$/);
  if (legacy) add(legacy[1]);
  return [...out];
}

export function getFlagshipContent(slug: string): FlagshipProgrammeContent | null {
  for (const v of collectFlagshipSlugVariants(slug)) {
    if (v in flagshipRecord) return flagshipRecord[v];
    const mapped = FLAGSHIP_SLUG_ALIASES[v];
    if (mapped && mapped in flagshipRecord) return flagshipRecord[mapped];
  }
  return null;
}

export function getFlagshipContentForProgramme(programme: {
  slug?: string | null;
  title?: string | null;
}): FlagshipProgrammeContent | null {
  const bySlug = programme.slug ? getFlagshipContent(programme.slug) : null;
  if (bySlug) return bySlug;

  const byTitle = programme.title ? getFlagshipContent(programme.title) : null;
  if (byTitle) return byTitle;

  const normalizedTitle = programme.title?.toLowerCase().trim() ?? "";
  if (normalizedTitle.includes("agribiz")) return flagshipRecord["agribiz-programme"];
  if (normalizedTitle.includes("greenbiz")) return flagshipRecord["greenbiz-programme"];
  if (normalizedTitle.includes("puse")) return flagshipRecord["puse-programme"];
  if (normalizedTitle.includes("swift")) return flagshipRecord["swift-programme"];
  if (normalizedTitle.includes("dreem")) return flagshipRecord["dreem-hub"];

  return null;
}

/** Same as `getFlagshipContent` - resolves short slugs like `swift` -> `swift-programme`. */
export function getFlagshipContentForRouteSlug(slug: string): FlagshipProgrammeContent | null {
  return getFlagshipContent(slug);
}

/** Ordered slug candidates to try against the database (URL slug first, then canonical). */
export function slugCandidatesForFlagship(requested: string): string[] {
  const order: string[] = [];
  const add = (s: string) => {
    const t = s.trim();
    if (!t || order.includes(t)) return;
    order.push(t);
  };
  add(requested);
  const resolved = getFlagshipContent(requested);
  if (resolved) add(resolved.slug);
  for (const v of collectFlagshipSlugVariants(requested)) add(v);
  if (resolved) {
    for (const [alias, canon] of Object.entries(FLAGSHIP_SLUG_ALIASES)) {
      if (canon === resolved.slug) add(alias);
    }
  }
  return order;
}

export function isFlagshipSlug(slug: string): boolean {
  return getFlagshipContent(slug) !== null;
}
