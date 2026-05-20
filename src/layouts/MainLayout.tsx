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
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[201] focus:px-6 focus:py-3 focus:bg-accent focus:text-bg focus:font-bold focus:shadow-glow outline-none" // impeccable-ignore
      >
        Skip to Content
      </a>
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
          id="main-content"
          tabIndex={-1}
          ref={scrollRef}
          flex={1}
          position="relative"
          paddingTop={{ base: 16, lg: 0 }}
          maxWidth="full"
          width="full"
          surface="bg"
          direction="col"
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
