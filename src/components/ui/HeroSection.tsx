

import { HeroParticleCanvas } from './HeroParticleCanvas';
import { Stack, Text, Button } from '@/layouts/Primitives';
import { Wordmark } from './Wordmark';
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

      {/* Content sits above the canvas via z-index. */}
      <Stack
        position="relative"
        zIndex={10}
        align="start"
        gap={0}
        paddingX={{ base: 4, md: 8, lg: 4 }}
        paddingTop={{ base: 4, lg: 8 }}
        paddingBottom={{ base: 12, lg: 16 }}
        width="full"
        maxWidth="full"
      >
        <Wordmark
          variant="hero"
          className="hero-logo-anim"
        />

        {/* Vertical Rhythm: Logo -> 32px -> Headline */}
        <Stack
          as="h1"
          marginTop={8} // 32px
          align="start"
          gap={0}
          width="full"
          maxWidth="full"
          className="hero-headline-anim"
        >
          <Text
            as="span"
            variant="h1"
            color="white"
            size={{ base: "5xl", md: "7xl", lg: "8xl" }}
            weight="font-black"
            leading="tight"
          >
            Pack smart.
          </Text>
          <Text
            as="span"
            variant="h1"
            color="accent"
            size={{ base: "5xl", md: "7xl", lg: "8xl" }}
            weight="font-black"
            leading="tight"
          >
            Dance more.
          </Text>
        </Stack>

        {/* Vertical Rhythm: Headline -> 48px -> Subtitle */}
        <Text
          as="p"
          variant="body"
          marginTop={12} // 48px
          weight="font-medium"
          align="left"
          size={{ base: "lg", md: "xl" }}
          maxWidth="[35ch]"
          className="hero-tagline-anim"
        >
          Gear, travel, and tips for better dance weekends.
        </Text>

        {/* Vertical Rhythm: Subtitle -> 32px -> Buttons */}
        <Stack
          direction="row"
          align="center"
          gap={{ base: 6, md: 8 }} // 24px - 32px
          marginTop={8} // 32px
          className="hero-buttons-anim"
        >
          <Button as={NavLink} to="/blog" variant="primary" size="lg">
            Browse Guides
          </Button>
          <Button as={NavLink} to="/blog/2026-04-19-practical-tools-essentials" variant="outline" size="lg">
            Featured Guide →
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
}
