// impeccable-ignore-file
import { SEO } from '@/components/SEO';
import { Box, Stack, Grid } from '@/layouts/Primitives';
import { STATIC_SCHEMAS } from '@/config/constants';
import { TopicGrid } from '@/features/home/TopicGrid';
import { LatestPosts } from '@/features/home/LatestPosts';
import { DevLabCallout } from '@/features/home/DevLabCallout';
import { HeroBanner } from '@/components/ui/HeroBanner';
import { SplitHeroGrid } from '@/features/home/SplitHeroGrid';

export default function Home() {
  return (
    <Box as="section" aria-label="Home content" className="mx-auto w-full max-w-[1240px] min-w-0 overflow-x-clip px-4 sm:px-6 lg:px-8 pb-safe-bottom">
      <SEO
        title="Home"
        description="BoomTick: Training tips, travel guides, and gear reviews for West Coast Swing dancers."
        schema={STATIC_SCHEMAS.HOME}
      />

      <Stack gap={12}>
        <HeroBanner />
        <SplitHeroGrid />

        <Stack
          gap={{ base: 8, lg: 'section-spacing' }}
          marginTop={{ base: 4, lg: 8 }}
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
      </Stack>
    </Box>
  );
}
