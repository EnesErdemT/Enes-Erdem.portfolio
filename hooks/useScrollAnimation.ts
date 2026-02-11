// Custom hook for scroll-triggered animations using Intersection Observer
// Requirements: 9.1

import { useEffect, useRef, useState } from 'react';

interface UseScrollAnimationOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

/**
 * Hook to detect when an element enters the viewport
 * Triggers animations when element becomes visible
 */
export function useScrollAnimation(options: UseScrollAnimationOptions = {}) {
  const {
    threshold = 0.1,
    rootMargin = '-100px',
    triggerOnce = true,
  } = options;

  const ref = useRef<HTMLElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          if (triggerOnce) {
            observer.unobserve(element);
          }
        } else if (!triggerOnce) {
          setIsInView(false);
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [threshold, rootMargin, triggerOnce]);

  return { ref, isInView };
}

/**
 * Hook for staggered animations on multiple elements
 */
export function useStaggerAnimation(itemCount: number, delay: number = 0.1) {
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set());
  const { ref, isInView } = useScrollAnimation();

  useEffect(() => {
    if (isInView) {
      // Stagger the appearance of items
      for (let i = 0; i < itemCount; i++) {
        setTimeout(() => {
          setVisibleItems((prev) => new Set(prev).add(i));
        }, i * delay * 1000);
      }
    }
  }, [isInView, itemCount, delay]);

  return { ref, visibleItems, isInView };
}
