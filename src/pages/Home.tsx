import { SEO } from '@/components/SEO';
import { Box, Stack } from '@/layouts/Primitives';
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
      marginX="auto"
      width="full"
      maxWidth="7xl"
      overflow="hidden"
      paddingX={{ base: 4, sm: 6, lg: 8 }}
      paddingBottom={8}
      className="pb-safe-bottom" // impeccable-ignore
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
        align="center"
        gap={0}
        className="w-full max-w-full min-w-0 lg:gap-6 lg:grid-cols-[minmax(0,1fr)_420px]" // impeccable-ignore
      >
        <HeroSection />
        <FeaturedGuidePanel />
      </Box>

      <Stack
        gap={{ base: 2, lg: 8 }}
        marginTop={{ base: 0, lg: 8 }}
        width="full"
        maxWidth="full"
        className="min-w-0"
      >
        <Box
          display="grid"
          gap={8}
          className="w-full max-w-full min-w-0 lg:grid-cols-[minmax(0,1.6fr)_minmax(300px,0.8fr)]" // impeccable-ignore
        >
          <FeaturedEventGuide />
          <GearShelf />
        </Box>


        <Box
          display="grid"
          gap={8}
          className="w-full max-w-full min-w-0 lg:grid-cols-[minmax(0,1.6fr)_minmax(300px,0.8fr)]" // impeccable-ignore
        >
          <LatestPosts />
          <DevLabCallout />
        </Box>
        <TopicGrid />
      </Stack>
    </Box>
  );
}
