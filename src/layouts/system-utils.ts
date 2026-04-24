import React from "react"
import { cn } from "@/lib/utils"

export type ResponsiveProp<T> = T | { base?: T, sm?: T, md?: T, lg?: T, xl?: T }

// Helper to allow Tailwind v4 scanner to detect dynamic classes


export const gridTrackMapper = (v: string | number) => {
  if (typeof v === 'number') {
    if (v > 0 && v <= 12) return v.toString();
    return `[repeat(${v},_minmax(0,_1fr))]`;
  }
  // If it's a string like "1fr 2fr", wrap it in brackets for arbitrary values
  // otherwise if it's already a standard tailwind class (e.g. "none", "subgrid"), leave it
  if (typeof v === 'string') {
    if (['none', 'subgrid'].includes(v)) return v;
    // Replace spaces with underscores for valid tailwind arbitrary values
    const safeStr = v.replace(/ /g, '_');
    if (!v.startsWith('[')) return `[${safeStr}]`;
    return safeStr;
  }
  return v;
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
