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
    <Box
      as={NavLink}
      to={FEATURED.href}
      width="full"
      display="flex"
      direction="col"
      position="relative"
      className="group self-stretch"
    >
      {/* Mobile: Title and Eyebrow ABOVE Image */}
      <Stack gap={2} paddingBottom={4} display={{ base: 'flex', lg: 'none' }}>
        <Text variant="mono" size="xs" color="accent" weight="font-black" uppercase tracking="widest">
          {FEATURED.eyebrow}
        </Text>
        <Text variant="headline" size="2xl" weight="font-black" color="main" leading="tight">
          {FEATURED.title}
        </Text>
      </Stack>

      <Box
        width="full"
        aspect={{ base: '4/3', lg: 'auto' }}
        position="relative"
        overflow="hidden"
        border
        radius="md"
        flex={1}
        display="flex"
        direction="col"
        justify="end"
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
        {/* Gradient overlay - Desktop only for editorial look */}
        <Box
          position="absolute"
          inset
          display={{ base: 'none', lg: 'block' }}
          className="bg-gradient-to-t from-bg/95 via-bg/70 to-bg/30"
          aria-hidden="true"
        />

        {/* Desktop Editorial Content (Overlay) */}
        <Stack gap={2} position="relative" zIndex={10} padding={6} width="full" display={{ base: 'none', lg: 'flex' }}>
          <Text variant="mono" size="xs" color="accent" weight="font-black" uppercase tracking="widest">
            {FEATURED.eyebrow}
          </Text>
          <Text variant="headline" size="xl" weight="font-black" color="main" leading="tight">
            {FEATURED.title}
          </Text>
          <Text variant="body" size="sm" color="body">
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

      {/* Mobile: Description and CTA BELOW Image */}
      <Stack gap={2} paddingTop={4} display={{ base: 'flex', lg: 'none' }}>
        <Text variant="body" size="base" color="body">
          {FEATURED.subtitle}
        </Text>
        <Text
          variant="mono"
          size="xs"
          color="accent"
          weight="font-bold"
          className="group-hover:underline"
        >
          Read the guide →
        </Text>
      </Stack>
    </Box>
  );
}
