import { isValidElement } from "react"
import { cn } from "@/lib/utils"

export type ResponsiveProp<T> = T | { base?: T, sm?: T, md?: T, lg?: T, xl?: T, "2xl"?: T }

export function getResponsiveClasses(
  prop: ResponsiveProp<string | number | boolean | undefined | null>,
  classPrefix: string,
  mapper?: (val: string | number | boolean | undefined | null) => string | number | undefined
) {
  if (prop === undefined || prop === null) return ""
  if (typeof prop !== "object" || isValidElement(prop)) {
    const val = mapper ? mapper(prop) : prop
    return (val !== undefined && val !== null && val !== "") ? `${classPrefix}${val}` : ""
  }

  const { base, sm, md, lg, xl, "2xl": xxl } = prop as Record<string, string | number | boolean | undefined | null>
  const getVal = (v: string | number | boolean | undefined | null) => mapper ? mapper(v) : v
  const hasVal = (v: string | number | boolean | undefined | null) => v !== undefined && v !== null && v !== ""

  return cn(
    hasVal(base) && `${classPrefix}${getVal(base)}`,
    hasVal(sm) && `sm:${classPrefix}${getVal(sm)}`,
    hasVal(md) && `md:${classPrefix}${getVal(md)}`,
    hasVal(lg) && `lg:${classPrefix}${getVal(lg)}`,
    hasVal(xl) && `xl:${classPrefix}${getVal(xl)}`,
    hasVal(xxl) && `2xl:${classPrefix}${getVal(xxl)}`
  )
}
