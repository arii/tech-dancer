// impeccable-ignore-file
import { cva } from "class-variance-authority";

/**
 * Standardized Variant Contracts for the Systems Console.
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
    glass: "bg-surface/90 backdrop-blur-2xl text-text-main",
    glassAlt: "bg-surface/90 backdrop-blur-xl text-text-main",
    backdrop: "bg-bg/80 backdrop-blur-md text-text-main",
  },
  intent: {
    default: "text-text-main",
    success: "text-accent",
    danger: "text-error",
    warning: "text-amber-500",
  },
  emphasis: {
    solid: "bg-text-main text-bg border-transparent",
    outline: "border border-line bg-transparent",
    ghost: "bg-transparent hover:bg-line/10",
    primary: "bg-accent text-white font-mono tracking-widest text-xs px-8 btn-primary-effects",
    professional: "bg-text-main text-white font-sans rounded-lg hover:bg-text-main/90 transition-all shadow-sm active:scale-95 normal-case tracking-normal",
    fab: "bg-surface-alt text-accent border border-accent/20 shadow-lg hover:bg-accent hover:text-bg transition-all duration-300 rounded-none",
  },
  radius: {
    none: "rounded-none",
    industrial: "rounded-industrial",
    lg: "rounded-lg",
    xl: "rounded-xl",
  }
};

export const buttonVariants = cva(
  "inline-flex items-center justify-center font-mono tracking-widest uppercase transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed",
  {
    variants: {
      variant: variants.emphasis,
      intent: {
        default: "text-text-main",
        success: "text-accent",
        danger: "text-error",
        warning: "text-accent",
      },
      size: {
        default: "h-10 px-6 text-xs",
        sm: "h-8 px-4 text-xs",
        md: "h-10 px-6 text-xs",
        lg: "h-12 px-8 text-sm",
        icon: "h-10 w-10",
      },
      fullWidth: {
        true: "w-full",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
);
