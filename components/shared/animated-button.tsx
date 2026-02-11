// Animated button wrapper with hover effects
// Requirements: 9.3

'use client';

import { motion, HTMLMotionProps } from 'framer-motion';
import { ReactNode } from 'react';
import { Button, ButtonProps } from '@/components/ui/button';
import { hoverScale } from '@/lib/animations';

interface AnimatedButtonProps extends ButtonProps {
  children: ReactNode;
  animationType?: 'scale' | 'lift' | 'pulse';
}

/**
 * Animated button component with hover effects
 * Wraps the standard Button component with Framer Motion animations
 */
export function AnimatedButton({
  children,
  animationType = 'scale',
  ...props
}: AnimatedButtonProps) {
  const animations = {
    scale: {
      whileHover: { scale: 1.05 },
      whileTap: { scale: 0.95 },
      transition: { duration: 0.2 },
    },
    lift: {
      whileHover: { y: -4, scale: 1.02 },
      whileTap: { y: 0, scale: 0.98 },
      transition: { duration: 0.2 },
    },
    pulse: {
      whileHover: { scale: [1, 1.05, 1] },
      transition: { duration: 0.6, repeat: Infinity },
    },
  };

  const selectedAnimation = animations[animationType];

  return (
    <motion.div
      {...selectedAnimation}
      style={{ display: 'inline-block' }}
    >
      <Button {...props}>{children}</Button>
    </motion.div>
  );
}
