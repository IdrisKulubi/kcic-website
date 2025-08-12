"use client";

import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";
import { ANIMATION_CONFIG } from "@/lib/animations";
import { motionUtils, screenReaderUtils } from "@/lib/accessibility";

interface CounterAnimationProps {
  value: number;
  duration?: number;
  delay?: number;
  suffix?: string;
  prefix?: string;
  className?: string;
  threshold?: number;
  once?: boolean;
}

/**
 * CounterAnimation component that animates numbers from 0 to target value
 * Triggers when the component comes into view
 */
export default function CounterAnimation({
  value,
  duration = 2,
  delay = 0,
  suffix = "",
  prefix = "",
  className = "",
  threshold = ANIMATION_CONFIG.threshold.medium,
  once = true,
}: CounterAnimationProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { 
    amount: threshold,
    once 
  });
  
  const motionValue = useMotionValue(0);
  // Adjust spring configuration based on performance
  const adjustedDuration = motionUtils.getSafeAnimationDuration(duration);
  const springValue = useSpring(motionValue, {
    duration: adjustedDuration * 1000,
    bounce: motionUtils.isLowPerformanceDevice() ? 0 : 0.1,
    damping: motionUtils.isLowPerformanceDevice() ? 30 : 20,
  });
  const displayed = useTransform(springValue, (latest) =>
    Math.round(latest).toLocaleString()
  );

  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => {
        motionValue.set(value);
        // Announce the final value to screen readers
        const finalValue = `${prefix}${value.toLocaleString()}${suffix}`;
        screenReaderUtils.announce(`Counter reached ${finalValue}`, 'polite');
      }, delay * 1000);

      return () => clearTimeout(timer);
    }
  }, [isInView, value, delay, motionValue, prefix, suffix]);

  // Handle reduced motion and low performance - immediately set to final value or use shorter duration
  useEffect(() => {
    const shouldDisableAnimation = motionUtils.prefersReducedMotion() || motionUtils.isLowPerformanceDevice();
    
    if (shouldDisableAnimation && isInView) {
      const timer = setTimeout(() => {
        motionValue.set(value);
      }, delay * 1000);
      return () => clearTimeout(timer);
    }
  }, [isInView, value, delay, motionValue]);

  const shouldDisableAnimation = motionUtils.prefersReducedMotion() || motionUtils.isLowPerformanceDevice();
  
  return (
    <motion.span
      ref={ref}
      className={className}
      initial={shouldDisableAnimation ? {} : { opacity: 0 }}
      animate={shouldDisableAnimation ? {} : (isInView ? { opacity: 1 } : { opacity: 0 })}
      transition={shouldDisableAnimation ? {} : { 
        duration: motionUtils.getSafeAnimationDuration(0.5), 
        delay: motionUtils.getSafeAnimationDuration(delay) 
      }}
      aria-live="polite"
      aria-label={`${prefix}${value.toLocaleString()}${suffix}`}
    >
      {prefix}
      <motion.span aria-hidden="true">{displayed}</motion.span>
      {suffix}
      {/* Screen reader only text with final value */}
      <span className="sr-only">
        {`${prefix}${value.toLocaleString()}${suffix}`}
      </span>
    </motion.span>
  );
}