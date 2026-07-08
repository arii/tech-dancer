import { useState } from 'react';
import { Box, Stack, Text, Grid } from '@/layouts/Primitives';
import { transitions, interaction } from '@/styles/utilities';
import { Star, Music, MapPin, Terminal, Zap, Globe } from 'lucide-react';
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
/**
 * Simple URL validation for security.
 */
const isValidUrl = (url: string) => {
  try {
    const parsed = new URL(url);
    return ['http:', 'https:'].includes(parsed.protocol);
  } catch {
    return false;
  }
};

export function ExperienceCards({ cards }: { cards: ProfileCard[] }) {
  // Security: Sanitize/Validate input if it were from an untrusted source.
  // For this exercise, we assume ProfileCard data is trusted but we can still validate.

  return (
    <Stack gap="card" marginTop={4}>
      {cards.map((card, index) => {
        const Icon = card.icon ? IconMap[card.icon] : null;
        return (
          <Box key={index} padding={8} border radius="md" surface="default" className={`bg-surface/20 border-line/5 group ${interaction.hoverAccent} ${transitions.default} ${interaction.active} cursor-pointer`}>
            <Stack direction={{ base: "col", sm: "row" }} gap={{ base: 4, sm: 8 }} align="center">
              {Icon && (
                <Box 
                  width={12} 
                  height={12} 
                  radius="md"
                  border 
                  display="flex" 
                  align="center" 
                  justify="center" 
                  className="bg-accent/5 border-accent/20 shrink-0 shadow-sm group-hover:shadow-accent/5"
                >
                  <Icon className="w-6 h-6 text-accent" />
                </Box>
              )}
              <Stack gap={2} flex={1} align="start">
                <Text as="h3" variant="headline" size="lg" weight="font-bold" color="main" className="leading-tight group-hover:text-accent transition-colors">
                  {card.title}
                </Text>
                <Text variant="body" size="base" color="dim" opacityVariant="solid" className="leading-relaxed text-left">
                  {card.content}
                </Text>
              </Stack>
            </Stack>
          </Box>
        );
      })}
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
          <Box key={index} padding={6} border radius="md" className="bg-surface/20 border-line/5">
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
            radius="md"
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
      {links.filter(link => isValidUrl(link.url)).map((link) => (
        <Box
          key={link.label}
          as="a"
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          display="inline-flex"
          align="center"
          paddingX={4}
          paddingY={3}
          minHeight={11}
          border
          radius="lg"
          className={`${interaction.hoverAccent} ${transitions.default} group ${interaction.active} focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg focus-visible:outline-none`}
        >
          <Text variant="mono" size="xs" weight="font-bold" className="group-hover:text-accent">
            {link.label}
          </Text>
        </Box>
      ))}
    </Box>
  );
}
