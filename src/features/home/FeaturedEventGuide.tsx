import { useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, MapPin } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { Box, Stack, Text, Grid } from '@/layouts/Primitives';
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
    <Box as="section" width="full" maxWidth="full" minWidth={0}>
      <Stack
        direction={{ base: 'col', sm: 'row' }}
        align={{ base: 'start', sm: 'baseline' }}
        justify="between"
        gap={2}
        marginBottom={4}
      >
        <Text as="h2" variant="headline" size="2xl" weight="font-black">
          Featured Insight
        </Text>
        <Text
          as={NavLink}
          to="/events"
          variant="mono"
          size="xs"
          color="accent"
          weight="font-bold"
          paddingY={{ base: 4, sm: 0 }}
          paddingX={{ base: 4, sm: 0 }}
          className="shrink-0 hover:underline"
        >
          See all events →
        </Text>
      </Stack>

      {/* Editorial card: image-led grid */}
      <Grid
        as="article"
        border
        radius="xl"
        overflow="hidden"
        position="relative"
        zIndex={10}
        width="full"
        maxWidth="full"
        minWidth={0}
        cols={{ base: 1, md: 12 }}
        className="bg-surface touch-pan-y overscroll-x-contain select-none md:min-h-52"
        aria-roledescription="carousel"
        aria-label="Featured insights"
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
        {/* Image column — fluid 12-column grid system (3/12 = 25%) */}
        <Box
          position="relative"
          height={{ base: 44, md: "full" }}
          minWidth={0}
          span={{ base: "full", md: 3 }}
        >
          <img
            src={event.heroImage}
            alt={event.imageAlt || `Screenshot of the ${event.title} insight`}
            fetchPriority="high"
            decoding="async"
            className="h-full w-full object-cover object-top"
          />
          {/* Subtle gradient at bottom to soften any embedded text */}
          <Box
            position="absolute"
            inset="bottom"
            height={16}
            className="inset-x-0 bg-gradient-to-t from-black/40 to-transparent"
            aria-hidden="true"
          />
        </Box>

        {/* Content */}
        <Stack
          gap={3}
          padding={6}
          minWidth={0}
          justify="between"
          aria-live="polite"
          span={{ base: "full", md: 9 }}
        >
          <Stack gap={1.5}>
            <Box display="flex" align="start" gap={2}>
              <Box marginTop={0.5} className="shrink-0">
                <MapPin className="h-3.5 w-3.5 text-accent" />
              </Box>
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
              paddingY={{ base: 4, md: 0 }}
              paddingX={{ base: 4, md: 0 }}
              className="hover:underline"
            >
              Read the insight →
            </Text>
            {featured.length > 1 && (
              <Box display="flex" gap={2}>
                <Box
                  as="button"
                  onClick={goPrev}
                  padding={{ base: 4, md: 1.5 }}
                  border
                  radius="sm"
                  className="cursor-pointer transition-colors hover:border-accent/50 disabled:opacity-medium"
                  disabled={index === 0}
                  aria-label="Previous featured insight"
                >
                  <ChevronLeft className="h-5 w-5 md:h-4 md:w-4" />
                </Box>
                <Box
                  as="button"
                  onClick={goNext}
                  padding={{ base: 4, md: 1.5 }}
                  border
                  radius="sm"
                  className="cursor-pointer transition-colors hover:border-accent/50 disabled:opacity-medium"
                  disabled={index === featured.length - 1}
                  aria-label="Next featured insight"
                >
                  <ChevronRight className="h-5 w-5 md:h-4 md:w-4" />
                </Box>
              </Box>
            )}
          </Box>
        </Stack>
      </Grid>
    </Box>
  );
}
