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
    <Box as="main" className="pb-safe-bottom">
      <SEO
        title="Home"
        description="BoomTick: Training tips, travel guides, and gear reviews for West Coast Swing dancers, plus technical deep dives into building the platform with DevAI."
        schema={STATIC_SCHEMAS.HOME}
      />

      <Box as="section" display="grid" gap={8} className="items-center lg:grid-cols-[minmax(0,1fr)_360px]">
        <HomeHero />
        <FeaturedGuidePanel />
      </Box>

      <Stack gap={12} padding="panel" className="mx-auto max-w-screen-xl">
        <TopicGrid />
        <Box display="grid" className="gap-12 lg:grid-cols-[1fr_340px]">
          <FeaturedEventGuide />
          <GearShelf />
        </Box>
        <Box display="grid" className="gap-12 lg:grid-cols-[1fr_340px]">
          <LatestPosts />
          <DevLabCallout />
        </Box>
      </Stack>
    </Box>
  );
}
