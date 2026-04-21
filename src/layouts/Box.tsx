import React from "react"
import { cn } from "@/lib/utils"

export interface BoxProps extends React.HTMLAttributes<HTMLDivElement> {
  as?: any
}

export const Box = React.forwardRef<HTMLDivElement, BoxProps>(
  ({ className, as: Component = "div", ...props }, ref) => {
    return (
      <Component
        ref={ref}
        className={cn(className)}
        {...props}
      />
    )
  }
)
Box.displayName = "Box"
