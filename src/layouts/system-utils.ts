import { isValidElement } from "react"
import { cn } from "@/lib/utils"

export type ResponsiveProp<T> = T | { base?: T, sm?: T, md?: T, lg?: T, xl?: T, '2xl'?: T }

export function getResponsiveClasses(
  prop: ResponsiveProp<string | number | boolean | undefined | null>,
  classPrefix: string,
  mapper?: (val: string | number | boolean | undefined | null) => string | number | undefined
) {
  if (prop === undefined || prop === null || prop === "") return ""
  if (typeof prop !== "object" || isValidElement(prop)) {
    const val = mapper ? mapper(prop) : prop
    return (val !== undefined && val !== null && val !== "") ? `${classPrefix}${val}` : ""
  }

  const { base, sm, md, lg, xl, '2xl': xxl } = prop as Record<string, string | number | boolean | undefined | null>

  const getResponsiveVal = (v: string | number | boolean | undefined | null) => {
    const mapped = mapper ? mapper(v) : v
    return (mapped !== undefined && mapped !== null && mapped !== "") ? mapped : null
  }

  return cn(
    getResponsiveVal(base) !== null && `${classPrefix}${getResponsiveVal(base)}`,
    getResponsiveVal(sm) !== null && `sm:${classPrefix}${getResponsiveVal(sm)}`,
    getResponsiveVal(md) !== null && `md:${classPrefix}${getResponsiveVal(md)}`,
    getResponsiveVal(lg) !== null && `lg:${classPrefix}${getResponsiveVal(lg)}`,
    getResponsiveVal(xl) !== null && `xl:${classPrefix}${getResponsiveVal(xl)}`,
    getResponsiveVal(xxl) !== null && `2xl:${classPrefix}${getResponsiveVal(xxl)}`
  )
}
