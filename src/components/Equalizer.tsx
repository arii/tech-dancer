import { useMemo } from 'react';
import { motion } from 'motion/react';
import { Box } from '@/layouts/Primitives';

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

  return (
    <Box
      pointerEvents="none"
      position="relative"
      display="flex"
      height="full"
      width="full"
      align="end"
      justify="center"
      gap={1}
      overflow="hidden"
      paddingX={4}
      paddingBottom={4.5}
    >
      <Box
        as={motion.div}
        aria-hidden
        position="absolute"
        inset="x"
        bottom={0}
        height={24}
        backdropBlur="2xl"
        opacity={0.22}
        className="bg-gradient-to-t from-primary/15 via-secondary/8 to-transparent"
      />
      {bars.map((bar, i) => (
        <Box
          as={motion.div}
          key={i}
          animate={{
            height: [bar.minH, bar.maxH, bar.minH],
          }}
          transition={{
            duration: bar.duration,
            repeat: Infinity,
            delay: bar.delay,
            ease: "easeInOut",
          }}
          width="full"
          maxWidth={1}
          radius="full"
          style={{ // impeccable-ignore - Dynamic data-driven gradients and hero-specific shadows require inline injection for the waveform visual.
            backgroundColor: 'transparent',
            background: `linear-gradient(180deg, var(--raw-color-accent-brand), var(--raw-color-accent-purple), var(--raw-color-accent-magenta))`,
            boxShadow: `0 0 var(--spacing-3.5) var(--hero-accent-shadow)`,
            opacity: bar.opacity,
          }}
        />
      ))}
    </Box>
  );
};
