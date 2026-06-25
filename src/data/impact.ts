export const impactTicker = [
  'Climate impact',
  'Green jobs',
  'SMEs supported',
  'Investment mobilized',
  'Measurable results',
  'East Africa',
];

export const impactNavItems = [
  { label: 'Overview', href: '/impact' },
  // { label: 'Theory of Change', href: '/impact/theory-of-change' },
  { label: 'Our Targets', href: '/impact/targets' },
  // { label: 'Impact Reports', href: '/impact/reports' },
  { label: 'Impact Stories', href: '/impact/stories' },
] as const;

export type ImpactNavHref = (typeof impactNavItems)[number]['href'];

export const mainStats = [
  { value: '450+', label: 'SMEs supported', description: 'Through incubation and acceleration programmes.' },
  { value: '$25M+', label: 'Investment mobilized', description: 'For climate-focused ventures.' },
  { value: '2,500+', label: 'Green jobs', description: 'Created and supported across sectors.' },
  { value: '15+', label: 'Solutions deployed', description: 'Innovative climate technologies in market.' },
];

export const nearTermTargets = [
  { value: '1,000+', label: 'SMEs supported', description: 'Next phase of enterprise growth.' },
  { value: '$50M+', label: 'Capital mobilized', description: 'To scale climate solutions.' },
  { value: '5,000+', label: 'Green jobs', description: 'To be created across the region.' },
  { value: '30+', label: 'New technologies', description: 'Climate innovations to launch.' },
];

export const vision2030Targets = [
  { value: '12,000+', label: 'Enterprises supported', subdescription: 'Across Africa' },
  { value: '$33M', label: 'Leveraged', subdescription: 'To support enterprises' },
  { value: '80%', label: 'Commercialization rate', subdescription: 'Of supported enterprises' },
  { value: '$55M', label: 'Mobilized', subdescription: 'In climate finance across Africa' },
  { value: '100,000', label: 'Green jobs created', subdescription: '' },
  { value: '1.2M', label: 'Tonnes CO2 mitigated', subdescription: '' },
  { value: '67,500', label: 'Customers reached', subdescription: 'By supported enterprises' },
  { value: '60', label: 'New collaborations', subdescription: 'Established' },
];

export const impactAreas = [
  {
    title: 'Environmental impact',
    stats: [
      { value: '2.5M', label: 'Tons CO2 reduced' },
      { value: '500K', label: 'People reached' },
      { value: '85%', label: 'Renewable energy' },
    ],
  },
  {
    title: 'Social impact',
    stats: [
      { value: '2,500+', label: 'Jobs created' },
      { value: '60%', label: 'Women entrepreneurs' },
      { value: '25', label: 'Counties reached' },
    ],
  },
  {
    title: 'Economic impact',
    stats: [
      { value: '$25M+', label: 'Investment raised' },
      { value: '$50M+', label: 'Revenue generated' },
      { value: '3.2x', label: 'ROI average' },
    ],
  },
  {
    title: 'Innovation impact',
    stats: [
      { value: '450+', label: 'SMEs supported' },
      { value: '15+', label: 'Sectors covered' },
      { value: '95%', label: 'Success rate' },
    ],
  },
];

export const successStories = [
  {
    company: 'SolarTech Kenya',
    sector: 'Renewable energy',
    impact: 'Providing clean energy to 50,000+ rural households',
    funding: '$2.5M raised',
    jobs: '150 jobs created',
  },
  {
    company: 'AgroClimate Solutions',
    sector: 'Climate-smart agriculture',
    impact: 'Supporting 10,000+ smallholder farmers',
    funding: '$1.8M raised',
    jobs: '200 jobs created',
  },
  {
    company: 'WaterTech Innovations',
    sector: 'Water technology',
    impact: 'Clean water access for 25,000+ people',
    funding: '$3.2M raised',
    jobs: '120 jobs created',
  },
];

export const theoryOfChangeSteps = [
  {
    step: '01',
    title: 'Discover',
    description: 'Identify high-potential climate entrepreneurs and underserved green markets across Kenya and East Africa.',
  },
  {
    step: '02',
    title: 'Incubate',
    description: 'Provide training, mentorship, and business development support to strengthen enterprise readiness.',
  },
  {
    step: '03',
    title: 'Finance',
    description: 'Connect ventures to grants, investment, and climate finance instruments that unlock growth capital.',
  },
  {
    step: '04',
    title: 'Scale',
    description: 'Expand market access, partnerships, and policy engagement so solutions reach more people.',
  },
  {
    step: '05',
    title: 'Measure',
    description: 'Track jobs, emissions, revenue, and lives improved — and feed learning back into programmes.',
  },
];

export const impactReports = [
  {
    title: 'Climate Innovation in Kenya: Annual Impact Report',
    year: '2023',
    type: 'Annual report',
    description: 'Comprehensive analysis of KCIC impact including case studies of supported ventures and their environmental and economic contributions.',
    href: '/newsroom/publications',
  },
  {
    title: 'Renewable Energy Market Assessment: Kenya',
    year: '2023',
    type: 'Research report',
    description: 'In-depth analysis of Kenya renewable energy sector opportunities for climate entrepreneurs.',
    href: '/newsroom/publications',
  },
  {
    title: 'Climate Finance Access for SMEs',
    year: '2023',
    type: 'Research report',
    description: 'Study on climate finance accessibility for SMEs, identifying barriers and proposing solutions.',
    href: '/newsroom/publications',
  },
];
