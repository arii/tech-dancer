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

  // Handle Scroll Restoration (History Only)
  useLayoutEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const handleSaveScroll = () => {
      if (container) {
        sessionStorage.setItem(`scroll-${key}`, container.scrollTop.toString());
      }
    };

    window.addEventListener('beforeunload', handleSaveScroll);

    if (navType === 'POP') {
      const savedPosition = sessionStorage.getItem(`scroll-${key}`);
      if (savedPosition) {
        requestAnimationFrame(() => {
          if (container) container.scrollTop = parseInt(savedPosition, 10);
        });
      }
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
        <ScrollToTopButton scrollRef={scrollRef} />
        <Box as="main" ref={scrollRef} flex={1} position="relative" overflow="y-auto" className="bg-bg pt-16 lg:pt-0 max-w-full w-full flex flex-col" style={{ viewTransitionName: 'main-content' }}>
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
