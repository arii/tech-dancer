import { NavLink } from 'react-router-dom';
import { Box, Stack, Text } from '@/layouts/Primitives';
import { ActionButton } from '@/components/ui/ActionButton';
import { HeroParticleCanvas } from '@/components/ui/HeroParticleCanvas';

export function HomeHero() {
  return (
    <Stack as="section" gap={6} justify="center" aria-label="BoomTick homepage hero" position="relative" overflow="hidden" padding={6} lgPadding={12} marginX={-6} lgMarginX={-12} minHeight={400}>
      <Box position="absolute" inset zIndex={0} className="pointer-events-none opacity-50 mix-blend-screen">
        <HeroParticleCanvas />
      </Box>
      <Stack position="relative" zIndex={10} gap={6}>
        <Stack as="h1" gap={1}>
          <Text variant="hero" color="white" size={{ base: '3xl', md: '5xl' }}>
            Built for dancers.
          </Text>
          <Text variant="hero" size={{ base: '4xl', md: '6xl' }}>
            <span className="hero-accent-color">Train smarter.</span>
          </Text>
          <Text variant="hero" color="white" size={{ base: '4xl', md: '6xl' }}>
            Travel better.
          </Text>
        </Stack>

      <Text as="p" variant="body" size={{ base: 'base', md: 'lg' }} color="dim" maxWidth="2xl">
        Practical guides for West Coast Swing dancers — training notes, event travel tips, gear reviews, and tools for better dance weekends.
      </Text>

      <Stack direction={{ base: 'col', sm: 'row' }} gap={3}>
        <ActionButton as={NavLink} to="/events" variant="primary">Explore Event Guides</ActionButton>
        <ActionButton as={NavLink} to="/gear" variant="secondary">Browse Gear Reviews</ActionButton>
      </Stack>

        <Box>
          <Text as={NavLink} to="/blog" variant="mono" size="xs" color="dim" className="underline underline-offset-4 transition-colors hover:text-accent">
            Start with practical training notes →
          </Text>
        </Box>
      </Stack>
    </Stack>
  );
}
