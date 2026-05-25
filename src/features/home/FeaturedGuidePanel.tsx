// impeccable-ignore-file
import { NavLink } from 'react-router-dom';
import { Box, Stack, Text } from '@/layouts/Primitives';
import { ASSET_PREFIX } from '@/config/constants';

const FEATURED = {
  eyebrow: 'FEATURED GUIDE',
  title: 'The WCS Travel Pack',
  subtitle: 'Your checklist for a smoother, better dance weekend.',
  image: '/assets/events/jjo-hero.jpg',
  href: '/blog/2026-04-19-gear-essentials',
};

export function FeaturedGuidePanel() {
  return (
    <Box as={NavLink} to={FEATURED.href} display="flex" direction="col" justify="end" padding={8} position="relative" overflow="hidden" className="group hidden border-l border-line bg-surface-alt lg:flex">
      <Box position="absolute" inset className="bg-cover bg-center opacity-25 transition-opacity duration-500 group-hover:opacity-35" style={{ backgroundImage: `url(${ASSET_PREFIX}${FEATURED.image})` }} aria-hidden="true" />
      <Box position="absolute" inset className="bg-gradient-to-t from-bg via-bg/70 to-transparent" aria-hidden="true" />
      <Stack gap={3} position="relative" zIndex={10}>
        <Text variant="mono" size="xs" color="accent" weight="font-black" uppercase tracking="widest">{FEATURED.eyebrow}</Text>
        <Text variant="headline" size="2xl" weight="font-black" color="main" leading="tight">{FEATURED.title}</Text>
        <Text variant="body" size="sm" color="dim">{FEATURED.subtitle}</Text>
        <Text variant="mono" size="xs" color="accent" weight="font-bold" marginTop={2} className="group-hover:underline">Read the guide →</Text>
      </Stack>
    </Box>
  );
}
