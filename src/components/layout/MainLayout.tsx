import { Box, Stack } from '@/components/layout/Primitives';
import Navigation from '@/components/Navigation';
import { EmailCaptureBar } from '@/features/email-capture/EmailCaptureBar';
import { Footer } from '@/components/layout/Footer';
import { AnimatePresence } from 'motion/react';
import { GlobalSearch } from '@/components/GlobalSearch';

export function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <Box layout="root" height="screen" position="relative">
      <GlobalSearch />
      
      <Box display="flex" height="full">
        <Navigation />
        <Box as="main" flex={1} position="relative" overflow="y-auto" className="bg-bg">
          <Box maxWidth="6xl" margin="auto" paddingX={6} paddingY={12} minHeight="full">
            <Stack gap={12}>
              <Box flex={1}>
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
