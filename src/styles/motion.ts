/**
 * Centralized Motion Variants for tech-dancer.
 * Defines "The Ariel Motion" - a high-end, bespoke feel for transitions.
 */

export const springTransition = {
  type: "spring",
  damping: 25,
  stiffness: 120,
  mass: 0.8,
};

export const easeOutExpo = [0.16, 1, 0.3, 1]; // easeOutExpo

// Reduced motion check (safe for client-side environments)
const isReducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.4, ease: easeOutExpo },
};

export const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 20 },
  transition: { 
    duration: isReducedMotion ? 0 : 0.5, 
    ease: easeOutExpo
  },
};

export const staggerContainer = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      staggerChildren: isReducedMotion ? 0 : 0.05,
      delayChildren: 0.1,
      staggerDirection: isReducedMotion ? 0 : 1
    },
  },
};

export const scaleUp = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.95 },
  transition: { 
    duration: isReducedMotion ? 0 : 0.4, 
    ease: easeOutExpo
  },
};

export const slideInRight = {
  initial: { opacity: 0, x: 30 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 30 },
  transition: { duration: 0.5, ease: easeOutExpo },
};

export const hoverLift = {
  whileHover: { y: -4, transition: { duration: 0.2, ease: "easeOut" } },
  whileTap: { scale: 0.98 },
};

export const motionTokens = {
  springTransition,
  easeOutExpo,
  fadeIn,
  fadeInUp,
  staggerContainer,
  scaleUp,
  slideInRight,
  hoverLift,
  // Polymorphic mappings for legacy component support
  page: fadeInUp,
  overlay: {
    initial: { y: 100 },
    animate: { y: 0 },
    exit: { y: 100 },
    transition: { duration: 0.4, ease: easeOutExpo }
  },
  staggerItem: fadeInUp,
  hover: {
    scale: 1.02,
    transition: { duration: 0.2 }

  }
};
