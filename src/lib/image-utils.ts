// Image optimization utilities

// Generate blur data URL for placeholder
export function generateBlurDataURL(width: number = 10, height: number = 10): string {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  
  const ctx = canvas.getContext('2d');
  if (!ctx) return '';
  
  // Create gradient background
  const gradient = ctx.createLinearGradient(0, 0, width, height);
  gradient.addColorStop(0, '#10B981');
  gradient.addColorStop(1, '#0EA5E9');
  
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);
  
  return canvas.toDataURL('image/jpeg', 0.1);
}

// Static blur data URL for SSR
export const BLUR_DATA_URL = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAKAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q==";

// Image size configurations for different breakpoints
export const IMAGE_SIZES = {
  hero: "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
  card: "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw",
  thumbnail: "(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 20vw",
  full: "100vw",
  logo: "(max-width: 768px) 80px, 120px"
};

// Device sizes for responsive images
export const DEVICE_SIZES = [640, 750, 828, 1080, 1200, 1920, 2048, 3840];

// Image quality settings
export const IMAGE_QUALITY = {
  high: 90,
  medium: 75,
  low: 60,
  placeholder: 10
};

// Check if image format is supported
export function supportsWebP(): boolean {
  if (typeof window === 'undefined') return false;
  
  const canvas = document.createElement('canvas');
  canvas.width = 1;
  canvas.height = 1;
  
  return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
}

export function supportsAVIF(): boolean {
  if (typeof window === 'undefined') return false;
  
  const canvas = document.createElement('canvas');
  canvas.width = 1;
  canvas.height = 1;
  
  return canvas.toDataURL('image/avif').indexOf('data:image/avif') === 0;
}

// Get optimal image format
export function getOptimalImageFormat(): 'avif' | 'webp' | 'jpeg' {
  if (supportsAVIF()) return 'avif';
  if (supportsWebP()) return 'webp';
  return 'jpeg';
}

// Generate srcSet for responsive images
export function generateSrcSet(basePath: string, sizes: number[] = DEVICE_SIZES): string {
  const format = getOptimalImageFormat();
  return sizes
    .map(size => `${basePath}?w=${size}&f=${format} ${size}w`)
    .join(', ');
}

// Preload critical images
export function preloadImage(src: string, priority: 'high' | 'low' = 'low'): void {
  if (typeof window === 'undefined') return;
  
  const link = document.createElement('link');
  link.rel = 'preload';
  link.as = 'image';
  link.href = src;
  link.fetchPriority = priority;
  
  document.head.appendChild(link);
}

// Lazy load images with Intersection Observer
export function createImageObserver(callback: (entry: IntersectionObserverEntry) => void) {
  if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
    return null;
  }
  
  return new IntersectionObserver(
    (entries) => {
      entries.forEach(callback);
    },
    {
      rootMargin: '50px 0px',
      threshold: 0.01
    }
  );
}

// Image loading error handler
export function handleImageError(
  event: React.SyntheticEvent<HTMLImageElement>,
  fallbackSrc?: string
): void {
  const img = event.currentTarget;
  
  if (fallbackSrc && img.src !== fallbackSrc) {
    img.src = fallbackSrc;
  } else {
    // Show placeholder or hide image
    img.style.display = 'none';
    
    // Add error class for styling
    img.classList.add('image-error');
    
    // Create placeholder element
    const placeholder = document.createElement('div');
    placeholder.className = 'image-placeholder';
    placeholder.innerHTML = '📷';
    placeholder.style.cssText = `
      display: flex;
      align-items: center;
      justify-content: center;
      background: #f3f4f6;
      color: #9ca3af;
      font-size: 2rem;
      width: 100%;
      height: 200px;
      border-radius: 8px;
    `;
    
    img.parentNode?.insertBefore(placeholder, img);
  }
}

// Calculate image dimensions while maintaining aspect ratio
export function calculateImageDimensions(
  originalWidth: number,
  originalHeight: number,
  maxWidth: number,
  maxHeight?: number
): { width: number; height: number } {
  const aspectRatio = originalWidth / originalHeight;
  
  let width = Math.min(originalWidth, maxWidth);
  let height = width / aspectRatio;
  
  if (maxHeight && height > maxHeight) {
    height = maxHeight;
    width = height * aspectRatio;
  }
  
  return {
    width: Math.round(width),
    height: Math.round(height)
  };
}

// Generate image alt text from filename
export function generateAltText(src: string, fallback: string = 'Image'): string {
  try {
    const filename = src.split('/').pop()?.split('.')[0] || '';
    return filename
      .replace(/[-_]/g, ' ')
      .replace(/\b\w/g, l => l.toUpperCase())
      || fallback;
  } catch {
    return fallback;
  }
}