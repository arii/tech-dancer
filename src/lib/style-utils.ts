/* impeccable-ignore-file */
import { SPACING_MAP } from "@/layouts/layout-maps"

export type ResponsiveProp<T> = T | { base?: T, sm?: T, md?: T, lg?: T, xl?: T, '2xl'?: T }

/**
 * Resolves a spacing value, looking up tokens in SPACING_MAP.
 * If not in map, returns the value as a Tailwind arbitrary value.
 */
export function resolveSpacing(prefix: string) {
  return (v: string | number | boolean | undefined | null) => {
    if (v === undefined || v === null || v === "") return ""

    const isNegative = (typeof v === "number" && v < 0) || (typeof v === "string" && v.startsWith("-") && v !== "-")
    const absV = typeof v === "number" ? Math.abs(v) : (isNegative ? v.substring(1) : v)

    const token = SPACING_MAP[absV as keyof typeof SPACING_MAP];
    const negPrefix = isNegative ? "-" : ""

    if (token) return `${negPrefix}${prefix}-${token}`;

    // Fallback to arbitrary value
    return `${negPrefix}${prefix}-[${absV}]`;
  }
}

/**
 * Resolves a generic value for use in a Tailwind class.
 */
export function resolveJIT(val: string | number | boolean | undefined | null, prefix: string): string {
  if (val === undefined || val === null || val === "") return ""
  return `${prefix}-[${val}]`
}

/**
 * Simple, non-recursive helper to apply responsive Tailwind prefixes to an object-based prop.
 */
export function applyResponsive<T>(
  prop: ResponsiveProp<T> | undefined,
  mapFn: (val: T) => string
): string {
  if (!prop) return ""
  if (typeof prop !== "object" || (prop as Record<string, unknown>).$$typeof) {
    return mapFn(prop as T)
  }

  return Object.entries(prop)
    .map(([bp, val]) => {
      const className = mapFn(val as T)
      if (!className) return ""
      return bp === "base" ? className : `${bp}:${className}`
    })
    .filter(Boolean)
    .join(" ")
}
