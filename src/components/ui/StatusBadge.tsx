import { Box, Text } from '@/layouts/Primitives';

export const StatusBadge = ({ label }: { label: string }) => (
  <Box surface="accent" paddingX={2} paddingY={0.5} className="bg-accent/10">
    <Text variant="mono" size="xs" color="brand" weight="font-bold">{label.toUpperCase()}</Text>
  </Box>
);
