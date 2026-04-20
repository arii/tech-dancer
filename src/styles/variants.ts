import { typography } from "./design-tokens";

/**
 * Standardized Variant Contracts for the Systems Console.
 * Ensures all components share a common mental model for intent, surface, and emphasis.
 */
export const variants = {
  surface: {
    default: "bg-surface text-text-main",
    muted: "bg-line/50 text-text-dim",
    accent: "bg-accent-brand/5 border-accent-brand/20 text-accent-brand",
    card: "bg-card-bg border-line",
    contrast: "bg-text-main text-bg",
  },
  intent: {
    default: "text-text-main",
    success: "text-accent-brand", 
    danger: "text-red-600",
    warning: "text-accent",
  },
  emphasis: {
    solid: "bg-text-main text-bg border-transparent",
    outline: "border border-line bg-transparent",
    ghost: "bg-transparent hover:bg-line/10",
    primary: "bg-accent text-white font-mono tracking-widest text-[10px] px-8 hover:bg-text-main active:translate-y-[0px] hover:translate-y-[-2px] hover:shadow-[0_4px_12px_var(--color-accent-shadow)]",
  },
  radius: {
    none: "rounded-none",
    industrial: "rounded-[2px]",
  }
}
