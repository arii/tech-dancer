export type ResponsiveProp<T> = T | { base?: T, sm?: T, md?: T, lg?: T, xl?: T, '2xl'?: T }

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

export function resolveJIT(val: string | number | boolean | undefined | null, prefix: string): string {
  if (val === undefined || val === null || val === "") return ""
  const isNegative = (typeof val === "number" && val < 0) || (typeof val === "string" && val.startsWith("-") && val !== "-")
  const absVal = typeof val === "number" ? Math.abs(val) : (isNegative ? val.substring(1) : val)
  const pfx = prefix ? `${prefix}-` : ""
  const negPrefix = isNegative ? "-" : ""
  const isToken = typeof val === "number" || (typeof absVal === "string" && /^[a-z0-9-]+$/.test(absVal) && !/[0-9](px|vh|vw|%|rem|em)$/.test(absVal))
  if (isToken) return `${negPrefix}${pfx}${absVal}`
  const value = typeof val === "string" && val.startsWith("[") && val.endsWith("]") ? val : `[${val}]`
  return `${negPrefix}${pfx}${value}`
}
