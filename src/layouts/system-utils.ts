import React from "react"
import { cn } from "@/lib/utils"

export type ResponsiveProp<T> = T | { base?: T, sm?: T, md?: T, lg?: T, xl?: T }

// Helper to allow Tailwind v4 scanner to detect dynamic classes
export const SAFELIST = [
  "col-span-1", "col-span-2", "col-span-3", "col-span-4", "col-span-5", "col-span-6", "col-span-7", "col-span-8", "col-span-9", "col-span-10", "col-span-11", "col-span-12",
  "sm:col-span-1", "sm:col-span-2", "sm:col-span-3", "sm:col-span-4", "sm:col-span-5", "sm:col-span-6", "sm:col-span-7", "sm:col-span-8", "sm:col-span-9", "sm:col-span-10", "sm:col-span-11", "sm:col-span-12",
  "md:col-span-1", "md:col-span-2", "md:col-span-3", "md:col-span-4", "md:col-span-5", "md:col-span-6", "md:col-span-7", "md:col-span-8", "md:col-span-9", "md:col-span-10", "md:col-span-11", "md:col-span-12",
  "lg:col-span-1", "lg:col-span-2", "lg:col-span-3", "lg:col-span-4", "lg:col-span-5", "lg:col-span-6", "lg:col-span-7", "lg:col-span-8", "lg:col-span-9", "lg:col-span-10", "lg:col-span-11", "lg:col-span-12",
  "xl:col-span-1", "xl:col-span-2", "xl:col-span-3", "xl:col-span-4", "xl:col-span-5", "xl:col-span-6", "xl:col-span-7", "xl:col-span-8", "xl:col-span-9", "xl:col-span-10", "xl:col-span-11", "xl:col-span-12"
];

export const gridTrackMapper = (v: string | number) => {
  if (typeof v === 'number' && v <= 12) return v
  if (typeof v === 'number') return `[repeat(${v},minmax(0,1fr))]`
  return v
}

export function getResponsiveClasses(
  prop: ResponsiveProp<string | number | boolean | undefined | null>,
  classPrefix: string,
  mapper?: (val: string | number | boolean | undefined | null) => string | number | undefined
) {
  if (prop === undefined || prop === null) return ""
  if (typeof prop !== "object" || React.isValidElement(prop)) {
    const val = mapper ? mapper(prop) : prop
    return val ? `${classPrefix}${val}` : ""
  }

  const { base, sm, md, lg, xl } = prop as Record<string, string | number | boolean | undefined | null>
  return cn(
    base && `${classPrefix}${mapper ? mapper(base) : base}`,
    sm && `sm:${classPrefix}${mapper ? mapper(sm) : sm}`,
    md && `md:${classPrefix}${mapper ? mapper(md) : md}`,
    lg && `lg:${classPrefix}${mapper ? mapper(lg) : lg}`,
    xl && `xl:${classPrefix}${mapper ? mapper(xl) : xl}`
  )
}
