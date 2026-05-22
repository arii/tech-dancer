import * as React from "react"
import { forwardRef } from "react"
import { composeStyles } from "@/lib/utils"
import { Box, BoxProps } from "./Box"
import { ResponsiveProp, getResponsiveClasses } from "./system-utils"

import { COLS_MAP, ROWS_MAP } from "./layout-maps"

interface GridProps extends BoxProps {
  cols?: ResponsiveProp<number | string>
  rows?: ResponsiveProp<number | string>
  autoFill?: boolean
}

export const Grid = forwardRef<HTMLDivElement, GridProps>(
  ({ className, cols = 12, rows, autoFill, ...props }, ref) => {
    return (
      <Box
        ref={ref}
        className={composeStyles(
          "grid",
          autoFill ? "grid-cols-[repeat(auto-fill,minmax(300px,1fr))]" : getResponsiveClasses(cols, "", (v) => COLS_MAP[v as keyof typeof COLS_MAP] || ""), /* impeccable-ignore */
          getResponsiveClasses(rows, "", (v) => ROWS_MAP[v as keyof typeof ROWS_MAP] || ""),
          className
        )}
        {...props}
      />
    )
  }
)
Grid.displayName = "Grid"
