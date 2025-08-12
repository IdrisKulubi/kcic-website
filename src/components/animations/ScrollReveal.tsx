"use client";

import { motion, useInView } from "framer-motion";
import { useRef, ReactNode } from "react";
import { ANIMATION_CONFIG } from "@/lib/animations";
import { motionUtils } from "@/lib/accessibility";

interface ScrollRevealProps {
  children: ReactNode;
  direction?: "up" | "down" | "left" | "right";
  distance?: number;
  duration?: number;
  delay?: number;
  threshold?: number;
  className?: string;
  once?: boolean;
}

/**
 * ScrollReveal component that animates elements when they come into view
 * Supports various animation directions and customizable parameters
 */
export default function ScrollReveal({
  children,
  direction = "up",
  distance = 60,
  duration = ANIMATION_CONFIG.duration.normal,
  delay = 0,
  threshold = ANIMATION_CONFIG.threshold.medium,
  className = "",
  once = true,
}: ScrollRevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    amount: threshold,
    once,
  });

  // Import motion utilities from accessibility
  const { prefersReducedMotion, isLowPerformanceDevice, getSafeAnimationDuration } = motionUtils;

  // Create animation variants with performance and accessibility considerations
  const shouldDisableAnimations = prefersReducedMotion() || isLowPerformanceDevice();
  
  const getInitialPosition = () => {
    if (shouldDisableAnimations) return {};
    
    // Reduce distance for low-performance devices
    const adjustedDistance = isLowPerformanceDevice() ? distance * 0.5 : distance;
    
    switch (direction) {
      case "up":
        return { y: adjustedDistance };
      case "down":
        return { y: -adjustedDistance };
      case "left":
        return { x: -adjustedDistance };
      case "right":
        return { x: adjustedDistance };
      default:
        return { y: adjustedDistance };
    }
  };

  const variants = {
    hidden: {
      opacity: 0,
      ...getInitialPosition(),
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration: getSafeAnimationDuration(duration),
        delay: getSafeAnimationDuration(delay),
        ease: isLowPerformanceDevice() ? ANIMATION_CONFIG.easing.ease : ANIMATION_CONFIG.easing.smooth,
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  );
}