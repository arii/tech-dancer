import { NavLink } from 'react-router-dom';
import { Box, Stack, Text } from '@/layouts/Primitives';
import { ASSET_PREFIX } from '@/config/constants';

const FEATURED = {
  eyebrow: 'FEATURED GUIDE',
  title: 'The WCS Travel Pack',
  subtitle: 'Your checklist for a smoother, better dance weekend.',
  image: '/assets/home/wcs-travel-pack.webp',
  imageAlt: 'Overhead view of a West Coast Swing travel pack containing dance shoes, earplugs, and travel essentials',
  href: '/blog/2026-04-19-gear-essentials',
};

export function FeaturedGuidePanel() {
  return (
    <Box
      as={NavLink}
      to={FEATURED.href}
      display="flex"
      direction="col"
      justify="start"
      position="relative"
      overflow="hidden"
      border
      radius="lg"
      self="stretch"
      className="group"
    >
      {/* Background image — fills the column height naturally */}
      <img
        src={`${ASSET_PREFIX}${FEATURED.image}`}
        alt={FEATURED.imageAlt}
        width={420}
        height={600}
        fetchPriority="high"
        className="absolute inset-0 h-full w-full object-cover object-center opacity-dim transition-opacity duration-500 group-hover:opacity-high"
        aria-hidden="true"
      />
      {/* Gradient overlay for text legibility */}
      <Box
        position="absolute"
        inset
        bgGradient="bg-gradient-to-b from-bg via-bg/70 to-transparent"
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
          marginTop={1}
          uppercase
          className="group-hover:underline"
        >
          Read the guide →
        </Text>
      </Stack>
    </Box>
  );
}
