"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useAccessibilityClasses } from "@/hooks/use-accessibility-classes";
import { colors, typography } from "@/lib/design-system";
import { Warning, Drop, Plant, Wind } from "@phosphor-icons/react";

interface ClimateChallengeSectionProps {
  className?: string;
}

/**
 * Climate Challenge Section
 * Establishes problem context and urgency using data and emotional appeal
 * Requirements: 1.2, 7.2, 9.4, 6.4
 */
export default function ClimateChallenge({
  className = "",
}: ClimateChallengeSectionProps) {
  const { shouldDisableAnimations } = useAccessibilityClasses();

  const sectionRef = useRef<HTMLElement | null>(null);
  const textContentRef = useRef<HTMLDivElement | null>(null);
  const visualContentRef = useRef<HTMLDivElement | null>(null);
  const statNumberRef = useRef<HTMLSpanElement | null>(null);

  useLayoutEffect(() => {
    if (shouldDisableAnimations()) return;
    if (!sectionRef.current || !textContentRef.current || !visualContentRef.current) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const interactiveCleanup: Array<() => void> = [];

      const bgImageLayer = sectionRef.current?.querySelector('.bg-image-layer');
      if (bgImageLayer) {
        gsap.fromTo(
          bgImageLayer,
          { scale: 1.04, y: 0 },
          {
            scale: 1.1,
            y: -40,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
            },
          }
        );
      }

      // Parallax background gradient
      const bgGradient = sectionRef.current?.querySelector('.bg-gradient');
      if (bgGradient) {
        gsap.to(bgGradient, {
          y: -50,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        });
      }

      // Fade-in-left animation for text content with slight scale
      gsap.fromTo(
        textContentRef.current,
        { opacity: 0, x: -50, scale: 0.98 },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 1,
          ease: "power3.out",
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

      // Staggered animation for icon cards (visual content children)
      const iconCards = visualContentRef.current?.querySelectorAll('.icon-card');
      if (iconCards && iconCards.length > 0) {
        const cardOffsets = [
          { x: -48, y: 32, rotate: -8 },
          { x: 48, y: 22, rotate: 8 },
          { x: -32, y: 40, rotate: -6 },
          { x: 36, y: 26, rotate: 6 },
        ];

        gsap.fromTo(
          iconCards,
          {
            opacity: 0,
            scale: 0.88,
            x: (index) => cardOffsets[index % cardOffsets.length].x,
            y: (index) => cardOffsets[index % cardOffsets.length].y,
            rotate: (index) => cardOffsets[index % cardOffsets.length].rotate,
          },
          {
            opacity: 1,
            y: 0,
            x: 0,
            scale: 1,
            rotate: 0,
            duration: 0.75,
            stagger: 0.12,
            ease: "back.out(1.4)",
            scrollTrigger: {
              trigger: visualContentRef.current,
              start: "top 80%",
              once: true,
              toggleActions: "play none none none",
              invalidateOnRefresh: true,
            },
          }
        );

        iconCards.forEach((card) => {
          const cardElement = card as HTMLElement;
          const iconElement = cardElement.querySelector('.icon-card-icon') as HTMLElement | null;

          const handleMouseMove = (event: MouseEvent) => {
            const bounds = cardElement.getBoundingClientRect();
            const relativeX = (event.clientX - bounds.left) / bounds.width;
            const relativeY = (event.clientY - bounds.top) / bounds.height;

            gsap.to(cardElement, {
              rotateY: (relativeX - 0.5) * 10,
              rotateX: -(relativeY - 0.5) * 8,
              transformPerspective: 700,
              transformOrigin: "center center",
              duration: 0.25,
              ease: "power2.out",
            });

            if (iconElement) {
              gsap.to(iconElement, {
                y: -3,
                scale: 1.04,
                duration: 0.25,
                ease: "power2.out",
              });
            }
          };

          const handleMouseLeave = () => {
            gsap.to(cardElement, {
              rotateY: 0,
              rotateX: 0,
              duration: 0.35,
              ease: "power3.out",
            });
            if (iconElement) {
              gsap.to(iconElement, {
                y: 0,
                scale: 1,
                duration: 0.3,
                ease: "power3.out",
              });
            }
          };

          cardElement.addEventListener('mousemove', handleMouseMove);
          cardElement.addEventListener('mouseleave', handleMouseLeave);

          interactiveCleanup.push(() => {
            cardElement.removeEventListener('mousemove', handleMouseMove);
            cardElement.removeEventListener('mouseleave', handleMouseLeave);
          });
        });
      }

      // Counter-up animation for statistics
      if (statNumberRef.current) {
        const target = 2.6;
        const obj = { value: 0 };
        const statCallout = sectionRef.current?.querySelector('.stat-callout');
        const burstParticles = sectionRef.current?.querySelectorAll('.counter-burst-particle');

        if (burstParticles && burstParticles.length > 0) {
          gsap.set(burstParticles, { opacity: 0, scale: 0, x: 0, y: 0 });
        }

        const counterTimeline = gsap.timeline({
          scrollTrigger: {
            trigger: statNumberRef.current,
            start: "top 85%",
            once: true,
            toggleActions: "play none none none",
            invalidateOnRefresh: true,
          },
        });

        counterTimeline.to(obj, {
          value: target,
          duration: 2,
          ease: "power2.out",
          onStart: () => {
            if (statCallout) {
              gsap.fromTo(
                statCallout,
                { boxShadow: "0 0 0 rgba(128, 199, 56, 0)" },
                {
                  boxShadow: "0 0 30px rgba(128, 199, 56, 0.35)",
                  duration: 0.45,
                  yoyo: true,
                  repeat: 1,
                  ease: "power2.out",
                }
              );
            }

            if (burstParticles && burstParticles.length > 0) {
              burstParticles.forEach((particle, index) => {
                const angle = (Math.PI * 2 * index) / burstParticles.length;
                const distance = 22 + index * 4;
                gsap.fromTo(
                  particle,
                  { opacity: 0.9, scale: 0.2, x: 0, y: 0 },
                  {
                    opacity: 0,
                    scale: 1.1,
                    x: Math.cos(angle) * distance,
                    y: Math.sin(angle) * distance,
                    duration: 0.7,
                    ease: "power2.out",
                    delay: index * 0.02,
                  }
                );
              });
            }
          },
          onUpdate: () => {
            if (statNumberRef.current) {
              statNumberRef.current.textContent = obj.value.toFixed(1);
            }
          },
        });
      }

      // Staggered reveal for impact area list items
      const listItems = textContentRef.current?.querySelectorAll('li');
      if (listItems && listItems.length > 0) {
        gsap.fromTo(
          listItems,
          { opacity: 0, x: -20 },
          {
            opacity: 1,
            x: 0,
            duration: 0.5,
            stagger: 0.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: listItems[0],
              start: "top 90%",
              once: true,
              toggleActions: "play none none none",
            },
          }
        );
      }

      const ambientDots = sectionRef.current?.querySelectorAll('.ambient-dot');
      if (ambientDots && ambientDots.length > 0) {
        ambientDots.forEach((dot, index) => {
          gsap.to(dot, {
            y: index % 2 === 0 ? -12 : 10,
            x: index % 2 === 0 ? 6 : -6,
            duration: 3 + index * 0.4,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
          });
        });
      }

      ScrollTrigger.refresh();

      return () => {
        interactiveCleanup.forEach((cleanup) => cleanup());
      };
    }, sectionRef);

    return () => ctx.revert();
  }, [shouldDisableAnimations]);

  return (
    <section
      ref={sectionRef}
      aria-labelledby="climate-challenge-heading"
      className={`relative overflow-hidden bg-section-green py-12 sm:py-14 text-white ${className}`}
    >
      {/* Environmental image with dark branded overlay */}
      <div
        className="bg-image-layer pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(135deg, rgba(27,58,26,0.92) 0%, rgba(27,58,26,0.84) 45%, rgba(128,199,56,0.22) 100%), url('/images/sectors/nature.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
        aria-hidden
      />

      {/* Subtle background gradient shift */}
      <div
        className="bg-gradient pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(52% 45% at 80% 20%, rgba(128,199,56,0.24) 0%, rgba(128,199,56,0) 70%), radial-gradient(45% 38% at 15% 85%, rgba(0,173,221,0.12) 0%, rgba(0,173,221,0) 70%)",
        }}
        aria-hidden
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[60%_40%] lg:gap-14">
          {/* Left: Text Content */}
          <div ref={textContentRef} className="space-y-7">
            <h2
              id="climate-challenge-heading"
              className="font-bold text-white"
              style={{
                fontSize: "clamp(1.875rem, 5vw, 3rem)",
                fontFamily: typography.fonts.heading,
                lineHeight: typography.lineHeights.tight,
                letterSpacing: "-0.02em",
              }}
            >
              The Climate Challenge
            </h2>

            <div
              className="w-16 h-1 rounded-full"
              style={{ background: colors.primary.green.DEFAULT }}
              aria-hidden
            />

            <p
              className="text-white/85"
              style={{
                fontSize: "clamp(0.95rem, 1.2vw, 1rem)",
                fontFamily: typography.fonts.body,
                lineHeight: typography.lineHeights.relaxed,
              }}
            >
              Climate Change remains one of the world's greatest existential
              threats, with Africa bearing a disproportionate burden despite
              contributing the least to global emissions. Rising temperatures,
              unpredictable weather patterns, and environmental degradation
              threaten livelihoods, economies, and the very fabric of our
              communities.
            </p>

            {/* Key Statistic Callout */}
            <div
              className="stat-callout relative border p-5 sm:p-6"
              style={{
                background: "rgba(255, 255, 255, 0.08)",
                borderColor: "rgba(255, 255, 255, 0.24)",
                backdropFilter: "blur(8px)",
              }}
            >
              <div className="pointer-events-none absolute inset-0" aria-hidden>
                <span className="counter-burst-particle absolute left-1/2 top-1/2 h-1.5 w-1.5 rounded-full bg-[#80c738]/80" />
                <span className="counter-burst-particle absolute left-1/2 top-1/2 h-1.5 w-1.5 rounded-full bg-[#00addd]/80" />
                <span className="counter-burst-particle absolute left-1/2 top-1/2 h-1.5 w-1.5 rounded-full bg-[#80c738]/80" />
                <span className="counter-burst-particle absolute left-1/2 top-1/2 h-1.5 w-1.5 rounded-full bg-[#00addd]/80" />
                <span className="counter-burst-particle absolute left-1/2 top-1/2 h-1.5 w-1.5 rounded-full bg-[#80c738]/80" />
                <span className="counter-burst-particle absolute left-1/2 top-1/2 h-1.5 w-1.5 rounded-full bg-[#00addd]/80" />
              </div>

              <div className="flex items-baseline gap-2 mb-2">
                <span
                  ref={statNumberRef}
                  className="font-bold"
                  style={{
                    fontSize: "clamp(2rem, 5vw, 2.5rem)",
                    fontFamily: typography.fonts.heading,
                    color: colors.primary.green.DEFAULT,
                    lineHeight: 1,
                  }}
                  aria-label="2.6 percent"
                >
                  2.6
                </span>
                <span
                  className="font-bold"
                  style={{
                    fontSize: "clamp(1.5rem, 3vw, 2rem)",
                    fontFamily: typography.fonts.heading,
                    color: colors.primary.green.DEFAULT,
                  }}
                >
                  %
                </span>
              </div>
              <p
                className="text-white/80"
                style={{
                  fontSize: "clamp(0.8125rem, 1vw, 0.875rem)",
                  fontFamily: typography.fonts.body,
                  lineHeight: typography.lineHeights.normal,
                }}
              >
                of Kenya's GDP loss annually by 2030 due to climate impacts
              </p>
            </div>

            {/* Impact Areas */}
            <div className="space-y-4">
              <h3
                className="font-semibold text-white"
                style={{
                  fontSize: "clamp(1.125rem, 2vw, 1.25rem)",
                  fontFamily: typography.fonts.heading,
                }}
              >
                Key Impact Areas:
              </h3>
              <ul className="space-y-3">
                {[
                  { label: "Environmental Degradation", icon: Warning },
                  { label: "Biodiversity Loss", icon: Plant },
                  { label: "Water & Air Pollution", icon: Drop },
                ].map((item, index) => (
                  <li
                    key={index}
                    className="flex items-center gap-3 text-white/80"
                    style={{
                      fontSize: "clamp(0.875rem, 1vw, 0.9375rem)",
                      fontFamily: typography.fonts.body,
                    }}
                  >
                    <div
                      className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center"
                      style={{
                        background: `${colors.primary.green.DEFAULT}22`,
                      }}
                    >
                      <item.icon
                        className="w-4 h-4"
                        style={{ color: colors.primary.green.DEFAULT }}
                        aria-hidden
                      />
                    </div>
                    <span>{item.label}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right: Visual Content - Icon Grid */}
          <div ref={visualContentRef} className="relative">
            <div className="grid grid-cols-2 gap-4 sm:gap-5">
              {[
                {
                  icon: Wind,
                  label: "Climate Action",
                  color: colors.primary.blue.DEFAULT,
                },
                {
                  icon: Plant,
                  label: "Ecosystem Restoration",
                  color: colors.primary.green.DEFAULT,
                },
                {
                  icon: Drop,
                  label: "Water Security",
                  color: colors.primary.blue.DEFAULT,
                },
                {
                  icon: Warning,
                  label: "Risk Mitigation",
                  color: colors.semantic.warning,
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="icon-card relative border p-6 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:shadow-lg"
                  style={{
                    background: "rgba(255, 255, 255, 0.1)",
                    borderColor: "rgba(255, 255, 255, 0.22)",
                  }}
                >
                  <div
                    className="icon-card-icon mx-auto mb-4 flex h-14 w-14 items-center justify-center border"
                    style={{
                      background: `${item.color}15`,
                      borderColor: `${item.color}30`,
                    }}
                  >
                    <item.icon
                      className="w-8 h-8"
                      style={{ color: item.color }}
                      aria-hidden
                    />
                  </div>
                  <p
                    className="text-center text-white/90 font-medium"
                    style={{
                      fontSize: "clamp(0.8125rem, 0.95vw, 0.875rem)",
                      fontFamily: typography.fonts.body,
                      lineHeight: typography.lineHeights.normal,
                    }}
                  >
                    {item.label}
                  </p>
                </div>
              ))}
            </div>

            {/* Decorative element */}
            <div
              className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full opacity-20 blur-3xl"
              style={{
                background: `radial-gradient(circle, ${colors.primary.blue.DEFAULT}, transparent)`,
              }}
              aria-hidden
            />

            {/* Subtle green/cyan particles */}
            <div className="pointer-events-none absolute inset-0" aria-hidden>
              <span className="ambient-dot absolute top-8 right-8 h-2 w-2 rounded-full bg-[#80c738]/70" />
              <span className="ambient-dot absolute top-1/3 right-1/4 h-1.5 w-1.5 rounded-full bg-[#00addd]/70" />
              <span className="ambient-dot absolute bottom-10 right-6 h-2.5 w-2.5 rounded-full bg-[#00addd]/60" />
              <span className="ambient-dot absolute bottom-1/4 left-6 h-1.5 w-1.5 rounded-full bg-[#80c738]/60" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
