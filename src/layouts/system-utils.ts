import { isValidElement } from "react"
import { cn } from "@/lib/utils"

export type ResponsiveProp<T> = T | { base?: T, sm?: T, md?: T, lg?: T, xl?: T, "2xl"?: T }

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

  const { base, sm, md, lg, xl, "2xl": xxl } = prop as Record<string, string | number | boolean | undefined | null>

  return cn(
    buildClass(base, classPrefix),
    buildClass(sm, `sm:${classPrefix}`),
    buildClass(md, `md:${classPrefix}`),
    buildClass(lg, `lg:${classPrefix}`),
    buildClass(xl, `xl:${classPrefix}`),
    buildClass(xxl, `2xl:${classPrefix}`)
  )
}
