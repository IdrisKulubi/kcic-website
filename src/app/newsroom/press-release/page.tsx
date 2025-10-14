'use client';

import React, { useState } from 'react';
import { PageLayout } from '@/components/layout/PageLayout';
import { motion } from 'framer-motion';
import { Calendar, ExternalLink, Download, Search, Megaphone, Eye } from 'lucide-react';

// Sample press release data - will be replaced with real data later
const pressReleases = [
  {
    id: 1,
    title: 'KCIC Announces $25M Milestone in Climate Investment Mobilization',
    date: '2024-01-15',
    category: 'Investment',
    excerpt: 'Kenya Climate Innovation Centre celebrates reaching a significant milestone of $25 million in investment mobilized for climate-focused SMEs since inception.',
    content: `Nairobi, Kenya - January 15, 2024 - The Kenya Climate Innovation Centre (KCIC) today announced that it has successfully mobilized over $25 million in investment for climate-focused small and medium enterprises (SMEs) since its establishment in 2010.

This significant milestone represents investments across various climate sectors including renewable energy, sustainable agriculture, waste management, and water solutions. The funding has directly supported more than 450 climate ventures, leading to the creation of over 2,500 green jobs across Kenya and East Africa.

"Reaching the $25 million milestone is a testament to the quality and potential of climate innovations emerging from Kenya," said Dr. Sarah Wanjiku, Executive Director of KCIC. "This achievement reflects not just our success in mobilizing capital, but the growing confidence of investors in African climate solutions."

The investments have been sourced from diverse funding mechanisms including impact investors, development finance institutions, commercial banks, and government programs. Notable investment rounds include $2.5M for SolarTech Kenya, $1.8M for AgroTech Solutions, and $3.2M for EcoTransport Kenya.

Key achievements supported by these investments include:
• Deployment of 5,000+ solar home systems reaching rural communities
• Support for 2,000+ smallholder farmers through AgTech solutions  
• Processing of 500+ tons of plastic waste monthly into construction materials
• Creation of comprehensive electric mobility ecosystems in urban centers

"The quality of climate innovations we see at KCIC continues to exceed expectations," noted James Kiprotich, Investment Manager at KCIC. "These ventures are not just addressing environmental challenges but creating sustainable business models that generate economic value."

Looking ahead, KCIC has set ambitious targets for 2024-2025, aiming to mobilize an additional $25 million in climate investments and support 200 new climate ventures. The centre is also expanding its focus to include climate adaptation technologies and nature-based solutions.

For more information about KCIC's investment facilitation programs, visit www.kenyacic.org or contact info@kenyacic.org.`,
    featured: true,
    mediaContacts: [
      { name: 'Dr. Sarah Wanjiku', title: 'Executive Director', phone: '+254-20-123-4567', email: 'sarah@kenyacic.org' },
      { name: 'James Kiprotich', title: 'Investment Manager', phone: '+254-20-123-4568', email: 'james@kenyacic.org' }
    ],
    downloads: [
      { name: 'Press Release PDF', url: '/downloads/pr-25m-milestone.pdf' },
      { name: 'Investment Statistics', url: '/downloads/investment-stats-2024.pdf' },
      { name: 'High-Res Images', url: '/downloads/kcic-images.zip' }
    ]
  },
  {
    id: 2,
    title: 'KCIC Partners with World Bank to Launch Climate Tech Accelerator Program',
    date: '2023-12-08',
    category: 'Partnership',
    excerpt: 'New accelerator program will support 50 climate technology startups across East Africa with funding, mentorship, and market access opportunities.',
    content: `Nairobi, Kenya - December 8, 2023 - The Kenya Climate Innovation Centre (KCIC) today announced a strategic partnership with the World Bank to launch a comprehensive Climate Technology Accelerator Program aimed at supporting climate technology startups across East Africa.

The three-year program, backed by $5 million in funding, will support 50 climate technology startups through intensive acceleration, providing access to funding, world-class mentorship, and market entry support. The initiative focuses on technologies addressing renewable energy, sustainable agriculture, water management, and climate resilience.

"This partnership with the World Bank represents a significant step forward in our mission to scale climate innovations across Africa," said Prof. Michael Ochieng, Program Director at KCIC. "The accelerator will provide unprecedented support to the next generation of climate tech entrepreneurs."

The program will feature:
• 6-month intensive acceleration cohorts
• Access to up to $500,000 in seed funding per startup
• Mentorship from global climate technology experts
• Market access facilitation across East Africa
• Technical assistance from World Bank specialists

Applications for the first cohort will open in February 2024, with the program officially launching in June 2024. Startups from Kenya, Tanzania, Uganda, Rwanda, and Ethiopia are eligible to apply.

"We are excited to partner with KCIC, which has demonstrated exceptional capability in nurturing climate innovations," said Dr. Maria Santos, World Bank Regional Director for Africa. "This accelerator will help bridge the gap between promising climate technologies and market deployment."

The selection process will prioritize startups with proven technological solutions, strong founding teams, and clear pathways to scale. Particular emphasis will be placed on technologies that can address climate adaptation challenges facing the region.

For application information and program details, visit www.kenyacic.org/accelerator or contact accelerator@kenyacic.org.`,
    featured: false,
    mediaContacts: [
      { name: 'Prof. Michael Ochieng', title: 'Program Director', phone: '+254-20-123-4569', email: 'michael@kenyacic.org' }
    ],
    downloads: [
      { name: 'Partnership Announcement', url: '/downloads/worldbank-partnership.pdf' },
      { name: 'Program Overview', url: '/downloads/accelerator-overview.pdf' }
    ]
  },
  {
    id: 3,
    title: 'KCIC Supported Startups Win Big at COP28 Climate Innovation Challenge',
    date: '2023-12-02',
    category: 'Achievement',
    excerpt: 'Three KCIC-supported startups secure top positions at the prestigious COP28 Climate Innovation Challenge in Dubai, highlighting African climate solutions.',
    content: `Dubai, UAE - December 2, 2023 - Three startups from the Kenya Climate Innovation Centre (KCIC) portfolio achieved remarkable success at the COP28 Climate Innovation Challenge, securing top positions and international recognition for their groundbreaking climate solutions.

The KCIC-supported ventures that excelled include:
• WasteWise Limited - Winner of the Circular Economy Category for their plastic-to-construction materials technology
• CleanWater Innovations - Second place in the Water Solutions Category for solar-powered water purification systems
• EcoTransport Kenya - Third place in the Mobility Category for electric vehicle ecosystem solutions

"Seeing our portfolio companies succeed on the global stage at COP28 is incredibly rewarding," said Dr. Grace Njoki, Innovation Director at KCIC. "It validates our approach to supporting locally-developed climate solutions with global impact potential."

WasteWise Limited's victory comes with a $100,000 prize and access to international markets through the COP28 innovation network. The company, which processes over 500 tons of plastic waste monthly into construction materials, impressed judges with its circular economy model and social impact.

"This recognition opens doors to expand our operations across Africa," said Sarah Muthoni, Founder of WasteWise Limited. "KCIC's early support was crucial in helping us develop and refine our technology to this level."

CleanWater Innovations' second-place finish highlights the importance of water security in climate adaptation. Their solar-powered systems now serve over 25,000 people across Western Kenya, reducing waterborne diseases by 70% in target communities.

EcoTransport Kenya's recognition in the mobility category showcases the potential for electric vehicle solutions in African urban centers. The company has deployed over 500 electric motorcycles and established 50 charging stations across Nairobi.

The success at COP28 demonstrates the growing international recognition of African climate innovations and KCIC's role in nurturing globally competitive solutions.

"These achievements underscore the world-class quality of climate innovations emerging from Kenya," noted Dr. Ahmed Hassan, COP28 Innovation Challenge Director. "The solutions presented by KCIC startups show remarkable potential for global scaling."

For more information about KCIC's portfolio companies and their achievements, visit www.kenyacic.org or contact media@kenyacic.org.`,
    featured: true,
    mediaContacts: [
      { name: 'Dr. Grace Njoki', title: 'Innovation Director', phone: '+254-20-123-4570', email: 'grace@kenyacic.org' }
    ],
    downloads: [
      { name: 'COP28 Achievement Report', url: '/downloads/cop28-achievements.pdf' },
      { name: 'Winner Profiles', url: '/downloads/winner-profiles.pdf' },
      { name: 'Award Ceremony Photos', url: '/downloads/cop28-photos.zip' }
    ]
  },
  {
    id: 4,
    title: 'New Climate Finance Facility Launched to Support Women-Led Climate Ventures',
    date: '2023-11-20',
    category: 'Program Launch',
    excerpt: 'KCIC announces the launch of a $2M climate finance facility specifically designed to support women entrepreneurs in climate innovation across Kenya.',
    content: `Nairobi, Kenya - November 20, 2023 - The Kenya Climate Innovation Centre (KCIC) today launched a groundbreaking $2 million Climate Finance Facility dedicated to supporting women-led climate ventures across Kenya. This initiative addresses the significant gender gap in climate finance access and entrepreneurship.

The Women in Climate Innovation Fund (WCIF) will provide grants ranging from $10,000 to $100,000 to women-led startups developing climate solutions. The facility is supported by the Swedish International Development Cooperation Agency (SIDA) and focuses on early-stage ventures across renewable energy, sustainable agriculture, and clean water sectors.

"Women represent 50% of our population but receive less than 20% of climate financing," said Dr. Mary Wambui, Gender and Climate Director at KCIC. "This facility is designed to bridge that gap and unlock the tremendous potential of women climate entrepreneurs."

The program features several innovative elements:
• Gender-responsive financing criteria and processes
• Dedicated mentorship from successful women entrepreneurs
• Childcare support during program activities
• Flexible repayment terms aligned with business cash flows
• Access to women-focused investor networks

Research conducted by KCIC shows that women-led climate ventures achieve 35% higher social impact metrics while maintaining comparable financial returns to male-led ventures. However, they receive significantly less funding due to systemic barriers in the financing ecosystem.

"This initiative is not just about equity - it's about efficiency," noted Anna Larsson, SIDA Country Director for Kenya. "Women entrepreneurs often develop solutions that more effectively address community needs, particularly in rural and underserved areas."

The first call for applications will open in January 2024, with selection based on innovation potential, market viability, and social impact. Priority will be given to solutions addressing challenges that disproportionately affect women and marginalized communities.

"We're particularly interested in supporting technologies that can create employment opportunities for women while addressing climate challenges," explained Dr. Wambui. "This includes everything from improved cookstoves to solar-powered agro-processing equipment."

The facility also includes a comprehensive capacity building component, featuring training in financial management, digital marketing, and investment readiness. Partnerships with local women's organizations will ensure broad outreach and community support.

For application guidelines and program information, visit www.kenyacic.org/women-climate-fund or contact wcif@kenyacic.org.`,
    featured: false,
    mediaContacts: [
      { name: 'Dr. Mary Wambui', title: 'Gender and Climate Director', phone: '+254-20-123-4571', email: 'mary@kenyacic.org' }
    ],
    downloads: [
      { name: 'Fund Launch Announcement', url: '/downloads/wcif-launch.pdf' },
      { name: 'Gender Gap Research Report', url: '/downloads/gender-climate-research.pdf' }
    ]
  }
];

const categories = ['All', 'Investment', 'Partnership', 'Achievement', 'Program Launch'];

export default function PressReleasePage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRelease, setSelectedRelease] = useState<number | null>(null);

  const filteredReleases = pressReleases.filter(release => {
    const matchesCategory = selectedCategory === 'All' || release.category === selectedCategory;
    const matchesSearch = searchTerm === '' || 
      release.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      release.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesCategory && matchesSearch;
  });

  const featuredReleases = pressReleases.filter(release => release.featured);

  return (
    <PageLayout
      title="Press Releases"
      subtitle="Latest news and announcements"
      description="Stay updated with the latest news, announcements, and achievements from KCIC and our portfolio of climate innovation startups."
      breadcrumb={[
        { label: 'Newsroom', href: '/newsroom' },
        { label: 'Press Release' }
      ]}
    >
      <div className="py-16">
        {/* Featured Press Releases */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Featured Announcements</h2>
            <div className="grid lg:grid-cols-2 gap-8">
              {featuredReleases.map((release, index) => (
                <motion.div
                  key={release.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-300"
                >
                  {/* Header */}
                  <div className="h-48 bg-gradient-to-br from-blue-500 to-green-600 relative">
                    <div className="absolute inset-0 bg-black bg-opacity-30"></div>
                    <div className="absolute top-4 right-4">
                      <span className="px-3 py-1 bg-white bg-opacity-90 text-gray-800 text-sm font-medium rounded-full">
                        {release.category}
                      </span>
                    </div>
                    <div className="absolute bottom-4 left-4 text-white">
                      <Megaphone className="w-8 h-8 mb-2 opacity-80" />
                      <div className="flex items-center text-sm opacity-90">
                        <Calendar className="w-4 h-4 mr-2" />
                        {new Date(release.date).toLocaleDateString('en-US', { 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-3 leading-tight">
                      {release.title}
                    </h3>

                    <p className="text-gray-700 mb-6 leading-relaxed">
                      {release.excerpt}
                    </p>

                    <div className="flex gap-3">
                      <button
                        onClick={() => setSelectedRelease(selectedRelease === release.id ? null : release.id)}
                        className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors duration-200"
                      >
                        Read Full Release
                      </button>
                      <button className="px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors duration-200 flex items-center">
                        <Download className="w-4 h-4 mr-2" />
                        Media Kit
                      </button>
                    </div>

                    {/* Expanded Content */}
                    {selectedRelease === release.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="mt-6 pt-6 border-t border-gray-200"
                      >
                        <div className="prose prose-gray max-w-none mb-6">
                          <div className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
                            {release.content}
                          </div>
                        </div>

                        <div className="border-t border-gray-200 pt-4">
                          <div className="grid md:grid-cols-2 gap-6">
                            {/* Media Contacts */}
                            <div>
                              <h4 className="font-semibold text-gray-900 mb-3">Media Contacts</h4>
                              <div className="space-y-2">
                                {release.mediaContacts.map((contact, i) => (
                                  <div key={i} className="text-sm">
                                    <p className="font-medium text-gray-900">{contact.name}</p>
                                    <p className="text-gray-600">{contact.title}</p>
                                    <p className="text-gray-600">{contact.phone}</p>
                                    <p className="text-blue-600">{contact.email}</p>
                                  </div>
                                ))}
                              </div>
                            </div>

                            {/* Downloads */}
                            <div>
                              <h4 className="font-semibold text-gray-900 mb-3">Downloads</h4>
                              <div className="space-y-2">
                                {release.downloads.map((download, i) => (
                                  <a
                                    key={i}
                                    href={download.url}
                                    className="flex items-center text-sm text-blue-600 hover:text-blue-800"
                                  >
                                    <Download className="w-4 h-4 mr-2" />
                                    {download.name}
                                  </a>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
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
              <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">All Press Releases</h2>
              
              {/* Search Bar */}
              <div className="max-w-md mx-auto mb-6">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search press releases..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Category Filter */}
              <div className="flex flex-wrap gap-2 justify-center">
                <span className="text-sm font-medium text-gray-700 mr-2 self-center">Category:</span>
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                      selectedCategory === category
                        ? 'bg-green-600 text-white shadow-md'
                        : 'bg-white text-gray-600 border border-gray-300 hover:border-green-300'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Press Releases List */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {filteredReleases.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <Megaphone className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No press releases found</h3>
              <p className="text-gray-600">Try adjusting your search terms or category filter.</p>
            </motion.div>
          ) : (
            <div className="space-y-8">
              {filteredReleases.map((release, index) => (
                <motion.article
                  key={release.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.05 }}
                  className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="p-6">
                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <span className="px-3 py-1 bg-blue-50 text-blue-700 text-sm font-medium rounded-full">
                            {release.category}
                          </span>
                          <div className="flex items-center text-sm text-gray-500">
                            <Calendar className="w-4 h-4 mr-1" />
                            {new Date(release.date).toLocaleDateString('en-US', { 
                              year: 'numeric', 
                              month: 'long', 
                              day: 'numeric' 
                            })}
                          </div>
                        </div>
                        
                        <h3 className="text-2xl font-bold text-gray-900 mb-3">{release.title}</h3>
                        <p className="text-gray-700 leading-relaxed">{release.excerpt}</p>
                      </div>
                      
                      <div className="flex flex-col gap-2 lg:ml-6 mt-4 lg:mt-0">
                        <button
                          onClick={() => setSelectedRelease(selectedRelease === release.id ? null : release.id)}
                          className="px-6 py-2 bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 transition-colors duration-200 flex items-center justify-center"
                        >
                          <Eye className="w-4 h-4 mr-2" />
                          {selectedRelease === release.id ? 'Hide' : 'Read More'}
                        </button>
                        <button className="px-6 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors duration-200 flex items-center justify-center">
                          <Download className="w-4 h-4 mr-2" />
                          Download
                        </button>
                      </div>
                    </div>

                    {/* Expanded Content */}
                    {selectedRelease === release.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="border-t border-gray-200 pt-6 mt-6"
                      >
                        <div className="prose prose-gray max-w-none mb-6">
                          <div className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
                            {release.content}
                          </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6 pt-4 border-t border-gray-200">
                          {/* Media Contacts */}
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-3">Media Contacts</h4>
                            <div className="space-y-3">
                              {release.mediaContacts.map((contact, i) => (
                                <div key={i} className="text-sm border border-gray-200 rounded-lg p-3">
                                  <p className="font-medium text-gray-900">{contact.name}</p>
                                  <p className="text-gray-600 mb-1">{contact.title}</p>
                                  <p className="text-gray-600">{contact.phone}</p>
                                  <p className="text-blue-600">{contact.email}</p>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Downloads */}
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-3">Media Resources</h4>
                            <div className="space-y-2">
                              {release.downloads.map((download, i) => (
                                <a
                                  key={i}
                                  href={download.url}
                                  className="flex items-center text-sm text-blue-600 hover:text-blue-800 p-2 border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors duration-200"
                                >
                                  <Download className="w-4 h-4 mr-3" />
                                  {download.name}
                                  <ExternalLink className="w-3 h-3 ml-auto" />
                                </a>
                              ))}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </div>
                </motion.article>
              ))}
            </div>
          )}
        </div>

        {/* Media Contact Section */}
        <div className="bg-green-50 py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Media Inquiries</h2>
              <p className="text-xl text-gray-600 mb-8">
                For media inquiries, interview requests, or additional information, please contact our communications team.
              </p>
              <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md mx-auto">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">KCIC Communications</h3>
                <div className="space-y-2 text-left">
                  <p className="text-gray-700">Phone: +254-20-123-4567</p>
                  <p className="text-gray-700">Email: media@kenyacic.org</p>
                  <p className="text-gray-700">Address: University of Nairobi, Nairobi, Kenya</p>
                </div>
                <button className="w-full mt-6 bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors duration-200">
                  Send Media Inquiry
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}