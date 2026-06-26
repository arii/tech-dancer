// impeccable-ignore-file
import { NavLink } from 'react-router-dom';
import { Box, Stack, Text, Grid } from '@/layouts/Primitives';
import { ASSET_PREFIX } from '@/config/constants';

const FEATURED = {
  eyebrow: 'FEATURED GUIDE',
  title: 'The WCS Travel Pack',
  subtitle: 'Your checklist for a smoother, better dance weekend.',
  image: '/assets/home/wcs-travel-pack.webp',
  imageAlt: 'Overhead view of a West Coast Swing travel pack containing dance shoes, earplugs, and travel essentials',
  href: '/blog/2026-04-19-practical-tools-essentials',
};

export function FeaturedGuidePanel() {
  return (
    <Grid
      as={NavLink}
      to={FEATURED.href}
      cols={{ base: 1, lg: 1 }}
      width="full"
      position="relative"
      overflow="hidden"
      border
      radius="lg"
      className="group self-stretch bg-surface/30 transition-all hover:border-accent/50"
    >
      <Stack
        direction={{ base: 'col', lg: 'row' }}
        width="full"
        height="full"
        align="stretch"
        gap={0}
      >
        {/* Mobile-only Header: Title above Image */}
        <Stack
          gap={2}
          padding={6}
          paddingBottom={2}
          display={{ base: 'flex', lg: 'none' }}
          className="order-1"
        >
          <Text variant="mono" size="xs" color="accent" weight="font-black" uppercase tracking="widest">
            {FEATURED.eyebrow}
          </Text>
          <Text variant="headline" size="2xl" weight="font-black" color="main" leading="tight">
            {FEATURED.title}
          </Text>
        </Stack>

        {/* Image portion - 45% on desktop */}
        <Box
          width={{ base: 'full', lg: '45%' }}
          position="relative"
          overflow="hidden"
          className="aspect-[4/3] lg:aspect-auto order-2 lg:order-none"
        >
          <img
            src={`${ASSET_PREFIX}${FEATURED.image}`}
            alt={FEATURED.imageAlt}
            width={600}
            height={600}
            fetchPriority="high"
            className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
          />
        </Box>

        {/* Text portion - 55% on desktop */}
        <Stack
          gap={4}
          padding={{ base: 6, lg: 8 }}
          width={{ base: 'full', lg: '55%' }}
          justify="center"
          className="order-3 lg:order-none"
        >
          {/* Desktop-only Header: Title next to Image */}
          <Box display={{ base: 'none', lg: 'block' }}>
            <Stack gap={4} marginBottom={4}>
              <Text variant="mono" size="xs" color="accent" weight="font-black" uppercase tracking="widest">
                {FEATURED.eyebrow}
              </Text>
              <Text variant="headline" size="4xl" weight="font-black" color="main" leading="tight">
                {FEATURED.title}
              </Text>
            </Stack>
          </Box>

          <Text variant="body" size={{ base: 'lg', lg: 'xl' }} color="body">
            {FEATURED.subtitle}
          </Text>
          <Text
            variant="mono"
            size="sm"
            color="accent"
            weight="font-bold"
            className="mt-4 inline-flex items-center gap-2 group-hover:translate-x-1 transition-transform"
          >
            Read Guide →
          </Text>
        </Stack>
      </Stack>
    </Grid>
  );
}
