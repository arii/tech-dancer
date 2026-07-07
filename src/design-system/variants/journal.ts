import { cva, type VariantProps } from "class-variance-authority";

/**
 * Journal/Blog specific variants for editorial consistency.
 */
export const journalVariants = {
  card: cva("transition-all", {
    variants: {
      variant: {
        default: "bg-surface/30 border-line/30",
        hero: "bg-surface-alt border-line/30",
      },
      interactive: {
        true: "hover:border-accent/50 hover:bg-surface/50 group cursor-pointer",
        false: ""
      }
    },
    defaultVariants: {
      variant: "default",
      interactive: false
    }
  }),
  shareAction: cva("text-text-dim hover:text-accent transition-colors group"),
  tag: cva("border-line/50 hover:border-accent transition-colors cursor-default"),
  navLink: cva("transition-colors group cursor-pointer", {
    variants: {
      active: {
        true: "text-accent",
        false: "text-text-dim hover:text-accent"
      }
    },
    defaultVariants: {
      active: false
    }
  })
};

// Journal variants is an object of CVA functions, VariantProps doesn't work directly on it.
// Exporting types for individual properties if needed, but the object itself is what's used.
export type JournalCardVariants = VariantProps<typeof journalVariants.card>;
export type JournalNavLinkVariants = VariantProps<typeof journalVariants.navLink>;
