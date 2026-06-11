import { SPACING_MAP } from "@/layouts/layout-maps"

/**
 * Resolves a value for use in a Tailwind class, handling negative values
 * and arbitrary strings correctly.
 */
export function resolveJIT(val: string | number | boolean | undefined | null, prefix: string): string {
  if (val === undefined || val === null || val === "") return ""

  const isNegative = (typeof val === "number" && val < 0) || (typeof val === "string" && val.startsWith("-") && val !== "-")
  const absVal = typeof val === "number" ? Math.abs(val) : (isNegative ? val.substring(1) : val)

  const pfx = prefix ? `${prefix}-` : ""
  const negPrefix = isNegative ? "-" : ""

  // Standard Tailwind tokens (numbers or specific strings without CSS units)
  // Logic: Must be an integer, a .5 increment (standard spacing), or a simple alphanumeric string
  const isToken = (typeof val === "number" && (val * 2) % 1 === 0) ||
    (typeof absVal === "string" && /^[a-z0-9-]+$/.test(absVal) && !/[0-9](px|vh|vw|%|rem|em)$/.test(absVal))

  if (isToken) return `${negPrefix}${pfx}${absVal}`

  // Arbitrary values
  const value = typeof val === "string" && val.startsWith("[") && val.endsWith("]")
    ? val
    : `[${val}]`

  return `${negPrefix}${pfx}${value}`
}

/**
 * Resolves a spacing value, looking up tokens in SPACING_MAP.
 */
export function resolveSpacing(prefix: string) {
  return (v: string | number | boolean | undefined | null) => {
    const isNegative = (typeof v === "number" && v < 0) || (typeof v === "string" && v.startsWith("-") && v !== "-")
    const absV = typeof v === "number" ? Math.abs(v) : (isNegative ? v.substring(1) : v)

    const token = SPACING_MAP[absV as keyof typeof SPACING_MAP];
    const negPrefix = isNegative ? "-" : ""

    if (token) return `${negPrefix}${prefix}-${token}`;
    return resolveJIT(v, prefix);
  }
}
