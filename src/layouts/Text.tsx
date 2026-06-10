// impeccable-ignore-file
import * as React from "react"
import { forwardRef, Ref, ElementType, HTMLAttributes } from "react"
import { composeStyles } from "@/lib/utils"
import { typography, typeSizes, tracking as trackingTokens, opacity as opacityTokens } from "@/styles/design-tokens"
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
  opacityVariant?: keyof typeof opacityTokens
  [key: string]: unknown
}

export const Text = forwardRef<HTMLElement, TextProps>(
  ({ 
    className, as: Component = "span", 
    variant, intent, color = "main", size, weight, align, tracking, 
    uppercase, lowercase, capitalize,
    clamp, truncate, leading, italic,
    opacityVariant,
    ...props 
  }, ref) => {
    // Standard JIT fallback for arbitrary values
    const resolveJIT = (val: string | number, prefix: string) => {
      if (!val) return ""
      const pfx = prefix ? `${prefix}-` : ""

      // Standard Tailwind tokens (numbers or specific strings without CSS units)
      const isToken = typeof val === "number" ||
        (typeof val === "string" && /^[a-z0-9-]+$/.test(val) && !/[0-9](px|vh|vw|%|rem|em)$/.test(val))

      if (isToken) return `${pfx}${val}`

      const value = typeof val === "string" && val.startsWith("[") && val.endsWith("]")
        ? val
        : `[${val}]`

      return `${pfx}${value}`
    }

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
          getResponsiveClasses(weight, ""),
          getResponsiveClasses(align, "text-"),
          getResponsiveClasses(tracking, "", (v) => trackingTokens[v as keyof typeof trackingTokens] || resolveJIT(v as string | number, "tracking")),
          getResponsiveClasses(uppercase, "", (v) => v ? "uppercase" : "normal-case"),
          getResponsiveClasses(lowercase, "", (v) => v ? "lowercase" : "normal-case"),
          getResponsiveClasses(capitalize, "", (v) => v ? "capitalize" : "normal-case"),
          getResponsiveClasses(clamp, "", (v) => (typeof v === "number" ? `line-clamp-${v}` : (v ? "line-clamp-none" : ""))),
          getResponsiveClasses(truncate, "", (v) => v ? "truncate" : ""),
          getResponsiveClasses(leading, "", (v) => resolveJIT(v as string | number, "leading")),
          italic && "italic",
          opacityVariant && `opacity-[${opacityTokens[opacityVariant]}]`,
          className
        )}
        {...props}
      />
    )
  }
)
Text.displayName = "Text"
