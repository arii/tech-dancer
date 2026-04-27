/**
 * Custom theme colors for the Profile redesign.
 * These are specific to the "About" page branding as requested in the design spec.
 */

export const COLORS = {
  // Brand Blue
  blue: {
    bg: "#E6F1FB",
    border: "#B5D4F4",
    text: "#0C447C",
    accent: "#185FA5",
    borderLight: "#85B7EB",
  },
  // Brand Green
  green: {
    bg: "#E1F5EE",
    border: "#5DCAA5",
    text: "#085041",
    status: "#1D9E75",
    icon: "#0F6E56",
  },
  // Brand Neutral/Amber
  neutral: {
    bg: "#F1EFE8",
    border: "#D3D1C7",
    text: "#444441",
    badge: {
      bg: "#FAEEDA",
      text: "#633806",
    }
  }
} as const;
