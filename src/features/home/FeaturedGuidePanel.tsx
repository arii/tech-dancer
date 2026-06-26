// impeccable-ignore-file
import { NavLink } from 'react-router-dom';
import { Box, Stack, Text } from '@/layouts/Primitives';
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
    <Stack
      as={NavLink}
      to={FEATURED.href}
      width="full"
      direction={{ base: 'col', lg: 'row' }}
      position="relative"
      overflow="hidden"
      border
      radius="lg"
      className="group bg-surface/30 transition-all hover:border-accent/50"
    >
      {/* Image: 45% on desktop */}
      <Box
        width={{ base: 'full', lg: '45%' }}
        height={{ base: 64, lg: 'auto' }}
        position="relative"
        overflow="hidden"
        className="shrink-0"
      >
        <img
          src={`${ASSET_PREFIX}${FEATURED.image}`}
          alt={FEATURED.imageAlt}
          width={420}
          height={600}
          fetchPriority="high"
          className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
        />
        {/* Subtle dark overlay */}
        <Box
          position="absolute"
          inset
          className="bg-black/20"
          aria-hidden="true"
        />
      </Box>

      {/* Content: 55% on desktop */}
      <Stack
        gap={4}
        padding={{ base: 6, lg: 10 }}
        width={{ base: 'full', lg: '55%' }}
        justify="center"
        align="start"
      >
        <Text variant="mono" size="tiny" color="accent" weight="font-black" uppercase tracking="widest">
          {FEATURED.eyebrow}
        </Text>
        <Text variant="h2" size={{ base: '2xl', lg: '3xl' }} weight="font-black" color="main" leading="tight">
          {FEATURED.title}
        </Text>
        <Text variant="body" size="base" color="body" className="max-w-md">
          {FEATURED.subtitle}
        </Text>
        <Text
          variant="mono"
          size="xs"
          color="accent"
          weight="font-bold"
          className="mt-2 group-hover:translate-x-1 transition-transform"
        >
          Read Guide →
        </Text>
      </Stack>
    </Stack>
  );
}
