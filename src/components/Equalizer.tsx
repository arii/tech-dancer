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
      display="flex"
      align="end"
      justify="center"
      gap="[4px]"
      paddingX={4}
      paddingBottom="[18px]"
      className="pointer-events-none relative h-full w-full overflow-hidden"
    >
      <motion.div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-primary/15 via-secondary/8 to-transparent blur-2xl opacity-[.22]"
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
          radius="full"
          className="w-full max-w-[4px]"
          style={{
            backgroundColor: 'transparent',
            background: `linear-gradient(180deg, #00CFFF, #8B2FFF, #FF00C8)`,
            boxShadow: `0 0 14px rgba(0,207,255,.2)`,
            opacity: bar.opacity,
          }}
        />
      ))}
    </Box>
  );
};
