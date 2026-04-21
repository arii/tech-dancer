import { Box, Stack } from '@/layouts/Primitives';
import Navigation from '@/components/Navigation';
import { Footer } from '@/layouts/Footer';
import { AnimatePresence } from 'motion/react';
import { GlobalSearch } from '@/components/GlobalSearch';
import { useEmailCaptureContext } from '@/features/email-capture/EmailCaptureContext';

export function MainLayout({ children }: { children: React.ReactNode }) {
  const { showEmailBar } = useEmailCaptureContext();

  return (
    <Box layout="root" minHeight="screen" position="relative" overflowX="hidden" width="full">
      <GlobalSearch />
      
      <Box display="flex" minHeight="screen" width="full">
        <Navigation />
        <Box as="main" flex={1} position="relative" overflowY="auto" className="bg-bg pt-16 lg:pt-0 max-w-full w-full">
          <Box
            marginX="auto"
            paddingX={{ base: 4, md: 6, lg: 12 }}
            paddingTop={12}
            paddingBottom={showEmailBar ? { base: 48, md: 64 } : 12}
            minHeight="full"
            className="max-w-7xl w-full transition-all duration-300"
          >
            <Stack gap={12} width="full">
              <Box flex={1} width="full">
                {children}
              </Box>
              <Footer />
            </Stack>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
