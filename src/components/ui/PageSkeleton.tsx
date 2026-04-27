import { Box, Stack, Grid } from '../../layouts/Primitives';

export type SkeletonVariant = 'grid' | 'post' | 'simple';

interface PageSkeletonProps {
  className?: string;
  variant?: SkeletonVariant;
}

function GridSkeleton() {
  return (
    <Stack gap={12} className="w-full">
      <Box paddingBottom={12} border="b" className="border-line/30">
        <Stack gap={4}>
          <Box className="h-4 w-24 bg-line/10 rounded animate-pulse" />
          <Box className="h-12 w-1/2 bg-line/10 rounded animate-pulse" />
          <Box className="h-6 w-2/3 bg-line/5 rounded animate-pulse" />
        </Stack>
      </Box>

      <Grid cols={{ base: 1, md: 2, xl: 3, "2xl": 4 }} gap={0} border="t" className="border-l border-line/30">
        {[...Array(6)].map((_, i) => (
          <Box key={i} border="r" borderBottom padding={6}>
            <Stack gap={4}>
              <Box className="aspect-video bg-line/10 animate-pulse" />
              <Box className="h-4 w-3/4 bg-line/10 rounded animate-pulse" />
              <Box className="h-3 w-1/2 bg-line/5 rounded animate-pulse" />
            </Stack>
          </Box>
        ))}
      </Grid>
    </Stack>
  );
}

function PostSkeleton() {
  return (
    <Box padding="panel">
      <Stack gap={12} maxWidth="4xl" marginX="auto" className="w-full">
         <Box className="h-4 w-24 bg-line/10 rounded animate-pulse" />

         <Stack gap={10}>
            <Stack gap={6}>
               <Box className="h-4 w-32 bg-line/10 rounded animate-pulse" />
               <Box className="h-16 w-full bg-line/10 rounded animate-pulse" />
            </Stack>

            <Box className="aspect-video border border-line/20 bg-line/5 animate-pulse" />

            <Stack gap={4}>
               <Box className="h-4 w-full bg-line/5 rounded animate-pulse" />
               <Box className="h-4 w-full bg-line/5 rounded animate-pulse" />
               <Box className="h-4 w-5/6 bg-line/5 rounded animate-pulse" />
            </Stack>
         </Stack>
      </Stack>
    </Box>
  );
}

function SimpleSkeleton() {
  return (
    <Stack gap={12} className="w-full" padding="panel">
      <Box paddingBottom={10} border="b" className="border-line/30">
        <Stack gap={4}>
          <Box className="h-4 w-24 bg-line/10 rounded animate-pulse" />
          <Box className="h-10 w-1/2 bg-line/10 rounded animate-pulse" />
        </Stack>
      </Box>

      <Stack gap={8}>
        <Box className="h-4 w-full bg-line/5 rounded animate-pulse" />
        <Box className="h-4 w-full bg-line/5 rounded animate-pulse" />
        <Box className="h-4 w-5/6 bg-line/5 rounded animate-pulse" />
      </Stack>
    </Stack>
  );
}

export function PageSkeleton({ className, variant = 'simple' }: PageSkeletonProps) {
  const Skeletons = {
    grid: <GridSkeleton />,
    post: <PostSkeleton />,
    simple: <SimpleSkeleton />
  };

  return (
    <Box className={`w-full opacity-50 ${className || ''}`}>
      {Skeletons[variant]}
    </Box>
  );
}
