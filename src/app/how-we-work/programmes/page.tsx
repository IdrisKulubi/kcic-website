'use client';

import React from 'react';
import Link from 'next/link';
import { PageLayout } from '@/components/layout/PageLayout';
import { motion } from 'framer-motion';
import { Lightbulb, Target, Users, TrendingUp, Clock, Award, ArrowRight, CheckCircle } from 'lucide-react';

const programmes = [
  {
    icon: Lightbulb,
    title: 'Climate Innovation Incubation',
    duration: '6-12 months',
    stage: 'Idea to Prototype',
    color: 'blue',
    description: 'Supporting early-stage climate entrepreneurs in developing their ideas into viable business concepts and prototypes.',
    features: [
      'Business model development',
      'Technical feasibility assessment',
      'Proof of concept development',
      'Initial market validation',
      'Intellectual property guidance',
      'Team building support'
    ],
    outcomes: [
      'Viable business plan',
      'Working prototype',
      'Market validation',
      'Investment readiness'
    ],
    eligibility: [
      'Early-stage climate solution',
      'Committed founding team',
      'Clear market potential',
      'Scalability prospects'
    ]
  },
  {
    icon: Target,
    title: 'Business Acceleration',
    duration: '3-6 months',
    stage: 'Prototype to Market',
    color: 'green',
    description: 'Accelerating growth-ready climate ventures to scale operations and achieve market success.',
    features: [
      'Go-to-market strategy',
      'Sales and marketing support',
      'Operations optimization',
      'Financial management',
      'Partnership development',
      'Investment facilitation'
    ],
    outcomes: [
      'Market launch',
      'Revenue generation',
      'Strategic partnerships',
      'Investment secured'
    ],
    eligibility: [
      'Working prototype or product',
      'Initial market traction',
      'Scalable business model',
      'Growth-ready team'
    ]
  },
  {
    icon: Users,
    title: 'Sector-Specific Programmes',
    duration: 'Varies',
    stage: 'All Stages',
    color: 'purple',
    description: 'Specialized programmes targeting specific climate sectors with tailored support and expertise.',
    features: [
      'Renewable energy solutions',
      'Sustainable agriculture tech',
      'Water & sanitation innovations',
      'Waste management systems',
      'Green transportation',
      'Energy efficiency solutions'
    ],
    outcomes: [
      'Sector expertise',
      'Industry connections',
      'Regulatory compliance',
      'Market access'
    ],
    eligibility: [
      'Sector-relevant solution',
      'Technical expertise',
      'Market understanding',
      'Impact potential'
    ]
  },
  {
    icon: TrendingUp,
    title: 'Growth Support Programme',
    duration: '12+ months',
    stage: 'Scaling Stage',
    color: 'orange',
    description: 'Long-term support for established ventures looking to scale across Kenya and beyond.',
    features: [
      'Strategic planning',
      'International market access',
      'Advanced financing options',
      'Partnership facilitation',
      'Impact measurement',
      'Sustainability reporting'
    ],
    outcomes: [
      'Regional expansion',
      'Significant impact',
      'Sustainable growth',
      'Market leadership'
    ],
    eligibility: [
      'Established revenue streams',
      'Proven impact',
      'Growth track record',
      'Expansion potential'
    ]
  }
];

const supportServices = [
  {
    icon: Users,
    title: 'Mentorship Network',
    description: 'Access to experienced entrepreneurs, industry experts, and technical specialists.'
  },
  {
    icon: TrendingUp,
    title: 'Market Linkages',
    description: 'Connections to customers, distributors, and strategic partners across Kenya and Africa.'
  },
  {
    icon: Award,
    title: 'Technical Assistance',
    description: 'Expert support in product development, technology transfer, and innovation processes.'
  },
  {
    icon: Target,
    title: 'Investment Facilitation',
    description: 'Access to funding opportunities and investor networks for growth capital.'
  }
];

export default function ProgrammesPage() {
  return (
    <PageLayout
      title="Our Programmes"
      subtitle="Comprehensive support for climate entrepreneurs"
      description="From early-stage incubation to growth acceleration, our programmes provide tailored support to help climate solutions succeed and scale."
      breadcrumb={[
        { label: 'How we work', href: '/how-we-work' },
        { label: 'Our Programmes' }
      ]}
    >
      <div className="py-16">
        {/* Programme Overview */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Programme Journey</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our comprehensive programme structure guides entrepreneurs through every stage of their climate innovation journey.
            </p>
          </motion.div>

          {/* Programmes Grid */}
          <div className="grid lg:grid-cols-2 gap-8 mb-20">
            {programmes.map((programme, index) => (
              <motion.div
                key={programme.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden hover:shadow-2xl transition-shadow duration-300"
              >
                {/* Programme Header */}
                <div className={`bg-gradient-to-r ${
                  programme.color === 'blue' ? 'from-blue-500 to-blue-600' :
                  programme.color === 'green' ? 'from-green-500 to-green-600' :
                  programme.color === 'purple' ? 'from-purple-500 to-purple-600' :
                  'from-orange-500 to-orange-600'
                } p-6 text-white`}>
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center mr-4">
                      <programme.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold">{programme.title}</h3>
                      <p className="opacity-90">{programme.stage}</p>
                    </div>
                  </div>
                  <div className="flex items-center text-sm opacity-90">
                    <Clock className="w-4 h-4 mr-2" />
                    Duration: {programme.duration}
                  </div>
                </div>

                {/* Programme Content */}
                <div className="p-6">
                  <p className="text-gray-700 mb-6 leading-relaxed">
                    {programme.description}
                  </p>

                  {/* Features */}
                  <div className="mb-6">
                    <h4 className="text-lg font-semibold text-gray-900 mb-3">Programme Features</h4>
                    <div className="grid grid-cols-1 gap-2">
                      {programme.features.map((feature, i) => (
                        <div key={i} className="flex items-center text-gray-700">
                          <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                          <span className="text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Outcomes */}
                  <div className="mb-6">
                    <h4 className="text-lg font-semibold text-gray-900 mb-3">Expected Outcomes</h4>
                    <div className="flex flex-wrap gap-2">
                      {programme.outcomes.map((outcome, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 bg-green-50 text-green-700 rounded-full text-sm font-medium"
                        >
                          {outcome}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Eligibility */}
                  <div className="mb-6">
                    <h4 className="text-lg font-semibold text-gray-900 mb-3">Eligibility Criteria</h4>
                    <div className="space-y-1">
                      {programme.eligibility.map((criterion, i) => (
                        <div key={i} className="flex items-center text-gray-600">
                          <ArrowRight className="w-3 h-3 mr-2 flex-shrink-0" />
                          <span className="text-sm">{criterion}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Apply Button */}
                  <button className="w-full bg-gray-900 text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors duration-200">
                    Learn More & Apply
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Support Services */}
        <div className="bg-gray-50 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Additional Support Services</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Beyond our core programmes, we provide comprehensive support services to ensure your success.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {supportServices.map((service, index) => (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <service.icon className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{service.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{service.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Application Process */}
        <div className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Application Process</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Ready to join our programme? Here&apos;s how to get started.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-4 gap-8">
              {[
                { step: '1', title: 'Submit Application', description: 'Complete our online application with your business plan and supporting documents.' },
                { step: '2', title: 'Initial Review', description: 'Our team reviews your application against programme criteria and market potential.' },
                { step: '3', title: 'Assessment', description: 'Shortlisted candidates participate in interviews and pitch presentations.' },
                { step: '4', title: 'Selection', description: 'Successful applicants are welcomed into the programme with orientation and onboarding.' }
              ].map((phase, index) => (
                <motion.div
                  key={phase.step}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <div className="w-16 h-16 bg-green-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                    {phase.step}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{phase.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{phase.description}</p>
                </motion.div>
              ))}
            </div>

           
          </div>
        </div>
      </div>
    </PageLayout>
  );
}