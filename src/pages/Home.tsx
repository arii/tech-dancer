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
    <Stack
      as="section"
      aria-label="Home content"
      marginX="auto"
      width="full"
      maxWidth="7xl"
      minWidth={0}
      overflowX="hidden"
      paddingX={{ base: 4, sm: 6, lg: 8 }}
      paddingBottom="safe-bottom"
      gap={{ base: 12, lg: 8 }}
    >
      <SEO
        title="Home"
        description="BoomTick: Training tips, travel guides, and gear reviews for West Coast Swing dancers."
        schema={STATIC_SCHEMAS.HOME}
      />

      {/* Hero + Featured Guide: editorial two-column on desktop, stacked on mobile */}
      <Grid
        as="section"
        width="full"
        maxWidth="full"
        minWidth={0}
        gap={{ base: 12, lg: 6 }}
        align="center"
        cols={{ base: 1, lg: "[minmax(0,1fr)_minmax(18.75rem,0.8fr)]" }}
      >
        <HeroSection />
        <FeaturedGuidePanel />
      </Grid>

      <Grid
        width="full"
        maxWidth="full"
        minWidth={0}
        gap={{ base: 12, lg: 8 }}
        cols={{ base: 1, lg: "[minmax(0,1.6fr)_minmax(18.75rem,0.8fr)]" }}
      >
        <FeaturedEventGuide />
        <GearShelf />
      </Grid>


      <Grid
        width="full"
        maxWidth="full"
        minWidth={0}
        gap={{ base: 12, lg: 8 }}
        cols={{ base: 1, lg: "[minmax(0,1.6fr)_minmax(18.75rem,0.8fr)]" }}
      >
        <LatestPosts />
        <DevLabCallout />
      </Grid>

      <TopicGrid />
    </Stack>
  );
}
