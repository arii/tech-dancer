import { isValidElement } from "react"
import { cn } from "@/lib/utils"

export type ResponsiveProp<T> = T | { base?: T, sm?: T, md?: T, lg?: T, xl?: T, '2xl'?: T }

export function getResponsiveClasses(
  prop: ResponsiveProp<string | number | boolean | undefined | null>,
  classPrefix: string,
  mapper?: (val: string | number | boolean | undefined | null) => string | number | undefined
) {
  if (prop === undefined || prop === null) return ""
  if (typeof prop !== "object" || isValidElement(prop)) {
    const val = mapper ? mapper(prop) : prop
    return val ? `${classPrefix}${val}` : ""
  }

  const { base, sm, md, lg, xl, '2xl': xxl } = prop as Record<string, string | number | boolean | undefined | null>
  return cn(
    base && `${classPrefix}${mapper ? mapper(base) : base}`,
    sm && `sm:${classPrefix}${mapper ? mapper(sm) : sm}`,
    md && `md:${classPrefix}${mapper ? mapper(md) : md}`,
    lg && `lg:${classPrefix}${mapper ? mapper(lg) : lg}`,
    xl && `xl:${classPrefix}${mapper ? mapper(xl) : xl}`,
    xxl && `2xl:${classPrefix}${mapper ? mapper(xxl) : xxl}`
  )
}

export function getVal(val: string | number | boolean | undefined | null, prefix: string) {
  if (!val) return ""
  const pfx = prefix ? `${prefix}-` : ""

  // Standard Tailwind tokens (numbers or specific strings without CSS units)
  const isToken = typeof val === "number" ||
    (typeof val === "string" && /^[a-z0-9-]+$/.test(val) && !/[0-9](px|vh|vw|%|rem|em)$/.test(val))

  if (isToken) return `${pfx}${val}`

  // Arbitrary values
  const value = typeof val === "string" && val.startsWith("[") && val.endsWith("]")
    ? val
    : `[${val}]`

  return `${pfx}${value}`
}
