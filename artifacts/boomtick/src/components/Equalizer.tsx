import { useEffect, useMemo, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const NUM_BARS = 28;

interface EqualizerProps {
  compact?: boolean;
  reverse?: boolean;
}

const Equalizer = ({ compact = false, reverse = false }: EqualizerProps) => {
  const [mounted, setMounted] = useState(false);
  const { scrollYProgress } = useScroll();
  const scrollShift = useTransform(scrollYProgress, [0, 1], [0, 1]);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);

  const bars = useMemo(() => {
    return Array.from({ length: NUM_BARS }).map((_, i) => {
      const ratio = i / (NUM_BARS - 1);
      const adjustedRatio = reverse ? 1 - ratio : ratio;
      const wave = Math.sin((i / NUM_BARS) * Math.PI * 2.2) * 0.5 + 0.5;

      let color: string;
      if (adjustedRatio < 0.5) {
        color = `color-mix(in srgb, hsl(var(--primary)) ${96 - adjustedRatio * 100}%, hsl(var(--secondary)))`;
      } else {
        color = `color-mix(in srgb, hsl(var(--secondary)) ${96 - (adjustedRatio - 0.5) * 100}%, hsl(var(--accent)))`;
      }

      const base = compact ? 18 : 26;
      const minH = base + wave * (compact ? 18 : 22);
      const maxH = minH + (compact ? 18 : 34) + Math.random() * (compact ? 10 : 16);

      return {
        color,
        minH,
        maxH,
        delay: i * 0.045,
        duration: 2.8 + (i % 5) * 0.32,
        opacity: 0.45 + wave * 0.3,
      };
    });
  }, [compact, reverse]);

  if (!mounted) return null;

  if (compact) {
    return (
      <div className="relative flex items-end justify-center gap-[3px] w-full h-full px-4 overflow-hidden">
        <motion.div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-primary/10 via-secondary/5 to-transparent blur-2xl"
          style={{ opacity: scrollShift }}
        />
        {bars.map((bar, i) => (
          <motion.div
            key={i}
            className="flex-1 rounded-t-sm origin-bottom"
            style={{
              backgroundColor: bar.color,
              boxShadow: `0 0 10px ${bar.color}`,
              opacity: bar.opacity,
            }}
            initial={{ height: `${bar.minH}%`, scaleY: 0.95 }}
            animate={{
              height: [`${bar.minH}%`, `${bar.maxH}%`, `${bar.minH}%`],
              scaleY: [0.96, 1, 0.96],
              y: [0, -2, 0],
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
    <div className="relative w-full h-full flex flex-col items-center justify-end overflow-hidden">
      <motion.div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-primary/10 via-secondary/5 to-transparent blur-3xl"
        style={{ opacity: scrollShift }}
      />
      <motion.div
        className="flex items-end justify-center gap-1.5 md:gap-2 w-full h-[80%] z-10"
        style={{ y: yShift }}
      >
        {bars.map((bar, i) => (
          <motion.div
            key={i}
            className="w-3 md:w-4 rounded-t-sm origin-bottom"
            style={{
              backgroundColor: bar.color,
              boxShadow: `0 0 14px ${bar.color}`,
              opacity: bar.opacity,
            }}
            initial={{ height: `${bar.minH}%`, scaleY: 0.92 }}
            animate={{
              height: [`${bar.minH}%`, `${bar.maxH}%`, `${bar.minH}%`],
              scaleY: [0.94, 1.04, 0.94],
              y: [0, -3, 0],
            }}
            transition={{
              duration: bar.duration,
              repeat: Infinity,
              ease: [0.42, 0, 0.58, 1],
              delay: bar.delay,
            }}
          />
        ))}
      </motion.div>

      <div className="w-[150%] h-32 relative mt-2 -ml-[25%] opacity-55">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/20 via-secondary/10 to-transparent blur-xl" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[200px] border-t border-primary/15 rounded-[100%] scale-y-50 origin-top" />
        <div className="absolute top-4 left-1/2 -translate-x-1/2 w-[80%] h-[160px] border-t border-secondary/15 rounded-[100%] scale-y-50 origin-top" />
        <div className="absolute top-8 left-1/2 -translate-x-1/2 w-[60%] h-[120px] border-t border-accent/15 rounded-[100%] scale-y-50 origin-top" />
      </div>
    </div>
  );
};

export default Equalizer;
