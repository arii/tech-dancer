import React from "react"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/lib/variants"
import { type VariantProps } from "class-variance-authority"

interface ButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'color'>,
    VariantProps<typeof buttonVariants> {
  as?: any
  href?: string
  loading?: boolean
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, as: Component = "button", variant, intent, size, fullWidth, loading, children, ...props }, ref) => {
    return (
      <Component
        ref={ref as any}
        className={cn(
          buttonVariants({ variant, intent, size, fullWidth }),
          "cursor-pointer",
          className
        )}
        {...props}
      >
        {children}
      </Component>
    )
  }
)
Button.displayName = "Button"
