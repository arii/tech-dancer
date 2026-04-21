import { Box, Stack } from '@/layouts/Primitives';
import Navigation from '@/components/Navigation';
import { Footer } from '@/layouts/Footer';
import { AnimatePresence } from 'motion/react';
import { GlobalSearch } from '@/components/GlobalSearch';
import { useEmailCaptureContext } from '@/features/email-capture/EmailCaptureContext';

export function MainLayout({ children }: { children: React.ReactNode }) {
  const { showEmailBar } = useEmailCaptureContext();

  return (
    <Box layout="root" className="min-h-screen relative overflow-x-hidden w-full">
      <GlobalSearch />
      
      <Box display="flex" className="min-h-screen w-full">
        <Navigation />
        <Box as="main" flex={1} position="relative" overflow="y-auto" className="bg-bg pt-16 lg:pt-0 max-w-full w-full flex flex-col" style={{ viewTransitionName: 'main-content' }}>
          <Box
            paddingX={{ base: 8, md: 16 }}
            paddingTop={32}
            paddingBottom={showEmailBar ? { base: 48, md: 32 } : 20}
            className="mx-auto min-h-full max-w-[1400px] w-full transition-all duration-300"
          >
            <Box flex={1} className="w-full flex flex-col">
              <Box flex={1} className="w-full">
                {children}
              </Box>
              <Footer />
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
