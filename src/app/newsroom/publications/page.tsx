'use client';

import React, { useState } from 'react';
import { PageLayout } from '@/components/layout/PageLayout';
import { Metadata } from 'next';
import { motion } from 'framer-motion';
import { Download, Calendar, Eye, Filter, FileText, BarChart3, BookOpen, Users } from 'lucide-react';

const publications = [
  {
    id: 1,
    title: 'Climate Innovation in Kenya: 2023 Impact Report',
    type: 'Annual Report',
    category: 'Impact Assessment',
    date: '2023-12-15',
    description: 'Comprehensive analysis of KCIC\'s impact over the past year, including detailed case studies of supported ventures and their environmental and economic contributions.',
    pages: 68,
    downloads: 2500,
    featured: true,
    coverImage: '/images/publications/annual-report-2023.jpg',
    summary: 'This report showcases the significant progress made in 2023, with 120 new SMEs supported, $8.2M in investment mobilized, and 800+ new green jobs created across various climate sectors.'
  },
  {
    id: 2,
    title: 'Renewable Energy Market Assessment: Kenya 2023',
    type: 'Research Report',
    category: 'Market Analysis',
    date: '2023-10-20',
    description: 'In-depth analysis of Kenya\'s renewable energy sector, identifying opportunities, challenges, and emerging trends for climate entrepreneurs.',
    pages: 45,
    downloads: 1800,
    featured: true,
    coverImage: '/images/publications/renewable-energy-report.jpg',
    summary: 'Key findings include a 35% growth in distributed solar installations and significant opportunities in mini-grid development for rural communities.'
  },
  {
    id: 3,
    title: 'Sustainable Agriculture Technology Landscape',
    type: 'Sector Brief',
    category: 'Sector Analysis',
    date: '2023-09-10',
    description: 'Overview of agricultural technology innovations in Kenya, highlighting successful implementations and investment opportunities.',
    pages: 32,
    downloads: 1200,
    featured: false,
    coverImage: '/images/publications/agtech-landscape.jpg',
    summary: 'Explores precision agriculture, IoT applications, and climate-smart farming techniques adopted by Kenyan smallholder farmers.'
  },
  {
    id: 4,
    title: 'Waste-to-Value Opportunities in East Africa',
    type: 'Policy Brief',
    category: 'Policy Analysis',
    date: '2023-08-05',
    description: 'Analysis of waste management challenges and circular economy opportunities across East Africa, with policy recommendations.',
    pages: 28,
    downloads: 950,
    featured: false,
    coverImage: '/images/publications/waste-to-value.jpg',
    summary: 'Identifies $2.1B market opportunity in waste-to-value industries and recommends policy frameworks to support circular economy initiatives.'
  },
  {
    id: 5,
    title: 'Climate Finance Access for SMEs: Barriers and Solutions',
    type: 'Research Report',
    category: 'Financial Inclusion',
    date: '2023-07-18',
    description: 'Comprehensive study on climate finance accessibility for small and medium enterprises, identifying key barriers and proposing solutions.',
    pages: 52,
    downloads: 1600,
    featured: true,
    coverImage: '/images/publications/climate-finance.jpg',
    summary: 'Reveals that 78% of climate SMEs struggle with finance access and proposes innovative financing mechanisms to bridge the gap.'
  },
  {
    id: 6,
    title: 'Women in Climate Innovation: Breaking Barriers',
    type: 'Case Study Report',
    category: 'Gender & Climate',
    date: '2023-06-12',
    description: 'Celebrating women entrepreneurs in climate innovation and analyzing gender-specific challenges and opportunities in the sector.',
    pages: 36,
    downloads: 1350,
    featured: false,
    coverImage: '/images/publications/women-climate-innovation.jpg',
    summary: 'Features 25 successful women-led climate ventures and provides recommendations for increasing women\'s participation in climate entrepreneurship.'
  }
];

const categories = ['All', 'Impact Assessment', 'Market Analysis', 'Sector Analysis', 'Policy Analysis', 'Financial Inclusion', 'Gender & Climate'];
const types = ['All', 'Annual Report', 'Research Report', 'Sector Brief', 'Policy Brief', 'Case Study Report'];

export default function PublicationsPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedType, setSelectedType] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPublications = publications.filter(pub => {
    const matchesCategory = selectedCategory === 'All' || pub.category === selectedCategory;
    const matchesType = selectedType === 'All' || pub.type === selectedType;
    const matchesSearch = searchTerm === '' || 
      pub.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pub.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesCategory && matchesType && matchesSearch;
  });

  const featuredPublications = publications.filter(pub => pub.featured);

  return (
    <PageLayout
      title="Publications"
      subtitle="Research, insights and impact reports"
      description="Access our latest research reports, policy briefs, and impact assessments on climate innovation in Kenya and East Africa."
      breadcrumb={[
        { label: 'Newsroom', href: '/newsroom' },
        { label: 'Publications' }
      ]}
    >
      <div className="py-16">
        {/* Featured Publications */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Featured Publications</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredPublications.map((pub, index) => (
                <motion.div
                  key={pub.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300"
                >
                  {/* Cover Image Placeholder */}
                  <div className="h-48 bg-gradient-to-br from-green-400 to-blue-500 relative">
                    <div className="absolute inset-0 bg-black bg-opacity-30"></div>
                    <div className="absolute top-4 right-4">
                      <span className="px-2 py-1 bg-white bg-opacity-90 text-gray-800 text-xs font-medium rounded">
                        {pub.type}
                      </span>
                    </div>
                    <div className="absolute bottom-4 left-4 text-white">
                      <FileText className="w-8 h-8 mb-2 opacity-80" />
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center text-sm text-gray-500 mb-2">
                      <Calendar className="w-4 h-4 mr-1" />
                      {new Date(pub.date).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </div>

                    <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2">
                      {pub.title}
                    </h3>

                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                      {pub.description}
                    </p>

                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                      <span className="flex items-center">
                        <FileText className="w-4 h-4 mr-1" />
                        {pub.pages} pages
                      </span>
                      <span className="flex items-center">
                        <Download className="w-4 h-4 mr-1" />
                        {pub.downloads.toLocaleString()} downloads
                      </span>
                    </div>

                    <button className="w-full bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700 transition-colors duration-200 flex items-center justify-center">
                      <Download className="w-4 h-4 mr-2" />
                      Download PDF
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Search and Filters */}
        <div className="bg-gray-50 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-8"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">All Publications</h2>
              
              {/* Search Bar */}
              <div className="max-w-md mx-auto mb-6">
                <div className="relative">
                  <Eye className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search publications..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Filters */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                {/* Category Filter */}
                <div className="flex flex-wrap gap-2">
                  <span className="text-sm font-medium text-gray-700 mr-2 self-center">Category:</span>
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-200 ${
                        selectedCategory === category
                          ? 'bg-green-600 text-white'
                          : 'bg-white text-gray-600 border border-gray-300 hover:border-green-300'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>

                {/* Type Filter */}
                <div className="flex flex-wrap gap-2">
                  <span className="text-sm font-medium text-gray-700 mr-2 self-center">Type:</span>
                  {types.map((type) => (
                    <button
                      key={type}
                      onClick={() => setSelectedType(type)}
                      className={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-200 ${
                        selectedType === type
                          ? 'bg-blue-600 text-white'
                          : 'bg-white text-gray-600 border border-gray-300 hover:border-blue-300'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Publications List */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {filteredPublications.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No publications found</h3>
              <p className="text-gray-600">Try adjusting your search terms or filters.</p>
            </motion.div>
          ) : (
            <div className="space-y-6">
              {filteredPublications.map((pub, index) => (
                <motion.div
                  key={pub.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.05 }}
                  className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                    <div className="flex-1 mb-4 lg:mb-0">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="px-2 py-1 bg-green-50 text-green-700 text-xs font-medium rounded">
                          {pub.category}
                        </span>
                        <span className="px-2 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded">
                          {pub.type}
                        </span>
                      </div>
                      
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{pub.title}</h3>
                      
                      <p className="text-gray-600 mb-3">{pub.description}</p>
                      
                      {pub.summary && (
                        <p className="text-sm text-gray-500 mb-3 italic">{pub.summary}</p>
                      )}
                      
                      <div className="flex items-center gap-6 text-sm text-gray-500">
                        <span className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          {new Date(pub.date).toLocaleDateString()}
                        </span>
                        <span className="flex items-center">
                          <FileText className="w-4 h-4 mr-1" />
                          {pub.pages} pages
                        </span>
                        <span className="flex items-center">
                          <Download className="w-4 h-4 mr-1" />
                          {pub.downloads.toLocaleString()} downloads
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex flex-col gap-2 lg:ml-6">
                      <button className="px-6 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors duration-200 flex items-center justify-center">
                        <Download className="w-4 h-4 mr-2" />
                        Download
                      </button>
                      <button className="px-6 py-2 bg-white text-green-600 font-semibold rounded-lg border border-green-600 hover:bg-green-50 transition-colors duration-200 flex items-center justify-center">
                        <Eye className="w-4 h-4 mr-2" />
                        Preview
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>

        {/* Newsletter Signup */}
        <div className="bg-green-50 py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Stay Updated</h2>
              <p className="text-xl text-gray-600 mb-8">
                Subscribe to our newsletter to receive notifications about new publications and research insights.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
                <button className="px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors duration-200">
                  Subscribe
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}