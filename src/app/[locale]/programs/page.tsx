import React from 'react';
import { MinimalNavbar } from '@/components/layout/MinimalNavbar';
import { navData } from '@/lib/navigation';
import { Metadata } from 'next';
import { colors, typography } from '@/lib/design-system';
import { Button } from '@/components/ui/button';
import { ArrowRight, Lightbulb, TrendingUp, Handshake, Award } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Programs - KCIC Climate Innovation Support',
  description: 'Discover KCIC\'s comprehensive programs supporting climate entrepreneurs from ideation to scale-up across Kenya and Africa.',
};

const programs = [
  {
    icon: Lightbulb,
    title: 'Innovation Incubation',
    description: 'Early-stage support for climate entrepreneurs with innovative ideas and solutions.',
    features: [
      'Seed funding up to $50K',
      'Technical mentorship',
      'Market validation support',
      'Prototype development'
    ],
    duration: '6 months',
    color: colors.primary.green.DEFAULT,
  },
  {
    icon: TrendingUp,
    title: 'Scale-Up Acceleration',
    description: 'Growth-stage support for proven climate solutions ready to scale across markets.',
    features: [
      'Growth funding up to $500K',
      'Market expansion support',
      'Strategic partnerships',
      'International market access'
    ],
    duration: '12 months',
    color: colors.primary.cyan.DEFAULT,
  },
  {
    icon: Handshake,
    title: 'Corporate Partnerships',
    description: 'Connecting climate innovations with corporate partners for pilot projects and procurement.',
    features: [
      'Corporate pilot programs',
      'Procurement opportunities',
      'Technology validation',
      'Market deployment'
    ],
    duration: 'Ongoing',
    color: colors.primary.green.DEFAULT,
  },
  {
    icon: Award,
    title: 'Climate Awards',
    description: 'Annual recognition and funding for outstanding climate innovations across Africa.',
    features: [
      'Prize funding up to $100K',
      'Regional recognition',
      'Media exposure',
      'Investor connections'
    ],
    duration: 'Annual',
    color: colors.primary.cyan.DEFAULT,
  },
];

export default function ProgramsPage() {
  return (
    <div className="min-h-screen bg-white">
      <MinimalNavbar {...navData} />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 
            className="font-bold mb-8"
            style={{
              fontSize: 'clamp(2.5rem, 8vw, 5rem)',
              fontFamily: typography.fonts.heading,
              color: colors.secondary.gray[900],
              lineHeight: typography.lineHeights.tight,
            }}
          >
            Programs That Drive Impact
          </h1>
          <p 
            className="text-xl mb-12 max-w-3xl mx-auto"
            style={{
              fontFamily: typography.fonts.body,
              color: colors.secondary.gray[600],
              lineHeight: typography.lineHeights.relaxed,
            }}
          >
            Comprehensive support for climate entrepreneurs at every stage of their journey, 
            from innovative ideas to market-ready solutions.
          </p>
        </div>
      </section>

      {/* Programs Grid */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {programs.map((program, index) => {
              const IconComponent = program.icon;
              return (
                <div key={index} className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-shadow">
                  <div className="mb-6">
                    <IconComponent className="h-12 w-12" style={{ color: program.color }} />
                  </div>
                  
                  <h3 
                    className="font-bold mb-4"
                    style={{
                      fontSize: typography.sizes.heading.h3,
                      fontFamily: typography.fonts.heading,
                      color: colors.secondary.gray[900],
                    }}
                  >
                    {program.title}
                  </h3>
                  
                  <p 
                    className="mb-6"
                    style={{
                      fontFamily: typography.fonts.body,
                      color: colors.secondary.gray[600],
                      lineHeight: typography.lineHeights.relaxed,
                    }}
                  >
                    {program.description}
                  </p>
                  
                  <div className="mb-6">
                    <h4 className="font-semibold mb-3 text-gray-800">Program Features:</h4>
                    <ul className="space-y-2">
                      {program.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center space-x-2">
                          <div 
                            className="w-2 h-2 rounded-full"
                            style={{ backgroundColor: program.color }}
                          />
                          <span 
                            className="text-sm"
                            style={{
                              fontFamily: typography.fonts.body,
                              color: colors.secondary.gray[700],
                            }}
                          >
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span 
                      className="text-sm font-semibold"
                      style={{ color: program.color }}
                    >
                      Duration: {program.duration}
                    </span>
                    <Button
                      variant="outline"
                      className="rounded-full"
                      style={{
                        borderColor: program.color,
                        color: program.color,
                      }}
                    >
                      Learn More
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Application Process */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 
            className="font-bold mb-12"
            style={{
              fontSize: typography.sizes.heading.h2,
              fontFamily: typography.fonts.heading,
              color: colors.secondary.gray[900],
            }}
          >
            Ready to Join Our Programs?
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div>
              <div 
                className="w-12 h-12 rounded-full mx-auto mb-4 flex items-center justify-center text-white font-bold"
                style={{ backgroundColor: colors.primary.green.DEFAULT }}
              >
                1
              </div>
              <h3 className="font-semibold mb-2">Apply Online</h3>
              <p className="text-gray-600 text-sm">Submit your application with your climate solution details</p>
            </div>
            
            <div>
              <div 
                className="w-12 h-12 rounded-full mx-auto mb-4 flex items-center justify-center text-white font-bold"
                style={{ backgroundColor: colors.primary.cyan.DEFAULT }}
              >
                2
              </div>
              <h3 className="font-semibold mb-2">Review Process</h3>
              <p className="text-gray-600 text-sm">Our experts evaluate your innovation and market potential</p>
            </div>
            
            <div>
              <div 
                className="w-12 h-12 rounded-full mx-auto mb-4 flex items-center justify-center text-white font-bold"
                style={{ backgroundColor: colors.primary.green.DEFAULT }}
              >
                3
              </div>
              <h3 className="font-semibold mb-2">Start Your Journey</h3>
              <p className="text-gray-600 text-sm">Begin your program with dedicated support and resources</p>
            </div>
          </div>
          
          <Button
            className="px-8 py-4 rounded-full font-semibold"
            style={{
              background: colors.gradients.primary,
              color: 'white',
              fontFamily: typography.fonts.body,
              border: 'none',
            }}
            asChild
          >
            <a href="/apply" className="flex items-center space-x-2">
              <span>Start Your Application</span>
              <ArrowRight className="h-5 w-5" />
            </a>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-gray-600 text-sm">
              © 2024 Kenya Climate Innovation Centre. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}