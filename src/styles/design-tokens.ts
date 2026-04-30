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
};


export const stroke = {
  thin: "stroke-[0.5]",
  thick: "stroke-[1.5]",
};

export const iconSizes = {
  xs: 12,
  sm: 16,
  md: 20,
  lg: 24,
  xl: 32,
};

export const zIndex = {
  hide: "hide",
  base: "base",
  docked: "docked",
  dropdown: "dropdown",
  sticky: "sticky",
  overlay: "overlay",
  modal: "modal",
  popover: "popover",
  skipLink: "skip-link",
  toast: "toast",
  top: "top",
  search: "search",
};

export const tracking = {
  tighter: "tracking-tighter",
  tight: "tracking-tight",
  normal: "tracking-normal",
  wide: "tracking-wide",
  wider: "tracking-wider",
  widest: "tracking-widest",
  "wide-editorial": "tracking-[0.2em]",
  emphasized: "tracking-[0.15em]",
  utility: "tracking-[3px]",
  label: "tracking-[2px]",
};

export const typography = {
  headline: "font-display font-bold tracking-tighter leading-[0.9]",
  display: "font-display font-bold tracking-tight leading-none",
  body: "font-sans leading-relaxed text-text-body max-w-[65ch]",
  mono: "font-mono tracking-widest uppercase",
  utility: `font-mono ${tracking.utility} uppercase`,
  label: `font-mono font-bold uppercase ${tracking.label}`,
  micro: "font-mono uppercase tracking-widest",
  tight: "tracking-[0.15em] uppercase",
  content: "font-sans leading-relaxed text-text-body max-w-[70ch]",
  headerAccent: `font-mono font-bold ${tracking["wide-editorial"]} uppercase text-accent`,
};

export const typeSizes = {
  micro: "text-micro",
  tiny: "text-tiny",
  xs: "text-xs",
  sm: "text-sm",
  base: "text-base",
  lg: "text-lg",
  xl: "text-xl",
  "2xl": "text-2xl",
  "3xl": "text-3xl",
  "4xl": "text-4xl",
  "5xl": "text-fluid-5",
  "6xl": "text-fluid-6",
  "7xl": "text-fluid-7",
  "8xl": "text-fluid-8",
  "9xl": "text-fluid-9",
  "fluid-5": "text-3xl sm:text-4xl md:text-5xl",
  "fluid-6": "text-4xl sm:text-5xl md:text-6xl",
  "fluid-7": "text-5xl sm:text-6xl md:text-7xl",
  "fluid-8": "text-6xl sm:text-7xl md:text-8xl",
  "fluid-9": "text-7xl sm:text-8xl md:text-9xl",
};
