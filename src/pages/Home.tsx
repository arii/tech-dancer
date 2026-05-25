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
    <Box as="main" paddingBottom={{ base: 16, md: 12 }}>
      <SEO
        title="Home"
        description="BoomTick helps West Coast Swing dancers train smarter, travel better, and prepare for better dance weekends with practical guides and reviews."
        schema={STATIC_SCHEMAS.HOME}
      />

      <Box
        as="section"
        display="grid"
        gap={{ base: 8, lg: 10 }}
        align="center"
        cols={{ base: 1, lg: 2 }}
        className="max-w-screen-xl"
      >
        <HomeHero />
        <FeaturedGuidePanel />
      </Box>

      <Stack gap={10} padding="panel" marginTop={{ base: 10, md: 12, lg: 14 }} className="max-w-screen-xl">
        <TopicGrid />
        <Box display="grid" gap={{ base: 8, lg: 10 }} cols={{ base: 1, lg: 2 }}>
          <FeaturedEventGuide />
          <GearShelf />
        </Box>
        <Box display="grid" gap={{ base: 8, lg: 10 }} cols={{ base: 1, lg: 2 }}>
          <LatestPosts />
          <DevLabCallout />
        </Box>
      </Stack>
    </Box>
  );
}
