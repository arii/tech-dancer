import { type HTMLAttributes, type ElementType, forwardRef } from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

export const boxVariants = cva("", {
  variants: {
    surface: {
      default: "bg-surface",
      primary: "bg-primary text-white",
      secondary: "bg-secondary text-white",
      dark: "bg-dark text-white",
      light: "bg-light text-dark",
    },
    emphasis: {
      high: "shadow-md ring-1 ring-black/5",
      medium: "shadow-sm ring-1 ring-black/5",
      low: "opacity-80",
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
      xl: "shadow-xl",
    },
  },
  defaultVariants: {
    surface: undefined,
    emphasis: undefined,
    radius: undefined,
    shadow: undefined,
  },
})

export interface BoxProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof boxVariants> {
  as?: ElementType
  panel?: boolean
  flex?: boolean | number | string
  padding?: any
  paddingTop?: any
  paddingBottom?: any
  paddingLeft?: any
  paddingRight?: any
  paddingX?: any
  paddingY?: any
  margin?: any
  marginTop?: any
  marginBottom?: any
  marginLeft?: any
  marginRight?: any
  marginX?: any
  marginY?: any
  gap?: any
  gapX?: any
  gapY?: any
  border?: any
  borderColor?: any
  smBorder?: any
  mdBorder?: any
  lgBorder?: any
  xlBorder?: any
  position?: any
  inset?: any
  height?: any
  width?: any
  maxWidth?: any
  minHeight?: any
  maxHeight?: any
  minWidth?: any
  overflow?: any
  overflowX?: any
  overflowY?: any
  overscroll?: any
  isolation?: any
  noScrollbar?: any
  pointerEvents?: any
  zIndex?: any
  opacity?: any
  opacityVariant?: any
  display?: any
  aspect?: any
  shrink?: any
  self?: any
  span?: any
  cursor?: any
  flexWrap?: any
  textAlign?: any
  justify?: any
  align?: any
  scrollBehavior?: any
  scrollPaddingTop?: any
  scrollMarginTop?: any
  top?: any
  right?: any
  bottom?: any
  left?: any
  bgGradient?: any
}

export const Box = forwardRef<HTMLDivElement, BoxProps>(
  ({ className, as: Component = "div", surface, emphasis, radius, shadow, panel, flex,
  padding: _padding, paddingTop: _paddingTop, paddingBottom: _paddingBottom, paddingLeft: _paddingLeft, paddingRight: _paddingRight, paddingX: _paddingX, paddingY: _paddingY,
  margin: _margin, marginTop: _marginTop, marginBottom: _marginBottom, marginLeft: _marginLeft, marginRight: _marginRight, marginX: _marginX, marginY: _marginY,
  gap: _gap, gapX: _gapX, gapY: _gapY, border: _border, borderColor: _borderColor, smBorder: _smBorder, mdBorder: _mdBorder, lgBorder: _lgBorder, xlBorder: _xlBorder,
  position: _position, inset: _inset, height: _height, width: _width, maxWidth: _maxWidth, minHeight: _minHeight, maxHeight: _maxHeight, minWidth: _minWidth,
  overflow: _overflow, overflowX: _overflowX, overflowY: _overflowY, overscroll: _overscroll, isolation: _isolation, noScrollbar: _noScrollbar, pointerEvents: _pointerEvents,
  zIndex: _zIndex, opacity: _opacity, opacityVariant: _opacityVariant, display: _display, aspect: _aspect, shrink: _shrink, self: _self, span: _span, cursor: _cursor, flexWrap: _flexWrap, textAlign: _textAlign,
  justify: _justify, align: _align, scrollBehavior: _scrollBehavior, scrollPaddingTop: _scrollPaddingTop, scrollMarginTop: _scrollMarginTop,
  top: _top, right: _right, bottom: _bottom, left: _left, bgGradient: _bgGradient,
   ...props }, ref) => {
    return (
      <Component
        ref={ref}
        className={cn(
          boxVariants({ surface, emphasis, radius, shadow }),
          panel && "bg-surface shadow-sm rounded-lg border border-line",
          flex === true && "flex-1",
          flex !== undefined && typeof flex !== "boolean" && (typeof flex === "number" ? `flex-${flex}` : flex),
          className
        )}
        {...props}
      />
    )
  }
)
Box.displayName = "Box"
