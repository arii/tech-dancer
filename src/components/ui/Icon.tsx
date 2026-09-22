import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { opacity as opacityTokens } from "@/styles/design-tokens"

const OPACITY_CLASS_MAP: Record<keyof typeof opacityTokens, string> = {
  none: "opacity-0",
  ghost: "opacity-10",
  low: "opacity-20",
  medium: "opacity-30",
  subtle: "opacity-40",
  muted: "opacity-50",
  dim: "opacity-60",
  high: "opacity-70",
  heavy: "opacity-80",
  solid: "opacity-90",
  full: "opacity-100",
};

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
      bg: "text-bg",
    },
  },
  defaultVariants: {
    size: "md",
    color: "primary",
  },
})

export interface IconProps extends React.HTMLAttributes<HTMLSpanElement>, VariantProps<typeof iconVariants> {
  icon: React.ElementType
  strokeWidth?: number
  opacityVariant?: keyof typeof opacityTokens
}

export function Icon({ icon: LucideIcon, size, color, className, strokeWidth, opacityVariant, ...props }: IconProps) {
  return (
    <span
      className={cn(
        iconVariants({ size, color }),
        opacityVariant && OPACITY_CLASS_MAP[opacityVariant],
        className
      )}
      {...props}
    >
      <LucideIcon width="100%" height="100%" strokeWidth={strokeWidth} />
    </span>
  )
}
