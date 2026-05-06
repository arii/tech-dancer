import { useId } from 'react';
import { cn } from '@/lib/utils';

interface BrandIconProps {
  className?: string;
  showBackground?: boolean;
}

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
      {showBackground && <rect width="64" height="64" rx="12" fill="#0D0E1C" />}

      <defs>
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#40c4ff" />
          <stop offset="100%" stopColor="#9d27ff" />
        </linearGradient>
        <filter id={filterId} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      <g transform="translate(8, 50)">
        <text
          x="0"
          y="0"
          fontFamily='"Bodoni MT", "Bodoni 72", serif'
          fontSize="44"
          fontWeight="700"
          fontStyle="italic"
          fill="#f1f5f9"
          transform="skewX(-8)"
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
