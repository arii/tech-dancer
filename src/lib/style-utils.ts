import { SPACING_MAP } from "@/layouts/layout-maps"

export type ResponsiveProp<T> = T | { base?: T, sm?: T, md?: T, lg?: T, xl?: T, '2xl'?: T }

/**
 * Resolves a value for use in a Tailwind class.
 */
export function resolveJIT(val: string | number | boolean | undefined | null, prefix: string): string {
  if (val === undefined || val === null || val === "") return "";

  const isNegative = typeof val === "number" ? val < 0 : String(val).startsWith("-") && val !== "-";
  const absVal = isNegative ? (typeof val === "number" ? Math.abs(val) : String(val).slice(1)) : val;
  const absStr = String(absVal);

  const pfx = prefix ? `${prefix}-` : "";
  const negPfx = isNegative ? "-" : "";

  // Tailwind tokens: numeric (4, 1.5), or simple alphanumeric-hyphen names (full, 2xl, red-500).
  // Note: Fractions (1/2) and decimals in strings (1.5) are treated as arbitrary values [1/2]
  // to ensure compatibility with all Tailwind themes unless they are passed as numbers.
  const isToken = typeof val === "number" || (
    typeof val === "string" &&
    /^[a-z0-9-]+$/.test(absStr) &&
    !/[0-9](px|vh|vw|%|rem|em)$/.test(absStr)
  );

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
