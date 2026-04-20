import React from "react"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/lib/variants"
import { Box, BaseProps } from "./Box"
import type { VariantProps } from "class-variance-authority"

interface ButtonProps
  extends BaseProps,
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  loading?: boolean
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, intent, size, fullWidth, loading, children, ...props }, ref) => {
    return (
      <Box
        as="button"
        ref={ref as any}
        cursor="pointer"
        className={cn(
          buttonVariants({ variant, intent, size, fullWidth }),
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
