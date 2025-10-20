'use client';

import React, { useState } from 'react';
import { PageLayout } from '@/components/layout/PageLayout';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, Search, MessageCircleQuestion } from 'lucide-react';

const faqData = [
  {
    category: 'General Information',
    questions: [
      {
        question: 'What is the Kenya Climate Innovation Centre (KCIC)?',
        answer: 'KCIC is a leading climate innovation hub that supports small and medium enterprises (SMEs) in developing and scaling climate solutions. We provide incubation, acceleration, funding access, and market linkages to drive sustainable development in Kenya and across Africa.'
      },
      {
        question: 'When was KCIC established?',
        answer: 'KCIC was established in 2010 with the vision of becoming the leading climate innovation centre in Africa. Over the past decade, we have supported 450+ SMEs and mobilized over $25M in investment.'
      },
      {
        question: 'What is KCIC\'s mission?',
        answer: 'Our mission is to accelerate climate innovation and green economic growth in Kenya by supporting climate-focused SMEs through incubation, acceleration, and access to finance, technology, and markets.'
      }
    ]
  },
  {
    category: 'Programs & Services',
    questions: [
      {
        question: 'What programs does KCIC offer?',
        answer: 'We offer comprehensive programs including incubation for early-stage startups, acceleration for growing ventures, access to finance, market linkages, technical assistance, and capacity building across various climate sectors.'
      },
      {
        question: 'What sectors does KCIC focus on?',
        answer: 'We focus on key climate sectors including renewable energy, sustainable agriculture, water and sanitation, waste management, green transportation, energy efficiency, and climate adaptation technologies.'
      },
      {
        question: 'How long are your incubation and acceleration programs?',
        answer: 'Our incubation program typically runs for 6-12 months for early-stage ventures, while our acceleration program runs for 3-6 months for more mature startups ready to scale their operations.'
      },
      {
        question: 'Do you provide funding to startups?',
        answer: 'While KCIC doesn\'t directly provide funding, we facilitate access to finance through our network of investors, donors, and financial institutions. We also help startups prepare investment-ready business plans and connect them with appropriate funding sources.'
      }
    ]
  },
  {
    category: 'Eligibility & Application',
    questions: [
      {
        question: 'Who is eligible to apply for KCIC programs?',
        answer: 'We support climate-focused SMEs at various stages of development. Eligibility criteria include having a climate solution with market potential, being legally registered or willing to register in Kenya, and demonstrating commitment to sustainable development goals.'
      },
      {
        question: 'How do I apply for KCIC programs?',
        answer: 'Applications can be submitted through our online portal. The process typically involves completing an application form, submitting a business plan, and participating in an evaluation process. We announce application periods through our website and social media channels.'
      },
      {
        question: 'What documents do I need to apply?',
        answer: 'Required documents typically include a detailed business plan, company registration documents, founder CVs, financial projections, proof of concept or prototype information, and any relevant certifications or permits.'
      },
      {
        question: 'Is there an application fee?',
        answer: 'No, there is no application fee for KCIC programs. Our services are provided free of charge to selected participants, thanks to support from our donors and partners.'
      }
    ]
  },
  {
    category: 'Support & Impact',
    questions: [
      {
        question: 'What support do startups receive?',
        answer: 'Startups receive comprehensive support including business development training, technical assistance, mentorship, market linkages, access to finance facilitation, networking opportunities, and office space where available.'
      },
      {
        question: 'How many companies has KCIC supported?',
        answer: 'To date, KCIC has supported over 450 SMEs, mobilized more than $25M in investment, and contributed to the creation of over 2,500 green jobs across various climate sectors.'
      },
      {
        question: 'Do you provide ongoing support after program completion?',
        answer: 'Yes, we maintain relationships with our alumni companies and provide ongoing support through our network, follow-up services, and continued access to certain resources and opportunities.'
      }
    ]
  },
  {
    category: 'Partnerships',
    questions: [
      {
        question: 'Who are KCIC\'s key partners?',
        answer: 'Our partners include international donors like the World Bank, USAID, GIZ, and DFID; development partners like UNDP and Climate-KIC; government institutions; academic partners like Strathmore University; and private sector partners.'
      },
      {
        question: 'How can organizations partner with KCIC?',
        answer: 'Organizations can partner with us in various ways including funding support, technical expertise provision, market access facilitation, mentorship, and resource sharing. Contact us to discuss partnership opportunities that align with our mission.'
      },
      {
        question: 'Do you work with international organizations?',
        answer: 'Yes, we actively collaborate with international organizations, development agencies, and climate innovation networks to share knowledge, access global markets, and scale successful solutions beyond Kenya.'
      }
    ]
  }
];

export default function FAQsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [openItems, setOpenItems] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const toggleItem = (id: string) => {
    setOpenItems(prev =>
      prev.includes(id)
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  const filteredFAQs = faqData.map(category => ({
    ...category,
    questions: category.questions.filter(q =>
      q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      q.answer.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(category =>
    selectedCategory === 'All' || category.category === selectedCategory
  ).filter(category => category.questions.length > 0);

  const categories = ['All', ...faqData.map(cat => cat.category)];

  return (
    <PageLayout
      title="Frequently Asked Questions"
      subtitle="Get answers to common questions"
      description="Find answers to frequently asked questions about KCIC programs, services, and how we support climate innovation in Kenya."
      breadcrumb={[
        { label: 'FAQs' }
      ]}
    >
      <div className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Search and Filter Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            {/* Search Bar */}
            <div className="relative mb-8">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search FAQs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-lg"
              />
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2 justify-center">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    selectedCategory === category
                      ? 'bg-green-600 text-white shadow-md'
                      : 'bg-white text-gray-700 border border-gray-300 hover:border-green-300 hover:text-green-600'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </motion.div>

          {/* FAQ Content */}
          {filteredFAQs.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <MessageCircleQuestion className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No FAQs found</h3>
              <p className="text-gray-600">Try adjusting your search terms or category filter.</p>
            </motion.div>
          ) : (
            filteredFAQs.map((category, categoryIndex) => (
              <motion.div
                key={category.category}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
                className="mb-12"
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b border-gray-200">
                  {category.category}
                </h2>
                
                <div className="space-y-4">
                  {category.questions.map((faq, index) => {
                    const itemId = `${category.category}-${index}`;
                    const isOpen = openItems.includes(itemId);
                    
                    return (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.05 }}
                        className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
                      >
                        <button
                          onClick={() => toggleItem(itemId)}
                          className="w-full px-6 py-4 text-left flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-inset rounded-lg"
                          aria-expanded={isOpen}
                        >
                          <span className="font-semibold text-gray-900 text-lg pr-4">
                            {faq.question}
                          </span>
                          <motion.div
                            animate={{ rotate: isOpen ? 45 : 0 }}
                            transition={{ duration: 0.2 }}
                            className="flex-shrink-0"
                          >
                            {isOpen ? (
                              <Minus className="w-5 h-5 text-green-600" />
                            ) : (
                              <Plus className="w-5 h-5 text-green-600" />
                            )}
                          </motion.div>
                        </button>
                        
                        <AnimatePresence>
                          {isOpen && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.3, ease: 'easeInOut' }}
                              className="overflow-hidden"
                            >
                              <div className="px-6 pb-4 text-gray-700 leading-relaxed">
                                {faq.answer}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            ))
          )}

          {/* Contact Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-16 text-center bg-green-50 rounded-2xl p-8"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Still have questions?</h3>
            <p className="text-lg text-gray-600 mb-6">
              Can&apos;t find the answer you&apos;re looking for? Our team is here to help.
            </p>
            <a
              href="/about/contact-us"
              className="inline-flex items-center px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors duration-200"
            >
              Contact Us
            </a>
          </motion.div>
        </div>
      </div>
    </PageLayout>
  );
}