'use client';

import React, { useState } from 'react';
import { PageLayout } from '@/components/layout/PageLayout';
import { motion } from 'framer-motion';
import { 
  Sun, Droplets, Leaf, Recycle, Zap, Car, 
  TrendingUp, Users, Target, ArrowRight, 
  Globe, Shield
} from 'lucide-react';

// Sample sectors data - will be replaced with real data later
const focusSectors = [
  {
    id: 1,
    name: 'Renewable Energy',
    icon: Sun,
    description: 'Advancing clean energy solutions including solar, wind, hydro, and biomass technologies to power Kenya\'s sustainable future.',
    color: 'yellow',
    stats: {
      ventures: '85+',
      investment: '$12.5M',
      jobs: '800+',
      impact: '50MW capacity installed'
    },
    keyAreas: [
      'Solar Home Systems',
      'Mini-grid Development', 
      'Wind Energy Solutions',
      'Biomass & Biogas',
      'Energy Storage Systems',
      'Grid Integration Technologies'
    ],
    challenges: [
      'High upfront capital costs',
      'Limited access to financing',
      'Grid integration complexity',
      'Technology adaptation to local conditions'
    ],
    opportunities: [
      'Rural electrification demand',
      'Declining technology costs',
      'Supportive government policies',
      'Growing investor interest'
    ],
    successStories: [
      {
        company: 'SolarTech Kenya',
        achievement: 'Deployed 5,000+ solar home systems',
        impact: '50+ rural communities powered'
      },
      {
        company: 'WindPower East Africa',
        achievement: '15MW wind farm operational', 
        impact: '30,000+ households connected'
      }
    ],
    featured: true
  },
  {
    id: 2,
    name: 'Sustainable Agriculture',
    icon: Leaf,
    description: 'Supporting climate-smart agricultural technologies that increase productivity while protecting the environment.',
    color: 'green',
    stats: {
      ventures: '120+',
      investment: '$8.7M',
      jobs: '1200+',
      impact: '50,000+ farmers supported'
    },
    keyAreas: [
      'Precision Agriculture',
      'Climate-Smart Farming',
      'Agricultural IoT Systems',
      'Crop Monitoring Technology',
      'Sustainable Irrigation',
      'Post-Harvest Solutions'
    ],
    challenges: [
      'Smallholder farmer adoption',
      'Technology affordability',
      'Limited digital literacy',
      'Fragmented value chains'
    ],
    opportunities: [
      'Growing food security needs',
      'Mobile technology penetration',
      'Government digitization initiatives',
      'Export market potential'
    ],
    successStories: [
      {
        company: 'AgroTech Solutions',
        achievement: '2,000+ farmers using platform',
        impact: '40% increase in crop yields'
      },
      {
        company: 'FarmSense Kenya',
        achievement: 'IoT sensors across 500+ farms',
        impact: '30% reduction in water usage'
      }
    ],
    featured: true
  },
  {
    id: 3,
    name: 'Water & Sanitation',
    icon: Droplets,
    description: 'Developing innovative solutions for clean water access, water treatment, and sanitation systems.',
    color: 'blue',
    stats: {
      ventures: '65+',
      investment: '$5.2M',
      jobs: '400+',
      impact: '100,000+ people served'
    },
    keyAreas: [
      'Water Purification Systems',
      'Smart Water Management',
      'Wastewater Treatment',
      'Sanitation Solutions',
      'Water Quality Monitoring',
      'Rural Water Access'
    ],
    challenges: [
      'Infrastructure development costs',
      'Maintenance and sustainability',
      'Regulatory compliance',
      'Community acceptance'
    ],
    opportunities: [
      'Universal water access goals',
      'Climate change adaptation needs',
      'Technology cost reductions',
      'Public-private partnerships'
    ],
    successStories: [
      {
        company: 'CleanWater Innovations',
        achievement: '150+ water kiosks installed',
        impact: '25,000+ people accessing clean water daily'
      }
    ],
    featured: false
  },
  {
    id: 4,
    name: 'Waste Management',
    icon: Recycle,
    description: 'Promoting circular economy solutions that turn waste into valuable resources and reduce environmental impact.',
    color: 'emerald',
    stats: {
      ventures: '45+',
      investment: '$3.8M',
      jobs: '350+',
      impact: '2,000+ tons waste processed monthly'
    },
    keyAreas: [
      'Plastic Recycling',
      'Organic Waste Processing',
      'E-waste Management',
      'Waste-to-Energy Systems',
      'Circular Economy Models',
      'Collection & Sorting Tech'
    ],
    challenges: [
      'Waste collection inefficiencies',
      'Limited recycling infrastructure',
      'Market demand for recycled products',
      'Behavioral change needs'
    ],
    opportunities: [
      'Growing waste generation',
      'Circular economy policies',
      'International market access',
      'Innovation in recycling tech'
    ],
    successStories: [
      {
        company: 'WasteWise Limited',
        achievement: '500+ tons plastic processed monthly',
        impact: '50,000+ eco-bricks produced'
      }
    ],
    featured: true
  },
  {
    id: 5,
    name: 'Green Transportation',
    icon: Car,
    description: 'Accelerating the adoption of clean mobility solutions including electric vehicles and sustainable transport systems.',
    color: 'indigo',
    stats: {
      ventures: '35+',
      investment: '$6.1M',
      jobs: '450+',
      impact: '1,000+ electric vehicles deployed'
    },
    keyAreas: [
      'Electric Vehicles',
      'Charging Infrastructure',
      'Battery Technology',
      'Fleet Management Systems',
      'Micro-mobility Solutions',
      'Smart Transportation'
    ],
    challenges: [
      'High vehicle costs',
      'Limited charging infrastructure',
      'Battery technology adaptation',
      'Consumer acceptance'
    ],
    opportunities: [
      'Urban air quality concerns',
      'Fuel cost savings',
      'Government support policies',
      'Technology cost reductions'
    ],
    successStories: [
      {
        company: 'EcoTransport Kenya',
        achievement: '500+ electric vehicles deployed',
        impact: '50+ charging stations established'
      }
    ],
    featured: false
  },
  {
    id: 6,
    name: 'Energy Efficiency',
    icon: Zap,
    description: 'Implementing smart energy solutions that reduce consumption and optimize energy use across sectors.',
    color: 'purple',
    stats: {
      ventures: '40+',
      investment: '$2.9M',
      jobs: '250+',
      impact: '30% average energy savings'
    },
    keyAreas: [
      'Smart Building Systems',
      'Industrial Energy Optimization',
      'Efficient Appliances',
      'Energy Management Software',
      'LED Lighting Solutions',
      'HVAC Optimization'
    ],
    challenges: [
      'Upfront investment costs',
      'Technical expertise gaps',
      'Measurement and verification',
      'Market awareness'
    ],
    opportunities: [
      'Rising energy costs',
      'Corporate sustainability goals',
      'Energy regulation compliance',
      'Technology advancement'
    ],
    successStories: [
      {
        company: 'SmartEnergy Systems',
        achievement: '200+ buildings optimized',
        impact: '25% average energy reduction'
      }
    ],
    featured: false
  }
];

export default function FocusSectorsPage() {
  const [selectedSector, setSelectedSector] = useState<number | null>(1);
  const [viewMode, setViewMode] = useState<'overview' | 'details'>('overview');

  const selectedSectorData = focusSectors.find(sector => sector.id === selectedSector);

  return (
    <PageLayout
      title="Focus Sectors"
      subtitle="Key climate sectors driving our innovation"
      description="Discover the strategic climate sectors where KCIC concentrates its efforts to accelerate sustainable development and environmental impact across Kenya."
      breadcrumb={[
        { label: 'How we work', href: '/how-we-work' },
        { label: 'Focus sectors' }
      ]}
    >
      <div className="py-16">
        {/* Sector Overview */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Strategic Sectors</h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto mb-12">
              KCIC focuses on six key climate sectors that offer the greatest potential for environmental impact, 
              economic growth, and job creation in Kenya and across East Africa.
            </p>
          </motion.div>

          {/* Sector Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {focusSectors.map((sector, index) => (
              <motion.div
                key={sector.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                onClick={() => {
                  setSelectedSector(sector.id);
                  setViewMode('details');
                }}
                className={`cursor-pointer bg-white rounded-2xl shadow-lg border-2 transition-all duration-300 hover:shadow-2xl ${
                  selectedSector === sector.id ? 'border-green-500 ring-2 ring-green-200' : 'border-gray-100 hover:border-green-300'
                }`}
              >
                {/* Sector Header */}
                <div className={`h-32 bg-gradient-to-br ${
                  sector.color === 'yellow' ? 'from-yellow-400 to-orange-500' :
                  sector.color === 'green' ? 'from-green-400 to-emerald-500' :
                  sector.color === 'blue' ? 'from-blue-400 to-cyan-500' :
                  sector.color === 'emerald' ? 'from-emerald-400 to-teal-500' :
                  sector.color === 'indigo' ? 'from-indigo-400 to-purple-500' :
                  'from-purple-400 to-pink-500'
                } relative rounded-t-2xl`}>
                  <div className="absolute inset-0 bg-black bg-opacity-20 rounded-t-2xl"></div>
                  <div className="absolute top-4 right-4">
                    {sector.featured && (
                      <span className="px-2 py-1 bg-white bg-opacity-90 text-gray-800 text-xs font-medium rounded-full">
                        Featured
                      </span>
                    )}
                  </div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <sector.icon className="w-8 h-8 opacity-90" />
                  </div>
                </div>

                {/* Sector Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{sector.name}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">{sector.description}</p>

                  {/* Quick Stats */}
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="text-center bg-gray-50 rounded-lg p-2">
                      <div className="text-lg font-bold text-green-600">{sector.stats.ventures}</div>
                      <div className="text-xs text-gray-600">Ventures</div>
                    </div>
                    <div className="text-center bg-gray-50 rounded-lg p-2">
                      <div className="text-lg font-bold text-blue-600">{sector.stats.investment}</div>
                      <div className="text-xs text-gray-600">Investment</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-500">
                      {sector.stats.jobs} jobs created
                    </div>
                    <ArrowRight className="w-4 h-4 text-green-600" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* View Toggle */}
          <div className="flex justify-center mb-8">
            <div className="bg-white rounded-lg p-1 shadow-md border border-gray-200">
              <button
                onClick={() => setViewMode('overview')}
                className={`px-6 py-2 rounded-md font-medium transition-all duration-200 ${
                  viewMode === 'overview'
                    ? 'bg-green-600 text-white shadow-md'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                Sector Overview
              </button>
              <button
                onClick={() => setViewMode('details')}
                className={`px-6 py-2 rounded-md font-medium transition-all duration-200 ${
                  viewMode === 'details'
                    ? 'bg-green-600 text-white shadow-md'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                Detailed Analysis
              </button>
            </div>
          </div>
        </div>

        {/* Sector Overview Mode */}
        {viewMode === 'overview' && (
          <div className="bg-gray-50 py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center mb-12"
              >
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Sector Impact Summary</h2>
                <div className="grid md:grid-cols-4 gap-8">
                  <div className="bg-white rounded-xl shadow-lg p-6">
                    <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <Users className="w-6 h-6 text-green-600" />
                    </div>
                    <div className="text-3xl font-bold text-gray-900 mb-2">390+</div>
                    <div className="text-sm text-gray-600">Total Ventures Supported</div>
                  </div>

                  <div className="bg-white rounded-xl shadow-lg p-6">
                    <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <TrendingUp className="w-6 h-6 text-blue-600" />
                    </div>
                    <div className="text-3xl font-bold text-gray-900 mb-2">$39.2M</div>
                    <div className="text-sm text-gray-600">Total Investment Mobilized</div>
                  </div>

                  <div className="bg-white rounded-xl shadow-lg p-6">
                    <div className="w-12 h-12 bg-purple-50 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <Target className="w-6 h-6 text-purple-600" />
                    </div>
                    <div className="text-3xl font-bold text-gray-900 mb-2">3,450+</div>
                    <div className="text-sm text-gray-600">Green Jobs Created</div>
                  </div>

                  <div className="bg-white rounded-xl shadow-lg p-6">
                    <div className="w-12 h-12 bg-orange-50 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <Globe className="w-6 h-6 text-orange-600" />
                    </div>
                    <div className="text-3xl font-bold text-gray-900 mb-2">275K+</div>
                    <div className="text-sm text-gray-600">People Impacted</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        )}

        {/* Detailed Analysis Mode */}
        {viewMode === 'details' && selectedSectorData && (
          <div className="bg-white py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mb-12"
              >
                {/* Sector Header */}
                <div className="flex items-center mb-8">
                  <div className={`w-16 h-16 bg-gradient-to-br ${
                    selectedSectorData.color === 'yellow' ? 'from-yellow-400 to-orange-500' :
                    selectedSectorData.color === 'green' ? 'from-green-400 to-emerald-500' :
                    selectedSectorData.color === 'blue' ? 'from-blue-400 to-cyan-500' :
                    selectedSectorData.color === 'emerald' ? 'from-emerald-400 to-teal-500' :
                    selectedSectorData.color === 'indigo' ? 'from-indigo-400 to-purple-500' :
                    'from-purple-400 to-pink-500'
                  } rounded-xl flex items-center justify-center mr-6`}>
                    <selectedSectorData.icon className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">{selectedSectorData.name}</h2>
                    <p className="text-lg text-gray-600">{selectedSectorData.description}</p>
                  </div>
                </div>

                {/* Sector Stats */}
                <div className="grid md:grid-cols-4 gap-6 mb-12">
                  <div className="bg-green-50 rounded-xl p-6 text-center">
                    <div className="text-2xl font-bold text-green-600 mb-2">{selectedSectorData.stats.ventures}</div>
                    <div className="text-sm text-gray-600">Ventures Supported</div>
                  </div>
                  <div className="bg-blue-50 rounded-xl p-6 text-center">
                    <div className="text-2xl font-bold text-blue-600 mb-2">{selectedSectorData.stats.investment}</div>
                    <div className="text-sm text-gray-600">Investment Mobilized</div>
                  </div>
                  <div className="bg-purple-50 rounded-xl p-6 text-center">
                    <div className="text-2xl font-bold text-purple-600 mb-2">{selectedSectorData.stats.jobs}</div>
                    <div className="text-sm text-gray-600">Jobs Created</div>
                  </div>
                  <div className="bg-orange-50 rounded-xl p-6 text-center">
                    <div className="text-sm font-semibold text-orange-600 mb-2">Key Impact</div>
                    <div className="text-sm text-gray-600">{selectedSectorData.stats.impact}</div>
                  </div>
                </div>

                {/* Detailed Sections */}
                <div className="grid lg:grid-cols-2 gap-12">
                  {/* Key Areas */}
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">Key Focus Areas</h3>
                    <div className="space-y-3">
                      {selectedSectorData.keyAreas.map((area, index) => (
                        <div key={index} className="flex items-center bg-gray-50 rounded-lg p-3">
                          <ArrowRight className="w-4 h-4 text-green-600 mr-3 flex-shrink-0" />
                          <span className="text-gray-700">{area}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Success Stories */}
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">Success Stories</h3>
                    <div className="space-y-4">
                      {selectedSectorData.successStories.map((story, index) => (
                        <div key={index} className="bg-white border border-gray-200 rounded-xl p-6">
                          <h4 className="text-lg font-semibold text-gray-900 mb-2">{story.company}</h4>
                          <p className="text-sm text-green-600 font-medium mb-2">{story.achievement}</p>
                          <p className="text-sm text-gray-600">{story.impact}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Challenges */}
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">Key Challenges</h3>
                    <div className="space-y-3">
                      {selectedSectorData.challenges.map((challenge, index) => (
                        <div key={index} className="flex items-start bg-red-50 rounded-lg p-3">
                          <Shield className="w-4 h-4 text-red-500 mr-3 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700 text-sm">{challenge}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Opportunities */}
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">Market Opportunities</h3>
                    <div className="space-y-3">
                      {selectedSectorData.opportunities.map((opportunity, index) => (
                        <div key={index} className="flex items-start bg-green-50 rounded-lg p-3">
                          <TrendingUp className="w-4 h-4 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700 text-sm">{opportunity}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        )}

        {/* Call to Action */}
        <div className="bg-green-50 py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to Innovate in Climate Solutions?</h2>
              <p className="text-xl text-gray-600 mb-8">
                Join our ecosystem of climate innovators working across these strategic sectors to create sustainable impact.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/how-we-work/programmes"
                  className="inline-flex items-center px-8 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors duration-200"
                >
                  Explore Our Programmes
                </a>
                <a
                  href="/apply"
                  className="inline-flex items-center px-8 py-3 bg-white text-green-600 font-semibold rounded-lg border border-green-600 hover:bg-green-50 transition-colors duration-200"
                >
                  Apply Now
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}