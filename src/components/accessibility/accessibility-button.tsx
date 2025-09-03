'use client';

import React, { useEffect } from 'react';
import { Settings, Accessibility } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAccessibility } from '@/contexts/accessibility-context';
import { cn } from '@/lib/utils';

interface AccessibilityButtonProps {
  className?: string;
  variant?: 'floating' | 'inline';
  size?: 'sm' | 'md' | 'lg';
}

export function AccessibilityButton({ 
  className, 
  variant = 'floating',
  size = 'md' 
}: AccessibilityButtonProps) {
  const { setAccessibilityPanelOpen } = useAccessibility();

  useEffect(() => {
    console.log('AccessibilityButton mounted');
  }, []);

  const handleClick = () => {
    console.log('Accessibility button clicked');
    setAccessibilityPanelOpen(true);
  };

  const sizeClasses = {
    sm: 'h-10 w-10',
    md: 'h-12 w-12',
    lg: 'h-14 w-14',
  };

  const iconSizes = {
    sm: 'h-4 w-4',
    md: 'h-5 w-5',
    lg: 'h-6 w-6',
  };

  if (variant === 'floating') {
    return (
      <Button
        onClick={handleClick}
        className={cn(
          'fixed bottom-6 right-6 z-[9999] rounded-full shadow-lg',
          'bg-climate-green hover:bg-climate-green-dark',
          'text-white border-2 border-white/20',
          'transition-all duration-300 ease-in-out',
          'hover:scale-110 hover:shadow-xl',
          'focus:ring-2 focus:ring-climate-green focus:ring-offset-2',
          'backdrop-blur-sm',
          sizeClasses[size],
          className
        )}
        aria-label="Open accessibility settings"
        title="Accessibility Settings"
        style={{
          backgroundColor: '#10B981',
          position: 'fixed',
          bottom: '1.5rem',
          right: '1.5rem',
          zIndex: 9999,
          width: '48px',
          height: '48px',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
        }}
      >
        <Accessibility className={iconSizes[size]} />
      </Button>
    );
  }

  return (
    <Button
      onClick={handleClick}
      variant="outline"
      size="sm"
      className={cn(
        'flex items-center gap-2',
        'hover:bg-climate-green/10 hover:border-climate-green',
        'focus:ring-2 focus:ring-climate-green focus:ring-offset-2',
        className
      )}
      aria-label="Open accessibility settings"
    >
      <Settings className="h-4 w-4" />
      <span className="hidden sm:inline">Accessibility</span>
    </Button>
  );
}