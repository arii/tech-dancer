// impeccable-ignore-file

import { HeroParticleCanvas } from './HeroParticleCanvas';
import { Stack, Text, Box } from '@/layouts/Primitives';
import { NavLink } from 'react-router-dom';
import { ActionButton } from './ActionButton';
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
      align="center"
      justify="center"
      overflow="hidden"
      className="relative hero-section"
      aria-label="Site hero"
    >
      <HeroParticleCanvas />

      {/* Bottom Fade Gradient for better contrast with the site background */}
      <Box
        position="absolute"
        inset="bottom"
        height={48}
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
        paddingX={{ base: 8, md: 12, lg: 24 }}
        paddingY={{ base: 2, lg: 2 }}
        maxWidth="screen-xl"
        marginX="auto"
      >


        <Wordmark variant="hero" className="opacity-0 pointer-events-none hero-logo-anim" />

        {/* Visual-style Headline - Editorial Serif with Balanced Visual Weight */}
        <Stack
          as="h1"
          marginTop={{ base: 5, lg: 6 }}
          align="start"
          gap={0}
          className="opacity-0 pointer-events-auto hero-headline-anim"
        >
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
            Dance better.
          </Text>
        </Stack>

        {/* Gradient Accent Line below headline */}
        <Box
          width={24}
          height={1.5}
          marginTop={6}
          radius="full"
          className="opacity-0 pointer-events-none hero-line-anim"
        />

        {/* Tagline with Vertical Accent Bar */}
        <Stack
          direction="row"
          align="stretch"
          gap={5}
          marginTop={{ base: 6, lg: 8 }}
          maxWidth="2xl"
          className="opacity-0 hero-tagline-anim"
        >
          <Box
            width="2px"
            className="bg-white/20 shrink-0"
            aria-hidden="true"
          />
          <Text
            as="p"
            variant="body"
            weight="font-normal"
            align="left"
            size={{ base: "base", md: "lg", lg: "xl" }}
            className="hero-tagline-text"
          >
            Training tips, travel guides, and gear reviews for competitive West Coast Swing dancers,
            plus technical deep dives into building the platform with DevAI.
          </Text>
        </Stack>

        {/* Waveform - Height fixed and overflow-hidden for layout stability. Margin adjusted for breathing room. */}


        <Stack direction="row" gap={4} marginTop={8} wrap className="opacity-0 hero-cta-anim">
          <ActionButton as={NavLink} to="/events" variant="primary">
            Explore Event Guides
          </ActionButton>
          <ActionButton as={NavLink} to="/gear" variant="secondary">
            Browse Gear Reviews
          </ActionButton>
        </Stack>

        <Box marginTop={5} className="opacity-0 hero-cta-anim">
          <Text as={NavLink} to="/blog/why-finals-are-hard" variant="mono" size="xs" color="dim" className="underline underline-offset-4 transition-colors hover:text-accent">
            New to WCS traveling? Start here →
          </Text>
        </Box>

        <Stack
          direction="row"
          align="end"
          gap={1}
          marginY={4}
          height={12}
          overflow="hidden"
          className="opacity-0 pointer-events-none hero-waveform-anim"
          aria-hidden="true"
        >
          {BARS.map((bar, i) => (
            <Box
              key={i}
              radius="none"
              className="hero-bar"
              style={ {
                '--hero-bar-height': `${bar.height}px`,
                '--hero-bar-dur': bar.dur,
                '--hero-bar-delay': bar.delay,
              } as React.CSSProperties }
            />
          ))}
        </Stack>
      </Stack>

      {/* Scroll Down Indicator - Enhanced Mobile CTA */}
      <Stack
        position="absolute"
        inset="bottom"
        justify="center"
        align="center"
        paddingBottom={8}
        zIndex={10}
        className="opacity-0 hero-cta-anim"
      >

      </Stack>
    </Stack>
  );
}
