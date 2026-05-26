import { SEO } from '@/components/SEO';
import { Box, Stack, Grid } from '@/layouts/Primitives';
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
    <Box paddingBottom="safe-bottom">
      <SEO
        title="Home"
        description="BoomTick: Training tips, travel guides, and gear reviews for West Coast Swing dancers, plus technical deep dives into building the platform with DevAI."
        schema={STATIC_SCHEMAS.HOME}
      />

      <Grid as="section" align="center" gap={8} width="full" className="lg:grid-cols-[minmax(0,1fr)_360px]"> {/* impeccable-ignore */}
        <HomeHero />
        <FeaturedGuidePanel />
      </Grid>

      <Stack gap={12} padding="panel" marginX="auto" maxWidth="screen-xl">
        <TopicGrid />
        <Grid gap={12} className="lg:grid-cols-[1fr_340px]"> {/* impeccable-ignore */}
          <FeaturedEventGuide />
          <GearShelf />
        </Grid>
        <Grid gap={12} className="lg:grid-cols-[1fr_340px]"> {/* impeccable-ignore */}
          <LatestPosts />
          <DevLabCallout />
        </Grid>
      </Stack>
    </Box>
  );
}
