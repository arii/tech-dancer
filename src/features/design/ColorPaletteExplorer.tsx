import { useState, useMemo } from 'react';
import { Palette, Home, Layout, Type, CheckCircle2, ShieldCheck, AlertCircle } from 'lucide-react';
import { Box, Stack, Grid, Text } from '@/layouts/Primitives';
import { Icon } from '@/components/ui/Icon';
import { PALETTES, getContrastText } from './palette-utils';
import { useThemeOverrides } from '@/hooks/useThemeOverrides';

/**
 * Component to demonstrate dynamic theme switching for the "Accessible Victorian" research tool.
 */
export default function ColorPaletteExplorer() {
  const [activePalette, setActivePalette] = useState(PALETTES[0]);
  const { applyOverrides } = useThemeOverrides();

  const themeOverrides = useMemo(() => {
    const vars = {
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
    };
    return vars as React.CSSProperties;
  }, [activePalette]);

  const handlePaletteChange = (p: typeof activePalette) => {
    setActivePalette(p);
    applyOverrides(themeOverrides as Record<string, string>);
  };

  const accentColorStyle = useMemo(() => ({ color: 'var(--raw-color-accent)' }), []);
  const accentMagentaStyle = useMemo(() => ({ color: 'var(--raw-color-accent-magenta)' }), []);
  const accentNavyStyle = useMemo(() => ({ color: 'var(--raw-color-accent-navy)' }), []);
  const accentPurpleBgStyle = useMemo(() => ({ backgroundColor: 'var(--raw-color-accent-purple)' }), []);
  const accentMagentaBgStyle = useMemo(() => ({ backgroundColor: 'var(--raw-color-accent-magenta)' }), []);
  const accentRawStyle = useMemo(() => ({ backgroundColor: 'var(--raw-color-accent)', color: 'var(--btn-text)' }), []);
  const accentRawBorderStype = useMemo(() => ({ backgroundColor: 'var(--raw-color-accent)', borderColor: 'var(--raw-color-accent-magenta)' }), []);

  return (
    <Box
      width="full"
      padding={{ base: 4, md: 8 }}
      radius="xl"
      style={themeOverrides}
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
              <Icon icon={ShieldCheck} size="sm" style={accentColorStyle} />
              <Text
                variant="mono"
                size="xs"
                weight="font-bold"
                uppercase
                tracking="widest"
                style={accentColorStyle}
              >
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
            {PALETTES.map(p => {
              const isActive = activePalette.id === p.id;
              const buttonStyle = {
                backgroundColor: isActive ? 'var(--raw-color-accent)' : 'var(--raw-color-surface)',
                color: isActive ? 'var(--btn-text)' : 'var(--raw-color-text-main)',
                borderColor: 'var(--raw-color-line)',
                '--tw-ring-color': 'var(--raw-color-accent)'
              } as React.CSSProperties;

              return (
                <Box
                  key={p.id}
                  as="button"
                  onClick={() => handlePaletteChange(p)}
                  paddingX={4}
                  paddingY={2}
                  radius="lg"
                  border={true}
                  display="flex"
                  align="center"
                  gap={2}
                  className={`transition-all font-medium ${isActive ? 'ring-2 ring-offset-2 ring-offset-black' : 'opacity-60 hover:opacity-100'}`}
                  style={buttonStyle}
                >
                  {isActive && <Icon icon={CheckCircle2} size="sm" />}
                  <Text variant="sans" weight="font-medium">{p.name}</Text>
                </Box>
              );
            })}
          </Stack>
        </Stack>

        {/* Main Content */}
        <Grid cols={{ base: 1, lg: 3 }} gap={8}>

          {/* Swatches Sidebar */}
          <Stack gap={6}>
            <Box padding={6} radius="2xl" border={true} surface="surface" className="border-line">
              <Stack gap={4}>
                <Stack direction="row" align="center" gap={2}>
                  <Icon icon={Palette} size="sm" style={accentColorStyle} />
                  <Text
                    variant="mono"
                    size="xs"
                    weight="font-bold"
                    uppercase
                    tracking="widest"
                    style={accentColorStyle}
                  >
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
                <Box padding={3} radius="xl" className="shadow-lg" style={accentPurpleBgStyle}>
                   <Icon icon={Home} style={accentNavyStyle} />
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
                    <Box height={2} width="full" radius="full" className="opacity-60" style={accentMagentaBgStyle} />
                    <Box paddingTop={2}>
                      <Box
                        as="button"
                        paddingX={8}
                        paddingY={3}
                        radius="xl"
                        className="font-bold shadow-lg transition-transform hover:-translate-y-0.5 active:translate-y-0"
                        style={accentRawStyle}
                      >
                        Click to Explore
                      </Box>
                    </Box>
                  </Stack>
                </Box>

                <Box padding={6} radius="xl" border={true} surface="surface" className="shadow-md border-line">
                  <Stack gap={4}>
                    <Stack direction="row" align="center" gap={2}>
                      <Icon icon={Type} size="sm" style={accentMagentaStyle} />
                      <Text variant="mono" size="xs" weight="font-bold" className="uppercase tracking-wider" style={accentMagentaStyle}>
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
                  <Box width={10} height={16} radius="t-lg" className="shadow-sm" style={accentPurpleBgStyle} />
                  <Box width={14} height={24} radius="t-lg" border="r" className="shadow-md" style={accentRawBorderStype} />
                  <Box width={24} height={28} radius="t-lg" position="relative" surface="surface" className="shadow-lg">
                    <Box position="absolute" top={4} left={6} right={6} height={8} radius="standard" border={true} className="border-accent-navy" />
                  </Box>
                  <Box width={14} height={20} radius="t-lg" className="shadow-md bg-accent-brand" />
                  <Box width={10} height={12} radius="t-lg" className="shadow-sm" style={accentMagentaBgStyle} />
              </Box>
            </Box>

            {/* Contrast Grid */}
            <Grid cols={{ base: 2, md: 4 }} gap={4}>
               {(['accent', 'accentPurple', 'accentMagenta', 'accentBrand'] as const).map(key => {
                 const colorValue = activePalette.colors[key];
                 const kebabKey = key === 'accent' ? 'accent' : key.replace(/[A-Z]/g, m => '-' + m.toLowerCase());
                 const contrastTextStyle = {
                    backgroundColor: `var(--raw-color-${kebabKey})`,
                    color: getContrastText(colorValue)
                 };
                 const colorStripStyle = {
                    backgroundColor: `var(--raw-color-${kebabKey})`
                 };

                 return (
                   <Stack key={key} padding={4} radius="xl" border={true} surface="surface" align="center" gap={3} className="border-line">
                     <Box
                        height={10}
                        width={10}
                        radius="full"
                        display="flex"
                        align="center"
                        justify="center"
                        className="shadow-inner font-bold"
                        size="micro"
                        style={contrastTextStyle}
                     >
                       AA
                     </Box>
                     <Box
                        height={1.5}
                        width="full"
                        radius="full"
                        style={colorStripStyle}
                     />
                   </Stack>
                 );
               })}
            </Grid>
          </Stack>
        </Grid >
      </Stack>
    </Box>
  );
}

interface SwatchProps {
  label: string;
  color: string;
  check: string;
}

function Swatch({ label, color, check }: SwatchProps) {
  const swatchStyle = useMemo(() => ({ backgroundColor: color }), [color]);

  return (
    <Box display="flex" align="center" justify="between" className="group">
      <Stack direction="row" align="center" gap={3}>
        <Box
          width={10}
          height={10}
          radius="lg"
          className="shadow-md border border-white/10 ring-1 ring-black/5"
          style={swatchStyle}
        />
        <Stack gap={0}>
          <Text variant="sans" size="sm" weight="font-semibold" color="main">{label}</Text>
          <Text variant="mono" size="micro" color="dim" uppercase tracking="tighter" className="opacity-60">{color}</Text>
        </Stack>
      </Stack>
      <Box
        paddingX={1.5}
        paddingY={0.5}
        radius="standard"
        border={true}
        className="opacity-70 uppercase border-line"
      >
        <Text variant="mono" color="dim" size="micro">{check}</Text>
      </Box>
    </Box>
  );
}
