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

export const ThemeDressCodeCard = ({ themes = DEFAULT_THEMES, className }: ThemeDressCodeCardProps) => {
  return (
    <Stack gap={5} width="full" className={className}>
      {/* Editorial Header */}
      <Box display="flex" align="start" justify="between" wrap gap={2} className="pb-2 border-b border-line/40">
        <Stack gap={0.5}>
          <Text as="h3" variant="body-bold" size="lg" color="main" className="text-base sm:text-lg">
            Event Themes &amp; Dress Codes
          </Text>
          <Text size="xs" color="dim">
            Official party themes, gala dress codes, and competition attire expectations
          </Text>
        </Stack>
      </Box>

      {/* Grid of Theme & Dress Code Items in Elegant, Open-Air Cards */}
      <Grid cols={{ default: 1, md: 2 }} gap={4}>
        {themes.map((item) => {
          return (
            <Box
              key={item.id}
              padding={5}
              radius="lg"
              border
              className="bg-surface/30 border-line/50 flex flex-col justify-between"
            >
              <Stack gap={3}>
                <Box display="flex" align="center" justify="between" gap={2}>
                  <Text variant="mono" size="micro" color="dim" uppercase tracking="wider" weight="font-semibold">
                    {item.day}
                  </Text>
                </Box>

                <Stack gap={1}>
                  <Text weight="font-bold" size="base" color="main" leading="snug">
                    {item.themeTitle}
                  </Text>
                  <Text size="xs" color="dim" leading="relaxed">
                    {item.description}
                  </Text>
                </Stack>

                {/* Clean Outfits Bullet List */}
                <Stack gap={1} className="pt-2">
                  <Text variant="mono" size="micro" color="dim" uppercase tracking="wider">
                    Recommended Outfits:
                  </Text>
                  <Box as="ul" className="space-y-1 pl-1">
                    {item.recommendedAttire.map((attire, idx) => (
                      <Text as="li" key={idx} size="xs" color="dim" className="list-none flex items-center gap-1.5">
                        <span className="text-text-dim text-xs">•</span>
                        <span>{attire}</span>
                      </Text>
                    ))}
                  </Box>
                </Stack>
              </Stack>

              {/* Atmosphere Monospace Footer */}
              <Box paddingTop={3} marginTop={4} className="border-t border-line/30">
                <Text variant="mono" size="micro" color="dim">
                  Atmosphere: <span className="text-text-main font-medium">{item.vibe}</span>
                </Text>
              </Box>
            </Box>
          );
        })}
      </Grid>
    </Stack>
  );
};
