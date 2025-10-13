'use client';

import React, { useState } from 'react';
import { PageLayout } from '@/components/layout/PageLayout';
import { Metadata } from 'next';
import { motion } from 'framer-motion';
import { 
  Users, MapPin, Clock, Briefcase, Heart, Award, 
  TrendingUp, Globe, Coffee, Laptop, Zap, Search,
  ArrowRight, ExternalLink, Mail, Calendar
} from 'lucide-react';

// Sample job data - will be replaced with real data later
const openPositions = [
  {
    id: 1,
    title: 'Senior Climate Finance Specialist',
    department: 'Finance & Investment',
    location: 'Nairobi, Kenya',
    type: 'Full-time',
    level: 'Senior',
    posted: '2024-01-10',
    description: 'Lead climate finance initiatives and manage investment facilitation programs for climate-focused SMEs across Kenya and East Africa.',
    responsibilities: [
      'Develop and manage climate finance programs and initiatives',
      'Build and maintain relationships with investors, DFIs, and financial institutions',
      'Conduct due diligence and investment analysis for climate ventures',
      'Support portfolio companies with investment readiness and fundraising',
      'Monitor and evaluate impact of investment facilitation programs'
    ],
    requirements: [
      'Masters degree in Finance, Economics, or related field',
      '7+ years experience in climate finance, impact investing, or development finance',
      'Strong analytical and financial modeling skills',
      'Excellent communication and relationship management abilities',
      'Experience working with SMEs and startups in African markets preferred'
    ],
    featured: true
  },
  {
    id: 2,
    title: 'Program Manager - Renewable Energy',
    department: 'Programs',
    location: 'Nairobi, Kenya',
    type: 'Full-time',
    level: 'Mid-level',
    posted: '2024-01-08',
    description: 'Manage and coordinate renewable energy incubation and acceleration programs, supporting startups from concept to market deployment.',
    responsibilities: [
      'Design and implement renewable energy program curricula',
      'Manage program operations, timelines, and deliverables',
      'Coordinate with mentors, partners, and stakeholders',
      'Support startup cohorts through incubation and acceleration phases',
      'Monitor and report on program outcomes and impact'
    ],
    requirements: [
      'Bachelor\'s degree in Engineering, Business, or related field',
      '5+ years experience in program management or business development',
      'Knowledge of renewable energy technologies and markets',
      'Strong project management and organizational skills',
      'Experience with startup ecosystems and entrepreneurship programs'
    ],
    featured: false
  },
  {
    id: 3,
    title: 'Communications & Marketing Officer',
    department: 'Communications',
    location: 'Nairobi, Kenya',
    type: 'Full-time',
    level: 'Mid-level',
    posted: '2024-01-05',
    description: 'Develop and execute comprehensive communication strategies to promote KCIC\'s work and amplify the success stories of our portfolio companies.',
    responsibilities: [
      'Develop and implement communications and marketing strategies',
      'Create compelling content for digital platforms and publications',
      'Manage social media presence and online community engagement',
      'Coordinate media relations and press activities',
      'Support event planning and stakeholder engagement initiatives'
    ],
    requirements: [
      'Bachelor\'s degree in Communications, Marketing, or Journalism',
      '3+ years experience in communications or marketing roles',
      'Excellent writing and content creation skills',
      'Proficiency in digital marketing tools and social media platforms',
      'Experience in the startup, innovation, or development sectors preferred'
    ],
    featured: true
  },
  {
    id: 4,
    title: 'Research Analyst - Climate Policy',
    department: 'Research & Policy',
    location: 'Nairobi, Kenya',
    type: 'Full-time',
    level: 'Junior',
    posted: '2024-01-03',
    description: 'Conduct research on climate policies, market trends, and innovation ecosystems to inform KCIC\'s strategic direction and program development.',
    responsibilities: [
      'Conduct research on climate policy and innovation trends',
      'Analyze market opportunities and ecosystem dynamics',
      'Prepare research reports and policy briefs',
      'Support impact measurement and evaluation activities',
      'Contribute to knowledge products and thought leadership initiatives'
    ],
    requirements: [
      'Master\'s degree in Economics, Public Policy, or related field',
      '2+ years research experience in climate, innovation, or development',
      'Strong analytical and data analysis skills',
      'Excellent research and writing capabilities',
      'Knowledge of African climate and innovation landscape preferred'
    ],
    featured: false
  },
  {
    id: 5,
    title: 'Technical Advisor - AgTech',
    department: 'Technical Support',
    location: 'Nairobi, Kenya',
    type: 'Contract',
    level: 'Senior',
    posted: '2024-01-01',
    description: 'Provide technical expertise and mentorship to agricultural technology startups in our portfolio, focusing on sustainable agriculture solutions.',
    responsibilities: [
      'Provide technical guidance to AgTech startups and entrepreneurs',
      'Conduct technical due diligence and feasibility assessments',
      'Develop technical training modules and resources',
      'Support technology transfer and commercialization activities',
      'Build partnerships with agricultural research institutions'
    ],
    requirements: [
      'PhD or MSc in Agricultural Engineering, Agronomy, or related field',
      '10+ years experience in agricultural technology and innovation',
      'Deep knowledge of sustainable agriculture practices and technologies',
      'Experience working with startups and early-stage ventures',
      'Strong network in the agricultural innovation ecosystem'
    ],
    featured: false
  }
];

const benefits = [
  {
    icon: Heart,
    title: 'Comprehensive Health Coverage',
    description: 'Full medical, dental, and vision coverage for you and your family, including mental health support.'
  },
  {
    icon: TrendingUp,
    title: 'Professional Development',
    description: 'Annual learning budget, conference attendance, and opportunities for skills development and career growth.'
  },
  {
    icon: Globe,
    title: 'Global Impact Work',
    description: 'Opportunity to work on meaningful projects that create positive environmental and social impact across Africa.'
  },
  {
    icon: Coffee,
    title: 'Flexible Work Environment',
    description: 'Hybrid work options, flexible hours, and a supportive work-life balance culture.'
  },
  {
    icon: Laptop,
    title: 'Modern Equipment',
    description: 'Latest technology and equipment to help you do your best work, including laptop and mobile allowances.'
  },
  {
    icon: Zap,
    title: 'Innovation Culture',
    description: 'Work in a dynamic, collaborative environment that encourages creativity and innovative thinking.'
  }
];

const departments = ['All', 'Finance & Investment', 'Programs', 'Communications', 'Research & Policy', 'Technical Support'];
const jobTypes = ['All', 'Full-time', 'Part-time', 'Contract', 'Internship'];
const levels = ['All', 'Junior', 'Mid-level', 'Senior'];

export default function CareersPage() {
  const [selectedDepartment, setSelectedDepartment] = useState('All');
  const [selectedType, setSelectedType] = useState('All');
  const [selectedLevel, setSelectedLevel] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedJob, setSelectedJob] = useState<number | null>(null);

  const filteredJobs = openPositions.filter(job => {
    const matchesDepartment = selectedDepartment === 'All' || job.department === selectedDepartment;
    const matchesType = selectedType === 'All' || job.type === selectedType;
    const matchesLevel = selectedLevel === 'All' || job.level === selectedLevel;
    const matchesSearch = searchTerm === '' || 
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesDepartment && matchesType && matchesLevel && matchesSearch;
  });

  const featuredJobs = openPositions.filter(job => job.featured);

  return (
    <PageLayout
      title="Careers"
      subtitle="Join our mission to accelerate climate innovation"
      description="Build your career while making a meaningful impact on climate solutions across Kenya and Africa. Explore opportunities to join our dynamic team of climate innovation experts."
      breadcrumb={[
        { label: 'About Us', href: '/about' },
        { label: 'Careers' }
      ]}
    >
      <div className="py-16">
        {/* Why Work With Us */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Why Work With Us?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12">
              Join a team that's passionate about creating positive change through climate innovation. 
              We offer a dynamic, supportive environment where your work directly impacts communities across Africa.
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center mb-4 mx-auto">
                    <benefit.icon className="w-6 h-6 text-green-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 text-center">{benefit.title}</h3>
                  <p className="text-gray-600 text-center leading-relaxed">{benefit.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Featured Positions */}
        {featuredJobs.length > 0 && (
          <div className="bg-green-50 py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mb-12"
              >
                <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Featured Positions</h2>
                <div className="grid lg:grid-cols-2 gap-8">
                  {featuredJobs.map((job, index) => (
                    <motion.div
                      key={job.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-300"
                    >
                      <div className="h-32 bg-gradient-to-br from-green-500 to-blue-600 relative">
                        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
                        <div className="absolute top-4 right-4">
                          <span className="px-3 py-1 bg-white bg-opacity-90 text-gray-800 text-sm font-medium rounded-full">
                            {job.type}
                          </span>
                        </div>
                        <div className="absolute bottom-4 left-4 text-white">
                          <Briefcase className="w-6 h-6 opacity-80" />
                        </div>
                      </div>

                      <div className="p-6">
                        <div className="mb-4">
                          <h3 className="text-xl font-bold text-gray-900 mb-2">{job.title}</h3>
                          <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                            <span className="flex items-center">
                              <Users className="w-4 h-4 mr-1" />
                              {job.department}
                            </span>
                            <span className="flex items-center">
                              <MapPin className="w-4 h-4 mr-1" />
                              {job.location}
                            </span>
                            <span className="flex items-center">
                              <Award className="w-4 h-4 mr-1" />
                              {job.level}
                            </span>
                          </div>
                        </div>

                        <p className="text-gray-700 leading-relaxed mb-6">{job.description}</p>

                        <div className="flex gap-3">
                          <button
                            onClick={() => setSelectedJob(selectedJob === job.id ? null : job.id)}
                            className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors duration-200"
                          >
                            View Details
                          </button>
                          <button className="px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors duration-200">
                            Apply Now
                          </button>
                        </div>

                        {/* Job Details */}
                        {selectedJob === job.id && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="mt-6 pt-6 border-t border-gray-200"
                          >
                            <div className="space-y-6">
                              <div>
                                <h4 className="font-semibold text-gray-900 mb-3">Key Responsibilities</h4>
                                <ul className="space-y-2">
                                  {job.responsibilities.map((responsibility, i) => (
                                    <li key={i} className="text-sm text-gray-700 flex items-start">
                                      <ArrowRight className="w-4 h-4 mr-2 mt-0.5 text-green-600 flex-shrink-0" />
                                      {responsibility}
                                    </li>
                                  ))}
                                </ul>
                              </div>

                              <div>
                                <h4 className="font-semibold text-gray-900 mb-3">Requirements</h4>
                                <ul className="space-y-2">
                                  {job.requirements.map((requirement, i) => (
                                    <li key={i} className="text-sm text-gray-700 flex items-start">
                                      <Award className="w-4 h-4 mr-2 mt-0.5 text-blue-600 flex-shrink-0" />
                                      {requirement}
                                    </li>
                                  ))}
                                </ul>
                              </div>

                              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                                <div className="flex items-center text-sm text-gray-500">
                                  <Calendar className="w-4 h-4 mr-1" />
                                  Posted: {new Date(job.posted).toLocaleDateString()}
                                </div>
                                <button className="bg-green-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-700 transition-colors duration-200">
                                  Apply for this Position
                                </button>
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
          </div>
        )}

        {/* All Positions */}
        <div className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Search and Filters */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-12"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">All Open Positions</h2>
              
              {/* Search Bar */}
              <div className="max-w-md mx-auto mb-6">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search positions..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Filters */}
              <div className="flex flex-col lg:flex-row gap-4 justify-center">
                <div className="flex flex-wrap gap-2 justify-center">
                  <span className="text-sm font-medium text-gray-700 mr-2 self-center">Department:</span>
                  {departments.map((dept) => (
                    <button
                      key={dept}
                      onClick={() => setSelectedDepartment(dept)}
                      className={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-200 ${
                        selectedDepartment === dept
                          ? 'bg-green-600 text-white'
                          : 'bg-white text-gray-600 border border-gray-300 hover:border-green-300'
                      }`}
                    >
                      {dept}
                    </button>
                  ))}
                </div>

                <div className="flex flex-wrap gap-2 justify-center">
                  <span className="text-sm font-medium text-gray-700 mr-2 self-center">Type:</span>
                  {jobTypes.map((type) => (
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

                <div className="flex flex-wrap gap-2 justify-center">
                  <span className="text-sm font-medium text-gray-700 mr-2 self-center">Level:</span>
                  {levels.map((level) => (
                    <button
                      key={level}
                      onClick={() => setSelectedLevel(level)}
                      className={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-200 ${
                        selectedLevel === level
                          ? 'bg-purple-600 text-white'
                          : 'bg-white text-gray-600 border border-gray-300 hover:border-purple-300'
                      }`}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Job Listings */}
            {filteredJobs.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12"
              >
                <Briefcase className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No positions found</h3>
                <p className="text-gray-600">Try adjusting your search terms or filters.</p>
              </motion.div>
            ) : (
              <div className="space-y-6">
                {filteredJobs.map((job, index) => (
                  <motion.div
                    key={job.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.05 }}
                    className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-shadow duration-300"
                  >
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                      <div className="flex-1 mb-4 lg:mb-0">
                        <div className="flex items-center gap-3 mb-3">
                          <span className="px-3 py-1 bg-green-50 text-green-700 text-sm font-medium rounded-full">
                            {job.department}
                          </span>
                          <span className="px-3 py-1 bg-blue-50 text-blue-700 text-sm font-medium rounded-full">
                            {job.type}
                          </span>
                          <span className="px-3 py-1 bg-purple-50 text-purple-700 text-sm font-medium rounded-full">
                            {job.level}
                          </span>
                        </div>
                        
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">{job.title}</h3>
                        
                        <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                          <span className="flex items-center">
                            <MapPin className="w-4 h-4 mr-1" />
                            {job.location}
                          </span>
                          <span className="flex items-center">
                            <Calendar className="w-4 h-4 mr-1" />
                            Posted: {new Date(job.posted).toLocaleDateString()}
                          </span>
                        </div>
                        
                        <p className="text-gray-700 leading-relaxed">{job.description}</p>
                      </div>
                      
                      <div className="flex flex-col gap-2 lg:ml-6">
                        <button
                          onClick={() => setSelectedJob(selectedJob === job.id ? null : job.id)}
                          className="px-6 py-2 bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 transition-colors duration-200 flex items-center justify-center"
                        >
                          {selectedJob === job.id ? 'Hide Details' : 'View Details'}
                        </button>
                        <button className="px-6 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors duration-200 flex items-center justify-center">
                          Apply Now
                          <ExternalLink className="w-4 h-4 ml-2" />
                        </button>
                      </div>
                    </div>

                    {/* Expanded Details */}
                    {selectedJob === job.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="border-t border-gray-200 pt-6 mt-6"
                      >
                        <div className="grid lg:grid-cols-2 gap-8">
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-3">Key Responsibilities</h4>
                            <ul className="space-y-2">
                              {job.responsibilities.map((responsibility, i) => (
                                <li key={i} className="text-sm text-gray-700 flex items-start">
                                  <ArrowRight className="w-4 h-4 mr-2 mt-0.5 text-green-600 flex-shrink-0" />
                                  {responsibility}
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div>
                            <h4 className="font-semibold text-gray-900 mb-3">Requirements</h4>
                            <ul className="space-y-2">
                              {job.requirements.map((requirement, i) => (
                                <li key={i} className="text-sm text-gray-700 flex items-start">
                                  <Award className="w-4 h-4 mr-2 mt-0.5 text-blue-600 flex-shrink-0" />
                                  {requirement}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Application Process & Contact */}
        <div className="bg-gray-50 py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Ready to Apply?</h2>
              
              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Application Process</h3>
                  <div className="text-left space-y-3">
                    <div className="flex items-start">
                      <span className="flex-shrink-0 w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-sm mr-3 mt-0.5">1</span>
                      <span className="text-gray-700">Submit your application with CV and cover letter</span>
                    </div>
                    <div className="flex items-start">
                      <span className="flex-shrink-0 w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-sm mr-3 mt-0.5">2</span>
                      <span className="text-gray-700">Initial screening and review (5-7 business days)</span>
                    </div>
                    <div className="flex items-start">
                      <span className="flex-shrink-0 w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-sm mr-3 mt-0.5">3</span>
                      <span className="text-gray-700">Interview rounds with team members</span>
                    </div>
                    <div className="flex items-start">
                      <span className="flex-shrink-0 w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-sm mr-3 mt-0.5">4</span>
                      <span className="text-gray-700">Final decision and job offer</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Questions?</h3>
                  <div className="text-left space-y-3">
                    <p className="text-gray-700">Have questions about our positions or application process?</p>
                    <div className="space-y-2">
                      <p className="text-gray-700 flex items-center">
                        <Mail className="w-4 h-4 mr-2 text-green-600" />
                        careers@kenyacic.org
                      </p>
                      <p className="text-gray-700 flex items-center">
                        <MapPin className="w-4 h-4 mr-2 text-green-600" />
                        University of Nairobi, Nairobi, Kenya
                      </p>
                    </div>
                    <button className="w-full mt-4 bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors duration-200">
                      Contact HR Team
                    </button>
                  </div>
                </div>
              </div>

              <p className="text-gray-600 mb-6">
                KCIC is an equal opportunity employer committed to diversity and inclusion. 
                We welcome applications from all qualified candidates.
              </p>
              
              <button className="bg-green-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-green-700 transition-colors duration-200 text-lg">
                Send Your CV
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}