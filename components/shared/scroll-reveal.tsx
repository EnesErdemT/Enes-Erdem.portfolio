// Reusable component for scroll-triggered animations
// Requirements: 9.1

'use client';

import { motion, Variants } from 'framer-motion';
import { ReactNode } from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { fadeIn, slideUp, scaleIn } from '@/lib/animations';

interface ScrollRevealProps {
  children: ReactNode;
  variant?: 'fadeIn' | 'slideUp' | 'scaleIn';
  delay?: number;
  duration?: number;
  className?: string;
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

const variantMap: Record<string, Variants> = {
  fadeIn,
  slideUp,
  scaleIn,
};

/**
 * ScrollReveal component that animates children when they enter viewport
 * Uses Intersection Observer for efficient scroll detection
 */
export function ScrollReveal({
  children,
  variant = 'fadeIn',
  delay = 0,
  duration,
  className,
  threshold = 0.1,
  rootMargin = '-100px',
  triggerOnce = true,
}: ScrollRevealProps) {
  const { ref, isInView } = useScrollAnimation({
    threshold,
    rootMargin,
    triggerOnce,
  });

  const selectedVariant = variantMap[variant];

  // Override duration if provided
  const customVariant = duration
    ? {
        ...selectedVariant,
        animate: {
          ...selectedVariant.animate,
          transition: {
            ...(selectedVariant.animate as any).transition,
            duration,
          },
        },
      }
    : selectedVariant;

  return (
    <motion.div
      ref={ref as any}
      initial="initial"
      animate={isInView ? 'animate' : 'initial'}
      variants={customVariant}
      transition={{ delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
