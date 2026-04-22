import { typography } from "@/styles/design-tokens";
import { cva } from "class-variance-authority";
import { variants as styleVariants } from "@/styles/variants";

/**
 * Standardized Variant Contracts for the Systems Console.
 * Ensures all components share a common mental model for intent, surface, and emphasis.
 */
export const variants = {
  surface: {
    default: "bg-surface text-text-main",
    muted: "bg-line/50 text-text-dim",
    accent: "bg-accent-brand/5 border-accent-brand/20 text-accent-brand",
    alt: "bg-surface-alt text-text-main",
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
    primary: "bg-accent text-white font-mono tracking-widest text-xs px-8 hover:bg-text-main active:translate-y-[0px] hover:translate-y-[-2px] hover:shadow-[0_4px_12px_var(--color-accent-shadow)]",
    professional: "bg-text-main text-white font-sans rounded-lg hover:bg-text-main/90 transition-all shadow-sm active:scale-[0.98] normal-case tracking-normal",
  },
  radius: {
    none: "rounded-none",
    industrial: "rounded-[2px]",
  }
};

export const buttonVariants = cva(
  "inline-flex items-center justify-center font-sans font-semibold tracking-tight transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95",
  {
    variants: {
      variant: variants.emphasis,
      intent: {
        default: "text-text-main",
        success: "text-accent-brand",
        danger: "text-red-600",
        warning: "text-accent",
      },
      size: {
        default: "h-[40px] px-6 text-xs",
        sm: "h-8 px-4 text-xs",
        md: "h-[40px] px-6 text-xs",
        lg: "h-12 px-8 text-sm",
        icon: "h-[40px] w-[40px]",
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

export const badgeVariants = cva(
  "inline-flex h-5 w-fit shrink-0 items-center justify-center gap-1 overflow-hidden border px-2 py-0.5 text-xs font-mono font-bold uppercase tracking-widest whitespace-nowrap transition-all rounded-[2px]",
  {
    variants: {
      emphasis: variants.emphasis,
      intent: variants.intent,
    },
    defaultVariants: {
      emphasis: "solid",
      intent: "default",
    },
  }
);
