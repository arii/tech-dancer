import { typography, radius } from "./design-tokens";

/**
 * Standardized Variant Contracts for the Systems Console.
 * Ensures all components share a common mental model for intent, surface, and emphasis.
 */
export const variants = {
  surface: {
    default: "bg-surface text-text-main",
    accent: "bg-accent-brand/5 border-accent-brand/20 text-accent-brand",
    muted: "bg-line/20 text-text-dim",
    subsoil: "bg-bg text-text-dim",
    contrast: "bg-text-main text-bg",
  },
  intent: {
    default: "text-text-main",
    success: "text-accent-brand", 
    danger: "text-red-500",
    warning: "text-accent",
  },
  emphasis: {
    solid: "bg-text-main text-bg border-transparent",
    outline: "border border-line bg-transparent",
    ghost: "bg-transparent hover:bg-line/10",
  },
  radius: {
    none: "rounded-none",
    sm: radius.sm,
    md: radius.md,
    lg: radius.lg,
  }
}
