"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollReveal } from "@/components/animations";
import { homePageData } from "@/data/home";
import { ANIMATION_CONFIG, staggerContainer } from "@/lib/animations";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react";
import {
  touchTargetUtils,
  colorUtils,
  motionUtils,
  ARIA_LABELS
} from '@/lib/accessibility';

interface Programme {
  id: string;
  title: string;
  description: string;
  image: string;
  href: string;
  color: string;
}

interface ProgrammesSectionProps {
  programmes?: Programme[];
}

/**
 * ProgrammesSection component with creative staggered layout
 * Features hover tilt effects, colored shadows, and smooth entrance animations
 */
export default function ProgrammesSection({ programmes: programmesProp }: ProgrammesSectionProps = {}) {
  // Use provided programmes or fallback to static data
  const programmes = programmesProp || homePageData.programmes;

  // Custom animation variants for programme cards
  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 60,
      scale: 0.9,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: ANIMATION_CONFIG.duration.normal,
        ease: ANIMATION_CONFIG.easing.smooth,
      },
    },
  };

  // Get color classes for each programme
  const getColorClasses = (color: string) => {
    switch (color) {
      case "climate-green":
        return {
          shadow: "hover:shadow-[0_20px_40px_rgba(16,185,129,0.3)]",
          border: "hover:border-[var(--climate-green)]",
          gradient: "from-[var(--climate-green)]/10 to-transparent",
        };
      case "climate-blue":
        return {
          shadow: "hover:shadow-[0_20px_40px_rgba(14,165,233,0.3)]",
          border: "hover:border-[var(--climate-blue)]",
          gradient: "from-[var(--climate-blue)]/10 to-transparent",
        };
      case "climate-yellow":
        return {
          shadow: "hover:shadow-[0_20px_40px_rgba(245,158,11,0.3)]",
          border: "hover:border-[var(--climate-yellow)]",
          gradient: "from-[var(--climate-yellow)]/10 to-transparent",
        };
      default:
        return {
          shadow: "hover:shadow-xl",
          border: "hover:border-primary",
          gradient: "from-primary/10 to-transparent",
        };
    }
  };

  return (
    <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-background via-muted/30 to-background">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <ScrollReveal direction="up" className="text-center mb-12 sm:mb-16">
          <h2
            id="programmes-heading"
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 text-gradient-climate"
          >
            Our Programmes
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed px-4 sm:px-0">
            Discover our innovative programmes designed to accelerate climate solutions
            and empower sustainable entrepreneurship across Kenya.
          </p>
        </ScrollReveal>

        {/* Programmes Grid - Staggered Non-uniform Layout */}
        <motion.div
          variants={motionUtils.prefersReducedMotion() ? {} : staggerContainer}
          initial={motionUtils.prefersReducedMotion() ? {} : "hidden"}
          whileInView={motionUtils.prefersReducedMotion() ? {} : "visible"}
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-6"
          role="list"
          aria-label="KCIC programmes"
        >
          {programmes.map((programme, index) => {
            const colorClasses = getColorClasses(programme.color);

            // Create staggered, non-uniform grid layout
            const getGridClasses = (index: number) => {
              switch (index) {
                case 0: // KCIC - Large card, spans full width on mobile/tablet
                  return "md:col-span-2 lg:col-span-7 lg:row-span-2";
                case 1: // Agribiz - Medium card, top right
                  return "lg:col-span-5 lg:row-span-1";
                case 2: // KCV - Medium card, bottom right
                  return "lg:col-span-5 lg:row-span-1 lg:col-start-8";
                default:
                  return "lg:col-span-4";
              }
            };

            return (
              <motion.article
                key={programme.id}
                variants={motionUtils.prefersReducedMotion() ? {} : cardVariants}
                className={`group ${getGridClasses(index)}`}
                style={{
                  // Add staggered delay based on index
                  transitionDelay: `${index * 150}ms`,
                }}
                role="listitem"
              >
                <Card
                  className={`
                    h-full overflow-hidden border-2 border-transparent
                    transition-all duration-500 ease-out
                    hover-tilt cursor-pointer
                    ${colorClasses.shadow}
                    ${colorClasses.border}
                    ${!motionUtils.prefersReducedMotion() && 'hover:scale-[1.02]'}
                    bg-gradient-to-br ${colorClasses.gradient}
                    backdrop-blur-sm
                    ${colorUtils.getFocusRingClasses()}
                  `}
                  tabIndex={0}
                  role="article"
                  aria-labelledby={`programme-${programme.id}-title`}
                  aria-describedby={`programme-${programme.id}-description`}
                >
                  <CardContent className="p-0 h-full flex flex-col">
                    {/* Programme Image */}
                    <div className="relative overflow-hidden h-40 sm:h-48 lg:h-64">
                      <Image
                        src={programme.image}
                        alt={`${programme.title} programme illustration`}
                        fill
                        className={`object-cover transition-transform duration-700 ${!motionUtils.prefersReducedMotion() && 'group-hover:scale-110'}`}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                      {/* Gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" aria-hidden="true" />

                      {/* Programme badge */}
                      <div className="absolute top-4 left-4">
                        <div
                          className={`
                            px-3 py-1 rounded-full text-xs font-semibold
                            bg-white/20 backdrop-blur-sm border border-white/30
                            text-white
                          `}
                          aria-label="Programme category"
                        >
                          Programme
                        </div>
                      </div>
                    </div>

                    {/* Programme Content */}
                    <div className="p-4 sm:p-6 lg:p-8 flex-1 flex flex-col justify-between">
                      <div>
                        <h3
                          id={`programme-${programme.id}-title`}
                          className="text-xl sm:text-2xl lg:text-3xl font-bold mb-3 sm:mb-4 group-hover:text-primary transition-colors duration-300"
                        >
                          {programme.title}
                        </h3>
                        <p
                          id={`programme-${programme.id}-description`}
                          className="text-muted-foreground leading-relaxed mb-4 sm:mb-6 text-sm sm:text-base lg:text-lg"
                        >
                          {programme.description}
                        </p>
                      </div>

                      {/* CTA Button */}
                      <Link
                        href={programme.href}
                        className="self-start"
                        aria-label={`${ARIA_LABELS.learnMore} ${programme.title} programme`}
                      >
                        <Button
                          variant="outline"
                          className={`
                            group/btn border-2 hover:border-current
                            transition-all duration-300
                            hover:bg-gradient-to-r hover:from-primary/10 hover:to-transparent
                            w-full sm:w-auto
                            ${touchTargetUtils.getTouchClasses()}
                            ${colorUtils.getFocusRingClasses()}
                          `}
                        >
                          Learn More
                          <ArrowRight
                            className={`ml-2 h-4 w-4 transition-transform duration-300 ${!motionUtils.prefersReducedMotion() && 'group-hover/btn:translate-x-1'}`}
                            aria-hidden="true"
                          />
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </motion.article>
            );
          })}
        </motion.div>

        {/* Bottom CTA */}
        <ScrollReveal direction="up" delay={0.6} className="text-center mt-12 sm:mt-16">
          <p className="text-muted-foreground mb-4 sm:mb-6 text-base sm:text-lg px-4 sm:px-0">
            Ready to join one of our programmes?
          </p>
          <Link
            href="/programs"
            aria-label="Apply now to join KCIC programmes"
          >
            <Button
              size="lg"
              className={`
                bg-hero-gradient hover:opacity-90 transition-opacity duration-300 
                text-white font-semibold px-6 sm:px-8 py-3 
                w-full sm:w-auto max-w-xs sm:max-w-none
                ${touchTargetUtils.getTouchClasses()}
                ${colorUtils.getFocusRingClasses()}
              `}
            >
              Apply Now
              <ArrowRight
                className="ml-2 h-5 w-5"
                aria-hidden="true"
              />
            </Button>
          </Link>
        </ScrollReveal>
      </div>
    </section>
  );
}