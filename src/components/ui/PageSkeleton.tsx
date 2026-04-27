import { ReactNode } from 'react';
import { Box, Stack } from '../../layouts/Primitives';

export type SkeletonVariant = 'grid' | 'post' | 'simple';

interface PageSkeletonProps {
  className?: string;
  variant?: SkeletonVariant;
}

function GridSkeleton() {
  return (
    <Stack gap={8} className="w-full">
      <Box className="h-10 w-48 bg-line/10 rounded animate-pulse" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <Stack key={i} gap={4} className="p-4 border border-line/10 rounded-lg">
            <Box className="aspect-video w-full bg-line/10 rounded animate-pulse" />
            <Box className="h-6 w-3/4 bg-line/10 rounded animate-pulse" />
            <Box className="h-4 w-full bg-line/5 rounded animate-pulse" />
          </Stack>
        ))}
      </div>
    </Stack>
  );
}

function PostSkeleton() {
  return (
    <Stack gap={10} className="max-w-3xl mx-auto w-full">
      <Stack gap={4}>
        <Box className="h-4 w-24 bg-line/10 rounded animate-pulse" />
        <Box className="h-12 w-full bg-line/10 rounded animate-pulse" />
        <Box className="h-6 w-1/2 bg-line/5 rounded animate-pulse" />
      </Stack>
      <Box className="aspect-video w-full bg-line/10 rounded animate-pulse" />
      <Stack gap={6}>
        <Box className="h-4 w-full bg-line/5 rounded animate-pulse" />
        <Box className="h-4 w-full bg-line/5 rounded animate-pulse" />
        <Box className="h-4 w-4/5 bg-line/5 rounded animate-pulse" />
        <Box className="h-4 w-full bg-line/5 rounded animate-pulse" />
      </Stack>
    </Stack>
  );
}

function SimpleSkeleton() {
  return (
    <Stack gap={12} className="w-full opacity-50">
      <Box paddingBottom={10} className="border-b border-line/30">
        <Stack gap={4}>
          <Box className="h-4 w-24 bg-line/10 rounded animate-pulse" />
          <Box className="h-10 w-1/2 bg-line/10 rounded animate-pulse" />
        </Stack>
      </Box>

      <Stack gap={8}>
        <Box className="h-48 w-full bg-surface border border-line/20 animate-pulse" />
        <Box className="h-4 w-full bg-line/5 rounded animate-pulse" />
        <Box className="h-4 w-5/6 bg-line/5 rounded animate-pulse" />
      </Stack>
    </Stack>
  );
}

const SKELETON_MAP: Record<SkeletonVariant, ReactNode> = {
  grid: <GridSkeleton />,
  post: <PostSkeleton />,
  simple: <SimpleSkeleton />,
};

export function PageSkeleton({ className, variant = 'grid' }: PageSkeletonProps) {
  return (
    <Box className={`w-full ${className || ''}`}>
      {SKELETON_MAP[variant]}
    </Box>
  );
}
