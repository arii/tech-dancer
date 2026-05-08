// impeccable-ignore-file
import { useMemo } from 'react';
import { HeroParticleCanvas } from './HeroParticleCanvas';
import { Stack, Text, Box } from '@/layouts/Primitives';
import { Logo } from './Logo';
import { Wordmark } from './Wordmark';
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
      style={{ background: 'var(--hero-bg)', minHeight: '40vh' }}
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
        align="start"
        gap={0}
        className="px-8 md:px-12 lg:px-24"
        paddingY={{ base: 2, lg: 2 }}
        maxWidth="screen-xl"
        marginX="auto"
      >


        {/* Logo mark — B icon with wordmark */}
        <Box
          className="opacity-0 translate-y-[-20px] pointer-events-none"
          style={{
            height: 'clamp(60px, 10vw, 120px)',
            animation: 'fadeUp 0.8s ease forwards 0.2s',
            marginLeft: '-12px', // Optical alignment: align vertical spine of italic B with text below
          }}
        >
          <Logo className="text-white" showText={false} />
        </Box>

        {/* Wordmark: boomtick.blog - matches sidebar styling */}
        <Wordmark
          variant="hero"
          className="mt-3 opacity-0 translate-y-2.5 pointer-events-none"
          style={{
            fontSize: 'clamp(18px, 4vw, 28px)',
            animation: 'fadeUp 0.7s ease forwards 0.4s',
          }}
        />

        {/* Visual-style Headline - Editorial Serif with Balanced Visual Weight */}
        <Stack
          as="h1"
          marginTop={{ base: 5, lg: 6 }}
          align="start"
          gap={0}
          className="opacity-0 translate-y-2.5 pointer-events-auto"
          style={{ animation: 'fadeUp 0.7s ease forwards 0.7s' }}
        >
          <Text
            as="span"
            variant="hero"
            color="white"
            className="text-3xl md:text-5xl lg:text-6xl"
          >
            Built for dancers.
          </Text>
          <Text
            as="span"
            variant="hero"
            className="text-[2rem] md:text-[3.5rem] lg:text-[4rem]"
          >
            <span style={{ color: 'var(--hero-accent)' }}>Train smarter.</span>
          </Text>
          <Text
            as="span"
            variant="hero"
            color="white"
            className="text-[2rem] md:text-[3.5rem] lg:text-[4rem]"
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
          className="opacity-0 pointer-events-none"
          style={{
            background: 'linear-gradient(to right, var(--hero-accent), #8B2FFF)',
            animation: 'fadeIn 1s ease forwards 1.2s'
          }}
        />

        {/* Tagline with Vertical Accent Bar */}
        <Box
          display="flex"
          align="stretch"
          gap={5}
          marginTop={{ base: 6, lg: 8 }}
          maxWidth="2xl"
          className="opacity-0"
          style={{
            animation: 'fadeUp 0.7s ease forwards 1.4s',
            paddingLeft: 'clamp(0px, 2vw, 32px)', // Mobile inset for readability
            paddingRight: 'clamp(0px, 2vw, 32px)',
          }}
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
            className="text-base md:text-lg lg:text-xl text-left"
            style={{
              lineHeight: '1.8',

              maxWidth: '65ch'
            }}
          >
            Training tips, travel guides, and gear reviews for competitive West Coast Swing dancers,
            plus technical deep dives into building the platform with DevAI.
          </Text>
        </Box>

        {/* Waveform - Height fixed and overflow-hidden for layout stability. Margin adjusted for breathing room. */}
        <Box
          display="flex"
          align="end"
          gap={1}
          marginTop={4}
          marginBottom={4}
          height={12}
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

      {/* Scroll Down Indicator - Enhanced Mobile CTA */}
      <Box
        position="absolute"
        inset="bottom"
        display="flex"
        justify="center"
        paddingBottom={8}
        zIndex={10}
        className="opacity-0"
        style={{ animation: 'fadeIn 1s ease forwards 2.5s' }}
      >

      </Box>
    </section>
  );
}
