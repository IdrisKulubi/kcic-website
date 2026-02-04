"use client";

import { useRef, useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface SectionDividerProps {
  /** Divider style variant */
  variant?: "wave" | "angle" | "curve" | "gradient" | "dots";
  /** Top color (from section above) */
  fromColor?: string;
  /** Bottom color (to section below) */
  toColor?: string;
  /** Flip the divider */
  flip?: boolean;
  /** Height of the divider */
  height?: number;
  /** Enable parallax movement */
  parallax?: boolean;
}

/**
 * SectionDivider - Creates smooth visual transitions between sections
 */
export function SectionDivider({
  variant = "wave",
  fromColor = "#ffffff",
  toColor = "#f9fafb",
  flip = false,
  height = 80,
  parallax = true,
}: SectionDividerProps) {
  const dividerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!parallax || !dividerRef.current) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Subtle parallax on the SVG
      gsap.to(dividerRef.current, {
        y: height * 0.3,
        ease: "none",
        scrollTrigger: {
          trigger: dividerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });
    }, dividerRef);

    return () => ctx.revert();
  }, [parallax, height]);

  const renderSVG = () => {
    switch (variant) {
      case "wave":
        return (
          <svg
            viewBox="0 0 1440 100"
            preserveAspectRatio="none"
            className="w-full h-full"
            style={{ transform: flip ? "scaleY(-1)" : undefined }}
          >
            <defs>
              <linearGradient id={`wave-grad-${fromColor}`} x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor={fromColor} />
                <stop offset="100%" stopColor={toColor} />
              </linearGradient>
            </defs>
            <path
              fill={fromColor}
              d="M0,0 L1440,0 L1440,60 Q1080,100 720,60 Q360,20 0,60 Z"
            />
            <path
              fill={toColor}
              fillOpacity="0.5"
              d="M0,40 Q360,80 720,40 Q1080,0 1440,40 L1440,100 L0,100 Z"
            />
          </svg>
        );

      case "angle":
        return (
          <svg
            viewBox="0 0 1440 100"
            preserveAspectRatio="none"
            className="w-full h-full"
            style={{ transform: flip ? "scaleY(-1)" : undefined }}
          >
            <polygon fill={fromColor} points="0,0 1440,0 1440,30 0,100" />
            <polygon fill={toColor} fillOpacity="0.6" points="0,50 1440,0 1440,100 0,100" />
          </svg>
        );

      case "curve":
        return (
          <svg
            viewBox="0 0 1440 100"
            preserveAspectRatio="none"
            className="w-full h-full"
            style={{ transform: flip ? "scaleY(-1)" : undefined }}
          >
            <path
              fill={fromColor}
              d="M0,0 L1440,0 L1440,50 Q720,120 0,50 Z"
            />
          </svg>
        );

      case "gradient":
        return (
          <div
            className="w-full h-full"
            style={{
              background: `linear-gradient(180deg, ${fromColor} 0%, ${toColor} 100%)`,
            }}
          />
        );

      case "dots":
        return (
          <div className="w-full h-full relative overflow-hidden">
            <div
              className="absolute inset-0"
              style={{ background: fromColor }}
            />
            <div
              className="absolute inset-0"
              style={{
                background: `radial-gradient(circle at 50% 100%, ${toColor} 0%, ${fromColor} 70%)`,
              }}
            />
            {/* Decorative dots */}
            <div className="absolute inset-0 opacity-20">
              {[...Array(20)].map((_, i) => (
                <div
                  key={i}
                  className="absolute rounded-full bg-current"
                  style={{
                    width: Math.random() * 8 + 4,
                    height: Math.random() * 8 + 4,
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    color: toColor,
                    opacity: Math.random() * 0.5 + 0.2,
                  }}
                />
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div
      ref={dividerRef}
      className="relative w-full overflow-hidden pointer-events-none select-none"
      style={{ height, marginTop: -1, marginBottom: -1 }}
      aria-hidden="true"
    >
      {renderSVG()}
    </div>
  );
}

/**
 * FloatingElements - Decorative elements that float across sections
 */
interface FloatingElementsProps {
  variant?: "circles" | "squares" | "mixed";
  color?: string;
  count?: number;
}

export function FloatingElements({
  variant = "circles",
  color = "#7FD134",
  count = 6,
}: FloatingElementsProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!containerRef.current) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const elements = containerRef.current?.querySelectorAll(".floating-el");
      
      elements?.forEach((el, i) => {
        const speed = 0.2 + Math.random() * 0.4;
        const direction = i % 2 === 0 ? 1 : -1;
        
        gsap.to(el, {
          y: () => window.innerHeight * speed * direction,
          x: () => 50 * Math.sin(i) * direction,
          rotation: 360 * direction,
          ease: "none",
          scrollTrigger: {
            trigger: document.documentElement,
            start: "top top",
            end: "bottom bottom",
            scrub: 1 + Math.random(),
          },
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, [count]);

  const elements = Array.from({ length: count }, (_, i) => {
    const size = 20 + Math.random() * 60;
    const positions = [
      { left: "5%", top: "15%" },
      { right: "8%", top: "25%" },
      { left: "12%", top: "45%" },
      { right: "15%", top: "55%" },
      { left: "8%", top: "75%" },
      { right: "10%", top: "85%" },
    ];
    const pos = positions[i % positions.length];

    return (
      <div
        key={i}
        className="floating-el absolute pointer-events-none"
        style={{
          ...pos,
          width: size,
          height: size,
          opacity: 0.08 + Math.random() * 0.08,
        }}
      >
        {variant === "circles" || (variant === "mixed" && i % 2 === 0) ? (
          <div
            className="w-full h-full rounded-full"
            style={{ backgroundColor: color }}
          />
        ) : (
          <div
            className="w-full h-full rotate-45"
            style={{ backgroundColor: color }}
          />
        )}
      </div>
    );
  });

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 overflow-hidden pointer-events-none z-0"
      aria-hidden="true"
    >
      {elements}
    </div>
  );
}
