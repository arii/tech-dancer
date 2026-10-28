import * as React from "react"
import { forwardRef, Ref, ElementType, HTMLAttributes } from "react"
import { cn } from "@/lib/utils"
import { typography, typeSizes, tracking as trackingTokens, opacity as opacityTokens } from "@/styles/design-tokens"
import { variants } from "@/lib/variants"
import { Box, BaseProps } from "./Box"
import { resolveJIT, applyResponsive, type ResponsiveProp } from "@/lib/style-utils"

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

function getTextColorClass(color: TextProps['color'], intent?: TextProps['intent']): string {
  if (intent) return ""
  switch (color) {
    case "main": return "text-text-main"
    case "body": return "text-text-body"
    case "dim": return "text-text-dim"
    case "accent": return "text-accent"
    case "brand": return "text-accent-navy font-bold"
    case "white": return "text-white"
    case "bg": return "text-bg"
    case "error": return "text-error"
    default: return ""
  }
}

function getHoverColorClass(hoverColor?: TextProps['hoverColor']): string {
  switch (hoverColor) {
    case "accent": return "transition-colors group-hover:text-accent"
    case "main": return "transition-colors group-hover:text-text-main"
    case "body": return "transition-colors group-hover:text-text-body"
    case "dim": return "transition-colors group-hover:text-text-dim"
    default: return ""
  }
}

function formatClampValue(v: ResponsiveProp<number | boolean> | undefined): string {
  if (typeof v === "number") {
    return v === 0 ? "line-clamp-none" : `line-clamp-${v}`
  }
  return v ? "line-clamp-none" : ""
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
          getTextColorClass(color, intent),
          applyResponsive(size, (s) => typeSizes[s as keyof typeof typeSizes] || ""),
          applyResponsive(weight, (v) => v || ""),
          applyResponsive(align, (v) => resolveJIT(v, "text")),
          applyResponsive(tracking, (v) => trackingTokens[v as keyof typeof trackingTokens] || resolveJIT(v as string | number, "tracking")),
          applyResponsive(uppercase, (v) => v ? "uppercase" : "normal-case"),
          applyResponsive(lowercase, (v) => v ? "lowercase" : "normal-case"),
          applyResponsive(capitalize, (v) => v ? "capitalize" : "normal-case"),
          applyResponsive(clamp, formatClampValue),
          applyResponsive(truncate, (v) => v ? "truncate" : ""),
          applyResponsive(leading, (v) => resolveJIT(v as string | number, "leading")),
          italic && "italic",
          getHoverColorClass(hoverColor),
          opacityVariant && resolveJIT(opacityTokens[opacityVariant], "opacity"),
          className
        )}
        {...props}
      />
    )
  }
)
Text.displayName = "Text"
