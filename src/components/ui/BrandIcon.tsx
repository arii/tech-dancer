import { useId } from 'react';
import { cn } from '@/lib/utils';

interface BrandIconProps {
  className?: string;
  showBackground?: boolean;
}

export function BrandIcon({ className, showBackground = false }: BrandIconProps) {
  const titleId = useId();
  const gradientId = useId();

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
        <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#0891B2" />
          <stop offset="100%" stopColor="#8B5CF6" />
        </linearGradient>
      </defs>

      <text
        x="10"
        y="44"
        fontFamily="Arial Black, Arial, sans-serif"
        fontSize="40"
        fontWeight="900"
        fontStyle="italic"
        fill="#f1f5f9"
      >
        B
      </text>

      <line
        x1="45"
        y1="15"
        x2="25"
        y2="50"
        stroke={`url(#${gradientId})`}
        strokeWidth="4"
        strokeLinecap="round"
      />
    </svg>
  );
}
