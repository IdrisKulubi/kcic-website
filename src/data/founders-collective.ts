export const FOUNDERS_COLLECTIVE_FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSe8wKNLBdcahDcs691-KN0K7gqsEJsREIJlfZTwlCo05HDEDA/viewform";

export const FOUNDERS_COLLECTIVE_PATH = "/founders-collective";

export const foundersCollectiveMeta = {
  title: "KCIC Founders Collective",
  tagline: "Connected for Growth. Building Climate Impact Together.",
  description:
    "A founder-first community connecting climate entrepreneurs to relationships, capabilities, markets, capital, intelligence, and influence.",
};

export const membershipFee = {
  amount: "Ksh 10,000",
  period: "per founder annually",
  summary:
    "Membership provides access to the Founders Collective community and member-only opportunities and activities.",
};

export const memberPillars = [
  {
    id: "community",
    title: "Community",
    description:
      "Connect with fellow founders through peer learning, founder-to-founder collaboration, mentorship, and community activities.",
  },
  {
    id: "capability",
    title: "Capability",
    description:
      "Access expertise and targeted support in governance, financial management, strategy, operations, technology, regulatory compliance, and impact measurement.",
  },
  {
    id: "capital",
    title: "Capital",
    description:
      "Build investment readiness and connect with financing opportunities suited to your enterprise and its stage of growth.",
  },
  {
    id: "markets",
    title: "Markets",
    description:
      "Access connections to buyers, off-takers, procurement opportunities, regional markets, and potential commercial partners.",
  },
  {
    id: "intelligence",
    title: "Intelligence",
    description:
      "Stay informed about relevant developments in climate sectors, finance, policy, technology, and commercial opportunities.",
  },
  {
    id: "influence",
    title: "Influence",
    description:
      "Contribute your experience and perspectives to conversations shaping climate entrepreneurship, policy, and the wider ecosystem.",
  },
] as const;

export const whoCanJoin = [
  "KCIC alumni building climate-focused enterprises.",
  "External founders whose enterprises operate in the climate space.",
];

export const eligibilityNote =
  "To qualify, your business must operate in the climate space and contribute to climate change mitigation.";

export const memberActivities = [
  "Founder breakfasts and thematic forums",
  "Sector and stage-specific founder circles",
  "Expert office hours and mentorship",
  "Investor and market-access sessions",
  "Founder networking and collaboration",
  "Access to member-only opportunities and information",
];

export const joinSteps = [
  {
    step: 1,
    title: "Apply",
    description:
      "Complete the Founders Collective application form. A confirmation of payment should accompany your completed application.",
    cta: { label: "Open application form", href: FOUNDERS_COLLECTIVE_FORM_URL },
  },
  {
    step: 2,
    title: "Pay",
    description:
      "Pay the annual membership fee of Ksh 10,000 to your preferred KCIC bank account (details below).",
  },
  {
    step: 3,
    title: "Connect",
    description:
      "Once payment is confirmed, you will have access to the various benefits.",
  },
  {
    step: 4,
    title: "Participate",
    description:
      "Connect with fellow founders and access member-only opportunities and activities.",
  },
] as const;

export const paymentAccounts = [
  {
    label: "KES account",
    fields: [
      { label: "Account name", value: "Kenya Climate Innovation Center" },
      { label: "Bank", value: "NCBA Bank Kenya Plc" },
      { label: "Account number", value: "2594680245", copyable: true },
      { label: "Currency", value: "KES" },
    ],
  },
  {
    label: "USD account",
    fields: [
      { label: "Account name", value: "Kenya Climate Innovation Center" },
      { label: "Bank", value: "NCBA Bank Kenya Plc" },
      { label: "Account number", value: "2594680258", copyable: true },
      { label: "Currency", value: "USD" },
    ],
  },
] as const;

export const mobileMoney = {
  paybill: "880100",
  accountNumber: "2594680245",
  reference: "Business Name / Applicant Name",
};

export const foundersFaqs = [
  {
    question: "Is the Founders Collective only for KCIC alumni?",
    answer:
      "No. The Collective is open to both KCIC alumni and external founders whose businesses operate in the climate space and contribute to climate change mitigation.",
  },
  {
    question: "Is there a membership fee?",
    answer: "Yes. Membership costs Ksh 10,000 annually.",
  },
  {
    question: "How do I become a member?",
    answer:
      "Complete the application form and make the Ksh 10,000 annual membership payment to the designated KCIC bank account.",
  },
  {
    question: "What happens after I become a member?",
    answer:
      "You become part of the Founders Collective community and can participate in member-only activities, opportunities, and engagements.",
  },
  {
    question:
      "Can I get tailor-made services applicable to my current business situation?",
    answer:
      "Yes. A specific package can be designed based on the needs diagnostics report.",
  },
] as const;
