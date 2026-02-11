// Animation variants for Framer Motion
// Requirements: 9.1, 9.2, 9.3, 9.4

import { Variants } from 'framer-motion';

// Fade in animation - used for general content reveal
export const fadeIn: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
  exit: { 
    opacity: 0, 
    y: -20,
    transition: {
      duration: 0.4,
    },
  },
};

// Slide up animation - used for scroll-triggered content
export const slideUp: Variants = {
  initial: { opacity: 0, y: 50 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.25, 0.46, 0.45, 0.94], // Custom easing
    },
  },
  exit: { 
    opacity: 0, 
    y: 50,
    transition: {
      duration: 0.5,
    },
  },
};

// Slide in from left - used for timeline items
export const slideInLeft: Variants = {
  initial: { opacity: 0, x: -50 },
  animate: { 
    opacity: 1, 
    x: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
  exit: { 
    opacity: 0, 
    x: -50,
    transition: {
      duration: 0.4,
    },
  },
};

// Slide in from right - used for timeline items
export const slideInRight: Variants = {
  initial: { opacity: 0, x: 50 },
  animate: { 
    opacity: 1, 
    x: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
  exit: { 
    opacity: 0, 
    x: 50,
    transition: {
      duration: 0.4,
    },
  },
};

// Scale in animation - used for cards and images
export const scaleIn: Variants = {
  initial: { opacity: 0, scale: 0.8 },
  animate: { 
    opacity: 1, 
    scale: 1,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
  exit: { 
    opacity: 0, 
    scale: 0.8,
    transition: {
      duration: 0.4,
    },
  },
};

// Stagger container - used for lists and grids
export const staggerContainer: Variants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

// Stagger item - used with stagger container
export const staggerItem: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

// Hover scale animation - used for interactive elements
export const hoverScale = {
  scale: 1.05,
  transition: {
    duration: 0.3,
    ease: 'easeInOut',
  },
};

// Hover lift animation - used for cards
export const hoverLift = {
  y: -8,
  scale: 1.02,
  transition: {
    duration: 0.3,
    ease: 'easeOut' as const,
  },
};

// Parallax scroll effect - used for background elements
export const parallaxScroll = (offset: number = 50) => ({
  y: offset,
  transition: {
    duration: 0,
  },
});

// Typing effect animation - used for text reveal
export const typingEffect: Variants = {
  initial: { opacity: 0 },
  animate: { 
    opacity: 1,
    transition: {
      duration: 0.1,
    },
  },
};

// Bounce animation - used for scroll indicators
export const bounce: Variants = {
  animate: {
    y: [0, 10, 0],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
};

// Pulse animation - used for attention-grabbing elements
export const pulse: Variants = {
  animate: {
    scale: [1, 1.05, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
};

// Rotate animation - used for loading or decorative elements
export const rotate: Variants = {
  animate: {
    rotate: 360,
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: 'linear',
    },
  },
};

// Page transition variants
export const pageTransition: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
  exit: { 
    opacity: 0, 
    y: -20,
    transition: {
      duration: 0.4,
    },
  },
};

// Modal animation variants
export const modalVariants: Variants = {
  initial: { opacity: 0, scale: 0.9 },
  animate: { 
    opacity: 1, 
    scale: 1,
    transition: {
      duration: 0.3,
      ease: 'easeOut',
    },
  },
  exit: { 
    opacity: 0, 
    scale: 0.9,
    transition: {
      duration: 0.2,
    },
  },
};

// Backdrop animation variants
export const backdropVariants: Variants = {
  initial: { opacity: 0 },
  animate: { 
    opacity: 1,
    transition: {
      duration: 0.3,
    },
  },
  exit: { 
    opacity: 0,
    transition: {
      duration: 0.2,
    },
  },
};
