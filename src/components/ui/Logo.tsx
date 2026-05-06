import { useId } from 'react';
import { cn } from '@/lib/utils';

interface LogoProps {
  className?: string;
  showText?: boolean;
}

/**
 * High-fidelity SVG Logo for BoomTick.
 * Featuring the "B\" mark with a custom gradient slash.
 * The slash is positioned closer to the B per design requirements.
 */
export function Logo({ className, showText = true }: LogoProps) {
  const titleId = useId();
  const gradientId = useId();

  return (
    <svg
      viewBox={showText ? "0 0 320 100" : "0 0 100 100"}
      xmlns="http://www.w3.org/2000/svg"
      className={cn("h-full w-auto overflow-visible", className)}
      aria-labelledby={titleId}
      fill="none"
      preserveAspectRatio="xMidYMid meet"
    >
      <title id={titleId}>BoomTick Logo</title>
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#00CFFF" />
          <stop offset="100%" stopColor="#8B2FFF" />
        </linearGradient>
      </defs>

      {/* The "B" Mark */}
      <text
        x="0"
        y="82"
        fill="currentColor"
        style={{
          fontSize: '85px',
          fontWeight: 900,
          fontFamily: '"Bricolage Grotesque", "Albert Sans", sans-serif',
          letterSpacing: '-4px'
        }}
      >
        B
      </text>

      {/* 
        The Slanted Backslash "\" 
        Design: 
        - 12 degree skew (tan(12) ≈ 0.21)
        - Gradient fill matching hero accent
        - Positioned close to B (x=60)
      */}
      <path
        d="M 46 18 L 58 18 L 72.7 88 L 60.7 88 Z"
        fill={`url(#${gradientId})`}
        className="drop-shadow-[0_0_8px_rgba(0,207,255,0.4)]"
      />

      {showText && (
        <text
          x="85"
          y="78"
          fill="currentColor"
          style={{
            fontSize: '52px',
            fontWeight: 800,
            fontFamily: '"Bricolage Grotesque", "Albert Sans", sans-serif',
            letterSpacing: '-1.5px'
          }}
        >
          boom<tspan fill="#00CFFF">tick</tspan>
        </text>
      )}
    </svg>
  );
}
