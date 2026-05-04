import { cn } from '@/lib/utils';

interface LogoProps {
  className?: string;
}

export function Logo({ className }: LogoProps) {
  return (
    <svg
      viewBox="0 0 340 110"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("h-full w-auto max-w-none overflow-visible", className)}
      aria-hidden="true"
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <linearGradient id="logo-slash-r0" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#00CFFF" />
          <stop offset="100%" stopColor="#8B2FFF" />
        </linearGradient>
      </defs>
      <rect width="340" height="110" rx="18" fill="#0D0E1C" />
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
        stroke="url(#logo-slash-r0)"
        strokeWidth="12"
        strokeLinecap="round"
      />
      <text
        x="148"
        y="69"
        fontFamily="Arial, Helvetica Neue, Arial, sans-serif"
        fontWeight="700"
        fontSize="33"
        fill="white"
        letterSpacing="-0.5"
      >
        <tspan fill="white">boom</tspan>
        <tspan fill="#00CFFF">tick</tspan>
      </text>
    </svg>
  );
}
