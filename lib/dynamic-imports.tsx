// Dynamic import utilities for code splitting
// Requirements: Performance optimization

import dynamic from 'next/dynamic';
import type { ComponentType, ReactNode } from 'react';

/**
 * Loading skeleton for dynamically imported sections
 */
export function SectionLoadingSkeleton() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="animate-pulse space-y-4">
          <div className="h-12 bg-muted rounded w-1/3 mx-auto" />
          <div className="h-64 bg-muted rounded" />
        </div>
      </div>
    </section>
  );
}

/**
 * Minimal loading skeleton for smaller components
 */
export function ComponentLoadingSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="h-32 bg-muted rounded" />
    </div>
  );
}

/**
 * Create a dynamically imported component with default loading state
 */
export function createDynamicComponent<T extends ComponentType<any>>(
  importFn: () => Promise<{ default: T } | T>,
  options?: {
    loading?: () => ReactNode;
    ssr?: boolean;
  }
) {
  return dynamic(
    async () => {
      const mod = await importFn();
      // Handle both default exports and named exports
      return 'default' in mod ? mod : { default: mod as T };
    },
    {
      loading: options?.loading || SectionLoadingSkeleton,
      ssr: options?.ssr ?? true,
    }
  );
}

/**
 * Preload a dynamic component
 * Useful for prefetching components that will be needed soon
 */
export function preloadComponent(importFn: () => Promise<any>) {
  // Trigger the import but don't wait for it
  importFn().catch(() => {
    // Silently fail - component will be loaded when actually needed
  });
}

/**
 * Create a lazy-loaded modal component
 * Modals are typically not needed on initial page load
 */
export function createLazyModal<T extends ComponentType<any>>(
  importFn: () => Promise<{ default: T } | T>
) {
  return dynamic(
    async () => {
      const mod = await importFn();
      return 'default' in mod ? mod : { default: mod as T };
    },
    {
      loading: () => null, // No loading state for modals
      ssr: false, // Modals don't need SSR
    }
  );
}

/**
 * Dynamically import a heavy library only when needed
 * Example: Chart libraries, PDF generators, etc.
 */
export async function loadHeavyLibrary<T>(
  importFn: () => Promise<T>
): Promise<T> {
  try {
    return await importFn();
  } catch (error) {
    console.error('Failed to load library:', error);
    throw error;
  }
}

/**
 * Route-based code splitting helper
 * Automatically creates dynamic imports for route components
 */
export function createRouteComponent<T extends ComponentType<any>>(
  importFn: () => Promise<{ default: T } | T>
) {
  return dynamic(
    async () => {
      const mod = await importFn();
      return 'default' in mod ? mod : { default: mod as T };
    },
    {
      loading: () => (
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
        </div>
      ),
      ssr: true,
    }
  );
}

/**
 * Intersection Observer based lazy loading
 * Load component only when it enters viewport
 */
export function createIntersectionComponent<T extends ComponentType<any>>(
  importFn: () => Promise<{ default: T } | T>,
  options?: IntersectionObserverInit
) {
  return dynamic(
    async () => {
      const mod = await importFn();
      return 'default' in mod ? mod : { default: mod as T };
    },
    {
      loading: SectionLoadingSkeleton,
      ssr: false, // Don't SSR components that use Intersection Observer
    }
  );
}

/**
 * Bundle size analyzer helper
 * Log the size of dynamically imported chunks (development only)
 */
export function logChunkSize(chunkName: string) {
  if (process.env.NODE_ENV === 'development') {
    console.log(`Loading chunk: ${chunkName}`);
  }
}

/**
 * Prefetch multiple components in parallel
 */
export function prefetchComponents(
  importFns: Array<() => Promise<any>>
): Promise<void> {
  return Promise.all(
    importFns.map((fn) =>
      fn().catch(() => {
        // Silently fail
      })
    )
  ).then(() => undefined);
}

/**
 * Conditional dynamic import based on feature flag or condition
 */
export function createConditionalComponent<T extends ComponentType<any>>(
  condition: boolean | (() => boolean),
  importFn: () => Promise<{ default: T } | T>,
  fallback?: () => ReactNode
) {
  const shouldLoad = typeof condition === 'function' ? condition() : condition;

  if (!shouldLoad && fallback) {
    return fallback as unknown as T;
  }

  return dynamic(
    async () => {
      if (!shouldLoad) {
        // Return empty component if condition is false
        return { default: (() => null) as unknown as T };
      }
      const mod = await importFn();
      return 'default' in mod ? mod : { default: mod as T };
    },
    {
      loading: ComponentLoadingSkeleton,
      ssr: shouldLoad,
    }
  );
}
