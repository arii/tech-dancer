import { isValidElement } from "react"

export type ResponsiveProp<T> = T | { base?: T, sm?: T, md?: T, lg?: T, xl?: T, '2xl'?: T }

export function getResponsiveClasses(
  prop: ResponsiveProp<string | number | boolean | undefined | null>,
  classPrefix: string,
  mapper?: (val: string | number | boolean | undefined | null) => string | number | undefined
) {
  if (!prop) return ""
  if (typeof prop !== "object" || isValidElement(prop)) {
    const v = mapper ? mapper(prop) : prop
    return v ? `${classPrefix}${v}` : ""
  }

  return Object.entries(prop)
    .map(([bp, val]) => {
      const v = mapper ? mapper(val) : val
      return v ? (bp === "base" ? `${classPrefix}${v}` : `${bp}:${classPrefix}${v}`) : ""
    })
    .filter(Boolean)
    .join(" ")
}
