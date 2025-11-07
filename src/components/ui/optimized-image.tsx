"use client";

import Image, { ImageProps } from 'next/image';
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { BLUR_DATA_URL, IMAGE_SIZES, IMAGE_QUALITY } from '@/lib/image-utils';

interface OptimizedImageProps extends Omit<ImageProps, 'alt'> {
  alt: string; // Make alt required
  fallbackSrc?: string;
  className?: string;
  priority?: boolean;
  sizeVariant?: keyof typeof IMAGE_SIZES;
  qualityVariant?: keyof typeof IMAGE_QUALITY;
}

export function OptimizedImage({
  src,
  alt,
  fallbackSrc = '/images/placeholder.jpg',
  className,
  priority = false,
  sizeVariant = 'card',
  qualityVariant = 'medium',
  ...props
}: OptimizedImageProps) {
  const [imgSrc, setImgSrc] = useState(src);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  // Preload critical images
  useEffect(() => {
    if (priority && typeof window !== 'undefined') {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = typeof src === 'string' ? src : '';
      link.fetchPriority = 'high';
      document.head.appendChild(link);
    }
  }, [src, priority]);

  const handleError = () => {
    if (imgSrc !== fallbackSrc) {
      setImgSrc(fallbackSrc);
      setHasError(true);
    }
  };

  const handleLoad = () => {
    setIsLoading(false);
  };

  // Ensure wrapper has dimensions when using fill layout
  const wrapperClass = cn(
    "relative overflow-hidden",
    (props as any).fill ? "h-full w-full" : "",
    className
  );

  return (
    <div className={wrapperClass}>
      {isLoading && (
        <div 
          className="absolute inset-0 bg-gradient-to-br from-climate-green/20 to-climate-blue/20 animate-pulse"
          aria-hidden="true"
        />
      )}
      <Image
        src={imgSrc}
        alt={alt}
        onError={handleError}
        onLoadingComplete={handleLoad}
        priority={priority}
        quality={IMAGE_QUALITY[qualityVariant]}
        placeholder="blur"
        blurDataURL={BLUR_DATA_URL}
        sizes={IMAGE_SIZES[sizeVariant]}
        className={cn(
          "transition-all duration-500 ease-out",
          (props as any).fill ? "object-cover h-full w-full" : "",
          isLoading ? "opacity-0 scale-105" : "opacity-100 scale-100",
          hasError && "filter grayscale opacity-75",
          className
        )}
        {...props}
      />
      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-muted/50 backdrop-blur-sm">
          <div className="text-center">
            <div className="text-2xl mb-2">📷</div>
            <span className="text-xs text-muted-foreground">Image unavailable</span>
          </div>
        </div>
      )}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-climate-green border-t-transparent rounded-full animate-spin" />
        </div>
      )}
    </div>
  );
}