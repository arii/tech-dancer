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
      aspect={{ base: '4/3', lg: 'auto' }}
      direction="col"
      justify="end"
      position="relative"
      overflow="hidden"
      border
      radius="md"
      className="group self-stretch"
    >
      {/* Background image — fills the column height naturally */}
      <img
        src={`${ASSET_PREFIX}${FEATURED.image}`}

        alt={FEATURED.imageAlt}
        width={420}
        height={600}
        fetchPriority="high"
        className="absolute inset-0 h-full w-full object-cover object-center opacity-dim transition-opacity motion-reduce:transition-none duration-500 group-hover:opacity-high"
        aria-hidden="true"
      />
      {/* Gradient overlay for text legibility (bottom-up to protect bottom-aligned text) */}
      <Box
        position="absolute"
        inset
        className="bg-gradient-to-t from-bg/95 via-bg/70 to-bg/30"
        aria-hidden="true"
      />
      {/* Content pinned to bottom */}
      <Stack gap={2} position="relative" zIndex={10} padding={6} width="full">
        <Text variant="mono" size="xs" color="accent" weight="font-black" uppercase tracking="widest">
          {FEATURED.eyebrow}
        </Text>
        <Text variant="headline" size={{ base: '2xl', md: 'xl' }} weight="font-black" color="main" leading="tight">
          {FEATURED.title}
        </Text>
        <Text variant="body" size={{ base: 'base', md: 'sm' }} color="body">
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
    </Stack>
  );
}
