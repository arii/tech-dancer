import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const NUM_BARS = 22;

interface EqualizerProps {
  compact?: boolean;
  reverse?: boolean;
}

const Equalizer = ({ compact = false, reverse = false }: EqualizerProps) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const bars = Array.from({ length: NUM_BARS }).map((_, i) => {
    const ratio = i / (NUM_BARS - 1);
    const adjustedRatio = reverse ? 1 - ratio : ratio;

    let color: string;
    if (adjustedRatio < 0.5) {
      color = `color-mix(in srgb, hsl(var(--primary)) ${100 - adjustedRatio * 200}%, hsl(var(--secondary)))`;
    } else {
      color = `color-mix(in srgb, hsl(var(--secondary)) ${100 - (adjustedRatio - 0.5) * 200}%, hsl(var(--accent)))`;
    }

    const minH = 15 + Math.random() * 20;
    const maxH = 45 + Math.random() * 55;

    return { color, minH, maxH, delay: Math.random() * 0.4, duration: 0.7 + Math.random() * 1.2 };
  });

  if (compact) {
    return (
      <div className="flex items-end justify-center gap-1 w-full h-full px-4">
        {bars.map((bar, i) => (
          <motion.div
            key={i}
            className="flex-1 rounded-t-sm"
            style={{ backgroundColor: bar.color, boxShadow: `0 0 8px ${bar.color}` }}
            initial={{ height: `${bar.minH}%` }}
            animate={{ height: [`${bar.minH}%`, `${bar.maxH}%`, `${bar.minH}%`] }}
            transition={{ duration: bar.duration, repeat: Infinity, ease: "easeInOut", delay: bar.delay }}
          />
        ))}
      </div>
    );
  }

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-end">
      <div className="flex items-end justify-center gap-1.5 md:gap-2 w-full h-[80%] z-10">
        {bars.map((bar, i) => (
          <motion.div
            key={i}
            className="w-3 md:w-4 rounded-t-sm"
            style={{ backgroundColor: bar.color, boxShadow: `0 0 15px ${bar.color}` }}
            initial={{ height: `${bar.minH}%` }}
            animate={{ height: [`${bar.minH}%`, `${bar.maxH}%`, `${bar.minH}%`] }}
            transition={{ duration: bar.duration, repeat: Infinity, ease: "easeInOut", delay: bar.delay }}
          />
        ))}
      </div>

      <div className="w-[150%] h-32 relative mt-2 -ml-[25%] opacity-60">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/30 via-secondary/10 to-transparent blur-xl" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[200px] border-t border-primary/20 rounded-[100%] scale-y-50 origin-top" />
        <div className="absolute top-4 left-1/2 -translate-x-1/2 w-[80%] h-[160px] border-t border-secondary/20 rounded-[100%] scale-y-50 origin-top" />
        <div className="absolute top-8 left-1/2 -translate-x-1/2 w-[60%] h-[120px] border-t border-accent/20 rounded-[100%] scale-y-50 origin-top" />
      </div>
    </div>
  );
};

export default Equalizer;
