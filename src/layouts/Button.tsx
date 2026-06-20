import * as React from "react"
import { forwardRef, ButtonHTMLAttributes, ElementType, Ref } from "react"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/lib/variants"
import { type VariantProps } from "class-variance-authority"
import { Box, BaseProps } from "./Box"

interface ButtonProps
  extends BaseProps,
    Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'color'>,
    VariantProps<typeof buttonVariants> {
  as?: ElementType
  href?: string
  to?: string
  loading?: boolean
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, as = "button", variant, intent, size, fullWidth, loading: _loading, children, type: typeProp, ...props }, ref) => {
    // Only pass 'type' to native button elements to prevent invalid HTML on Links/anchors
    const type = as === 'button' ? (typeProp || 'button') : undefined;

    return (
      <Box
        as={as}
        type={type}
        ref={ref as Ref<HTMLDivElement>}
        cursor="pointer"
        className={cn(buttonVariants({ variant, intent, size, fullWidth }), "tap-target", className)}
        {...props}
      >
        {children}
      </Box>
    )
  }
)
Button.displayName = "Button"
