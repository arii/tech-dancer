import { useState } from 'react';
import { Box, Stack, Text, Grid } from '@/layouts/Primitives';
import { Star, Music, MapPin, Terminal, Zap, Globe } from 'lucide-react';
import { InfoCard, InfoFeature, InfoPill } from '@/components/ui/InfoList';
import { ProfileCard, ProfileItem, ProfileGalleryImage, ProfileLink } from '../types';

/**
 * IconMap centralizes Lucide icon mapping for the profile feature.
 * To add a new icon:
 * 1. Import the icon from 'lucide-react'
 * 2. Add it to this map with a unique key
 * 3. Use the key in the ProfileItem data
 */
export const IconMap: Record<string, React.ElementType> = {
  star: Star,
  music: Music,
  'map-pin': MapPin,
  terminal: Terminal,
  zap: Zap,
  globe: Globe,
};

/**
 * Renders a list of professional experience cards.
 * Adheres to 'no-card' principles by using minimal borders and surface density.
 */
export function ExperienceCards({ cards }: { cards: ProfileCard[] }) {
  return (
    <Stack gap={6} marginTop={4}>
      {cards.map((card, index) => (
        <InfoFeature
          key={card.id ?? index}
          icon={card.icon ? IconMap[card.icon] : undefined}
          title={card.title}
          description={card.content}
          href={card.href}
        />
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
      {items.map((item, index) => (
        <InfoCard
          key={item.id ?? index}
          icon={item.icon ? IconMap[item.icon] : undefined}
          title={item.title}
          description={item.description}
        />
      ))}
    </Grid>
  );
}

/**
 * Renders a responsive photo gallery grid.
 */
export function ProfileGallery({ images }: { images: ProfileGalleryImage[] }) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <>
      <Grid cols={{ base: 1, sm: 2, md: 3 }} gap={4} marginTop={6}>
        {images.map((image, index) => (
          <Box
            key={index}
            as="button"
            aspect="square"
            overflow="hidden"
            border
            radius="lg"
            className="border-line/10 bg-surface/30 group cursor-pointer focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none"
            onClick={() => setSelectedImage(image.src)}
            aria-label={`View ${image.alt}`}
          >
            <img
              src={image.src}
              alt={image.alt}
              width={800}
              height={800}
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
          </Box>
        ))}
      </Grid>

      {selectedImage && (
        <Stack
          position="fixed"
          inset={0}
          zIndex="modal"
          className="bg-black/90 cursor-pointer"
          align="center"
          justify="center"
          onClick={() => setSelectedImage(null)}
        >
          <Box maxWidth="full" padding={4} height="full" display="flex" align="center" justify="center">
            <img
              src={selectedImage}
              alt="Expanded view"
              className="max-w-full max-h-full object-contain"
            />
          </Box>
        </Stack>
      )}
    </>
  );
}

/**
 * Renders a collection of pill-style external links.
 */
export function ProfileLinks({ links }: { links: ProfileLink[] }) {
  return (
    <Box display="flex" gap={3} wrap marginTop={4}>
      {links.map((link, index) => (
        <InfoPill
          key={index}
          label={link.label}
          href={link.url}
        />
      ))}
    </Box>
  );
}
