import { useEffect, useMemo, useState } from 'react';
import { motion } from 'motion/react';

const NUM_BARS = 28;

/** HSL brand stops — same intent as `artifacts/boomtick/src/components/Equalizer.tsx` (color-mix across the row). */
const PRIMARY = 'hsl(190 100% 50%)';
const SECONDARY = 'hsl(258 90% 66%)';
const ACCENT = 'hsl(313 100% 50%)';

export interface EqualizerProps {
  /** Hero panels use compact density (matches artifact home). */
  compact?: boolean;
  reverse?: boolean;
}

/**
 * Kinetic equalizer: per-bar color-mix + independent motion loops (ported from artifact boomtick stack).
 */
export default function Equalizer({ compact = true, reverse = false }: EqualizerProps) {
  const [mounted, setMounted] = useState(false);

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
        const pct = Math.round(96 - adjustedRatio * 100);
        color = `color-mix(in srgb, ${PRIMARY} ${pct}%, ${SECONDARY})`;
      } else {
        const pct = Math.round(96 - (adjustedRatio - 0.5) * 100);
        color = `color-mix(in srgb, ${SECONDARY} ${pct}%, ${ACCENT})`;
      }

      const base = compact ? 18 : 26;
      const minH = base + wave * (compact ? 18 : 22);
      const jitter = (i * 17 + (reverse ? 3 : 0)) % 16;
      const maxH = minH + (compact ? 18 : 34) + jitter;

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

  if (!mounted) {
    return null;
  }

  return (
    <div className="pointer-events-none relative flex h-full w-full items-end justify-center gap-[3px] overflow-hidden px-4">
      <motion.div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-primary/15 via-secondary/8 to-transparent blur-2xl opacity-50"
      />
      {bars.map((bar, i) => (
        <motion.div
          key={i}
          className="min-h-[4px] flex-1 origin-bottom rounded-t-sm"
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
            ease: 'easeInOut',
            delay: bar.delay,
          }}
        />
      ))}
    </div>
  );
}
