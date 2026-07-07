import { cva, type VariantProps } from "class-variance-authority";

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

export type CardVariants = VariantProps<typeof cardVariants>;
