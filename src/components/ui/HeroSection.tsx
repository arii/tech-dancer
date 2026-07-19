

import { HeroParticleCanvas } from './HeroParticleCanvas';
import { Stack, Text, Box } from '@/layouts/Primitives';
import { Wordmark } from './Wordmark';
import { HERO_CONFIG } from '@/config/hero';

// Generate deterministic bar data based on index to prevent visual regression flakiness
const BARS = Array.from({ length: HERO_CONFIG.BAR_COUNT }, (_, i) => ({
  height: 20 + ((i * HERO_CONFIG.SEEDS.BAR_HEIGHT) % 36),
  dur: (0.4 + ((i * HERO_CONFIG.SEEDS.BAR_DUR) % 0.8)).toFixed(2) + 's',
  delay: ((i * HERO_CONFIG.SEEDS.BAR_DELAY) % 0.8).toFixed(2) + 's',
})) as const;

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

      {/* Bottom Fade Gradient for better contrast with the site background */}
      <Box
        position="absolute"
        inset="bottom"
        height={0}
        zIndex={5}
        className="hero-bottom-gradient"
        aria-hidden="true"
      />

      {/* All content sits above the canvas via z-index. Set pointer-events-none on decorative branding to prevent interception of Global Search clicks in tests. */}
      <Stack
        position="relative"
        zIndex={10}
        align="start"
        gap={0}
        paddingX={{ base: 4, md: 8, lg: 12 }}
        paddingTop={{ base: 2, lg: 8 }}
        paddingBottom={{ base: 0, lg: 0 }}
        maxWidth="screen-xl"
        marginX={{ base: 0, xl: "auto" }}
      >


        <Wordmark
          variant="hero"
          opacity={0}
          pointerEvents="none"
          className="hero-logo-anim"
        />

        {/* Visual-style Headline - Editorial Serif with Balanced Visual Weight */}
        <Stack
          as="h1"
          marginTop={{ base: 2, lg: 6 }}
          align="start"
          gap={0}
          width="full"
          maxWidth="full"
          opacity={0}
          pointerEvents="auto"
          className="hero-headline-anim"
        >
          <Text
            as="span"
            variant="hero"
            color="white"
            size={{ base: "3xl", md: "5xl", lg: "6xl" }}
            display="block"
          >
            Pack smart.
          </Text>
          <Text
            as="span"
            variant="hero"
            size={{ base: "4xl", md: "6xl", lg: "7xl" }}
            display="block"
          >
            <span className="hero-accent-color">Dance more.</span>
          </Text>
        </Stack>

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

        {/* Tagline with Vertical Accent Bar */}
        <Stack
          direction="row"
          align="stretch"
          gap={5}
          marginTop={{ base: 1, lg: 4 }}
          maxWidth="2xl"
          opacity={0}
          className="hero-tagline-anim"
        >
          <Box
            width="0.5"
            className="bg-white/20 shrink-0"
            aria-hidden="true"
          />
          <Text
            as="p"
            variant="body"
            weight="font-normal"
            align="left"
            size={{ base: "sm", md: "lg", lg: "xl" }}
            className="hero-tagline-text"
          >
            The west coast swing dancer's guide to gear, travel, and better dance weekends.
          </Text>
        </Stack>

        {/* Waveform - Height fixed and overflow-hidden for layout stability. Margin adjusted for breathing room. */}




        <Stack
          direction="row"
          align="end"
          gap={1}
          marginY={4}
          height={12}
          width="full"
          maxWidth="full"
          overflow="hidden"
          opacity={0}
          pointerEvents="none"
          className="hero-waveform-anim [content-visibility:auto] [contain-intrinsic-size:var(--spacing-12)]"
          aria-hidden="true"
        >
          {BARS.map((bar, i) => (
            <Box
              key={i}
              radius="none"
              className="hero-bar"
              style={ {
                '--hero-bar-height': `${bar.height / 16}rem`,
                '--hero-bar-dur': bar.dur,
                '--hero-bar-delay': bar.delay,
              } as React.CSSProperties }
            />
          ))}
        </Stack>
      </Stack>

    </Stack>
  );
}
