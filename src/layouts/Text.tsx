// impeccable-ignore-file
import * as React from "react"
import { forwardRef, Ref, ElementType, HTMLAttributes } from "react"
import { cn } from "../lib/utils"
import { typography, typeSizes, tracking as trackingTokens, opacity as opacityTokens } from "../styles/design-tokens"
import { variants } from "../lib/variants"
import { Box, BaseProps } from "./Box"
import { resolveJIT, applyResponsive, type ResponsiveProp } from "../lib/style-utils"

export interface TextProps extends Omit<BaseProps, "align">, Omit<HTMLAttributes<HTMLElement>, "color"> {
  as?: ElementType
  className?: string
  variant?: keyof typeof typography
  intent?: keyof typeof variants.intent
  color?: "main" | "body" | "dim" | "accent" | "brand" | "white" | "bg" | "error"
  size?: ResponsiveProp<keyof typeof typeSizes>
  weight?: ResponsiveProp<string>
  align?: ResponsiveProp<"left" | "center" | "right" | "justify">
  tracking?: ResponsiveProp<keyof typeof trackingTokens | string>
  uppercase?: ResponsiveProp<boolean>
  lowercase?: ResponsiveProp<boolean>
  capitalize?: ResponsiveProp<boolean>
  clamp?: ResponsiveProp<number | boolean>
  truncate?: ResponsiveProp<boolean>
  leading?: ResponsiveProp<"none" | "tight" | "snug" | "normal" | "relaxed" | "loose" | string>
  italic?: boolean
  hoverColor?: "accent" | "main" | "body" | "dim"
  opacityVariant?: keyof typeof opacityTokens
  [key: string]: unknown
}

export const Text = forwardRef<HTMLElement, TextProps>(
  ({ 
    className, as: Component = "span", 
    variant, intent, color = "main", size, weight, align, tracking, 
    uppercase, lowercase, capitalize,
    clamp, truncate, leading, italic,
    hoverColor,
    opacityVariant,
    ...props 
  }, ref) => {

    return (
      <Box
        as={Component}
        ref={ref as Ref<HTMLDivElement>}
        className={cn(
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
          applyResponsive(size, (s) => typeSizes[s as keyof typeof typeSizes] || ""),
          applyResponsive(weight, (v) => v || ""),
          applyResponsive(align, (v) => resolveJIT(v, "text")),
          applyResponsive(tracking, (v) => trackingTokens[v as keyof typeof trackingTokens] || resolveJIT(v as string | number, "tracking")),
          applyResponsive(uppercase, (v) => v ? "uppercase" : "normal-case"),
          applyResponsive(lowercase, (v) => v ? "lowercase" : "normal-case"),
          applyResponsive(capitalize, (v) => v ? "capitalize" : "normal-case"),
          applyResponsive(clamp, (v) => (typeof v === "number" ? (v === 0 ? "line-clamp-none" : `line-clamp-${v}`) : (v ? "line-clamp-none" : ""))),
          applyResponsive(truncate, (v) => v ? "truncate" : ""),
          applyResponsive(leading, (v) => resolveJIT(v as string | number, "leading")),
          italic && "italic",
          hoverColor === "accent" && "transition-colors group-hover:text-accent",
          hoverColor === "main" && "transition-colors group-hover:text-text-main",
          hoverColor === "body" && "transition-colors group-hover:text-text-body",
          hoverColor === "dim" && "transition-colors group-hover:text-text-dim",
          opacityVariant && resolveJIT(opacityTokens[opacityVariant], "opacity"),
          className
        )}
        {...props}
      />
    )
  }
)
Text.displayName = "Text"
