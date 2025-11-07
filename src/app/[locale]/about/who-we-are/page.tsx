'use client';

import { PageLayout } from '@/components/layout/PageLayout';
import { motion } from 'framer-motion';

const values = [
  {
    title: 'People-centric',
    description: 'We prioritize the well-being of employees and stakeholders'
  },
  {
    title: 'Inclusivity',
    description: 'We leave no one behind'
  },
  {
    title: 'Professionalism',
    description: 'We are committed to excellence'
  },
  {
    title: 'Integrity',
    description: 'We walk the talk and keep our word'
  },
  {
    title: 'Innovation',
    description: 'We foster creativity and forward-thinking'
  },
  {
    title: 'Collaboration',
    description: 'We believe we are stronger together'
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
                  <h2 className="text-3xl font-bold text-gray-900">Our Mission</h2>
                </div>
                <p className="text-lg text-gray-700 leading-relaxed">
                  We catalyze climate entrepreneurship
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
                  <h2 className="text-3xl font-bold text-gray-900">Our Vision</h2>
                </div>
                <p className="text-lg text-gray-700 leading-relaxed">
                  Sustainable Enterprises and Climate Resilient Communities
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
                  Kenya Climate Innovation Center (KCIC) is a World Bank's infoDev initiative, and was the first in a global network of CICs being launched by infoDev's Climate Technology Program (CTP) to support the development and scale up of locally relevant climate technologies.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  KCIC was initially set up as a project by a consortium of partners in September 2012 and was funded by UKaid and DANIDA through the World Bank from September 2012 to May 2016. GVEP International (now Energy4Impact), PwC, Strathmore University and KIRDI were the lead partners in a consortium contracted by infoDev to establish and operate the KCIC.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  KCIC was successfully registered as a company limited by guarantee in January 2015 and received a new round of funding from DANIDA to support its activities for the period June 2016 to December 2020.
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
                   
                    <h3 className="text-xl font-semibold text-gray-900">{value.title}</h3>
                  </div>
                  <p className="text-gray-600 leading-relaxed">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

       
      </div>
    </PageLayout>
  );
}