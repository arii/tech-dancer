/**
 * Standardized Variant Contracts for BoomTick UI.
 * Ensures all components share a common mental model for intent, surface, and emphasis.
 */
export const variants = {
  surface: {
    default: "bg-surface text-text-main",
    muted: "bg-line/50 text-text-dim",
    accent: "bg-accent/5 border-accent/20 text-accent",
    alt: "bg-surface-alt text-text-main",
    card: "bg-card-bg border-line",
    contrast: "bg-text-main text-bg",
    success: "bg-accent/5 border-accent/20 text-accent",
    warning: "bg-accent-purple/5 border-accent-purple/20 text-accent-purple",
    error: "bg-error-surface border-error/20 text-error",
    bg: "bg-bg text-text-body",
  },
  intent: {
    default: "text-text-main",
    success: "text-accent",
    danger: "text-error",
    warning: "text-amber-500",
  },
  emphasis: {
    solid: "bg-text-main text-bg border-transparent",
    outline: "border border-line bg-transparent text-sm font-bold tracking-wide rounded-md hover:bg-line/10 hover:border-text-main/50 transition-colors active:scale-[0.98]",
    ghost: "bg-transparent hover:bg-line/10",
    primary: "bg-accent text-bg text-sm font-bold tracking-wide rounded-md hover:bg-accent-sky transition-colors active:scale-[0.98] shadow-sm",
    professional: "bg-text-main text-white font-sans rounded-lg hover:bg-text-main/90 transition-all shadow-sm active:scale-[0.98] normal-case tracking-normal",
    fab: "bg-surface-alt text-accent border border-accent/20 shadow-lg hover:bg-accent hover:text-bg transition-all duration-300 rounded-none",
    reminder: "bg-accent-purple text-bg hover:bg-accent-purple/90 shadow-lg h-14 w-full",
  },
  radius: {
    none: "rounded-none",
    industrial: "rounded-[2px]",
    lg: "rounded-lg",
    xl: "rounded-xl",
  }
};
