import * as React from "react"
import { forwardRef, HTMLAttributes, ElementType } from "react"
import { cn, composeStyles } from "@/lib/utils"
import { spacing, layout as layoutTokens, shadows, zIndex as zIndexTokens } from "@/styles/design-tokens"
import { variants } from "@/lib/variants"
import { ResponsiveProp, getResponsiveClasses } from "./system-utils"
import { SPACING_MAP, RADIUS_MAP, SHADOW_MAP, SPAN_MAP } from "./layout-maps"

export interface BaseProps {
  padding?: ResponsiveProp<keyof typeof spacing | number | string>
  paddingTop?: ResponsiveProp<keyof typeof spacing | number | string>
  paddingBottom?: ResponsiveProp<keyof typeof spacing | number | string>
  paddingLeft?: ResponsiveProp<keyof typeof spacing | number | string>
  paddingRight?: ResponsiveProp<keyof typeof spacing | number | string>
  paddingX?: ResponsiveProp<keyof typeof spacing | number | string>
  paddingY?: ResponsiveProp<keyof typeof spacing | number | string>
  margin?: ResponsiveProp<keyof typeof spacing | number | string | "auto">
  marginTop?: ResponsiveProp<keyof typeof spacing | number | string | "auto">
  marginBottom?: ResponsiveProp<keyof typeof spacing | number | string | "auto">
  marginLeft?: ResponsiveProp<keyof typeof spacing | number | string | "auto">
  marginRight?: ResponsiveProp<keyof typeof spacing | number | string | "auto">
  marginX?: ResponsiveProp<keyof typeof spacing | number | string | "auto">
  marginY?: ResponsiveProp<keyof typeof spacing | number | string | "auto">
  gap?: ResponsiveProp<number | string>
  gapX?: ResponsiveProp<number | string>
  gapY?: ResponsiveProp<number | string>
  border?: boolean | "t" | "b" | "l" | "r" | "x" | "y"
  borderColor?: string
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
  maxWidth?: ResponsiveProp<"xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "6xl" | "7xl" | "full" | "prose" | "screen-sm" | "screen-md" | "screen-lg" | "screen-xl" | "screen-2xl">
  maxHeight?: ResponsiveProp<"full" | "screen" | "auto" | "min" | "fit" | number | string>
  overflow?: "auto" | "hidden" | "scroll" | "x-auto" | "y-auto" | "y-hidden" | "visible"
  overflowX?: "auto" | "hidden" | "scroll" | "visible"
  overflowY?: "auto" | "hidden" | "scroll" | "visible"
  overscroll?: "auto" | "contain" | "none" | "x-contain" | "y-contain"
  noScrollbar?: boolean
  pointerEvents?: "auto" | "none" | "inherit" | "initial" | "revert" | "unset"
  zIndex?: number | string
  opacity?: number | string
  display?: ResponsiveProp<"none" | "block" | "flex" | "grid" | "inline" | "inline-block">
  aspect?: ResponsiveProp<"square" | "video" | "auto" | string>
  shrink?: number | boolean
  self?: "start" | "center" | "end" | "stretch" | "auto"
  justify?: "start" | "center" | "end" | "between" | "around" | "evenly"
  align?: "start" | "center" | "end" | "baseline" | "stretch"
  scrollBehavior?: "smooth" | "auto"
  scrollPaddingTop?: number | string
  scrollMarginTop?: ResponsiveProp<keyof typeof spacing | number | string>
  top?: ResponsiveProp<keyof typeof spacing | number | string>
  right?: ResponsiveProp<keyof typeof spacing | number | string>
  bottom?: ResponsiveProp<keyof typeof spacing | number | string>
  left?: ResponsiveProp<keyof typeof spacing | number | string>
  span?: ResponsiveProp<number | string>
  cursor?: "auto" | "default" | "pointer" | "wait" | "text" | "move" | "help" | "not-allowed" | "none" | string
  flexWrap?: boolean | "wrap" | "wrap-reverse" | "nowrap"
  textAlign?: ResponsiveProp<"left" | "center" | "right" | "justify">
  bgGradient?: string
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
    margin,
    marginTop, marginBottom, marginLeft, marginRight, marginX, marginY,
    gap, gapX, gapY, border, borderColor, smBorder, mdBorder, lgBorder, xlBorder,
    surface, emphasis, radius: radiusProp, panel, flex, wrap, shadow,
    position, inset, height, width, maxWidth, minHeight, maxHeight, minWidth, 
    overflow, overflowX, overflowY, zIndex, opacity, display, aspect, shrink, self, span, cursor, flexWrap, textAlign,
    justify, align, scrollBehavior: _scrollBehavior, scrollPaddingTop, scrollMarginTop,
    top, right, bottom, left, bgGradient,
    // Motion props filtering
    initial, animate, exit, transition, variants: variantsProp,
    whileHover, whileTap, whileFocus, whileDrag, whileInView, viewport,
    layout: layoutProp, layoutId, onAnimationStart, onAnimationComplete,
    onUpdate, custom,
    ...props 
  }, ref) => {
    const isMotion = typeof Component !== "string"
    
    const MOTION_PROPS = [
      'initial', 'animate', 'exit', 'transition', 'variants',
      'whileHover', 'whileTap', 'whileFocus', 'whileDrag', 'whileInView',
      'viewport', 'layout', 'layoutId', 'onAnimationStart',
      'onAnimationComplete', 'onUpdate', 'custom'
    ];

    // Define getVal before it's used
    const getVal = (val: string | number | boolean | undefined | null, prefix: string) => {
      if (val === undefined || val === null || val === "") return ""

      const isNegative = (typeof val === "number" && val < 0) || (typeof val === "string" && val.startsWith("-") && val !== "-")
      const absVal = typeof val === "number" ? Math.abs(val) : (isNegative ? val.substring(1) : val)

      const pfx = prefix ? `${prefix}-` : ""
      const negPrefix = isNegative ? "-" : ""

      // Standard Tailwind tokens (numbers or specific strings without CSS units)
      const isToken = typeof val === "number" ||
        (typeof absVal === "string" && /^[a-z0-9-]+$/.test(absVal) && !/[0-9](px|vh|vw|%|rem|em)$/.test(absVal))

      if (isToken) return `${negPrefix}${pfx}${absVal}`

      // Arbitrary values
      const value = typeof val === "string" && val.startsWith("[") && val.endsWith("]")
        ? val
        : `[${val}]`

      return `${negPrefix}${pfx}${value}`
    }

    const motionProps: Record<string, unknown> = {}
    if (isMotion) {
      const allMotionProps = {
        initial, animate, exit, transition, variants: variantsProp,
        whileHover, whileTap, whileFocus, whileDrag, whileInView, viewport,
        layout: layoutProp, layoutId, onAnimationStart, onAnimationComplete,
        onUpdate, custom
      };

      Object.entries(allMotionProps).forEach(([key, value]) => {
        if (value !== undefined && MOTION_PROPS.includes(key)) {
          motionProps[key] = value;
        }
      });
    }

    const borderClasses = cn(
      border === true && "border border-line",
      border === "t" && "border-t border-line",
      border === "b" && "border-b border-line",
      border === "l" && "border-l border-line",
      border === "r" && "border-r border-line",
      border === "x" && "border-x border-line",
      border === "y" && "border-y border-line",
      borderColor && getVal(borderColor, "border"),
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

    const s = (prefix: string) => (v: string | number | boolean | undefined | null) => {
      const isNegative = (typeof v === "number" && v < 0) || (typeof v === "string" && v.startsWith("-") && v !== "-")
      const absV = typeof v === "number" ? Math.abs(v) : (isNegative ? v.substring(1) : v)

      const token = SPACING_MAP[absV as keyof typeof SPACING_MAP];
      const negPrefix = isNegative ? "-" : ""

      if (token) return `${negPrefix}${prefix}-${token}`;
      return getVal(v, prefix);
    }

    return (
      <Component
        ref={ref}
        className={composeStyles(
          panel && layoutTokens.panel,
          layoutProp && typeof layoutProp === "string" && layoutTokens[layoutProp as keyof typeof layoutTokens],
          shadow && SHADOW_MAP[shadow],
          typeof surface === "string" ? variants.surface[surface] : (surface && "bg-surface"),
          bgGradient,
          emphasis && variants.emphasis[emphasis],
          radiusProp && RADIUS_MAP[radiusProp],
          borderClasses,
          getResponsiveClasses(gap, "", s("gap")),
          getResponsiveClasses(gapX, "", s("gap-x")),
          getResponsiveClasses(gapY, "", s("gap-y")),
          getResponsiveClasses(padding, "", s("p")),
          padding && typeof padding === "string" && spacing[padding as keyof typeof spacing],
          getResponsiveClasses(paddingTop, "", s("pt")),
          getResponsiveClasses(paddingBottom, "", s("pb")),
          getResponsiveClasses(paddingLeft, "", s("pl")),
          getResponsiveClasses(paddingRight, "", s("pr")),
          getResponsiveClasses(paddingX, "", s("px")),
          getResponsiveClasses(paddingY, "", s("py")),
          getResponsiveClasses(margin, "", s("m")),
          getResponsiveClasses(marginTop, "", s("mt")),
          getResponsiveClasses(marginBottom, "", s("mb")),
          getResponsiveClasses(marginLeft, "", s("ml")),
          getResponsiveClasses(marginRight, "", s("mr")),
          getResponsiveClasses(marginX, "", s("mx")),
          getResponsiveClasses(marginY, "", s("my")),
          flex === true && "flex-1",
          flex !== undefined && typeof flex !== "boolean" && (typeof flex === "number" ? `flex-${flex}` : flex),
          (wrap || flexWrap) && "flex-wrap",
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
          getResponsiveClasses(maxWidth, "max-w-", (v) => getVal(v, "")),
          getResponsiveClasses(minHeight, "min-h-", (v) => getVal(v, "")),
          getResponsiveClasses(maxHeight, "max-h-", (v) => getVal(v, "")),
          getResponsiveClasses(minWidth, "min-w-", (v) => getVal(v, "")),
          overflow && (overflow === "y-auto" ? "overflow-y-auto" : overflow === "x-auto" ? "overflow-x-auto" : overflow === "y-hidden" ? "overflow-y-hidden" : `overflow-${overflow}`),
          overflowX && `overflow-x-${overflowX}`,
          overflowY && `overflow-y-${overflowY}`,
          overscroll && (overscroll === "x-contain" ? "overscroll-x-contain" : overscroll === "y-contain" ? "overscroll-y-contain" : `overscroll-${overscroll}`),
          noScrollbar && "no-scrollbar",
          pointerEvents && `pointer-events-${pointerEvents}`,
          zIndex && (zIndexTokens[zIndex as keyof typeof zIndexTokens] !== undefined ? getVal(zIndexTokens[zIndex as keyof typeof zIndexTokens], "z") : getVal(zIndex, "z")),
          opacity !== undefined && getVal(opacity, "opacity"),
          getResponsiveClasses(display, "", (v) => v === "none" ? "hidden" : v as string),
          getResponsiveClasses(aspect, "aspect-", (v) => {
            if (v === "square" || v === "video") return v;
            return v ? `[${v}]` : "";
          }),
          shrink === true && "shrink",
          shrink === false && "shrink-0",
          shrink !== undefined && typeof shrink === "number" && `shrink-${shrink}`,
          getResponsiveClasses(span, "", (v) => SPAN_MAP[v as keyof typeof SPAN_MAP] || ""),
          cursor && `cursor-${cursor}`,
          self && (self === "start" ? "self-start" : self === "center" ? "self-center" : self === "end" ? "self-end" : self === "stretch" ? "self-stretch" : "self-auto"),
          getResponsiveClasses(textAlign, "text-"),
          justify && (justify === "start" ? "justify-start" : justify === "center" ? "justify-center" : justify === "end" ? "justify-end" : justify === "between" ? "justify-between" : justify === "around" ? "justify-around" : "justify-evenly"),
          align && (align === "start" ? "items-start" : align === "center" ? "items-center" : align === "end" ? "items-end" : align === "baseline" ? "items-baseline" : "items-stretch"),
          getResponsiveClasses(top, "", s("top")),
          getResponsiveClasses(right, "", s("right")),
          getResponsiveClasses(bottom, "", s("bottom")),
          getResponsiveClasses(left, "", s("left")),
          getResponsiveClasses(scrollMarginTop, "scroll-mt-", (v) => getVal(v, "")),
          _scrollBehavior && `scroll-${_scrollBehavior}`,
          className
        )}
        style={{ // impeccable-ignore - Dynamic and motion-driven styles require inline style pass-through.
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
