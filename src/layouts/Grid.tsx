import * as React from "react"
import { forwardRef } from "react"
import { composeStyles } from "@/lib/utils"
import { Box, BoxProps } from "./Box"
import { applyResponsive, resolveJIT, type ResponsiveProp } from "@/lib/style-utils"

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
          applyResponsive(cols, (v) => COLS_MAP[v as keyof typeof COLS_MAP] || resolveJIT(v, "grid-cols")),
          applyResponsive(rows, (v) => ROWS_MAP[v as keyof typeof ROWS_MAP] || resolveJIT(v, "grid-rows")),
          className
        )}
        {...props}
      />
    )
  }
)
Grid.displayName = "Grid"
