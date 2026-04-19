import React from "react"
import { composeStyles } from "@/lib/utils"
import { typography, typeSizes } from "@/styles/design-tokens"
import { variants } from "@/styles/variants"
import { Box, BaseProps } from "./Box"
import { getResponsiveClasses, type ResponsiveProp } from "./system-utils"

export interface TextProps extends BaseProps, React.HTMLAttributes<HTMLElement> {
  as?: any
  variant?: keyof typeof typography
  intent?: keyof typeof variants.intent
  color?: "main" | "body" | "dim" | "accent" | "brand" | "white"
  size?: ResponsiveProp<keyof typeof typeSizes>
  weight?: string
  align?: "left" | "center" | "right" | "justify"
  tracking?: "tighter" | "tight" | "normal" | "wide" | "wider" | "widest"
  uppercase?: boolean
  lowercase?: boolean
  capitalize?: boolean
  [key: string]: any
}

export const Text = React.forwardRef<HTMLElement, TextProps>(
  ({
    className, as: Component = "span",
    variant, intent, color = "main", size, weight, align, tracking,
    uppercase, lowercase, capitalize,
    ...props
  }, ref) => {
    return (
      <Box
        as={Component}
        ref={ref as any}
        className={composeStyles(
          variant && typography[variant],
          intent && variants.intent[intent],
          !intent && color === "main" && "text-text-main",
          !intent && color === "body" && "text-text-body",
          !intent && color === "dim" && "text-text-dim",
          !intent && color === "accent" && "text-accent",
          !intent && color === "brand" && "text-accent-brand",
          !intent && color === "white" && "text-white",
          size && getResponsiveClasses(size, "", (s) => typeSizes[s as keyof typeof typeSizes]),
          weight,
          align && `text-${align}`,
          tracking && `tracking-${tracking}`,
          uppercase && "uppercase",
          lowercase && "lowercase",
          capitalize && "capitalize",
          className
        )}
        {...props}
      />
    )
  }
)
Text.displayName = "Text"
