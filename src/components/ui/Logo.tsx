import { useId } from 'react';
import { cn } from '@/lib/utils';
import { BrandDefs } from './BrandDefs';

interface LogoProps {
  className?: string;
  showText?: boolean;
}

/**
 * High-fidelity SVG Logo for BoomTick.
 * Consolidates brand definitions and uses CSS classes for typography.
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
        {/* The "B" Mark */}
        <text
          x="0"
          y="0"
          transform="skewX(-8)"
          className="brand-b-mark"
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
          className="brand-wordmark-text"
        >
          <tspan className="brand-text-white">boom</tspan>
          <tspan className="brand-text-accent">tick</tspan>
          <tspan className="brand-text-muted" fontWeight="300">.blog</tspan>
        </text>
      )}
    </svg>
  );
}
