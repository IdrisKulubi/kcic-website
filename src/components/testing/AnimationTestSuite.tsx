"use client";

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  runAnimationTestSuite, 
  animationPerformance, 

  animationTesting 
} from '@/lib/animation-testing';
import { motionUtils } from '@/lib/accessibility';
import { ScrollReveal, CounterAnimation } from '@/components/animations';

interface TestResults {
  performance: {
    deviceTier: 'low' | 'medium' | 'high';
    hardwareAcceleration: boolean;
    optimalSettings: Record<string, unknown>;
  };
  compatibility: {
    score: number;
    transforms: boolean;
    cssAnimations: boolean;
    intersectionObserver: boolean;
    requestAnimationFrame: boolean;
  };
  accessibility: {
    reducedMotionSupport: boolean;
  };
  timing: {
    timestamp: string;
    userAgent: string;
  };
}

/**
 * AnimationTestSuite component for testing and debugging animations
 * Only visible in development mode
 */
export function AnimationTestSuite() {
  const [testResults, setTestResults] = useState<TestResults | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [frameRate, setFrameRate] = useState<number>(0);
  const [isVisible, setIsVisible] = useState(false);
  const testElementRef = useRef<HTMLDivElement>(null);

  // Only show in development
  useEffect(() => {
    setIsVisible(process.env.NODE_ENV === 'development');
  }, []);

  // Monitor frame rate
  useEffect(() => {
    if (isVisible) {
      animationPerformance.monitorFrameRate(setFrameRate);
    }
  }, [isVisible]);

  const runTests = async () => {
    setIsRunning(true);
    try {
      const results = await runAnimationTestSuite();
      setTestResults(results);
    } catch (error) {
      console.error('Animation test suite failed:', error);
    } finally {
      setIsRunning(false);
    }
  };

  const testAnimationSmoothness = async () => {
    if (testElementRef.current) {
      const isSmooth = await animationTesting.testAnimationSmoothness(testElementRef.current);
      alert(`Animation smoothness test: ${isSmooth ? 'PASSED' : 'FAILED'}`);
    }
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 max-w-md">
      <Card className="bg-background/95 backdrop-blur-md border shadow-lg">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium flex items-center justify-between">
            Animation Test Suite
            <Badge variant="outline" className="text-xs">
              DEV
            </Badge>
          </CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-4">
          {/* Current Performance Metrics */}
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div>
              <div className="text-muted-foreground">FPS</div>
              <div className="font-mono font-bold">
                {frameRate > 0 ? frameRate : '--'}
              </div>
            </div>
            <div>
              <div className="text-muted-foreground">Reduced Motion</div>
              <div className="font-mono font-bold">
                {motionUtils.prefersReducedMotion() ? 'ON' : 'OFF'}
              </div>
            </div>
          </div>

          {/* Test Controls */}
          <div className="space-y-2">
            <Button
              onClick={runTests}
              disabled={isRunning}
              size="sm"
              className="w-full text-xs"
            >
              {isRunning ? 'Running Tests...' : 'Run Full Test Suite'}
            </Button>
            
            <Button
              onClick={testAnimationSmoothness}
              size="sm"
              variant="outline"
              className="w-full text-xs"
            >
              Test Animation Smoothness
            </Button>
          </div>

          {/* Test Element for Animation Testing */}
          <div 
            ref={testElementRef}
            className="w-8 h-8 bg-climate-green rounded-full mx-auto"
            aria-hidden="true"
          />

          {/* Test Results */}
          {testResults && (
            <div className="space-y-3 text-xs">
              <div>
                <div className="font-medium mb-1">Performance</div>
                <div className="space-y-1 text-muted-foreground">
                  <div>Device Tier: <span className="font-mono">{testResults.performance.deviceTier}</span></div>
                  <div>Hardware Accel: <span className="font-mono">{testResults.performance.hardwareAcceleration ? 'Yes' : 'No'}</span></div>
                </div>
              </div>
              
              <div>
                <div className="font-medium mb-1">Compatibility</div>
                <div className="space-y-1 text-muted-foreground">
                  <div>Score: <span className="font-mono">{testResults.compatibility.score}/100</span></div>
                  <div>Transforms: <span className="font-mono">{testResults.compatibility.transforms ? '✓' : '✗'}</span></div>
                  <div>CSS Animations: <span className="font-mono">{testResults.compatibility.cssAnimations ? '✓' : '✗'}</span></div>
                  <div>Intersection Observer: <span className="font-mono">{testResults.compatibility.intersectionObserver ? '✓' : '✗'}</span></div>
                </div>
              </div>
            </div>
          )}

          {/* Sample Animations for Visual Testing */}
          <div className="space-y-2">
            <div className="text-xs font-medium">Sample Animations</div>
            
            <ScrollReveal direction="up" className="p-2 bg-muted rounded text-xs text-center">
              Scroll Reveal Test
            </ScrollReveal>
            
            <div className="text-center">
              <CounterAnimation
                value={1234}
                suffix="+"
                className="text-lg font-bold text-climate-green"
              />
              <div className="text-xs text-muted-foreground">Counter Animation</div>
            </div>
            
            <motion.div
              className="p-2 bg-climate-green/10 rounded text-xs text-center cursor-pointer"
              whileHover={motionUtils.prefersReducedMotion() ? {} : { scale: 1.05 }}
              whileTap={motionUtils.prefersReducedMotion() ? {} : { scale: 0.95 }}
            >
              Hover/Tap Animation
            </motion.div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}