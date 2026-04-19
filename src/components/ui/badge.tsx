import * as React from "react"
import { cn } from "@/lib/utils"
import { Text } from "@/components/layout/Primitives"
import { variants } from "@/styles/variants"

interface BadgeProps extends React.ComponentProps<typeof Text> {
  className?: string
  intent?: keyof typeof variants.intent
  emphasis?: keyof typeof variants.emphasis
}

function Badge({
  className,
  intent = "default",
  emphasis = "solid",
  ...props
}: BadgeProps) {
  return (
    <Text
      className={cn(
        "inline-flex h-5 w-fit shrink-0 items-center justify-center gap-1 overflow-hidden border px-2 py-0.5 text-[9px] font-mono font-bold uppercase tracking-widest whitespace-nowrap transition-all",
        variants.intent[intent],
        variants.emphasis[emphasis],
        variants.radius.industrial,
        className
      )}
      {...props}
    />
  )
}

export { Badge }
