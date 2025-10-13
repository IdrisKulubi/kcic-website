import React from 'react';
import { PageLayout } from '@/components/layout/PageLayout';
import { Metadata } from 'next';
import { motion } from 'framer-motion';
import { Users, Mail, Linkedin, Twitter, Phone, Award, MapPin, Calendar, Briefcase } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Our Team - About KCIC',
  description: 'Meet the dedicated professionals, advisors, and leadership team driving climate innovation at KCIC. Our diverse team brings together expertise in entrepreneurship, technology, and sustainable development.',
  keywords: ['KCIC team', 'climate innovation experts', 'leadership team', 'advisors', 'staff'],
};

// Sample team data - will be replaced with real data later
const leadership = [
  {
    id: 1,
    name: 'Dr. Sarah Wanjiku',
    position: 'Executive Director',
    bio: 'Dr. Wanjiku brings over 15 years of experience in climate finance and sustainable development. She previously served as Regional Director for Climate Investments at the African Development Bank and holds a PhD in Environmental Economics from the University of Cambridge.',
    expertise: ['Climate Finance', 'Sustainable Development', 'Policy Development'],
    experience: '15+ years',
    education: 'PhD Environmental Economics, University of Cambridge',
    image: '/images/team/sarah-wanjiku.jpg',
    social: {
      email: 'sarah@kenyacic.org',
      linkedin: 'https://linkedin.com/in/sarah-wanjiku',
      twitter: 'https://twitter.com/swanjiku'
    },
    achievements: [
      'Led $500M+ in climate investment mobilization across Africa',
      'Published 25+ papers on climate finance mechanisms',
      'Advisory board member for 3 international climate organizations'
    ]
  },
  {
    id: 2,
    name: 'Prof. Michael Ochieng',
    position: 'Program Director',
    bio: 'Prof. Ochieng is a renowned expert in climate technology and innovation systems. With over 20 years in academia and industry, he has led numerous climate tech development programs and served as a consultant for the World Bank and UN agencies.',
    expertise: ['Climate Technology', 'Innovation Systems', 'Technology Transfer'],
    experience: '20+ years',
    education: 'PhD Mechanical Engineering, MIT',
    image: '/images/team/michael-ochieng.jpg',
    social: {
      email: 'michael@kenyacic.org',
      linkedin: 'https://linkedin.com/in/michael-ochieng',
      twitter: 'https://twitter.com/mochieng'
    },
    achievements: [
      'Led development of 15+ climate technologies',
      'Published 40+ peer-reviewed research papers',
      'Holder of 8 patents in renewable energy systems'
    ]
  },
  {
    id: 3,
    name: 'Dr. Grace Njoki',
    position: 'Innovation Director',
    bio: 'Dr. Njoki specializes in startup incubation and innovation management. She has successfully mentored over 200 startups and has deep expertise in converting research into commercially viable climate solutions.',
    expertise: ['Startup Incubation', 'Innovation Management', 'Commercialization'],
    experience: '12+ years',
    education: 'PhD Innovation Management, Stanford University',
    image: '/images/team/grace-njoki.jpg',
    social: {
      email: 'grace@kenyacic.org',
      linkedin: 'https://linkedin.com/in/grace-njoki'
    },
    achievements: [
      'Mentored 200+ climate startups to market success',
      'Expert advisor for 5 international accelerator programs',
      'Led innovation programs with 85% success rate'
    ]
  }
];

const staff = [
  {
    id: 4,
    name: 'James Kiprotich',
    position: 'Investment Manager',
    department: 'Finance & Investment',
    bio: 'James manages KCIC\'s investment facilitation programs and maintains relationships with investor networks across Africa and internationally.',
    experience: '8+ years',
    education: 'MBA Finance, Strathmore Business School',
    image: '/images/team/james-kiprotich.jpg',
    expertise: ['Investment Analysis', 'Due Diligence', 'Portfolio Management']
  },
  {
    id: 5,
    name: 'Dr. Mary Wambui',
    position: 'Gender & Climate Director',
    department: 'Programs',
    bio: 'Dr. Wambui leads initiatives focused on supporting women entrepreneurs in climate innovation and addressing gender gaps in the sector.',
    experience: '10+ years',
    education: 'PhD Gender Studies, University of Nairobi',
    image: '/images/team/mary-wambui.jpg',
    expertise: ['Gender Mainstreaming', 'Social Impact', 'Program Design']
  },
  {
    id: 6,
    name: 'Peter Munyao',
    position: 'Technology Advisor',
    department: 'Technical Support',
    bio: 'Peter provides technical assistance to startups in renewable energy and sustainable technology development.',
    experience: '12+ years',
    education: 'MSc Renewable Energy, Technical University of Kenya',
    image: '/images/team/peter-munyao.jpg',
    expertise: ['Renewable Energy Systems', 'Technical Due Diligence', 'Product Development']
  },
  {
    id: 7,
    name: 'Sarah Kimani',
    position: 'Communications Manager',
    department: 'Communications',
    bio: 'Sarah manages KCIC\'s communications strategy, media relations, and stakeholder engagement initiatives.',
    experience: '6+ years',
    education: 'BA Communications, University of Nairobi',
    image: '/images/team/sarah-kimani.jpg',
    expertise: ['Strategic Communications', 'Media Relations', 'Content Strategy']
  },
  {
    id: 8,
    name: 'David Mwangi',
    position: 'Program Coordinator',
    department: 'Programs',
    bio: 'David coordinates KCIC\'s incubation and acceleration programs, ensuring smooth operations and participant success.',
    experience: '5+ years',
    education: 'MSc Project Management, Kenyatta University',
    image: '/images/team/david-mwangi.jpg',
    expertise: ['Program Management', 'Stakeholder Coordination', 'Impact Measurement']
  },
  {
    id: 9,
    name: 'Anne Waithira',
    position: 'Research Analyst',
    department: 'Research & Policy',
    bio: 'Anne conducts market research, policy analysis, and impact assessment studies to inform KCIC\'s strategic direction.',
    experience: '4+ years',
    education: 'MSc Economics, University of Nairobi',
    image: '/images/team/anne-waithira.jpg',
    expertise: ['Market Research', 'Policy Analysis', 'Data Analytics']
  }
];

const advisors = [
  {
    id: 10,
    name: 'Prof. Calestous Juma',
    position: 'Strategic Advisor',
    organization: 'Harvard Kennedy School',
    bio: 'Internationally recognized expert in sustainable development and innovation policy with extensive experience in African development.',
    expertise: ['Innovation Policy', 'Sustainable Development', 'Technology Policy'],
    image: '/images/team/calestous-juma.jpg'
  },
  {
    id: 11,
    name: 'Dr. Kandeh Yumkella',
    position: 'Energy Advisor',
    organization: 'Former UN Under-Secretary-General',
    bio: 'Former CEO of Sustainable Energy for All and UN Under-Secretary-General, bringing decades of experience in sustainable energy.',
    expertise: ['Sustainable Energy', 'International Development', 'Policy Leadership'],
    image: '/images/team/kandeh-yumkella.jpg'
  },
  {
    id: 12,
    name: 'Wanjira Mathai',
    position: 'Environmental Advisor',
    organization: 'World Resources Institute Africa',
    bio: 'Regional Director for Africa at WRI, with extensive experience in environmental policy and climate change adaptation.',
    expertise: ['Environmental Policy', 'Climate Adaptation', 'Natural Resources Management'],
    image: '/images/team/wanjira-mathai.jpg'
  }
];

const departments = ['All', 'Finance & Investment', 'Programs', 'Technical Support', 'Communications', 'Research & Policy'];

export default function OurTeamPage() {
  return (
    <PageLayout
      title="Our Team"
      subtitle="Meet the people driving climate innovation"
      description="Our diverse team of experts, innovators, and leaders is committed to accelerating climate solutions and supporting entrepreneurs across Kenya and Africa."
      breadcrumb={[
        { label: 'About Us', href: '/about' },
        { label: 'Our team' }
      ]}
    >
      <div className="py-16">
        {/* Leadership Team */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Leadership Team</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our executive leadership brings together decades of experience in climate innovation, 
              finance, and sustainable development.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            {leadership.map((member, index) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-300"
              >
                {/* Profile Header */}
                <div className="relative h-80 bg-gradient-to-br from-green-400 to-blue-500">
                  <div className="absolute inset-0 bg-black bg-opacity-20"></div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <Users className="w-8 h-8 mb-2 opacity-80" />
                  </div>
                </div>

                {/* Profile Content */}
                <div className="p-6">
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold text-gray-900 mb-1">{member.name}</h3>
                    <p className="text-lg text-green-600 font-semibold mb-3">{member.position}</p>
                    
                    <div className="flex items-center justify-center text-sm text-gray-600 mb-4">
                      <Briefcase className="w-4 h-4 mr-1" />
                      {member.experience} experience
                    </div>
                  </div>

                  <p className="text-gray-700 leading-relaxed mb-6">{member.bio}</p>

                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-gray-900 mb-2">Education</h4>
                    <p className="text-sm text-gray-600">{member.education}</p>
                  </div>

                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-gray-900 mb-2">Expertise</h4>
                    <div className="flex flex-wrap gap-2">
                      {member.expertise.map((skill, i) => (
                        <span
                          key={i}
                          className="px-2 py-1 bg-green-50 text-green-700 text-xs rounded-md"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-gray-900 mb-2">Key Achievements</h4>
                    <ul className="space-y-1">
                      {member.achievements.map((achievement, i) => (
                        <li key={i} className="text-sm text-gray-600 flex items-start">
                          <Award className="w-3 h-3 mt-0.5 mr-2 text-green-600 flex-shrink-0" />
                          {achievement}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Social Links */}
                  <div className="flex justify-center space-x-4 pt-4 border-t border-gray-200">
                    <a
                      href={`mailto:${member.social.email}`}
                      className="p-2 text-gray-400 hover:text-green-600 transition-colors duration-200"
                    >
                      <Mail className="w-5 h-5" />
                    </a>
                    {member.social.linkedin && (
                      <a
                        href={member.social.linkedin}
                        className="p-2 text-gray-400 hover:text-blue-600 transition-colors duration-200"
                      >
                        <Linkedin className="w-5 h-5" />
                      </a>
                    )}
                    {member.social.twitter && (
                      <a
                        href={member.social.twitter}
                        className="p-2 text-gray-400 hover:text-blue-400 transition-colors duration-200"
                      >
                        <Twitter className="w-5 h-5" />
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Staff Team */}
        <div className="bg-gray-50 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Team</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Meet the dedicated professionals who make our programs and initiatives successful.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {staff.map((member, index) => (
                <motion.div
                  key={member.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.05 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow duration-300"
                >
                  {/* Profile Header */}
                  <div className="h-48 bg-gradient-to-br from-blue-400 to-purple-500 relative">
                    <div className="absolute inset-0 bg-black bg-opacity-20"></div>
                    <div className="absolute top-4 right-4">
                      <span className="px-2 py-1 bg-white bg-opacity-90 text-gray-800 text-xs font-medium rounded">
                        {member.department}
                      </span>
                    </div>
                    <div className="absolute bottom-4 left-4 text-white">
                      <Users className="w-6 h-6 opacity-80" />
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="text-center mb-4">
                      <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
                      <p className="text-green-600 font-semibold mb-2">{member.position}</p>
                      <div className="flex items-center justify-center text-sm text-gray-600">
                        <Briefcase className="w-4 h-4 mr-1" />
                        {member.experience} experience
                      </div>
                    </div>

                    <p className="text-gray-700 text-sm leading-relaxed mb-4">{member.bio}</p>

                    <div className="mb-4">
                      <h4 className="text-sm font-semibold text-gray-900 mb-2">Education</h4>
                      <p className="text-xs text-gray-600">{member.education}</p>
                    </div>

                    <div>
                      <h4 className="text-sm font-semibold text-gray-900 mb-2">Expertise</h4>
                      <div className="flex flex-wrap gap-1">
                        {member.expertise.map((skill, i) => (
                          <span
                            key={i}
                            className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-md"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Advisory Board */}
        <div className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Advisory Board</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Distinguished experts and thought leaders who provide strategic guidance and 
                international perspective to our work.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {advisors.map((advisor, index) => (
                <motion.div
                  key={advisor.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow duration-300"
                >
                  {/* Profile Header */}
                  <div className="h-48 bg-gradient-to-br from-purple-400 to-pink-500 relative">
                    <div className="absolute inset-0 bg-black bg-opacity-20"></div>
                    <div className="absolute bottom-4 left-4 text-white">
                      <Award className="w-6 h-6 opacity-80" />
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="text-center mb-4">
                      <h3 className="text-xl font-bold text-gray-900 mb-1">{advisor.name}</h3>
                      <p className="text-purple-600 font-semibold mb-1">{advisor.position}</p>
                      <p className="text-sm text-gray-600">{advisor.organization}</p>
                    </div>

                    <p className="text-gray-700 text-sm leading-relaxed mb-4">{advisor.bio}</p>

                    <div>
                      <h4 className="text-sm font-semibold text-gray-900 mb-2">Advisory Areas</h4>
                      <div className="flex flex-wrap gap-2">
                        {advisor.expertise.map((area, i) => (
                          <span
                            key={i}
                            className="px-2 py-1 bg-purple-50 text-purple-700 text-xs rounded-md"
                          >
                            {area}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Join Our Team */}
        <div className="bg-green-50 py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Join Our Team</h2>
              <p className="text-xl text-gray-600 mb-8">
                Are you passionate about climate innovation and sustainable development? 
                We're always looking for talented individuals to join our mission.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/about/careers"
                  className="inline-flex items-center px-8 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors duration-200"
                >
                  View Open Positions
                </a>
                <a
                  href="mailto:careers@kenyacic.org"
                  className="inline-flex items-center px-8 py-3 bg-white text-green-600 font-semibold rounded-lg border border-green-600 hover:bg-green-50 transition-colors duration-200"
                >
                  <Mail className="w-4 h-4 mr-2" />
                  Send Your CV
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}