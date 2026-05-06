import { useId } from 'react';
import { cn } from '@/lib/utils';

interface LogoProps {
  className?: string;
}

export function Logo({ className }: LogoProps) {
  const titleId = useId();
  const gradientId = useId();

  return (
    <svg
      viewBox="0 0 340 110"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("h-full w-auto max-w-none overflow-visible", className)}
      aria-labelledby={titleId}
      fill="none"
      preserveAspectRatio="xMidYMid meet"
    >
      <title id={titleId}>BoomTick Logo</title>
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#0891B2" />
          <stop offset="100%" stopColor="#8B2FFF" />
        </linearGradient>
      </defs>


      <text
        x="16"
        y="72"
        fontFamily="Arial Black, Arial, sans-serif"
        fontWeight="900"
        fontStyle="italic"
        fontSize="60"
        fill="#f1f5f9"
      >
        B
      </text>

      <line
        x1="95"
        y1="20"
        x2="65"
        y2="85"
        stroke={`url(#${gradientId})`}
        strokeWidth="8"
        strokeLinecap="round"
      />

      <text
        x="148"
        y="69"
        fontFamily="Arial, Helvetica Neue, Arial, sans-serif"
        fontWeight="700"
        fontSize="33"
        fill="#f1f5f9"
        letterSpacing="-0.5"
      >
        <tspan fill="#f1f5f9">boom</tspan>
        <tspan fill="#0891B2">tick</tspan>
      </text>
    </svg>
  );
}
