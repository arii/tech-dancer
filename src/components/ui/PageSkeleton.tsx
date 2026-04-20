import { Box, Stack } from '../../layouts/Primitives';

export function PageSkeleton() {
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
