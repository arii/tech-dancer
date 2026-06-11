import * as React from "react"
import { forwardRef } from "react"
import { composeStyles } from "@/lib/utils"
import { Box, BoxProps } from "./Box"
import { ResponsiveProp, getResponsiveClasses } from "./system-utils"
import { resolveJIT } from "@/lib/style-utils"

import { COLS_MAP, ROWS_MAP } from "./layout-maps"

interface GridProps extends BoxProps {
  cols?: ResponsiveProp<number | string>
  rows?: ResponsiveProp<number | string>
}

export const Grid = forwardRef<HTMLDivElement, GridProps>(
  ({ className, cols = 12, rows, display = "grid", ...props }, ref) => {
    return (
      <Box
        ref={ref}
        display={display}
        className={composeStyles(
          getResponsiveClasses(cols, "", (v) => COLS_MAP[v as keyof typeof COLS_MAP] || resolveJIT(v as string, "grid-cols")),
          getResponsiveClasses(rows, "", (v) => ROWS_MAP[v as keyof typeof ROWS_MAP] || resolveJIT(v as string, "grid-rows")),
          className
        )}
        {...props}
      />
    )
  }
)
Grid.displayName = "Grid"
