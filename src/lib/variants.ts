import { cva } from "class-variance-authority";

export const buttonVariants = cva(
  "inline-flex items-center justify-center transition-all duration-200 font-bold uppercase tracking-widest disabled:opacity-50 disabled:cursor-not-allowed min-h-[44px] min-w-[44px]",
  {
    variants: {
      variant: {
        solid: "bg-text-main text-bg border-transparent",
        outline: "border border-line bg-transparent",
        ghost: "bg-transparent hover:bg-line/10",
        primary: "bg-accent text-white font-mono tracking-widest text-[10px] px-8 hover:bg-text-main active:translate-y-[0px] hover:translate-y-[-2px] hover:shadow-[0_4px_12px_var(--color-accent-shadow)]",
      },
      intent: {
        default: "text-text-main",
        success: "text-accent-brand",
        danger: "text-red-600",
        warning: "text-accent",
      },
      size: {
        sm: "px-4 py-2 text-[10px]",
        md: "px-6 py-3 text-xs",
        lg: "px-8 py-4 text-sm",
      },
      fullWidth: {
        true: "w-full",
      },
    },
    defaultVariants: {
      variant: "solid",
      intent: "default",
      size: "md",
    },
  }
);

export const badgeVariants = cva(
  "inline-flex h-5 w-fit shrink-0 items-center justify-center gap-1 overflow-hidden border px-2 py-0.5 text-[9px] font-mono font-bold uppercase tracking-widest whitespace-nowrap transition-all rounded-[2px]",
  {
    variants: {
      emphasis: {
        solid: "bg-text-main text-bg border-transparent",
        outline: "border border-line bg-transparent",
        ghost: "bg-transparent hover:bg-line/10",
        primary: "bg-accent text-white font-mono tracking-widest text-[10px] px-8 hover:bg-text-main active:translate-y-[0px] hover:translate-y-[-2px] hover:shadow-[0_4px_12px_var(--color-accent-shadow)]",
      },
      intent: {
        default: "text-text-main",
        success: "text-accent-brand",
        danger: "text-red-600",
        warning: "text-accent",
      },
    },
    defaultVariants: {
      emphasis: "solid",
      intent: "default",
    },
  }
);
