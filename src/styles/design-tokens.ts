/**
 * Design Tokens for the Systems Console.
 * Standardizes radius, spacing, and border treatments to ensure "Industrial" 
 * and "Elevated Minimalism" consistency across all components.
 */

export const radius = {
  none: "rounded-none",
  industrial: "rounded-[2px]", // Subtle 2px radius for a technical feel
  sm: "rounded-sm",
  md: "rounded-md",
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

export const typography = {
  headline: "font-display font-bold uppercase tracking-tighter leading-[0.9]",
  body: "font-sans leading-relaxed text-text-body max-w-[65ch]",
  mono: "font-mono text-[10px] tracking-widest uppercase",
};
