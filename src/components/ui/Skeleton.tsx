import { Box, BoxProps } from '../../layouts/Box';
import { motionTokens } from '../../styles/motion';
import { cn } from '../../lib/utils';

export interface SkeletonProps extends BoxProps {
  variant?: 'text' | 'circular' | 'rectangular';
}

export function Skeleton({
  variant = 'rectangular',
  className,
  width,
  height,
  ...props
}: SkeletonProps) {
  const { pulse } = motionTokens.skeleton;

  return (
    <Box
      className={cn(
        pulse,
        'bg-line/10',
        variant === 'text' && 'h-4 w-full rounded-sm',
        variant === 'circular' && 'rounded-full',
        variant === 'rectangular' && 'rounded-none',
        className
      )}
      width={width}
      height={height}
      {...props}
    />
  );
}
