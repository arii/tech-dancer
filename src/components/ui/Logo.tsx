import { useId } from 'react';
import { cn } from '@/lib/utils';

interface LogoProps {
  className?: string;
}

/**
 * High-fidelity SVG Logo for BoomTick.
 * Consists of the 'boomtick.blog' wordmark.
 */
export function Logo({ className }: LogoProps) {
  const titleId = useId();

  return (
    <svg
      viewBox="0 0 400 100"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("h-full w-auto overflow-visible", className)}
      aria-labelledby={titleId}
      fill="none"
      preserveAspectRatio="xMidYMid meet"
    >
      <title id={titleId}>BoomTick Logo</title>

      <g transform="translate(0, 10)">
        {/* Star Icon */}
        <path
          d="m 75.512,185.940 -0.351,3.787 -1.442,-1.197 1.197,1.442 -3.787,0.351 3.787,0.351 -1.197,1.442 1.442,-1.197 0.351,3.787 0.351,-3.787 1.442,1.197 -1.197,-1.442 3.787,-0.351 -3.787,-0.351 1.197,-1.442 -1.442,1.197 z"
          fill="currentColor"
          transform="scale(6) translate(-71, -182)"
        />

        <text
          x="75"
          y="65"
          fill="currentColor"
          className="brand-wordmark font-normal"
        >
          boom<tspan className="font-black" dx="2">tick</tspan>
          <tspan className="brand-text-muted font-light" dx="1">.blog</tspan>
        </text>
      </g>
    </svg>
  );
}
