// Performance utilities for animations
// Requirements: 9.5

/**
 * Adds will-change property to an element before animation
 * and removes it after animation completes
 */
export function optimizeAnimation(
  element: HTMLElement,
  properties: string[] = ['transform', 'opacity']
) {
  // Add will-change before animation
  element.style.willChange = properties.join(', ');

  // Remove will-change after animation completes
  const removeWillChange = () => {
    element.style.willChange = 'auto';
    element.removeEventListener('transitionend', removeWillChange);
    element.removeEventListener('animationend', removeWillChange);
  };

  element.addEventListener('transitionend', removeWillChange);
  element.addEventListener('animationend', removeWillChange);

  // Fallback: remove after 1 second if events don't fire
  setTimeout(removeWillChange, 1000);
}

/**
 * Enables GPU acceleration for an element
 */
export function enableGPUAcceleration(element: HTMLElement) {
  element.style.transform = 'translateZ(0)';
  element.style.backfaceVisibility = 'hidden';
  element.style.perspective = '1000px';
}

/**
 * Checks if user prefers reduced motion
 */
export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Returns animation duration based on user preference
 */
export function getAnimationDuration(defaultDuration: number): number {
  return prefersReducedMotion() ? 0.01 : defaultDuration;
}

/**
 * Debounce function for scroll events
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;

  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      timeout = null;
      func(...args);
    };

    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(later, wait);
  };
}

/**
 * Throttle function for scroll events
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;

  return function executedFunction(...args: Parameters<T>) {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

/**
 * Request animation frame wrapper for smooth animations
 */
export function smoothAnimation(callback: () => void) {
  if (typeof window === 'undefined') return;
  
  if (prefersReducedMotion()) {
    callback();
  } else {
    requestAnimationFrame(callback);
  }
}

/**
 * Lazy load images with Intersection Observer
 */
export function lazyLoadImage(img: HTMLImageElement) {
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const image = entry.target as HTMLImageElement;
          const src = image.dataset.src;
          if (src) {
            image.src = src;
            image.removeAttribute('data-src');
          }
          observer.unobserve(image);
        }
      });
    });

    observer.observe(img);
  } else {
    // Fallback for browsers without Intersection Observer
    const src = img.dataset.src;
    if (src) {
      img.src = src;
    }
  }
}

/**
 * Preload critical resources
 */
export function preloadResource(href: string, as: string) {
  if (typeof document === 'undefined') return;

  const link = document.createElement('link');
  link.rel = 'preload';
  link.href = href;
  link.as = as;
  document.head.appendChild(link);
}

/**
 * Check if device has high refresh rate display
 */
export function hasHighRefreshRate(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(min-resolution: 120dpi)').matches;
}

/**
 * Optimize scroll performance with passive listeners
 */
export function addPassiveScrollListener(
  element: HTMLElement | Window,
  handler: EventListener
) {
  element.addEventListener('scroll', handler, { passive: true });
  
  return () => {
    element.removeEventListener('scroll', handler);
  };
}

/**
 * Batch DOM reads and writes for better performance
 */
export class DOMBatcher {
  private readQueue: Array<() => void> = [];
  private writeQueue: Array<() => void> = [];
  private scheduled = false;

  read(callback: () => void) {
    this.readQueue.push(callback);
    this.schedule();
  }

  write(callback: () => void) {
    this.writeQueue.push(callback);
    this.schedule();
  }

  private schedule() {
    if (this.scheduled) return;
    this.scheduled = true;

    requestAnimationFrame(() => {
      // Execute all reads first
      this.readQueue.forEach((callback) => callback());
      this.readQueue = [];

      // Then execute all writes
      this.writeQueue.forEach((callback) => callback());
      this.writeQueue = [];

      this.scheduled = false;
    });
  }
}

/**
 * Image optimization utilities
 * Requirements: 10.5
 */

/**
 * Generate optimized image sizes for responsive images
 */
export function getImageSizes(breakpoints: {
  mobile?: string;
  tablet?: string;
  desktop?: string;
  wide?: string;
}): string {
  const sizes: string[] = [];
  
  if (breakpoints.mobile) {
    sizes.push(`(max-width: 640px) ${breakpoints.mobile}`);
  }
  if (breakpoints.tablet) {
    sizes.push(`(max-width: 1024px) ${breakpoints.tablet}`);
  }
  if (breakpoints.desktop) {
    sizes.push(`(max-width: 1280px) ${breakpoints.desktop}`);
  }
  if (breakpoints.wide) {
    sizes.push(breakpoints.wide);
  }
  
  return sizes.join(', ');
}

/**
 * Preload critical images
 */
export function preloadImage(src: string, priority: 'high' | 'low' = 'high') {
  if (typeof document === 'undefined') return;

  const link = document.createElement('link');
  link.rel = 'preload';
  link.as = 'image';
  link.href = src;
  link.fetchPriority = priority;
  document.head.appendChild(link);
}

/**
 * Check if WebP is supported
 */
export function supportsWebP(): Promise<boolean> {
  if (typeof window === 'undefined') return Promise.resolve(false);

  return new Promise((resolve) => {
    const webP = new Image();
    webP.onload = webP.onerror = () => {
      resolve(webP.height === 2);
    };
    webP.src =
      'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
  });
}

/**
 * Check if AVIF is supported
 */
export function supportsAVIF(): Promise<boolean> {
  if (typeof window === 'undefined') return Promise.resolve(false);

  return new Promise((resolve) => {
    const avif = new Image();
    avif.onload = avif.onerror = () => {
      resolve(avif.height === 2);
    };
    avif.src =
      'data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAAB0AAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAIAAAACAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQ0MAAAAABNjb2xybmNseAACAAIAAYAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAACVtZGF0EgAKCBgANogQEAwgMg8f8D///8WfhwB8+ErK42A=';
  });
}

/**
 * Get optimal image format based on browser support
 */
export async function getOptimalImageFormat(): Promise<'avif' | 'webp' | 'jpeg'> {
  const [avifSupported, webpSupported] = await Promise.all([
    supportsAVIF(),
    supportsWebP(),
  ]);

  if (avifSupported) return 'avif';
  if (webpSupported) return 'webp';
  return 'jpeg';
}

/**
 * Calculate blur data URL for image placeholder
 */
export function getBlurDataURL(width: number = 10, height: number = 10): string {
  const canvas = typeof document !== 'undefined' ? document.createElement('canvas') : null;
  if (!canvas) return '';

  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (!ctx) return '';

  // Create a simple gradient as placeholder
  const gradient = ctx.createLinearGradient(0, 0, width, height);
  gradient.addColorStop(0, '#e5e7eb');
  gradient.addColorStop(1, '#d1d5db');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);

  return canvas.toDataURL();
}

/**
 * Monitor image loading performance
 */
export function monitorImagePerformance(imageSrc: string) {
  if (typeof window === 'undefined' || !window.performance) return;

  const observer = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      if (entry.name.includes(imageSrc)) {
        console.log(`Image ${imageSrc} loaded in ${entry.duration}ms`);
      }
    }
  });

  observer.observe({ entryTypes: ['resource'] });
}

/**
 * Code Splitting Performance Monitoring
 * Requirements: Performance optimization
 */

/**
 * Monitor chunk loading performance
 */
export function monitorChunkLoading() {
  if (typeof window === 'undefined' || !window.performance) return;

  const observer = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      const resourceEntry = entry as PerformanceResourceTiming;
      
      // Monitor JavaScript chunks
      if (resourceEntry.name.includes('.js') && resourceEntry.name.includes('/_next/')) {
        const chunkName = resourceEntry.name.split('/').pop() || 'unknown';
        const loadTime = resourceEntry.responseEnd - resourceEntry.requestStart;
        
        if (process.env.NODE_ENV === 'development') {
          console.log(`Chunk ${chunkName} loaded in ${loadTime.toFixed(2)}ms`);
        }
      }
    }
  });

  observer.observe({ entryTypes: ['resource'] });
}

/**
 * Get bundle size metrics
 */
export function getBundleMetrics() {
  if (typeof window === 'undefined' || !window.performance) return null;

  const resources = performance.getEntriesByType('resource') as PerformanceResourceTiming[];
  const jsResources = resources.filter((r) => r.name.includes('.js'));

  const totalSize = jsResources.reduce((acc, r) => acc + (r.transferSize || 0), 0);
  const totalTime = jsResources.reduce(
    (acc, r) => acc + (r.responseEnd - r.requestStart),
    0
  );

  return {
    totalChunks: jsResources.length,
    totalSize: (totalSize / 1024).toFixed(2) + ' KB',
    totalLoadTime: totalTime.toFixed(2) + ' ms',
    averageChunkSize: (totalSize / jsResources.length / 1024).toFixed(2) + ' KB',
    averageLoadTime: (totalTime / jsResources.length).toFixed(2) + ' ms',
  };
}

/**
 * Log bundle metrics to console (development only)
 */
export function logBundleMetrics() {
  if (process.env.NODE_ENV !== 'development') return;

  // Wait for all resources to load
  if (typeof window !== 'undefined') {
    window.addEventListener('load', () => {
      setTimeout(() => {
        const metrics = getBundleMetrics();
        if (metrics) {
          console.group('📦 Bundle Metrics');
          console.log('Total Chunks:', metrics.totalChunks);
          console.log('Total Size:', metrics.totalSize);
          console.log('Total Load Time:', metrics.totalLoadTime);
          console.log('Average Chunk Size:', metrics.averageChunkSize);
          console.log('Average Load Time:', metrics.averageLoadTime);
          console.groupEnd();
        }
      }, 1000);
    });
  }
}

/**
 * Measure Time to Interactive (TTI)
 */
export function measureTTI(): Promise<number> {
  return new Promise((resolve) => {
    if (typeof window === 'undefined' || !window.performance) {
      resolve(0);
      return;
    }

    // Use requestIdleCallback to measure when the page becomes interactive
    if ('requestIdleCallback' in window) {
      requestIdleCallback(() => {
        const tti = performance.now();
        if (process.env.NODE_ENV === 'development') {
          console.log(`⚡ Time to Interactive: ${tti.toFixed(2)}ms`);
        }
        resolve(tti);
      });
    } else {
      // Fallback for browsers without requestIdleCallback
      setTimeout(() => {
        const tti = performance.now();
        resolve(tti);
      }, 0);
    }
  });
}

/**
 * Track dynamic import performance
 */
export function trackDynamicImport(componentName: string) {
  const startTime = performance.now();

  return () => {
    const endTime = performance.now();
    const duration = endTime - startTime;

    if (process.env.NODE_ENV === 'development') {
      console.log(`🔄 Dynamic import "${componentName}" took ${duration.toFixed(2)}ms`);
    }

    return duration;
  };
}

/**
 * Prefetch route chunks
 */
export function prefetchRoute(route: string) {
  if (typeof document === 'undefined') return;

  const link = document.createElement('link');
  link.rel = 'prefetch';
  link.href = route;
  link.as = 'script';
  document.head.appendChild(link);
}

/**
 * Check if code splitting is working effectively
 */
export function analyzeCodeSplitting() {
  if (typeof window === 'undefined' || !window.performance) return null;

  const resources = performance.getEntriesByType('resource') as PerformanceResourceTiming[];
  const jsChunks = resources.filter(
    (r) => r.name.includes('.js') && r.name.includes('/_next/')
  );

  // Categorize chunks
  const mainChunk = jsChunks.find((r) => r.name.includes('main'));
  const frameworkChunk = jsChunks.find((r) => r.name.includes('framework'));
  const dynamicChunks = jsChunks.filter(
    (r) => !r.name.includes('main') && !r.name.includes('framework')
  );

  return {
    mainChunkSize: mainChunk ? (mainChunk.transferSize / 1024).toFixed(2) + ' KB' : 'N/A',
    frameworkChunkSize: frameworkChunk
      ? (frameworkChunk.transferSize / 1024).toFixed(2) + ' KB'
      : 'N/A',
    dynamicChunksCount: dynamicChunks.length,
    dynamicChunksTotalSize:
      (dynamicChunks.reduce((acc, r) => acc + (r.transferSize || 0), 0) / 1024).toFixed(2) +
      ' KB',
    isCodeSplittingEffective: dynamicChunks.length > 0,
  };
}

/**
 * Initialize performance monitoring for code splitting
 */
export function initCodeSplittingMonitoring() {
  if (typeof window === 'undefined') return;

  // Monitor chunk loading
  monitorChunkLoading();

  // Log bundle metrics on load
  logBundleMetrics();

  // Measure TTI
  measureTTI();

  // Analyze code splitting effectiveness
  window.addEventListener('load', () => {
    setTimeout(() => {
      const analysis = analyzeCodeSplitting();
      if (analysis && process.env.NODE_ENV === 'development') {
        console.group('🔍 Code Splitting Analysis');
        console.log('Main Chunk Size:', analysis.mainChunkSize);
        console.log('Framework Chunk Size:', analysis.frameworkChunkSize);
        console.log('Dynamic Chunks Count:', analysis.dynamicChunksCount);
        console.log('Dynamic Chunks Total Size:', analysis.dynamicChunksTotalSize);
        console.log('Code Splitting Effective:', analysis.isCodeSplittingEffective);
        console.groupEnd();
      }
    }, 2000);
  });
}

