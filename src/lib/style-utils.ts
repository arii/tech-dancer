import { SPACING_MAP } from "../layouts/layout-maps"

export type ResponsiveProp<T> = T | { base?: T, sm?: T, md?: T, lg?: T, xl?: T, '2xl'?: T }

/**
 * Resolves a value for use in a Tailwind class.
 * Handles tokens (numbers, simple strings) vs arbitrary values (bracketed or with units).
 */
export function resolveJIT(val: string | number | boolean | undefined | null, prefix: string): string {
  if (val === undefined || val === null || val === "") return ""

  const strVal = String(val)
  const isNegative = strVal.startsWith("-") && strVal !== "-"
  const absVal = isNegative ? strVal.substring(1) : strVal
  const negPrefix = isNegative ? "-" : ""

  // Standard Tailwind tokens:
  // 1. Pure numbers (e.g. 4, 1.5, 96)
  // 2. Simple alphanumeric strings with hyphens and slashes (e.g. full, center, 1/2, white/20)
  //    Exclude anything that looks like it has a CSS unit (px, vh, vw, %|rem|em)
  const isToken = /^\d+(\.\d+)?$/.test(absVal) ||
                  (/^[a-z0-9-/]+$/.test(absVal) && !/[0-9](px|vh|vw|%|rem|em)$/.test(absVal));

  if (isToken) return `${negPrefix}${prefix}-${absVal}`

  // Arbitrary values wrapped in brackets
  const bracketVal = absVal.startsWith("[") && absVal.endsWith("]") ? absVal : `[${absVal}]`
  return `${negPrefix}${prefix}-${bracketVal}`
}

/**
 * Resolves a spacing value, checking SPACING_MAP first for semantic tokens.
 */
export function resolveSpacing(prefix: string) {
  return (v: string | number | boolean | undefined | null) => {
    if (v === undefined || v === null || v === "") return ""

    const strV = String(v)
    const isNegative = strV.startsWith("-") && strV !== "-"
    const absV = isNegative ? strV.substring(1) : strV

    const mapped = SPACING_MAP[absV as keyof typeof SPACING_MAP];
    if (mapped) return `${isNegative ? "-" : ""}${prefix}-${mapped}`;

    // Check if it's a known CSS variable without brackets (e.g. section-spacing)
    if (/^[a-z-]+$/.test(absV) && !/[0-9](px|vh|vw|%|rem|em)$/.test(absV)) {
       return `${isNegative ? "-" : ""}${prefix}-${absV}`;
    }

    return resolveJIT(v, prefix);
  }
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
      return className ? (bp === "base" ? className : `${bp}:${className}`) : ""
    })
    .filter(Boolean)
    .join(" ")
}
