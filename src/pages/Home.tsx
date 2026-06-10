
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
      overflow="x-hidden"
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
        style={{ // impeccable-ignore - Grid configuration with arbitrary values for bespoke editorial layout.
          gridTemplateColumns: window.innerWidth >= 1024 ? 'minmax(0, 1fr) 26.25rem' : '1fr'
        } as React.CSSProperties}
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
          style={{ // impeccable-ignore - Complex grid configuration for bespoke editorial layout.
            gridTemplateColumns: window.innerWidth >= 1024 ? 'minmax(0, 1.6fr) minmax(18.75rem, 0.8fr)' : '1fr'
          } as React.CSSProperties}
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
          style={{ // impeccable-ignore - Complex grid configuration for bespoke editorial layout.
            gridTemplateColumns: window.innerWidth >= 1024 ? 'minmax(0, 1.6fr) minmax(18.75rem, 0.8fr)' : '1fr'
          } as React.CSSProperties}
        >
          <LatestPosts />
          <DevLabCallout />
        </Box>
      </Stack>
    </Box>
  );
}
