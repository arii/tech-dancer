import { NavLink } from 'react-router-dom';
import { Box, Stack, Text } from '@/layouts/Primitives';
import { ActionButton } from '@/components/ui/ActionButton';

export function HomeHero() {
  return (
    <Stack
      as="section"
      gap={8}
      justify="center"
      aria-label="BoomTick homepage hero"
      paddingY={{ base: 8, lg: 12 }}
    >
      <Stack as="h1" gap={2}>
        <Text
          as="span"
          variant="hero"
          color="white"
          size={{ base: '4xl', lg: '6xl', xl: '7xl' }}
        >
          Built for dancers.
        </Text>
        <Text
          as="span"
          variant="hero"
          size={{ base: '4xl', lg: '6xl', xl: '7xl' }}
        >
          <span className="hero-accent-color">Train smarter.</span>
        </Text>
        <Text
          as="span"
          variant="hero"
          color="white"
          size={{ base: '4xl', lg: '6xl', xl: '7xl' }}
        >
          Travel better.
        </Text>
      </Stack>

      <Text
        as="p"
        variant="body"
        size={{ base: 'base', lg: 'xl' }}
        color="dim"
        maxWidth="2xl"
        className="leading-relaxed"
      >
        Practical guides for West Coast Swing dancers — training notes, event
        travel tips, gear reviews, and tools for better dance weekends.
      </Text>

      <Box
        display="flex"
        direction={{ base: 'col', sm: 'row' }}
        gap={4}
        width={{ base: 'full', sm: 'auto' }}
      >
        <ActionButton
          as={NavLink}
          to="/events"
          variant="primary"
          paddingX={8}
          minHeight={11}
          width={{ base: 'full', sm: 'auto' }}
        >
          Explore Event Guides
        </ActionButton>
        <ActionButton
          as={NavLink}
          to="/gear"
          variant="secondary"
          paddingX={8}
          minHeight={11}
          width={{ base: 'full', sm: 'auto' }}
        >
          Browse Gear Reviews
        </ActionButton>
      </Box>

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
