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
        description="BoomTick: Practical guides, event travel notes, and gear reviews for competitive West Coast Swing dancers."
        schema={STATIC_SCHEMAS.HOME}
      />

      <Box display="grid" className="min-h-[360px] lg:grid-cols-[1fr_380px]">
        <HeroSection />
        <FeaturedGuidePanel />
      </Box>

      <Box className="lg:hidden" padding={4}>
        <Box as={NavLink} to="/blog/2026-04-19-gear-essentials" display="flex" gap={4} padding={4} border radius="lg" className="group bg-surface">
          <Stack gap={1} flex>
            <Text variant="mono" size="xs" color="accent" weight="font-bold" uppercase>Featured Guide</Text>
            <Text variant="body" size="lg" weight="font-black" className="transition-colors group-hover:text-accent">The WCS Travel Pack</Text>
            <Text variant="body" size="sm" color="dim">Your checklist for a smoother, better dance weekend.</Text>
            <Text variant="mono" size="xs" color="accent" marginTop={2}>Read the guide →</Text>
          </Stack>
          <Box width={20} height={20} radius="md" overflow="hidden" className="shrink-0 bg-surface-alt">
            <img src={`${ASSET_PREFIX}/assets/events/jjo-hero.jpg`} alt="WCS Travel Pack" className="h-full w-full object-cover" />
          </Box>
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
