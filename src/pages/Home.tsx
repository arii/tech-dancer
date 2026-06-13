// impeccable-ignore-file
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
    <Box as="section" aria-label="Home content" className="mx-auto w-full max-w-[1240px] min-w-0 overflow-x-clip px-4 sm:px-6 lg:px-8 pb-safe-bottom">
      <SEO
        title="Home"
        description="BoomTick: Training tips, travel guides, and gear reviews for West Coast Swing dancers."
        schema={STATIC_SCHEMAS.HOME}
      />

      {/* Hero + Featured Guide: editorial two-column on desktop, stacked on mobile */}
      <Box
        as="section"
        display="grid"
        className="w-full max-w-full min-w-0 items-center gap-0 lg:gap-6 lg:grid-cols-[minmax(0,1fr)_420px]"
      >
        <HeroSection />
        <FeaturedGuidePanel />
      </Box>

      <Stack
        gap={{ base: 8, lg: 'section-spacing' }}
        marginTop={{ base: 8, lg: 'section-spacing' }}
        className="w-full max-w-full min-w-0"
      >
        <Box
          display="grid"
          className="w-full max-w-full min-w-0 gap-8 lg:grid-cols-[minmax(0,1.6fr)_minmax(300px,0.8fr)]"
        >
          <FeaturedEventGuide />
          <GearShelf />
        </Box>


        <Box width="full" surface="alt" paddingY={12} paddingX={{ base: 4, md: 12 }} border radius="xl" className="border-accent/10 relative overflow-hidden">
           <Box position="absolute" top={0} left={0} width="full" height={1} className="bg-gradient-to-r from-transparent via-accent/50 to-transparent" />
           <Stack direction={{ base: 'col', lg: 'row' }} align="center" gap={12}>
              <Stack gap={4} flex={1}>
                <Text variant="mono" size="xs" color="accent" weight="font-black" uppercase tracking="widest">Built with AI</Text>
                <Text variant="display" size="3xl" weight="font-black">The DevAI Portfolio</Text>
                <Text variant="body" size="lg" color="dim" className="leading-relaxed text-pretty">
                  A live production testbed where every feature and data pipeline is audited and optimized by autonomous developer agents.
                </Text>
              </Stack>
              <Box className="shrink-0">
                <ActionButton as={NavLink} to="/research" variant="primary" paddingX={10} paddingY={4} className="text-sm uppercase tracking-widest">
                  View Systems →
                </ActionButton>
              </Box>
           </Stack>
        </Box>

        <Box
          display="grid"
          className="w-full max-w-full min-w-0 gap-8 lg:grid-cols-[minmax(0,1.6fr)_minmax(300px,0.8fr)]"
        >
          <LatestPosts />
          <GearShelf />
        </Box>
        <TopicGrid />
      </Stack>
    </Box>
  );
}
