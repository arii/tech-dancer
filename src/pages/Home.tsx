import React, { Suspense } from 'react';
import { SEO } from '@/components/SEO';
import { Box, Stack, Grid } from '@/layouts/Primitives';
import { STATIC_SCHEMAS } from '@/config/constants';
import { FeaturedGuidePanel } from '@/features/home/FeaturedGuidePanel';
import { HeroSection } from '@/components/ui/HeroSection';
import { PromoStrip } from '@/components/ui/PromoStrip';

const TopicGrid = React.lazy(() => import('@/features/home/TopicGrid').then(module => ({ default: module.TopicGrid })));
const GearShelf = React.lazy(() => import('@/features/home/GearShelf').then(module => ({ default: module.GearShelf })));
const LatestPosts = React.lazy(() => import('@/features/home/LatestPosts').then(module => ({ default: module.LatestPosts })));
const GearCallout = React.lazy(() => import('@/features/home/GearCallout').then(module => ({ default: module.GearCallout })));

export default function Home() {
  return (
    <Box
      as="section"
      aria-label="Home content"
      marginX="auto"
      width="full"
      maxWidth="7xl"
      minWidth={0}
      overflowX="hidden"
      paddingX={{ base: 4, sm: 6, lg: 8 }}
    >
      <SEO
        title="West Coast Swing Dance Guides & Gear"
        description="Discover West Coast Swing dance training tips, competition travel guides, and curated dance gear reviews by Ariel Anders. Level up your dancing today."
        schema={STATIC_SCHEMAS.HOME}
      />

      {/* Hero + Featured Guide: editorial two-column on desktop, stacked on mobile */}
      <Grid
        as="section"
        cols={{ base: 1, lg: 12 }}
        gap={{ base: 8, lg: 6 }}
        width="full"
        maxWidth="full"
        minWidth={0}
        align="center"
      >
        <Box span={{ base: 12, lg: 7 }}>
          <HeroSection />
        </Box>
        <Box span={{ base: 12, lg: 5 }}>
          <FeaturedGuidePanel />
        </Box>
      </Grid>

      <Box marginTop={{ base: 12, lg: 8 }}>
        <PromoStrip
          imageSrc="/assets/gear/norcal-bestcal-front.webp"
          imageAlt="NorCal pride apparel preview"
          title="Shop NorCal pride merch"
          subtitle="Tees, hoodies, and tanks for the dance floor"
          ctaLabel="Shop now"
          href="/merch"
        />
      </Box>

      <Suspense fallback={<Box minHeight={300} />}>
        <Stack
          gap={{ base: 12, lg: 'section-spacing' }}
          marginTop={{ base: 12, lg: 'section-spacing' }}
          width="full"
          maxWidth="full"
          minWidth={0}
        >
          <GearShelf />

          <Grid
            cols={{ base: 1, lg: 12 }}
            gap={8}
            width="full"
            maxWidth="full"
            minWidth={0}
          >
            <Box span={{ base: 12, lg: 8 }}>
              <LatestPosts />
            </Box>
            <Box span={{ base: 12, lg: 4 }}>
              <GearCallout />
            </Box>
          </Grid>
          <TopicGrid />
        </Stack>
      </Suspense>
    </Box>
  );
}
