import { cn } from '@/lib/utils';

export function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'animate-pulse bg-line/10 rounded-md',
        className
      )}
      {...props}
    />
  );
}
