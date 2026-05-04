import { cn } from '@/lib/utils';

interface BrandIconProps {
  className?: string;
  showBackground?: boolean;
}

export function BrandIcon({ className, showBackground = false }: BrandIconProps) {
  return (
    <svg
      viewBox="0 0 130 110"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("h-6 w-auto", className)}
      aria-hidden="true"
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <linearGradient id="icon-slash-r0" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#00CFFF" />
          <stop offset="100%" stopColor="#8B2FFF" />
        </linearGradient>
      </defs>
      {showBackground && (
        <rect width="130" height="110" rx="18" fill="#0D0E1C" />
      )}
      <text
        x="16"
        y="72"
        fontFamily="Arial Black, Arial, sans-serif"
        fontWeight="900"
        fontSize="60"
        fill="white"
      >
        B
      </text>
      <line
        x1="82"
        y1="20"
        x2="112"
        y2="72"
        stroke="url(#icon-slash-r0)"
        strokeWidth="12"
        strokeLinecap="round"
      />
    </svg>
  );
}
