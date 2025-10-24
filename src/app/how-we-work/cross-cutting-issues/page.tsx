'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { PageLayout } from '@/components/layout/PageLayout';
import { motion } from 'framer-motion';
import { 
  Users, DollarSign, Scale, GraduationCap, 
  Network, ArrowRight, CheckCircle, AlertCircle,
  Target, Lightbulb, Heart
} from 'lucide-react';

// Sample cross-cutting issues data - will be replaced with real data later
const crossCuttingIssues = [
  {
    id: 1,
    title: 'Gender Equity & Inclusion',
    icon: Users,
    description: 'Addressing gender gaps in climate innovation and ensuring equal participation of women and marginalized groups in the climate economy.',
    color: 'pink',
    challenges: [
      'Women receive only 20% of climate financing despite representing 50% of the population',
      'Limited access to technical training and capacity building for women',
      'Gender bias in investment decisions and venture selection',
      'Insufficient representation in climate leadership positions'
    ],
    ourApproach: [
      'Dedicated women-focused funding mechanisms and programs',
      'Gender-responsive program design and implementation',
      'Mentorship networks connecting women entrepreneurs',
      'Childcare and family support during program activities',
      'Gender-sensitive impact measurement and reporting'
    ],
    initiatives: [
      {
        name: 'Women in Climate Innovation Fund',
        description: '$2M facility supporting women-led climate ventures',
        impact: '25 women-led startups funded in first year'
      },
      {
        name: 'She Leads Climate Program',
        description: 'Leadership development for women in climate tech',
        impact: '100+ women trained in business leadership'
      }
    ],
    stats: {
      ventures: '85+',
      investment: '$3.2M',
      jobs: '450+',
      impact: '35% higher social impact metrics'
    },
    featured: true
  },
  {
    id: 2,
    title: 'Access to Finance',
    icon: DollarSign,
    description: 'Breaking down financial barriers and creating innovative funding mechanisms to support climate entrepreneurs across all stages.',
    color: 'green',
    challenges: [
      'Traditional banks lack understanding of climate business models',
      'High collateral requirements unsuitable for early-stage ventures',
      'Limited patient capital for long-term climate solutions',
      'Complex application processes and documentation requirements'
    ],
    ourApproach: [
      'Blended finance instruments combining grants and loans',
      'Risk-sharing mechanisms with financial institutions',
      'Investment readiness training and business plan development',
      'Direct connections to impact investors and DFIs',
      'Alternative credit scoring using climate impact metrics'
    ],
    initiatives: [
      {
        name: 'Climate Finance Facility',
        description: 'Flexible financing options for climate SMEs',
        impact: '$15M+ mobilized across 200+ ventures'
      },
      {
        name: 'Investor Network Platform',
        description: 'Connecting startups with appropriate funding sources',
        impact: '150+ investor-startup connections made'
      }
    ],
    stats: {
      ventures: '300+',
      investment: '$25M+',
      jobs: '1200+',
      impact: '78% of ventures secured follow-on funding'
    },
    featured: true
  },
  {
    id: 3,
    title: 'Policy & Regulation',
    icon: Scale,
    description: 'Advocating for enabling policies and regulatory frameworks that support climate innovation and entrepreneurship.',
    color: 'blue',
    challenges: [
      'Outdated regulations that don\'t account for new technologies',
      'Lengthy approval processes for innovative solutions',
      'Lack of climate-specific incentives and tax structures',
      'Limited government procurement of climate solutions'
    ],
    ourApproach: [
      'Policy advocacy and engagement with government agencies',
      'Research and policy brief development on key issues',
      'Multi-stakeholder dialogue platforms and forums',
      'Regulatory sandbox support for testing innovations',
      'Capacity building for policymakers on climate tech'
    ],
    initiatives: [
      {
        name: 'Climate Policy Lab',
        description: 'Research and advocacy for climate-friendly policies',
        impact: '12 policy recommendations adopted by government'
      },
      {
        name: 'Regulatory Innovation Forum',
        description: 'Platform for dialogue between entrepreneurs and regulators',
        impact: '8 regulatory barriers identified and addressed'
      }
    ],
    stats: {
      ventures: '120+',
      investment: '$2.8M',
      jobs: '200+',
      impact: '15 policy changes influenced'
    },
    featured: false
  },
  {
    id: 4,
    title: 'Capacity Building',
    icon: GraduationCap,
    description: 'Developing technical, business, and leadership skills needed to build and scale successful climate ventures.',
    color: 'purple',
    challenges: [
      'Skills gap in emerging climate technologies',
      'Limited business management experience among technical founders',
      'Lack of specialized climate finance knowledge',
      'Insufficient digital and data analytics capabilities'
    ],
    ourApproach: [
      'Comprehensive training programs covering technical and business skills',
      'Mentorship matching with industry experts and successful entrepreneurs',
      'Peer-to-peer learning networks and communities of practice',
      'International exchange programs and best practice sharing',
      'Online learning platforms with locally-relevant content'
    ],
    initiatives: [
      {
        name: 'Climate Entrepreneur Academy',
        description: 'Comprehensive business development program',
        impact: '500+ entrepreneurs trained annually'
      },
      {
        name: 'Tech Skills Development Program',
        description: 'Technical training in emerging climate technologies',
        impact: '300+ technicians certified in renewable energy'
      }
    ],
    stats: {
      ventures: '450+',
      investment: '$1.5M',
      jobs: '800+',
      impact: '85% program completion rate'
    },
    featured: true
  },
  {
    id: 5,
    title: 'Market Access',
    icon: Network,
    description: 'Creating pathways for climate solutions to reach customers and scale across local, regional, and international markets.',
    color: 'orange',
    challenges: [
      'Limited market information and customer insights',
      'High costs of market entry and customer acquisition',
      'Lack of established distribution channels',
      'Competition from cheaper, non-sustainable alternatives'
    ],
    ourApproach: [
      'Market research and intelligence sharing',
      'B2B matchmaking and partnership facilitation',
      'Trade mission participation and export support',
      'Digital marketing and e-commerce platform development',
      'Corporate partnership programs with large buyers'
    ],
    initiatives: [
      {
        name: 'Climate Solutions Marketplace',
        description: 'Digital platform connecting buyers with climate solutions',
        impact: '$5M+ in sales facilitated'
      },
      {
        name: 'Export Readiness Program',
        description: 'Support for entering regional and international markets',
        impact: '50+ ventures expanded beyond Kenya'
      }
    ],
    stats: {
      ventures: '200+',
      investment: '$8.5M',
      jobs: '600+',
      impact: '40% average revenue growth'
    },
    featured: false
  },
  {
    id: 6,
    title: 'Technology Transfer & Innovation',
    icon: Lightbulb,
    description: 'Facilitating access to cutting-edge technologies and fostering local innovation capabilities.',
    color: 'indigo',
    challenges: [
      'Limited access to advanced climate technologies',
      'High costs of technology licensing and transfer',
      'Lack of local R&D infrastructure and capabilities',
      'Brain drain to developed countries'
    ],
    ourApproach: [
      'International technology partnership facilitation',
      'Local R&D capacity building and infrastructure support',
      'University-industry collaboration programs',
      'Intellectual property support and protection',
      'Innovation hubs and co-working spaces'
    ],
    initiatives: [
      {
        name: 'Climate Tech Transfer Program',
        description: 'Facilitating access to international climate technologies',
        impact: '25+ technology transfer agreements signed'
      },
      {
        name: 'Innovation Incubator Network',
        description: 'Physical and virtual spaces for climate innovation',
        impact: '5 innovation hubs established across Kenya'
      }
    ],
    stats: {
      ventures: '180+',
      investment: '$4.2M',
      jobs: '350+',
      impact: '60+ patents and IP applications filed'
    },
    featured: false
  }
];

export default function CrossCuttingIssuesPage() {
  const [selectedIssue, setSelectedIssue] = useState<number | null>(1);
  const [activeSection, setActiveSection] = useState<'challenges' | 'approach' | 'initiatives'>('challenges');

  const selectedIssueData = crossCuttingIssues.find(issue => issue.id === selectedIssue);

  return (
    <PageLayout
      title="Cross-Cutting Issues"
      subtitle="Addressing systemic challenges in climate innovation"
      description="Explore how KCIC tackles the fundamental barriers that cut across all climate sectors to create an enabling environment for sustainable innovation."
      breadcrumb={[
        { label: 'How we work', href: '/how-we-work' },
        { label: 'Cross-cutting issues' }
      ]}
    >
      <div className="py-16">
        {/* Issues Overview */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Systemic Challenges We Address</h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto mb-12">
              Beyond sector-specific support, KCIC addresses fundamental barriers that affect all climate 
              innovations. These cross-cutting issues require dedicated attention and specialized interventions.
            </p>
          </motion.div>

          {/* Issues Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {crossCuttingIssues.map((issue, index) => (
              <motion.div
                key={issue.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                onClick={() => setSelectedIssue(issue.id)}
                className={`cursor-pointer bg-white rounded-2xl shadow-lg border-2 transition-all duration-300 hover:shadow-2xl ${
                  selectedIssue === issue.id ? 'border-green-500 ring-2 ring-green-200' : 'border-gray-100 hover:border-green-300'
                }`}
              >
                {/* Issue Header */}
                <div className={`h-32 bg-gradient-to-br ${
                  issue.color === 'pink' ? 'from-pink-400 to-rose-500' :
                  issue.color === 'green' ? 'from-green-400 to-emerald-500' :
                  issue.color === 'blue' ? 'from-blue-400 to-cyan-500' :
                  issue.color === 'purple' ? 'from-purple-400 to-violet-500' :
                  issue.color === 'orange' ? 'from-orange-400 to-red-500' :
                  'from-indigo-400 to-blue-500'
                } relative rounded-t-2xl`}>
                  <div className="absolute inset-0 bg-black bg-opacity-20 rounded-t-2xl"></div>
                  <div className="absolute top-4 right-4">
                    {issue.featured && (
                      <span className="px-2 py-1 bg-white bg-opacity-90 text-gray-800 text-xs font-medium rounded-full">
                        Priority
                      </span>
                    )}
                  </div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <issue.icon className="w-8 h-8 opacity-90" />
                  </div>
                </div>

                {/* Issue Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{issue.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">{issue.description}</p>

                  {/* Quick Stats */}
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="text-center bg-gray-50 rounded-lg p-2">
                      <div className="text-lg font-bold text-green-600">{issue.stats.ventures}</div>
                      <div className="text-xs text-gray-600">Ventures</div>
                    </div>
                    <div className="text-center bg-gray-50 rounded-lg p-2">
                      <div className="text-lg font-bold text-blue-600">{issue.stats.investment}</div>
                      <div className="text-xs text-gray-600">Investment</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-500">
                      {issue.stats.jobs} jobs created
                    </div>
                    <ArrowRight className="w-4 h-4 text-green-600" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Detailed Analysis */}
        {selectedIssueData && (
          <div className="bg-white py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mb-12"
              >
                {/* Issue Header */}
                <div className="flex items-center mb-8">
                  <div className={`w-16 h-16 bg-gradient-to-br ${
                    selectedIssueData.color === 'pink' ? 'from-pink-400 to-rose-500' :
                    selectedIssueData.color === 'green' ? 'from-green-400 to-emerald-500' :
                    selectedIssueData.color === 'blue' ? 'from-blue-400 to-cyan-500' :
                    selectedIssueData.color === 'purple' ? 'from-purple-400 to-violet-500' :
                    selectedIssueData.color === 'orange' ? 'from-orange-400 to-red-500' :
                    'from-indigo-400 to-blue-500'
                  } rounded-xl flex items-center justify-center mr-6`}>
                    <selectedIssueData.icon className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">{selectedIssueData.title}</h2>
                    <p className="text-lg text-gray-600">{selectedIssueData.description}</p>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid md:grid-cols-4 gap-6 mb-12">
                  <div className="bg-green-50 rounded-xl p-6 text-center">
                    <div className="text-2xl font-bold text-green-600 mb-2">{selectedIssueData.stats.ventures}</div>
                    <div className="text-sm text-gray-600">Ventures Supported</div>
                  </div>
                  <div className="bg-blue-50 rounded-xl p-6 text-center">
                    <div className="text-2xl font-bold text-blue-600 mb-2">{selectedIssueData.stats.investment}</div>
                    <div className="text-sm text-gray-600">Investment Mobilized</div>
                  </div>
                  <div className="bg-purple-50 rounded-xl p-6 text-center">
                    <div className="text-2xl font-bold text-purple-600 mb-2">{selectedIssueData.stats.jobs}</div>
                    <div className="text-sm text-gray-600">Jobs Created</div>
                  </div>
                  <div className="bg-orange-50 rounded-xl p-6 text-center">
                    <div className="text-sm font-semibold text-orange-600 mb-2">Key Impact</div>
                    <div className="text-sm text-gray-600">{selectedIssueData.stats.impact}</div>
                  </div>
                </div>

                {/* Section Navigation */}
                <div className="flex justify-center mb-8">
                  <div className="bg-gray-100 rounded-lg p-1">
                    <button
                      onClick={() => setActiveSection('challenges')}
                      className={`px-4 py-2 rounded-md font-medium transition-all duration-200 ${
                        activeSection === 'challenges'
                          ? 'bg-white text-gray-900 shadow-md'
                          : 'text-gray-600 hover:text-gray-800'
                      }`}
                    >
                      Challenges
                    </button>
                    <button
                      onClick={() => setActiveSection('approach')}
                      className={`px-4 py-2 rounded-md font-medium transition-all duration-200 ${
                        activeSection === 'approach'
                          ? 'bg-white text-gray-900 shadow-md'
                          : 'text-gray-600 hover:text-gray-800'
                      }`}
                    >
                      Our Approach
                    </button>
                    <button
                      onClick={() => setActiveSection('initiatives')}
                      className={`px-4 py-2 rounded-md font-medium transition-all duration-200 ${
                        activeSection === 'initiatives'
                          ? 'bg-white text-gray-900 shadow-md'
                          : 'text-gray-600 hover:text-gray-800'
                      }`}
                    >
                      Initiatives
                    </button>
                  </div>
                </div>

                {/* Content Sections */}
                <div className="bg-gray-50 rounded-2xl p-8">
                  {activeSection === 'challenges' && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                        <AlertCircle className="w-6 h-6 text-red-500 mr-3" />
                        Key Challenges
                      </h3>
                      <div className="space-y-4">
                        {selectedIssueData.challenges.map((challenge, index) => (
                          <div key={index} className="bg-white rounded-lg p-4 border-l-4 border-red-400">
                            <p className="text-gray-700">{challenge}</p>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {activeSection === 'approach' && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                        <Target className="w-6 h-6 text-green-500 mr-3" />
                        Our Approach
                      </h3>
                      <div className="space-y-4">
                        {selectedIssueData.ourApproach.map((approach, index) => (
                          <div key={index} className="bg-white rounded-lg p-4 border-l-4 border-green-400">
                            <div className="flex items-start">
                              <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                              <p className="text-gray-700">{approach}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {activeSection === 'initiatives' && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                        <Lightbulb className="w-6 h-6 text-blue-500 mr-3" />
                        Key Initiatives
                      </h3>
                      <div className="grid lg:grid-cols-2 gap-6">
                        {selectedIssueData.initiatives.map((initiative, index) => (
                          <div key={index} className="bg-white rounded-xl p-6 shadow-lg">
                            <h4 className="text-lg font-semibold text-gray-900 mb-3">{initiative.name}</h4>
                            <p className="text-gray-600 mb-4">{initiative.description}</p>
                            <div className="bg-blue-50 rounded-lg p-3">
                              <div className="text-sm font-medium text-blue-800 mb-1">Impact Achieved</div>
                              <div className="text-sm text-blue-700">{initiative.impact}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            </div>
          </div>
        )}

        {/* Call to Action */}
        <div className="bg-gradient-to-br from-green-50 to-blue-50 py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Collaborate with Us</h2>
              <p className="text-xl text-gray-600 mb-8">
                These challenges require collective action. Partner with us to address systemic barriers 
                and create an enabling environment for climate innovation.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/about/contact-us"
                  className="inline-flex items-center px-8 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors duration-200"
                >
                  <Heart className="w-4 h-4 mr-2" />
                  Partner with Us
                </Link>
                <Link
                  href="/how-we-work/programmes"
                  className="inline-flex items-center px-8 py-3 bg-white text-green-600 font-semibold rounded-lg border border-green-600 hover:bg-green-50 transition-colors duration-200"
                >
                  Explore Our Programs
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}