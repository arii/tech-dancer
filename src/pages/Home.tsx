import { SEO } from '@/components/SEO';
import { Box, Stack, Grid } from '@/layouts/Primitives';
import { STATIC_SCHEMAS } from '@/config/constants';
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
      maxWidth="[var(--raw-width-home-max)]"
      minWidth={0}
      overflowX="clip"
      paddingX={{ base: 4, sm: 6, lg: 8 }}
      paddingBottom="safe-bottom"
    >
      <SEO
        title="Home"
        description="Training notes, blog insights, and practical tools for better West Coast Swing dance events."
        schema={STATIC_SCHEMAS.HOME}
      />

      <HeroSection />

      <Stack
        gap={{ base: 8, lg: 'section-spacing' }}
        marginTop={{ base: 8, lg: 'section-spacing' }}
        width="full"
        maxWidth="full"
        minWidth={0}
      >
        <Grid
          cols={{ base: 1, lg: '[minmax(0,1.6fr)_minmax(var(--raw-width-sidebar),0.8fr)]' }}
          gap={8}
          width="full"
          maxWidth="full"
          minWidth={0}
        >
          <LatestPosts />
          <DevLabCallout />
        </Grid>
        <TopicGrid />
      </Stack>
    </Box>
  );
}
