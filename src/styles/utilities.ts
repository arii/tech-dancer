/**
 * Shared Tailwind utility compositions for the Design System.
 * These constants help maintain consistency and reduce duplication in variants and components.
 */

/**
 * Standard transitions for the BoomTick design system.
 * Use specific transitions (e.g., colors) where possible for better performance.
 */
export const transitions = {
  all: "transition-all duration-200",
  colors: "transition-colors duration-200",
  transform: "transition-transform duration-200",
  slow: "transition-all duration-300",
} as const;

/**
 * Shared interaction patterns for interactive elements.
 * Includes disabled states, hover effects, and active state scaling.
 */
export const interaction = {
  // Standard disabled state (reduced opacity and blocked cursor)
  disabled: "disabled:opacity-50 disabled:cursor-not-allowed",
  // Standard button composition: disabled state + active scale
  button: "disabled:opacity-50 disabled:cursor-not-allowed active:scale-active",
  // Active state scaling effect (defined as @utility scale-active in index.css)
  activeScale: "active:scale-active",
  // Light background hover effect
  hover: "hover:bg-line/10",
  // Accent border hover for cards and list items
  accentHover: "hover:border-accent cursor-pointer",
  // Ghost button/link hover style
  ghost: "hover:bg-line/10 text-text-dim hover:text-text-main",
} as const;

/**
 * Shared typographic patterns for labels, tags, and small metadata.
 */
export const typography = {
  // Small, bold labels used in buttons and forms
  label: "text-sm font-bold tracking-wide",
  // Categorical tags and micro-copy
  tag: "font-semibold uppercase tracking-wider",
} as const;
