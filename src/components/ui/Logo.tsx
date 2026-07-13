import { useId } from 'react';
import { cn } from '../../lib/utils';

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
      viewBox="0 0 325 100"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("h-full w-auto overflow-visible", className)}
      aria-labelledby={titleId}
      fill="none"
      preserveAspectRatio="xMidYMid meet"
    >
      <title id={titleId}>BoomTick Logo</title>

      <text
        x="0"
        y="75"
        fill="currentColor"
        className="brand-wordmark"
      >
        boom<tspan className="brand-text-accent">tick</tspan><tspan className="brand-text-muted font-light">.blog</tspan>
      </text>
    </svg>
  );
}
