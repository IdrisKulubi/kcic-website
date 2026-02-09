"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useAccessibilityClasses } from "@/hooks/use-accessibility-classes";
import { colors, typography } from "@/lib/design-system";

interface ServiceCard {
  title: string;
  tagline: string;
  description: string;
  services: string[];
  accentColor: string;
  gradientFrom: string;
  gradientTo: string;
  number: string;
}

interface HowWeDoItSectionProps {
  className?: string;
}

const services: ServiceCard[] = [
  {
    title: "Innovative Financing",
    tagline: "Fuel Your Growth",
    description: "Diverse financial solutions to support climate entrepreneurs at every stage of their journey",
    services: [
      "Risk capital for early-stage ventures",
      "Proof of concept funding",
      "Revenue-based financing (RBF)",
      "Investment syndication",
    ],
    accentColor: colors.primary.green.DEFAULT,
    gradientFrom: "#059669",
    gradientTo: "#10B981",
    number: "01",
  },
  {
    title: "Capacity Building",
    tagline: "Empower Your Team",
    description: "Knowledge and skills development for sustainable growth and lasting impact",
    services: [
      "Business development training",
      "Technical skills workshops",
      "Advisory & mentorship",
      "Leadership development",
    ],
    accentColor: colors.primary.blue.DEFAULT,
    gradientFrom: "#1D4ED8",
    gradientTo: "#3B82F6",
    number: "02",
  },
  {
    title: "Access to Information",
    tagline: "Stay Informed",
    description: "Critical data and market intelligence to drive strategic decisions",
    services: [
      "Technology trends & data",
      "Market intelligence reports",
      "Industry insights",
      "Best practices library",
    ],
    accentColor: "#8B5CF6",
    gradientFrom: "#7C3AED",
    gradientTo: "#A78BFA",
    number: "03",
  },
  {
    title: "Enabling Environment",
    tagline: "Build Together",
    description: "Supportive ecosystems where climate innovation can truly thrive",
    services: [
      "Policy advocacy & support",
      "Infrastructure access",
      "Partnership facilitation",
      "Regional outreach",
    ],
    accentColor: "#F59E0B",
    gradientFrom: "#D97706",
    gradientTo: "#FBBF24",
    number: "04",
  },
];

/**
 * How We Do It Section
 * Showcases service offerings and support mechanisms
 * Requirements: 1.6, 7.6, 5.4, 9.2, 6.4
 */
export default function HowWeDoIt({
  className = "",
}: HowWeDoItSectionProps) {
  const { shouldDisableAnimations } = useAccessibilityClasses();

  const sectionRef = useRef<HTMLElement | null>(null);
  const introRef = useRef<HTMLParagraphElement | null>(null);
  const headerRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useLayoutEffect(() => {
    if (shouldDisableAnimations()) return;
    if (!sectionRef.current) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Header staggered reveal
      if (headerRef.current) {
        const badge = headerRef.current.querySelector('.hwd-badge');
        const heading = headerRef.current.querySelector('h2');

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: headerRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        });

        if (badge) {
          tl.fromTo(badge,
            { opacity: 0, y: 20, scale: 0.9 },
            { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: 'back.out(1.4)', force3D: true }
          );
        }
        if (heading) {
          tl.fromTo(heading,
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out', force3D: true },
            '-=0.3'
          );
        }
      }

      // Fade-in for intro text
      if (introRef.current) {
        gsap.fromTo(
          introRef.current,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out",
            force3D: true,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 75%",
              end: "top 55%",
              toggleActions: "play none none reverse",
              invalidateOnRefresh: true,
            },
          }
        );
      }

      // Scroll-triggered fade-in-scale for cards with staggered delays (0ms, 100ms, 200ms, 300ms)
      cardRefs.current.forEach((card, index) => {
        if (card) {
          gsap.fromTo(
            card,
            { opacity: 0, scale: 0.95, y: 30 },
            {
              opacity: 1,
              scale: 1,
              y: 0,
              duration: 0.7,
              ease: "power2.out",
              force3D: true,
              delay: index * 0.1, // 100ms stagger
              scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 75%",
                end: "top 55%",
                toggleActions: "play none none reverse",
                invalidateOnRefresh: true,
              },
            }
          );
        }
      });

      ScrollTrigger.refresh();
    }, sectionRef);

    return () => ctx.revert();
  }, [shouldDisableAnimations]);

  return (
    <section
      ref={sectionRef}
      aria-labelledby="how-we-do-it-heading"
      className={`relative py-20 sm:py-28 overflow-hidden ${className}`}
      style={{ background: 'linear-gradient(180deg, #f8fafc 0%, #ffffff 100%)' }}
    >
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-green-500/5 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-blue-500/5 blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Section Header */}
        <div ref={headerRef} className="text-center mb-16 sm:mb-20">
          <div className="hwd-badge inline-flex items-center gap-2 px-4 py-2 bg-green-50 rounded-full mb-6">
            <div className="w-2 h-2 rounded-full bg-green-500" />
            <span className="text-sm font-semibold text-green-700 uppercase tracking-wider">
              Our Approach
            </span>
          </div>
          <h2
            id="how-we-do-it-heading"
            className="font-bold text-gray-900 mb-6"
            style={{
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              fontFamily: typography.fonts.heading,
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
            }}
          >
            How We Do It
          </h2>
          <p
            ref={introRef}
            className="text-gray-600 max-w-2xl mx-auto text-lg sm:text-xl"
            style={{
              fontFamily: typography.fonts.body,
              lineHeight: typography.lineHeights.relaxed,
            }}
          >
            Holistic, country-driven support to accelerate climate technologies and sustainable enterprises
          </p>
        </div>

        {/* Services Grid - Clean Modern Design */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
          {services.map((service, index) => (
            <div
              key={index}
              ref={(el) => {
                cardRefs.current[index] = el;
              }}
              className="group relative"
            >
              {/* Card with gradient border effect */}
              <div 
                className="absolute -inset-[1px] rounded-[28px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"
                style={{ 
                  background: `linear-gradient(135deg, ${service.gradientFrom}, ${service.gradientTo})`,
                }}
              />
              
              <div className="relative bg-white rounded-[28px] p-8 lg:p-10 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.08)] hover:shadow-[0_12px_48px_-8px_rgba(0,0,0,0.12)] transition-all duration-500 border border-gray-100/80 overflow-hidden h-full">
                {/* Top accent bar */}
                <div 
                  className="absolute top-0 left-8 right-8 h-[3px] rounded-b-full transition-all duration-500 group-hover:left-0 group-hover:right-0 group-hover:rounded-none"
                  style={{ 
                    background: `linear-gradient(90deg, ${service.gradientFrom}, ${service.gradientTo})`,
                  }}
                />

                {/* Content */}
                <div className="relative z-10 pt-4">
                  {/* Number and Tagline row */}
                  <div className="flex items-center justify-between mb-6">
                    {/* Large number */}
                    <span 
                      className="text-5xl lg:text-6xl font-black tracking-tighter transition-transform duration-500 group-hover:scale-110"
                      style={{ 
                        fontFamily: typography.fonts.heading,
                        background: `linear-gradient(135deg, ${service.gradientFrom}, ${service.gradientTo})`,
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                      }}
                    >
                      {service.number}
                    </span>

                    {/* Tagline badge */}
                    <span 
                      className="text-xs font-bold uppercase tracking-wider px-4 py-2 rounded-full transition-all duration-300 group-hover:scale-105"
                      style={{ 
                        color: service.accentColor,
                        background: `${service.accentColor}10`,
                      }}
                    >
                      {service.tagline}
                    </span>
                  </div>

                  {/* Title */}
                  <h3
                    className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4"
                    style={{
                      fontFamily: typography.fonts.heading,
                      lineHeight: 1.2,
                    }}
                  >
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p
                    className="text-gray-500 mb-8 text-base lg:text-lg leading-relaxed"
                    style={{
                      fontFamily: typography.fonts.body,
                    }}
                  >
                    {service.description}
                  </p>

                  {/* Divider */}
                  <div className="h-px bg-gray-100 mb-6" />

                  {/* Services list - minimal style */}
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
                    {service.services.map((item, itemIndex) => (
                      <li
                        key={itemIndex}
                        className="flex items-start gap-3 text-gray-600 text-sm lg:text-base group/item"
                      >
                        <span 
                          className="mt-2 w-1.5 h-1.5 rounded-full shrink-0 transition-transform duration-300 group-hover/item:scale-150"
                          style={{ background: service.accentColor }}
                        />
                        <span 
                          className="transition-colors duration-300 group-hover/item:text-gray-900"
                          style={{ fontFamily: typography.fonts.body }}
                        >
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
