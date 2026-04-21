import * as React from "react"
import { cn } from "@/lib/utils"
import { badgeVariants } from "@/lib/variants"
import type { VariantProps } from "class-variance-authority"

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({
  className,
  intent,
  emphasis,
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(badgeVariants({ intent, emphasis }), className)}
      {...props}
    />
  )
}

export { Badge }
