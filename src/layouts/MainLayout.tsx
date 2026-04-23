import { useRef, useLayoutEffect } from 'react';
import { useLocation, useNavigationType } from 'react-router-dom';
import { Box, Stack } from '@/layouts/Primitives';
import Navigation from '@/components/Navigation';
import { Footer } from '@/layouts/Footer';
import { GlobalSearch } from '@/components/GlobalSearch';
import { useEmailStore } from '@/features/email-capture/emailStore';
import { ScrollToTopButton } from '@/components/ui/ScrollToTopButton';

export function MainLayout({ children }: { children: React.ReactNode }) {
  const showEmailBar = useEmailStore((state) => state.showEmailBar);
  const scrollRef = useRef<HTMLElement | null>(null);
  const { pathname, key } = useLocation();
  const navType = useNavigationType();

  // Unified Scroll Management: Reset on navigation, Restore on history
  useLayoutEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    // Save scroll position for the CURRENT page before we navigate away
    const handleSaveScroll = () => {
      if (container) {
        sessionStorage.setItem(`scroll-${key}`, container.scrollTop.toString());
      }
    };

    window.addEventListener('beforeunload', handleSaveScroll);

    if (navType === 'POP') {
      // 1. History Navigation: Restore position
      const savedPosition = sessionStorage.getItem(`scroll-${key}`);
      if (savedPosition) {
        requestAnimationFrame(() => {
          if (container) container.scrollTop = parseInt(savedPosition, 10);
        });
      }
    } else {
      // 2. New Navigation (PUSH/REPLACE): Reset to top
      requestAnimationFrame(() => {
        if (container) {
          container.scrollTop = 0;
        }
      });
      window.scrollTo(0, 0);
    }

    return () => {
      window.removeEventListener('beforeunload', handleSaveScroll);
      handleSaveScroll();
    };
  }, [pathname, key, navType]);

  return (
    <Box layout="root" className="min-h-screen relative overflow-x-hidden w-full">
      <GlobalSearch />

      <Box display="flex" className="min-h-screen w-full">
        <Navigation />
        <Box as="main" flex={1} position="relative" overflow="y-auto" className="bg-bg pt-16 lg:pt-0 max-w-full w-full flex flex-col" style={{ viewTransitionName: 'main-content' }}>
          <Stack
            paddingX={{ base: 4, md: 6, lg: 12 }}
            paddingTop={12}
            paddingBottom={showEmailBar ? { base: 48, md: 64 } : 12}
            flex={1}
            direction="col"
            className="flex-col mx-auto max-w-7xl w-full transition-all duration-300"
          >
            <Box flex={1} className="w-full">
              {children}
            </Box>
            <Footer />
          </Stack>
        </Box>
      </Box>
    </Box>
  );
}
