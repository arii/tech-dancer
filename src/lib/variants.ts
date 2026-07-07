// impeccable-ignore-file
import { cva } from "class-variance-authority";

export * from "../design-system/variants/shared";
export * from "../design-system/variants/button";
export * from "../design-system/variants/tag";

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
 * FilterButton variants for collection and category filtering.
 * Separates structural styles from state-specific styles.
 */
export const filterButtonVariants = cva(
  "inline-flex items-center justify-center border transition-all whitespace-nowrap font-semibold uppercase tracking-emphasized text-xs",
  {
    variants: {
      variant: {
        default: "px-4 py-3 min-h-11",
        compact: "px-4 py-1.5",
        quiet: "px-3.5 py-2 font-medium tracking-normal",
      },
      isActive: {
        true: "",
        false: "",
      },
    },
    compoundVariants: [
      {
        variant: ["default", "compact"],
        isActive: true,
        className: "border-accent text-accent bg-accent/5 ring-2 ring-accent ring-offset-2 ring-offset-background hover:bg-accent/10",
      },
      {
        variant: ["default", "compact"],
        isActive: false,
        className: "border-line text-text-dim hover:border-accent/50 hover:text-text-main hover:bg-white/5",
      },
      {
        variant: "quiet",
        isActive: true,
        className: "bg-surface border-line text-text-main hover:bg-surface/80",
      },
      {
        variant: "quiet",
        isActive: false,
        className: "bg-transparent border-transparent text-text-dim hover:text-text-main hover:bg-line/10",
      },
    ],
    defaultVariants: {
      variant: "default",
      isActive: false,
    },
  }
);


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
