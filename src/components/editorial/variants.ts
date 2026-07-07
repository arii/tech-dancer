import { cva } from "class-variance-authority";

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
