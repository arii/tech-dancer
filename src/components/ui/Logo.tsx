import { cn } from '@/lib/utils';

interface LogoProps {
  className?: string;
}

export function Logo({ className }: LogoProps) {
  return (
    <svg
      viewBox="0 0 360 80"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("h-8 w-auto", className)}
      aria-labelledby="logo-title"
    >
      <title id="logo-title">BoomTick Logo</title>
      {/* Mark */}
      <text x="10" y="52"
            fontFamily="var(--raw-font-display)"
            fontSize="44"
            fontWeight="700"
            fill="var(--raw-color-accent-navy)">
        B
      </text>

      <path d="M50 20 L72 60"
            stroke="var(--raw-color-accent)"
            strokeWidth="8"
            strokeLinecap="round"/>

      {/* Wordmark */}
      <text x="100" y="54"
            fontFamily="var(--raw-font-sans)"
            fontSize="34"
            fill="var(--raw-color-accent-navy)"
            letterSpacing="0.5">
        boomtick
      </text>
    </svg>
  );
}
