import { Box, Stack, Text, Grid } from '@/layouts/Primitives';
import { Star, Music, MapPin } from 'lucide-react';
import { ProfileCard, ProfileItem, ProfileGalleryImage } from '../types';

export const IconMap = {
  star: Star,
  music: Music,
  'map-pin': MapPin,
};

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
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </Box>
      ))}
    </Grid>
  );
}
