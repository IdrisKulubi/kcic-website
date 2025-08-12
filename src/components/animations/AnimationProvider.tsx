"use client";

import { createContext, useContext, ReactNode } from "react";
import { useAnimationConfig } from "@/hooks/useAnimations";

interface AnimationContextType {
  duration: number;
  delay: number;
  easing: string;
  shouldAnimate: boolean;
}

const AnimationContext = createContext<AnimationContextType | undefined>(undefined);

interface AnimationProviderProps {
  children: ReactNode;
}

/**
 * AnimationProvider component that provides animation configuration context
 * Automatically handles reduced motion preferences
 */
export function AnimationProvider({ children }: AnimationProviderProps) {
  const animationConfig = useAnimationConfig();

  return (
    <AnimationContext.Provider value={animationConfig}>
      {children}
    </AnimationContext.Provider>
  );
}

/**
 * Hook to use animation context
 */
export function useAnimation(): AnimationContextType {
  const context = useContext(AnimationContext);
  if (context === undefined) {
    throw new Error("useAnimation must be used within an AnimationProvider");
  }
  return context;
}