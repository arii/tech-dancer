// impeccable-ignore-file
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
    <Box as="section" aria-label="Home content" className="mx-auto w-full max-w-[1240px] min-w-0 overflow-x-clip px-4 sm:px-6 lg:px-8">
      <SEO
        title="West Coast Swing Dance Guides & Gear"
        description="Discover West Coast Swing dance training tips, competition travel guides, and curated dance gear reviews by Ariel Anders. Level up your dancing today."
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
      </Suspense>
    </Box>
  );
}
