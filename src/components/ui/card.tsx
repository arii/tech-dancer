import * as React from "react"
import { cn } from "@/lib/utils"

function Card({
  className,
  size = "default",
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { size?: "default" | "sm" }) {
  return (
    <div
      className={cn(
        "group/card flex flex-col overflow-hidden text-sm border border-line bg-surface rounded-none",
        size === "default" ? "gap-4 p-8" : "gap-3 p-4",
        className
      )}
      {...props}
    />
  )
}

function CardHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "group/card-header grid auto-rows-min items-start gap-1",
        className
      )}
      {...props}
    />
  )
}

function CardTitle({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={cn("font-display font-bold uppercase tracking-tighter leading-snug text-xl", className)}
      {...props}
    />
  )
}

function CardDescription({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn("text-text-dim text-[10px] font-mono font-bold uppercase tracking-widest uppercase tracking-wider", className)}
      {...props}
    />
  )
}

function CardAction({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "col-start-2 row-span-2 row-start-1 self-start justify-self-end",
        className
      )}
      {...props}
    />
  )
}

function CardContent({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("flex-1", className)}
      {...props}
    />
  )
}

function CardFooter({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "flex items-center border-t border-line p-4 -mx-8 -mb-8 mt-4 bg-muted",
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
