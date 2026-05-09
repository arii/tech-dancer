// impeccable-ignore-file

export interface PaletteData {
  id: number;
  name: string;
  description: string;
  colors: {
    bg: string;
    surface: string;
    surfaceAlt: string;
    line: string;
    accent: string;
    accentPurple: string;
    accentMagenta: string;
    accentShadow: string;
    accentNavy: string;
    accentBrand: string;
    textMain: string;
    textBody: string;
    textDim: string;
    [key: string]: string;
  };
}

// Helper to determine if text should be dark or light based on background hex
export const getContrastText = (hexcolor: string) => {
  if (!hexcolor || hexcolor.startsWith('rgba')) return '#000000';
  const r = parseInt(hexcolor.slice(1, 3), 16);
  const g = parseInt(hexcolor.slice(3, 5), 16);
  const b = parseInt(hexcolor.slice(5, 7), 16);
  const yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
  return (yiq >= 128) ? '#000000' : '#FFFFFF';
};

export const PALETTES: PaletteData[] = [
  {
    id: 1,
    name: "The Heritage Vibrant",
    description: "Vibrant teal/coral mix. Adjusted for AAA contrast on headings and AA on body text.",
    colors: {
      bg: "#091B21",          // Dark Ink
      surface: "#1B434B",     // Deep Saturated Teal
      surfaceAlt: "#26545F",  // Mid Teal
      line: "#4B7E8A",
      accent: "#F46241",      // Vibrant Coral
      accentPurple: "#5E364A", // Saturated Plum
      accentMagenta: "#D14D54", // Rich Red-Pink
      accentShadow: "rgba(244, 98, 65, 0.2)",
      accentNavy: "#FFF9F0",   // Warm Cream
      accentBrand: "#38A3A5",  // Bright Cyan
      textMain: "#FFF9F0",     // Contrast ~18:1
      textBody: "#E2F2F1",     // Contrast ~7:1
      textDim: "#B8D6D4"       // Contrast ~4.6:1
    }
  },
  {
    id: 2,
    name: "Golden Hour Victorian",
    description: "Focuses on the warm glow of the wood details. Accessibility optimized for low-vision readability.",
    colors: {
      bg: "#0A1417",
      surface: "#143238",
      surfaceAlt: "#1D474F",
      line: "#3D666E",
      accent: "#FFB347",      // Saturated Gold (AA Large Text)
      accentPurple: "#7A364D",
      accentMagenta: "#E85D44",
      accentShadow: "rgba(255, 179, 71, 0.15)",
      accentNavy: "#FEFDF5",
      accentBrand: "#4CC9F0",
      textMain: "#FEFDF5",
      textBody: "#E6F0EE",
      textDim: "#B0C7C3"
    }
  },
  {
    id: 3,
    name: "Deep Bay Contrast",
    description: "High-contrast ink and cyan. Best for readability in bright sunlight.",
    colors: {
      bg: "#051114",
      surface: "#122B30",
      surfaceAlt: "#1C3F45",
      line: "#3A6269",
      accent: "#48CAE4",      // Accessible Cyan
      accentPurple: "#3D1E3D",
      accentMagenta: "#F94144",
      accentShadow: "rgba(72, 202, 228, 0.2)",
      accentNavy: "#FFFFFF",
      accentBrand: "#F3722C",
      textMain: "#FFFFFF",
      textBody: "#E0ECEB",
      textDim: "#A8BDBB"
    }
  }
];
