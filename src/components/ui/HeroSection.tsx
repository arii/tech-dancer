// impeccable-ignore-file
import { useMemo } from 'react';
import { HeroParticleCanvas } from './HeroParticleCanvas';
import { Stack, Text, Box } from '@/layouts/Primitives';

// Number of waveform bars — matches the HTML
const BAR_COUNT = 48;

interface WaveBar {
  height: number;
  dur: string;
  delay: string;
}

export function HeroSection() {
  // Generate bar data once on mount (stable across re-renders)
  const bars: WaveBar[] = useMemo(() =>
    Array.from({ length: BAR_COUNT }, () => ({
      height: 20 + Math.random() * 36,
      dur: (0.4 + Math.random() * 0.8).toFixed(2) + 's',
      delay: (Math.random() * 0.8).toFixed(2) + 's',
    })),
  []);

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

      {/* All content sits above the canvas via z-index */}
      <Stack relative zIndex={10} align="center" gap={0} className="text-center px-6 py-20">

        {/* Logo mark — B + \ (backslash) */}
        <div
          className="flex items-end leading-none opacity-0 translate-y-[-20px]"
          style={{ animation: 'fadeUp 0.8s ease forwards 0.2s' }}
        >
          <span
            className="font-display font-black text-white"
            style={{ fontSize: 'clamp(80px, 12vw, 120px)', letterSpacing: '-4px' }}
          >
            B
          </span>
          <div
            className="rounded-md"
            style={{
              width: 'clamp(8px, 1.2vw, 12px)',
              height: 'clamp(70px, 10vw, 100px)',
              marginLeft: 'clamp(6px, 0.8vw, 10px)',
              marginBottom: 'clamp(8px, 1.2vw, 14px)',
              background: 'var(--hero-slash-gradient)',
              transform: 'skewX(12deg)', // Changed to positive to look like \
              boxShadow: 'var(--hero-slash-glow)',
              animation: 'glowPulse 2.5s ease-in-out infinite alternate',
            }}
          />
        </div>

        {/* Wordmark: boomtick.blog */}
        <div
          className="font-display font-bold text-white -mt-1.5 opacity-0 translate-y-2.5"
          style={{
            fontSize: 'clamp(24px, 4vw, 36px)',
            letterSpacing: '-0.5px',
            animation: 'fadeUp 0.7s ease forwards 0.6s',
          }}
        >
          boom<span style={{ color: 'var(--hero-accent)' }}>tick.blog</span>
        </div>

        {/* High Impact Headline */}
        <Text
          variant="headline"
          size="fluid-7"
          weight="font-semibold"
          color="white"
          tracking="tight"
          marginTop={8}
          className="opacity-0 translate-y-2.5 max-w-4xl"
          style={{
            animation: 'fadeUp 0.7s ease forwards 0.9s',
          }}
        >
          Train smarter. Travel better. Win more.
        </Text>

        {/* Reverted Tagline */}
        <Text
          as="p"
          variant="body"
          size={{ base: "lg", lg: "xl" }}
          color="dim"
          marginTop={4}
          maxWidth="xl"
          className="opacity-0 leading-relaxed text-white/80"
          style={{
            animation: 'fadeUp 0.7s ease forwards 1.2s',
          }}
        >
          Systems, gear, and travel insights for competitive West Coast Swing dancers.
        </Text>

        {/* Waveform */}
        <div
          className="flex items-end gap-1 mt-10 opacity-0"
          style={{ height: 56, animation: 'fadeIn 1s ease forwards 1.8s' }}
          aria-hidden="true"
        >
          {bars.map((bar, i) => (
            <div
              key={i}
              className="rounded-t-sm"
              style={{
                width: 'clamp(3px, 0.6vw, 5px)',
                height: bar.height,
                background: 'var(--hero-slash-gradient)',
                opacity: 0.75,
                animation: `bounce ${bar.dur} ease-in-out infinite alternate ${bar.delay}`,
              }}
            />
          ))}
        </div>
      </Stack>
    </section>
  );
}
