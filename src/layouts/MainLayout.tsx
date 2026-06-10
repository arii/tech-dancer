import { useRef } from 'react';
import { ReactNode } from 'react';
import { Box, Stack } from '@/layouts/Primitives';
import Navigation from '@/components/Navigation';
import { Footer } from '@/layouts/Footer';
import { NewsletterBanner } from '@/features/email-capture/NewsletterBanner';
import { GlobalSearch } from '@/components/GlobalSearch';
import { ScrollToTopButton } from '@/components/ui/ScrollToTopButton';
import { useScrollManagement } from '@/hooks/useScrollManagement';

export function MainLayout({ children }: { children: ReactNode }) {
  const scrollRef = useRef<HTMLElement | null>(null);
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);

  const { handleTouchStart, handleTouchEnd } = useScrollManagement(scrollRef, touchStartRef);

  return (
    <Box
      layout="root"
      position="relative"
      overflowX="hidden"
      width="full"
      minHeight="screen"
      maxWidth="full"
      minWidth="0"
      className="touch-pan-y"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <Box
        as="a"
        href="#main-content"
        position="fixed"
        top={4}
        left={4}
        zIndex="skipLink"
        paddingX={6}
        paddingY={2}
        minHeight={11}
        display="flex"
        align="center"
        justify="center"
        radius="sm"
        className="sr-only focus:not-sr-only focus:fixed focus:bg-accent focus:text-bg focus:font-bold focus:shadow-glow outline-none whitespace-nowrap"
      >
        Skip to Content
      </Box>
      <Box
        id="route-announcer"
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      />
      <Stack minHeight="screen" width="full" maxWidth="full" minWidth={0} overflowX="hidden">
        <Navigation />
        <ScrollToTopButton scrollRef={scrollRef} />
        <Stack
          as="main"
          id="main-content"
          tabIndex={-1}
          ref={scrollRef}
          flex={1}
          position="relative"
          paddingTop={{ base: 16, lg: 16 }}
          maxWidth="full"
          width="full"
          surface="bg"
          direction="col"
          minWidth={0}
          overflowX="hidden"
        >
          <Stack
            paddingX={{ base: 4, md: 6, lg: 10 }}
            paddingTop={{ base: 8, md: 6 }}
            paddingBottom={{ base: 28, md: 12 }}
            flex={1}
            direction="col"
            marginX="auto"
            maxWidth="7xl"
            width="full"
            minWidth={0}
            overflowX="hidden"
          >
            {children}
            <Footer />
          </Stack>
        </Stack>
      </Stack>

      <NewsletterBanner />
      <GlobalSearch />
    </Box>
  );
}
