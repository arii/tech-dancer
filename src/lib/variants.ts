// impeccable-ignore-file
import { cva } from "class-variance-authority";

/**
 * Standardized Variant Contracts for BoomTick UI.
 * Ensures all components share a common mental model for intent, surface, and emphasis.
 *
 * NOTE: Domain-specific variants (e.g., journalVariants, cardVariants) must
 * reside in a `variants.ts` file within their respective component's directory.
 * See CONTRIBUTING.md for details.
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
    outline: "border border-line bg-transparent text-sm font-bold tracking-wide rounded-md hover:bg-line/10 hover:border-text-main/50 transition-colors active:scale-tap",
    ghost: "bg-transparent hover:bg-line/10",
    primary: "bg-accent text-bg text-sm font-bold tracking-wide rounded-md hover:bg-accent-sky transition-colors active:scale-tap shadow-sm",
  },
  radius: {
    none: "rounded-none",
    industrial: "rounded-[2px]",
    lg: "rounded-lg",
    xl: "rounded-xl",
  }
};

export const buttonVariants = cva(
  "inline-flex items-center justify-center font-sans tracking-normal transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed",
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
