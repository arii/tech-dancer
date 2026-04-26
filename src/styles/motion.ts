import { fadeInUp, staggerContainer, staggerItem } from "@/lib/animations";

/**
 * Standardized Motion Tokens.
 * Ensures consistent transitions across the entire application shell.
 */
export const motionTokens = {
  page: fadeInUp,
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
  staggerContainer,
  staggerItem
};
