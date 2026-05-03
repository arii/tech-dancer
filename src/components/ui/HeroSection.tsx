import { Box, Stack, Text } from '@/layouts/Primitives';
import { HeroParticleCanvas } from './HeroParticleCanvas';

export function HeroSection() {
  return (
    <Box
      as="section"
      position="relative"
      width="full"
      overflow="hidden"
      className="bg-[var(--hero-bg)] border-b border-line"
      style={{ minHeight: '60vh' }}
    >
      <HeroParticleCanvas />

      <Box
        position="absolute"
        className="inset-0 pointer-events-none z-0"
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(0,207,255,0.05) 0%, transparent 70%)',
        }}
      />

      <Stack
        position="relative"
        direction="col"
        align="center"
        justify="center"
        gap={6}
        className="z-10 h-full min-h-[60vh] text-center px-4"
      >
        <Text
          as="h1"
          variant="display"
          size="fluid-7"
          weight="font-black"
          className="text-[var(--hero-accent)] tracking-tight animate-fadeUp"
          style={{ textShadow: '0 0 40px rgba(0, 207, 255, 0.3)' }}
        >
          BOOMTICK.BLOG
        </Text>

        <Text
          as="p"
          variant="body"
          size="xl"
          className="max-w-prose animate-fadeIn opacity-90 text-white"
          style={{ animationDelay: '200ms', animationFillMode: 'both' }}
        >
          The West Coast Swing Lifestyle Blog by Tech Dancer.
          Technical systems and travel hacks for the modern competitive dancer.
        </Text>

        {/* Minimal waveform decoration */}
        <Box display="flex" gap={1} align="center" paddingTop={8} className="animate-fadeIn" style={{ animationDelay: '400ms', animationFillMode: 'both' }}>
          {[...Array(5)].map((_, i) => (
            <Box
              key={i}
              className="w-1 bg-accent rounded-full animate-bounce"
              style={{
                height: `${Math.max(12, Math.random() * 32)}px`,
                animationDelay: `${i * 100}ms`,
              }}
            />
          ))}
        </Box>
      </Stack>
    </Box>
  );
}
