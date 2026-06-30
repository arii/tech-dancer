import * as React from "react"
import { forwardRef, HTMLAttributes, ElementType } from "react"
import { cn } from "@/lib/utils"
import { cva, type VariantProps } from "class-variance-authority"

const boxVariants = cva("", {
  variants: {
    surface: {
      true: "bg-surface",
      bg: "bg-background",
      card: "bg-card",
      brand: "bg-brand",
    },
    radius: {
      none: "rounded-none",
      sm: "rounded-sm",
      md: "rounded-md",
      lg: "rounded-lg",
      xl: "rounded-xl",
      full: "rounded-full",
    },
    shadow: {
      none: "shadow-none",
      sm: "shadow-sm",
      md: "shadow-md",
      lg: "shadow-lg",
      glow: "shadow-glow",
    },
  },
})

export interface BoxProps extends HTMLAttributes<HTMLDivElement>, VariantProps<typeof boxVariants> {
  as?: ElementType
  display?: "flex" | "grid" | "block" | "inline" | "none"
  align?: "start" | "center" | "end" | "baseline" | "stretch"
  justify?: "start" | "center" | "end" | "between" | "around" | "evenly"
  width?: string | number
  height?: string | number
  gap?: number | string
  padding?: number | string
  paddingX?: number | string
  paddingY?: number | string
  margin?: number | string
  position?: "relative" | "absolute" | "fixed" | "sticky"
  overflow?: "hidden" | "auto" | "scroll" | "visible"
  flex?: number | string | boolean
}

export const Box = forwardRef<HTMLDivElement, BoxProps>(
  ({ className, as: Component = "div", surface, radius, shadow, display, align, justify, width, height, gap, padding, paddingX, paddingY, margin, position, overflow, flex, style, ...props }, ref) => {
    
    const layoutClasses = cn(
      display === "flex" && "flex",
      display === "grid" && "grid",
      display === "block" && "block",
      display === "inline" && "inline",
      display === "none" && "hidden",
      align && `items-${align === "start" ? "start" : align === "end" ? "end" : align}`,
      justify && `justify-${justify === "start" ? "start" : justify === "end" ? "end" : justify}`,
      position,
      overflow && `overflow-${overflow}`,
      flex === true && "flex-1",
      typeof flex === "number" && `flex-${flex}`,
      typeof flex === "string" && flex
    )

    const resolveValue = (v: number | string | undefined) => typeof v === "number" ? `${v * 0.25}rem` : v

    return (
      <Component
        ref={ref}
        className={cn(
          boxVariants({ surface, radius, shadow }),
          layoutClasses,
          className
        )}
        style={{ // impeccable-ignore - Dynamic layout props mapping requires inline styles.
          width,
          height,
          gap: resolveValue(gap),
          padding: resolveValue(padding),
          paddingLeft: resolveValue(paddingX),
          paddingRight: resolveValue(paddingX),
          paddingTop: resolveValue(paddingY),
          paddingBottom: resolveValue(paddingY),
          margin: resolveValue(margin),
          ...style,
        }}
        {...props}
      />
    )
  }
)
Box.displayName = "Box"
