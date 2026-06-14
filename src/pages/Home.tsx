// impeccable-ignore-file
import { SEO } from '@/components/SEO';
import { Box, Stack } from '@/layouts/Primitives';
import { STATIC_SCHEMAS } from '@/config/constants';
import { FeaturedGuidePanel } from '@/features/home/FeaturedGuidePanel';
import { TopicGrid } from '@/features/home/TopicGrid';
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
      maxWidth={1240}
      minWidth={0}
      overflowX="clip"
      paddingX={{ base: 4, sm: 6, lg: 8 }}
      paddingBottom="safe-bottom"
    >
      <SEO
        title="Home"
        description="BoomTick: Training tips, travel guides, and gear reviews for West Coast Swing dancers."
        schema={STATIC_SCHEMAS.HOME}
      />

      {/* Hero + Featured Guide: editorial two-column on desktop, stacked on mobile */}
      <Box
        as="section"
        display="grid"
        width="full"
        maxWidth="full"
        minWidth={0}
        align="center"
        gap={{ base: 0, lg: 6 }}
        className="lg:grid-cols-[minmax(0,1fr)_420px]"
      >
        <HeroSection />
        <FeaturedGuidePanel />
      </Box>

      <Stack
        gap={{ base: 8, lg: 'section-spacing' }}
        marginTop={{ base: 8, lg: 'section-spacing' }}
        width="full"
        maxWidth="full"
        minWidth={0}
      >
        <Box
          display="grid"
          width="full"
          maxWidth="full"
          minWidth={0}
          gap={8}
          className="lg:grid-cols-[minmax(0,1.6fr)_minmax(300px,0.8fr)]"
        >
          <LatestPosts />
          <DevLabCallout />
        </Box>
        <TopicGrid />
      </Stack>
    </Box>
  );
}
