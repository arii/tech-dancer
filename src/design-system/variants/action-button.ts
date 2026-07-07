import { cva, type VariantProps } from "class-variance-authority";

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

export type ActionButtonVariants = VariantProps<typeof actionButtonVariants>;
