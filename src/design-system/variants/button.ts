import { cva, type VariantProps } from "class-variance-authority";
import { variants } from "./shared";

/**
 * Global button variants following the design system's emphasis and intent scales.
 * Includes layout, typography, and state-based transitions.
 */
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
 * TypeScript props for Button variants derived from the CVA definition.
 */
export type ButtonVariants = VariantProps<typeof buttonVariants>;
