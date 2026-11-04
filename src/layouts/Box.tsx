/** Fundamental Box layout primitive for design system props. */
import * as React from "react"
import { forwardRef, HTMLAttributes, ElementType } from "react"
import { spacing, layout as layoutTokens, shadows, opacity as opacityTokens } from "@/styles/design-tokens"
import { variants } from "@/lib/variants"
import { type ResponsiveProp } from "@/lib/style-utils"
import {
  type ComponentWithDisplayName,
  filterMotionProps,
  buildBoxClasses,
} from "./box-styles"

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
  smBorder?: boolean | "t" | "b" | "l" | "r" | "x" | "y" | { t?: boolean; b?: boolean; l?: boolean; r?: boolean }
  mdBorder?: boolean | "t" | "b" | "l" | "r" | "x" | "y" | { t?: boolean; b?: boolean; l?: boolean; r?: boolean }
  lgBorder?: boolean | "t" | "b" | "l" | "r" | "x" | "y" | { t?: boolean; b?: boolean; l?: boolean; r?: boolean }
  xlBorder?: boolean | "t" | "b" | "l" | "r" | "x" | "y" | { t?: boolean; b?: boolean; l?: boolean; r?: boolean }
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
    justify, align, scrollBehavior, scrollPaddingTop, scrollMarginTop,
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
    const isMotion = typeof Component !== "string" && Boolean((Component as ComponentWithDisplayName)?.render?.displayName?.startsWith('motion'));

    const motionProps = filterMotionProps(isMotion, {
      initial: _initial, animate: _animate, exit: _exit, transition: _transition, variants: variantsProp,
      whileHover: _whileHover, whileTap: _whileTap, whileFocus: _whileFocus, whileDrag: _whileDrag, whileInView: _whileInView, viewport: _viewport,
      layout: layoutProp, layoutId: layoutId, onAnimationStart: onAnimationStart, onAnimationComplete: onAnimationComplete,
      onUpdate: onUpdate, custom: custom
    });

    const boxClasses = buildBoxClasses({
      className,
      panel,
      layoutProp,
      shadow,
      surface,
      bgGradient,
      emphasis,
      radiusProp,
      border,
      borderColor,
      smBorder,
      mdBorder,
      lgBorder,
      xlBorder,
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
    });

    // Remove props that shouldn't be spread to DOM elements
    const { 
      // ... already destructured above
      ...domProps 
    } = props;

    return (
      <Component
        ref={ref}
        className={boxClasses}
        style={{ // impeccable-ignore - Dynamic and motion-driven styles require inline style pass-through.
          ...((scrollPaddingTop !== undefined) ? { scrollPaddingTop: typeof scrollPaddingTop === 'number' ? `${scrollPaddingTop}px` : scrollPaddingTop } : {}),
          ...(motionProps.style as React.CSSProperties | undefined),
          ...props.style
        }}
        {...motionProps}
        {...domProps}
      />
    )
  }
)
Box.displayName = "Box"
