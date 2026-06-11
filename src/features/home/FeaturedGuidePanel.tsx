import { NavLink } from 'react-router-dom';
import { Box, Stack, Text } from '@/layouts/Primitives';
import { ASSET_PREFIX } from '@/config/constants';
import { OptimizedImage } from '@/components/ui/OptimizedImage';

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
      <OptimizedImage
        src={`${ASSET_PREFIX}${FEATURED.image}`}
        alt={FEATURED.imageAlt}
        width={420}
        height={600}
        sizes="(max-width: 1024px) 100vw, 420px" // impeccable-ignore
        fetchPriority="high"
        loading="eager"
        position="absolute"
        inset
        className="opacity-dim transition-opacity duration-500 group-hover:opacity-high"
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
        <Box marginTop={1}>
          <Text
            variant="mono"
            size="xs"
            color="accent"
            weight="font-bold"
            className="group-hover:underline"
          >
            Read the guide →
          </Text>
        </Box>
      </Stack>
    </Box>
  );
}
