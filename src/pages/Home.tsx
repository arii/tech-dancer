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
    <Box as="section" aria-label="Home content" className="mx-auto w-full max-w-[1240px] min-w-0 overflow-x-clip px-4 sm:px-6 lg:px-8">
      <SEO
        title="Home"
        description="BoomTick: Training tips, travel guides, and gear reviews for West Coast Swing dancers."
        schema={STATIC_SCHEMAS.HOME}
      />

      {/* Hero + Featured Guide: editorial 45/55 split for Option D */}
      <Grid
        as="section"
        cols={{ base: 1 }}
        gap={{ base: 12, lg: 12 }}
        width="full"
        maxWidth="full"
        minWidth={0}
        align="start"
        className="lg:grid-cols-[45fr_55fr]"
      >
        <HeroSection />
        <FeaturedGuidePanel />
      </Grid>

      <Box marginTop={{ base: 12, lg: 16 }}>
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
        <Grid
          cols={{ base: 1 }}
          gap={8}
          width="full"
          maxWidth="full"
          minWidth={0}
          className="lg:grid-cols-[minmax(0,1.6fr)_minmax(300px,0.8fr)]"
        >
          <LatestPosts />
          <DevLabCallout />
        </Grid>
        <TopicGrid />
      </Stack>
    </Box>
  );
}
