import React from "react"
import { cn } from "@/lib/utils"
import { Box, BoxProps } from "./Box"

export interface TextProps extends BoxProps {}

export const Text = React.forwardRef<HTMLElement, TextProps>(
  ({ className, as: Component = "span", ...props }, ref) => {
    return (
      <Box
        as={Component}
        ref={ref as any}
        className={cn(className)}
        {...props}
      />
    )
  }
)
Text.displayName = "Text"
