import { isValidElement } from "react"
import { cn } from "@/lib/utils"

export type ResponsiveProp<T> = T | { base?: T, sm?: T, md?: T, lg?: T, xl?: T, '2xl'?: T }

export function getResponsiveClasses(
  prop: ResponsiveProp<string | number | boolean | undefined | null>,
  classPrefix: string,
  mapper?: (val: string | number | boolean | undefined | null) => string | number | undefined | string
) {
  if (prop === undefined || prop === null || prop === "") return ""

  if (typeof prop !== "object" || isValidElement(prop)) {
    const val = mapper ? mapper(prop) : prop
    return (val !== undefined && val !== null && val !== "") ? `${classPrefix}${val}` : ""
  }

  const { base, sm, md, lg, xl, '2xl': xxl } = prop as Record<string, string | number | boolean | undefined | null>

  const getVal = (v: string | number | boolean | undefined | null) => {
    const mapped = mapper ? mapper(v) : v
    return (mapped !== undefined && mapped !== null && mapped !== "") ? `${classPrefix}${mapped}` : null
  }

  return cn(
    getVal(base),
    getVal(sm) && `sm:${getVal(sm)}`,
    getVal(md) && `md:${getVal(md)}`,
    getVal(lg) && `lg:${getVal(lg)}`,
    getVal(xl) && `xl:${getVal(xl)}`,
    getVal(xxl) && `2xl:${getVal(xxl)}`
  )
}
