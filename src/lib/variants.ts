import { cva, type VariantProps } from "class-variance-authority";
import { variants } from "@/styles/variants";

export const buttonVariants = cva(
  "inline-flex items-center justify-center transition-all duration-200 font-bold uppercase tracking-widest disabled:opacity-50 disabled:cursor-not-allowed min-h-[44px] min-w-[44px]",
  {
    variants: {
      variant: variants.emphasis,
      intent: variants.intent,
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
