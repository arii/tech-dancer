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
    return (val !== undefined && val !== null && val !== "") ? `${classPrefix}${val}` : ""
  }

  const { base, sm, md, lg, xl, '2xl': xxl } = prop as Record<string, string | number | boolean | undefined | null>
  return cn(
    (base !== undefined && base !== null) && `${classPrefix}${mapper ? mapper(base) : base}`,
    (sm !== undefined && sm !== null) && `sm:${classPrefix}${mapper ? mapper(sm) : sm}`,
    (md !== undefined && md !== null) && `md:${classPrefix}${mapper ? mapper(md) : md}`,
    (lg !== undefined && lg !== null) && `lg:${classPrefix}${mapper ? mapper(lg) : lg}`,
    (xl !== undefined && xl !== null) && `xl:${classPrefix}${mapper ? mapper(xl) : xl}`,
    (xxl !== undefined && xxl !== null) && `2xl:${classPrefix}${mapper ? mapper(xxl) : xxl}`
  )
}
