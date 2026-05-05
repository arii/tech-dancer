import { useState } from 'react';
import { Box, Stack, Text, Grid } from '@/layouts/Primitives';
import { Star, Music, MapPin, X } from 'lucide-react';
import { ProfileCard, ProfileItem, ProfileGalleryImage, ProfileLink } from '../types';
import { motion, AnimatePresence } from 'motion/react';

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
    <Stack gap={4}>
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
    <Grid cols={{ base: 1, md: 3 }} gap={4}>
      {items.map((item, index) => {
        const Icon = item.icon ? IconMap[item.icon] : null;
        return (
          <Box key={index} padding={6} border radius="xl" className="bg-surface/20 border-line/5">
            <Stack gap={3}>
              {Icon && <Icon className="w-4 h-4 text-accent" />}
              {item.title && (
                <Text as="h3" variant="mono" size="micro" color="brand" weight="font-black" className="uppercase tracking-widest">
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
 * Renders a responsive photo gallery grid with a simple lightbox.
 */
export function ProfileGallery({ images }: { images: ProfileGalleryImage[] }) {
  const [selectedImage, setSelectedImage] = useState<ProfileGalleryImage | null>(null);

  return (
    <>
      <Grid cols={{ base: 1, sm: 2, md: 3 }} gap={4}>
        {images.map((image, index) => (
          <Box
            key={index}
            aspect="1/1"
            overflow="hidden"
            border
            radius="xl"
            cursor="pointer"
            className="border-line/10 bg-surface/30 group"
            onClick={() => setSelectedImage(image)}
          >
            <img
              src={image.src}
              alt={image.alt}
              loading="lazy"
              width={600}
              height={600}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
          </Box>
        ))}
      </Grid>

      <AnimatePresence>
        {selectedImage && (
          <Box
            as={motion.div}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            position="fixed"
            inset
            zIndex="modal"
            display="flex"
            align="center"
            justify="center"
            padding={4}
            className="bg-black/90 backdrop-blur-sm"
            onClick={() => setSelectedImage(null)}
          >
            <Box
              as={motion.div}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              maxWidth="4xl"
              width="full"
              maxHeight="[90vh]"
              radius="xl"
              overflow="hidden"
              className="relative"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedImage.src}
                alt={selectedImage.alt}
                className="w-full h-full object-contain"
                loading="lazy"
              />
              <Box
                position="absolute"
                top={4}
                right={4}
                padding={2}
                as="button"
                onClick={() => setSelectedImage(null)}
                className="bg-black/50 hover:bg-black/70 text-white rounded-full transition-colors"
                aria-label="Close Lightbox"
              >
                <X className="w-6 h-6" />
              </Box>
            </Box>
          </Box>
        )}
      </AnimatePresence>
    </>
  );
}

/**
 * Renders a collection of pill-style external links.
 */
export function ProfileLinks({ links }: { links: ProfileLink[] }) {
  return (
    <Box display="flex" gap={3} wrap>
      {links.map((link) => (
        <Box
          key={link.label}
          as="a"
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Visit ${link.label}`}
          paddingX={4}
          paddingY={2}
          border
          radius="full"
          className="hover:border-accent hover:bg-accent/5 interactive-press focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent transition-all group"
        >
          <Text variant="mono" size="xs" weight="font-bold" className="group-hover:text-accent">
            {link.label}
          </Text>
        </Box>
      ))}
    </Box>
  );
}
