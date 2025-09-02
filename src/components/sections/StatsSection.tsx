"use client";

import { CounterAnimation } from "@/components/animations";
import { StatData } from "@/data/home";
import { landmarkUtils } from "@/lib/accessibility";
import { cn } from "@/lib/utils";
import { motion, useScroll, useTransform, useInView, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import designSystem from "@/lib/design-system";

interface StatsSectionProps {
  stats: StatData[];
  className?: string;
}

// Icon mapping for stats
const iconMap: Record<string, React.ReactNode> = {
  users: (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
    </svg>
  ),
  building: (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10zm-2-8h-2v2h2v-2zm0 4h-2v2h2v-2z"/>
    </svg>
  ),
  leaf: (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
      <path d="M17,8C8,10 5.9,16.17 3.82,21.34L5.71,22L6.66,19.7C7.14,19.87 7.64,20 8,20C19,20 22,3 22,3C21,5 14,5.25 9,6.25C4,7.25 2,11.5 2,13.5C2,15.5 3.75,17.25 3.75,17.25C7,8 17,8 17,8Z"/>
    </svg>
  ),
  'dollar-sign': (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1.41 16.09V20h-2.67v-1.93c-1.71-.36-3.16-1.46-3.27-3.4h1.96c.1.81.45 1.61 1.67 1.61 1.16 0 1.6-.64 1.6-1.46 0-.84-.68-1.22-1.88-1.54-2.51-.65-3.81-1.8-3.81-3.73 0-1.4.72-2.64 2.58-3.03V5h2.67v1.53c1.42.36 2.89 1.35 2.99 3.08h-1.97c-.1-.72-.38-1.38-1.44-1.38-1.06 0-1.58.49-1.58 1.28 0 .71.56 1.1 1.89 1.48 2.49.64 3.77 1.73 3.77 3.79 0 1.79-1.19 2.84-3.1 3.31z"/>
    </svg>
  ),
};

/**
 * StatsSection component displays impact statistics with animated counters
 * Features modal-like text reveal, subtle glow effects, and scroll-triggered animations
 */
export function StatsSection({ stats, className }: StatsSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);
  
  // Track if section is in view
  const isInView = useInView(containerRef, {
    amount: 0.3,
    margin: "-100px 0px",
  });
  
  // Scroll progress for the section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  
  // Transform values based on scroll
  const headerY = useTransform(scrollYProgress, [0.2, 0.4], [100, 0]);
  const headerOpacity = useTransform(scrollYProgress, [0.2, 0.4], [0, 1]);
  const headerScale = useTransform(scrollYProgress, [0.2, 0.4], [0.8, 1]);
  
  // Background parallax effect
  const bgY = useTransform(scrollYProgress, [0, 1], [0, -50]);
  
  // Trigger animation only once when first coming into view
  useEffect(() => {
    if (isInView && !hasAnimated) {
      setHasAnimated(true);
    }
  }, [isInView, hasAnimated]);
  
  return (
    <section 
      ref={sectionRef}
      {...landmarkUtils.getRegionProps('Impact statistics')}
      className={cn(
        "relative py-24 sm:py-32 lg:py-40 px-4 sm:px-6 lg:px-8 overflow-hidden",
        "bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900",
        className
      )}
      aria-labelledby="impact-heading"
    >
      {/* Subtle animated background gradient */}
      <motion.div
        className="absolute inset-0 opacity-20"
        style={{ y: bgY }}
        animate={{
          background: [
            `radial-gradient(circle at 30% 50%, ${designSystem.colors.primary.green[200]} 0%, transparent 60%)`,
            `radial-gradient(circle at 70% 50%, ${designSystem.colors.primary.cyan[200]} 0%, transparent 60%)`,
            `radial-gradient(circle at 30% 50%, ${designSystem.colors.primary.green[200]} 0%, transparent 60%)`,
          ],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "linear",
        }}
      />
      
      <div className="container mx-auto relative z-10" ref={containerRef}>
        {/* Modal-like header reveal */}
        <AnimatePresence>
          {isInView && (
            <motion.div
              className="text-center mb-20"
              style={{
                y: headerY,
                opacity: headerOpacity,
                scale: headerScale,
              }}
            >
              {/* Backdrop blur effect for modal feel */}
              <motion.div
                className="absolute inset-x-0 -inset-y-10 mx-auto max-w-4xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                style={{
                  background: `radial-gradient(ellipse at center, ${designSystem.colors.glass.light} 0%, transparent 70%)`,
                  backdropFilter: `blur(8px)`,
                  zIndex: -1,
                }}
              />
              
              <motion.h2 
                id="impact-heading"
                className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
                style={{
                  fontFamily: designSystem.typography.fonts.heading,
                  background: designSystem.colors.gradients.primary,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  letterSpacing: designSystem.typography.letterSpacing.tight,
                }}
              >
                Our Impact
              </motion.h2>
              
              <motion.p 
                className="text-lg lg:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                style={{ 
                  fontFamily: designSystem.typography.fonts.body,
                  letterSpacing: designSystem.typography.letterSpacing.wide,
                }}
              >
                Transforming climate challenges into opportunities through innovation
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Stats Grid with scroll-based reveal */}
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10"
          role="list"
          aria-label="Impact statistics"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={isInView ? { 
                opacity: 1, 
                y: 0,
                scale: 1,
              } : {
                opacity: 0,
                y: 30,
                scale: 0.9,
              }}
              transition={{
                duration: 0.8,
                delay: 0.8 + (index * 0.1),
                ease: [0.25, 0.1, 0.25, 1],
              }}
              className="h-full"
              role="listitem"
            >
              <motion.div
                className="relative h-full group"
                whileHover={{ scale: 1.02 }} // Subtle scale, not jumping
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
              >
                {/* Main card with glassmorphism and subtle glow */}
                <motion.div 
                  className="relative h-full p-8 rounded-3xl overflow-hidden transition-shadow duration-500"
                  style={{
                    background: designSystem.colors.glass.light,
                    backdropFilter: `blur(${designSystem.colors.glass.blur})`,
                    border: `1px solid ${designSystem.colors.glass.border}`,
                  }}
                  whileHover={{
                    boxShadow: `0 0 40px rgba(127, 209, 52, 0.2), 0 0 60px rgba(0, 255, 255, 0.1)`,
                  }}
                  transition={{
                    boxShadow: { duration: 0.3 },
                  }}
                >
                  {/* Subtle glow effect on hover - no particles */}
                  <motion.div
                    className="absolute inset-0 pointer-events-none"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 0.15 }}
                    transition={{ duration: 0.3 }}
                    style={{
                      background: `radial-gradient(circle at center, ${designSystem.colors.primary.green[300]} 0%, transparent 70%)`,
                    }}
                  />
                  
                  {/* Content */}
                  <div className="relative z-10">
                    {/* Static icon with subtle glow on hover */}
                    <motion.div
                      className="w-16 h-16 mx-auto mb-6 rounded-2xl flex items-center justify-center text-white shadow-lg"
                      style={{
                        background: designSystem.colors.gradients.primary,
                      }}
                      whileHover={{
                        boxShadow: `0 0 20px rgba(127, 209, 52, 0.4)`,
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      {iconMap[stat.icon] || (
                        <div className="w-8 h-8 bg-white/80 rounded-full" />
                      )}
                    </motion.div>
                    
                    {/* Counter - animates only when cards appear */}
                    <div className="mb-4">
                      {hasAnimated && (
                        <CounterAnimation
                          value={stat.value}
                          suffix={stat.suffix}
                          duration={2}
                          delay={0.2 + (index * 0.1)}
                          className="text-4xl sm:text-5xl font-bold"
                          style={{
                            fontFamily: designSystem.typography.fonts.heading,
                            background: designSystem.colors.gradients.vibrant,
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                          }}
                          enableMorphing={false}
                          enableGlow={false}
                        />
                      )}
                    </div>
                    
                    {/* Static label */}
                    <div className="text-center">
                      <p
                        className="text-base lg:text-lg font-medium text-gray-700 dark:text-gray-300"
                        style={{ 
                          fontFamily: designSystem.typography.fonts.body,
                          letterSpacing: designSystem.typography.letterSpacing.wide,
                        }}
                      >
                        {stat.label}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}