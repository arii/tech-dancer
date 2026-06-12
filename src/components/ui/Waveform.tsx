import { Box, Stack } from '@/layouts/Primitives';
import { HERO_CONFIG } from '@/config/hero';

// Generate deterministic bar data based on index to prevent visual regression flakiness
const BARS = Array.from({ length: HERO_CONFIG.BAR_COUNT }, (_, i) => ({
  height: 20 + ((i * HERO_CONFIG.SEEDS.BAR_HEIGHT) % 36),
  dur: (0.4 + ((i * HERO_CONFIG.SEEDS.BAR_DUR) % 0.8)).toFixed(2) + 's',
  delay: ((i * HERO_CONFIG.SEEDS.BAR_DELAY) % 0.8).toFixed(2) + 's',
})) as const;

interface WaveformProps {
  opacity?: number;
  className?: string;
}

export function Waveform({ opacity = 0, className = "hero-waveform-anim" }: WaveformProps) {
  return (
    <Stack
      direction="row"
      align="end"
      gap={1}
      marginY={4}
      height={12}
      width="full"
      maxWidth="full"
      overflow="hidden"
      opacity={opacity}
      pointerEvents="none"
      className={className}
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
  );
}
