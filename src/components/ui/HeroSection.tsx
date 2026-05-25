// impeccable-ignore-file
import { NavLink } from 'react-router-dom';
import { Stack, Text, Box } from '@/layouts/Primitives';
import { HeroParticleCanvas } from './HeroParticleCanvas';
import { ActionButton } from './ActionButton';
import { Wordmark } from './Wordmark';
import { HERO_CONFIG } from '@/config/hero';

const BARS = Array.from({ length: HERO_CONFIG.BAR_COUNT }, (_, i) => ({
  height: 20 + ((i * HERO_CONFIG.SEEDS.BAR_HEIGHT) % 36),
  dur: `${(0.4 + ((i * HERO_CONFIG.SEEDS.BAR_DUR) % 0.8)).toFixed(2)}s`,
  delay: `${((i * HERO_CONFIG.SEEDS.BAR_DELAY) % 0.8).toFixed(2)}s`,
})) as const;

export function HeroSection() {
  return (
    <Stack as="section" align="center" justify="center" overflow="hidden" className="relative hero-section" aria-label="Site hero">
      <HeroParticleCanvas />

      <Box position="absolute" inset="bottom" height={48} zIndex={5} className="hero-bottom-gradient" aria-hidden="true" />

      <Stack
        position="relative"
        zIndex={10}
        align="start"
        gap={0}
        paddingX={{ base: 8, md: 12, lg: 16 }}
        paddingY={{ base: 2, lg: 2 }}
        maxWidth="screen-xl"
        marginX="auto"
      >
        <Wordmark variant="hero" className="opacity-0 pointer-events-none hero-logo-anim" />

        <Stack as="h1" marginTop={{ base: 5, lg: 6 }} align="start" gap={0} className="opacity-0 pointer-events-auto hero-headline-anim">
          <Text as="span" variant="hero" color="white" size={{ base: '3xl', md: '5xl', lg: '6xl' }}>Built for dancers.</Text>
          <Text as="span" variant="hero" size={{ base: '4xl', md: '6xl', lg: '7xl' }}><span className="hero-accent-color">Train smarter.</span></Text>
          <Text as="span" variant="hero" color="white" size={{ base: '4xl', md: '6xl', lg: '7xl' }}>Travel better.</Text>
        </Stack>

        <Box width={24} height={1.5} marginTop={6} radius="full" className="opacity-0 pointer-events-none hero-line-anim" />

        <Stack direction="row" align="stretch" gap={5} marginTop={{ base: 6, lg: 8 }} maxWidth="2xl" className="opacity-0 hero-tagline-anim">
          <Box width="2px" className="bg-white/20 shrink-0" aria-hidden="true" />
          <Text as="p" variant="body" weight="font-normal" align="left" size={{ base: 'base', md: 'lg', lg: 'xl' }} className="hero-tagline-text">
            Practical guides for West Coast Swing dancers—training notes, event travel tips, gear reviews, and tools for better dance weekends.
          </Text>
        </Stack>

        <Stack direction="row" gap={4} marginTop={8} wrap className="opacity-0 hero-cta-anim">
          <ActionButton as={NavLink} to="/events" variant="primary">Explore Guides</ActionButton>
          <ActionButton as={NavLink} to="/gear" variant="secondary">See Reviews</ActionButton>
        </Stack>

        <Box marginTop={5} className="opacity-0 hero-cta-anim">
          <Text as={NavLink} to="/blog/2026-04-18-why-finals-are-hard" variant="mono" size="xs" color="dim" className="underline underline-offset-4 transition-colors hover:text-accent">
            New to WCS? Start Here →
          </Text>
        </Box>

        <Stack direction="row" align="end" gap={1} marginY={4} height={12} overflow="hidden" className="opacity-0 pointer-events-none hero-waveform-anim" aria-hidden="true">
          {BARS.map((bar, i) => (
            <Box
              key={i}
              radius="none"
              className="hero-bar"
              style={{ '--hero-bar-height': `${bar.height}px`, '--hero-bar-dur': bar.dur, '--hero-bar-delay': bar.delay } as React.CSSProperties}
            />
          ))}
        </Stack>
      </Stack>
    </Stack>
  );
}
