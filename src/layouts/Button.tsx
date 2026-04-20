import React from "react"
import { cn } from "@/lib/utils"
import { variants } from "@/styles/variants"
import { Box, BaseProps } from "./Box"

interface ButtonProps extends BaseProps, React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: keyof typeof variants.emphasis
  intent?: keyof typeof variants.intent
  size?: "sm" | "md" | "lg"
  fullWidth?: boolean
  loading?: boolean
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "solid", intent = "default", size = "md", fullWidth, loading, children, ...props }, ref) => {
    return (
      <Box
        as="button"
        ref={ref as any}
        cursor="pointer"
        className={cn(
          "inline-flex items-center justify-center transition-all duration-300 font-bold uppercase tracking-widest disabled:opacity-50 disabled:cursor-not-allowed",
          variants.emphasis[variant],
          variants.intent[intent],
          size === "sm" && "px-4 py-2 text-[10px]",
          size === "md" && "px-6 py-3 text-xs",
          size === "lg" && "px-8 py-4 text-sm",
          fullWidth && "w-full",
          className
        )}
        {...props}
      >
        {children}
      </Box>
    )
  }
)
Button.displayName = "Button"
