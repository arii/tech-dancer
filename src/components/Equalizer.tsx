import React, { useMemo } from "react";
import { motion } from "motion/react";

const NUM_BARS = 30;

// Deterministic pseudo-random number generator for SSR hydration matching
const pseudoRandom = (seed: number) => {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
};

const Equalizer = () => {
  // Use useMemo to calculate bar attributes once during render,
  // keeping SSR hydration deterministic and avoiding re-calculations on re-renders
  const bars = useMemo(() => {
    return Array.from({ length: NUM_BARS }).map((_, i) => {
      const ratio = i / (NUM_BARS - 1);
      let color;
      if (ratio < 0.5) {
        color = `color-mix(in srgb, var(--raw-color-accent-brand) ${100 - ratio * 200}%, var(--raw-color-accent-navy))`;
      } else {
        color = `color-mix(in srgb, var(--raw-color-accent-navy) ${100 - (ratio - 0.5) * 200}%, var(--raw-color-accent))`;
      }

      const minHeight = 20 + pseudoRandom(i) * 20;
      const targetHeight = 40 + pseudoRandom(i + 100) * 60;
      const duration = 0.8 + pseudoRandom(i + 200) * 1.5;
      const delay = pseudoRandom(i + 300) * 0.5;

      return { color, minHeight, targetHeight, duration, delay };
    });
  }, []);

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-end perspective-[1000px]">
      <div className="flex items-end justify-center gap-1.5 md:gap-2 w-full h-[80%] z-10">
        {bars.map((bar, i) => (
          <motion.div
            key={i}
            className="w-3 md:w-4 rounded-t-sm"
            style={{ backgroundColor: bar.color, boxShadow: `0 0 15px ${bar.color}` }}
            initial={{ height: `${bar.minHeight}%` }}
            animate={{
              height: [`${bar.minHeight}%`, `${bar.targetHeight}%`, `${bar.minHeight}%`]
            }}
            transition={{
              duration: bar.duration,
              repeat: Infinity,
              ease: "easeInOut",
              delay: bar.delay,
            }}
          />
        ))}
      </div>

      <div className="w-[150%] h-32 relative mt-2 -ml-[25%] opacity-60">
        <div className="absolute inset-0 fade-to-top-bg blur-xl"></div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[200px] border-t border-accent-brand/20 rounded-[100%] scale-y-50 origin-top"></div>
        <div className="absolute top-4 left-1/2 -translate-x-1/2 w-[80%] h-[160px] border-t border-accent-navy/20 rounded-[100%] scale-y-50 origin-top"></div>
        <div className="absolute top-8 left-1/2 -translate-x-1/2 w-[60%] h-[120px] border-t border-accent/20 rounded-[100%] scale-y-50 origin-top"></div>
      </div>
    </div>
  );
};

export default Equalizer;
