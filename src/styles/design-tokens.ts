/**
 * Design Tokens for the Portfolio.
 * Standardizes radius, spacing, and border treatments to ensure
 * consistency across all components.
 */



export const spacing = {
  container: "p-container-sm md:p-container-md",
  card: "p-card",
  compact: "p-compact",
  nav: "p-nav",
  emailBar: "py-email-bar-y px-email-bar-x-sm md:px-email-bar-x-md",
  hero: "py-hero",
  comfort: "py-comfort",
  endPad: "pb-end-pad",
};

export const animation = {
  fast: "duration-fast",
  normal: "duration-normal",
  smooth: "ease-smooth",
  // Framer Motion requires numeric arrays for JS-driven easing
  ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
  revealDistance: "var(--reveal-distance)",
};

/**
 * Common Layout Primitives (encoded as Tailwind fragments)
 */
export const layout = {
  root: "flex min-h-screen bg-bg",
  navRail: "nav-rail hidden lg:flex flex-col justify-between min-h-screen sticky top-0",
  mobileHeader: "lg:hidden fixed top-0 left-0 right-0 h-16 bg-surface z-[110] flex items-center justify-between px-6 border-b border-line w-full",
  panel: "panel h-full overflow-y-auto w-full",
  card: "bg-surface border border-line rounded-none transition-all duration-300 w-full",
  interactive: "cursor-pointer",
  grid: "grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 w-full",
  section: "mt-24 space-y-8",
  divider: "border-b border-line pb-4 flex items-end justify-between",
};

export const inputs = {
  base: "w-full bg-bg border border-line px-4 py-3 text-sm font-sans focus:outline-none focus:border-accent transition-all",
  label: "text-tiny font-mono font-bold uppercase tracking-widest text-text-dim block mb-2",
  select: "bg-bg border border-line px-3 py-1 text-tiny font-mono font-bold uppercase tracking-widest text-accent focus:outline-none focus:border-accent",
  error: "border-error focus:border-error focus:ring-error/20",
};


export const shadows = {
  topOverlay: "shadow-top-overlay",
  standard: "shadow-sm",
  glow: "shadow-[0_0_15px_var(--color-accent-shadow)]",
};


