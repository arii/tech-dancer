// impeccable-ignore-file
import { SEO } from '@/components/SEO';
import { Box, Stack, Grid } from '@/layouts/Primitives';
import { STATIC_SCHEMAS } from '@/config/constants';
import { TopicGrid } from '@/features/home/TopicGrid';
import { LatestPosts } from '@/features/home/LatestPosts';
import { HeroBanner } from '@/features/home/HeroBanner';
import { SplitHeroGrid } from '@/features/home/SplitHeroGrid';

export default function Home() {
  return (
    <Box as="section" aria-label="Home content" className="mx-auto w-full max-w-[1240px] min-w-0 overflow-x-clip px-4 sm:px-6 lg:px-8 pb-safe-bottom">
      <SEO
        title="Home"
        description="BoomTick: Training tips, travel guides, and gear reviews for West Coast Swing dancers."
        schema={STATIC_SCHEMAS.HOME}
      />

      <Stack gap={{ base: 8, lg: 12 }} className="w-full max-w-full min-w-0">
        <HeroBanner />

        <SplitHeroGrid />

        <Box
          display="grid"
          className="w-full max-w-full min-w-0 gap-12 lg:grid-cols-[minmax(0,1.8fr)_minmax(300px,1fr)]"
        >
          <LatestPosts />
          <TopicGrid />
        </Box>
      </Stack>
    </Box>
  );
}
