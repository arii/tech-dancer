import * as React from "react"
import { forwardRef, ButtonHTMLAttributes, ElementType, Ref } from "react"
import { cn } from "@/lib/utils"
import { buttonVariants, type ButtonVariants } from "@/lib/variants"
import { Box, BaseProps } from "./Box"

interface ButtonProps
  extends BaseProps,
    Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'color'>,
    ButtonVariants {
  as?: ElementType
  href?: string
  loading?: boolean
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, as = "button", variant, intent, size, fullWidth, loading: _loading, children, ...props }, ref) => {
    return (
      <Box
        as={as}
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
