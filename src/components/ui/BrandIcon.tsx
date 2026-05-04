import { cn } from '@/lib/utils';

interface BrandIconProps {
  className?: string;
  showBackground?: boolean;
}

export function BrandIcon({ className, showBackground = false }: BrandIconProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("h-6 w-6", className)}
      aria-labelledby="icon-title"
    >
      <title id="icon-title">BoomTick Icon</title>
      {showBackground && (
        <rect width="64" height="64" rx="12" fill="white"/>
      )}

      {/* B */}
      <text x="10" y="44"
            fontFamily="var(--raw-font-display), sans-serif"
            fontSize="40"
            fontWeight="700"
            fill="var(--raw-color-accent-navy)">
        B
      </text>

      {/* Tick stroke */}
      <path d="M38 18 L54 46"
            stroke="var(--raw-color-accent)"
            strokeWidth="6"
            strokeLinecap="round"/>
    </svg>
  );
}
