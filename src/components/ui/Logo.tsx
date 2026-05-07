import { useId } from 'react';
import { cn } from '@/lib/utils';

interface LogoProps {
  className?: string;
  showText?: boolean;
}

/**
 * High-fidelity SVG Logo for BoomTick.
 * Featuring the serif "B" mark with a glowing gradient dot.
 * Uses CSS variables for brand colors to ensure consistency.
 */
export function Logo({ className, showText = true }: LogoProps) {
  const titleId = useId();
  const gradientId = useId();
  const filterId = useId();

  return (
    <svg
      viewBox={showText ? "0 0 450 100" : "0 0 120 100"}
      xmlns="http://www.w3.org/2000/svg"
      className={cn("h-full w-auto overflow-visible", className)}
      aria-labelledby={titleId}
      fill="none"
      preserveAspectRatio="xMidYMid meet"
    >
      <title id={titleId}>BoomTick Logo</title>
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="var(--color-accent-hero, #00CFFF)" />
          <stop offset="100%" stopColor="var(--color-accent-purple, #8b5cf6)" />
        </linearGradient>
        <filter id={filterId} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      <g transform="translate(10, 82)">
        {/* The "B" Mark - Serif, Bold, Italic */}
        <text
          x="0"
          y="0"
          fill="currentColor"
          transform="skewX(-8)"
          style={{
            fontSize: '85px',
            fontWeight: 700,
            fontStyle: 'italic',
            fontFamily: '"Playfair Display", "Bodoni MT", "Bodoni 72", serif',
          }}
        >
          B
        </text>

        {/* The Glowing Dot - Sized to match text (2x wordmark height mathematically) */}
        <circle
          cx="82"
          cy="-28"
          r="16"
          fill={`url(#${gradientId})`}
          filter={`url(#${filterId})`}
        />
      </g>

      {showText && (
        <text
          x="125"
          y="78"
          fill="currentColor"
          style={{
            fontSize: '52px',
            fontWeight: 800,
            fontFamily: '"Bricolage Grotesque", "Albert Sans", sans-serif',
            letterSpacing: '-1.5px'
          }}
        >
          boom<tspan fill="var(--color-accent, #22d3ee)">tick</tspan><tspan fill="rgba(255,255,255,0.6)" fontWeight="300">.blog</tspan>
        </text>
      )}
    </svg>
  );
}
