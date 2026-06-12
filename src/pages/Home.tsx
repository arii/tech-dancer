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
      width="full"
      margin="auto"
      minWidth="0"
      overflow="hidden"
      paddingX={{ base: 4, sm: 6, lg: 8 }}
      style={{ maxWidth: '1240px', paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      <SEO
        title="Home"
        description="BoomTick: Training tips, travel guides, and gear reviews for West Coast Swing dancers."
        schema={STATIC_SCHEMAS.HOME}
      />

      {/* Hero + Featured Guide: grid on desktop, stacked on mobile */}
      <Grid
        cols={{ base: 1, lg: 3 }}
        gap={{ base: 4, lg: 6 }}
        align="center"
        width="full"
        minWidth="0"
      >
        <Box span={{ base: 1, lg: 2 }}>
          <HeroSection />
        </Box>
        <Box span={{ base: 1, lg: 1 }}>
          <FeaturedGuidePanel />
        </Box>
      </Grid>

      <Stack
        gap={{ base: 8, lg: 'section-spacing' }}
        marginTop={{ base: 8, lg: 'section-spacing' }}
        width="full"
        minWidth="0"
      >
        {/* Featured Event Guide + Gear Shelf */}
        <Grid
          cols={{ base: 1, lg: 5 }}
          gap={8}
          width="full"
          minWidth="0"
        >
          <Box span={{ base: 1, lg: 3 }}>
            <FeaturedEventGuide />
          </Box>
          <Box span={{ base: 1, lg: 2 }}>
            <GearShelf />
          </Box>
        </Grid>

        {/* Latest Posts + Dev Lab Callout */}
        <Grid
          cols={{ base: 1, lg: 5 }}
          gap={8}
          width="full"
          minWidth="0"
        >
          <Box span={{ base: 1, lg: 3 }}>
            <LatestPosts />
          </Box>
          <Box span={{ base: 1, lg: 2 }}>
            <DevLabCallout />
          </Box>
        </Grid>

        <TopicGrid />
      </Stack>
    </Box>
  );
}
