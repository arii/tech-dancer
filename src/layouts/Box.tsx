import React from "react"
import { cn, composeStyles } from "@/lib/utils"
import { spacing, layout as layoutTokens, shadows, zIndex as zIndexTokens } from "@/styles/design-tokens"
import { variants } from "@/lib/variants"
import { ResponsiveProp, getResponsiveClasses } from "./system-utils"

// Safelist for Tailwind v4 scanner to detect dynamically generated responsive classes
// gap-0 gap-1 gap-2 gap-3 gap-4 gap-5 gap-6 gap-8 gap-10 gap-12 gap-16 gap-20 gap-24 gap-32
// p-0 p-1 p-2 p-3 p-4 p-5 p-6 p-8 p-10 p-12 p-16 p-20 p-24 p-32
// pt-0 pt-1 pt-2 pt-3 pt-4 pt-5 pt-6 pt-8 pt-10 pt-12 pt-16 pt-20 pt-24 pt-32
// pb-0 pb-1 pb-2 pb-3 pb-4 pb-5 pb-6 pb-8 pb-10 pb-12 pb-16 pb-20 pb-24 pb-32
// pl-0 pl-1 pl-2 pl-3 pl-4 pl-5 pl-6 pl-8 pl-10 pl-12 pl-16 pl-20 pl-24 pl-32
// pr-0 pr-1 pr-2 pr-3 pr-4 pr-5 pr-6 pr-8 pr-10 pr-12 pr-16 pr-20 pr-24 pr-32
// px-0 px-1 px-2 px-3 px-4 px-5 px-6 px-8 px-10 px-12 px-16 px-20 px-24 px-32
// py-0 py-1 py-2 py-3 py-4 py-5 py-6 py-8 py-10 py-12 py-16 py-20 py-24 py-32

export interface BaseProps {
  padding?: ResponsiveProp<keyof typeof spacing | number | string>
  paddingTop?: ResponsiveProp<keyof typeof spacing | number | string>
  paddingBottom?: ResponsiveProp<keyof typeof spacing | number | string>
  paddingLeft?: ResponsiveProp<keyof typeof spacing | number | string>
  paddingRight?: ResponsiveProp<keyof typeof spacing | number | string>
  paddingX?: ResponsiveProp<keyof typeof spacing | number | string>
  paddingY?: ResponsiveProp<keyof typeof spacing | number | string>
  marginTop?: ResponsiveProp<keyof typeof spacing | number | string | "auto">
  marginBottom?: ResponsiveProp<keyof typeof spacing | number | string | "auto">
  marginLeft?: ResponsiveProp<keyof typeof spacing | number | string | "auto">
  marginRight?: ResponsiveProp<keyof typeof spacing | number | string | "auto">
  marginX?: ResponsiveProp<keyof typeof spacing | number | string | "auto">
  marginY?: ResponsiveProp<keyof typeof spacing | number | string | "auto">
  gap?: ResponsiveProp<number | string>
  border?: boolean | "t" | "b" | "l" | "r" | "x" | "y"
  smBorder?: boolean | "t" | "b" | "l" | "r" | "x" | "y" | { t?: boolean, b?: boolean, l?: boolean, r?: boolean }
  mdBorder?: boolean | "t" | "b" | "l" | "r" | "x" | "y" | { t?: boolean, b?: boolean, l?: boolean, r?: boolean }
  lgBorder?: boolean | "t" | "b" | "l" | "r" | "x" | "y" | { t?: boolean, b?: boolean, l?: boolean, r?: boolean }
  xlBorder?: boolean | "t" | "b" | "l" | "r" | "x" | "y" | { t?: boolean, b?: boolean, l?: boolean, r?: boolean }
  surface?: keyof typeof variants.surface | boolean
  emphasis?: keyof typeof variants.emphasis
  radius?: keyof typeof variants.radius
  panel?: boolean
  flex?: number | string | boolean
  wrap?: boolean
  layout?: keyof typeof layoutTokens
  shadow?: keyof typeof shadows
  position?: "fixed" | "sticky" | "absolute" | "relative"
  inset?: boolean | "top" | "bottom" | "left" | "right" | "x" | "y"
  height?: "full" | "screen" | "auto" | "min" | "fit" | number | string
  maxHeight?: "full" | "screen" | "auto" | "min" | "fit" | number | string
  minWidth?: "0" | "full" | "min" | "fit" | number | string
  maxWidth?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "6xl" | "7xl" | "full" | "prose" | "screen-sm" | "screen-md" | "screen-lg" | "screen-xl" | "screen-2xl"
  overflow?: "auto" | "hidden" | "scroll" | "x-auto" | "y-auto" | "y-hidden"
  zIndex?: number | string
  opacity?: number | string
  display?: ResponsiveProp<"none" | "block" | "flex" | "grid" | "inline" | "inline-block">
  aspect?: "square" | "video" | "auto" | string
  shrink?: number | boolean
  self?: "start" | "center" | "end" | "stretch" | "auto"
  justify?: "start" | "center" | "end" | "between" | "around" | "evenly"
  align?: "start" | "center" | "end" | "baseline" | "stretch"
}

export interface BoxProps extends BaseProps, React.HTMLAttributes<HTMLDivElement> {
  as?: any
  [key: string]: any
}

export const Box = React.forwardRef<HTMLDivElement, BoxProps>(
  ({ 
    className, 
    as: Component = "div", 
    padding, 
    paddingTop, paddingBottom, paddingLeft, paddingRight, paddingX, paddingY,
    marginTop, marginBottom, marginLeft, marginRight, marginX, marginY,
    gap, border, smBorder, mdBorder, lgBorder, xlBorder,
    surface, emphasis, radius: radiusProp, panel, flex, wrap, shadow,
    position, inset, height, width, maxWidth, minHeight, maxHeight, minWidth, 
    overflow, zIndex, opacity, display, aspect, shrink, self, span, cursor,
    justify, align,
    // Motion props filtering
    initial, animate, exit, transition, variants: variantsProp,
    whileHover, whileTap, whileFocus, whileDrag, whileInView, viewport,
    layout: layoutProp, layoutId, onAnimationStart, onAnimationComplete,
    onUpdate, custom,
    ...props 
  }, ref) => {
    const isMotion = typeof Component !== "string"
    
    const motionProps = isMotion ? {
      initial, animate, exit, transition, variants: variantsProp, whileHover, whileTap,
      whileFocus, whileDrag, whileInView, viewport, layout: layoutProp,
      layoutId, onAnimationStart, onAnimationComplete, onUpdate, custom
    } : {}

    const borderClasses = cn(
      border === true && "border border-line",
      border === "t" && "border-t border-line",
      border === "b" && "border-b border-line",
      border === "l" && "border-l border-line",
      border === "r" && "border-r border-line",
      border === "x" && "border-x border-line",
      border === "y" && "border-y border-line",
      getResponsiveClasses(smBorder, "sm:border-"),
      getResponsiveClasses(mdBorder, "md:border-"),
      getResponsiveClasses(lgBorder, "lg:border-"),
      getResponsiveClasses(xlBorder, "xl:border-")
    )

    // Remove props that shouldn't be spread to DOM elements
    const { 
      // ... already destructured above
      ...domProps 
    } = props;

    const getVal = (val: any, prefix: string) => {
      if (val === undefined) return ""
      if (typeof val === "number") {
        // Only use standard tailwind classes for common values, otherwise use arbitrary
        if (prefix === 'z' && [0, 10, 20, 30, 40, 50].includes(val)) return `z-${val}`
        if (prefix === 'opacity' && [0, 5, 10, 20, 25, 30, 40, 50, 60, 70, 75, 80, 90, 95, 100].includes(val)) return `opacity-${val}`
        return `${prefix}-[${val}]`
      }
      // Check if it's a standard Tailwind token (letters, numbers, dashes)
      if (/^[a-z0-9-]+$/.test(val) && !val.includes('vh') && !val.includes('vw') && !val.includes('%') && !val.includes('px')) {
        return `${prefix}-${val}`
      }
      return `${prefix}-[${val}]`
    }

    return (
      <Component
        ref={ref}
        className={composeStyles(
          panel && layoutTokens.panel,
          layoutProp && typeof layoutProp === "string" && layoutTokens[layoutProp as keyof typeof layoutTokens],
          shadow && shadows[shadow],
          typeof surface === "string" ? variants.surface[surface] : (surface && "bg-surface"),
          emphasis && variants.emphasis[emphasis],
          radiusProp && variants.radius[radiusProp],
          borderClasses,
          getResponsiveClasses(gap, "gap-"),
          getResponsiveClasses(padding, "p-", (v) => spacing[v as keyof typeof spacing] ? "" : v),
          padding && typeof padding === "string" && spacing[padding as keyof typeof spacing],
          getResponsiveClasses(paddingTop, "pt-"),
          getResponsiveClasses(paddingBottom, "pb-"),
          getResponsiveClasses(paddingLeft, "pl-"),
          getResponsiveClasses(paddingRight, "pr-"),
          getResponsiveClasses(paddingX, "px-"),
          getResponsiveClasses(paddingY, "py-"),
          getResponsiveClasses(marginTop, "mt-"),
          getResponsiveClasses(marginBottom, "mb-"),
          getResponsiveClasses(marginLeft, "ml-"),
          getResponsiveClasses(marginRight, "mr-"),
          getResponsiveClasses(marginX, "mx-"),
          getResponsiveClasses(marginY, "my-"),
          flex === true && "flex-1",
          flex !== undefined && typeof flex !== "boolean" && (typeof flex === "number" ? `flex-${flex}` : flex),
          wrap && "flex-wrap",
          position,
          inset === true && "inset-0",
          inset === "top" && "top-0 left-0 right-0",
          inset === "bottom" && "bottom-0 left-0 right-0",
          inset === "left" && "top-0 bottom-0 left-0",
          inset === "right" && "top-0 bottom-0 right-0",
          inset === "x" && "left-0 right-0",
          inset === "y" && "top-0 bottom-0",
          height && getVal(height, "h"),
          width && getVal(width, "w"),
          maxWidth && getVal(maxWidth, "max-w"),
          minHeight && getVal(minHeight, "min-h"),
          maxHeight && getVal(maxHeight, "max-h"),
          minWidth && getVal(minWidth, "min-w"),
          overflow && `overflow-${overflow}`,
          zIndex && (zIndexTokens[zIndex as keyof typeof zIndexTokens] !== undefined ? getVal(zIndexTokens[zIndex as keyof typeof zIndexTokens], "z") : getVal(zIndex, "z")),
          opacity && getVal(opacity, "opacity"),
          getResponsiveClasses(display, ""),
          aspect && (aspect === "square" || aspect === "video" ? `aspect-${aspect}` : `aspect-[${aspect}]`),
          shrink === true && "shrink",
          shrink === false && "shrink-0",
          shrink !== undefined && typeof shrink === "number" && `shrink-${shrink}`,
          getResponsiveClasses(span, "col-span-"),
          cursor && `cursor-${cursor}`,
          self && (self === "start" ? "self-start" : self === "center" ? "self-center" : self === "end" ? "self-end" : self === "stretch" ? "self-stretch" : "self-auto"),
          justify && (justify === "start" ? "justify-start" : justify === "center" ? "justify-center" : justify === "end" ? "justify-end" : justify === "between" ? "justify-between" : justify === "around" ? "justify-around" : "justify-evenly"),
          align && (align === "start" ? "items-start" : align === "center" ? "items-center" : align === "end" ? "items-end" : align === "baseline" ? "items-baseline" : "items-stretch"),
          className
        )}
        {...motionProps}
        {...domProps}
      />
    )
  }
)
Box.displayName = "Box"
