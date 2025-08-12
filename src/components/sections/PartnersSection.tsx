'use client';

import { useState } from 'react';
import Image from 'next/image';
import { PartnerData } from '@/data/home';
import { ScrollReveal } from '@/components/animations';
import { 
  touchTargetUtils, 
  colorUtils, 
  motionUtils
} from '@/lib/accessibility';

interface PartnersSectionProps {
  partners: PartnerData[];
}

export function PartnersSection({ partners }: PartnersSectionProps) {
  const [hoveredPartner, setHoveredPartner] = useState<string | null>(null);

  // Duplicate partners array for seamless infinite scroll
  const duplicatedPartners = [...partners, ...partners];

  return (
    <section className="py-16 sm:py-20 bg-gradient-to-br from-muted/30 to-background overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-12 sm:mb-16">
            <h2 
              id="partners-heading"
              className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-gradient-climate"
            >
              Our Partners
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto px-4 sm:px-0">
              Working together with leading organizations to drive climate innovation across Kenya and beyond
            </p>
          </div>
        </ScrollReveal>

        {/* Partners Marquee Container */}
        <div className="relative" role="region" aria-label="Partner organizations">
          {/* Gradient overlays for smooth fade effect */}
          <div className="absolute left-0 top-0 w-16 sm:w-32 h-full bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" aria-hidden="true" />
          <div className="absolute right-0 top-0 w-16 sm:w-32 h-full bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" aria-hidden="true" />
          
          {/* Marquee wrapper */}
          <div className="flex overflow-hidden">
            <div 
              className={`flex ${!motionUtils.prefersReducedMotion() ? 'animate-marquee hover:pause-animation' : ''}`}
              role="list"
              aria-label="Partner organization logos"
            >
              {duplicatedPartners.map((partner, index) => (
                <div
                  key={`${partner.id}-${index}`}
                  className="flex-shrink-0 mx-4 sm:mx-8 relative group"
                  onMouseEnter={() => setHoveredPartner(partner.id)}
                  onMouseLeave={() => setHoveredPartner(null)}
                  role="listitem"
                >
                  {/* Partner Logo */}
                  <div 
                    className={`w-24 h-16 sm:w-32 sm:h-20 md:w-40 md:h-24 relative flex items-center justify-center bg-white/80 dark:bg-gray-800/80 rounded-lg shadow-md transition-all duration-300 group-hover:shadow-xl ${!motionUtils.prefersReducedMotion() && 'group-hover:scale-105'} ${colorUtils.getFocusRingClasses()}`}
                    tabIndex={0}
                    role="img"
                    aria-label={`${partner.name} - Partner organization`}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        if (partner.website) {
                          window.open(partner.website, '_blank', 'noopener,noreferrer');
                        }
                      }
                    }}
                  >
                    <Image
                      src={partner.logo}
                      alt=""
                      fill
                      className={`object-contain p-4 filter grayscale group-hover:grayscale-0 transition-all duration-300`}
                      sizes="(max-width: 640px) 96px, (max-width: 768px) 128px, 160px"
                    />
                  </div>

                  {/* Hover Tooltip */}
                  {hoveredPartner === partner.id && (
                    <div 
                      className="absolute -top-12 left-1/2 transform -translate-x-1/2 z-20"
                      role="tooltip"
                      aria-live="polite"
                    >
                      <div className="bg-foreground text-background px-3 py-2 rounded-md text-sm font-medium whitespace-nowrap shadow-lg">
                        {partner.name}
                        <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-foreground" aria-hidden="true" />
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <ScrollReveal delay={0.2}>
          <div className="text-center mt-12 sm:mt-16">
            <p className="text-muted-foreground mb-4 sm:mb-6 px-4 sm:px-0">
              Interested in partnering with us?
            </p>
            <a
              href="/partnerships"
              className={`inline-flex items-center px-6 py-3 bg-climate-green hover:bg-climate-green-dark text-white font-medium rounded-lg transition-colors duration-300 text-sm sm:text-base ${touchTargetUtils.getTouchClasses()} ${colorUtils.getFocusRingClasses()}`}
              aria-label="Become a partner with KCIC - Learn about partnership opportunities"
            >
              Become a Partner
              <svg
                className="ml-2 w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}