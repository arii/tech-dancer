// impeccable-ignore-file
import { SEO } from '@/components/SEO';
import { Box, Stack, Grid } from '@/layouts/Primitives';
import { STATIC_SCHEMAS } from '@/config/constants';
import { FeaturedGuidePanel } from '@/features/home/FeaturedGuidePanel';
import { TopicGrid } from '@/features/home/TopicGrid';
import { GearShelf } from '@/features/home/GearShelf';
import { LatestPosts } from '@/features/home/LatestPosts';
import { GearCallout } from '@/features/home/GearCallout';
import { HeroSection } from '@/components/ui/HeroSection';
import { PromoStrip } from '@/components/ui/PromoStrip';

export default function Home() {
  return (
    <Box as="section" aria-label="Home content" className="mx-auto w-full max-w-[1240px] min-w-0 overflow-x-clip px-4 sm:px-6 lg:px-8">
      <SEO
        title="Home"
        description="BoomTick: Training tips, travel guides, and gear reviews for West Coast Swing dancers."
        schema={STATIC_SCHEMAS.HOME}
      />

      {/* Hero + Featured Guide: editorial two-column on desktop, stacked on mobile */}
      <Grid
        as="section"
        cols={{ base: 1 }}
        gap={{ base: 8, lg: 6 }}
        width="full"
        maxWidth="full"
        minWidth={0}
        align="center"
        className="lg:grid-cols-[minmax(0,1fr)_420px]"
      >
        <HeroSection />
        <FeaturedGuidePanel />
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
        marginTop={{ base: 12, lg: 'section-spacing' }}
        width="full"
        maxWidth="full"
        minWidth={0}
      >
        <Box className="w-full max-w-full min-w-0">
          <GearShelf />
        </Box>

        <Grid
          cols={{ base: 1 }}
          gap={8}
          width="full"
          maxWidth="full"
          minWidth={0}
          className="lg:grid-cols-[minmax(0,1.6fr)_minmax(300px,0.8fr)]"
        >
          <LatestPosts />
          <GearCallout />
        </Grid>
        <TopicGrid />
      </Stack>
    </Box>
  );
}
