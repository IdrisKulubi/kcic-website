import React from 'react';
import { MinimalNavbar } from '@/components/layout/MinimalNavbar';
import { Metadata } from 'next';
import { colors, typography } from '@/lib/design-system';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Contact KCIC - Get in Touch with Our Team',
  description: 'Contact Kenya Climate Innovation Centre. Reach out to learn about our programs, partnerships, or climate innovation opportunities.',
};

const navData = {
  logo: {
    src: '/images/kcic-logo.png',
    alt: 'KCIC Logo',
  },
  navigation: [
    { label: 'About', href: '/about' },
    { label: 'Programs', href: '/programs' },
    { label: 'Impact', href: '/impact' },
    { label: 'Contact', href: '/contact' },
  ],
  ctaButton: {
    text: 'Apply Now',
    href: '/apply',
  },
};

const contactInfo = [
  {
    icon: MapPin,
    title: 'Visit Us',
    details: [
      'Kenya Climate Innovation Centre',
      'Strathmore University Campus',
      'Ole Sangale Road, Madaraka',
      'Nairobi, Kenya'
    ],
    color: colors.primary.green.DEFAULT,
  },
  {
    icon: Phone,
    title: 'Call Us',
    details: [
      '+254 703 034 000',
      '+254 703 034 001',
      'Mon - Fri: 8:00 AM - 5:00 PM',
      'EAT (UTC+3)'
    ],
    color: colors.primary.cyan.DEFAULT,
  },
  {
    icon: Mail,
    title: 'Email Us',
    details: [
      'info@kenyacic.org',
      'programs@kenyacic.org',
      'partnerships@kenyacic.org',
      'media@kenyacic.org'
    ],
    color: colors.primary.green.DEFAULT,
  },
  {
    icon: Clock,
    title: 'Office Hours',
    details: [
      'Monday - Friday',
      '8:00 AM - 5:00 PM',
      'East Africa Time (EAT)',
      'UTC+3'
    ],
    color: colors.primary.cyan.DEFAULT,
  },
];

export default function ContactPage() {
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
            Get in Touch
          </h1>
          <p 
            className="text-xl mb-12 max-w-3xl mx-auto"
            style={{
              fontFamily: typography.fonts.body,
              color: colors.secondary.gray[600],
              lineHeight: typography.lineHeights.relaxed,
            }}
          >
            Ready to join Kenya&apos;s climate innovation ecosystem? 
            We&apos;re here to help you take the next step.
          </p>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <div className="bg-white rounded-2xl p-8 shadow-sm">
              <h2 
                className="font-bold mb-8"
                style={{
                  fontSize: typography.sizes.heading.h3,
                  fontFamily: typography.fonts.heading,
                  color: colors.secondary.gray[900],
                }}
              >
                Send Us a Message
              </h2>
              
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold mb-2 text-gray-700">
                      First Name
                    </label>
                    <Input 
                      placeholder="Your first name"
                      className="rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2 text-gray-700">
                      Last Name
                    </label>
                    <Input 
                      placeholder="Your last name"
                      className="rounded-lg"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-700">
                    Email Address
                  </label>
                  <Input 
                    type="email"
                    placeholder="your.email@example.com"
                    className="rounded-lg"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-700">
                    Organization
                  </label>
                  <Input 
                    placeholder="Your organization (optional)"
                    className="rounded-lg"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-700">
                    Subject
                  </label>
                  <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent">
                    <option>General Inquiry</option>
                    <option>Program Application</option>
                    <option>Partnership Opportunity</option>
                    <option>Media & Press</option>
                    <option>Technical Support</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-700">
                    Message
                  </label>
                  <Textarea 
                    placeholder="Tell us about your climate innovation or how we can help..."
                    rows={6}
                    className="rounded-lg"
                  />
                </div>
                
                <Button
                  type="submit"
                  className="w-full py-4 rounded-lg font-semibold"
                  style={{
                    background: colors.gradients.primary,
                    color: 'white',
                    fontFamily: typography.fonts.body,
                    border: 'none',
                  }}
                >
                  Send Message
                </Button>
              </form>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              {contactInfo.map((info, index) => {
                const IconComponent = info.icon;
                return (
                  <div key={index} className="bg-white rounded-2xl p-6 shadow-sm">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <IconComponent className="h-6 w-6" style={{ color: info.color }} />
                      </div>
                      <div>
                        <h3 
                          className="font-bold mb-3"
                          style={{
                            fontSize: typography.sizes.heading.h4,
                            fontFamily: typography.fonts.heading,
                            color: colors.secondary.gray[900],
                          }}
                        >
                          {info.title}
                        </h3>
                        <div className="space-y-1">
                          {info.details.map((detail, detailIndex) => (
                            <p 
                              key={detailIndex}
                              style={{
                                fontFamily: typography.fonts.body,
                                color: colors.secondary.gray[600],
                                fontSize: typography.sizes.body.sm,
                              }}
                            >
                              {detail}
                            </p>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <h2 
            className="text-center font-bold mb-12"
            style={{
              fontSize: typography.sizes.heading.h2,
              fontFamily: typography.fonts.heading,
              color: colors.secondary.gray[900],
            }}
          >
            Find Us in Nairobi
          </h2>
          
          {/* Placeholder for map - you would integrate with Google Maps or similar */}
          <div className="bg-gray-200 rounded-2xl h-96 flex items-center justify-center">
            <div className="text-center">
              <MapPin className="h-12 w-12 mx-auto mb-4" style={{ color: colors.primary.green.DEFAULT }} />
              <p 
                className="font-semibold"
                style={{
                  fontFamily: typography.fonts.body,
                  color: colors.secondary.gray[700],
                }}
              >
                Interactive Map Coming Soon
              </p>
              <p 
                className="text-sm mt-2"
                style={{
                  fontFamily: typography.fonts.body,
                  color: colors.secondary.gray[600],
                }}
              >
                Strathmore University Campus, Ole Sangale Road, Nairobi
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 
            className="font-bold mb-8"
            style={{
              fontSize: typography.sizes.heading.h2,
              fontFamily: typography.fonts.heading,
              color: colors.secondary.gray[900],
            }}
          >
            Ready to Start Your Climate Journey?
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <Button
              className="py-4 rounded-lg font-semibold"
              style={{
                background: colors.gradients.primary,
                color: 'white',
                fontFamily: typography.fonts.body,
                border: 'none',
              }}
              asChild
            >
              <a href="/programs">
                Explore Our Programs
              </a>
            </Button>
            
            <Button
              variant="outline"
              className="py-4 rounded-lg font-semibold"
              style={{
                borderColor: colors.primary.green.DEFAULT,
                color: colors.primary.green.DEFAULT,
                fontFamily: typography.fonts.body,
              }}
              asChild
            >
              <a href="/apply">
                Apply Now
              </a>
            </Button>
          </div>
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