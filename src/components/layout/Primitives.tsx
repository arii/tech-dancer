import React from "react"
import { motion } from "motion/react"
import { cn, composeStyles } from "@/lib/utils"
import { typography, spacing, layout as layoutTokens, typeSizes, shadows, zIndices } from "@/styles/design-tokens"
import { variants } from "@/styles/variants"

type ResponsiveProp<T> = T | { base?: T, sm?: T, md?: T, lg?: T, xl?: T }

function getResponsiveClasses(prop: ResponsiveProp<any>, classPrefix: string, mapper?: (val: any) => string) {
  if (prop === undefined) return ""
  if (typeof prop !== "object" || React.isValidElement(prop)) {
    const val = mapper ? mapper(prop) : prop
    return val ? `${classPrefix}${val}` : ""
  }

  const { base, sm, md, lg, xl } = prop as any
  return cn(
    base && `${classPrefix}${mapper ? mapper(base) : base}`,
    sm && `sm:${classPrefix}${mapper ? mapper(sm) : sm}`,
    md && `md:${classPrefix}${mapper ? mapper(md) : md}`,
    lg && `lg:${classPrefix}${mapper ? mapper(lg) : lg}`,
    xl && `xl:${classPrefix}${mapper ? mapper(xl) : xl}`
  )
}

interface BaseProps {
  padding?: ResponsiveProp<keyof typeof spacing | number | string>
  paddingTop?: ResponsiveProp<keyof typeof spacing | number | string>
  paddingBottom?: ResponsiveProp<keyof typeof spacing | number | string>
  paddingLeft?: ResponsiveProp<keyof typeof spacing | number | string>
  paddingRight?: ResponsiveProp<keyof typeof spacing | number | string>
  paddingX?: ResponsiveProp<keyof typeof spacing | number | string>
  paddingY?: ResponsiveProp<keyof typeof spacing | number | string>
  marginTop?: ResponsiveProp<keyof typeof spacing | number | string | "auto">
  marginBottom?: ResponsiveProp<keyof typeof spacing | number | string | "auto">
  marginX?: ResponsiveProp<keyof typeof spacing | number | string | "auto">
  marginY?: ResponsiveProp<keyof typeof spacing | number | string | "auto">
  gap?: ResponsiveProp<number | string>
  border?: boolean | "t" | "b" | "l" | "r" | "x" | "y"
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
  insetTop?: ResponsiveProp<number | string>
  insetRight?: ResponsiveProp<number | string>
  insetBottom?: ResponsiveProp<number | string>
  insetLeft?: ResponsiveProp<number | string>
  insetX?: ResponsiveProp<number | string>
  insetY?: ResponsiveProp<number | string>
  height?: "full" | "screen" | "auto" | "min" | "fit" | number
  width?: "full" | "screen" | "auto" | "min" | "fit" | number
  maxWidth?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "6xl" | "7xl" | "full" | "prose" | "screen-sm" | "screen-md" | "screen-lg" | "screen-xl" | "screen-2xl"
  minHeight?: "0" | "full" | "screen" | "min" | "fit" | number
  minWidth?: "0" | "full" | "min" | "fit" | number
  overflow?: "auto" | "hidden" | "scroll" | "x-auto" | "y-auto" | "y-hidden"
  zIndex?: number | "top" | "max"
  opacity?: number | string
  display?: ResponsiveProp<"none" | "block" | "flex" | "grid" | "inline" | "inline-block">
  aspect?: "square" | "video" | "auto" | string
  shrink?: number | boolean
  span?: ResponsiveProp<number | string>
  cursor?: "pointer" | "default" | "not-allowed"
}

interface BoxProps extends BaseProps, React.HTMLAttributes<HTMLDivElement> {
  as?: any
  [key: string]: any
}

export const Box = React.forwardRef<HTMLDivElement, BoxProps>(
  ({ 
    className, 
    as: Component = "div", 
    padding, 
    paddingTop,
    paddingBottom,
    paddingLeft,
    paddingRight,
    paddingX,
    paddingY,
    marginTop,
    marginBottom,
    marginX,
    marginY,
    gap, 
    border, 
    surface, 
    emphasis, 
    radius: radiusProp, 
    panel, 
    flex, 
    wrap, 
    layout, 
    shadow,
    position,
    inset,
    insetTop,
    insetRight,
    insetBottom,
    insetLeft,
    insetX,
    insetY,
    height,
    width,
    maxWidth,
    minHeight,
    minWidth,
    overflow,
    zIndex,
    opacity,
    display,
    aspect,
    shrink,
    span,
    cursor,
    ...props 
  }, ref) => {
    return (
      <Component
        ref={ref}
        className={composeStyles(
          panel && layoutTokens.panel,
          layout && layoutTokens[layout],
          shadow && shadows[shadow as keyof typeof shadows],
          typeof surface === "string" ? variants.surface[surface as keyof typeof variants.surface] : (surface && "bg-surface"),
          emphasis && variants.emphasis[emphasis as keyof typeof variants.emphasis],
          radiusProp && variants.radius[radiusProp as keyof typeof variants.radius],
          border === true && "border border-line",
          border === "t" && "border-t border-line",
          border === "b" && "border-b border-line",
          border === "l" && "border-l border-line",
          border === "r" && "border-r border-line",
          border === "x" && "border-x border-line",
          border === "y" && "border-y border-line",
          getResponsiveClasses(gap, "gap-"),
          getResponsiveClasses(padding, "p-"),
          getResponsiveClasses(paddingTop, "pt-"),
          getResponsiveClasses(paddingBottom, "pb-"),
          getResponsiveClasses(paddingLeft, "pl-"),
          getResponsiveClasses(paddingRight, "pr-"),
          getResponsiveClasses(paddingX, "px-"),
          getResponsiveClasses(paddingY, "py-"),
          getResponsiveClasses(marginTop, "mt-"),
          getResponsiveClasses(marginBottom, "mb-"),
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
          getResponsiveClasses(insetTop, "top-"),
          getResponsiveClasses(insetRight, "right-"),
          getResponsiveClasses(insetBottom, "bottom-"),
          getResponsiveClasses(insetLeft, "left-"),
          getResponsiveClasses(insetX, "inset-x-"),
          getResponsiveClasses(insetY, "inset-y-"),
          height && (typeof height === "number" ? `h-${height}` : `h-${height}`),
          width && (typeof width === "number" ? `w-${width}` : `w-${width}`),
          maxWidth && `max-w-${maxWidth}`,
          minHeight && `min-h-${minHeight}`,
          minWidth && (typeof minWidth === "number" ? `min-w-[${minWidth}px]` : `min-w-${minWidth}`),
          overflow === "auto" && "overflow-auto",
          overflow === "hidden" && "overflow-hidden",
          overflow === "scroll" && "overflow-scroll",
          overflow === "x-auto" && "overflow-x-auto",
          overflow === "y-auto" && "overflow-y-auto",
          overflow === "y-hidden" && "overflow-y-hidden",
          zIndex !== undefined && (typeof zIndex === "string" ? `z-${zIndices[zIndex as keyof typeof zIndices] || zIndex}` : `z-${zIndex}`),
          opacity !== undefined && (typeof opacity === "string" ? `opacity-${opacity}` : `opacity-${opacity}`),
          getResponsiveClasses(display, ""),
          aspect && (aspect === "square" || aspect === "video" ? `aspect-${aspect}` : `aspect-[${aspect}]`),
          shrink === true && "shrink",
          shrink === false && "shrink-0",
          shrink !== undefined && typeof shrink === "number" && `shrink-${shrink}`,
          getResponsiveClasses(span, "col-span-"),
          cursor && `cursor-${cursor}`,
          className
        )}
        {...props}
      />
    )
  }
)
Box.displayName = "Box"

export const Container = React.forwardRef<HTMLDivElement, BoxProps>(
  ({ maxWidth = "7xl", marginX = "auto", paddingX = { base: "md", md: "lg" }, ...props }, ref) => (
    <Box ref={ref} maxWidth={maxWidth} marginX={marginX} paddingX={paddingX} {...props} />
  )
)
Container.displayName = "Container"

export const Inline = React.forwardRef<HTMLDivElement, StackProps>(
  ({ direction = "row", align = "center", gap = 2, ...props }, ref) => (
    <Stack ref={ref} direction={direction} align={align} gap={gap} {...props} />
  )
)
Inline.displayName = "Inline"

interface IconProps extends React.SVGAttributes<SVGElement> {
  icon: any
  size?: keyof typeof typeSizes | number
  color?: "main" | "dim" | "accent" | "brand" | "contrast"
}

export const Icon = ({ icon: LucideIcon, size = "base", color = "main", className, ...props }: IconProps) => (
  <LucideIcon 
    className={cn(
      color === "main" && "text-text-main",
      color === "dim" && "text-text-dim",
      color === "accent" && "text-accent",
      color === "brand" && "text-accent-brand",
      color === "contrast" && "text-bg",
      typeof size === "string" ? typeSizes[size as keyof typeof typeSizes] : `w-${size} h-${size}`,
      !size && "w-5 h-5",
      className
    )} 
    {...props} 
  />
)
Icon.displayName = "Icon"

export const Motion = motion(Box);

interface StackProps extends BoxProps {
  direction?: ResponsiveProp<"row" | "col">
  align?: ResponsiveProp<"start" | "center" | "end" | "stretch" | "baseline">
  justify?: ResponsiveProp<"start" | "center" | "end" | "between" | "around" | "evenly">
}

export const Stack = React.forwardRef<HTMLDivElement, StackProps>(
  ({ className, direction = "col", gap = 4, align, justify, ...props }, ref) => {
    const directionMapper = (d: string) => d === "col" ? "flex-col" : "flex-row"
    const alignMapper = (a: string) => a === "start" ? "items-start" : a === "center" ? "items-center" : a === "end" ? "items-end" : a === "stretch" ? "items-stretch" : a === "baseline" ? "items-baseline" : ""
    const justifyMapper = (j: string) => j === "start" ? "justify-start" : j === "center" ? "justify-center" : j === "end" ? "justify-end" : j === "between" ? "justify-between" : j === "around" ? "justify-around" : j === "evenly" ? "justify-evenly" : ""

    return (
      <Box
        ref={ref}
        className={composeStyles(
          "flex",
          getResponsiveClasses(direction, "", directionMapper),
          getResponsiveClasses(align, "", alignMapper),
          getResponsiveClasses(justify, "", justifyMapper),
          className
        )}
        gap={gap}
        {...props}
      />
    )
  }
)
Stack.displayName = "Stack"

interface TextProps extends BaseProps, React.HTMLAttributes<HTMLSpanElement> {
  as?: any
  variant?: keyof typeof typography
  intent?: keyof typeof variants.intent
  color?: "main" | "body" | "dim" | "accent" | "brand"
  size?: keyof typeof typeSizes
  weight?: string
  align?: "left" | "center" | "right" | "justify"
  tracking?: "tighter" | "tight" | "normal" | "wide" | "wider" | "widest"
  uppercase?: boolean
  lowercase?: boolean
  capitalize?: boolean
  [key: string]: any
}

export const Text = React.forwardRef<HTMLSpanElement, TextProps>(
  ({ 
    className, 
    as: Component = "span", 
    variant, 
    intent, 
    color = "main", 
    size, 
    weight, 
    align, 
    tracking, 
    uppercase, 
    lowercase, 
    capitalize,
    // BaseProps for filtering
    padding, paddingTop, paddingBottom, paddingLeft, paddingRight, paddingX, paddingY,
    marginTop, marginBottom, marginX, marginY, gap, border, surface, emphasis, radius,
    panel, flex, wrap, layout, shadow, position, inset, 
    insetTop, insetRight, insetBottom, insetLeft, insetX, insetY,
    height, width, maxWidth,
    minHeight, minWidth, overflow, zIndex, opacity, display, aspect, shrink, span, cursor,
    ...props 
  }, ref) => {
    return (
      <Box
        as={Component}
        ref={ref as any}
        className={composeStyles(
          variant && typography[variant],
          intent && variants.intent[intent],
          !intent && color === "main" && "text-text-main",
          !intent && color === "body" && "text-text-body",
          !intent && color === "dim" && "text-text-dim",
          !intent && color === "accent" && "text-accent",
          !intent && color === "brand" && "text-accent-brand",
          size && typeSizes[size],
          weight,
          align && `text-${align}`,
          tracking && `tracking-${tracking}`,
          uppercase && "uppercase",
          lowercase && "lowercase",
          capitalize && "capitalize",
          className
        )}
        padding={padding} paddingTop={paddingTop} paddingBottom={paddingBottom} 
        paddingLeft={paddingLeft} paddingRight={paddingRight} paddingX={paddingX} paddingY={paddingY}
        marginTop={marginTop} marginBottom={marginBottom} marginX={marginX} marginY={marginY}
        gap={gap} border={border} surface={surface} emphasis={emphasis} radius={radius}
        panel={panel} flex={flex} wrap={wrap} layout={layout} shadow={shadow}
        position={position} inset={inset} 
        insetTop={insetTop} insetRight={insetRight} insetBottom={insetBottom} insetLeft={insetLeft} insetX={insetX} insetY={insetY}
        height={height} width={width} maxWidth={maxWidth}
        minHeight={minHeight} minWidth={minWidth} overflow={overflow} zIndex={zIndex}
        opacity={opacity} display={display} aspect={aspect} shrink={shrink} span={span} cursor={cursor}
        {...props}
      />
    )
  }
)
Text.displayName = "Text"

export const Grid = React.forwardRef<HTMLDivElement, BoxProps & { 
  cols?: ResponsiveProp<number | string>,
}>(
  ({ className, cols = 12, ...props }, ref) => {
    return (
      <Box
        ref={ref}
        className={composeStyles(
          "grid",
          getResponsiveClasses(cols, "grid-cols-"),
          className
        )}
        {...props}
      />
    )
  }
)
Grid.displayName = "Grid"

interface InputProps extends BaseProps, Omit<React.InputHTMLAttributes<HTMLInputElement>, 'height' | 'width' | 'size'> {
  [key: string]: any
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => (
    <Box
      as="input"
      ref={ref as any}
      className={cn(
        "bg-bg border border-line px-4 py-3 text-sm font-sans focus:outline-none focus:border-accent transition-all placeholder:text-text-dim/50",
        className
      )}
      {...props}
    />
  )
)
Input.displayName = "Input"

interface SelectProps extends BaseProps, Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'height' | 'width' | 'size'> {
  [key: string]: any
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, ...props }, ref) => (
    <Box
      as="select"
      ref={ref as any}
      className={cn(
        "bg-bg border border-line px-4 py-3 text-sm font-sans focus:outline-none focus:border-accent transition-all",
        className
      )}
      {...props}
    />
  )
)
Select.displayName = "Select"

interface TextareaProps extends BaseProps, Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'height' | 'width' | 'wrap'> {
  [key: string]: any
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => (
    <Box
      as="textarea"
      ref={ref as any}
      className={cn(
        "bg-bg border border-line px-4 py-3 text-sm font-mono focus:outline-none focus:border-accent transition-all resize-none",
        className
      )}
      {...props}
    />
  )
)
Textarea.displayName = "Textarea"

interface ButtonProps extends BaseProps, React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: keyof typeof variants.emphasis
  intent?: keyof typeof variants.intent
  size?: "sm" | "md" | "lg"
  fullWidth?: boolean
  loading?: boolean
  [key: string]: any
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "solid", intent = "default", size = "md", fullWidth, loading, children, ...props }, ref) => {
    return (
      <Box
        as="button"
        ref={ref as any}
        className={cn(
          "inline-flex items-center justify-center transition-all duration-300 font-bold uppercase tracking-widest disabled:opacity-50 disabled:cursor-not-allowed",
          variants.emphasis[variant],
          variants.intent[intent],
          size === "sm" && "px-4 py-2 text-[10px]",
          size === "md" && "px-6 py-3 text-xs",
          size === "lg" && "px-8 py-4 text-sm",
          fullWidth && "w-full",
          className
        )}
        {...props}
      >
        {children}
      </Box>
    )
  }
)
Button.displayName = "Button"
