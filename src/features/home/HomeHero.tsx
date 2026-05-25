import { NavLink } from 'react-router-dom';
import { Box, Stack, Text } from '@/layouts/Primitives';
import { ActionButton } from '@/components/ui/ActionButton';

export function HomeHero() {
  return (
    <Stack as="section" gap={{ base: 6, md: 7 }} justify="center" aria-label="BoomTick homepage hero">
      <Stack as="h1" gap={1} className="max-w-3xl">
        <Text as="span" variant="hero" color="white" size={{ base: '3xl', md: '5xl', lg: '6xl', xl: '7xl' }}>
          Built for dancers.
        </Text>
        <Text as="span" variant="hero" size={{ base: '4xl', md: '6xl', lg: '7xl', xl: '8xl' }}>
          <span className="hero-accent-color">Train smarter.</span>
        </Text>
        <Text as="span" variant="hero" color="white" size={{ base: '4xl', md: '6xl', lg: '7xl', xl: '8xl' }}>
          Travel better.
        </Text>
      </Stack>

      <Text as="p" variant="body" size={{ base: 'base', md: 'lg' }} color="dim" className="max-w-3xl">
        Practical guides for West Coast Swing dancers — training notes, event travel tips, gear reviews, and tools for better dance weekends.
      </Text>

      <Stack direction={{ base: 'col', md: 'row' }} gap={3} className="max-w-3xl">
        <ActionButton
          as={NavLink}
          to="/events"
          variant="primary"
          minHeight={11}
          width={{ base: 'full', md: 'auto' }}
          paddingX={6}
          paddingY={3}
        >
          Explore Event Guides
        </ActionButton>
        <ActionButton
          as={NavLink}
          to="/gear"
          variant="secondary"
          minHeight={11}
          width={{ base: 'full', md: 'auto' }}
          paddingX={6}
          paddingY={3}
        >
          Browse Gear Reviews
        </ActionButton>
      </Stack>

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
  );
}
