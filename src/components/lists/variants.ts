import { cva } from "class-variance-authority";

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
  "bg-surface rounded-md shadow-sm card-border transition-all",
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
