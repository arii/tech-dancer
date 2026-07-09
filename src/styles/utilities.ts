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
  journalCard: "hover:border-accent/50 hover:bg-surface/50 group cursor-pointer",
  muted: "bg-line/50 text-text-dim",
  accent: "bg-accent/5 border-accent/20 text-accent",
  warning: "bg-accent-purple/5 border-accent-purple/20 text-accent-purple",
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
  cardBase: "bg-surface rounded-md shadow-sm card-border",
  filterBase: "border whitespace-nowrap font-semibold uppercase tracking-emphasized text-xs",
  tagBase: "rounded border",
  surface: "bg-surface text-text-main",
  surfaceAlt: "bg-surface-alt text-text-main",
  surfaceCard: "bg-card-bg border-line",
  surfaceContrast: "bg-text-main text-bg",
  surfaceError: "bg-error-surface border-error/20 text-error",
  surfaceBg: "bg-bg text-text-body",
};

export const buttons = {
  base: "font-sans tracking-normal disabled:opacity-50 disabled:cursor-not-allowed",
  action: "font-bold text-sm shrink-0 flex items-center gap-2 disabled:opacity-50",
  returnBase: "group outline-none focus-visible:ring-2 focus-visible:ring-accent",
  returnInner: "group-hover:bg-accent group-hover:text-bg shadow-lg group-hover:shadow-accent/20",
  outline: "border border-line bg-transparent text-sm font-bold tracking-wide rounded-md hover:bg-line/10 hover:border-text-main/50",
  primary: "bg-accent text-bg text-sm font-bold tracking-wide rounded-md hover:bg-accent-sky shadow-sm",
  professional: "bg-text-main text-white font-sans rounded-lg hover:bg-text-main/90 shadow-sm normal-case tracking-normal",
  fab: "bg-accent text-white hover:bg-accent-sky shadow-lg",
  reminder: "bg-accent text-white font-semibold",
};

export const journal = {
  share: "text-text-dim hover:text-accent group",
  tag: "border-line/50 hover:border-accent cursor-default",
  nav: "group cursor-pointer",
};

export const lists = {
  row: "text-left border-l-4 w-full",
};
