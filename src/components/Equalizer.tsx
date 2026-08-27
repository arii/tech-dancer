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
    <Box className="pointer-events-none relative overflow-hidden" display="flex" align="end" justify="center" gap={1} paddingX={4} paddingBottom={4} height="full" width="full"> {}
      <motion.div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-primary/15 via-secondary/8 to-transparent blur-2xl opacity-20"
      />
      {bars.map((bar, i) => (
        <motion.div
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
          className="w-full max-w-1 rounded-full bg-transparent bg-accent shadow-sm"
          style={ {
            opacity: bar.opacity,
          }}
        />
      ))}
    </Box>
  );
};
