import React from "react"
import { composeStyles } from "@/lib/utils"
import { Box, BoxProps } from "./Box"
import { ResponsiveProp, getResponsiveClasses } from "@/components/system-utils"

interface GridProps extends BoxProps {
  cols?: ResponsiveProp<number | string>
  rows?: ResponsiveProp<number | string>
}

export const Grid = React.forwardRef<HTMLDivElement, GridProps>(
  ({ className, cols = 12, rows, ...props }, ref) => {
    return (
      <Box
        ref={ref}
        className={composeStyles(
          "grid",
          getResponsiveClasses(cols, "grid-cols-"),
          getResponsiveClasses(rows, "grid-rows-"),
          className
        )}
        {...props}
      />
    )
  }
)
Grid.displayName = "Grid"
