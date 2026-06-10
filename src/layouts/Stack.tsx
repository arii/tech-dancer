import * as React from "react"
import { forwardRef } from "react"
import { composeStyles } from "@/lib/utils"
import { Box, BoxProps } from "./Box"
import { ResponsiveProp, getResponsiveClasses } from "./system-utils"

interface StackProps extends Omit<BoxProps, "align" | "justify"> {
  direction?: ResponsiveProp<"row" | "col">
  align?: ResponsiveProp<"start" | "center" | "end" | "stretch" | "baseline">
  justify?: ResponsiveProp<"start" | "center" | "end" | "between" | "around" | "evenly">
}

export const Stack = forwardRef<HTMLDivElement, StackProps>(
  ({ className, direction = "col", gap = 4, align, justify, display = "flex", ...props }, ref) => {
    const directionMapper = (d: string) => d === "col" ? "flex-col" : "flex-row"
    const alignMapper = (a: string) => {
      const map: Record<string, string> = {
        start: "items-start",
        center: "items-center",
        end: "items-end",
        stretch: "items-stretch",
        baseline: "items-baseline"
      }
      return map[a] || ""
    }
    const justifyMapper = (j: string) => {
      const map: Record<string, string> = {
        start: "justify-start",
        center: "justify-center",
        end: "justify-end",
        between: "justify-between",
        around: "justify-around",
        evenly: "justify-evenly"
      }
      return map[j] || ""
    }

    return (
      <Box
        ref={ref}
        display={display}
        className={composeStyles(
          getResponsiveClasses(direction, "", directionMapper),
          getResponsiveClasses(align, "", alignMapper),
          getResponsiveClasses(justify, "", justifyMapper),
          className
        )}
        gap={gap}
        {...props}
      />
    )
  }
)
Stack.displayName = "Stack"
