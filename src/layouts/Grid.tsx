import React from "react"
import { cn } from "@/lib/utils"
import { Box, BoxProps } from "./Box"

export interface GridProps extends BoxProps {}

export const Grid = React.forwardRef<HTMLDivElement, GridProps>(
  ({ className, ...props }, ref) => {
    return (
      <Box
        ref={ref}
        className={cn("grid", className)}
        {...props}
      />
    )
  }
)
Grid.displayName = "Grid"
