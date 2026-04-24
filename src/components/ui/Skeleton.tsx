import { cn } from '@/lib/utils';

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'pulse' | 'shimmer';
}

export function Skeleton({ className, variant = 'shimmer', ...props }: SkeletonProps) {
  if (variant === 'pulse') {
    return <div className={cn('animate-pulse rounded-md bg-line/20', className)} {...props} />;
  }

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-md bg-line/10",
        "before:absolute before:inset-0 before:-translate-x-full",
        "before:animate-[shimmer_2s_infinite]",
        "before:bg-gradient-to-r before:from-transparent before:via-line/20 before:to-transparent",
        className
      )}
      {...props}
    />
  );
}
