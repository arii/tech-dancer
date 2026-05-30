// impeccable-ignore-file
import { NavLink } from 'react-router-dom';
import { Box, Stack, Text } from '@/layouts/Primitives';
import { ASSET_PREFIX } from '@/config/constants';

const FEATURED = {
  eyebrow: 'FEATURED GUIDE',
  title: 'The WCS Travel Pack',
  subtitle: 'Your checklist for a smoother, better dance weekend.',
  image: '/assets/home/wcs-travel-pack.webp',
  href: '/blog/2026-04-19-wcs-travel-pack',
};

export function FeaturedGuidePanel() {
  return (
    <Box
      as={NavLink}
      to={FEATURED.href}
      display={{ base: 'none', lg: 'flex' }}
      direction="col"
      justify="end"
      position="relative"
      overflow="hidden"
      border
      radius="lg"
      className="group self-stretch"
    >
      {/* Background image — fills the column height naturally */}
      <img
        src={`${ASSET_PREFIX}${FEATURED.image}`}
        alt={FEATURED.title}
        width={420}
        height={600}
        fetchPriority="high"
        className="absolute inset-0 h-full w-full object-cover object-center opacity-60 transition-opacity duration-500 group-hover:opacity-70"
        aria-hidden="true"
      />
      {/* Gradient overlay for text legibility */}
      <Box
        position="absolute"
        inset
        className="bg-gradient-to-b from-bg via-bg/70 to-transparent"
        aria-hidden="true"
      />
      {/* Content pinned to bottom */}
      <Stack gap={2} position="relative" zIndex={10} padding={6}>
        <Text variant="mono" size="xs" color="accent" weight="font-black" uppercase tracking="widest">
          {FEATURED.eyebrow}
        </Text>
        <Text variant="headline" size="xl" weight="font-black" color="main" leading="tight">
          {FEATURED.title}
        </Text>
        <Text variant="body" size="sm" color="dim">
          {FEATURED.subtitle}
        </Text>
        <Text
          variant="mono"
          size="xs"
          color="accent"
          weight="font-bold"
          className="mt-1 group-hover:underline"
        >
          Read the guide →
        </Text>
      </Stack>
    </Box>
  );
}
