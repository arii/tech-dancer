import { cva, type VariantProps } from "class-variance-authority";

/**
 * List row variants for interactive lists (e.g., Audit History).
 * Features a distinct active state marker for clear navigation focus.
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

/**
 * TypeScript props for ListRow variants derived from the CVA definition.
 */
export type ListRowVariants = VariantProps<typeof listRowVariants>;
