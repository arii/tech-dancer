import { Box, Stack, Text, Grid } from '@/layouts/Primitives';
import { Star, Music, MapPin } from 'lucide-react';
import { ProfileCard, ProfileItem, ProfileGalleryImage, ProfileLink } from '../types';

/**
 * IconMap centralizes Lucide icon mapping for the profile feature.
 * To add a new icon:
 * 1. Import the icon from 'lucide-react'
 * 2. Add it to this map with a unique key
 * 3. Use the key in the ProfileItem data
 */
export const IconMap = {
  star: Star,
  music: Music,
  'map-pin': MapPin,
};

/**
 * Renders a list of professional experience cards.
 * Adheres to 'no-card' principles by using minimal borders and surface density.
 */
export function ExperienceCards({ cards }: { cards: ProfileCard[] }) {
  return (
    <Stack gap={4} marginTop={2}>
      {cards.map((card, index) => (
        <Box key={index} padding={6} border radius="xl" className="bg-surface/20 border-line/5">
          <Text as="h3" variant="mono" size="xs" color="brand" weight="font-bold" marginBottom={2} className="uppercase tracking-widest">
            {card.title}
          </Text>
          <Text variant="body" size="sm" color="body" className="leading-relaxed">
            {card.content}
          </Text>
        </Box>
      ))}
    </Stack>
  );
}

/**
 * Renders a grid of icon-based interest or focus items.
 */
export function ProfileItems({ items }: { items: ProfileItem[] }) {
  return (
    <Grid cols={{ base: 1, md: 3 }} gap={4} marginTop={2}>
      {items.map((item, index) => {
        const Icon = item.icon ? IconMap[item.icon] : null;
        return (
          <Box key={index} padding={6} border radius="xl" className="bg-surface/20 border-line/5">
            <Stack gap={3}>
              {Icon && <Icon className="w-4 h-4 text-accent" />}
              {item.title && (
                <Text as="h3" variant="mono" size="micro" color="brand" weight="font-bold" className="uppercase tracking-widest">
                  {item.title}
                </Text>
              )}
              <Text variant="body" size="xs" color="dim" className="leading-normal">
                {item.description}
              </Text>
            </Stack>
          </Box>
        );
      })}
    </Grid>
  );
}

/**
 * Renders a responsive photo gallery grid.
 */
export function ProfileGallery({ images }: { images: ProfileGalleryImage[] }) {
  return (
    <Grid cols={{ base: 1, sm: 2, md: 3 }} gap={4} marginTop={6}>
      {images.map((image, index) => (
        <Box
          key={index}
          aspect="4/5"
          overflow="hidden"
          border
          radius="xl"
          className="border-line/10 bg-surface/30 group"
        >
          <img
            src={image.src}
            alt={image.alt}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </Box>
      ))}
    </Grid>
  );
}

/**
 * Renders a collection of pill-style external links.
 */
export function ProfileLinks({ links }: { links: ProfileLink[] }) {
  return (
    <Box display="flex" gap={3} wrap marginTop={4}>
      {links.map((link) => (
        <Box
          key={link.label}
          as="a"
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          paddingX={4}
          paddingY={2}
          border
          radius="full"
          className="hover:border-accent hover:bg-accent/5 transition-all group"
        >
          <Text variant="mono" size="xs" weight="font-bold" className="group-hover:text-accent">
            {link.label}
          </Text>
        </Box>
      ))}
    </Box>
  );
}
