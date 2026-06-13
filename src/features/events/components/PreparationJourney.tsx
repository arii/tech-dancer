import { NavLink } from 'react-router-dom';
import { Box, Grid, Stack, Text } from '@/layouts/Primitives';
import { Calendar, Compass, RefreshCw } from 'lucide-react';

const JOURNEY_STEPS = [
  {
    title: '1. BEFORE THE EVENT',
    icon: Calendar,
    items: [
      { label: 'WCS Travel Pack', slug: '2026-04-19-gear-essentials', type: 'blog' },
      { label: 'Packing Checklist', slug: '2024-06-01-compression-cubes', type: 'gear' },
      { label: 'Flight Planning', slug: '2024-06-01-travel-bottles', type: 'gear' },
      { label: 'Hotel Strategy', slug: '2026-04-18-financial-literacy-dancers', type: 'blog' },
    ]
  },
  {
    title: '2. DURING THE EVENT',
    icon: Compass,
    items: [
      { label: 'Social Dance Etiquette', slug: '2026-05-06-boomtick-and-b-the-rhythmic-architecture-of-west-coast-swing', type: 'blog' },
      { label: 'Competition Strategy', slug: '2026-04-18-competition-metrics', type: 'blog' },
      { label: 'Recovery Between Nights', slug: '2024-06-01-foam-roller', type: 'gear' },
      { label: 'Food & Hydration', slug: '2024-06-01-sunscreen', type: 'gear' },
    ]
  },
  {
    title: '3. AFTER THE EVENT',
    icon: RefreshCw,
    items: [
      { label: 'Video Review Process', slug: '2026-04-18-why-finals-are-hard', type: 'blog' },
      { label: 'Networking Follow-Up', slug: '2026-04-18-github-actions', type: 'blog' },
      { label: 'Practice Planning', slug: '2026-05-06-boomtick-and-b-the-rhythmic-architecture-of-west-coast-swing', type: 'blog' },
    ]
  }
];

export function PreparationJourney() {
  return (
    <Box as="section" marginTop={{ base: 16, lg: 32 }}>
      <Stack gap={12}>
        <Text variant="mono" size="xs" color="brand" weight="font-black" uppercase tracking="widest">
          Event Preparation Journey
        </Text>

        <Grid cols={{ base: 1, lg: 3 }} gap={8}>
          {JOURNEY_STEPS.map((step) => (
            <Stack key={step.title} gap={6} border radius="xl" padding={8} surface="default" className="hover:border-accent/20 transition-all">
              <Box display="flex" align="center" gap={3}>
                <step.icon className="w-5 h-5 text-accent" />
                <Text variant="mono" size="sm" weight="font-black" tracking="wide">
                  {step.title}
                </Text>
              </Box>

              <Stack gap={4}>
                {step.items.map((item) => (
                  <Box
                    key={item.label}
                    as={NavLink}
                    to={`/${item.type === 'blog' ? 'blog' : 'gear'}/${item.slug}`}
                    className="group"
                  >
                    <Text
                      variant="body"
                      size="base"
                      color="dim"
                      className="group-hover:text-accent transition-colors border-b border-transparent group-hover:border-accent/20 pb-0.5"
                    >
                      {item.label}
                    </Text>
                  </Box>
                ))}
              </Stack>
            </Stack>
          ))}
        </Grid>
      </Stack>
    </Box>
  );
}
