import { CloudUpload, Search, Palette, CheckCircle2 } from 'lucide-react';
import { Box, Stack, Text } from '@/layouts/Primitives';
import { Icon } from '@/components/ui/Icon';

const workflowItems = [
  {
    icon: CloudUpload,
    title: 'Printful API Template Pulls',
    description: 'Automated extraction of product templates and variants through API scripts to seed the automation pipeline.'
  },
  {
    icon: Search,
    title: 'Metadata Agent Packets',
    description: 'Generating structured agent packets for AI-assisted title and description review against brand standards.'
  },
  {
    icon: Palette,
    title: 'SEO-Safe Product Copy',
    description: 'Improving SEO copy for West Coast Swing, NorCal, rainbow pride, and role-fluid dance merch while avoiding unsupported claims.'
  },
  {
    icon: CheckCircle2,
    title: 'Mockup & Image QA',
    description: 'Auditing front/back product mockups and image crops for visual fidelity before storefront synchronization.'
  },
  {
    icon: Palette,
    title: 'Color Option Curation',
    description: 'Curating the best product colors for each design rather than publishing every available Printful option.'
  },
  {
    icon: CloudUpload,
    title: 'Human-in-the-Loop Sync',
    description: 'Prototyping dry-run-first Printful/WooCommerce sync workflows that generate reviewable update plans before any human-approved storefront mutation.'
  }
];

export function EcommerceExperimentList() {
  return (
    <Stack gap={6}>
      <Text variant="headline" size="xl" weight="font-black" as="h2">Active Experiments</Text>
      <Stack gap={4}>
        {workflowItems.map((item, index) => (
          <Box key={index} border radius="md" padding={4} surface="default">
            <Box display="flex" gap={4} align="start">
              <Box width={10} height={10} surface="muted" border radius="md" display="flex" align="center" justify="center" shrink={0}>
                <Icon icon={item.icon} size="md" color="accent" />
              </Box>
              <Stack gap={1}>
                <Text weight="font-bold" size="sm">{item.title}</Text>
                <Text size="xs" color="dim">{item.description}</Text>
              </Stack>
            </Box>
          </Box>
        ))}
      </Stack>
    </Stack>
  );
}
