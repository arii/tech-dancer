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
import { HomeHero } from '@/features/home/HomeHero';

export default function Home() {
  return (
    <Box as="main" className="pb-safe-bottom mx-auto w-full max-w-[1240px]">
      <SEO
        title="Home"
        description="BoomTick: Training tips, travel guides, and gear reviews for West Coast Swing dancers."
        schema={STATIC_SCHEMAS.HOME}
      />

      {/* Hero + Featured Guide: editorial two-column on desktop, stacked on mobile */}
      <Box
        as="section"
        display="grid"
        className="items-center gap-10 lg:grid-cols-[minmax(0,1fr)_420px]"
      >
        <HomeHero />
        <FeaturedGuidePanel />
      </Box>

      {/* Remaining sections — tighter vertical rhythm on mobile */}
      <Stack gap={{ base: 10, lg: 14 }} className="mt-12 lg:mt-16">
        <TopicGrid />

        <Box
          display="grid"
          className="gap-8 lg:grid-cols-[minmax(0,1.6fr)_minmax(300px,0.8fr)]"
        >
          <FeaturedEventGuide />
          <GearShelf />
        </Box>

        <Box
          display="grid"
          className="gap-8 lg:grid-cols-[minmax(0,1.6fr)_minmax(300px,0.8fr)]"
        >
          <LatestPosts />
          <DevLabCallout />
        </Box>
      </Stack>
    </Box>
  );
}
