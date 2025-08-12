"use client";

import { Suspense, lazy, ComponentType } from 'react';
import { cn } from '@/lib/utils';

interface DynamicLoaderProps {
  fallback?: React.ReactNode;
  className?: string;
  children: React.ReactNode;
}

// Loading skeleton component
export function LoadingSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn("animate-pulse", className)}>
      <div className="bg-muted rounded-lg h-full w-full" />
    </div>
  );
}

// Generic dynamic loader wrapper
export function DynamicLoader({ 
  fallback = <LoadingSkeleton />, 
  className,
  children 
}: DynamicLoaderProps) {
  return (
    <Suspense fallback={fallback}>
      <div className={className}>
        {children}
      </div>
    </Suspense>
  );
}

// Higher-order component for lazy loading
export function withDynamicLoading<P extends object>(
  Component: ComponentType<P>,
  fallback?: React.ReactNode
) {
  const LazyComponent = lazy(() => Promise.resolve({ default: Component }));
  
  return function DynamicComponent(props: P) {
    return (
      <Suspense fallback={fallback || <LoadingSkeleton />}>
        <LazyComponent {...props} />
      </Suspense>
    );
  };
}

// Intersection Observer based lazy loader
export function LazySection({ 
  children, 
  fallback = <LoadingSkeleton className="h-96" />,
  className
}: {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <Suspense fallback={fallback}>
        {children}
      </Suspense>
    </div>
  );
}