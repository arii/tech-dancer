import { HeroParticleCanvas } from './HeroParticleCanvas';
import { Stack, Text, Box } from '@/layouts/Primitives';
import { Wordmark } from './Wordmark';
import { Hero } from './Hero';
import { Waveform } from './Waveform';

export function HeroSection() {
  return (
    <Hero
      variant="landing"
      background={
        <>
          <HeroParticleCanvas />
          {/* Bottom Fade Gradient for better contrast with the site background */}
          <Box
            position="absolute"
            inset="bottom"
            height={0}
            zIndex={5}
            className="hero-bottom-gradient"
            aria-hidden="true"
          />
        </>
      }
      eyebrow={
        <Wordmark
          variant="hero"
          opacity={0}
          pointerEvents="none"
          className="hero-logo-anim"
        />
      }
      title={
        <Stack gap={0}>
          <Text
            as="span"
            variant="hero"
            color="white"
            size={{ base: "3xl", md: "5xl", lg: "6xl" }}
          >
            Built for dancers.
          </Text>
          <Text
            as="span"
            variant="hero"
            size={{ base: "4xl", md: "6xl", lg: "7xl" }}
          >
            <span className="hero-accent-color">Train smarter.</span>
          </Text>
          <Text
            as="span"
            variant="hero"
            color="white"
            size={{ base: "4xl", md: "6xl", lg: "7xl" }}
          >
            Travel better.
          </Text>
          {/* Gradient Accent Line below headline */}
          <Box
            width={24}
            height={1.5}
            marginTop={2}
            radius="full"
            opacity={0}
            pointerEvents="none"
            className="hero-line-anim"
          />
        </Stack>
      }
      description={
        <Stack
          direction="row"
          align="stretch"
          gap={5}
          width="full"
        >
          <Box
            width="0.5"
            className="bg-white/20 shrink-0"
            aria-hidden="true"
          />
          <Text
            as="span"
            variant="body"
            weight="font-normal"
            align="left"
            size={{ base: "base", md: "lg", lg: "xl" }}
            className="hero-tagline-text"
          >
            Training notes, event guides, gear reviews, and practical tools for better West Coast Swing weekends.
          </Text>
        </Stack>
      }
      afterContent={<Waveform />}
    />
  );
}
