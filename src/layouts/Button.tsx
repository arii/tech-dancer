import React from "react"
import { cn } from "@/lib/utils"
import { variants } from "@/styles/variants"
import { buttonVariants } from "@/lib/variants"
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
        className={cn(buttonVariants({
          variant: variant as any,
          intent: intent as any,
          size: size as any,
          fullWidth
        }), className)}
        {...props}
      >
        {children}
      </Box>
    )
  }
)
Button.displayName = "Button"
