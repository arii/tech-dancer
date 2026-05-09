import { useId } from 'react';
import { cn } from '@/lib/utils';
import { BrandDefs } from './BrandDefs';

interface BrandIconProps {
  className?: string;
  showBackground?: boolean;
}

/**
 * Brand icon variant (typically for favicons or small branding elements).
 * Uses shared BrandDefs for consistency.
 */
export function BrandIcon({ className, showBackground = false }: BrandIconProps) {
  const titleId = useId();
  const gradientId = useId();
  const filterId = useId();

  return (
    <svg
      viewBox="0 0 64 64"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("h-6 w-6", className)}
      aria-labelledby={titleId}
      fill="none"
    >
      <title id={titleId}>BoomTick Icon</title>
      {showBackground && <rect width="64" height="64" rx="12" className="brand-bg-surface" />}

      <BrandDefs gradientId={gradientId} filterId={filterId} stdDeviation={2} />

      <g transform="translate(8, 50)">
        <text
          x="0"
          y="0"
          transform="skewX(-8)"
          className="brand-b-mark-sm"
        >
          B
        </text>

        <circle
          cx="42"
          cy="-14"
          r="8"
          fill={`url(#${gradientId})`}
          filter={`url(#${filterId})`}
        />
      </g>
    </svg>
  );
}
