import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const NUM_BARS = 30;

const Equalizer = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-end perspective-[1000px]">
      {/* Equalizer Bars */}
      <div className="flex items-end justify-center gap-1.5 md:gap-2 w-full h-[80%] z-10">
        {Array.from({ length: NUM_BARS }).map((_, i) => {
          // Calculate gradient color based on position
          const ratio = i / (NUM_BARS - 1);
          let color;
          if (ratio < 0.5) {
            // Cyan to Purple
            color = `color-mix(in srgb, hsl(var(--primary)) ${100 - ratio * 200}%, hsl(var(--secondary)))`;
          } else {
            // Purple to Magenta
            color = `color-mix(in srgb, hsl(var(--secondary)) ${100 - (ratio - 0.5) * 200}%, hsl(var(--accent)))`;
          }

          // Random height between 20% and 100%
          const minHeight = 20 + Math.random() * 20;
          const targetHeight = 40 + Math.random() * 60;
          
          return (
            <motion.div
              key={i}
              className="w-3 md:w-4 rounded-t-sm"
              style={{ backgroundColor: color, boxShadow: `0 0 15px ${color}` }}
              initial={{ height: `${minHeight}%` }}
              animate={{ 
                height: [`${minHeight}%`, `${targetHeight}%`, `${minHeight}%`]
              }}
              transition={{
                duration: 0.8 + Math.random() * 1.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: Math.random() * 0.5,
              }}
            />
          );
        })}
      </div>

      {/* Reflective Floor */}
      <div className="w-[150%] h-32 relative mt-2 -ml-[25%] opacity-60">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/30 via-secondary/10 to-transparent blur-xl"></div>
        {/* Concentric rings */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[200px] border-t border-primary/20 rounded-[100%] scale-y-50 origin-top"></div>
        <div className="absolute top-4 left-1/2 -translate-x-1/2 w-[80%] h-[160px] border-t border-secondary/20 rounded-[100%] scale-y-50 origin-top"></div>
        <div className="absolute top-8 left-1/2 -translate-x-1/2 w-[60%] h-[120px] border-t border-accent/20 rounded-[100%] scale-y-50 origin-top"></div>
      </div>
    </div>
  );
};

export default Equalizer;
