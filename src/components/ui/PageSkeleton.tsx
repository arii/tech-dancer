import { Box, Stack } from '../../layouts/Primitives';

export function PageSkeleton() {
  return (
    <Stack gap={12} className="w-full">
      <Box paddingBottom={10} className="border-b border-line/50">
        <Stack gap={4}>
          <Box className="h-4 w-24 bg-line/20 rounded animate-pulse" />
          <Box className="h-12 w-2/3 bg-line/20 rounded animate-pulse" />
          <Box className="h-6 w-full max-w-2xl bg-line/20 rounded animate-pulse mt-4" />
        </Stack>
      </Box>

      <Stack gap={8}>
        <Box className="h-64 w-full bg-surface border border-line animate-pulse" />
        <Box className="h-32 w-full bg-surface border border-line animate-pulse" />
      </Stack>
    </Stack>
  );
}
