// impeccable-ignore-file
import { cva } from "class-variance-authority";
import { transitions, interaction, typography, layouts } from "@/styles/utilities";

/**
 * Standardized Variant Contracts for BoomTick UI.
 * Ensures all components share a common mental model for intent, surface, and emphasis.
 */
export const variants = {
  surface: {
    default: "bg-surface text-text-main",
    muted: "bg-line/50 text-text-dim",
    accent: "bg-accent/5 border-accent/20 text-accent",
    alt: "bg-surface-alt text-text-main",
    card: "bg-card-bg border-line",
    contrast: "bg-text-main text-bg",
    success: "bg-accent/5 border-accent/20 text-accent",
    warning: "bg-accent-purple/5 border-accent-purple/20 text-accent-purple",
    error: "bg-error-surface border-error/20 text-error",
    bg: "bg-bg text-text-body",
  },
  intent: {
    default: "text-text-main",
    success: "text-accent",
    danger: "text-error",
    warning: "text-amber-500",
  },
  emphasis: {
    solid: "bg-text-main text-bg border-transparent",
    outline: `border border-line bg-transparent text-sm font-bold tracking-wide rounded-md hover:bg-line/10 hover:border-text-main/50 ${transitions.colors} ${interaction.active}`,
    ghost: "bg-transparent hover:bg-line/10",
    primary: `bg-accent text-bg text-sm font-bold tracking-wide rounded-md hover:bg-accent-sky ${transitions.colors} ${interaction.active} shadow-sm`,
    professional: `bg-text-main text-white font-sans rounded-lg hover:bg-text-main/90 ${transitions.default} shadow-sm ${interaction.active} normal-case tracking-normal`,
    fab: `bg-surface-alt text-accent border border-accent/20 shadow-lg hover:bg-accent hover:text-bg ${transitions.slow} rounded-none`,
    reminder: "bg-accent-purple text-bg hover:bg-accent-purple/90 shadow-lg h-14 w-full",
  },
  radius: {
    none: "rounded-none",
    industrial: "rounded-[2px]",
    lg: "rounded-lg",
    xl: "rounded-xl",
  }
};

export const buttonVariants = cva(
  `${layouts.inlineFlexCenter} font-sans tracking-normal ${transitions.default} disabled:opacity-50 disabled:cursor-not-allowed`,
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
 * Shared variants for Console-style action buttons (compact, high-contrast)
 */
export const actionButtonVariants = cva(
  `font-bold ${transitions.default} text-sm shrink-0 flex items-center gap-2 disabled:opacity-50`,
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
  `bg-surface rounded-md shadow-sm card-border ${transitions.default}`,
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
  `${layouts.inlineFlexCenter} border ${transitions.default} whitespace-nowrap font-semibold uppercase tracking-emphasized text-xs`,
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
 * Tag variants for categorizing content highlights (e.g. Robotics, AI, Infra)
 */
export const tagVariants = cva(
  `${layouts.inlineFlexCenter} rounded ${typography.utility} border ${transitions.colors}`,
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

/**
 * Journal/Blog specific variants for editorial consistency.
 */
export const journalVariants = {
  card: cva(transitions.default, {
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
  shareAction: cva(`text-text-dim hover:text-accent ${transitions.colors} group`),
  tag: cva(`border-line/50 hover:border-accent ${transitions.colors} cursor-default`),
  navLink: cva(`${transitions.colors} group cursor-pointer`, {
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
  `text-left ${transitions.default} border-l-4 w-full`,
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
