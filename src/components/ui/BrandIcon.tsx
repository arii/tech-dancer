import { useId } from 'react';
import { cn } from '@/lib/utils';
import { BrandDefs } from './BrandDefs';

interface BrandIconProps {
  className?: string;
  showBackground?: boolean;
}

/**
 * Standardized Brand Icon (B-mark + Dot).
 * Uses shared BrandDefs for visual consistency.
 */
export function BrandIcon({ className, showBackground = false }: BrandIconProps) {
  const titleId = useId();
  const gradientId = useId();
  const filterId = useId();

  return (
    <svg
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("h-6 w-6 overflow-visible", className)}
      aria-labelledby={titleId}
      fill="none"
    >
      <title id={titleId}>BoomTick Icon</title>
      <BrandDefs gradientId={gradientId} filterId={filterId} />
      
      {showBackground && (
        <rect width="100" height="100" rx="20" fill="var(--raw-color-surface)" />
      )}

      <g transform="translate(10, 85)">
        <text
          x="0"
          y="0"
          fill="var(--raw-color-text-main)"
          className="brand-b-mark text-[85px]"
        >
          B
        </text>

        <circle
          cx="82"
          cy="-28"
          r="16"
          fill={`url(#${gradientId})`}
          filter={`url(#${filterId})`}
        />
      </g>
    </svg>
  );
}
