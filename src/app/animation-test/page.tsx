"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollReveal, CounterAnimation, ParallaxElement } from '@/components/animations';
import { AnimationTestSuite } from '@/components/testing/AnimationTestSuite';
import { animationRefinement } from '@/lib/animation-refinement';
import { motionUtils } from '@/lib/accessibility';
import { 
  fadeInUp, 
  staggerContainer,
  hoverScale,
  tapScale 
} from '@/lib/animations';

/**
 * Animation Test Page - Comprehensive testing of all animation components
 * Only accessible in development mode
 */
export default function AnimationTestPage() {
  const [isClient, setIsClient] = useState(false);
  const [animationPreferences, setAnimationPreferences] = useState(animationRefinement.getPreferences());
  const [, setTestResults] = useState<Record<string, unknown> | null>(null);

  useEffect(() => {
    setIsClient(true);
    
    // Log animation preferences for debugging
    console.log('Animation Preferences:', animationPreferences);
    console.log('Animation Timing:', animationRefinement.getTiming());
  }, [animationPreferences]);

  // Only render in development
  if (process.env.NODE_ENV !== 'development') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Animation Test Page</h1>
          <p className="text-muted-foreground">This page is only available in development mode.</p>
        </div>
      </div>
    );
  }

  if (!isClient) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="py-16 bg-gradient-to-r from-climate-green to-climate-blue text-white">
        <div className="container mx-auto px-4">
          <ScrollReveal direction="up">
            <h1 className="text-4xl md:text-6xl font-bold text-center mb-4">
              Animation Test Suite
            </h1>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.2}>
            <p className="text-xl text-center text-white/90 max-w-2xl mx-auto">
              Comprehensive testing of all animation components and performance optimization
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Animation Quality Info */}
      <section className="py-12 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Animation Quality</CardTitle>
              </CardHeader>
              <CardContent>
                <Badge variant="outline" className="text-lg px-3 py-1">
                  {animationPreferences.quality}
                </Badge>
                <div className="mt-4 space-y-2 text-sm">
                  <div>Reduced Motion: {motionUtils.prefersReducedMotion() ? 'ON' : 'OFF'}</div>
                  <div>Parallax: {animationPreferences.enableParallax ? 'Enabled' : 'Disabled'}</div>
                  <div>Complex Animations: {animationPreferences.enableComplexAnimations ? 'Enabled' : 'Disabled'}</div>
                  <div>Max Duration: {animationPreferences.maxAnimationDuration}ms</div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Device Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div>CPU Cores: {navigator.hardwareConcurrency || 'Unknown'}</div>
                  <div>Memory: {(navigator as unknown as { deviceMemory?: number }).deviceMemory || 'Unknown'}GB</div>
                  <div>Connection: {((navigator as unknown as { connection?: { effectiveType?: string } }).connection?.effectiveType) || 'Unknown'}</div>
                  <div>Hardware Accel: {animationRefinement.shouldEnable('complex') ? 'Yes' : 'No'}</div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Animation Timing</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm font-mono">
                  <div>Micro: {animationRefinement.getTiming().micro}s</div>
                  <div>Entrance: {animationRefinement.getTiming().entrance}s</div>
                  <div>Exit: {animationRefinement.getTiming().exit}s</div>
                  <div>Complex: {animationRefinement.getTiming().complex}s</div>
                  <div>Stagger: {animationRefinement.getTiming().stagger}s</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* ScrollReveal Tests */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <ScrollReveal direction="up">
            <h2 className="text-3xl font-bold text-center mb-12">ScrollReveal Animations</h2>
          </ScrollReveal>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <ScrollReveal direction="up" delay={0.1}>
              <Card className="h-32 flex items-center justify-center">
                <CardContent>
                  <p className="text-center font-medium">Fade Up</p>
                </CardContent>
              </Card>
            </ScrollReveal>
            
            <ScrollReveal direction="down" delay={0.2}>
              <Card className="h-32 flex items-center justify-center">
                <CardContent>
                  <p className="text-center font-medium">Fade Down</p>
                </CardContent>
              </Card>
            </ScrollReveal>
            
            <ScrollReveal direction="left" delay={0.3}>
              <Card className="h-32 flex items-center justify-center">
                <CardContent>
                  <p className="text-center font-medium">Fade Left</p>
                </CardContent>
              </Card>
            </ScrollReveal>
            
            <ScrollReveal direction="right" delay={0.4}>
              <Card className="h-32 flex items-center justify-center">
                <CardContent>
                  <p className="text-center font-medium">Fade Right</p>
                </CardContent>
              </Card>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Counter Animations */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <ScrollReveal direction="up">
            <h2 className="text-3xl font-bold text-center mb-12">Counter Animations</h2>
          </ScrollReveal>
          
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <CounterAnimation
                value={1234}
                suffix="+"
                className="text-4xl font-bold text-climate-green block"
              />
              <p className="text-muted-foreground mt-2">Projects Completed</p>
            </div>
            
            <div className="text-center">
              <CounterAnimation
                value={567}
                suffix="K"
                delay={0.2}
                className="text-4xl font-bold text-climate-blue block"
              />
              <p className="text-muted-foreground mt-2">Users Reached</p>
            </div>
            
            <div className="text-center">
              <CounterAnimation
                value={89}
                suffix="%"
                delay={0.4}
                className="text-4xl font-bold text-climate-yellow block"
              />
              <p className="text-muted-foreground mt-2">Success Rate</p>
            </div>
            
            <div className="text-center">
              <CounterAnimation
                value={24}
                suffix="/7"
                delay={0.6}
                className="text-4xl font-bold text-green-600 block"
              />
              <p className="text-muted-foreground mt-2">Support Available</p>
            </div>
          </div>
        </div>
      </section>

      {/* Parallax Elements */}
      {animationRefinement.shouldEnable('parallax') && (
        <section className="py-16 relative overflow-hidden">
          <ParallaxElement speed={0.5} className="absolute inset-0 opacity-10">
            <div className="w-full h-full bg-gradient-to-br from-climate-green to-climate-blue" />
          </ParallaxElement>
          
          <div className="container mx-auto px-4 relative z-10">
            <ScrollReveal direction="up">
              <h2 className="text-3xl font-bold text-center mb-12">Parallax Effects</h2>
            </ScrollReveal>
            
            <div className="grid md:grid-cols-3 gap-8">
              <ParallaxElement speed={0.3}>
                <Card className="h-48 flex items-center justify-center">
                  <CardContent>
                    <p className="text-center font-medium">Slow Parallax</p>
                  </CardContent>
                </Card>
              </ParallaxElement>
              
              <ParallaxElement speed={0.6}>
                <Card className="h-48 flex items-center justify-center">
                  <CardContent>
                    <p className="text-center font-medium">Medium Parallax</p>
                  </CardContent>
                </Card>
              </ParallaxElement>
              
              <ParallaxElement speed={0.9}>
                <Card className="h-48 flex items-center justify-center">
                  <CardContent>
                    <p className="text-center font-medium">Fast Parallax</p>
                  </CardContent>
                </Card>
              </ParallaxElement>
            </div>
          </div>
        </section>
      )}

      {/* Hover and Interaction Tests */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <ScrollReveal direction="up">
            <h2 className="text-3xl font-bold text-center mb-12">Hover & Interaction Tests</h2>
          </ScrollReveal>
          
          <div className="grid md:grid-cols-3 gap-6">
            <motion.div
              whileHover={animationRefinement.shouldEnable('hover') ? hoverScale : {}}
              whileTap={animationRefinement.shouldEnable('hover') ? tapScale : {}}
            >
              <Card className="h-32 flex items-center justify-center cursor-pointer">
                <CardContent>
                  <p className="text-center font-medium">Hover Scale</p>
                </CardContent>
              </Card>
            </motion.div>
            
            <motion.div
              whileHover={animationRefinement.shouldEnable('hover') ? { rotate: 5 } : {}}
              whileTap={animationRefinement.shouldEnable('hover') ? { rotate: -5 } : {}}
            >
              <Card className="h-32 flex items-center justify-center cursor-pointer">
                <CardContent>
                  <p className="text-center font-medium">Hover Rotate</p>
                </CardContent>
              </Card>
            </motion.div>
            
            <motion.div
              whileHover={animationRefinement.shouldEnable('hover') ? { y: -10 } : {}}
              whileTap={animationRefinement.shouldEnable('hover') ? { y: 0 } : {}}
            >
              <Card className="h-32 flex items-center justify-center cursor-pointer">
                <CardContent>
                  <p className="text-center font-medium">Hover Lift</p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stagger Animation Test */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <ScrollReveal direction="up">
            <h2 className="text-3xl font-bold text-center mb-12">Stagger Animations</h2>
          </ScrollReveal>
          
          <motion.div
            className="grid md:grid-cols-6 gap-4"
            variants={animationRefinement.shouldEnable('stagger') ? staggerContainer : {}}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {Array.from({ length: 12 }).map((_, i) => (
              <motion.div key={i} variants={fadeInUp}>
                <Card className="h-20 flex items-center justify-center">
                  <CardContent>
                    <p className="text-center text-sm font-medium">{i + 1}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Performance Test Controls */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <ScrollReveal direction="up">
            <h2 className="text-3xl font-bold text-center mb-12">Performance Testing</h2>
          </ScrollReveal>
          
          <div className="max-w-2xl mx-auto space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Animation Performance Monitor</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  Monitor frame rates and automatically adjust animation quality based on performance.
                </p>
                
                <div className="flex gap-4">
                  <Button
                    onClick={() => {
                      // Force quality change for testing
                      animationRefinement.updateQuality('minimal');
                      setAnimationPreferences(animationRefinement.getPreferences());
                    }}
                    variant="outline"
                  >
                    Set Minimal Quality
                  </Button>
                  
                  <Button
                    onClick={() => {
                      animationRefinement.updateQuality('enhanced');
                      setAnimationPreferences(animationRefinement.getPreferences());
                    }}
                    variant="outline"
                  >
                    Set Enhanced Quality
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Animation Test Suite Component */}
      <AnimationTestSuite />
    </div>
  );
}