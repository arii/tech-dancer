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
    return val !== undefined && val !== null && val !== "" ? `${classPrefix}${val}` : ""
  }

  const { base, sm, md, lg, xl, '2xl': xxl } = prop as Record<string, string | number | boolean | undefined | null>

  const resolve = (val: string | number | boolean | undefined | null, bp: string) => {
    if (val === undefined || val === null) return null
    const res = mapper ? mapper(val) : val
    if (res === undefined || res === null || res === "") return null
    return `${bp}${classPrefix}${res}`
  }

  return cn(
    resolve(base, ""),
    resolve(sm, "sm:"),
    resolve(md, "md:"),
    resolve(lg, "lg:"),
    resolve(xl, "xl:"),
    resolve(xxl, "2xl:")
  )
}
