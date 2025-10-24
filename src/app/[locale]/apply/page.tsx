import React from 'react';
import { MinimalNavbar } from '@/components/layout/MinimalNavbar';
import { navData } from '@/lib/navigation';
import { Metadata } from 'next';
import { colors, typography } from '@/lib/design-system';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { CheckCircle, Upload, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Apply to KCIC Programs - Start Your Climate Innovation Journey',
  description: 'Apply to Kenya Climate Innovation Centre programs. Join 450+ climate entrepreneurs building sustainable solutions across Africa.',
};

const applicationSteps = [
  {
    step: 1,
    title: 'Basic Information',
    description: 'Tell us about yourself and your organization',
    completed: false,
  },
  {
    step: 2,
    title: 'Climate Solution',
    description: 'Describe your climate innovation or idea',
    completed: false,
  },
  {
    step: 3,
    title: 'Business Model',
    description: 'Explain your business approach and market',
    completed: false,
  },
  {
    step: 4,
    title: 'Impact & Goals',
    description: 'Share your expected environmental and social impact',
    completed: false,
  },
];

const programOptions = [
  'Innovation Incubation (Early-stage)',
  'Scale-Up Acceleration (Growth-stage)',
  'Corporate Partnerships',
  'Climate Awards',
  'Not sure - need guidance',
];

export default function ApplyPage() {
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
            Apply to KCIC Programs
          </h1>
          <p 
            className="text-xl mb-12 max-w-3xl mx-auto"
            style={{
              fontFamily: typography.fonts.body,
              color: colors.secondary.gray[600],
              lineHeight: typography.lineHeights.relaxed,
            }}
          >
            Join 450+ climate entrepreneurs building sustainable solutions across Africa. 
            Start your application today.
          </p>
        </div>
      </section>

      {/* Application Progress */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-4">
            {applicationSteps.map((step, index) => (
              <div key={index} className="text-center">
                <div 
                  className={`w-12 h-12 rounded-full mx-auto mb-3 flex items-center justify-center text-white font-bold ${
                    step.completed ? 'bg-green-500' : index === 0 ? 'bg-blue-500' : 'bg-gray-300'
                  }`}
                >
                  {step.completed ? <CheckCircle className="h-6 w-6" /> : step.step}
                </div>
                <h3 className="font-semibold text-sm mb-1">{step.title}</h3>
                <p className="text-xs text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-white rounded-2xl border border-gray-200 p-8">
            <h2 
              className="font-bold mb-8"
              style={{
                fontSize: typography.sizes.heading.h2,
                fontFamily: typography.fonts.heading,
                color: colors.secondary.gray[900],
              }}
            >
              Step 1: Basic Information
            </h2>
            
            <form className="space-y-8">
              {/* Personal Information */}
              <div>
                <h3 className="font-semibold mb-4 text-gray-800">Personal Information</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold mb-2 text-gray-700">
                      First Name *
                    </label>
                    <Input 
                      placeholder="Your first name"
                      className="rounded-lg"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2 text-gray-700">
                      Last Name *
                    </label>
                    <Input 
                      placeholder="Your last name"
                      className="rounded-lg"
                      required
                    />
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4 mt-4">
                  <div>
                    <label className="block text-sm font-semibold mb-2 text-gray-700">
                      Email Address *
                    </label>
                    <Input 
                      type="email"
                      placeholder="your.email@example.com"
                      className="rounded-lg"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2 text-gray-700">
                      Phone Number *
                    </label>
                    <Input 
                      type="tel"
                      placeholder="+254 700 000 000"
                      className="rounded-lg"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Organization Information */}
              <div>
                <h3 className="font-semibold mb-4 text-gray-800">Organization Information</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold mb-2 text-gray-700">
                      Organization Name
                    </label>
                    <Input 
                      placeholder="Your organization or startup name"
                      className="rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2 text-gray-700">
                      Your Role
                    </label>
                    <Input 
                      placeholder="e.g., Founder, CEO, CTO"
                      className="rounded-lg"
                    />
                  </div>
                </div>
                
                <div className="mt-4">
                  <label className="block text-sm font-semibold mb-2 text-gray-700">
                    Organization Stage
                  </label>
                  <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent">
                    <option>Select your current stage</option>
                    <option>Idea Stage</option>
                    <option>Prototype Development</option>
                    <option>Early Revenue</option>
                    <option>Growth Stage</option>
                    <option>Established Business</option>
                  </select>
                </div>
              </div>

              {/* Program Interest */}
              <div>
                <h3 className="font-semibold mb-4 text-gray-800">Program Interest</h3>
                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-700">
                    Which program are you interested in? *
                  </label>
                  <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent">
                    <option>Select a program</option>
                    {programOptions.map((program, index) => (
                      <option key={index}>{program}</option>
                    ))}
                  </select>
                </div>
                
                <div className="mt-4">
                  <label className="block text-sm font-semibold mb-2 text-gray-700">
                    How did you hear about KCIC?
                  </label>
                  <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent">
                    <option>Select an option</option>
                    <option>Website</option>
                    <option>Social Media</option>
                    <option>Partner Organization</option>
                    <option>Event/Conference</option>
                    <option>Referral</option>
                    <option>Media/Press</option>
                    <option>Other</option>
                  </select>
                </div>
              </div>

              {/* Climate Solution Overview */}
              <div>
                <h3 className="font-semibold mb-4 text-gray-800">Climate Solution Overview</h3>
                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-700">
                    Briefly describe your climate solution or innovation *
                  </label>
                  <Textarea 
                    placeholder="Provide a brief overview of your climate solution, the problem it solves, and how it works..."
                    rows={4}
                    className="rounded-lg"
                    required
                  />
                </div>
                
                <div className="mt-4">
                  <label className="block text-sm font-semibold mb-2 text-gray-700">
                    Climate Sector
                  </label>
                  <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent">
                    <option>Select your sector</option>
                    <option>Renewable Energy</option>
                    <option>Energy Efficiency</option>
                    <option>Climate-Smart Agriculture</option>
                    <option>Water & Sanitation</option>
                    <option>Waste Management</option>
                    <option>Green Transportation</option>
                    <option>Carbon Management</option>
                    <option>Climate Adaptation</option>
                    <option>Green Finance</option>
                    <option>Other</option>
                  </select>
                </div>
              </div>

              {/* Document Upload */}
              <div>
                <h3 className="font-semibold mb-4 text-gray-800">Supporting Documents (Optional)</h3>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                  <Upload className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                  <p className="text-gray-600 mb-2">
                    Upload business plan, pitch deck, or other relevant documents
                  </p>
                  <p className="text-sm text-gray-500 mb-4">
                    PDF, DOC, PPT files up to 10MB each
                  </p>
                  <Button
                    type="button"
                    variant="outline"
                    className="rounded-lg"
                  >
                    Choose Files
                  </Button>
                </div>
              </div>

              {/* Form Actions */}
              <div className="flex flex-col sm:flex-row gap-4 pt-8">
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1 py-3 rounded-lg font-semibold"
                  style={{
                    borderColor: colors.secondary.gray[300],
                    color: colors.secondary.gray[700],
                  }}
                >
                  Save as Draft
                </Button>
                
                <Button
                  type="submit"
                  className="flex-1 py-3 rounded-lg font-semibold"
                  style={{
                    background: colors.gradients.primary,
                    color: 'white',
                    fontFamily: typography.fonts.body,
                    border: 'none',
                  }}
                >
                  <span className="flex items-center justify-center space-x-2">
                    <span>Continue to Step 2</span>
                    <ArrowRight className="h-5 w-5" />
                  </span>
                </Button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Support Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 
            className="font-bold mb-6"
            style={{
              fontSize: typography.sizes.heading.h3,
              fontFamily: typography.fonts.heading,
              color: colors.secondary.gray[900],
            }}
          >
            Need Help with Your Application?
          </h2>
          <p 
            className="text-lg mb-8"
            style={{
              fontFamily: typography.fonts.body,
              color: colors.secondary.gray[600],
              lineHeight: typography.lineHeights.relaxed,
            }}
          >
            Our team is here to support you through the application process.
          </p>
          
          <div className="grid md:grid-cols-2 gap-6">
            <Button
              variant="outline"
              className="py-3 rounded-lg font-semibold"
              style={{
                borderColor: colors.primary.green.DEFAULT,
                color: colors.primary.green.DEFAULT,
              }}
              asChild
            >
              <Link href="/contact">
                Contact Support
              </Link>
            </Button>
            
            <Button
              variant="outline"
              className="py-3 rounded-lg font-semibold"
              style={{
                borderColor: colors.primary.cyan.DEFAULT,
                color: colors.primary.cyan.DEFAULT,
              }}
              asChild
            >
              <Link href="/programs">
                Learn About Programs
              </Link>
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