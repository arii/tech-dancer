// impeccable-ignore-file
// src/components/services/ServicesHero.tsx
import { Sparkles } from 'lucide-react';
import { Grid, Stack, Box } from '@/layouts/Primitives';

export const ServicesHero = () => {
  return (
    <Grid cols={{ base: 1, lg: 12 }} gap={12} align="start">
      <Stack gap={6} className="lg:col-span-8">
        <Box as="h4" className="text-accent font-semibold tracking-wider text-sm uppercase">Services</Box>
        <Box as="h1" className="text-5xl font-bold tracking-tight leading-tight">
          Digital business systems for independent creatives
        </Box>
        <Box as="p" className="text-xl text-text-dim max-w-2xl">
          We build and manage the digital side of your business—from your website and online booking to marketing, ecommerce, and automation.
        </Box>
        <Stack direction="row" gap={4} paddingTop={4} className="flex-wrap text-xs font-semibold text-text-dim uppercase tracking-widest">
          <span>Artists</span> • <span>Stylists</span> • <span>Makers</span> • <span>Instructors</span> • <span>Performers</span>
        </Stack>
      </Stack>

      <Box padding={8} radius="2xl" border className="lg:col-span-4 bg-surface/40 border-line/60">
        <Stack as="h3" align="center" gap={2} marginBottom={4} className="text-lg font-semibold text-accent">
          <Sparkles className="w-5 h-5" />
          More than a website.
        </Stack>
        <Box as="p" className="text-text-main leading-relaxed text-sm">
          We're your digital business partner—helping you get found, book clients, sell your work, and grow your audience.
        </Box>
      </Box>
    </Grid>
  );
};
