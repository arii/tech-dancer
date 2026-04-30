import { cva } from "class-variance-authority";

/**
 * Standardized Variant Contracts for the Systems Console.
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
    success: "bg-emerald-50/50 border-emerald-100 text-emerald-900",
    warning: "bg-amber-50/50 border-amber-200 text-amber-900",
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
    outline: "border border-line bg-transparent",
    ghost: "bg-transparent hover:bg-line/10",
    primary: "bg-accent text-white font-mono tracking-widest text-xs px-8 hover:bg-text-main active:translate-y-[0px] hover:translate-y-[-2px] hover:shadow-[0_4px_12px_var(--color-accent-shadow)] relative after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0 hover:after:w-full after:bg-white/50 after:transition-all after:duration-500",
    professional: "bg-text-main text-white font-sans rounded-lg hover:bg-text-main/90 transition-all shadow-sm active:scale-[0.98] normal-case tracking-normal",
    fab: "bg-accent-navy text-bg shadow-lg hover:bg-accent transition-all duration-300 rounded-none",
  },
  radius: {
    none: "rounded-none",
    industrial: "rounded-[2px]",
    lg: "rounded-lg",
    xl: "rounded-xl",
  }
};

export const buttonVariants = cva(
  "inline-flex items-center justify-center font-mono tracking-widest uppercase transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed",
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

export const textVariants = cva("", {
  variants: {
    variant: {
      headline: "font-display font-bold tracking-tighter leading-[0.9]",
      display: "font-display font-bold tracking-tight leading-none",
      body: "font-sans leading-relaxed text-text-body max-w-[65ch]",
      mono: "font-mono tracking-widest uppercase",
      utility: "font-mono tracking-[3px] uppercase",
      label: "font-mono font-bold uppercase tracking-[2px]",
      micro: "font-mono uppercase tracking-widest",
      tight: "tracking-[0.15em] uppercase",
      content: "font-sans leading-relaxed text-text-body max-w-[70ch]",
      headerAccent: "font-mono font-bold tracking-[0.2em] uppercase text-accent",
      sans: "font-sans",
    },
    intent: {
      default: "text-text-main",
      success: "text-accent",
      danger: "text-error",
      warning: "text-amber-500",
      accent: "text-accent",
      brand: "text-accent-navy font-bold",
      dim: "text-text-dim",
      body: "text-text-body",
      white: "text-white",
      bg: "text-bg",
    },
    align: {
      left: "text-left",
      center: "text-center",
      right: "text-right",
      justify: "text-justify",
    },
    tracking: {
      tighter: "tracking-tighter",
      tight: "tracking-tight",
      normal: "tracking-normal",
      wide: "tracking-wide",
      wider: "tracking-wider",
      widest: "tracking-widest",
      "wide-editorial": "tracking-[0.2em]",
      emphasized: "tracking-[0.15em]",
    },
    leading: {
      none: "leading-none",
      tight: "leading-tight",
      snug: "leading-snug",
      normal: "leading-normal",
      relaxed: "leading-relaxed",
      loose: "leading-loose",
    },
  },
  defaultVariants: {
    variant: "body",
    intent: "default",
  },
});
