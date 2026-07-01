// impeccable-ignore-file
import { SEO } from '@/components/SEO';
import { Box, Stack, Grid } from '@/layouts/Primitives';
import { STATIC_SCHEMAS } from '@/config/constants';
import { FeaturedGuidePanel } from '@/features/home/FeaturedGuidePanel';
import { TopicGrid } from '@/features/home/TopicGrid';
import { LatestPosts } from '@/features/home/LatestPosts';
import { DevLabCallout } from '@/features/home/DevLabCallout';
import { HeroSection } from '@/components/ui/HeroSection';
import { PromoStrip } from '@/components/ui/PromoStrip';

export default function Home() {
  return (
    <Box
      as="section"
      aria-label="Home content"
      marginX="auto"
      width="full"
      maxWidth="[1240px]"
      minWidth={0}
      overflowX="hidden"
      paddingX={{ base: 4, sm: 6, lg: 8 }}
    >
      <SEO
        title="Home"
        description="BoomTick: Training tips, travel guides, and gear reviews for West Coast Swing dancers."
        schema={STATIC_SCHEMAS.HOME}
      />

      {/* Hero + Featured Guide: editorial two-column on desktop, stacked on mobile */}
      <Grid
        as="section"
        cols={{ base: 1, lg: "[minmax(0,1fr)_420px]" }}
        gap={{ base: 8, lg: 6 }}
        width="full"
        maxWidth="full"
        minWidth={0}
        align="start"
      >
        <HeroSection />
        <Box marginTop={{ base: 0, lg: 16 }}>
          <FeaturedGuidePanel />
        </Box>
      </Grid>

      <Box marginTop={{ base: 12, lg: 8 }}>
        <PromoStrip
          imageSrc="/assets/gear/norcal-bestcal-front.webp"
          title="Shop NorCal pride merch"
          subtitle="Tees, hoodies, and tanks for the dance floor"
          ctaLabel="Shop now"
          href="/merch"
        />
      </Box>

      <Stack
        gap={{ base: 12, lg: 'section-spacing' }}
        marginTop={{ base: 24, lg: '[120px]' }}
        width="full"
        maxWidth="full"
        minWidth={0}
      >
        <Grid
          cols={{ base: 1, lg: "[minmax(0,1.6fr)_minmax(300px,0.8fr)]" }}
          gap={8}
          width="full"
          maxWidth="full"
          minWidth={0}
        >
          <LatestPosts />
          <DevLabCallout />
        </Grid>
        <TopicGrid />
      </Stack>
    </Box>
  );
}
