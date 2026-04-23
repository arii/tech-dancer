import * as React from "react"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/lib/variants"
import { type VariantProps } from "class-variance-authority"
import { Box, BaseProps } from "./Box"

interface ButtonProps
  extends BaseProps,
    Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'color'>,
    VariantProps<typeof buttonVariants> {
  as?: React.ElementType
  href?: string
  loading?: boolean
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, as = "button", variant, intent, size, fullWidth, loading, children, ...props }, ref) => {
    return (
      <Box
        as={as}
        ref={ref as any}
        cursor="pointer"
        className={cn(buttonVariants({ variant, intent, size, fullWidth }), className)}
        {...props}
      >
        {children}
      </Box>
    )
  }
)
Button.displayName = "Button"
