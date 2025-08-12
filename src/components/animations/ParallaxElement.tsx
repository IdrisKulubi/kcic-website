"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, ReactNode } from "react";

interface ParallaxElementProps {
  children: ReactNode;
  speed?: number;
  direction?: "up" | "down";
  className?: string;
  offset?: ["start end", "end start"] | ["start start", "end end"];
}

/**
 * ParallaxElement component that creates subtle parallax scrolling effects
 * Elements move at different speeds relative to scroll position
 */
export default function ParallaxElement({
  children,
  speed = 0.5,
  direction = "up",
  className = "",
  offset = ["start end", "end start"] as const,
}: ParallaxElementProps) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset,
  });

  // Handle reduced motion and low performance
  const shouldAnimate = typeof window === "undefined" || 
    (!window.matchMedia("(prefers-reduced-motion: reduce)").matches && 
     !((navigator.hardwareConcurrency || 1) < 4 || ((navigator as unknown as { deviceMemory?: number }).deviceMemory || 1) < 2));

  // Calculate transform values based on direction and speed, with performance adjustments
  const adjustedSpeed = shouldAnimate ? speed : 0;
  const yRange = direction === "up" ? [-100 * adjustedSpeed, 100 * adjustedSpeed] : [100 * adjustedSpeed, -100 * adjustedSpeed];
  const y = useTransform(scrollYProgress, [0, 1], yRange);

  return (
    <motion.div
      ref={ref}
      style={{ y: shouldAnimate ? y : 0 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}