/**
 * Standardized Motion Tokens.
 * Ensures consistent transitions across the entire application shell.
 */
const shouldReduceMotion = typeof window !== 'undefined'
  ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
  : false;

export const motionTokens = {
  page: {
    initial: shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 8 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0 },
    transition: { 
      duration: shouldReduceMotion ? 0.1 : 0.3,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number] 
    }
  },
  overlay: {
    initial: { y: 100 },
    animate: { y: 0 },
    exit: { y: 100 },
    transition: { duration: 0.4, ease: "easeOut" }
  },
  hover: {
    scale: 1.02,
    transition: { duration: 0.2 }
  }
};
