import { useRef, useLayoutEffect } from 'react';
import { useLocation, useNavigationType } from 'react-router-dom';
import { Box, Stack } from '@/layouts/Primitives';
import Navigation from '@/components/Navigation';
import { Footer } from '@/layouts/Footer';
import { AnimatePresence } from 'motion/react';
import { GlobalSearch } from '@/components/GlobalSearch';
import { useEmailCaptureContext } from '@/features/email-capture/EmailCaptureContext';
import { ScrollToTopButton } from '@/components/ui/ScrollToTopButton';

export function MainLayout({ children }: { children: React.ReactNode }) {
  const { showEmailBar } = useEmailCaptureContext();
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
      // We use requestAnimationFrame to ensure the scroll happens after the content renders
      requestAnimationFrame(() => {
        if (container) {
          container.scrollTop = 0;
        }
      });
      // Also ensure the window itself is at the top
      window.scrollTo(0, 0);
    }

    return () => {
      window.removeEventListener('beforeunload', handleSaveScroll);
      handleSaveScroll();
    };
  }, [pathname, key, navType]);

  return (
    <Box layout="root" height="screen" position="relative" overflowX="hidden" width="full">
      <GlobalSearch />
      
      <Box display="flex" height="min" width="full">
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
          snap="y"
          transitionProp="all"
          duration={300}
          viewTransitionName="main-content"
        >
          <Stack
            paddingX={{ base: 4, md: 6, lg: 12 }}
            paddingTop={12}
            paddingBottom={showEmailBar ? { base: 48, md: 64 } : 12}
            flex={1}
            direction="col"
            marginX="auto"
            maxWidth="7xl"
            width="full"
            transitionProp="all"
            duration={300}
          >
            <Box flex={1} width="full">
              {children}
            </Box>
            <Footer />
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
}
