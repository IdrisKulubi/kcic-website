'use client';

import React, { useState, useRef } from 'react';
import { colors, typography } from '@/lib/design-system';
import { useAccessibilityClasses } from '@/hooks/use-accessibility-classes';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles, Globe2, Users, Award, Building2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import Image from 'next/image';

export interface PartnerData {
  id: string;
  name: string;
  logo: string;
  category?: 'donor' | 'partner' | 'supporter' | 'collaborator';
  description?: string;
  website?: string;
  featured?: boolean;
}

interface PartnersSectionProps {
  partners: PartnerData[];
  title?: string;
  subtitle?: string;
}

export function PartnersSection({ 
  partners, 
  title = "Partners & Donors",
  subtitle = "Collaborating with world-class organizations to accelerate climate innovation"
}: PartnersSectionProps) {
  const { getMotionSafeClasses } = useAccessibilityClasses();
  const [selectedCategory, setSelectedCategory] = useState<'all' | string>('all');
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  // Categorize partners
  const categorizedPartners = partners.reduce((acc, partner) => {
    const category = partner.category || 'supporter';
    if (!acc[category]) acc[category] = [];
    acc[category].push(partner);
    return acc;
  }, {} as Record<string, PartnerData[]>);

  
  // Filter partners by category
  const displayPartners = selectedCategory === 'all' 
    ? partners 
    : categorizedPartners[selectedCategory] || [];

  // Duplicate for infinite scroll
  const scrollPartners = [...partners, ...partners, ...partners];

  const categoryIcons = {
    donor: <Award className="h-4 w-4" />,
    partner: <Users className="h-4 w-4" />,
    supporter: <Globe2 className="h-4 w-4" />,
    collaborator: <Building2 className="h-4 w-4" />
  };

  return (
    <section className="py-20 sm:py-32 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className={getMotionSafeClasses('animate-in fade-in slide-in-from-bottom-8 duration-1000')}>
            <Badge className="mb-4 px-4 py-1.5 bg-gradient-to-r from-green-50 to-cyan-50 text-green-700 border-green-200">
              <Sparkles className="h-3 w-3 mr-1" />
              Trusted by Industry Leaders
            </Badge>
            <h2 
              className="font-bold mb-4"
              style={{
                fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                fontFamily: typography.fonts.heading,
                color: colors.secondary.gray[900],
                lineHeight: typography.lineHeights.tight,
              }}
            >
              {title}
            </h2>
            <p 
              className="text-lg max-w-3xl mx-auto"
              style={{
                fontFamily: typography.fonts.body,
                color: colors.secondary.gray[600],
                lineHeight: typography.lineHeights.relaxed,
              }}
            >
              {subtitle}
            </p>
          </div>
        </div>

      

        {/* Category Tabs */}
        <div className="mb-12">
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="flex flex-wrap justify-center gap-2 bg-transparent h-auto p-0">
              <TabsTrigger 
                value="all"
                onClick={() => setSelectedCategory('all')}
                className="px-6 py-2 rounded-full bg-gray-100 data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-500 data-[state=active]:to-cyan-500 data-[state=active]:text-white"
              >
                All ({partners.length})
              </TabsTrigger>
              {Object.entries(categorizedPartners).map(([category, items]) => (
                <TabsTrigger 
                  key={category}
                  value={category}
                  onClick={() => setSelectedCategory(category)}
                  className="px-6 py-2 rounded-full bg-gray-100 data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-500 data-[state=active]:to-cyan-500 data-[state=active]:text-white"
                >
                  <span className="flex items-center gap-2">
                    {categoryIcons[category as keyof typeof categoryIcons]}
                    {category.charAt(0).toUpperCase() + category.slice(1)}s ({items.length})
                  </span>
                </TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value="all" className="mt-8">
              <PartnerGrid partners={displayPartners} />
            </TabsContent>
            {Object.keys(categorizedPartners).map(category => (
              <TabsContent key={category} value={category} className="mt-8">
                <PartnerGrid partners={categorizedPartners[category]} />
              </TabsContent>
            ))}
          </Tabs>
        </div>

        {/* Infinite Scroll Marquee */}
        <div className="relative mt-20 py-12 border-y border-gray-100">
          <div className="text-center mb-8">
            <p className="text-sm text-gray-500 uppercase tracking-wider">All Partners</p>
          </div>
          
          <div className="relative overflow-hidden">
            <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white to-transparent z-10" />
            <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-white to-transparent z-10" />
            
            <div 
              ref={scrollRef}
              className="flex gap-12"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              <div 
                className={cn(
                  "flex gap-12 animate-scroll",
                  isPaused && "animation-paused"
                )}
                style={{
                  animation: 'scroll 40s linear infinite',
                }}
              >
                {scrollPartners.map((partner, index) => (
                  <div key={`scroll-${index}`} className="flex-shrink-0">
                    <Image
                      src={partner.logo || '/images/placeholder-logo.png'}
                      alt={partner.name}
                      className="h-12 w-auto object-contain opacity-40 hover:opacity-100 transition-opacity duration-300 grayscale hover:grayscale-0"
                      width={100}
                      height={100}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-20">
          <div className="bg-gradient-to-br from-green-50 via-cyan-50 to-green-50 rounded-3xl p-12 text-center">
            <h3 
              className="font-bold mb-4"
              style={{
                fontSize: typography.sizes.heading.h3,
                fontFamily: typography.fonts.heading,
                color: colors.secondary.gray[900],
              }}
            >
              Join Our Network
            </h3>
            <p 
              className="text-lg mb-8 max-w-2xl mx-auto"
              style={{
                fontFamily: typography.fonts.body,
                color: colors.secondary.gray[600],
              }}
            >
              Partner with us to accelerate climate innovation and create lasting impact across Africa.
            </p>
            <Button
              className="px-8 py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105"
              style={{
                background: colors.gradients.primary,
                color: 'white',
                fontFamily: typography.fonts.body,
              }}
              asChild
            >
              <a href="/contact">
                Become a Partner
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.333%);
          }
        }
        .animate-scroll {
          animation: scroll 40s linear infinite;
        }
        .animation-paused {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}

// Partner Grid Component
function PartnerGrid({ partners }: { partners: PartnerData[] }) {
  const { getMotionSafeClasses } = useAccessibilityClasses();
  
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
      {partners.map((partner, index) => (
        <a
          key={partner.id}
          href={partner.website}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            "group relative bg-white rounded-xl p-6 border border-gray-100",
            "hover:border-gray-200 hover:shadow-lg transition-all duration-300",
            "hover:-translate-y-1",
            getMotionSafeClasses(`animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-${index * 50}`)
          )}
        >
          <div className="relative h-16 flex items-center justify-center">
            <Image
              src={partner.logo || '/images/placeholder-logo.png'}
              alt={partner.name}
              className="max-w-full max-h-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300"
              priority
              width={100}
              height={100}
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
        </a>
      ))}
    </div>
  );
}
