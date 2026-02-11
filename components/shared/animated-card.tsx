// Animated card wrapper with hover effects
// Requirements: 9.3

'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import { Card } from '@/components/ui/card';
import { hoverLift } from '@/lib/animations';

interface AnimatedCardProps {
  children: ReactNode;
  enableHover?: boolean;
  hoverEffect?: 'lift' | 'scale' | 'glow';
  className?: string;
}

/**
 * Animated card component with hover effects
 * Wraps the standard Card component with Framer Motion animations
 */
export function AnimatedCard({
  children,
  enableHover = true,
  hoverEffect = 'lift',
  className,
}: AnimatedCardProps) {
  const hoverAnimations = {
    lift: {
      whileHover: hoverLift,
    },
    scale: {
      whileHover: { scale: 1.03 },
      transition: { duration: 0.3 },
    },
    glow: {
      whileHover: { 
        boxShadow: '0 0 20px rgba(var(--primary), 0.5)',
        scale: 1.02,
      },
      transition: { duration: 0.3 },
    },
  };

  const animation = enableHover ? hoverAnimations[hoverEffect] : {};

  return (
    <motion.div {...animation}>
      <Card className={className}>
        {children}
      </Card>
    </motion.div>
  );
}
