"use client";

import { useRef, useLayoutEffect, ReactNode, createContext, useContext } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface ScrollContextValue {
  registerSection: (id: string, ref: HTMLElement) => void;
  currentSection: string;
}

const ScrollContext = createContext<ScrollContextValue | null>(null);

export function useScrollContext() {
  return useContext(ScrollContext);
}

interface ScrollOrchestratorProps {
  children: ReactNode;
}

/**
 * ScrollOrchestrator - Manages unified scroll animations across the entire page
 * Creates a cohesive scrolling experience with smooth section transitions
 */
export function ScrollOrchestrator({ children }: ScrollOrchestratorProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!containerRef.current) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Global reveal animations for common elements
      const revealElements = containerRef.current?.querySelectorAll(
        "[data-scroll-reveal]"
      );

      revealElements?.forEach((el) => {
        const direction = el.getAttribute("data-scroll-direction") || "up";
        const delay = parseFloat(el.getAttribute("data-scroll-delay") || "0");
        const duration = parseFloat(el.getAttribute("data-scroll-duration") || "0.8");

        let fromVars: gsap.TweenVars = { opacity: 0 };
        let toVars: gsap.TweenVars = { opacity: 1 };

        switch (direction) {
          case "up":
            fromVars = { opacity: 0, y: 50 };
            toVars = { opacity: 1, y: 0 };
            break;
          case "down":
            fromVars = { opacity: 0, y: -50 };
            toVars = { opacity: 1, y: 0 };
            break;
          case "left":
            fromVars = { opacity: 0, x: -50 };
            toVars = { opacity: 1, x: 0 };
            break;
          case "right":
            fromVars = { opacity: 0, x: 50 };
            toVars = { opacity: 1, x: 0 };
            break;
          case "scale":
            fromVars = { opacity: 0, scale: 0.9 };
            toVars = { opacity: 1, scale: 1 };
            break;
        }

        gsap.fromTo(el, fromVars, {
          ...toVars,
          duration,
          delay,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none none",
            once: true,
          },
        });
      });

      // Staggered children animations
      const staggerContainers = containerRef.current?.querySelectorAll(
        "[data-scroll-stagger]"
      );

      staggerContainers?.forEach((container) => {
        const children = container.querySelectorAll("[data-scroll-stagger-child]");
        const staggerDelay = parseFloat(container.getAttribute("data-scroll-stagger-delay") || "0.1");

        gsap.fromTo(
          children,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: staggerDelay,
            ease: "power2.out",
            scrollTrigger: {
              trigger: container,
              start: "top 80%",
              toggleActions: "play none none none",
              once: true,
            },
          }
        );
      });

      // Parallax elements
      const parallaxElements = containerRef.current?.querySelectorAll(
        "[data-scroll-parallax]"
      );

      parallaxElements?.forEach((el) => {
        const speed = parseFloat(el.getAttribute("data-parallax-speed") || "0.2");

        gsap.to(el, {
          y: () => -window.innerHeight * speed,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      });

      // Refresh ScrollTrigger after all animations are set up
      ScrollTrigger.refresh();
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="scroll-orchestrator">
      {children}
    </div>
  );
}

/**
 * AnimatedSection - Wrapper for sections with scroll-triggered animations
 */
interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  direction?: "up" | "down" | "left" | "right" | "scale" | "fade";
  delay?: number;
  duration?: number;
  id?: string;
  as?: "section" | "div" | "article";
}

export function AnimatedSection({
  children,
  className = "",
  direction = "up",
  delay = 0,
  duration = 0.8,
  id,
  as: Component = "section",
}: AnimatedSectionProps) {
  const ref = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    if (!ref.current) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      let fromVars: gsap.TweenVars = { opacity: 0 };
      let toVars: gsap.TweenVars = { opacity: 1 };

      switch (direction) {
        case "up":
          fromVars = { opacity: 0, y: 60 };
          toVars = { opacity: 1, y: 0 };
          break;
        case "down":
          fromVars = { opacity: 0, y: -60 };
          toVars = { opacity: 1, y: 0 };
          break;
        case "left":
          fromVars = { opacity: 0, x: -60 };
          toVars = { opacity: 1, x: 0 };
          break;
        case "right":
          fromVars = { opacity: 0, x: 60 };
          toVars = { opacity: 1, x: 0 };
          break;
        case "scale":
          fromVars = { opacity: 0, scale: 0.95 };
          toVars = { opacity: 1, scale: 1 };
          break;
        case "fade":
          fromVars = { opacity: 0 };
          toVars = { opacity: 1 };
          break;
      }

      gsap.fromTo(ref.current, fromVars, {
        ...toVars,
        duration,
        delay,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ref.current,
          start: "top 85%",
          toggleActions: "play none none none",
          once: true,
        },
      });
    }, ref);

    return () => ctx.revert();
  }, [direction, delay, duration]);

  return (
    <Component ref={ref as any} id={id} className={className}>
      {children}
    </Component>
  );
}

/**
 * ScrollProgressIndicator - Shows current scroll position with section markers
 */
interface SectionMarker {
  id: string;
  label: string;
}

interface ScrollProgressIndicatorProps {
  sections?: SectionMarker[];
  showLabels?: boolean;
}

export function ScrollProgressIndicator({
  sections = [],
  showLabels = false,
}: ScrollProgressIndicatorProps) {
  const progressRef = useRef<HTMLDivElement>(null);
  const dotsRef = useRef<(HTMLButtonElement | null)[]>([]);

  useLayoutEffect(() => {
    if (!progressRef.current || sections.length === 0) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      sections.forEach((section, index) => {
        const el = document.getElementById(section.id);
        if (!el || !dotsRef.current[index]) return;

        ScrollTrigger.create({
          trigger: el,
          start: "top center",
          end: "bottom center",
          onEnter: () => {
            dotsRef.current.forEach((dot, i) => {
              if (dot) {
                dot.classList.toggle("bg-green-500", i === index);
                dot.classList.toggle("scale-125", i === index);
                dot.classList.toggle("bg-gray-300", i !== index);
              }
            });
          },
          onEnterBack: () => {
            dotsRef.current.forEach((dot, i) => {
              if (dot) {
                dot.classList.toggle("bg-green-500", i === index);
                dot.classList.toggle("scale-125", i === index);
                dot.classList.toggle("bg-gray-300", i !== index);
              }
            });
          },
        });
      });
    }, progressRef);

    return () => ctx.revert();
  }, [sections]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  if (sections.length === 0) return null;

  return (
    <div
      ref={progressRef}
      className="fixed right-4 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col gap-3"
    >
      {sections.map((section, index) => (
        <div key={section.id} className="relative group">
          <button
            ref={(el) => {
              dotsRef.current[index] = el;
            }}
            onClick={() => scrollToSection(section.id)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === 0 ? "bg-green-500 scale-125" : "bg-gray-300"
            } hover:bg-green-400 hover:scale-150`}
            aria-label={`Scroll to ${section.label}`}
          />
          {showLabels && (
            <span className="absolute right-6 top-1/2 -translate-y-1/2 whitespace-nowrap bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
              {section.label}
            </span>
          )}
        </div>
      ))}
    </div>
  );
}
