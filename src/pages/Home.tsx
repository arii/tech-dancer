// impeccable-ignore-file
import { SEO } from '@/components/SEO';
import { Box, Stack, Grid } from '@/layouts/Primitives';
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
    <Box
      as="section"
      aria-label="Home content"
      marginX="auto"
      width="full"
      maxWidth="[1240px]"
      minWidth={0}
      paddingX={{ base: 4, sm: 6, lg: 8 }}
      className="overflow-x-clip pb-safe-bottom"
    >
      <SEO
        title="Home"
        description="BoomTick: Training notes, blog insights, and practical tools for better West Coast Swing weekends."
        schema={STATIC_SCHEMAS.HOME}
      />

      {/* Hero + Featured Guide: editorial two-column on desktop, stacked on mobile */}
      <Grid
        as="section"
        width="full"
        maxWidth="full"
        minWidth={0}
        align="center"
        gap={{ base: 0, lg: 6 }}
        cols={{ lg: "[minmax(0,1fr)_420px]" }}
      >
        <HeroSection />
        <FeaturedGuidePanel />
      </Grid>

      <Stack
        gap={{ base: 8, lg: 'section-spacing' }}
        marginTop={{ base: 8, lg: 'section-spacing' }}
        width="full"
        maxWidth="full"
        minWidth={0}
      >
        <Grid
          width="full"
          maxWidth="full"
          minWidth={0}
          gap={8}
          cols={{ lg: "[minmax(0,1.6fr)_minmax(300px,0.8fr)]" }}
        >
          <FeaturedEventGuide />
          <GearShelf />
        </Grid>

        <Grid
          width="full"
          maxWidth="full"
          minWidth={0}
          gap={8}
          cols={{ lg: "[minmax(0,1.6fr)_minmax(300px,0.8fr)]" }}
        >
          <LatestPosts />
          <DevLabCallout />
        </Grid>
        <TopicGrid />
      </Stack>
    </Box>
  );
}
