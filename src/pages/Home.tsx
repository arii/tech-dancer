// impeccable-ignore-file
import { SEO } from '@/components/SEO';
import { Box, Stack } from '@/layouts/Primitives';
import { STATIC_SCHEMAS } from '@/config/constants';
import { TopicGrid } from '@/features/home/TopicGrid';
import { LatestPosts } from '@/features/home/LatestPosts';
import { DevLabCallout } from '@/features/home/DevLabCallout';
import { HeroSection } from '@/components/ui/HeroSection';

export default function Home() {
  return (
    <Box as="section" aria-label="Home content" className="mx-auto w-full max-w-[1240px] min-w-0 overflow-x-clip px-4 sm:px-6 lg:px-8 pb-safe-bottom">
      <SEO
        title="Home"
        description="BoomTick: Training tips, travel guides, and gear reviews for West Coast Swing dancers."
        schema={STATIC_SCHEMAS.HOME}
      />

      {/* Hero: simple centered on mobile, full width on desktop */}
      <Box
        as="section"
        className="w-full max-w-full min-w-0"
      >
        <HeroSection />
      </Box>

      <Stack
        gap={{ base: 8, lg: 'section-spacing' }}
        marginTop={{ base: 8, lg: 'section-spacing' }}
        className="w-full max-w-full min-w-0"
      >
        <Box
          display="grid"
          className="w-full max-w-full min-w-0 gap-8 lg:grid-cols-[minmax(0,1.6fr)_minmax(300px,0.8fr)]"
        >
          <LatestPosts />
          <DevLabCallout />
        </Box>
        <TopicGrid />
      </Stack>
    </Box>
  );
}
