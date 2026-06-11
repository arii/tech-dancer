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
    <Stack
      as="section"
      aria-label="Home content"
      marginX="auto"
      width="full"
      maxWidth="1240px"
      minWidth={0}
      overflowX="hidden"
      paddingX={{ base: 4, sm: 6, lg: 8 }}
      paddingBottom="safe-bottom"
      gap={{ base: 12, lg: 8 }}
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
        gap={{ base: 12, lg: 6 }}
        align="center"
        className="lg:grid-cols-[minmax(0,1fr)_minmax(300px,0.8fr)]"
      >
        <HeroSection />
        <FeaturedGuidePanel />
      </Box>

      <Box
        display="grid"
        width="full"
        maxWidth="full"
        minWidth={0}
        gap={{ base: 12, lg: 8 }}
        className="grid-cols-1 lg:grid-cols-[minmax(0,1.6fr)_minmax(300px,0.8fr)]"
      >
        <FeaturedEventGuide />
        <GearShelf />
      </Box>


      <Box
        display="grid"
        width="full"
        maxWidth="full"
        minWidth={0}
        gap={{ base: 12, lg: 8 }}
        className="grid-cols-1 lg:grid-cols-[minmax(0,1.6fr)_minmax(300px,0.8fr)]"
      >
        <LatestPosts />
        <DevLabCallout />
      </Box>

      <TopicGrid />
    </Stack>
  );
}
