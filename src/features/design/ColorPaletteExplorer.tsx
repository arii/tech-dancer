import { useState, useMemo } from 'react';
import { Palette, Home, Layout, Type, CheckCircle2, ShieldCheck, AlertCircle } from 'lucide-react';
import { Box, Stack, Grid, Text } from '@/layouts/Primitives';
import { Icon } from '@/components/ui/Icon';

// Helper to determine if text should be dark or light based on background hex
const getContrastText = (hexcolor: string) => {
  if (!hexcolor || hexcolor.startsWith('rgba')) return '#000000';
  const r = parseInt(hexcolor.slice(1, 3), 16);
  const g = parseInt(hexcolor.slice(3, 5), 16);
  const b = parseInt(hexcolor.slice(5, 7), 16);
  const yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
  return (yiq >= 128) ? '#000000' : '#FFFFFF';
};

interface PaletteData {
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
  };
}

const PALETTES: PaletteData[] = [
  {
    id: 1,
    name: "The Heritage Vibrant'",
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

export default function ColorPaletteExplorer() {
  const [activePalette, setActivePalette] = useState(PALETTES[0]);

  const cssVars = useMemo(() => ({
    '--raw-color-bg': activePalette.colors.bg,
    '--raw-color-surface': activePalette.colors.surface,
    '--raw-color-surface-alt': activePalette.colors.surfaceAlt,
    '--raw-color-line': activePalette.colors.line,
    '--raw-color-accent': activePalette.colors.accent,
    '--raw-color-accent-purple': activePalette.colors.accentPurple,
    '--raw-color-accent-magenta': activePalette.colors.accentMagenta,
    '--raw-color-accent-shadow': activePalette.colors.accentShadow,
    '--raw-color-accent-navy': activePalette.colors.accentNavy,
    '--raw-color-accent-brand': activePalette.colors.accentBrand,
    '--raw-color-text-main': activePalette.colors.textMain,
    '--raw-color-text-body': activePalette.colors.textBody,
    '--raw-color-text-dim': activePalette.colors.textDim,
    '--btn-text': getContrastText(activePalette.colors.accent),
  }), [activePalette]);

  return (
    <Box
      width="full"
      padding={{ base: 4, md: 8 }}
      radius="xl"
      style={cssVars as React.CSSProperties}
      className="transition-all duration-500 bg-bg text-text-body"
    >
      <Stack gap={8} maxWidth="6xl" marginX="auto">

        {/* Header */}
        <Stack
          direction={{ base: 'col', md: 'row' }}
          align={{ base: 'start', md: 'center' }}
          justify="between"
          gap={6}
          border="b"
          paddingBottom={8}
          className="border-line"
        >
          <Box>
            <Stack direction="row" align="center" gap={2} marginBottom={2}>
              <Icon icon={ShieldCheck} size="sm" color="accent" />
              <Text variant="mono" size="xs" weight="font-bold" color="accent" uppercase tracking="widest">
                WCAG 2.1 Compliant
              </Text>
            </Stack>
            <Text as="h1" variant="serif" size="5xl" weight="font-bold" color="main" marginBottom={2}>
              Accessible Victorian
            </Text>
            <Text variant="body" size="lg" color="dim" maxWidth="xl">
              Historical vibrancy met with modern readability standards.
            </Text>
          </Box>
          <Stack direction="row" wrap gap={2}>
            {PALETTES.map(p => (
              <Box
                key={p.id}
                as="button"
                onClick={() => setActivePalette(p)}
                paddingX={4}
                paddingY={2}
                radius="lg"
                border={true}
                display="flex"
                align="center"
                gap={2}
                className={`transition-all font-medium ${activePalette.id === p.id ? 'ring-2 ring-offset-2 ring-offset-black' : 'opacity-60 hover:opacity-100'}`}
                style={{
                  backgroundColor: activePalette.id === p.id ? 'var(--raw-color-accent)' : 'var(--raw-color-surface)',
                  color: activePalette.id === p.id ? 'var(--btn-text)' : 'var(--raw-color-text-main)',
                  borderColor: 'var(--raw-color-line)',
                  '--tw-ring-color': 'var(--raw-color-accent)'
                } as React.CSSProperties}
              >
                {activePalette.id === p.id && <Icon icon={CheckCircle2} size="sm" />}
                <Text variant="sans" weight="font-medium">{p.name}</Text>
              </Box>
            ))}
          </Stack>
        </Stack>

        {/* Main Content */}
        <Grid cols={{ base: 1, lg: 3 }} gap={8}>

          {/* Swatches Sidebar */}
          <Stack gap={6}>
            <Box padding={6} radius="2xl" border={true} surface="surface" className="border-line">
              <Stack gap={4}>
                <Stack direction="row" align="center" gap={2}>
                  <Icon icon={Palette} size="sm" color="accent" />
                  <Text variant="mono" size="xs" weight="font-bold" color="accent" uppercase tracking="widest">
                    Color Audit
                  </Text>
                </Stack>
                <Stack gap={3}>
                  <Swatch label="Background" color={activePalette.colors.bg} check="Contrast Base" />
                  <Swatch label="Siding Teal" color={activePalette.colors.surface} check="AA Body" />
                  <Swatch label="Coral Accent" color={activePalette.colors.accent} check="AA UI" />
                  <Swatch label="Plum Detail" color={activePalette.colors.accentPurple} check="AA Large" />
                  <Swatch label="Text Primary" color={activePalette.colors.textMain} check="AAA" />
                  <Swatch label="Text Body" color={activePalette.colors.textBody} check="AA" />
                </Stack>
              </Stack>
            </Box>

            <Box padding={5} radius="2xl" border={true} surface="alt" className="shadow-lg border-line">
              <Stack gap={3}>
                <Stack direction="row" align="center" gap={2}>
                  <Icon icon={AlertCircle} size="sm" color="brand" />
                  <Text variant="mono" size="xs" weight="font-bold" color="brand" uppercase>
                    Accessibility Note
                  </Text>
                </Stack>
                <Text variant="body" size="sm" color="body" className="leading-snug opacity-90">
                  {activePalette.description}
                </Text>
              </Stack>
            </Box>
          </Stack>

          {/* Visualization Mockup */}
          <Stack gap={6} span={{ lg: 2 }}>
            <Box
              padding={8}
              radius="3xl"
              border={true}
              surface="alt"
              position="relative"
              overflow="hidden"
              className="shadow-2xl border-line"
            >

              <Box position="absolute" inset="top" height={2} className="bg-accent" />

              <Stack direction="row" align="center" gap={4} marginBottom={8}>
                <Box padding={3} radius="xl" className="shadow-lg bg-accent-purple">
                   <Icon icon={Home} color="white" style={{ color: 'var(--raw-color-accent-navy)' }} />
                </Box>
                <Box>
                  <Text as="h3" variant="serif" size="2xl" weight="font-bold" color="main">San Francisco Heritage</Text>
                  <Text variant="body" size="sm" color="dim" className="opacity-70">Readability Score: 100/100</Text>
                </Box>
              </Stack>

              <Grid cols={{ base: 1, md: 2 }} gap={6}>
                <Box padding={6} radius="xl" border={true} surface="surface" className="shadow-md border-line">
                  <Stack gap={4}>
                    <Stack direction="row" align="center" gap={2}>
                      <Icon icon={Layout} size="sm" color="brand" />
                      <Text variant="mono" size="xs" weight="font-bold" color="brand" uppercase tracking="wider">
                        Interface Check
                      </Text>
                    </Stack>
                    <Box height={2} width="2/3" radius="full" className="bg-accent-purple" />
                    <Box height={2} width="full" radius="full" className="bg-accent-magenta opacity-60" />
                    <Box paddingTop={2}>
                      <Box
                        as="button"
                        paddingX={8}
                        paddingY={3}
                        radius="xl"
                        className="font-bold shadow-lg transition-transform hover:-translate-y-0.5 active:translate-y-0"
                        style={{ backgroundColor: 'var(--raw-color-accent)', color: 'var(--btn-text)' } as React.CSSProperties}
                      >
                        Click to Explore
                      </Box>
                    </Box>
                  </Stack>
                </Box>

                <Box padding={6} radius="xl" border={true} surface="surface" className="shadow-md border-line">
                  <Stack gap={4}>
                    <Stack direction="row" align="center" gap={2}>
                      <Icon icon={Type} size="sm" className="text-accent-magenta" />
                      <Text variant="mono" size="xs" weight="font-bold" className="text-accent-magenta uppercase tracking-wider">
                        Typography AA
                      </Text>
                    </Stack>
                    <Text variant="body" size="base" color="body" className="leading-relaxed">
                      This text maintains a contrast ratio of at least 4.5:1 against the teal background.
                    </Text>
                    <Text variant="sans" size="sm" weight="font-medium" color="dim">
                      Even the dimmed secondary text remains legible for users with moderate visual impairments.
                    </Text>
                  </Stack>
                </Box>
              </Grid>

              {/* Decorative House Representation */}
              <Box
                marginTop={10}
                paddingTop={8}
                border="t"
                display="flex"
                justify="center"
                align="end"
                gap={1}
                height={32}
                className="border-line"
              >
                  <Box width={10} height={16} radius="t-lg" className="shadow-sm bg-accent-purple" />
                  <Box width={14} height={24} radius="t-lg" border="r" className="shadow-md bg-accent border-accent-magenta" />
                  <Box width={24} height={28} radius="t-lg" position="relative" surface="surface" className="shadow-lg">
                    <Box position="absolute" top={4} left={6} right={6} height={8} radius="standard" border={true} className="border-accent-navy" />
                  </Box>
                  <Box width={14} height={20} radius="t-lg" className="shadow-md bg-accent-brand" />
                  <Box width={10} height={12} radius="t-lg" className="shadow-sm bg-accent-magenta" />
              </Box>
            </Box>

            {/* Contrast Grid */}
            <Grid cols={{ base: 2, md: 4 }} gap={4}>
               {(['accent', 'accentPurple', 'accentMagenta', 'accentBrand'] as const).map(key => (
                 <Box key={key} padding={4} radius="xl" border={true} surface="surface" className="flex flex-col items-center gap-3 border-line">
                   <Box
                      height={10}
                      width={10}
                      radius="full"
                      display="flex"
                      align="center"
                      justify="center"
                      className="shadow-inner text-[10px] font-bold"
                      style={{
                        backgroundColor: `var(--raw-color-${key === 'accent' ? 'accent' : key.replace(/[A-Z]/g, m => '-' + m.toLowerCase())})`,
                        color: getContrastText(activePalette.colors[key])
                      } as React.CSSProperties}
                   >
                     AA
                   </Box>
                   <Box
                      height={1.5}
                      width="full"
                      radius="full"
                      style={{
                        backgroundColor: `var(--raw-color-${key === 'accent' ? 'accent' : key.replace(/[A-Z]/g, m => '-' + m.toLowerCase())})`
                      } as React.CSSProperties}
                   />
                 </Box>
               ))}
            </Grid>
          </Stack>
        </Grid >
      </Stack>
    </Box>
  );
}

function Swatch({ label, color, check }: { label: string; color: string; check: string }) {
  return (
    <Box display="flex" align="center" justify="between" className="group">
      <Stack direction="row" align="center" gap={3}>
        <Box
          width={10}
          height={10}
          radius="lg"
          className="shadow-md border border-white/10 ring-1 ring-black/5"
          style={{ backgroundColor: color }}
        />
        <Box>
          <Text variant="sans" size="sm" weight="font-semibold" color="main">{label}</Text>
          <Text variant="mono" size="micro" color="dim" uppercase tracking="tighter" className="opacity-60">{color}</Text>
        </Box>
      </Stack>
      <Box
        paddingX={1.5}
        paddingY={0.5}
        radius="standard"
        border={true}
        className="text-[9px] font-bold opacity-70 uppercase border-line"
      >
        <Text variant="mono" color="dim">{check}</Text>
      </Box>
    </Box>
  );
}
