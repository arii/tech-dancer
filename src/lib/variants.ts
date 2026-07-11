// impeccable-ignore-file
import { cva, type VariantProps } from "class-variance-authority";
import { transitions, interaction, typography, layouts, buttons, journal, lists } from "@/styles/utilities";

/**
 * Enhanced CVA factory that injects default accessibility-compliant transitions.
 * Includes basic memoization to prevent redundant class recomputations and re-renders.
 */
export const createTransitionVariants: typeof cva = (base, config) => {
  // Inject transitions.default by default
  const baseClasses = base ? `${base} ${transitions.default}` : transitions.default;
  const variantFn = cva(baseClasses, config);

  // Basic result caching to optimize performance for frequently called components
  const cache = new Map<string, string>();

  const memoizedVariantFn = (props?: unknown) => {
    const key = JSON.stringify(props || {});
    if (cache.has(key)) return cache.get(key)!;

    const result = variantFn(props);
    cache.set(key, result);
    return result;
  };

  // Preserve the variant info for type safety and discovery if needed
  return memoizedVariantFn as unknown as typeof variantFn;
};

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
    outline: `${buttons.outline} ${interaction.active}`,
    ghost: "bg-transparent hover:bg-line/10",
    primary: `${buttons.primary} ${interaction.active}`,
    professional: `${buttons.professional} ${interaction.active}`,
    fab: `${buttons.fab} rounded-none`,
    reminder: "bg-accent-purple text-bg hover:bg-accent-purple/90 shadow-lg h-14 w-full",
  },
  radius: {
    none: "rounded-none",
    industrial: "rounded-[2px]",
    sm: "rounded-sm",
    md: "rounded-md",
    lg: "rounded-lg",
    xl: "rounded-xl",
  }
} as const;

export const buttonVariants = createTransitionVariants(
  `${layouts.inlineFlexCenter} ${buttons.base}`,
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

/** Derived TypeScript props for Button components. */
export type ButtonVariants = VariantProps<typeof buttonVariants>;

/**
 * Shared variants for Console-style action buttons (compact, high-contrast)
 */
export const actionButtonVariants = createTransitionVariants(
  buttons.action,
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

/** Derived TypeScript props for ActionButton components. */
export type ActionButtonVariants = VariantProps<typeof actionButtonVariants>;

/**
 * Card variants for reports, tools, and callout blocks
 */
export const cardVariants = createTransitionVariants(
  layouts.cardBase,
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

/** Derived TypeScript props for Card components. */
export type CardVariants = VariantProps<typeof cardVariants>;

/**
 * FilterButton variants for collection and category filtering.
 * Separates structural styles from state-specific styles.
 */
export const filterButtonVariants = createTransitionVariants(
  `${layouts.inlineFlexCenter} ${layouts.filterBase}`,
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
        className: "bg-accent text-bg border-transparent hover:bg-accent/10",
      },
      {
        variant: ["default", "compact"],
        isActive: false,
        className: "border-line text-text-dim hover:border-accent hover:text-accent hover:bg-accent/5 transition-colors",
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

/** Derived TypeScript props for FilterButton components. */
export type FilterButtonVariants = VariantProps<typeof filterButtonVariants>;

/**
 * Tag variants for categorizing content highlights (e.g. Robotics, AI, Infra)
 */
export const tagVariants = createTransitionVariants(
  `${layouts.inlineFlexCenter} ${layouts.tagBase} ${typography.utility}`,
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

/** Derived TypeScript props for Tag components. */
export type TagVariants = VariantProps<typeof tagVariants>;

/**
 * Journal/Blog specific variants for editorial consistency.
 */
export const journalVariants = {
  card: createTransitionVariants("", {
    variants: {
      variant: {
        default: "bg-surface/30 border-line/30",
        hero: "bg-surface-alt border-line/30",
      },
      interactive: {
        true: interaction.journalCard,
        false: ""
      }
    },
    defaultVariants: {
      variant: "default",
      interactive: false
    }
  }),
  shareAction: createTransitionVariants(journal.share),
  tag: createTransitionVariants(journal.tag),
  navLink: createTransitionVariants(journal.nav, {
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

/** Derived TypeScript props for Journal Card components. */
export type JournalCardVariants = VariantProps<typeof journalVariants.card>;
/** Derived TypeScript props for Journal Share Action components. */
export type JournalShareActionVariants = VariantProps<typeof journalVariants.shareAction>;
/** Derived TypeScript props for Journal Tag components. */
export type JournalTagVariants = VariantProps<typeof journalVariants.tag>;
/** Derived TypeScript props for Journal Nav Link components. */
export type JournalNavLinkVariants = VariantProps<typeof journalVariants.navLink>;

/**
 * List row variants for interactive lists (e.g., Audit History)
 */
export const listRowVariants = createTransitionVariants(
  lists.row,
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

/** Derived TypeScript props for List Row components. */
export type ListRowVariants = VariantProps<typeof listRowVariants>;
