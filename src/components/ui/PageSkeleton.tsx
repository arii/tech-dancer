import { Box, Stack, Grid } from '@/layouts/Primitives';

export function PageSkeleton() {
  return (
    <Box height="full" className="w-full">
      <Stack gap={12} className="w-full">
        {/* Header Skeleton */}
        <Box paddingBottom={10} className="border-b border-line/50">
          <Stack gap={4}>
            <Box className="h-4 w-24 bg-line/20 rounded animate-pulse" />
            <Box className="h-12 w-2/3 bg-line/20 rounded animate-pulse" />
            <Box className="h-6 w-full max-w-2xl bg-line/20 rounded animate-pulse mt-4" />
          </Stack>
        </Box>

        {/* Content Grid Skeleton */}
        <Grid cols={{ base: 1, md: 2, xl: 3 }} gap={8} className="w-full">
          {Array.from({ length: 3 }).map((_, index) => (
            <Box
              key={index}
              className="flex flex-col h-full bg-surface border border-line overflow-hidden animate-pulse"
            >
              <Box className="aspect-video bg-line/20" />
              <Stack gap={5} className="p-6 lg:p-8">
                <Box className="h-4 w-20 bg-line/20 rounded" />
                <Box className="h-8 w-3/4 bg-line/20 rounded" />
                <Stack gap={2}>
                   <Box className="h-4 w-full bg-line/20 rounded" />
                   <Box className="h-4 w-5/6 bg-line/20 rounded" />
                </Stack>
              </Stack>
            </Box>
          ))}
        </Grid>
      </Stack>
    </Box>
  );
}
