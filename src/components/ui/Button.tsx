import * as React from "react"
import { forwardRef, ButtonHTMLAttributes, ElementType, Ref } from "react"
import { Box, BaseProps } from "@/layouts/Primitives"
import { actionButtonVariants } from "@/lib/variants"
import { VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

export interface ButtonProps
  extends BaseProps,
    Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'color'>,
    VariantProps<typeof actionButtonVariants> {
  as?: ElementType
}

/**
 * Standardized Button primitive that composes actionButtonVariants.
 * Replaces the ad-hoc <Box as="button"> pattern for consistent interactive states.
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, as = "button", variant, children, ...props }, ref) => {
    return (
      <Box
        as={as}
        ref={ref as Ref<HTMLDivElement>}
        cursor="pointer"
        className={cn(actionButtonVariants({ variant }), className)}
        {...props}
      >
        {children}
      </Box>
    )
  }
)
Button.displayName = "Button"
