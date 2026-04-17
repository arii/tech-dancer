import { Box, Stack } from '@/components/layout/Primitives';
import Navigation from '@/components/Navigation';
import { EmailCaptureBar } from '@/features/email-capture/EmailCaptureBar';
import { Footer } from '@/components/layout/Footer';
import { AnimatePresence } from 'motion/react';

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <Box layout="appShell" height="screen">
      <Navigation />
      
      <Box as="main" flex position="relative" padding="shell" overflow="y-hidden">
        <Box flex padding="container" overflow="y-auto">
          {children}
        </Box>
        
        <Footer />
        
        <AnimatePresence>
          <EmailCaptureBar />
        </AnimatePresence>
      </Box>
    </Box>
  );
}
