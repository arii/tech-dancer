import { useEffect, useMemo, useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";

const NUM_BARS = 64;

interface EqualizerProps {
  compact?: boolean;
  reverse?: boolean;
  count?: number;
}

export const Equalizer = ({ compact = false, reverse = false, count = NUM_BARS }: EqualizerProps) => {
  const [mounted, setMounted] = useState(false);
  const { scrollYProgress } = useScroll();
  const scrollShift = useTransform(scrollYProgress, [0, 1], [0, 1]);

  useEffect(() => {
    setMounted(true);
  }, []);

  const bars = useMemo(() => {
    return Array.from({ length: count }).map((_, i) => {
      const ratio = i / (count - 1);
      const adjustedRatio = reverse ? 1 - ratio : ratio;
      const wave = Math.sin((i / count) * Math.PI * 2.2) * 0.5 + 0.5;

      let color: string;
      if (adjustedRatio < 0.5) {
        color = `color-mix(in srgb, var(--color-primary) ${96 - adjustedRatio * 100}%, var(--color-secondary))`;
      } else {
        color = `color-mix(in srgb, var(--color-secondary) ${96 - (adjustedRatio - 0.5) * 100}%, var(--color-accent-vivid))`;
      }

      const base = compact ? 8 : 15;
      const minH = base + wave * (compact ? 10 : 15);
      const maxH = minH + (compact ? 10 : 20) + Math.random() * (compact ? 5 : 10);

      return {
        color,
        minH,
        maxH,
        delay: i * (0.045 * (NUM_BARS / count)),
        duration: 3.5 + (i % 5) * 0.5,
        opacity: 0.3 + wave * 0.2,
      };
    });
  }, [compact, reverse, count]);

  if (!mounted) return null;

  if (compact) {
    return (
      <div className="relative flex items-end justify-center gap-[3px] w-full h-full px-4 overflow-hidden">
        {bars.map((bar, i) => (
          <motion.div
            key={i}
            className="w-0.5 md:w-1 rounded-full origin-bottom"
            style={{
              backgroundColor: bar.color,
              boxShadow: `0 0 12px ${bar.color}44`,
              height: `${bar.minH}%`,
              opacity: bar.opacity,
            }}
            animate={{
              height: [`${bar.minH}%`, `${bar.maxH}%`, `${bar.minH}%`],
              opacity: [bar.opacity, bar.opacity * 1.5, bar.opacity],
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
    );
  }

  return (
    <div className="relative flex items-end justify-center gap-2 md:gap-3 w-full h-[85%] px-4 md:px-12 overflow-hidden">
      {bars.map((bar, i) => (
        <motion.div
          key={i}
          className="w-1.5 md:w-2 rounded-t-lg origin-bottom relative group"
          style={{
            backgroundColor: bar.color,
            boxShadow: `0 0 20px ${bar.color}66`,
            height: `${bar.minH}%`,
          }}
          animate={{
            height: [`${bar.minH}%`, `${bar.maxH}%`, `${bar.minH}%`],
            scaleX: [1, 1.1, 1],
          }}
          transition={{
            duration: bar.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: bar.delay,
          }}
        >
           <div className="absolute -inset-1 bg-inherit blur-md opacity-20 group-hover:opacity-40 transition-opacity" />
        </motion.div>
      ))}
    </div>
  );
};

export default Equalizer;
