// Custom hook for parallax scroll effects
// Requirements: 9.2

'use client';

import { useEffect, useState, RefObject } from 'react';
import { useScroll, useTransform, MotionValue } from 'framer-motion';

interface UseParallaxOptions {
  speed?: number; // Multiplier for parallax effect (0.5 = half speed, 2 = double speed)
  direction?: 'up' | 'down';
}

/**
 * Hook for creating parallax scroll effects
 * Returns a motion value that can be used with Framer Motion
 */
export function useParallax(
  ref: RefObject<HTMLElement>,
  options: UseParallaxOptions = {}
): MotionValue<number> {
  const { speed = 0.5, direction = 'up' } = options;
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  // Calculate parallax offset based on scroll progress
  const multiplier = direction === 'up' ? -100 : 100;
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [0, multiplier * speed]
  );

  return y;
}

/**
 * Hook for horizontal parallax effects
 */
export function useParallaxHorizontal(
  ref: RefObject<HTMLElement>,
  options: UseParallaxOptions = {}
): MotionValue<number> {
  const { speed = 0.5, direction = 'up' } = options;
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  // Calculate horizontal parallax offset
  const multiplier = direction === 'up' ? -100 : 100;
  const x = useTransform(
    scrollYProgress,
    [0, 1],
    [0, multiplier * speed]
  );

  return x;
}

/**
 * Hook for scale parallax effects (zoom in/out on scroll)
 */
export function useParallaxScale(
  ref: RefObject<HTMLElement>,
  options: { minScale?: number; maxScale?: number } = {}
): MotionValue<number> {
  const { minScale = 0.8, maxScale = 1.2 } = options;
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [minScale, maxScale]);

  return scale;
}

/**
 * Hook for opacity parallax effects (fade in/out on scroll)
 */
export function useParallaxOpacity(
  ref: RefObject<HTMLElement>,
  options: { minOpacity?: number; maxOpacity?: number } = {}
): MotionValue<number> {
  const { minOpacity = 0, maxOpacity = 1 } = options;
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const opacity = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [minOpacity, maxOpacity, minOpacity]
  );

  return opacity;
}

/**
 * Simple scroll-based parallax without Framer Motion
 * Useful for background elements
 */
export function useSimpleParallax(speed: number = 0.5) {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setOffset(window.scrollY * speed);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed]);

  return offset;
}
