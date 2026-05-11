import { useRef } from 'react';
import { ReactNode } from 'react';
import { Box, Stack } from '@/layouts/Primitives';
import Navigation from '@/components/Navigation';
import { Footer } from '@/layouts/Footer';
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
      className="touch-pan-y"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <Box
        id="route-announcer"
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      />
      <Box display="flex" minHeight="screen" width="full">
        <Navigation />
        <ScrollToTopButton scrollRef={scrollRef} />
        <Stack
          as="main"
          ref={scrollRef}
          flex={1}
          position="relative"
          overflowY="auto"
          paddingTop={{ base: 16, lg: 0 }}
          maxWidth="full"
          width="full"
          surface="bg"
          direction="col"
          scrollBehavior="smooth"
          scrollPaddingTop={64}
        >
          <Stack
            paddingX={{ base: 4, md: 6, lg: 12, xl: 20 }}
            paddingTop={{ base: 16, md: 12 }}
            paddingBottom={{ base: 28, md: 12 }}
            flex={1}
            direction="col"
            marginX={{ base: "auto", lg: 0 }}
            maxWidth="7xl"
            width="full"
          >
            <Box flex={1} width="full">
              {children}
            </Box>
            <Footer />
          </Stack>
        </Stack>
      </Box>

      <GlobalSearch />
    </Box>
  );
}
