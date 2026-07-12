/**
 * Standardized Motion Tokens.
 * Ensures consistent transitions across the entire application shell.
 */
export const motionTokens = {
  page: {
    initial: { opacity: 0, y: 8 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0 },
    transition: {
      duration: 0.3,
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
  },
  staggerContainer: {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1
      }
    }
  },
  staggerItem: {
    initial: { opacity: 0, y: 10 },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: [0.25, 1, 0.5, 1] as [number, number, number, number]
      }
    }
  },
  skeleton: {
    pulse: "animate-pulse",
    opacity: "opacity-50"
  }
} as const;
