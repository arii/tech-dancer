
import { useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, MapPin } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { Box, Stack, Text } from '@/layouts/Primitives';
import { Icon } from '@/components/ui/Icon';
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
      <Text as="h2" variant="headline" size="2xl" weight="font-black" marginBottom={4}>
        Featured Event Guide
      </Text>

      {/* Editorial card: image-led grid */}
      <Box
        as="article"
        border
        radius="xl"
        overflow="hidden"
        position="relative"
        zIndex={10}
        display="grid"
        width="full"
        maxWidth="full"
        minWidth={0}
        surface="default"
        className="touch-pan-y overscroll-x-contain select-none"
        style={{ // impeccable-ignore - Grid configuration with arbitrary values for bespoke editorial layout.
          display: 'grid',
          gridTemplateColumns: window.innerWidth >= 768 ? '16.25rem 1fr' : '1fr',
          minHeight: window.innerWidth >= 768 ? '12.5rem' : 'auto'
        } as React.CSSProperties}
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
        <Box position="relative" height={{ base: 44, md: 'full' }} minWidth={0}>
          <img
            src={event.heroImage}
            alt={event.title}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover object-top"
          />
          {/* Subtle gradient at bottom to soften any embedded text */}
          <Box
            position="absolute"
            inset="x"
            bottom={0}
            height={16}
            className="bg-gradient-to-t from-black/40 to-transparent"
            aria-hidden="true"
          />
        </Box>

        {/* Content */}
        <Stack gap={3} padding={6} minWidth={0} justify="between" aria-live="polite">
          <Stack gap={1.5}>
            <Box display="flex" align="start" gap={2}>
              <Box as={MapPin} marginTop={0.5} shrink={0} width={3.5} height={3.5} color="accent" />
              <Text variant="mono" size="xs" color="accent" weight="font-bold" uppercase width="full" maxWidth="full" display="block" leading="normal">
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
              paddingY={{ base: 4, md: 2 }}
              paddingRight={4}
              marginLeft={-1}
              className="hover:underline"
            >
              Read the guide →
            </Text>
            {featured.length > 1 && (
              <Box display="flex" gap={2}>
                <Box
                  as="button"
                  onClick={goPrev}
                  padding={{ base: 4, md: 1.5 }}
                  border
                  radius="sm"
                  cursor="pointer"
                  opacity={index === 0 ? 0.3 : 1}
                  className="transition-colors hover:border-accent/50"
                  disabled={index === 0}
                  aria-label="Previous featured event guide"
                >
          <Icon icon={ChevronLeft} size="sm" />
                </Box>
                <Box
                  as="button"
                  onClick={goNext}
                  padding={{ base: 4, md: 1.5 }}
                  border
                  radius="sm"
                  cursor="pointer"
                  opacity={index === featured.length - 1 ? 0.3 : 1}
                  className="transition-colors hover:border-accent/50"
                  disabled={index === featured.length - 1}
                  aria-label="Next featured event guide"
                >
          <Icon icon={ChevronRight} size="sm" />
                </Box>
              </Box>
            )}
          </Box>
        </Stack>
      </Box>
    </Box>
  );
}
