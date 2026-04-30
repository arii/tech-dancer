import { forwardRef, Ref, ElementType, HTMLAttributes } from "react"
import { composeStyles } from "@/lib/utils"
import { typeSizes } from "@/styles/design-tokens"
import { textVariants } from "@/lib/variants"
import { Box, BaseProps } from "./Box"
import { getResponsiveClasses, type ResponsiveProp } from "./system-utils"
import type { VariantProps } from "class-variance-authority"

export interface TextProps
  extends Omit<BaseProps, "align">,
    HTMLAttributes<HTMLElement>,
    Omit<VariantProps<typeof textVariants>, "variant"> {
  as?: ElementType
  className?: string
  variant?: VariantProps<typeof textVariants>["variant"]
  size?: ResponsiveProp<keyof typeof typeSizes>
  weight?: string
  uppercase?: boolean
  lowercase?: boolean
  capitalize?: boolean
}

export const Text = forwardRef<HTMLElement, TextProps>(
  ({ 
    className, as: Component = "span", 
    variant, intent, align, tracking, leading,
    size, weight,
    uppercase, lowercase, capitalize,
    ...props 
  }, ref) => {
    return (
      <Box
        as={Component}
        ref={ref as Ref<HTMLDivElement>}
        className={composeStyles(
          textVariants({ variant, intent, align, tracking, leading }),
          size && getResponsiveClasses(size, "", (s) => typeSizes[s as keyof typeof typeSizes]),
          weight,
          uppercase && "uppercase",
          lowercase && "lowercase",
          capitalize && "capitalize",
          className
        )}
        {...props}
      />
    )
  }
)
Text.displayName = "Text"
