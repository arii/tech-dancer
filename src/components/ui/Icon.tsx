import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const iconVariants = cva("shrink-0 inline-flex items-center justify-center", {
  variants: {
    size: {
      xs: "w-3 h-3",
      sm: "w-4 h-4",
      md: "w-5 h-5",
      lg: "w-6 h-6",
      xl: "w-8 h-8",
      "2xl": "w-12 h-12",
      "3xl": "w-16 h-16",
    },
    color: {
      primary: "text-text-main",
      dim: "text-text-dim",
      accent: "text-accent",
      muted: "text-text-dim opacity-50",
    },
    animation: {
      spin: "animate-spin",
      pulse: "animate-pulse",
      bounce: "animate-bounce",
      ping: "animate-ping",
      none: "",
    }
  },
  defaultVariants: {
    size: "md",
    color: "primary",
    animation: "none",
  },
})

export interface IconProps extends React.HTMLAttributes<HTMLSpanElement>, VariantProps<typeof iconVariants> {
  icon: React.ElementType
  strokeWidth?: number
}

export function Icon({ icon: LucideIcon, size, color, animation, className, strokeWidth, ...props }: IconProps) {
  return (
    <span className={cn(iconVariants({ size, color, animation }), className)} {...props}>
      <LucideIcon width="100%" height="100%" strokeWidth={strokeWidth} />
    </span>
  )
}
