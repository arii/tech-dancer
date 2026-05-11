import palettesData from '@/data/victorian-palettes.json';

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

/**
 * Helper to determine if text should be dark or light based on background hex
 */
export const getContrastText = (hexcolor: string) => {
  if (!hexcolor || hexcolor.startsWith('rgba')) return '#000000';
  const r = parseInt(hexcolor.slice(1, 3), 16);
  const g = parseInt(hexcolor.slice(3, 5), 16);
  const b = parseInt(hexcolor.slice(5, 7), 16);
  const yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
  return (yiq >= 128) ? '#000000' : '#FFFFFF';
};

export const PALETTES: PaletteData[] = palettesData;
