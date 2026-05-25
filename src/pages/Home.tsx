// impeccable-ignore-file
import { NavLink } from 'react-router-dom';
import { SEO } from '@/components/SEO';
import { HeroSection } from '@/components/ui/HeroSection';
import { Box, Stack, Text } from '@/layouts/Primitives';
import { STATIC_SCHEMAS, ASSET_PREFIX } from '@/config/constants';
import { FeaturedGuidePanel } from '@/features/home/FeaturedGuidePanel';
import { TopicGrid } from '@/features/home/TopicGrid';
import { FeaturedEventGuide } from '@/features/home/FeaturedEventGuide';
import { GearShelf } from '@/features/home/GearShelf';
import { LatestPosts } from '@/features/home/LatestPosts';
import { DevLabCallout } from '@/features/home/DevLabCallout';

export default function Home() {
  return (
    <Box as="main" className="pb-safe-bottom">
      <SEO
        title="Home"
        description="BoomTick: Training tips, travel guides, and gear reviews for West Coast Swing dancers, plus technical deep dives into building the platform with DevAI."
        schema={STATIC_SCHEMAS.HOME}
      />

      <Box display="grid" className="min-h-[420px] lg:grid-cols-[1fr_380px]">
        <HeroSection />
        <FeaturedGuidePanel />
      </Box>

      <Box className="lg:hidden" padding={4}
      >
        <Box as={NavLink} to="/gear/2026-04-19-gear-essentials" display="flex" direction="col" gap={3} padding={4} border radius="lg" className="group bg-surface">
          <Box width="full" height={48} radius="md" overflow="hidden" className="bg-surface-alt">
            <img src={`${ASSET_PREFIX}/assets/events/jjo-hero.jpg`} alt="WCS Travel Pack" className="h-full w-full object-cover" />
          </Box>
          <Stack gap={1}>
            <Text variant="mono" size="xs" color="accent" weight="font-bold" uppercase>Featured Guide</Text>
            <Text variant="body" size="lg" weight="font-black" className="transition-colors group-hover:text-accent">The WCS Travel Pack</Text>
            <Text variant="body" size="sm" color="dim">Your checklist for a smoother, better dance weekend.</Text>
            <Text variant="mono" size="xs" color="accent" marginTop={2}>Read the guide →</Text>
          </Stack>
        </Box>
      </Box>

      <Stack gap={12} padding="panel" className="mx-auto max-w-screen-xl">
        <TopicGrid />
        <Box display="grid" className="gap-12 lg:grid-cols-[1fr_340px]">
          <FeaturedEventGuide />
          <GearShelf />
        </Box>
        <Box display="grid" className="gap-12 lg:grid-cols-[1fr_340px]">
          <LatestPosts />
          <DevLabCallout />
        </Box>
      </Stack>
    </Box>
  );
}
