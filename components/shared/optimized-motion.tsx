// Performance-optimized motion wrapper
// Requirements: 9.5

'use client';

import { motion, MotionProps } from 'framer-motion';
import { ReactNode, useEffect, useRef } from 'react';
import { prefersReducedMotion, enableGPUAcceleration } from '@/lib/performance';

interface OptimizedMotionProps extends MotionProps {
  children: ReactNode;
  enableGPU?: boolean;
  className?: string;
}

/**
 * Performance-optimized motion component
 * Automatically handles GPU acceleration and reduced motion preferences
 */
export function OptimizedMotion({
  children,
  enableGPU = true,
  className,
  ...motionProps
}: OptimizedMotionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = prefersReducedMotion();

  useEffect(() => {
    if (enableGPU && ref.current) {
      enableGPUAcceleration(ref.current);
    }
  }, [enableGPU]);

  // Disable animations if user prefers reduced motion
  if (reducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      {...motionProps}
      style={{
        ...motionProps.style,
        willChange: 'transform, opacity',
      }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Optimized motion div with automatic will-change management
 */
export function OptimizedMotionDiv({
  children,
  className,
  ...props
}: OptimizedMotionProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Add will-change on mount
    element.style.willChange = 'transform, opacity';

    // Remove will-change after animation
    const timer = setTimeout(() => {
      element.style.willChange = 'auto';
    }, 1000);

    return () => {
      clearTimeout(timer);
      element.style.willChange = 'auto';
    };
  }, []);

  return (
    <motion.div ref={ref} className={className} {...props}>
      {children}
    </motion.div>
  );
}
