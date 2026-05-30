import { Box } from '@/layouts/Primitives';
import { cn } from '@/lib/utils';
import { BaseProps } from '@/layouts/Box';

interface DecorativeGlowProps {
  size?: number | string;
  top?: BaseProps['top'];
  right?: BaseProps['right'];
  bottom?: BaseProps['bottom'];
  left?: BaseProps['left'];
  color?: string;
  opacity?: string;
  className?: string;
}

/**
 * Reusable decorative glow element for background accents.
 * Uses absolute positioning and blur to create a 'glow' effect.
 */
export function DecorativeGlow({
  size = 64,
  top,
  right,
  bottom,
  left,
  color = "bg-accent",
  opacity = "5",
  className
}: DecorativeGlowProps) {
  return (
    <Box
      position="absolute"
      top={top}
      right={right}
      bottom={bottom}
      left={left}
      width={size}
      height={size}
      radius="full"
      className={cn(
        `${color}/${opacity} blur-3xl -z-10 pointer-events-none`,
        className
      )}
    />
  );
}
