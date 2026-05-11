import * as React from "react"
import { forwardRef, Ref, ElementType, HTMLAttributes } from "react"
import { composeStyles } from "@/lib/utils"
import { typography, typeSizes, tracking as trackingTokens } from "@/styles/design-tokens"
import { variants } from "@/lib/variants"
import { Box, BaseProps } from "./Box"
import { getResponsiveClasses, type ResponsiveProp } from "./system-utils"

export interface TextProps extends Omit<BaseProps, "align">, Omit<HTMLAttributes<HTMLElement>, "color"> {
  as?: ElementType
  className?: string
  variant?: keyof typeof typography
  intent?: keyof typeof variants.intent
  color?: "main" | "body" | "dim" | "accent" | "brand" | "white" | "bg" | "error"
  size?: ResponsiveProp<keyof typeof typeSizes>
  weight?: string
  align?: "left" | "center" | "right" | "justify"
  tracking?: keyof typeof trackingTokens | string
  uppercase?: boolean
  lowercase?: boolean
  capitalize?: boolean
  clamp?: number | boolean
  truncate?: boolean
  leading?: "none" | "tight" | "snug" | "normal" | "relaxed" | "loose"
  [key: string]: unknown
}

export const Text = forwardRef<HTMLElement, TextProps>(
  ({ 
    className, as: Component = "span", 
    variant, intent, color = "main", size, weight, align, tracking, 
    uppercase, lowercase, capitalize,
    clamp, truncate, leading,
    ...props 
  }, ref) => {
    return (
      <Box
        as={Component}
        ref={ref as Ref<HTMLDivElement>}
        className={composeStyles(
          variant && typography[variant],
          intent && variants.intent[intent],
          !intent && color === "main" && "text-text-main",
          !intent && color === "body" && "text-text-body",
          !intent && color === "dim" && "text-text-dim",
          !intent && color === "accent" && "text-accent",
          !intent && color === "brand" && "text-accent-navy font-bold",
          !intent && color === "white" && "text-white",
          !intent && color === "bg" && "text-bg",
          !intent && color === "error" && "text-error",
          size && getResponsiveClasses(size, "", (s) => typeSizes[s as keyof typeof typeSizes]),
          weight,
          align && `text-${align}`,
          tracking && trackingTokens[tracking as keyof typeof trackingTokens],
          uppercase && "uppercase",
          lowercase && "lowercase",
          capitalize && "capitalize",
          clamp && (typeof clamp === "number" ? `line-clamp-${clamp}` : "line-clamp-none"),
          truncate && "truncate",
          leading && `leading-${leading}`,
          className
        )}
        // impeccable-ignore - Required for Safari line-clamp support
        style={clamp ? {
          WebkitLineClamp: typeof clamp === 'number' ? clamp : undefined,
          WebkitBoxOrient: 'vertical',
          display: '-webkit-box',
        } : undefined}
        {...props}
      />
    )
  }
)
Text.displayName = "Text"
