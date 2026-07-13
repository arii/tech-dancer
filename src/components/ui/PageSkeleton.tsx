// impeccable-ignore-file
import { ReactNode } from 'react';
import { Box, Stack, Grid } from '../../layouts/Primitives';
import { Skeleton } from './Skeleton';
import { motionTokens } from '../../styles/motion';

export type SkeletonVariant = 'grid' | 'post' | 'simple';

interface PageSkeletonProps {
  className?: string;
  variant?: SkeletonVariant;
}

function GridSkeleton() {
  return (
    <Stack gap={8} width="full">
      <Skeleton height={10} width={48} />
      <Grid cols={{ base: 1, md: 2, lg: 3 }} gap={6}>
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <Stack key={i} gap={0} border radius="xl" overflow="hidden" surface="default">
            <Skeleton aspect="video" width="full" />
            <Stack gap={3} padding={5}>
               <Skeleton height={6} width="3/4" />
               <Skeleton height={4} width="full" opacity={0.5} />
               <Skeleton height={4} width="5/6" opacity={0.5} />
            </Stack>
          </Stack>
        ))}
      </Grid>
    </Stack>
  );
}

function PostSkeleton() {
  return (
    <Stack gap={10} className="max-w-4xl mx-auto w-full" padding="panel">
      <Stack gap={6}>
        <Skeleton height={6} width={32} />
        <Skeleton height={20} width="full" />
      </Stack>
      <Skeleton aspect="video" width="full" border />
      <Stack gap={6}>
        <Skeleton height={4} width="full" opacity={0.5} />
        <Skeleton height={4} width="full" opacity={0.5} />
        <Skeleton height={4} width="4/5" opacity={0.5} />
        <Skeleton height={4} width="full" opacity={0.5} />
      </Stack>
    </Stack>
  );
}

function SimpleSkeleton() {
  const { opacity } = motionTokens.skeleton;
  return (
    <Stack gap={12} width="full" className={opacity}>
      <Box paddingBottom={10} border="b" className="border-line/30">
        <Stack gap={4}>
          <Skeleton height={4} width={24} />
          <Skeleton height={10} width="1/2" />
        </Stack>
      </Box>

      <Stack gap={8}>
        <Skeleton height={48} width="full" surface="default" border />
        <Skeleton height={4} width="full" opacity={0.5} />
        <Skeleton height={4} width="5/6" opacity={0.5} />
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
    <Box width="full" className={className || ''}>
      {SKELETON_MAP[variant]}
    </Box>
  );
}
