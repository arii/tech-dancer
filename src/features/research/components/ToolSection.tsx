import { ResearchTool } from '@/config/research-tools';
import { Box, Stack, Text, Grid } from '@/layouts/Primitives';
import { ToolCard } from './ToolCard';

export interface ToolSectionProps {
  title: string;
  tools: ResearchTool[];
  navigate: (path: string) => void;
}

export const ToolSection = ({ title, tools, navigate }: ToolSectionProps) => {
  if (tools.length === 0) return null;
  return (
    <Stack gap={12} width="full">
      <Box paddingBottom={4} display="flex" justify="between" align="center" border="b" width="full">
        <Text variant="headline" size="2xl" weight="font-black">{title}</Text>
        <Text variant="mono" size="xs" color="dim" weight="font-semibold" uppercase tracking="widest" opacityVariant="subtle">{tools.length} TOOLS</Text>
      </Box>
      <Grid cols={{ base: 1, sm: 2, lg: 3 }} gap={6} width="full">
        {tools.map((tool) => (
          <ToolCard key={tool.id} tool={tool} navigate={navigate} />
        ))}
      </Grid>
    </Stack>
  );
};
