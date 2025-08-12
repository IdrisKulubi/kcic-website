"use client";

import { ScrollReveal, CounterAnimation } from "@/components/animations";
import { StatData } from "@/data/home";
import { landmarkUtils } from "@/lib/accessibility";
import { cn } from "@/lib/utils";

interface StatsSectionProps {
  stats: StatData[];
  className?: string;
}

/**
 * StatsSection component displays impact statistics with animated counters
 * Features glassmorphism cards and scroll-triggered animations
 */
export function StatsSection({ stats, className }: StatsSectionProps) {
  return (
    <section 
      {...landmarkUtils.getRegionProps('Impact statistics')}
      className={cn("py-16 sm:py-20 px-4 sm:px-6 lg:px-8", className)}
      aria-labelledby="impact-heading"
    >
      <div className="container mx-auto">
        <ScrollReveal direction="up" delay={0.1}>
          <h2 
            id="impact-heading"
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center mb-12 sm:mb-16 bg-gradient-to-r from-climate-green to-climate-blue bg-clip-text text-transparent"
          >
            Our Impact
          </h2>
        </ScrollReveal>
        
        <div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8"
          role="list"
          aria-label="Impact statistics"
        >
          {stats.map((stat, index) => (
            <ScrollReveal 
              key={stat.id}
              direction="up"
              delay={0.2 + (index * 0.1)}
              className="h-full"
            >
              <div 
                className="relative group h-full"
                role="listitem"
              >
                {/* Glassmorphism card */}
                <div className="relative h-full p-6 sm:p-8 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 hover:bg-white/15">
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-climate-green/10 via-climate-blue/10 to-climate-yellow/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Content */}
                  <div className="relative z-10 text-center">
                    {/* Icon placeholder - you can replace with actual icons */}
                    <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-gradient-to-r from-climate-green to-climate-blue flex items-center justify-center">
                      <div className="w-6 h-6 bg-white rounded-full opacity-80" />
                    </div>
                    
                    {/* Animated counter */}
                    <div className="mb-3">
                      <CounterAnimation
                        value={stat.value}
                        suffix={stat.suffix}
                        duration={2}
                        delay={0.3 + (index * 0.1)}
                        className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-climate-green via-climate-blue to-climate-yellow bg-clip-text text-transparent"
                      />
                    </div>
                    
                    {/* Label */}
                    <div className="text-sm sm:text-base lg:text-lg font-medium text-gray-700 dark:text-gray-300">
                      {stat.label}
                    </div>
                  </div>
                  
                  {/* Hover glow effect */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-climate-green/20 to-climate-blue/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl -z-10" />
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}