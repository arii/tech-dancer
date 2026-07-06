import { SPACING_MAP } from "@/layouts/layout-maps"

export type ResponsiveProp<T> = T | { base?: T, sm?: T, md?: T, lg?: T, xl?: T, '2xl'?: T }

/**
 * Resolves a value for use in a Tailwind class.
 */
export function resolveJIT(val: string | number | boolean | undefined | null, prefix: string): string {
  if (val === undefined || val === null || val === "") return "";
  const isNegative = typeof val === "number" ? val < 0 : String(val).startsWith("-") && val !== "-";
  const absVal = isNegative ? String(val).slice(1) : val;
  const absStr = String(absVal);

  // Tailwind tokens: numeric (4, 1.5), fractions (1/2), or names (full, auto, red-500)
  // Names must start with a letter and not end in a CSS unit suffix preceded by a digit.
  const isToken = /^\d+(\.\d+)?$|^\d+\/\d+$/.test(absStr) || (/^[a-z]/.test(absStr) && !/[0-9](px|vh|vw|%|rem|em)$/.test(absStr));

  const pfx = prefix ? `${prefix}-` : "";
  const negPfx = isNegative ? "-" : "";

  if (isToken) return `${negPfx}${pfx}${absStr}`;

  const value = absStr.startsWith("[") && absStr.endsWith("]") ? absStr : `[${absStr}]`;
  return `${negPfx}${pfx}${value}`;
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
