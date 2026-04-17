/**
 * Design Tokens for the Systems Console.
 * Standardizes radius, spacing, and border treatments to ensure "Industrial" 
 * and "Elevated Minimalism" consistency across all components.
 */

export const radius = {
  none: "rounded-none",
  sm: "rounded-[2px]", // Industrial/Technical
  md: "rounded-md",
  lg: "rounded-lg",
  full: "rounded-full",
};

export const borders = {
  none: "border-0",
  default: "border border-line",
  accent: "border border-accent/20",
  brand: "border border-accent-brand/20",
  thick: "border-2 border-line",
};

export const spacing = {
  0: "0",
  xs: "1",
  sm: "2",
  md: "4",
  lg: "8",
  xl: "12",
  "2xl": "24",
  "3xl": "32",
};

export const animation = {
  fast: "duration-150",
  mechanical: "ease-[steps(4,end)]",
  smooth: "ease-[cubic-bezier(0.16,1,0.3,1)]", // ease-out-expo
};

/**
 * Common Layout Primitives (encoded as Tailwind fragments)
 */
export const layout = {
  appShell: "flex min-h-screen bg-bg",
  navRail: "nav-rail hidden md:flex flex-col justify-between h-screen sticky top-0",
  mobileHeader: "md:hidden fixed top-0 left-0 right-0 h-16 bg-surface z-[110] flex items-center justify-between px-6 border-b",
  panel: "panel h-full overflow-y-auto",
  card: "bg-surface border border-line rounded-none transition-all duration-300",
  interactive: "scanline-hover cursor-pointer",
  grid: "grid grid-cols-1 md:grid-cols-12 gap-8",
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
  none: "shadow-none",
  sm: "shadow-sm",
  md: "shadow-md",
  lg: "shadow-lg",
  overlay: "shadow-[0_-10px_40px_rgba(0,0,0,0.1)]",
};

export const typography = {
  headline: "font-display font-bold uppercase tracking-tighter leading-[0.9]",
  display: "font-display font-bold uppercase tracking-tight leading-none",
  body: "font-sans leading-relaxed text-text-body max-w-[65ch]",
  mono: "font-mono tracking-widest uppercase",
  system: "font-mono tracking-[3px] uppercase",
  label: "font-mono font-bold uppercase tracking-[2px]",
  micro: "font-mono uppercase tracking-widest",
};

export const typeSizes = {
  micro: "text-[8px]",
  sys: "text-[10px]",
  xs: "text-[11px]",
  sm: "text-xs",
  base: "text-sm",
  md: "text-[15px]",
  lg: "text-base",
  xl: "text-lg",
  "2xl": "text-xl",
  "3xl": "text-2xl",
  "4xl": "text-3xl",
  "7xl": "text-5xl md:text-7xl",
  "8xl": "text-6xl md:text-8xl",
  "9xl": "text-7xl md:text-9xl",
};

export const zIndices = {
  base: 0,
  nav: 100,
  header: 110,
  overlay: 150,
  max: 999,
};
