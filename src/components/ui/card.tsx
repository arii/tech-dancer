import * as React from "react"
import { cn } from "@/lib/utils"
import { Box, Stack, Text } from "@/components/layout/Primitives"

function Card({
  className,
  size = "default",
  ...props
}: React.ComponentProps<typeof Box> & { size?: "default" | "sm" }) {
  return (
    <Box
      border
      radius="none"
      surface="default"
      className={cn(
        "group/card flex flex-col overflow-hidden text-sm",
        size === "default" ? "gap-4 p-8" : "gap-3 p-4",
        className
      )}
      {...props}
    />
  )
}

function CardHeader({ className, ...props }: React.ComponentProps<typeof Box>) {
  return (
    <Box
      className={cn(
        "group/card-header grid auto-rows-min items-start gap-1",
        className
      )}
      {...props}
    />
  )
}

function CardTitle({ className, ...props }: React.ComponentProps<typeof Text>) {
  return (
    <Text
      as="div"
      variant="headline"
      size="text-xl"
      className={cn("leading-snug", className)}
      {...props}
    />
  )
}

function CardDescription({ className, ...props }: React.ComponentProps<typeof Text>) {
  return (
    <Text
      as="p"
      color="dim"
      size="text-xs"
      className={cn("uppercase tracking-wider", className)}
      {...props}
    />
  )
}

function CardAction({ className, ...props }: React.ComponentProps<typeof Box>) {
  return (
    <Box
      className={cn(
        "col-start-2 row-span-2 row-start-1 self-start justify-self-end",
        className
      )}
      {...props}
    />
  )
}

function CardContent({ className, ...props }: React.ComponentProps<typeof Box>) {
  return (
    <Box
      className={cn("flex-1", className)}
      {...props}
    />
  )
}

function CardFooter({ className, ...props }: React.ComponentProps<typeof Box>) {
  return (
    <Box
      surface="muted"
      className={cn(
        "flex items-center border-t border-line p-4 -mx-8 -mb-8 mt-4",
        className
      )}
      {...props}
    />
  )
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
}
