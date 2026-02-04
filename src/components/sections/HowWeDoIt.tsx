"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useAccessibilityClasses } from "@/hooks/use-accessibility-classes";
import { colors, typography } from "@/lib/design-system";
import { 
  FaDollarSign, 
  FaGraduationCap, 
  FaDatabase, 
  FaBuilding,
  FaArrowRight 
} from "react-icons/fa6";

interface ServiceCard {
  title: string;
  tagline: string;
  description: string;
  services: string[];
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  accentColor: string;
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
    icon: FaDollarSign,
    accentColor: "#10B981", // emerald
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
    icon: FaGraduationCap,
    accentColor: "#3B82F6", // blue
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
    icon: FaDatabase,
    accentColor: "#8B5CF6", // violet
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
    icon: FaBuilding,
    accentColor: "#F59E0B", // amber
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
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useLayoutEffect(() => {
    if (shouldDisableAnimations()) return;
    if (!sectionRef.current) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
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
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 75%",
              end: "top 55%",
              once: true,
              toggleActions: "play none none none",
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
              delay: index * 0.1, // 100ms stagger
              scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 75%",
                end: "top 55%",
                once: true,
                toggleActions: "play none none none",
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
        <div className="text-center mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 rounded-full mb-6">
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

        {/* Services Grid - Modern Card Design */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              ref={(el) => {
                cardRefs.current[index] = el;
              }}
              className="group relative bg-white rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-100 hover:border-gray-200 overflow-hidden"
            >
              {/* Background number */}
              <div 
                className="absolute -right-4 -top-4 text-[120px] font-bold leading-none pointer-events-none select-none transition-all duration-500 group-hover:scale-110"
                style={{ 
                  color: `${service.accentColor}08`,
                  fontFamily: typography.fonts.heading,
                }}
              >
                {service.number}
              </div>

              {/* Content */}
              <div className="relative z-10">
                {/* Icon with accent background */}
                <div 
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3"
                  style={{ 
                    background: `linear-gradient(135deg, ${service.accentColor}15 0%, ${service.accentColor}25 100%)`,
                  }}
                >
                  <service.icon
                    className="w-7 h-7"
                    style={{ color: service.accentColor }}
                    aria-hidden
                  />
                </div>

                {/* Tagline */}
                <span 
                  className="text-xs font-bold uppercase tracking-wider mb-2 block"
                  style={{ color: service.accentColor }}
                >
                  {service.tagline}
                </span>

                {/* Title */}
                <h3
                  className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 group-hover:text-gray-800 transition-colors"
                  style={{
                    fontFamily: typography.fonts.heading,
                    lineHeight: typography.lineHeights.snug,
                  }}
                >
                  {service.title}
                </h3>

                {/* Description */}
                <p
                  className="text-gray-600 mb-6 text-sm sm:text-base"
                  style={{
                    fontFamily: typography.fonts.body,
                    lineHeight: typography.lineHeights.relaxed,
                  }}
                >
                  {service.description}
                </p>

                {/* Services list with modern styling */}
                <ul className="space-y-3">
                  {service.services.map((item, itemIndex) => (
                    <li
                      key={itemIndex}
                      className="flex items-center gap-3 text-gray-700 text-sm group/item"
                    >
                      <div 
                        className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 group-hover/item:scale-110"
                        style={{ background: `${service.accentColor}15` }}
                      >
                        <FaArrowRight 
                          className="w-2.5 h-2.5" 
                          style={{ color: service.accentColor }}
                        />
                      </div>
                      <span style={{ fontFamily: typography.fonts.body }}>
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Bottom accent line */}
              <div 
                className="absolute bottom-0 left-0 right-0 h-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: `linear-gradient(90deg, ${service.accentColor}, ${service.accentColor}60)` }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
