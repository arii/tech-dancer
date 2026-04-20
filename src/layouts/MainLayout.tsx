import { Box, Stack } from '@/components/Primitives';
import Navigation from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { GlobalSearch } from '@/components/GlobalSearch';
import { EmailCaptureBar } from '@/components/EmailCaptureBar';

export function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <Box layout="root" className="min-h-screen relative">
      <GlobalSearch />
      <EmailCaptureBar />
      
      <Box display="flex" className="min-h-screen">
        <Navigation />
        <Box as="main" flex={1} position="relative" overflow="y-auto" className="bg-bg pt-16 lg:pt-0">
          <Box paddingX={6} paddingY={12} className="mx-auto min-h-full max-w-[90%]">
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
