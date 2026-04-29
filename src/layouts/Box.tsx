import { forwardRef, type ElementType, type HTMLAttributes } from "react";

import { cn, composeStyles } from "@/lib/utils"
import { layout as layoutTokens, spacing, zIndex as zIndexTokens, shadows, contentWidth } from "@/styles/design-tokens"
import { variants } from "@/lib/variants"
import { ResponsiveProp, getResponsiveClasses } from "./system-utils"

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
  width?: ResponsiveProp<"0" | "full" | "min" | "fit" | "auto" | "screen" | number | string>
  height?: ResponsiveProp<"full" | "screen" | "auto" | "min" | "fit" | number | string>
  minWidth?: ResponsiveProp<"0" | "full" | "min" | "fit" | number | string>
  minHeight?: ResponsiveProp<"0" | "full" | "min" | "fit" | number | string>
  maxWidth?: ResponsiveProp<keyof typeof contentWidth | "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "6xl" | "7xl" | "full" | "prose" | "screen-sm" | "screen-md" | "screen-lg" | "screen-xl" | "screen-2xl">
  maxHeight?: ResponsiveProp<"full" | "screen" | "auto" | "min" | "fit" | number | string>
  overflow?: "auto" | "hidden" | "scroll" | "x-auto" | "y-auto" | "y-hidden" | "visible"
  overflowX?: "auto" | "hidden" | "scroll" | "visible"
  overflowY?: "auto" | "hidden" | "scroll" | "visible"
  zIndex?: number | string
  opacity?: number | string
  display?: ResponsiveProp<"none" | "block" | "flex" | "grid" | "inline" | "inline-block">
  aspect?: "square" | "video" | "auto" | string
  shrink?: number | boolean
  self?: "start" | "center" | "end" | "stretch" | "auto"
  justify?: "start" | "center" | "end" | "between" | "around" | "evenly"
  align?: "start" | "center" | "end" | "baseline" | "stretch"
  scrollBehavior?: "smooth" | "auto"
  scrollPaddingTop?: number | string
  top?: ResponsiveProp<keyof typeof spacing | number | string>
  right?: ResponsiveProp<keyof typeof spacing | number | string>
  bottom?: ResponsiveProp<keyof typeof spacing | number | string>
  left?: ResponsiveProp<keyof typeof spacing | number | string>
}

export interface BoxProps extends BaseProps, HTMLAttributes<HTMLDivElement> {
  as?: ElementType
  [key: string]: unknown
}

export const Box = forwardRef<HTMLDivElement, BoxProps>(
  ({ 
    className, 
    as: Component = "div", 
    padding, 
    paddingTop, paddingBottom, paddingLeft, paddingRight, paddingX, paddingY,
    marginTop, marginBottom, marginLeft, marginRight, marginX, marginY,
    gap, border, smBorder, mdBorder, lgBorder, xlBorder,
    surface, emphasis, radius: radiusProp, panel, flex, wrap, shadow,
    position, inset, height, width, maxWidth, minHeight, maxHeight, minWidth, 
    overflow, overflowX, overflowY, zIndex, opacity, display, aspect, shrink, self, span, cursor,
    justify, align, scrollBehavior: _scrollBehavior, scrollPaddingTop,
    top, right, bottom, left,
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

    const getVal = (val: string | number | boolean | undefined | null, prefix: string) => {
      if (!val) return ""
      const pfx = prefix ? `${prefix}-` : ""

      // Standard Tailwind tokens (numbers or specific strings without CSS units)
      const isToken = typeof val === "number" ||
        (typeof val === "string" && /^[a-z0-9-]+$/.test(val) && !/[0-9](px|vh|vw|%|rem|em)$/.test(val))

      if (isToken) return `${pfx}${val}`

      // Arbitrary values
      const value = typeof val === "string" && val.startsWith("[") && val.endsWith("]")
        ? val
        : `[${val}]`

      return `${pfx}${value}`
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
          getResponsiveClasses(gap, "gap-", (v) => v) /* safelist: gap-6 gap-12 */ ,
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
          getResponsiveClasses(height, "h-", (v) => getVal(v, "")),
          getResponsiveClasses(width, "w-", (v) => getVal(v, "")),
          getResponsiveClasses(maxWidth, "", (v) => contentWidth[v as keyof typeof contentWidth] || getVal(v, "max-w-")),
          getResponsiveClasses(minHeight, "min-h-", (v) => getVal(v, "")),
          getResponsiveClasses(maxHeight, "", (v) => {
            if (v === "cardImage") return layoutTokens.cardImage.maxHeight;
            return getVal(v, "max-h-");
          }),
          getResponsiveClasses(minWidth, "min-w-", (v) => getVal(v, "")),
          overflow && `overflow-${overflow}`,
          overflowX && `overflow-x-${overflowX}`,
          overflowY && `overflow-y-${overflowY}`,
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
          getResponsiveClasses(top, "top-"),
          getResponsiveClasses(right, "right-"),
          getResponsiveClasses(bottom, "bottom-"),
          getResponsiveClasses(left, "left-"),
          className
        )}
        style={{
          ...((scrollPaddingTop !== undefined) ? { scrollPaddingTop: typeof scrollPaddingTop === 'number' ? `${scrollPaddingTop}px` : scrollPaddingTop } : {}),
          ...motionProps.style,
          ...props.style
        }}
        {...motionProps}
        {...domProps}
      />
    )
  }
)
Box.displayName = "Box"
