// impeccable-ignore-file
https://github.com/arii/tech-dancer/pull/1605/conflict?name=src%252Ffeatures%252Fhome%252FFeaturedEventGuide.tsx&ancestor_oid=c23243dfc3a5a8f7a168521e42731fbccd8c15e5&base_oid=7e257a4b86a1c5c16179f08b6a64d4791b391bc5&head_oid=e35773ce6be293d64ca2caf4e694ae388c345779import { useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, MapPin } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { Box, Stack, Text } from '@/layouts/Primitives';
import { getEvents } from '@/lib/content';

export function FeaturedEventGuide() {
  const featured = getEvents().filter((event) => !!event.heroImage);
  const [index, setIndex] = useState(0);

  const touchStartX = useRef<number | null>(null);

  const goPrev = () => setIndex((i) => Math.max(0, i - 1));
  const goNext = () => setIndex((i) => Math.min(featured.length - 1, i + 1));

  const handleTouchStart = (event: React.TouchEvent) => {
    touchStartX.current = event.changedTouches[0]?.clientX ?? null;
  };

  const handleTouchEnd = (event: React.TouchEvent) => {
    const startX = touchStartX.current;
    const endX = event.changedTouches[0]?.clientX;
    touchStartX.current = null;
    if (startX == null || endX == null) return;

    const deltaX = endX - startX;
    const swipeThreshold = 40;

    if (deltaX <= -swipeThreshold) goNext();
    if (deltaX >= swipeThreshold) goPrev();
  };

  const event = featured[index];
  if (!event) return null;

  return (
    <Box as="section" className="w-full max-w-full min-w-0">
      <Text as="h2" variant="headline" size="2xl" weight="font-black" marginBottom={4}>
        Featured Event Guide
      </Text>

      {/* Editorial card: image-led grid */}
      <Box
        border
        radius="xl"
        overflow="hidden"
        className="grid w-full max-w-full min-w-0 bg-surface touch-pan-y md:grid-cols-[260px_1fr] md:h-[200px]"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Image column — full height, strong crop */}
        <Box position="relative" className="h-44 min-w-0 md:h-full">
          <img
            src={event.heroImage}
            alt={event.title}
            className="h-full w-full object-cover object-top"
          />
          {/* Subtle gradient at bottom to soften any embedded text */}
          <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/40 to-transparent" aria-hidden="true" />
        </Box>

        {/* Content */}
        <Stack gap={3} padding={6} className="min-w-0 justify-between">
          <Stack gap={1.5}>
            <Box display="flex" align="center" gap={2}>
              <MapPin className="h-3.5 w-3.5 shrink-0 text-accent" />
              <Text variant="mono" size="xs" color="accent" weight="font-bold" uppercase className="block max-w-full truncate">
                {event.location}
              </Text>
            </Box>
            <Text variant="headline" size="xl" weight="font-black" leading="tight">
              {event.title}
            </Text>
            <Text variant="body" size="sm" color="dim" leading="relaxed" className="line-clamp-2">
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
                  onClick={goPrev}
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
                  onClick={goNext}
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
