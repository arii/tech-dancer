import { cva, type VariantProps } from "class-variance-authority";

/**
 * Tag variants for categorizing content highlights (e.g. Robotics, AI, Infra)
 */
export const tagVariants = cva(
  'inline-flex items-center rounded font-semibold uppercase tracking-wider border transition-colors',
  {
    variants: {
      variant: {
        sky: "bg-accent-sky/10 text-accent-sky border-accent-sky/20",
        purple: "bg-accent-purple/10 text-accent-purple border-accent-purple/20",
        cyan: "bg-accent/10 text-accent border-accent/20",
        default: "bg-surface-alt/50 text-text-dim border-line/30",
      },
      size: {
        xs: "px-2 py-0.5 text-micro",
        sm: "px-3 py-1 text-xs",
      }
    },
    defaultVariants: {
      variant: "default",
      size: "sm",
    }
  }
);

export type TagVariants = VariantProps<typeof tagVariants>;
