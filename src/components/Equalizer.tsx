import { useMemo } from 'react';
import { motion } from 'motion/react';

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
    <div className="pointer-events-none relative flex h-full w-full items-end justify-center gap-[4px] overflow-hidden px-4 pb-[18px]"> {/* impeccable-ignore */}
      <motion.div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-primary/15 via-secondary/8 to-transparent blur-2xl opacity-[.22]" // impeccable-ignore
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
          className="w-full max-w-[4px] rounded-full bg-transparent bg-equalizer shadow-equalizer" // impeccable-ignore
          style={{ // impeccable-ignore
            opacity: bar.opacity,
          }}
        />
      ))}
    </div>
  );
};
