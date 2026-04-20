import * as React from "react"
import { cn } from "@/lib/utils"
import { Text } from "@/layouts/Primitives"
import { badgeVariants } from "@/lib/variants"
import type { VariantProps } from "class-variance-authority"

export interface BadgeProps
  extends Omit<React.ComponentProps<typeof Text>, "intent">,
    VariantProps<typeof badgeVariants> {}

function Badge({
  className,
  intent,
  emphasis,
  ...props
}: BadgeProps) {
  return (
    <Text
      className={cn(badgeVariants({ intent, emphasis }), className)}
      {...props}
    />
  )
}

export { Badge }
