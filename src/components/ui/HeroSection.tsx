

import { HeroParticleCanvas } from './HeroParticleCanvas';
import { Stack, Text, Box, Button } from '@/layouts/Primitives';
import { NavLink } from 'react-router-dom';

export function HeroSection() {

  return (
    <Stack
      as="section"
      align="start"
      justify="center"
      overflow="hidden"
      position="relative"
      width="full"
      maxWidth="full"
      minWidth={0}
      gap={0}
      className="hero-section"
      aria-label="Site hero"
    >
      <HeroParticleCanvas />

      {/* All content sits above the canvas via z-index. */}
      <Stack
        position="relative"
        zIndex={10}
        align="start"
        gap={0}
        paddingX={{ base: 4, md: 8, lg: 0 }}
        paddingTop={{ base: 4, lg: 0 }}
        paddingBottom={{ base: 8, lg: 12 }}
        maxWidth="full"
        width="full"
      >
        {/* Wordmark removed from Hero to reduce visual weight and avoid redundancy with Nav */}

        {/* Visual-style Headline - Editorial Serif with Balanced Visual Weight */}
        <Stack
          as="h1"
          align="start"
          gap={0}
          width="full"
          maxWidth="full"
          pointerEvents="auto"
          marginBottom={6}
        >
          <Text
            as="span"
            variant="hero"
            color="white"
            size={{ base: "5xl", md: "7xl", lg: "8xl" }}
            weight="font-black"
            leading="[0.95]"
            tracking="[-0.04em]"
          >
            Pack smart.
          </Text>
          <Text
            as="span"
            variant="hero"
            color="white"
            size={{ base: "5xl", md: "7xl", lg: "8xl" }}
            weight="font-black"
            leading="[0.95]"
            tracking="[-0.04em]"
          >
            Dance more.
          </Text>
        </Stack>

        <Text
          as="p"
          variant="body"
          weight="font-normal"
          align="left"
          size={{ base: "lg", md: "xl", lg: "2xl" }}
          color="white"
          maxWidth="xl"
        >
          Gear, travel, and tips for better dance weekends.
        </Text>

        <Box marginTop={10}>
          <Button
            as={NavLink}
            to="/blog"
            variant="primary"
            size="lg"
            paddingX={8}
            paddingY={4}
            className="text-lg"
          >
            Browse Guides
          </Button>
        </Box>
      </Stack>
    </Stack>
  );
}
