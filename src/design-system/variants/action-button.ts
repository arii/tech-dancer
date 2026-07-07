import { cva, type VariantProps } from "class-variance-authority";

/**
 * Shared variants for Console-style action buttons (compact, high-contrast).
 * Optimized for rapid interaction with high-contrast feedback.
 */
export const actionButtonVariants = cva(
  "font-bold transition-colors motion-safe:transition-colors motion-reduce:transition-none text-sm shrink-0 flex items-center gap-2 disabled:opacity-50",
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
 * TypeScript props for ActionButton variants derived from the CVA definition.
 */
export type ActionButtonVariants = VariantProps<typeof actionButtonVariants>;
