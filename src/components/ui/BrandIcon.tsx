import { cn } from '@/lib/utils';

interface BrandIconProps {
  className?: string;
  withBackground?: boolean;
}

export function BrandIcon({ className, withBackground = false }: BrandIconProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("w-8 h-8", className)}
      aria-labelledby="icon-title"
    >
      <title id="icon-title">BoomTick Icon</title>
      {/* Background */}
      {withBackground && (
        <rect width="64" height="64" rx="12" fill="var(--raw-color-surface)"/>
      )}

      {/* B */}
      <text x="4" y="48"
            fontFamily="var(--raw-font-display)"
            fontSize="48"
            fontWeight="700"
            fill="var(--raw-color-accent-navy)">
        B
      </text>

      {/* Tick stroke */}
      <path d="M42 16 L58 48"
            stroke="var(--raw-color-accent)"
            strokeWidth="8"
            strokeLinecap="round"/>
    </svg>
  );
}
