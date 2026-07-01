import { ArrowRight } from 'lucide-react';
import { Box, Stack, Text } from '@/layouts/Primitives';
import { Icon } from '@/components/ui/Icon';

const pipelineSteps = [
  { label: 'Templates', active: false },
  { label: 'Metadata Packet', active: false },
  { label: 'AI Recommendations', active: true },
  { label: 'Dry-run Plan', active: true },
  { label: 'Human Review', active: true },
  { label: 'Approved Sync', active: false },
];

export function EcommercePipeline() {
  return (
    <Stack gap={6}>
      <Text variant="headline" size="xl" weight="font-black" as="h2">Pipeline Architecture</Text>
      <Box border radius="xl" padding={{ base: 6, sm: 8 }} surface="surface" overflowX="auto">
        <Stack gap={6} align="center" minWidth="max-content">
          <Box display="flex" align="center" justify="center" gap={3} width="full">
            {pipelineSteps.map((step, index, arr) => (
              <Box key={step.label} display="flex" align="center" gap={3} shrink={0}>
                <Text
                  variant="mono"
                  size="micro"
                  paddingX={3}
                  paddingY={2}
                  border
                  radius="sm"
                  weight="font-bold"
                  uppercase
                  tracking="widest"
                  surface={step.active ? 'accent' : 'muted'}
                >
                  {step.label}
                </Text>
                {index < arr.length - 1 && (
                  <Box display="flex" align="center" justify="center" shrink={0}>
                    <Icon icon={ArrowRight} size="sm" color="dim" />
                  </Box>
                )}
              </Box>
            ))}
          </Box>
          <Text size="micro" color="dim" uppercase weight="font-black" tracking="widest" opacityVariant="dim">
            MULTI-PLATFORM SYNC PIPELINE
          </Text>
        </Stack>
      </Box>
    </Stack>
  );
}
