
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
      maxWidth={1240}
      minWidth={0}
      overflowX="hidden"
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
        gap={10}
        className="grid-cols-1 lg:grid-cols-[minmax(0,1fr)_26.25rem]"
      >
        <HeroSection />
        <FeaturedGuidePanel />
      </Box>

      {/* Remaining sections — tighter vertical rhythm on mobile */}
      <Stack
        gap={{ base: 10, lg: 14 }}
        marginTop={{ base: 12, lg: 16 }}
        width="full"
        maxWidth="full"
        minWidth={0}
      >
        <TopicGrid />

        <Box
          display="grid"
          width="full"
          maxWidth="full"
          minWidth={0}
          gap={8}
          className="grid-cols-1 lg:grid-cols-[minmax(0,1.6fr)_minmax(18.75rem,0.8fr)]"
        >
          <FeaturedEventGuide />
          <GearShelf />
        </Box>

        <Box
          display="grid"
          width="full"
          maxWidth="full"
          minWidth={0}
          gap={8}
          className="grid-cols-1 lg:grid-cols-[minmax(0,1.6fr)_minmax(18.75rem,0.8fr)]"
        >
          <LatestPosts />
          <DevLabCallout />
        </Box>
      </Stack>
    </Box>
  );
}
