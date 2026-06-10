import { useId } from 'react';
import { Box, BoxProps } from '@/layouts/Primitives';

interface LogoProps extends BoxProps {
  className?: string;
}

/**
 * High-fidelity SVG Logo for BoomTick.
 * Consists of the 'boomtick.blog' wordmark.
 */
export function Logo({ className, ...props }: LogoProps) {
  const titleId = useId();

  return (
    <Box
      as="svg"
      viewBox="0 0 325 100"
      xmlns="http://www.w3.org/2000/svg"
      width="auto"
      height="full"
      overflow="visible"
      aria-labelledby={titleId}
      fill="none"
      // @ts-expect-error - SVG specific prop
      preserveAspectRatio="xMidYMid meet"
      className={className}
      {...props}
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
    </Box>
  );
}
