// Reusable parallax component for background elements
// Requirements: 9.2

'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { ReactNode, useRef } from 'react';

interface ParallaxProps {
  children: ReactNode;
  speed?: number;
  direction?: 'up' | 'down';
  className?: string;
}

/**
 * Parallax component that creates scroll-based motion effects
 * Best used for background elements and decorative content
 */
export function Parallax({
  children,
  speed = 0.5,
  direction = 'up',
  className,
}: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const multiplier = direction === 'up' ? -100 : 100;
  const y = useTransform(scrollYProgress, [0, 1], [0, multiplier * speed]);

  return (
    <div ref={ref} className={className}>
      <motion.div style={{ y }}>{children}</motion.div>
    </div>
  );
}

/**
 * Parallax component with scale effect
 */
export function ParallaxScale({
  children,
  minScale = 0.8,
  maxScale = 1.2,
  className,
}: {
  children: ReactNode;
  minScale?: number;
  maxScale?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [minScale, maxScale]);

  return (
    <div ref={ref} className={className}>
      <motion.div style={{ scale }}>{children}</motion.div>
    </div>
  );
}

/**
 * Parallax component with opacity effect
 */
export function ParallaxOpacity({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0]);

  return (
    <div ref={ref} className={className}>
      <motion.div style={{ opacity }}>{children}</motion.div>
    </div>
  );
}
