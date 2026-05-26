// impeccable-ignore-file
import { useState } from 'react';
import { ChevronLeft, ChevronRight, MapPin } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { Box, Stack, Text } from '@/layouts/Primitives';
import { getEvents } from '@/lib/content';

export function FeaturedEventGuide() {
  const featured = getEvents().filter((event) => !!event.heroImage);
  const [index, setIndex] = useState(0);
  const event = featured[index];
  if (!event) return null;

  return (
    <Box as="section">
      <Text as="h2" variant="headline" size="2xl" weight="font-black" marginBottom={4}>
        Featured Event Guide
      </Text>

      {/* Editorial card: image-led grid */}
      <Box
        border
        radius="xl"
        overflow="hidden"
        className="grid bg-surface md:grid-cols-[260px_1fr]"
      >
        {/* Image column — full height, strong crop */}
        <Box position="relative" className="min-h-[180px]">
          <img
            src={event.heroImage}
            alt={event.title}
            className="h-full w-full object-cover object-top"
          />
          {/* Subtle gradient at bottom to soften any embedded text */}
          <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/40 to-transparent" aria-hidden="true" />
        </Box>

        {/* Content */}
        <Stack gap={3} padding={6} className="justify-between">
          <Stack gap={2}>
            <Box display="flex" align="center" gap={2}>
              <MapPin className="h-3.5 w-3.5 shrink-0 text-accent" />
              <Text variant="mono" size="xs" color="accent" weight="font-bold" uppercase className="truncate">
                {event.location}
              </Text>
            </Box>
            <Text variant="headline" size="xl" weight="font-black" leading="tight">
              {event.title}
            </Text>
            <Text variant="body" size="sm" color="dim" leading="relaxed" className="line-clamp-3">
              {event.excerpt}
            </Text>
          </Stack>

          <Box display="flex" align="center" justify="between">
            <Text
              as={NavLink}
              to={`/events/${event.slug}`}
              variant="mono"
              size="xs"
              color="accent"
              weight="font-bold"
              className="hover:underline"
            >
              Read the guide →
            </Text>
            {featured.length > 1 && (
              <Box display="flex" gap={2}>
                <Box
                  as="button"
                  onClick={() => setIndex((i) => Math.max(0, i - 1))}
                  padding={1.5}
                  border
                  radius="sm"
                  className="cursor-pointer transition-colors hover:border-accent/50 disabled:opacity-30"
                  disabled={index === 0}
                  aria-label="Previous event"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Box>
                <Box
                  as="button"
                  onClick={() => setIndex((i) => Math.min(featured.length - 1, i + 1))}
                  padding={1.5}
                  border
                  radius="sm"
                  className="cursor-pointer transition-colors hover:border-accent/50 disabled:opacity-30"
                  disabled={index === featured.length - 1}
                  aria-label="Next event"
                >
                  <ChevronRight className="h-4 w-4" />
                </Box>
              </Box>
            )}
          </Box>
        </Stack>
      </Box>
    </Box>
  );
}
