// impeccable-ignore-file
import { NavLink } from 'react-router-dom';
import { Box, Stack, Text } from '@/layouts/Primitives';
import { ActionButton } from '@/components/ui/ActionButton';
import { HeroParticleCanvas } from '@/components/ui/HeroParticleCanvas';

export function HomeHero() {
  return (
    <Stack
      as="section"
      gap={5}
      justify="center"
      aria-label="BoomTick homepage hero"
      position="relative"
      className="overflow-hidden py-10 lg:py-16 min-h-[380px]"
    >
      {/* Particle background — decorative, content leads */}
      <Box
        position="absolute"
        inset
        zIndex={0}
        className="pointer-events-none opacity-25 mix-blend-screen"
      >
        <HeroParticleCanvas />
      </Box>

      <Stack position="relative" zIndex={10} gap={5}>
        {/* Headline */}
        <Stack as="h1" gap={0}>
          <Text as="span" variant="hero" color="white" size={{ base: '3xl', md: '5xl', lg: '6xl' }}>
            Built for dancers.
          </Text>
          <Text as="span" variant="hero" size={{ base: '4xl', md: '5xl', lg: '7xl' }}>
            <span className="hero-accent-color">Train smarter.</span>
          </Text>
          <Text as="span" variant="hero" color="white" size={{ base: '4xl', md: '5xl', lg: '7xl' }}>
            Travel better.
          </Text>
        </Stack>

        {/* Tagline */}
        <Text
          as="p"
          variant="body"
          size={{ base: 'base', md: 'lg' }}
          color="dim"
          className="max-w-[600px] leading-relaxed"
        >
          Practical guides for West Coast Swing dancers — training notes, event travel tips,
          gear reviews, and tools for better dance weekends.
        </Text>

        {/* CTAs: full-width stacked on mobile, inline on sm+ */}
        <Stack direction={{ base: 'col', sm: 'row' }} gap={3}>
          <ActionButton
            as={NavLink}
            to="/events"
            variant="primary"
            paddingX={6}
            paddingY={3}
            className="w-full min-h-[44px] rounded-md text-sm sm:w-auto"
          >
            Explore Event Guides
          </ActionButton>
          <ActionButton
            as={NavLink}
            to="/gear"
            variant="secondary"
            paddingX={6}
            paddingY={3}
            className="w-full min-h-[44px] rounded-md text-sm sm:w-auto"
          >
            Browse Gear Reviews
          </ActionButton>
        </Stack>

        {/* Tertiary text link */}
        <Box>
          <Text
            as={NavLink}
            to="/blog"
            variant="mono"
            size="xs"
            color="dim"
            className="underline underline-offset-4 transition-colors hover:text-accent"
          >
            Start with practical training notes →
          </Text>
        </Box>
      </Stack>
    </Stack>
  );
}
