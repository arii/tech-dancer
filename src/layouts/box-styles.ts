/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { cn } from "@/lib/utils"
import { spacing, layout as layoutTokens, shadows, zIndex as zIndexTokens, opacity as opacityTokens } from "@/styles/design-tokens"
import { variants } from "@/lib/variants"
import { RADIUS_MAP, SHADOW_MAP, SPAN_MAP } from "./layout-maps"
import { resolveJIT, resolveSpacing, applyResponsive, type ResponsiveProp } from "@/lib/style-utils"

export interface ComponentWithDisplayName {
  render?: {
    displayName?: string
  }
}

export const MOTION_PROPS = [
  'initial', 'animate', 'exit', 'transition', 'variants',
  'whileHover', 'whileTap', 'whileFocus', 'whileDrag', 'whileInView',
  'viewport', 'layout', 'layoutId', 'onAnimationStart',
  'onAnimationComplete', 'onUpdate', 'custom'
]

export function filterMotionProps(
  isMotion: boolean,
  props: Record<string, unknown>
): Record<string, unknown> {
  const motionProps: Record<string, unknown> = {}
  if (isMotion) {
    Object.entries(props).forEach(([key, value]) => {
      if (value !== undefined && MOTION_PROPS.includes(key)) {
        motionProps[key] = value
      }
    })
  }
  return motionProps
}

export interface BorderProps {
  border?: boolean | "t" | "b" | "l" | "r" | "x" | "y"
  borderColor?: string
  smBorder?: boolean | "t" | "b" | "l" | "r" | "x" | "y" | { t?: boolean; b?: boolean; l?: boolean; r?: boolean }
  mdBorder?: boolean | "t" | "b" | "l" | "r" | "x" | "y" | { t?: boolean; b?: boolean; l?: boolean; r?: boolean }
  lgBorder?: boolean | "t" | "b" | "l" | "r" | "x" | "y" | { t?: boolean; b?: boolean; l?: boolean; r?: boolean }
  xlBorder?: boolean | "t" | "b" | "l" | "r" | "x" | "y" | { t?: boolean; b?: boolean; l?: boolean; r?: boolean }
}

export function resolveBorderClasses({
  border,
  borderColor,
  smBorder,
  mdBorder,
  lgBorder,
  xlBorder,
}: BorderProps): string {
  return cn(
    border === true && "border border-line",
    border === "t" && "border-t border-line",
    border === "b" && "border-b border-line",
    border === "l" && "border-l border-line",
    border === "r" && "border-r border-line",
    border === "x" && "border-x border-line",
    border === "y" && "border-y border-line",
    borderColor && resolveJIT(borderColor, "border"),
    smBorder && `sm:border-${smBorder}`,
    mdBorder && `md:border-${mdBorder}`,
    lgBorder && `lg:border-${lgBorder}`,
    xlBorder && `xl:border-${xlBorder}`
  )
}

export interface BoxClassOptions extends BorderProps {
  className?: string
  panel?: boolean
  layoutProp?: unknown
  shadow?: keyof typeof shadows
  surface?: keyof typeof variants.surface | boolean
  bgGradient?: string
  emphasis?: keyof typeof variants.emphasis
  radiusProp?: keyof typeof variants.radius
  gap?: ResponsiveProp<number | string>
  gapX?: ResponsiveProp<number | string>
  gapY?: ResponsiveProp<number | string>
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
  flex?: number | string | boolean
  wrap?: boolean
  flexWrap?: boolean | "wrap" | "wrap-reverse" | "nowrap"
  position?: "fixed" | "sticky" | "absolute" | "relative"
  inset?: boolean | "top" | "bottom" | "left" | "right" | "x" | "y"
  height?: ResponsiveProp<"full" | "screen" | "auto" | "min" | "fit" | number | string>
  width?: ResponsiveProp<"0" | "full" | "min" | "fit" | "auto" | "screen" | number | string>
  maxWidth?: ResponsiveProp<"xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "6xl" | "7xl" | "full" | "prose" | "screen-sm" | "screen-md" | "screen-lg" | "screen-xl" | "screen-2xl">
  minHeight?: ResponsiveProp<"0" | "full" | "min" | "fit" | number | string>
  maxHeight?: ResponsiveProp<"full" | "screen" | "auto" | "min" | "fit" | number | string>
  minWidth?: ResponsiveProp<"0" | "full" | "min" | "fit" | number | string>
  overflow?: "auto" | "hidden" | "scroll" | "x-auto" | "y-auto" | "y-hidden" | "visible"
  overflowX?: "auto" | "hidden" | "scroll" | "visible"
  overflowY?: "auto" | "hidden" | "scroll" | "visible"
  overscroll?: "auto" | "contain" | "none" | "x-contain" | "y-contain"
  isolation?: "isolate" | "auto"
  noScrollbar?: boolean
  pointerEvents?: "auto" | "none" | "inherit" | "initial" | "revert" | "unset"
  zIndex?: number | string
  opacity?: number | string | keyof typeof opacityTokens
  opacityVariant?: keyof typeof opacityTokens
  display?: ResponsiveProp<"none" | "block" | "flex" | "grid" | "inline" | "inline-block">
  aspect?: ResponsiveProp<"square" | "video" | "auto" | string>
  shrink?: number | boolean
  span?: ResponsiveProp<number | string>
  cursor?: "auto" | "default" | "pointer" | "wait" | "text" | "move" | "help" | "not-allowed" | "none" | string
  self?: "start" | "center" | "end" | "stretch" | "auto"
  textAlign?: ResponsiveProp<"left" | "center" | "right" | "justify">
  justify?: "start" | "center" | "end" | "between" | "around" | "evenly"
  align?: "start" | "center" | "end" | "baseline" | "stretch"
  top?: ResponsiveProp<keyof typeof spacing | number | string>
  right?: ResponsiveProp<keyof typeof spacing | number | string>
  bottom?: ResponsiveProp<keyof typeof spacing | number | string>
  left?: ResponsiveProp<keyof typeof spacing | number | string>
  scrollMarginTop?: ResponsiveProp<keyof typeof spacing | number | string>
  scrollBehavior?: "smooth" | "auto"
}

export function buildBoxClasses(options: BoxClassOptions): string {
  const {
    className,
    panel,
    layoutProp,
    shadow,
    surface,
    bgGradient,
    emphasis,
    radiusProp,
    gap, gapX, gapY,
    padding, paddingTop, paddingBottom, paddingLeft, paddingRight, paddingX, paddingY,
    margin, marginTop, marginBottom, marginLeft, marginRight, marginX, marginY,
    flex, wrap, flexWrap,
    position, inset, height, width, maxWidth, minHeight, maxHeight, minWidth,
    overflow, overflowX, overflowY, overscroll,
    isolation, noScrollbar, pointerEvents,
    zIndex, opacity, opacityVariant,
    display, aspect, shrink, span, cursor, self, textAlign,
    justify, align, top, right, bottom, left, scrollMarginTop, scrollBehavior,
    ...borderProps
  } = options

  return cn(
    panel && layoutTokens.panel,
    layoutProp && typeof layoutProp === "string" && layoutTokens[layoutProp as keyof typeof layoutTokens],
    shadow && SHADOW_MAP[shadow],
    typeof surface === "string" ? variants.surface[surface] : (surface && "bg-surface"),
    bgGradient,
    emphasis && variants.emphasis[emphasis],
    radiusProp && RADIUS_MAP[radiusProp],
    resolveBorderClasses(borderProps),
    applyResponsive(gap, resolveSpacing("gap")),
    applyResponsive(gapX, resolveSpacing("gap-x")),
    applyResponsive(gapY, resolveSpacing("gap-y")),
    applyResponsive(padding, resolveSpacing("p")),
    padding && typeof padding === "string" && spacing[padding as keyof typeof spacing],
    applyResponsive(paddingTop, resolveSpacing("pt")),
    applyResponsive(paddingBottom, resolveSpacing("pb")),
    applyResponsive(paddingLeft, resolveSpacing("pl")),
    applyResponsive(paddingRight, resolveSpacing("pr")),
    applyResponsive(paddingX, resolveSpacing("px")),
    applyResponsive(paddingY, resolveSpacing("py")),
    applyResponsive(margin, resolveSpacing("m")),
    applyResponsive(marginTop, resolveSpacing("mt")),
    applyResponsive(marginBottom, resolveSpacing("mb")),
    applyResponsive(marginLeft, resolveSpacing("ml")),
    applyResponsive(marginRight, resolveSpacing("mr")),
    applyResponsive(marginX, resolveSpacing("mx")),
    applyResponsive(marginY, resolveSpacing("my")),
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
    applyResponsive(height, (v) => resolveJIT(v, "h")),
    applyResponsive(width, (v) => resolveJIT(v, "w")),
    applyResponsive(maxWidth, (v) => resolveJIT(v, "max-w")),
    applyResponsive(minHeight, (v) => resolveJIT(v, "min-h")),
    applyResponsive(maxHeight, (v) => resolveJIT(v, "max-h")),
    applyResponsive(minWidth, (v) => resolveJIT(v, "min-w")),
    overflow && (overflow === "y-auto" ? "overflow-y-auto" : overflow === "x-auto" ? "overflow-x-auto" : overflow === "y-hidden" ? "overflow-y-hidden" : `overflow-${overflow}`),
    overflowX && `overflow-x-${overflowX}`,
    overflowY && `overflow-y-${overflowY}`,
    overscroll && (overscroll === "x-contain" ? "overscroll-x-contain" : overscroll === "y-contain" ? "overscroll-y-contain" : `overscroll-${overscroll}`),
    isolation,
    noScrollbar && "no-scrollbar",
    pointerEvents && `pointer-events-${pointerEvents}`,
    zIndex && (zIndexTokens[zIndex as keyof typeof zIndexTokens] !== undefined ? resolveJIT(zIndexTokens[zIndex as keyof typeof zIndexTokens], "z") : resolveJIT(zIndex, "z")),
    (opacityVariant || opacity !== undefined) && resolveJIT(
      opacityVariant
        ? opacityTokens[opacityVariant]
        : (typeof opacity === "string" && opacity in opacityTokens
            ? opacityTokens[opacity as keyof typeof opacityTokens]
            : opacity),
      "opacity"
    ),
    applyResponsive(display, (v) => v === "none" ? "hidden" : (v as string)),
    applyResponsive(aspect, (v) => {
      if (v === "square" || v === "video") return `aspect-${v}`;
      return v ? `aspect-[${v}]` : ""; // impeccable-ignore - Arbitrary aspect ratios are supported via props.
    }),
    shrink === true && "shrink",
    shrink === false && "shrink-0",
    shrink !== undefined && typeof shrink === "number" && `shrink-${shrink}`,
    applyResponsive(span, (v) => SPAN_MAP[v as keyof typeof SPAN_MAP] || ""),
    cursor && `cursor-${cursor}`,
    self && (self === "start" ? "self-start" : self === "center" ? "self-center" : self === "end" ? "self-end" : self === "stretch" ? "self-stretch" : "self-auto"),
    applyResponsive(textAlign, (v) => resolveJIT(v, "text")),
    justify && (justify === "start" ? "justify-start" : justify === "center" ? "justify-center" : justify === "end" ? "justify-end" : justify === "between" ? "justify-between" : justify === "around" ? "justify-around" : "justify-evenly"),
    align && (align === "start" ? "items-start" : align === "center" ? "items-center" : align === "end" ? "items-end" : align === "baseline" ? "items-baseline" : "items-stretch"),
    applyResponsive(top, resolveSpacing("top")),
    applyResponsive(right, resolveSpacing("right")),
    applyResponsive(bottom, resolveSpacing("bottom")),
    applyResponsive(left, resolveSpacing("left")),
    applyResponsive(scrollMarginTop, (v) => resolveJIT(v, "scroll-mt")),
    scrollBehavior && `scroll-${scrollBehavior}`,
    className
  )
}
