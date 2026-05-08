import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const iconVariants = cva("shrink-0", {
  variants: {
    size: {
      sm: "w-4 h-4",
      md: "w-5 h-5",
      lg: "w-6 h-6",
      xl: "w-8 h-8",
    },
    color: {
      default: "text-text-main",
      dim: "text-text-dim",
      accent: "text-accent",
      muted: "text-text-dim opacity-50",
    },
  },
  defaultVariants: {
    size: "md",
    color: "default",
  },
})

export interface IconProps extends React.HTMLAttributes<HTMLSpanElement>, VariantProps<typeof iconVariants> {
  icon: React.ElementType
}

export function Icon({ icon: LucideIcon, size, color, className, ...props }: IconProps) {
  return (
    <span className={cn(iconVariants({ size, color }), className)} {...props}>
      <LucideIcon width="100%" height="100%" />
    </span>
  )
}
