import { cva } from "class-variance-authority";

export const fabVariants = cva(
  "inline-flex items-center justify-center font-sans tracking-normal transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed bg-surface-alt text-accent border border-accent/20 shadow-lg hover:bg-accent hover:text-bg rounded-none active:scale-tap",
  {
    variants: {
      size: {
        default: "h-10 px-6 text-xs",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      size: "icon",
    },
  }
);
