"use client";

import { motion, useInView, useMotionValue, useSpring, useTransform, animate } from "framer-motion";
import { useEffect, useRef, useState, CSSProperties } from "react";
import { ANIMATION_CONFIG } from "@/lib/animations";
import { motionUtils, screenReaderUtils } from "@/lib/accessibility";
import designSystem from "@/lib/design-system";

interface CounterAnimationProps {
  value: number;
  duration?: number;
  delay?: number;
  suffix?: string;
  prefix?: string;
  className?: string;
  threshold?: number;
  once?: boolean;
  style?: CSSProperties;
  enableMorphing?: boolean;
  enableGlow?: boolean;
}

/**
 * Enhanced CounterAnimation component with morphing numbers and visual effects
 * Features smooth transitions, number morphing, and glow effects
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
  style,
  enableMorphing = true,
  enableGlow = true,
}: CounterAnimationProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [displayValue, setDisplayValue] = useState("0");
  const isInView = useInView(ref, { 
    amount: threshold,
    once 
  });
  
  const motionValue = useMotionValue(0);
  const adjustedDuration = motionUtils.getSafeAnimationDuration(duration);
  
  // Enhanced spring configuration for smoother animation
  const springValue = useSpring(motionValue, {
    duration: adjustedDuration * 1000,
    bounce: motionUtils.isLowPerformanceDevice() ? 0 : 0.2,
    damping: motionUtils.isLowPerformanceDevice() ? 30 : 15,
    stiffness: motionUtils.isLowPerformanceDevice() ? 100 : 50,
  });
  
  // Transform with morphing effect
  const displayed = useTransform(springValue, (latest) => {
    const rounded = Math.round(latest);
    return rounded.toLocaleString();
  });

  // Enhanced animation with visual feedback
  useEffect(() => {
    if (isInView && !motionUtils.prefersReducedMotion()) {
      const timer = setTimeout(() => {
        setIsAnimating(true);
        
        // Smooth animation with easing
        const controls = animate(motionValue, value, {
          duration: adjustedDuration,
          ease: [0.25, 0.1, 0.25, 1], // Custom easing for smooth feel
          onUpdate: (latest) => {
            if (enableMorphing) {
              // Add slight scale pulse during animation
              if (ref.current) {
                const progress = latest / value;
                const scale = 1 + (Math.sin(progress * Math.PI * 2) * 0.02);
                ref.current.style.transform = `scale(${scale})`;
              }
            }
          },
          onComplete: () => {
            setIsAnimating(false);
            if (ref.current) {
              ref.current.style.transform = 'scale(1)';
            }
            // Announce completion to screen readers
            const finalValue = `${prefix}${value.toLocaleString()}${suffix}`;
            screenReaderUtils.announce(`Counter reached ${finalValue}`, 'polite');
          },
        });
        
        return () => controls.stop();
      }, delay * 1000);

      return () => clearTimeout(timer);
    } else if (isInView) {
      // Immediate set for reduced motion
      setDisplayValue(value.toLocaleString());
    }
  }, [isInView, value, delay, motionValue, adjustedDuration, prefix, suffix, enableMorphing]);

  // Update display value
  useEffect(() => {
    const unsubscribe = springValue.on("change", (latest) => {
      setDisplayValue(Math.round(latest).toLocaleString());
    });
    return unsubscribe;
  }, [springValue]);

  const shouldDisableAnimation = motionUtils.prefersReducedMotion() || motionUtils.isLowPerformanceDevice();
  
  return (
    <motion.span
      ref={ref}
      className={className}
      style={{
        ...style,
        display: 'inline-block',
        position: 'relative',
      }}
      initial={shouldDisableAnimation ? {} : { 
        opacity: 0,
        scale: 0.8,
        filter: 'blur(4px)',
      }}
      animate={shouldDisableAnimation ? {} : (isInView ? { 
        opacity: 1,
        scale: 1,
        filter: 'blur(0px)',
      } : { 
        opacity: 0,
        scale: 0.8,
        filter: 'blur(4px)',
      })}
      transition={shouldDisableAnimation ? {} : { 
        duration: motionUtils.getSafeAnimationDuration(0.6), 
        delay: motionUtils.getSafeAnimationDuration(delay),
        ease: [0.25, 0.1, 0.25, 1],
      }}
      aria-live="polite"
      aria-label={`${prefix}${value.toLocaleString()}${suffix}`}
    >
      {/* Glow effect during animation */}
      {enableGlow && isAnimating && (
        <motion.div
          className="absolute inset-0 -z-10"
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0, 0.5, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
          }}
          style={{
            background: designSystem.colors.gradients.glow,
            filter: 'blur(20px)',
          }}
        />
      )}
      
      {/* Prefix */}
      {prefix && (
        <motion.span
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: delay + 0.2, duration: 0.4 }}
        >
          {prefix}
        </motion.span>
      )}
      
      {/* Animated number with morphing effect */}
      <motion.span 
        aria-hidden="true"
        style={{
          display: 'inline-block',
          fontVariantNumeric: 'tabular-nums',
          letterSpacing: enableMorphing ? '0.02em' : 'normal',
        }}
        animate={isAnimating && enableMorphing ? {
          letterSpacing: ['0.02em', '0.05em', '0.02em'],
        } : {}}
        transition={{
          duration: 0.3,
          repeat: isAnimating ? Infinity : 0,
          repeatDelay: 0.5,
        }}
      >
        {shouldDisableAnimation ? value.toLocaleString() : displayValue}
      </motion.span>
      
      {/* Suffix with animation */}
      {suffix && (
        <motion.span
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: delay + 0.3, duration: 0.4 }}
          style={{ marginLeft: '0.25em' }}
        >
          {suffix}
        </motion.span>
      )}
      
      {/* Screen reader only text with final value */}
      <span className="sr-only">
        {`${prefix}${value.toLocaleString()}${suffix}`}
      </span>
    </motion.span>
  );
}
