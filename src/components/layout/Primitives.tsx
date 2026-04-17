import React from "react"
import { cn } from "@/lib/utils"
import { typography, spacing, layout as layoutTokens } from "@/styles/design-tokens"

interface BoxProps extends React.HTMLAttributes<HTMLDivElement> {
  as?: any
  padding?: keyof typeof spacing
  gap?: number
  border?: boolean
  surface?: boolean
  panel?: boolean
  [key: string]: any
}

export const Box = React.forwardRef<HTMLDivElement, BoxProps>(
  ({ className, as: Component = "div", padding, gap, border, surface, panel, ...props }, ref) => {
    return (
      <Component
        ref={ref}
        className={cn(
          panel && layoutTokens.panel,
          surface && "bg-surface",
          border && "border border-line",
          gap && `gap-${gap}`,
          padding && {
            container: "p-8",
            card: "p-6",
            compact: "p-4",
            nav: "px-6 py-4",
          }[padding as keyof typeof spacing],
          className
        )}
        {...props}
      />
    )
  }
)
Box.displayName = "Box"

interface StackProps extends BoxProps {
  direction?: "row" | "col"
  gap?: number
  align?: "start" | "center" | "end" | "stretch"
  justify?: "start" | "center" | "end" | "between"
}

export const Stack = React.forwardRef<HTMLDivElement, StackProps>(
  ({ className, direction = "col", gap = 4, align, justify, ...props }, ref) => {
    return (
      <Box
        ref={ref}
        className={cn(
          "flex",
          direction === "col" ? "flex-col" : "flex-row",
          gap && `gap-${gap}`,
          align && `items-${align}`,
          justify && `justify-${justify}`,
          className
        )}
        {...props}
      />
    )
  }
)
Stack.displayName = "Stack"

interface TextProps extends React.HTMLAttributes<HTMLSpanElement> {
  as?: any
  variant?: keyof typeof typography
  color?: "main" | "body" | "dim" | "accent" | "brand"
  size?: string
  weight?: string
  [key: string]: any
}

export const Text = React.forwardRef<HTMLSpanElement, TextProps>(
  ({ className, as: Component = "span", variant, color = "main", size, weight, ...props }, ref) => {
    return (
      <Component
        ref={ref}
        className={cn(
          variant && typography[variant],
          color === "main" && "text-text-main",
          color === "body" && "text-text-body",
          color === "dim" && "text-text-dim",
          color === "accent" && "text-accent",
          color === "brand" && "text-accent-brand",
          size,
          weight,
          className
        )}
        {...props}
      />
    )
  }
)
Text.displayName = "Text"

export const Grid = React.forwardRef<HTMLDivElement, BoxProps & { 
  cols?: number | string,
  sm?: number | string,
  md?: number | string,
  lg?: number | string,
  xl?: number | string
}>(
  ({ className, cols = 12, sm, md, lg, xl, ...props }, ref) => {
    return (
      <Box
        ref={ref}
        className={cn(
          "grid",
          typeof cols === "number" ? `grid-cols-${cols}` : cols,
          sm && (typeof sm === "number" ? `sm:grid-cols-${sm}` : sm),
          md && (typeof md === "number" ? `md:grid-cols-${md}` : md),
          lg && (typeof lg === "number" ? `lg:grid-cols-${lg}` : lg),
          xl && (typeof xl === "number" ? `xl:grid-cols-${xl}` : xl),
          className
        )}
        {...props}
      />
    )
  }
)
Grid.displayName = "Grid"
