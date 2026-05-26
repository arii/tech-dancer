import { SEO } from '@/components/SEO';
import { Box, Stack, Grid } from '@/layouts/Primitives';
import { STATIC_SCHEMAS } from '@/config/constants';
import { layout } from '@/styles/design-tokens';
import { FeaturedGuidePanel } from '@/features/home/FeaturedGuidePanel';
import { TopicGrid } from '@/features/home/TopicGrid';
import { FeaturedEventGuide } from '@/features/home/FeaturedEventGuide';
import { GearShelf } from '@/features/home/GearShelf';
import { LatestPosts } from '@/features/home/LatestPosts';
import { DevLabCallout } from '@/features/home/DevLabCallout';
import { HomeHero } from '@/features/home/HomeHero';

export default function Home() {
  return (
    <Box paddingBottom="safe-bottom">
      <SEO
        title="Home"
        description="BoomTick helps West Coast Swing dancers train smarter, travel better, and prepare for better dance weekends."
        schema={STATIC_SCHEMAS.HOME}
      />

      {/* Hero + Featured Guide Section */}
      <Grid
        as="section"
        gap={10}
        align="center"
        cols={{ base: 1, lg: layout.heroEditorial }}
      >
        <HomeHero />
        <FeaturedGuidePanel />
      </Grid>

      <Stack
        gap={{ base: 10, lg: 16 }}
        paddingY={{ base: 10, lg: 14 }}
        marginX="auto"
        maxWidth="screen-xl"
      >
        {/* Explore by topic */}
        <TopicGrid />

        {/* Events + Gear Shelf */}
        <Grid gap={12} cols={{ base: 1, lg: layout.sidebarEditorial }}>
          <Box order={{ base: 1, lg: 0 }}>
            <FeaturedEventGuide />
          </Box>
          <Box order={{ base: 2, lg: 0 }}>
            <GearShelf />
          </Box>
        </Grid>

        {/* Latest Posts + Dev Lab */}
        <Grid gap={12} cols={{ base: 1, lg: layout.sidebarEditorial }}>
          <Box order={{ base: 1, lg: 0 }}>
            <LatestPosts />
          </Box>
          <Box order={{ base: 2, lg: 0 }}>
            <DevLabCallout />
          </Box>
        </Grid>
      </Stack>
    </Box>
  );
}
