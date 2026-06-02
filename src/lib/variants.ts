// impeccable-ignore-file
import { cva } from "class-variance-authority";

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

/**
 * Shared variants for Console-style action buttons (compact, high-contrast)
 */
export const actionButtonVariants = cva(
  "font-bold transition-all text-sm shrink-0 flex items-center gap-2 disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "hover:text-text-main",
        primary: "bg-accent text-bg hover:opacity-90 shadow-md",
        ghost: "hover:bg-line/10 text-text-dim hover:text-text-main",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

/**
 * Card variants for reports, tools, and callout blocks
 */
export const cardVariants = cva(
  "bg-surface rounded-lg shadow-sm border border-line transition-all",
  {
    variants: {
      interactive: {
        true: "hover:border-accent cursor-pointer",
        false: "",
      },
      overflow: {
        hidden: "overflow-hidden",
        visible: "overflow-visible",
      },
      span: {
        1: "col-span-1",
        2: "col-span-2",
        3: "col-span-3",
      }
    },
    defaultVariants: {
      interactive: false,
      overflow: "visible",
    }
  }
);

/**
 * List row variants for interactive lists (e.g., Audit History)
 */
export const listRowVariants = cva(
  "text-left transition-all border-l-4 w-full",
  {
    variants: {
      active: {
        true: "bg-bg border-accent",
        false: "border-transparent hover:bg-surface",
      },
    },
    defaultVariants: {
      active: false,
    }
  }
);
