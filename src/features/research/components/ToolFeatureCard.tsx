import { Box, Stack, Text } from '@/layouts/Primitives';
import { LucideIcon } from 'lucide-react';

export interface ToolFeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

export function ToolFeatureCard({ icon: Icon, title, description }: ToolFeatureCardProps) {
  return (
    <Stack gap={4} padding={6} border radius="md" surface="surface">
      <Box display="flex" align="center" gap={3}>
        <Icon className="text-accent w-6 h-6" />
        <Text variant="display" size="lg" weight="font-bold">{title}</Text>
      </Box>
      <Text variant="body" size="sm" color="dim">
        {description}
      </Text>
    </Stack>
  );
}
