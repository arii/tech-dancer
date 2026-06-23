import { useState } from 'react';
import { motion } from 'motion/react';
import { Box, Stack, Text, Grid } from '@/layouts/Primitives';
import { Star, Music, MapPin, Terminal, Zap, Globe } from 'lucide-react';
import { motionTokens } from '@/styles/motion';
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
      {cards.map((card, index) => {
        const Icon = card.icon ? IconMap[card.icon] : null;
        return (
          <Box
            key={index}
            as={motion.div}
            padding={8}
            border
            radius="lg"
            surface="alt"
            cursor="pointer"
            whileHover={{ ...motionTokens.hover, scale: 1.01, borderColor: "var(--raw-color-accent)" }}
            whileTap={{ scale: 0.98 }}
            className="group transition-colors duration-200"
          >
            <Stack direction={{ base: "col", sm: "row" }} gap={{ base: 4, sm: 8 }} align="start">
              {Icon && (
                <Box
                  width={12}
                  height={12}
                  radius="lg"
                  border
                  display="flex"
                  align="center"
                  justify="center"
                  surface="accent"
                  shadow="sm"
                  shrink={0}
                >
                  <Icon size={24} color="var(--raw-color-accent)" />
                </Box>
              )}
              <Stack gap={2} flex={1} align="start">
                <Text
                  as="h3"
                  variant="headline"
                  size="lg"
                  weight="font-bold"
                  color="main"
                  leading="tight"
                  hoverColor="accent"
                >
                  {card.title}
                </Text>
                <Text
                  variant="body"
                  size="base"
                  color="dim"
                  opacityVariant="solid"
                  leading="relaxed"
                  textAlign="left"
                >
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
          <Box key={index} padding={6} border radius="lg" surface="alt">
            <Stack gap={3}>
              {Icon && <Icon size={16} color="var(--raw-color-accent)" />}
              {item.title && (
                <Text as="h3" variant="mono" size="micro" color="brand" weight="font-bold" uppercase tracking="widest">
                  {item.title}
                </Text>
              )}
              <Text variant="body" size="xs" color="dim" leading="normal">
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
            radius="lg"
            surface="alt"
            borderColor="line/10"
            cursor="pointer"
            className="group focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none"
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
          surface="contrast"
          opacity={0.9}
          cursor="pointer"
          align="center"
          justify="center"
          onClick={() => setSelectedImage(null)}
        >
          <Box maxWidth="full" padding={4} height="full" display="flex" align="center" justify="center" pointerEvents="none">
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
      {links.map((link) => (
        <Box
          key={link.label}
          as={motion.a}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          display="inline-flex"
          align="center"
          paddingX={4}
          paddingY={3}
          minHeight={11}
          border
          radius="full"
          cursor="pointer"
          whileHover={{ ...motionTokens.hover, backgroundColor: "var(--raw-color-surface-alt)", borderColor: "var(--raw-color-accent)" }}
          whileTap={{ scale: 0.98 }}
          className="group transition-all focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg focus-visible:outline-none"
        >
          <Text variant="mono" size="xs" weight="font-bold" hoverColor="accent">
            {link.label}
          </Text>
        </Box>
      ))}
    </Box>
  );
}
