// impeccable-ignore-file
import { SEO } from '@/components/SEO';
import { Box, Stack } from '@/layouts/Primitives';
import { STATIC_SCHEMAS } from '@/config/constants';
import { FeaturedGuidePanel } from '@/features/home/FeaturedGuidePanel';
import { TopicGrid } from '@/features/home/TopicGrid';
import { FeaturedEventGuide } from '@/features/home/FeaturedEventGuide';
import { GearShelf } from '@/features/home/GearShelf';
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

      {/* Hero + Featured Guide: editorial two-column on desktop, stacked on mobile */}
      <Box
        as="section"
        display="grid"
        className="w-full max-w-full min-w-0 items-center gap-10 lg:grid-cols-[minmax(0,1fr)_420px]"
      >
        <HeroSection />
        <FeaturedGuidePanel />
      </Box>

      <Stack
        gap={{ base: 10, lg: 14 }}
        marginTop={{ base: 4, lg: 16 }}
        className="w-full max-w-full min-w-0"
      >
        <Box
          display="grid"
          className="w-full max-w-full min-w-0 gap-8 lg:grid-cols-[minmax(0,1.6fr)_minmax(300px,0.8fr)]"
        >
          <FeaturedEventGuide />
          <GearShelf />
        </Box>


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
