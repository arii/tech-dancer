/**
 * Shared Tailwind utility constants for BoomTick UI.
 * Centralizes repeated utility strings to improve maintainability and consistency.
 */

export const transitions = {
  default: "transition-all duration-200",
  slow: "transition-all duration-300",
  fast: "transition-all duration-150",
  colors: "transition-colors duration-200",
  opacity: "transition-opacity duration-200",
  transform: "transition-transform duration-200",
};

export const interaction = {
  active: "scale-active",
  tapTarget: "tap-target",
  hoverMuted: "hover:bg-line/10",
  hoverAccent: "hover:border-accent hover:bg-accent/5",
  hoverOpacity: "hover:opacity-90",
};

export const typography = {
  label: "text-tiny font-mono font-bold uppercase tracking-widest",
  h1: "font-display font-black tracking-tighter leading-line-height-tightest",
  h2: "font-display font-bold tracking-tight leading-tight",
  h3: "font-display font-semibold tracking-tight leading-snug",
  body: "font-sans leading-relaxed text-text-body",
  mono: "font-mono tracking-widest uppercase",
  utility: "font-semibold uppercase tracking-wider",
};

export const layouts = {
  flexCenter: "flex items-center justify-center",
  inlineFlexCenter: "inline-flex items-center justify-center",
  stack: "flex flex-col",
};
