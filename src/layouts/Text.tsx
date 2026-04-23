import * as React from "react"
import { composeStyles } from "@/lib/utils"
import { typography, typeSizes, tracking as trackingTokens } from "@/styles/design-tokens"
import { variants } from "@/lib/variants"
import { Box, BaseProps } from "./Box"
import { getResponsiveClasses, type ResponsiveProp } from "./system-utils"

export interface TextProps extends Omit<BaseProps, "align">, Omit<React.HTMLAttributes<HTMLElement>, "color"> {
  as?: React.ElementType
  className?: string
  variant?: keyof typeof typography
  intent?: keyof typeof variants.intent
  color?: "main" | "body" | "dim" | "accent" | "brand" | "white" | "bg"
  size?: ResponsiveProp<keyof typeof typeSizes>
  weight?: string
  align?: "left" | "center" | "right" | "justify"
  tracking?: keyof typeof trackingTokens | string
  uppercase?: boolean
  lowercase?: boolean
  capitalize?: boolean
  italic?: boolean
  [key: string]: any
}

export const Text = React.forwardRef<HTMLElement, TextProps>(
  ({ 
    className, as: Component = "span", 
    variant, intent, color = "main", size, weight, align, tracking, 
    uppercase, lowercase, capitalize, italic,
    ...props 
  }, ref) => {
    return (
      <Box
        as={Component}
        ref={ref as React.Ref<HTMLDivElement>}
        className={composeStyles(
          variant && (typography as any)[variant],
          intent && (variants.intent as any)[intent],
          !intent && color === "main" && "text-text-main",
          !intent && color === "body" && "text-text-body",
          !intent && color === "dim" && "text-text-dim",
          !intent && color === "accent" && "text-accent",
          !intent && color === "brand" && "text-accent-brand",
          !intent && color === "white" && "text-white",
          !intent && color === "bg" && "text-bg",
          size && getResponsiveClasses(size, "", (s) => typeSizes[s as keyof typeof typeSizes]),
          weight,
          align && `text-${align}`,
          tracking && (trackingTokens as any)[tracking],
          uppercase && "uppercase",
          lowercase && "lowercase",
          capitalize && "capitalize",
          italic && "italic",
          className
        )}
        {...props}
      />
    )
  }
)
Text.displayName = "Text"
