import * as React from "react"
import { composeStyles } from "@/lib/utils"
import { Box, BoxProps } from "./Box"
import { ResponsiveProp, getResponsiveClasses } from "./system-utils"

interface GridProps extends BoxProps {
  cols?: ResponsiveProp<number | string>
  rows?: ResponsiveProp<number | string>
}

export const Grid = React.forwardRef<HTMLDivElement, GridProps>(
  ({ className, cols = 12, rows, ...props }, ref) => {
    const colMapper = (v: any) => {
      if (typeof v === 'number' && v <= 12) return v
      if (typeof v === 'number') return `[repeat(${v},minmax(0,1fr))]`
      return v
    }
    const rowMapper = (v: any) => {
      if (typeof v === 'number' && v <= 12) return v
      if (typeof v === 'number') return `[repeat(${v},minmax(0,1fr))]`
      return v
    }

    return (
      <Box
        ref={ref}
        className={composeStyles(
          "grid",
          getResponsiveClasses(cols, "grid-cols-", colMapper),
          getResponsiveClasses(rows, "grid-rows-", rowMapper),
          className
        )}
        {...props}
      />
    )
  }
)
Grid.displayName = "Grid"
