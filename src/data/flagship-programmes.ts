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
  | { kind: "components"; title: string; items: string[] };

export type FlagshipImpactMetric = {
  value: string;
  label: string;
};

export type FlagshipStoryLink = {
  title: string;
  href: string;
  external?: boolean;
};

export interface FlagshipProgrammeContent {
  slug: string;
  heroEyebrow?: string;
  heroLead?: string;
  ctas: FlagshipCtaSpec[];
  approachTitle: string;
  approachBlocks: FlagshipApproachBlock[];
  outcomesTitle: string;
  outcomes: string[];
  impactTitle: string;
  impactMetrics: FlagshipImpactMetric[];
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
  /** Schematic Kenya BIH map (AgriBiz) */
  showBihMap?: boolean;
}

const explore = FLAGSHIP_URLS.exploreEnterprises;

export const FLAGSHIP_PROGRAMMES: Record<string, FlagshipProgrammeContent> = {
  "agribiz-programme": {
    slug: "agribiz-programme",
    heroEyebrow: "Flagship programme",
    heroLead:
      "Commissioned in 2020 with support from the European Union (EU) and Danida, this five-year initiative catalyses greater participation of women and youth in agricultural and livestock value chains. It targets women and youth-owned early-stage agribusiness enterprises and SMEs.",
    ctas: [
      { key: "apply", label: "Apply", fallbackHref: FLAGSHIP_URLS.agribizApply, external: true },
      { key: "explore", label: "Explore enterprises", href: explore },
      { key: "learnMore", label: "Learn more", href: FLAGSHIP_URLS.agribizWebsite, external: true },
    ],
    approachTitle: "Our approach",
    approachBlocks: [
      {
        kind: "paragraphs",
        paragraphs: [
          "Agriculture remains the backbone of Kenya’s economy and plays a critical role in food security, employment, and export earnings. The sector supports national priorities under Vision 2030 and the government’s economic transformation agenda.",
          "Support is delivered through eight Business Incubation Hubs (BIHs) located in Kiambu, Bungoma, Kilifi, Uasin Gishu, Meru, Isiolo, Machakos, and Kisii. These hubs provide access to finance, business advisory and technical assistance, shared services and facilities, and critical market information.",
        ],
      },
    ],
    outcomesTitle: "Expected outcomes",
    outcomes: [
      "Create sustainable business and employment opportunities for youth and women in agribusiness.",
      "Increase access to finance through tailored financial instruments and blending mechanisms.",
      "Strengthen selected agricultural and bio-enterprise value chains while fostering climate-smart practices.",
      "Contribute to a supportive policy and regulatory environment for inclusive agribusiness growth.",
    ],
    impactTitle: "Impact to date",
    impactMetrics: [
      { value: "8", label: "Business Incubation Hubs across eight counties" },
      { value: "2,100", label: "Women and youth-led agribusiness enterprises supported" },
      { value: "19,000", label: "Jobs created directly and indirectly" },
    ],
    showBihMap: true,
  },

  "greenbiz-programme": {
    slug: "greenbiz-programme",
    heroEyebrow: "Flagship programme",
    heroLead:
      "Designed to accelerate the commercialisation and scale-up of climate-smart innovations for sustainable economic growth and climate resilience. The programme supports entrepreneurs and enterprises developing solutions that address climate change while creating economic opportunities.",
    ctas: [
      {
        key: "apply",
        label: "Apply",
        fallbackHref: "https://kenyacic.org/",
        external: true,
      },
      { key: "explore", label: "Explore enterprises", href: explore },
      { key: "learnMore", label: "Learn more", href: "https://kenyacic.org/", external: true },
    ],
    approachTitle: "Our approach",
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
          "Renewable energy and energy efficiency",
          "Water management",
          "Climate-smart agriculture",
          "Commercial forestry",
          "Waste management",
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
            title: "Incubation programme",
            body: "Supports early-stage enterprises that have developed a prototype or proof of concept. The programme helps innovators validate their ideas, strengthen business models, and move toward commercialisation.",
          },
          {
            title: "Accelerator programme",
            body: "Designed for growth-stage enterprises with proven business models and annual revenues above KES 2 million. The accelerator provides intensive and customised support to help enterprises scale operations and attract investment.",
          },
        ],
      },
      {
        kind: "list",
        title: "Enterprises in the programme benefit from:",
        items: [
          "Business advisory services and strategic coaching",
          "Mentorship from industry and sector experts",
          "Access to market intelligence and technical facilities",
          "Policy and regulatory engagement to strengthen the green innovation ecosystem",
          "Access to finance through direct programme support and connections to external investors, grants, and debt financing",
        ],
      },
    ],
    outcomesTitle: "Expected outcomes",
    outcomes: [
      "Accelerated commercialisation and scale-up of climate-smart enterprises.",
      "Increased access to finance for green businesses.",
      "Strengthened policy and regulatory environment for climate innovation.",
      "Support for 300 climate technologies and innovative business models.",
      "Creation of over 3,000 full-time job opportunities in green sectors.",
    ],
    impactTitle: "Impact to date",
    impactMetrics: [
      { value: "USD 20M", label: "Mobilized for the growth and scaling of green enterprises" },
      { value: "150", label: "Enterprises supported through incubation and acceleration" },
      { value: "3,000", label: "Jobs created across climate innovation sectors" },
    ],
  },

  "puse-programme": {
    slug: "puse-programme",
    heroEyebrow: "Pilot programme (Jan 2023 – Dec 2024)",
    heroLead:
      "The Productive Use of Solar Energy (PUSE) Pilot Programme was implemented across Kenya, Uganda, and Tanzania under the initiative “Financing Solutions for Local Productive Use of Solar Energy Entrepreneurs in East Africa’s Agriculture Sector.”",
    ctas: [
      { key: "explore", label: "Explore enterprises", href: explore },
      { key: "learnMore", label: "Learn more", href: "https://kenyacic.org/", external: true },
    ],
    approachTitle: "Our approach",
    approachBlocks: [
      {
        kind: "paragraphs",
        paragraphs: [
          "The programme’s main objective is to address barriers that limit the adoption of solar-powered productive technologies in key agricultural value chains including dairy, horticulture, and aquaculture—supporting enterprises to deploy solar-powered solutions that improve productivity, reduce energy costs, and strengthen climate resilience in rural communities.",
        ],
      },
      {
        kind: "list",
        title: "Participating enterprises received customised support, including:",
        items: [
          "Business advisory and strategic growth support",
          "Technical assistance to strengthen solar-powered product and service delivery",
          "Support to improve market access and customer outreach",
          "Facilitation of financing opportunities and investment linkages",
          "Capacity strengthening to scale productive-use solar solutions across agricultural value chains",
        ],
      },
    ],
    outcomesTitle: "Expected outcomes",
    outcomes: [
      "Maximise the economic and social benefits of solar energy access.",
      "Advance SDG 7 by increasing access to clean, affordable, and renewable energy.",
      "Improve the economic sustainability of rural electrification projects and renewable energy markets.",
      "Support enterprises to scale PUSE solutions, create jobs, and strengthen community resilience.",
    ],
    impactTitle: "Impact to date",
    impactMetrics: [
      { value: "407", label: "Direct jobs created (target 160) and 1,200+ indirect jobs supported" },
      { value: "23,516", label: "New customers reached — 68% increase in PUSE uptake (target 40%)" },
      { value: "USD 2.05M", label: "Revenue growth among participating enterprises (19% increase)" },
      { value: "USD 763,256", label: "External financing mobilised (target USD 50,000)" },
      { value: "342,543 t", label: "CO₂e emissions reduced (target 100,000)" },
    ],
    featuredStories: {
      title: "Featured enterprises",
      intro:
        "The programme supported 30 enterprises—10 from each country—through tailored business advisory and technical support to scale solar-powered solutions that improve productivity, create jobs, and strengthen climate resilience in rural communities.",
      links: [
        { title: "Impact stories", href: "/impact/stories" },
        { title: "Kenya Climate Innovation Centre — news", href: "https://kenyacic.org/", external: true },
      ],
    },
  },

  "swift-programme": {
    slug: "swift-programme",
    heroEyebrow: "Transforming waste management",
    heroLead:
      "The Sustainable Waste Innovation for a Future in Transition (SWIFT) Programme is a three-year initiative (2023–2026) targeting SMEs in Kenya’s waste management sector. It supports innovative circular economy solutions that transform waste into valuable resources while creating jobs and improving environmental sustainability.",
    ctas: [
      { key: "apply", label: "Apply", fallbackHref: "https://kenyacic.org/", external: true },
      { key: "explore", label: "Explore enterprises", href: explore },
      { key: "learnMore", label: "Learn more", href: "https://kenyacic.org/", external: true },
    ],
    approachTitle: "Our approach",
    approachBlocks: [
      {
        kind: "paragraphs",
        paragraphs: [
          "Kenya’s waste management and circular economy sector holds significant potential for job creation, climate action, and inclusive growth. Many promising enterprises face barriers related to technical capacity, access to finance, markets, and policy alignment.",
          "SWIFT bridges these gaps by providing targeted support that enables enterprises to scale responsibly while contributing to national development priorities.",
        ],
      },
      {
        kind: "pathways",
        title: "Tailored pathways",
        columns: [
          {
            title: "Incubation programme",
            body: "Supports early-stage enterprises with a prototype or minimum viable product, focusing on market validation, product development, and commercialisation.",
          },
          {
            title: "Acceleration programme",
            body: "Targets growth-stage enterprises with proven traction, helping them scale operations and strengthen investment readiness.",
          },
        ],
      },
      {
        kind: "components",
        title: "Key programme components",
        items: [
          "Business advisory support — tailored incubation and acceleration services for strategy, operations, governance, and growth readiness.",
          "Compliance for market access — regulatory, quality, and standards support for market entry, scale, and investment readiness.",
          "Technical assistance — hands-on support for processes, product quality, operational efficiency, and environmental performance.",
          "Access to finance — matching grants, repayable grants, leverage of external financing, and investment readiness support.",
          "Sustainability integration — embedding circular economy principles into enterprise models and operations.",
          "Policy and advocacy support — collaboration with national and county governments; close work with Nairobi, Kisumu, Mombasa, Nakuru, and Uasin Gishu counties.",
          "Technology solutions — adoption, piloting, and scaling of innovations that improve waste recovery, processing, and circularity.",
        ],
      },
    ],
    outcomesTitle: "Expected outcomes",
    outcomes: [
      "Development of innovative and scalable business models in waste management.",
      "Strengthened enabling environment through national and county policy support.",
      "Growth of a circular, green, and inclusive economy.",
      "Creation of decent jobs and improved household livelihoods.",
      "Transformation of waste into a resource through recycling, resource recovery, and reduced environmental impact.",
    ],
    impactTitle: "Impact to date",
    impactMetrics: [
      { value: "57 / 53", label: "Enterprises onboarded (year one / second cohort)" },
      { value: "TBD", label: "Jobs created or sustained — figures to be confirmed" },
      { value: "TBD", label: "Counties reached — figures to be confirmed" },
      { value: "TBD", label: "Waste diverted or recycled — figures to be confirmed" },
      { value: "TBD", label: "Women- and youth-led enterprises (%) — figures to be confirmed" },
    ],
  },

  "dreem-hub": {
    slug: "dreem-hub",
    heroEyebrow: "Solarising agriculture for rural transformation",
    heroLead:
      "The Distributed Renewable Energy Ecosystem Model (DREEM) Hub Programme is a three-year initiative (2024–2027) that seeks to solarise key agricultural value chains, particularly dairy and horticulture, within last-mile communities in Kenya—integrating renewable energy into production and processing to improve productivity, reduce post-harvest losses, and strengthen rural livelihoods.",
    ctas: [
      { key: "apply", label: "Apply", fallbackHref: "https://dreemhub.kenyacic.org/", external: true },
      { key: "explore", label: "Explore enterprises", href: explore },
      { key: "learnMore", label: "Learn more", href: FLAGSHIP_URLS.dreemLearnMore, external: true },
    ],
    approachTitle: "Our approach",
    approachBlocks: [
      {
        kind: "paragraphs",
        paragraphs: [
          "The DREEM Hub Programme applies a hub-and-spoke model: KCIC provides central coordination while partners deliver specialised services to farmers, cooperatives, and agrisolar enterprises.",
        ],
      },
      {
        kind: "list",
        title: "Key programme interventions",
        items: [
          "Enterprise support through mentorship, incubation, and acceleration for agrisolar entrepreneurs.",
          "Access to finance through a USD 460,000 concessional loan facility, low-interest loans, and a revolving PUSE Fund supporting cooperatives and enterprises.",
          "Skills development to train 1,000 youth and women in technical and business skills within the agrisolar sector.",
          "Market linkages through solar-powered cold chains and partnerships that strengthen agricultural value chains.",
          "Research and innovation, including a demonstration farm as a living laboratory to test and showcase scalable agrisolar technologies.",
        ],
      },
    ],
    outcomesTitle: "Expected outcomes",
    outcomes: [
      "Increased agrisolar adoption among 1,000+ farmers and cooperatives.",
      "Economic empowerment: raise annual incomes of agrisolar entrepreneurs by at least 30%.",
      "Job creation: 700 direct and 2,100 indirect jobs.",
      "Climate impact: reduce 300,000 tonnes of CO₂ emissions in three years.",
      "Financial inclusion: improve access to finance for 15 cooperatives through concessional loans and revolving funds.",
      "Ecosystem strengthening: coordinated multi-stakeholder platform for agrisolar innovation, financing, and market linkages.",
    ],
    impactTitle: "Impact to date",
    impactMetrics: [
      { value: "1,000+", label: "Entrepreneurs supported" },
      { value: "2,800+", label: "Jobs created" },
      { value: "300,000", label: "Tons of CO₂e reduced" },
      { value: "$800,000+", label: "Funding mobilized" },
    ],
    strategicPartners: {
      title: "Our strategic partners",
      subtitle: "Collaborating with leading organizations to drive sustainable impact across East Africa",
      partners: [
        { role: "Funder", name: "Charles Stewart Mott Foundation", logoSrc: "/images/funders/mott.png" },
        { role: "Hub host (Kenya)", name: "Kenya Climate Innovation Centre", logoSrc: "/images/funders/kcic.png" },
        { role: "Hub host (Tanzania)", name: "WWF Tanzania", logoSrc: "/images/funders/tanzania.png" },
        { role: "Hub host (Uganda)", name: "Heifer International", logoSrc: "/images/funders/uganda.png" },
      ],
    },
  },
};

const flagshipRecord = FLAGSHIP_PROGRAMMES as Record<string, FlagshipProgrammeContent>;

export const FLAGSHIP_SLUGS = new Set(Object.keys(FLAGSHIP_PROGRAMMES));

export function getFlagshipContent(slug: string): FlagshipProgrammeContent | null {
  return flagshipRecord[slug] ?? null;
}

export function isFlagshipSlug(slug: string): boolean {
  return FLAGSHIP_SLUGS.has(slug);
}
