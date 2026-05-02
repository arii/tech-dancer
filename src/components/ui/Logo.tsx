import { cn } from '@/lib/utils';

interface LogoProps {
  className?: string;
}

export function Logo({ className }: LogoProps) {
  return (
    <svg
      viewBox="0 0 280 60"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("h-8 w-auto", className)}
      aria-labelledby="logo-title"
    >
      <title id="logo-title">BoomTick Logo</title>
      {/* Mark */}
      <text x="4" y="44"
            fontFamily="var(--raw-font-display)"
            fontSize="48"
            fontWeight="700"
            fill="var(--raw-color-accent-navy)">
        B
      </text>

      <path d="M48 12 L70 52"
            stroke="var(--raw-color-accent)"
            strokeWidth="8"
            strokeLinecap="round"/>

      {/* Wordmark */}
      <text x="94" y="46"
            fontFamily="var(--raw-font-sans)"
            fontSize="38"
            fill="var(--raw-color-accent-navy)"
            letterSpacing="-0.02em">
        boomtick
      </text>
    </svg>
  );
}
