import { Box, Stack } from '@/layouts/Primitives';
import Navigation from '@/components/Navigation';
import { EmailCaptureBar } from '@/features/email-capture/EmailCaptureBar';
import { Footer } from '@/layouts/Footer';
import { AnimatePresence } from 'motion/react';
import { GlobalSearch } from '@/components/GlobalSearch';

export function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <Box layout="root" className="min-h-screen relative overflow-x-hidden w-full">
      <GlobalSearch />
      
      <Box display="flex" className="min-h-screen w-full">
        <Navigation />
        <Box as="main" flex={1} position="relative" overflow="y-auto" className="bg-bg pt-16 lg:pt-0 max-w-full w-full">
          <Box paddingX={{ base: 4, md: 6, lg: 12 }} paddingY={12} className="mx-auto min-h-full max-w-7xl w-full">
            <Stack gap={12} className="w-full">
              <Box flex={1} className="w-full">
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
