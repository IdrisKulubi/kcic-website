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
            ease: "power4.out",
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
      className={`relative isolate overflow-hidden border-y-[5px] border-[#101010] bg-[#fff7df] py-12 text-[#101010] sm:py-14 ${className}`}
    >
      

      <div
        className="bg-image-layer pointer-events-none absolute inset-y-0 right-0 hidden w-[46%] opacity-20 lg:block"
        style={{
          backgroundImage: "url('/images/sectors/nature.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
        aria-hidden
      />
      <div
        className="bg-gradient pointer-events-none absolute left-0 top-0 h-full w-full"
        style={{
          background: "linear-gradient(90deg, rgba(255,247,223,0) 0%, rgba(128,199,56,0.18) 100%)",
        }}
        aria-hidden
      />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
          <div ref={textContentRef}>
            <div className="mb-7 grid gap-5 border-b-[3px] border-[#101010] pb-6 lg:grid-cols-[0.8fr_1fr]">
              <div>
                <p className="mb-3 inline-flex border-2 border-[#101010] bg-[#80c738] px-3 py-1 text-xs font-black uppercase tracking-[0.18em] text-[#101010] shadow-[3px_3px_0_#101010]">
                  Climate brief
                </p>
                <h2
                  id="climate-challenge-heading"
                  className="max-w-[9ch] text-5xl font-black leading-[0.92] text-[#101010] sm:text-6xl"
                  style={{ fontFamily: typography.fonts.heading }}
                >
                  The Climate Challenge
                </h2>
              </div>

              <p
                className="text-base font-black leading-7 text-[#101010] sm:text-lg"
                style={{ fontFamily: typography.fonts.body }}
              >
                Africa bears a disproportionate burden despite contributing the least to global emissions. Rising
                temperatures, unpredictable weather patterns, and environmental degradation threaten livelihoods,
                economies, and communities.
              </p>
            </div>

            <div className="grid gap-5 md:grid-cols-[0.85fr_1fr]">
              <div className="stat-callout relative border-[3px] border-[#101010] bg-[#101010] p-5 text-[#fff7df] shadow-[6px_6px_0_#80c738] sm:p-6">
              <div className="pointer-events-none absolute inset-0" aria-hidden>
                <span className="counter-burst-particle absolute left-1/2 top-1/2 h-1.5 w-1.5 rounded-full bg-[#80c738]/80" />
                <span className="counter-burst-particle absolute left-1/2 top-1/2 h-1.5 w-1.5 rounded-full bg-[#00addd]/80" />
                <span className="counter-burst-particle absolute left-1/2 top-1/2 h-1.5 w-1.5 rounded-full bg-[#80c738]/80" />
                <span className="counter-burst-particle absolute left-1/2 top-1/2 h-1.5 w-1.5 rounded-full bg-[#00addd]/80" />
                <span className="counter-burst-particle absolute left-1/2 top-1/2 h-1.5 w-1.5 rounded-full bg-[#80c738]/80" />
                <span className="counter-burst-particle absolute left-1/2 top-1/2 h-1.5 w-1.5 rounded-full bg-[#00addd]/80" />
              </div>

              <p className="mb-4 text-xs font-black uppercase tracking-[0.2em] text-[#80c738]">Projected cost</p>
              <div className="mb-3 flex items-baseline gap-2">
                <span
                  ref={statNumberRef}
                  className="font-bold"
                  style={{
                    fontSize: "clamp(2rem, 5vw, 2.5rem)",
                    fontFamily: typography.fonts.heading,
                    color: "#80c738",
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
                    color: "#80c738",
                  }}
                >
                  %
                </span>
              </div>
              <p
                className="font-semibold text-[#fff7df]"
                style={{
                  fontSize: "clamp(0.8125rem, 1vw, 0.875rem)",
                  fontFamily: typography.fonts.body,
                  lineHeight: typography.lineHeights.normal,
                }}
              >
                of Kenya's GDP loss annually by 2030 due to climate impacts
              </p>
              </div>

              <div className="border-[3px] border-[#101010] bg-[#fff7df] p-5 shadow-[6px_6px_0_#101010]">
              <h3
                className="mb-4 font-black uppercase text-[#101010]"
                style={{
                  fontSize: "clamp(1rem, 1.3vw, 1.1rem)",
                  fontFamily: typography.fonts.heading,
                }}
              >
                Key impact areas
              </h3>
              <ul className="space-y-2">
                {[
                  { label: "Environmental Degradation", icon: Warning },
                  { label: "Biodiversity Loss", icon: Plant },
                  { label: "Water & Air Pollution", icon: Drop },
                ].map((item, index) => (
                  <li
                    key={index}
                    className="flex items-center gap-3 border-t-2 border-[#101010] pt-2 text-[#101010]"
                    style={{
                      fontSize: "clamp(0.875rem, 1vw, 0.9375rem)",
                      fontFamily: typography.fonts.body,
                    }}
                  >
                    <div
                      className="flex h-8 w-8 shrink-0 items-center justify-center border-2 border-[#101010] bg-[#80c738]"
                    >
                      <item.icon
                        className="w-4 h-4"
                        style={{ color: "#101010" }}
                        aria-hidden
                      />
                    </div>
                    <span className="font-black">{item.label}</span>
                  </li>
                ))}
              </ul>
              </div>
            </div>
          </div>

          <div ref={visualContentRef} className="relative">
            <div className="mb-5 border-[3px] border-[#101010] bg-[#fff7df] p-3 shadow-[8px_8px_0_#101010]">
              <div
                className="relative min-h-[280px] overflow-hidden border-2 border-[#101010] sm:min-h-[360px]"
                style={{
                  backgroundImage: "url('/images/sectors/nature.jpg')",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <div className="absolute inset-0 bg-[#101010]/20" aria-hidden />
                <div className="absolute bottom-0 left-0 border-r-[3px] border-t-[3px] border-[#101010] bg-[#80c738] px-4 py-3">
                  <p className="text-xs font-black uppercase tracking-[0.18em] text-[#101010]">Risk landscape</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:gap-4">
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
                  className="icon-card relative border-[3px] border-[#101010] bg-[#fff7df] p-4 shadow-[4px_4px_0_#101010] transition hover:-translate-y-0.5 hover:shadow-[6px_6px_0_#101010]"
                >
                  <div
                    className="icon-card-icon mb-3 flex h-11 w-11 items-center justify-center border-2 border-[#101010]"
                    style={{
                      background: index % 2 === 0 ? "#00addd" : "#80c738",
                    }}
                  >
                    <item.icon
                      className="h-6 w-6"
                      style={{ color: "#101010" }}
                      aria-hidden
                    />
                  </div>
                  <p
                    className="text-left font-black uppercase text-[#101010]"
                    style={{
                      fontSize: "clamp(0.78rem, 0.9vw, 0.88rem)",
                      fontFamily: typography.fonts.body,
                      lineHeight: typography.lineHeights.normal,
                    }}
                  >
                    {item.label}
                  </p>
                </div>
              ))}
            </div>

            <div className="pointer-events-none absolute inset-0" aria-hidden>
              <span className="ambient-dot absolute right-6 top-8 h-4 w-4 border-2 border-[#101010] bg-[#80c738]" />
              <span className="ambient-dot absolute bottom-10 right-10 h-4 w-4 border-2 border-[#101010] bg-[#00addd]" />
              <span className="ambient-dot absolute left-6 top-1/3 h-3 w-3 border-2 border-[#101010] bg-[#fff7df]" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
