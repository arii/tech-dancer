/**
 * Shared Tailwind utility compositions for the Design System.
 * These constants help maintain consistency and reduce duplication in variants and components.
 */

export const transitions = {
  all: "transition-all duration-200",
  colors: "transition-colors",
  fast: "transition-all duration-150",
  slow: "transition-all duration-300",
} as const;

export const interaction = {
  // Common interaction patterns for buttons and interactive elements
  disabled: "disabled:opacity-50 disabled:cursor-not-allowed",
  button: "disabled:opacity-50 disabled:cursor-not-allowed active:scale-active",
  activeScale: "active:scale-active",
  hover: "hover:bg-line/10",
  accentHover: "hover:border-accent cursor-pointer",
  ghost: "hover:bg-line/10 text-text-dim hover:text-text-main",
} as const;

export const typography = {
  // Shared typographic patterns
  label: "text-sm font-bold tracking-wide",
  tag: "font-semibold uppercase tracking-wider",
} as const;

export const shapes = {
  rounded: "rounded-md",
} as const;
