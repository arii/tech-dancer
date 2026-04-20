/**
 * Design Tokens for the Portfolio.
 * Standardizes radius, spacing, and border treatments to ensure
 * consistency across all components.
 */

export const radius = {
  none: "rounded-none",
  subtle: "rounded-[2px]", // Subtle 2px radius
  sm: "rounded-sm",
  md: "rounded-md",
  lg: "rounded-lg",
};

export const borders = {
  default: "border border-line",
  accent: "border border-accent/20",
  brand: "border border-accent-brand/30",
  thick: "border-2 border-line",
};

export const spacing = {
  container: "p-6 md:p-12",
  card: "p-8",
  compact: "p-4",
  nav: "p-8",
  emailBar: "py-4 px-6 md:px-12",
  hero: "py-20",
  comfort: "py-12",
  endPad: "pb-32",
};

export const animation = {
  fast: "duration-150",
  normal: "duration-300",
  smooth: "ease-[cubic-bezier(0.16,1,0.3,1)]", // ease-out-expo
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
  label: "text-[10px] font-mono font-bold uppercase tracking-widest text-text-dim block mb-2",
  select: "bg-bg border border-line px-3 py-1 text-[10px] font-mono font-bold uppercase tracking-widest text-accent focus:outline-none focus:border-accent",
};

export const buttons = {
  primary: "w-full bg-text-main text-bg py-4 font-bold uppercase tracking-[3px] text-xs hover:bg-accent transition-all flex items-center justify-center gap-3",
  ghost: "p-2 border border-line hover:border-accent-brand hover:text-accent-brand transition-colors",
  tab: "px-6 py-3 text-[10px] font-mono font-bold uppercase tracking-widest transition-all",
};

export const shadows = {
  topOverlay: "shadow-[0_-10px_40px_rgba(0,0,0,0.1)]",
  standard: "shadow-sm",
};

export const zIndex = {
  hide: -1,
  base: 0,
  docked: 10,
  dropdown: 20,
  sticky: 30,
  overlay: 40,
  modal: 50,
  popover: 60,
  skipLink: 70,
  toast: 80,
  top: 100,
};

export const typography = {
  headline: "font-display font-bold uppercase tracking-tighter leading-[0.9]",
  display: "font-display font-bold uppercase tracking-tight leading-none",
  body: "font-sans leading-relaxed text-text-body max-w-[65ch]",
  mono: "font-mono tracking-widest uppercase",
  utility: "font-mono tracking-[3px] uppercase",
  label: "font-mono font-bold uppercase tracking-[2px]",
  micro: "font-mono uppercase tracking-widest",
};

export const typeSizes = {
  micro: "text-[8px]",
  tiny: "text-[10px]",
  xs: "text-xs",
  sm: "text-sm",
  base: "text-base",
  lg: "text-lg",
  xl: "text-xl",
  "2xl": "text-2xl",
  "3xl": "text-3xl",
  "4xl": "text-4xl",
  "5xl": "text-5xl",
  "6xl": "text-6xl",
  "7xl": "text-5xl md:text-7xl",
  "8xl": "text-6xl md:text-8xl",
  "9xl": "text-7xl md:text-9xl",
};
