// impeccable-ignore-file
import { useMemo } from 'react';
import { Box, Stack } from '@/layouts/Primitives';

const NUM_BARS = 28;

export const Equalizer = () => {
  const bars = useMemo(() => {
    return Array.from({ length: NUM_BARS }).map((_, i) => {
      const ratio = i / (NUM_BARS - 1);
      const wave = Math.sin(ratio * Math.PI);
      const minH = 4 + wave * 12;
      const maxH = 24 + wave * 48;

      return {
        minH,
        maxH,
        delay: i * 0.045,
        duration: 2.8 + (i % 5) * 0.32,
        opacity: 0.45 + wave * 0.3,
      };
    });
  }, []);

  const barStyle = useMemo(() => ({
    backgroundColor: 'transparent',
    background: 'linear-gradient(180deg, var(--raw-color-accent-brand), var(--raw-color-accent-purple), var(--raw-color-accent-magenta))',
    boxShadow: '0 0 14px var(--hero-accent-shadow)',
  }), []);

  return (
    <Stack
      direction="row"
      align="end"
      justify="center"
      height="full"
      width="full"
      gap="[4px]"
      overflow="hidden"
      paddingX={4}
      paddingBottom="[18px]"
      position="relative"
      className="pointer-events-none"
    >
      <Box
        aria-hidden
        position="absolute"
        inset="x"
        bottom={0}
        height={24}
        opacity={0.22}
        className="bg-gradient-to-t from-primary/15 via-secondary/8 to-transparent blur-2xl"
      />
      {bars.map((bar, i) => {
        const barVars = {
          ...barStyle,
          '--min-h': bar.minH / 64,
          '--max-h': bar.maxH / 64,
          '--duration': `${bar.duration}s`,
          '--delay': `${bar.delay}s`,
          opacity: bar.opacity,
        } as React.CSSProperties;

        return (
          <Box
            key={i}
            width="full"
            maxWidth="[4px]"
            height="[64px]"
            radius="full"
            className="animate-equalizer-bar"
            style={barVars}
          />
        );
      })}
    </Stack>
  );
};
