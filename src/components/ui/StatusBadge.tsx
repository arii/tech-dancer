import { Box, Text } from '@/layouts/Primitives';

export const StatusBadge = ({ label }: { label?: string }) => {
  if (!label) return null;
  return (
    <Box surface="accent" paddingX={2} paddingY={0.5} className="bg-accent/10">
      <Text variant="mono" size="xs" color="accent" weight="font-bold">{label.toUpperCase()}</Text>
    </Box>
  );
};
