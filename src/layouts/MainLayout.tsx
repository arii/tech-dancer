import { useRef, lazy, Suspense } from 'react';
import { ReactNode } from 'react';
import { Box, Stack } from './Primitives';
import Navigation from '../components/Navigation';
import { Footer } from './Footer';
import { ScrollToTopButton } from '../components/ui/ScrollToTopButton';
import { useScrollManagement } from '../hooks/useScrollManagement';
import { useGlobalSearch } from '../hooks/useGlobalSearch';
import { useCommandKey } from '../hooks/useHotkeys';

const GlobalSearch = lazy(() => import('../components/GlobalSearch').then(m => ({ default: m.GlobalSearch })));



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
      maxWidth="full"
      minWidth={0}
      minHeight="screen"
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
        paddingY={3}
        radius="sm"
        className="sr-only focus:not-sr-only focus:fixed focus:bg-accent focus:text-bg focus:font-bold focus:shadow-glow outline-none"
      >
        Skip to Content
      </Box>
      <Box
        id="route-announcer"
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      />
      <Stack minHeight="screen" width="full" maxWidth="full" minWidth={0} overflowX="clip">
        <Navigation />
        <ScrollToTopButton scrollRef={scrollRef} />
        <Stack
          as="main"
          id="main-content"
          tabIndex={-1}
          ref={scrollRef}
          flex={1}
          position="relative"
          zIndex={0}
          isolation="isolate"
          paddingTop={{ base: 16, lg: 16 }}
          maxWidth="full"
          width="full"
          minWidth={0}
          surface="bg"
          direction="col"
          overflowX="clip"
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
            overflowX="clip"
          >
            {children}
            <Footer />
          </Stack>
        </Stack>
      </Stack>

      {isSearchOpen && (
        <Suspense fallback={null}>
          <GlobalSearch />
        </Suspense>
      )}
    </Box>
  );
}
