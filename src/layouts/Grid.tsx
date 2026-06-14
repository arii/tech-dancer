import * as React from "react"
import { forwardRef } from "react"
import { composeStyles } from "@/lib/utils"
import { Box, BoxProps } from "./Box"
import { ResponsiveProp, getResponsiveClasses } from "./system-utils"
import { resolveJIT } from "@/lib/style-utils"

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
          getResponsiveClasses(cols, "grid-cols-", (v) => {
            if (typeof v === "number" || (typeof v === "string" && !isNaN(Number(v)))) {
              return v.toString()
            }
            return resolveJIT(v, "")
          }),
          getResponsiveClasses(rows, "grid-rows-", (v) => {
            if (typeof v === "number" || (typeof v === "string" && !isNaN(Number(v)))) {
              return v.toString()
            }
            return resolveJIT(v, "")
          }),
          className
        )}
        {...props}
      />
    )
  }
)
Grid.displayName = "Grid"
