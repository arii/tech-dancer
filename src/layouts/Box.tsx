import * as React from "react"
import { forwardRef, HTMLAttributes, ElementType } from "react"
import { cn } from "@/lib/utils"
import { spacing, layout as layoutTokens, shadows, zIndex as zIndexTokens, opacity as opacityTokens } from "@/styles/design-tokens"
import { variants } from "@/lib/variants"
import { RADIUS_MAP, SHADOW_MAP, SPAN_MAP } from "./layout-maps"
import { resolveJIT, resolveSpacing, applyResponsive, type ResponsiveProp } from "@/lib/style-utils"

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
  border?: ResponsiveProp<boolean | "t" | "b" | "l" | "r" | "x" | "y">
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
  isolation?: "isolate" | "auto"
  noScrollbar?: boolean
  pointerEvents?: "auto" | "none" | "inherit" | "initial" | "revert" | "unset"
  zIndex?: number | string
  opacity?: number | string | keyof typeof opacityTokens
  opacityVariant?: keyof typeof opacityTokens
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
    overflow, overflowX, overflowY, overscroll, isolation, noScrollbar, pointerEvents,
    zIndex, opacity, opacityVariant, display, aspect, shrink, self, span, cursor, flexWrap, textAlign,
    justify, align, scrollBehavior: _scrollBehavior, scrollPaddingTop, scrollMarginTop,
    top, right, bottom, left, bgGradient,
    // Motion props filtering
    initial: _initial, animate: _animate, exit: _exit, transition: _transition, variants: variantsProp,
    whileHover: _whileHover, whileTap: _whileTap, whileFocus: _whileFocus, whileDrag: _whileDrag, whileInView: _whileInView, viewport: _viewport,
    layout: layoutProp, layoutId, onAnimationStart, onAnimationComplete,
    onUpdate, custom,
    // Add missing motion props to destructuring so they are not in ...props
    style: _style,
    drag: _drag,
    dragControls: _dragControls,
    dragConstraints: _dragConstraints,
    dragElastic: _dragElastic,
    dragMomentum: _dragMomentum,
    dragPropagation: _dragPropagation,
    dragTransition: _dragTransition,
    dragListener: _dragListener,
    onDragStart: _onDragStart,
    onDragEnd: _onDragEnd,
    onDrag: _onDrag,
    onDirectionLock: _onDirectionLock,
    onDragTransitionEnd: _onDragTransitionEnd,
    onHoverStart: _onHoverStart,
    onHoverEnd: _onHoverEnd,
    onTap: _onTap,
    onTapStart: _onTapStart,
    onTapCancel: _onTapCancel,
    onPan: _onPan,
    onPanStart: _onPanStart,
    onPanSessionStart: _onPanSessionStart,
    onPanEnd: _onPanEnd,
    whileTransitionSelection: _whileTransitionSelection,
    ...props 
  }, ref) => {
    const isMotion = typeof Component !== "string"
    
    const MOTION_PROPS = [
      'initial', 'animate', 'exit', 'transition', 'variants',
      'whileHover', 'whileTap', 'whileFocus', 'whileDrag', 'whileInView',
      'viewport', 'layout', 'layoutId', 'onAnimationStart',
      'onAnimationComplete', 'onUpdate', 'custom'
    ];


    const motionProps: Record<string, unknown> = {}
    if (isMotion) {
      const allMotionProps = {
        initial: _initial, animate: _animate, exit: _exit, transition: _transition, variants: variantsProp,
        whileHover: _whileHover, whileTap: _whileTap, whileFocus: _whileFocus, whileDrag: _whileDrag, whileInView: _whileInView, viewport: _viewport,
        layout: layoutProp, layoutId: layoutId, onAnimationStart: onAnimationStart, onAnimationComplete: onAnimationComplete,
        onUpdate: onUpdate, custom: custom
      };

      Object.entries(allMotionProps).forEach(([key, value]) => {
        if (value !== undefined && MOTION_PROPS.includes(key)) {
          motionProps[key] = value;
        }
      });
    }

    const mapBorder = (v: boolean | "t" | "b" | "l" | "r" | "x" | "y") => {
      if (v === true) return "border border-line"
      if (v) return `border-${v} border-line`
      return ""
    }

    const borderClasses = cn(
      applyResponsive(border, mapBorder),
      borderColor && resolveJIT(borderColor, "border"),
      smBorder && (typeof smBorder === "boolean" ? `sm:border${smBorder === true ? "" : "-0"}` : (typeof smBorder === "string" ? `sm:border-${smBorder}` : "")),
      mdBorder && (typeof mdBorder === "boolean" ? `md:border${mdBorder === true ? "" : "-0"}` : (typeof mdBorder === "string" ? `md:border-${mdBorder}` : "")),
      lgBorder && (typeof lgBorder === "boolean" ? `lg:border${lgBorder === true ? "" : "-0"}` : (typeof lgBorder === "string" ? `lg:border-${lgBorder}` : "")),
      xlBorder && (typeof xlBorder === "boolean" ? `xl:border${xlBorder === true ? "" : "-0"}` : (typeof xlBorder === "string" ? `xl:border-${xlBorder}` : ""))
    )

    // Remove props that shouldn't be spread to DOM elements
    const { 
      // ... already destructured above
      ...domProps 
    } = props;


    return (
      <Component
        ref={ref}
        className={cn(
          panel && layoutTokens.panel,
          layoutProp && typeof layoutProp === "string" && layoutTokens[layoutProp as keyof typeof layoutTokens],
          shadow && SHADOW_MAP[shadow],
          typeof surface === "string" ? variants.surface[surface] : (surface && "bg-surface"),
          bgGradient,
          emphasis && variants.emphasis[emphasis],
          radiusProp && RADIUS_MAP[radiusProp],
          borderClasses,
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
