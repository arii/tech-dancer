import { ComponentType } from 'react';
import { Box, Stack, Text } from '@/layouts/Primitives';

interface MetadataPillProps {
  icon: ComponentType<{ className?: string }>;
  label: string;
  value: string;
}

export function MetadataPill({ icon: Icon, label, value }: MetadataPillProps) {
  return (
    <Box
      display="flex"
      align="baseline"
      gap={2}
      paddingX={3}
      paddingY={1.5}
      radius="full"
      className="bg-white/5 border border-white/10 whitespace-nowrap shrink-0"
    >
      <Icon className="w-3 h-3 text-accent/80 self-center" />
      <Stack gap={0}>
        <Text variant="mono" size="micro" color="dim" uppercase tracking="tighter">
          {label}
        </Text>
        <Text variant="body" size="xs" weight="font-medium">
          {value}
        </Text>
      </Stack>
    </Box>
  );
}
