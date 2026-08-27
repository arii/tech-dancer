import { useState } from 'react';
import { Sparkles, Shirt, PartyPopper, Award, Tag, CheckCircle2 } from 'lucide-react';
import { Box, Stack, Grid, Text } from '@/layouts/Primitives';
import { ThemeDressCode } from '../types';

export interface ThemeDressCodeCardProps {
  themes?: ThemeDressCode[];
  className?: string;
}

const DEFAULT_THEMES: ThemeDressCode[] = [
  {
    id: 'theme-fri',
    day: 'Friday Night',
    themeTitle: 'Neon / UV Glow Late Night Party',
    category: 'social_theme',
    description: 'The ballroom turns on blacklights for the midnight social. Dancers wear bright neon shades and UV-reactive apparel.',
    recommendedAttire: ['Neon Yellow/Pink/Green Tops', 'White Accents / UV-glow shoes', 'Glow bracelets & accessories'],
    vibe: 'High Energy & Vibrant',
  },
  {
    id: 'theme-sat',
    day: 'Saturday Evening',
    themeTitle: 'Pro Showcase Gala & Dressy Glam',
    category: 'showcase_formal',
    description: 'The marquee evening featuring Champions Strictly Finals and Pro Routine Showcases. Elevated dancewear and cocktail chic.',
    recommendedAttire: ['Fitted dress shirts / vests', 'Cocktail dresses & dance jumpsuits', 'Polished suede dance shoes'],
    vibe: 'Elegant & Sophisticated',
  },
  {
    id: 'theme-comp',
    day: 'Sat / Sun Prelims',
    themeTitle: 'WSDC Competition Dress Code',
    category: 'competition_attire',
    description: 'Clean, smart casual dancewear adhering to WSDC guidelines. Form-fitting lines with freedom of motion for partnering.',
    recommendedAttire: ['Breathable dance trousers / dark denim', 'Neat fitted shirts / tops', 'Secure bib placement'],
    vibe: 'Professional & Clean',
  },
  {
    id: 'theme-sun',
    day: 'Sunday Night',
    themeTitle: 'Survivor Social & Studio Athleisure',
    category: 'casual_sunday',
    description: 'Late-night chill survivors party until sunrise. Relaxed dance t-shirts, oversized hoodies, and maximum comfort.',
    recommendedAttire: ['Event / Studio t-shirts', 'Stretch joggers / leggings', 'Flat dance sneakers / socks'],
    vibe: 'Cozy & Laid Back',
  },
];

const CATEGORY_CONFIG = {
  social_theme: {
    label: 'Social Theme',
    badge: 'bg-brand-cyan/20 text-brand-cyan border-brand-cyan/40',
    icon: PartyPopper,
    accentBorder: 'hover:border-brand-cyan/60',
  },
  showcase_formal: {
    label: 'Gala & Showcase',
    badge: 'bg-brand-amber/20 text-brand-amber border-brand-amber/40',
    icon: Sparkles,
    accentBorder: 'hover:border-brand-amber/60',
  },
  competition_attire: {
    label: 'WSDC Official',
    badge: 'bg-brand-emerald/20 text-brand-emerald border-brand-emerald/40',
    icon: Award,
    accentBorder: 'hover:border-brand-emerald/60',
  },
  casual_sunday: {
    label: 'Survivor Social',
    badge: 'bg-surface text-text-main border-line',
    icon: Shirt,
    accentBorder: 'hover:border-accent/60',
  },
};

export const ThemeDressCodeCard = ({ themes = DEFAULT_THEMES, className }: ThemeDressCodeCardProps) => {
  return (
    <Stack gap={4} className={className}>
      {/* Header Banner */}
      <Box display="flex" align="center" justify="between" wrap gap={2}>
        <Stack gap={1}>
          <Box display="flex" align="center" gap={2}>
            <Sparkles className="w-5 h-5 text-accent" />
            <Text weight="font-bold" size="lg" color="main">
              Event Themes &amp; Dress Codes
            </Text>
          </Box>
          <Text size="xs" color="dim">
            Official party themes, gala dress codes, and competition attire expectations
          </Text>
        </Stack>
        <Text variant="mono" size="xs" color="accent" weight="font-semibold" radius="md" paddingX={3} paddingY={1} surface="card" border>
          {themes.length} Key Themes Identified
        </Text>
      </Box>

      {/* Grid of Theme & Dress Code Cards */}
      <Grid cols={{ base: 1, sm: 2 }} gap={4}>
        {themes.map((item) => {
          const config = CATEGORY_CONFIG[item.category] || CATEGORY_CONFIG.social_theme;
          const CategoryIcon = config.icon;

          return (
            <Box
              key={item.id}
              padding={5}
              radius="xl"
              surface="card"
              border
              shadow="md"
              display="flex"
              direction="col"
              justify="between"
              className={`border-line/80 transition-all ${config.accentBorder}`}
            >
              <Stack gap={3}>
                {/* Top Row: Day & Category Tag */}
                <Box display="flex" align="center" justify="between" gap={2}>
                  <Box display="flex" align="center" gap={2}>
                    <Box padding={2} radius="xl" border className={`${config.badge} shrink-0`}>
                      <CategoryIcon className="w-4 h-4" />
                    </Box>
                    <Text variant="mono" size="xs" weight="font-bold" color="accent" uppercase tracking="wider">
                      {item.day}
                    </Text>
                  </Box>

                  <Text variant="mono" size="micro" weight="font-semibold" radius="md" paddingX={2.5} paddingY={0.5} border className={config.badge}>
                    {config.label}
                  </Text>
                </Box>

                {/* Theme Title & Vibe */}
                <Stack gap={1}>
                  <Text weight="font-bold" size="base" color="main" leading="snug">
                    {item.themeTitle}
                  </Text>
                  <Text size="xs" color="dim" leading="relaxed">
                    {item.description}
                  </Text>
                </Stack>

                {/* Recommended Attire Checklist Pills */}
                <Box padding={3} radius="xl" surface="muted" border className="border-line/50">
                  <Stack gap={2}>
                    <Box display="flex" align="center" gap={1.5}>
                      <Tag className="w-3.5 h-3.5 text-accent shrink-0" />
                      <Text variant="mono" size="micro" weight="font-semibold" color="main">
                        Recommended Outfits:
                      </Text>
                    </Box>
                    <Box display="flex" wrap gap={1.5}>
                      {item.recommendedAttire.map((attire, idx) => (
                        <Box
                          key={idx}
                          display="inline-flex"
                          align="center"
                          gap={1}
                          paddingX={2.5}
                          paddingY={1}
                          radius="lg"
                          surface="card"
                          border
                          className="border-line/60"
                        >
                          <CheckCircle2 className="w-3 h-3 text-brand-emerald shrink-0" />
                          <Text size="xs" color="dim">{attire}</Text>
                        </Box>
                      ))}
                    </Box>
                  </Stack>
                </Box>
              </Stack>

              {/* Vibe Tag Footer */}
              <Box paddingTop={2} marginTop={4} border className="border-t border-line/40">
                <Box display="flex" align="center" justify="between">
                  <Text variant="mono" size="micro" color="dim">Atmosphere:</Text>
                  <Text variant="mono" size="xs" color="accent" weight="font-semibold">
                    ✨ {item.vibe}
                  </Text>
                </Box>
              </Box>
            </Box>
          );
        })}
      </Grid>
    </Stack>
  );
};
