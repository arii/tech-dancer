import type { ReactNode } from 'react';
import { Box, Stack, Text } from '@/layouts/Primitives';

export interface PolicySectionProps {
  title: ReactNode;
  icon: ReactNode;
  children: ReactNode;
  fullWidth?: boolean;
}

export const PolicySection = ({ title, icon, children, fullWidth = false }: PolicySectionProps) => (
  <Box padding={{ base: 6, md: 8 }} radius="md" border surface="card" width={fullWidth ? 'full' : undefined}>
    <Stack gap={4}>
      <Stack direction="row" align="center" gap={3}>
        <Box padding={2} radius="md" className="bg-accent/10 text-accent">
          {icon}
        </Box>
        <Text variant="headline" size="lg" weight="font-bold" tracking="tight">
          {title}
        </Text>
      </Stack>
      {children}
    </Stack>
  </Box>
);
