// impeccable-ignore-file
import { useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, MapPin } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { Box, Stack, Text } from '@/layouts/Primitives';
import { getEvents } from '@/lib/content';

const SWIPE_CLICK_CANCEL_THRESHOLD = 5;
const SWIPE_NAV_THRESHOLD = 48;

export function FeaturedEventGuide() {
  const featured = getEvents().filter((event) => !!event.heroImage);
  const [index, setIndex] = useState(0);

  const pointerStartX = useRef(0);
  const pointerStartY = useRef(0);
  const hasSwiped = useRef(false);

  const goPrev = () => setIndex((i) => Math.max(0, i - 1));
  const goNext = () => setIndex((i) => Math.min(featured.length - 1, i + 1));

  const handlePointerDown = (e: React.PointerEvent) => {
    hasSwiped.current = false;
    if (e.pointerType !== 'touch') return;
    pointerStartX.current = e.clientX;
    pointerStartY.current = e.clientY;
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (e.pointerType !== 'touch') return;
    const deltaX = Math.abs(e.clientX - pointerStartX.current);
    const deltaY = Math.abs(e.clientY - pointerStartY.current);

    // Any movement beyond threshold (horizontal or vertical) suppresses subsequent click
    if (deltaX > SWIPE_CLICK_CANCEL_THRESHOLD || deltaY > SWIPE_CLICK_CANCEL_THRESHOLD) {
      hasSwiped.current = true;
    }
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (e.pointerType !== 'touch') return;
    const deltaX = e.clientX - pointerStartX.current;
    const deltaY = e.clientY - pointerStartY.current;

    if (Math.abs(deltaX) > SWIPE_NAV_THRESHOLD && Math.abs(deltaX) > Math.abs(deltaY)) {
      if (deltaX < 0) goNext();
      else goPrev();
      // Keep hasSwiped true to suppress click
      hasSwiped.current = true;
    }
  };

  const handlePointerCancel = () => {
    hasSwiped.current = false;
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') goPrev();
    if (e.key === 'ArrowRight') goNext();
  };

  const handleCardClick = (e: React.MouseEvent) => {
    if (hasSwiped.current) {
      e.preventDefault();
      e.stopPropagation();
      hasSwiped.current = false;
    }
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
        as="article"
        border
        radius="xl"
        overflow="hidden"
        className="relative z-10 grid w-full max-w-full min-w-0 bg-surface touch-pan-y overscroll-x-contain select-none md:grid-cols-[260px_1fr] md:min-h-[200px]"
        aria-roledescription="carousel"
        aria-label="Featured event guides"
        data-gesture-handled="true"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerCancel}
        onTouchStart={(e: React.TouchEvent) => e.stopPropagation()}
        onTouchEnd={(e: React.TouchEvent) => e.stopPropagation()}
        onClickCapture={handleCardClick}
        onKeyDown={handleKeyDown}
        tabIndex={0}
      >
        {/* Image column — full height, strong crop */}
        <Box position="relative" className="h-44 min-w-0 md:h-full">
          <img
            src={event.heroImage}
            alt={event.title}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover object-top"
          />
          {/* Subtle gradient at bottom to soften any embedded text */}
          <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/40 to-transparent" aria-hidden="true" />
        </Box>

        {/* Content */}
        <Stack gap={3} padding={6} className="min-w-0 justify-between" aria-live="polite">
          <Stack gap={1.5}>
            <Box display="flex" align="start" gap={2}>
              <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent" />
              <Text variant="mono" size="xs" color="accent" weight="font-bold" uppercase className="block max-w-full leading-normal">
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
                  className="cursor-pointer transition-colors hover:border-accent/50 disabled:opacity-medium"
                  disabled={index === 0}
                  aria-label="Previous featured event guide"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Box>
                <Box
                  as="button"
                  onClick={goNext}
                  padding={1.5}
                  border
                  radius="sm"
                  className="cursor-pointer transition-colors hover:border-accent/50 disabled:opacity-medium"
                  disabled={index === featured.length - 1}
                  aria-label="Next featured event guide"
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
