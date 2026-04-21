import React from "react"
import { cn } from "@/lib/utils"
import { Box, BoxProps } from "./Box"

export interface StackProps extends BoxProps {}

export const Stack = React.forwardRef<HTMLDivElement, StackProps>(
  ({ className, ...props }, ref) => {
    return (
      <Box
        ref={ref}
        className={cn("flex flex-col", className)}
        {...props}
      />
    )
  }
)
Stack.displayName = "Stack"
