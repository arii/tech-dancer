interface PageSkeletonProps {
  className?: string;
}

export function PageSkeleton({ className }: PageSkeletonProps) {
  return (
    <div className={`flex flex-col gap-12 w-full opacity-50 ${className || ''}`}>
      <div className="pb-10 border-b border-line/30">
        <div className="flex flex-col gap-4">
          <div className="h-4 w-24 bg-line/10 rounded animate-pulse" />
          <div className="h-10 w-1/2 bg-line/10 rounded animate-pulse" />
        </div>
      </div>

      <div className="flex flex-col gap-8">
        <div className="h-48 w-full bg-surface border border-line/20 animate-pulse" />
        <div className="h-4 w-full bg-line/5 rounded animate-pulse" />
        <div className="h-4 w-5/6 bg-line/5 rounded animate-pulse" />
      </div>
    </div>
  );
}
