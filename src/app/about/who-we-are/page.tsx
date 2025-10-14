'use client';

import React from 'react';
import { PageLayout } from '@/components/layout/PageLayout';
import { motion } from 'framer-motion';
import { Target, Eye, Heart, Award, Globe, Users } from 'lucide-react';

const values = [
  {
    icon: Target,
    title: 'Innovation',
    description: 'We foster creativity and cutting-edge solutions to address climate challenges.'
  },
  {
    icon: Heart,
    title: 'Impact',
    description: 'We measure success by the positive environmental and social change we create.'
  },
  {
    icon: Users,
    title: 'Collaboration',
    description: 'We believe in the power of partnerships to amplify our collective impact.'
  },
  {
    icon: Award,
    title: 'Excellence',
    description: 'We maintain the highest standards in everything we do.'
  },
  {
    icon: Globe,
    title: 'Sustainability',
    description: 'We are committed to creating long-term, sustainable solutions.'
  },
  {
    icon: Eye,
    title: 'Transparency',
    description: 'We operate with openness and accountability in all our activities.'
  }
];

export default function WhoWeArePage() {
  return (
    <PageLayout
      title="Who we are"
      subtitle="Empowering Climate Innovation in Kenya"
      description="Kenya Climate Innovation Centre (KCIC) is a leading climate innovation hub fostering sustainable development through technology, entrepreneurship, and strategic partnerships."
      breadcrumb={[
        { label: 'About Us', href: '/about' },
        { label: 'Who we are' }
      ]}
    >
      <div className="py-16">
        {/* Mission and Vision Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="bg-white rounded-2xl shadow-xl p-8 border border-green-100">
                <div className="flex items-center mb-6">
                  <Target className="w-8 h-8 text-green-600 mr-3" />
                  <h2 className="text-3xl font-bold text-gray-900">Our Mission</h2>
                </div>
                <p className="text-lg text-gray-700 leading-relaxed">
                  To accelerate climate innovation and green economic growth in Kenya by supporting 
                  climate-focused small and medium enterprises (SMEs) through incubation, acceleration, 
                  and access to finance, technology, and markets.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <div className="bg-white rounded-2xl shadow-xl p-8 border border-blue-100">
                <div className="flex items-center mb-6">
                  <Eye className="w-8 h-8 text-blue-600 mr-3" />
                  <h2 className="text-3xl font-bold text-gray-900">Our Vision</h2>
                </div>
                <p className="text-lg text-gray-700 leading-relaxed">
                  To be the leading climate innovation centre in Africa, catalyzing sustainable 
                  development through transformative climate solutions and creating a thriving 
                  ecosystem for green entrepreneurship.
                </p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Our Story Section */}
        <div className="bg-gray-50 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Story</h2>
              <div className="max-w-4xl mx-auto">
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  Established in 2010, the Kenya Climate Innovation Centre (KCIC) was born from 
                  the recognition that Kenya&apos;s greatest climate challenges could become its greatest
                  opportunities for innovation and economic growth.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  Over the past decade, we have evolved from a pioneering initiative to a cornerstone 
                  of Kenya&apos;s climate innovation ecosystem. Through strategic partnerships with
                  international donors, government institutions, and private sector leaders, we have 
                  created a comprehensive support system for climate entrepreneurs.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  Today, KCIC stands as a testament to what&apos;s possible when innovation meets
                  determination. With over 450 SMEs supported, $25M+ in investment mobilized, 
                  and 2,500+ green jobs created, we continue to drive Kenya&apos;s transition to
                  a sustainable, climate-resilient future.
                </p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Our Values Section */}
        <div className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Values</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Our values guide every decision we make and every partnership we forge.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center mr-4">
                      <value.icon className="w-6 h-6 text-green-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900">{value.title}</h3>
                  </div>
                  <p className="text-gray-600 leading-relaxed">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Key Achievements Section */}
        <div className="bg-green-50 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Key Achievements</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Our impact speaks through the success of our partners and the communities we serve.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { number: '450+', label: 'SMEs Supported', description: 'Across various climate sectors' },
                { number: '$25M+', label: 'Investment Mobilized', description: 'For climate ventures' },
                { number: '2,500+', label: 'Green Jobs Created', description: 'Sustainable employment opportunities' },
                { number: '15+', label: 'Climate Solutions', description: 'Deployed in the market' }
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center bg-white rounded-xl shadow-lg p-6 border border-green-100"
                >
                  <div className="text-4xl font-bold text-green-600 mb-2">{stat.number}</div>
                  <div className="text-lg font-semibold text-gray-900 mb-2">{stat.label}</div>
                  <div className="text-sm text-gray-600">{stat.description}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}