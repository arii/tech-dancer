import { isValidElement } from "react"
import { cn } from "@/lib/utils"

export const BREAKPOINTS = ["sm", "md", "lg", "xl", "2xl"] as const
export type Breakpoint = (typeof BREAKPOINTS)[number]
export type ResponsiveProp<T> = T | ({ base?: T } & { [K in Breakpoint]?: T })

export function getResponsiveClasses(
  prop: ResponsiveProp<string | number | boolean | undefined | null>,
  classPrefix: string,
  mapper?: (val: string | number | boolean | undefined | null) => string | number | undefined
) {
  if (prop === undefined || prop === null) return ""

  const buildClass = (val: string | number | boolean | undefined | null, prefix: string) => {
    const v = mapper ? mapper(val) : val
    return (v !== undefined && v !== null && v !== "") ? `${prefix}${v}` : ""
  }

  if (typeof prop !== "object" || isValidElement(prop)) {
    return buildClass(prop, classPrefix)
  }

  const responsive = prop as Record<string, string | number | boolean | undefined | null>

  const classes = [buildClass(responsive.base, classPrefix)]

  for (const bp of BREAKPOINTS) {
    if (responsive[bp] !== undefined) {
      classes.push(buildClass(responsive[bp], `${bp}:${classPrefix}`))
    }
  }

  return cn(...classes)
}
