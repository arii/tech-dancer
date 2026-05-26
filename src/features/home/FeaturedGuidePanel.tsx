// impeccable-ignore-file
import { NavLink } from 'react-router-dom';
import { Box, Stack, Text } from '@/layouts/Primitives';
import { ASSET_PREFIX } from '@/config/constants';

const FEATURED = {
  eyebrow: 'FEATURED GUIDE',
  title: 'The WCS Travel Pack',
  subtitle: 'Your checklist for a smoother, better dance weekend.',
  image: '/assets/home/wcs-travel-pack.jpg',
  href: '/gear',
};

export function FeaturedGuidePanel() {
  return (
    <Box
      as={NavLink}
      to={FEATURED.href}
      display={{ base: 'none', lg: 'flex' }}
      direction="col"
      justify="end"
      padding={8}
      position="relative"
      overflow="hidden"
      border
      surface="alt"
      radius="lg"
      className="group min-h-[380px]"
    >
      {/* Background image */}
      <Box
        position="absolute"
        inset
        className="bg-cover bg-center object-center opacity-30 transition-opacity duration-500 group-hover:opacity-45"
        style={{ backgroundImage: `url(${ASSET_PREFIX}${FEATURED.image})` }}
        aria-hidden="true"
      />
      {/* Gradient overlay for text legibility */}
      <Box
        position="absolute"
        inset
        className="bg-gradient-to-t from-bg via-bg/80 to-transparent"
        aria-hidden="true"
      />
      <Stack gap={3} position="relative" zIndex={10}>
        <Text variant="mono" size="xs" color="accent" weight="font-black" uppercase tracking="widest">
          {FEATURED.eyebrow}
        </Text>
        <Text variant="headline" size="2xl" weight="font-black" color="main" leading="tight">
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
          className="mt-2 group-hover:underline"
        >
          Read the guide →
        </Text>
      </Stack>
    </Box>
  );
}
