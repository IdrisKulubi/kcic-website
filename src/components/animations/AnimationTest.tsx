"use client";

import { ScrollReveal, CounterAnimation, ParallaxElement } from "./index";

/**
 * Test component to verify animation components are working
 * This can be used for development testing
 */
export default function AnimationTest() {
  return (
    <div className="min-h-screen space-y-20 p-8">
      <ScrollReveal direction="up" className="text-center">
        <h1 className="text-4xl font-bold">Scroll Reveal Test</h1>
        <p className="text-lg mt-4">This should fade in from below</p>
      </ScrollReveal>

      <ScrollReveal direction="left" delay={0.2} className="text-center">
        <h2 className="text-3xl font-semibold">From Left</h2>
        <p className="text-base mt-2">This should slide in from the left</p>
      </ScrollReveal>

      <ScrollReveal direction="right" delay={0.4} className="text-center">
        <h2 className="text-3xl font-semibold">From Right</h2>
        <p className="text-base mt-2">This should slide in from the right</p>
      </ScrollReveal>

      <div className="text-center space-y-8">
        <h2 className="text-3xl font-semibold">Counter Animation Test</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 bg-climate-green/10 rounded-lg">
            <CounterAnimation 
              value={1250} 
              suffix="+" 
              className="text-4xl font-bold text-climate-green"
            />
            <p className="mt-2 text-sm">Jobs Created</p>
          </div>
          <div className="p-6 bg-climate-blue/10 rounded-lg">
            <CounterAnimation 
              value={850} 
              suffix=" SMEs" 
              className="text-4xl font-bold text-climate-blue"
              delay={0.2}
            />
            <p className="mt-2 text-sm">SMEs Supported</p>
          </div>
          <div className="p-6 bg-climate-yellow/10 rounded-lg">
            <CounterAnimation 
              value={95} 
              suffix="%" 
              className="text-4xl font-bold text-climate-yellow"
              delay={0.4}
            />
            <p className="mt-2 text-sm">Success Rate</p>
          </div>
        </div>
      </div>

      <ParallaxElement speed={0.5} className="text-center py-20 bg-gradient-to-r from-climate-green/20 to-climate-blue/20 rounded-lg">
        <h2 className="text-3xl font-semibold">Parallax Element</h2>
        <p className="text-base mt-2">This should move at a different speed when scrolling</p>
      </ParallaxElement>

      <div className="h-screen flex items-center justify-center">
        <ScrollReveal direction="up" className="text-center">
          <h2 className="text-3xl font-semibold">End of Test</h2>
          <p className="text-base mt-2">Scroll back up to see the animations again</p>
        </ScrollReveal>
      </div>
    </div>
  );
}