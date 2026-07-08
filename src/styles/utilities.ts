/**
 * Shared Tailwind utility constants for BoomTick UI.
 * Centralizes repeated utility strings to improve maintainability and consistency.
 */

export const transitions = {
  default: "motion-safe:transition-all motion-safe:duration-200 motion-reduce:transition-none",
  slow: "motion-safe:transition-all motion-safe:duration-300 motion-reduce:transition-none",
  fast: "motion-safe:transition-all motion-safe:duration-150 motion-reduce:transition-none",
  colors: "motion-safe:transition-colors motion-safe:duration-200 motion-reduce:transition-none",
  opacity: "motion-safe:transition-opacity motion-safe:duration-200 motion-reduce:transition-none",
  transform: "motion-safe:transition-transform motion-safe:duration-200 motion-reduce:transition-none",
};

export const interaction = {
  active: "scale-active",
  tapTarget: "tap-target",
  hoverMuted: "hover:bg-line/10",
  hoverAccent: "hover:border-accent hover:bg-accent/5",
  hoverOpacity: "hover:opacity-90",
  card: "group relative bg-surface",
  cardHover: "hover:border-accent/40",
};

export const typography = {
  labelSmall: "text-tiny font-mono font-bold uppercase tracking-widest",
  h1: "font-display font-black tracking-tighter leading-tightest",
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
