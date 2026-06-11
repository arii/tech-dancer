import { useRef, lazy, Suspense } from 'react';
import { ReactNode } from 'react';
import { Box, Stack } from '@/layouts/Primitives';
import Navigation from '@/components/Navigation';
import { Footer } from '@/layouts/Footer';
import { NewsletterBanner } from '@/features/email-capture/NewsletterBanner';
import { ScrollToTopButton } from '@/components/ui/ScrollToTopButton';
import { useScrollManagement } from '@/hooks/useScrollManagement';
import { useGlobalSearch } from '@/hooks/useGlobalSearch';
import { useCommandKey } from '@/hooks/useHotkeys';

const GlobalSearch = lazy(() => import('@/components/GlobalSearch').then(m => ({ default: m.GlobalSearch })));



export function MainLayout({ children }: { children: ReactNode }) {
  const scrollRef = useRef<HTMLElement | null>(null);
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);
  const { isOpen: isSearchOpen, open: openSearch } = useGlobalSearch();

  useCommandKey('k', (e) => {
    e.preventDefault();
    openSearch();
  }, [openSearch]);

  const { handleTouchStart, handleTouchEnd } = useScrollManagement(scrollRef, touchStartRef);



  return (
    <Box
      layout="root"
      position="relative"
      overflowX="hidden"
      width="full"
      minHeight="screen"
      className="touch-pan-y max-w-full min-w-0 overflow-x-clip"
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
        paddingY={3}
        radius="sm"
        className="sr-only focus:not-sr-only focus:fixed focus:bg-accent focus:text-bg focus:font-bold focus:shadow-glow outline-none whitespace-nowrap"
      >
        Skip to Content
      </Box>
      <Box
        id="route-announcer"
        position="fixed"
        top={4}
        left={4}
        width={1}
        height={1}
        overflow="hidden"
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      />
      <Stack minHeight="screen" width="full" className="w-full max-w-full min-w-0 overflow-x-clip">
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
          className="w-full max-w-full min-w-0 overflow-x-clip"
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
            className="min-w-0 max-w-full overflow-x-clip"
          >
            {children}
            <Footer />
          </Stack>
        </Stack>
      </Stack>

      <NewsletterBanner />
      {isSearchOpen && (
        <Suspense fallback={null}>
          <GlobalSearch />
        </Suspense>
      )}
    </Box>
  );
}
