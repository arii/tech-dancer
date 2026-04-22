/**
 * Centralized Motion Variants for tech-dancer.
 * Defines "The Ariel Motion" - a high-end, bespoke feel for transitions.
 */

export const arielTransition = {
  type: "spring",
  damping: 25,
  stiffness: 120,
  mass: 0.8,
};

export const arielEase = [0.16, 1, 0.3, 1]; // easeOutExpo

export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.4, ease: arielEase },
};

export const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 20 },
  transition: { duration: 0.5, ease: arielEase },
};

export const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.05,
    },
  },
};

export const scaleUp = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.95 },
  transition: { duration: 0.4, ease: arielEase },
};

export const slideInRight = {
  initial: { opacity: 0, x: 30 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 30 },
  transition: { duration: 0.5, ease: arielEase },
};

export const hoverLift = {
  whileHover: { y: -4, transition: { duration: 0.2, ease: "easeOut" } },
  whileTap: { scale: 0.98 },
};

export const motionTokens = {
  arielTransition,
  arielEase,
  fadeIn,
  fadeInUp,
  staggerContainer,
  scaleUp,
  slideInRight,
  hoverLift,
  // Existing tokens expected by components
  page: fadeInUp,
  overlay: fadeInUp,
};
