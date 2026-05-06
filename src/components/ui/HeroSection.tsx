// impeccable-ignore-file
import { useMemo } from 'react';
import { HeroParticleCanvas } from './HeroParticleCanvas';
import { Stack, Text, Box } from '@/layouts/Primitives';
import { Logo } from './Logo';
import { HERO_CONFIG } from '@/config/hero';

interface WaveBar {
  height: number;
  dur: string;
  delay: string;
}

export function HeroSection() {
  const BAR_COUNT = HERO_CONFIG.BAR_COUNT;
  const SEEDS = HERO_CONFIG.SEEDS;

  // Generate deterministic bar data based on index to prevent visual regression flakiness
  const bars: WaveBar[] = useMemo(() =>
    Array.from({ length: BAR_COUNT }, (_, i) => ({
      height: 20 + ((i * SEEDS.BAR_HEIGHT) % 36),
      dur: (0.4 + ((i * SEEDS.BAR_DUR) % 0.8)).toFixed(2) + 's',
      delay: ((i * SEEDS.BAR_DELAY) % 0.8).toFixed(2) + 's',
    })),
  [BAR_COUNT, SEEDS]);

  return (
    <section
      className="relative flex items-center justify-center overflow-hidden"
      style={{ background: 'var(--hero-bg)', minHeight: '75vh' }}
      aria-label="Site hero"
    >
      <HeroParticleCanvas />

      {/* Bottom Fade Gradient for better contrast with the site background */}
      <Box
        position="absolute"
        inset="bottom"
        height={48}
        className="bg-gradient-to-t from-bg to-transparent z-[5]"
        aria-hidden="true"
      />

      {/* All content sits above the canvas via z-index. Set pointer-events-none on decorative branding to prevent interception of Global Search clicks in tests. */}
      <Stack
        relative
        zIndex={10}
        align="center"
        gap={0}
        className="text-center px-6 pointer-events-none"
        paddingY={{ base: HERO_CONFIG.MOBILE_PY, lg: HERO_CONFIG.DESKTOP_PY }}
      >

        {/* Top Label: WEST COAST SWING */}
        <Box
          display="flex"
          align="center"
          gap={2}
          marginBottom={{ base: 4, lg: 6 }}
          className="opacity-0"
          style={{ animation: 'fadeIn 0.8s ease forwards 0.1s' }}
        >
          <Box width={{ base: 4, lg: 8 }} height="px" style={{ background: 'var(--hero-accent)' }} />
          <Text variant="mono" size={{ base: "tiny", lg: "micro" }} weight="font-bold" style={{ color: 'var(--hero-accent)', letterSpacing: '2px' }}>
            WEST COAST SWING
          </Text>
        </Box>

        {/* Logo mark — B + \ (backslash) */}
        <Box
          className="opacity-0 translate-y-[-20px] pointer-events-none"
          style={{ 
            height: 'clamp(80px, 12vw, 120px)',
            animation: 'fadeUp 0.8s ease forwards 0.2s' 
          }}
        >
          <Logo className="text-white" showText={false} />
        </Box>

        {/* Wordmark: boomtick.blog */}
        <Box
          variant="display"
          weight="font-bold"
          className="text-white -mt-1 opacity-0 translate-y-2.5 pointer-events-none"
          style={{
            fontSize: 'clamp(18px, 4vw, 28px)',
            letterSpacing: '-0.5px',
            animation: 'fadeUp 0.7s ease forwards 0.4s',
          }}
        >
          boom<span style={{ color: 'var(--hero-accent)' }}>tick</span><span style={{ color: 'rgba(255,255,255,0.4)' }}>.blog</span>
        </Box>

        {/* Visual-style Headline - Resized significantly to 'base' per persistent feedback to match "original aesthetic" */}
        <Stack
          marginTop={{ base: 4, lg: 6 }}
          align="center"
          gap={0}
          className="opacity-0 translate-y-2.5 pointer-events-none"
          style={{ animation: 'fadeUp 0.7s ease forwards 0.7s' }}
        >
          <Text
            variant="headline"
            size="base"
            weight="font-black"
            color="white"
            tracking="tight"
            className="leading-none"
          >
            Built for dancers.
          </Text>
          <Text
            variant="headline"
            size="base"
            weight="font-black"
            tracking="tight"
            className="leading-none"
          >
            <span style={{ color: 'var(--hero-accent)' }}>Train</span>{' '}
            <span style={{
              background: 'linear-gradient(to right, var(--hero-accent) 0%, #8B2FFF 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              smarter.
            </span>
          </Text>
          <Text
            variant="headline"
            size="base"
            weight="font-black"
            color="white"
            tracking="tight"
            className="leading-none"
          >
            Dance better.
          </Text>
        </Stack>

        {/* Gradient Accent Line below headline */}
        <Box
          width={24}
          height={1.5}
          marginTop={8}
          radius="full"
          className="opacity-0 pointer-events-none"
          style={{
            background: 'linear-gradient(to right, var(--hero-accent), #8B2FFF)',
            animation: 'fadeIn 1s ease forwards 1.2s'
          }}
        />

        {/* Reverted Tagline - Scaled and constrained for mobile readability */}
        <Text
          as="p"
          variant="body"
          size={{ base: "sm", lg: "xl" }}
          marginTop={{ base: 6, lg: 8 }}
          maxWidth={{ base: "72", lg: "xl" }}
          className="opacity-0 leading-relaxed text-white pointer-events-none text-center mx-auto"
          style={{
            animation: 'fadeUp 0.7s ease forwards 1.4s',
          }}
        >
          Systems, gear, and travel insights for competitive West Coast Swing dancers.
        </Text>

        {/* Waveform - Height fixed and overflow-hidden for layout stability. Margin adjusted for breathing room. */}
        <Box
          display="flex"
          align="end"
          gap={1}
          marginTop={12}
          marginBottom={8}
          height={16}
          overflow="hidden"
          className="opacity-0 pointer-events-none"
          style={{ animation: 'fadeIn 1s ease forwards 2.0s' }}
          aria-hidden="true"
        >
          {bars.map((bar, i) => (
            <Box
              key={i}
              radius="none"
              className="hero-bar"
              style={{
                '--hero-bar-height': `${bar.height}px`,
                '--hero-bar-dur': bar.dur,
                '--hero-bar-delay': bar.delay,
              } as React.CSSProperties}
            />
          ))}
        </Box>
      </Stack>
    </section>
  );
}
