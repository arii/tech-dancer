import * as React from "react"
import { forwardRef } from "react"
import { composeStyles } from "@/lib/utils"
import { Box, BoxProps } from "./Box"
import { ResponsiveProp, getResponsiveClasses, getVal } from "./system-utils"

import { COLS_MAP, ROWS_MAP } from "./layout-maps"

interface GridProps extends BoxProps {
  cols?: ResponsiveProp<number | string>
  rows?: ResponsiveProp<number | string>
}

export const Grid = forwardRef<HTMLDivElement, GridProps>(
  ({ className, cols = 12, rows, ...props }, ref) => {
    const colMapper = (v: string | number | boolean | undefined | null) => {
      const token = COLS_MAP[v as keyof typeof COLS_MAP];
      if (token) return token;
      return getVal(v, "grid-cols");
    }

    const rowMapper = (v: string | number | boolean | undefined | null) => {
      const token = ROWS_MAP[v as keyof typeof ROWS_MAP];
      if (token) return token;
      return getVal(v, "grid-rows");
    }

    return (
      <Box
        ref={ref}
        className={composeStyles(
          "grid",
          getResponsiveClasses(cols, "", colMapper),
          getResponsiveClasses(rows, "", rowMapper),
          className
        )}
        {...props}
      />
    )
  }
)
Grid.displayName = "Grid"
