// impeccable-ignore-file
import { useId } from 'react';
import { cn } from '@/lib/utils';
import { BrandDefs } from './BrandDefs';

interface LogoProps {
  className?: string;
  showText?: boolean;
}

/**
 * High-fidelity SVG Logo for BoomTick.
 * Featuring the serif "B" mark with a glowing gradient dot.
 * Uses shared brand definitions and utility classes for consistency.
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
      <BrandDefs gradientId={gradientId} filterId={filterId} />

      <g transform="translate(10, 82)">
        {/* The "B" Mark - Serif, Bold, Italic */}
        <text
          x="0"
          y="0"
          fill="currentColor"
          transform="skewX(-8)"
          className="brand-b-mark text-[85px]"
        >
          B
        </text>

        {/* The Glowing Dot */}
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
          className="brand-wordmark text-[52px] tracking-[-1.5px]"
        >
          boom<tspan className="brand-text-accent">tick</tspan><tspan className="brand-text-muted font-light">.blog</tspan>
        </text>
      )}
    </svg>
  );
}
