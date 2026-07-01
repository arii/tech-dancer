import { ShieldCheck, AlertTriangle } from 'lucide-react';
import { Box, Stack, Text } from '@/layouts/Primitives';
import { Icon } from '@/components/ui/Icon';

const safetyRules = [
  'No fake reviews or manufactured ratings',
  'No unsupported stock status claims',
  'No hard-coded shipping or return promises',
  'No stale or dynamic price claims in copy'
];

export function EcommerceGuardrails() {
  return (
    <Stack gap={6}>
      <Text variant="headline" size="xl" weight="font-black" as="h2">SEO & Policy Safety</Text>
      <Box border radius="xl" padding={6} surface="muted">
        <Stack gap={4}>
          <Box display="flex" align="center" gap={2}>
            <Icon icon={ShieldCheck} size="sm" color="accent" />
            <Text variant="mono" size="xs" weight="font-bold" uppercase tracking="widest">Guardrails</Text>
          </Box>
          <Text size="sm" color="body">
            To maintain long-term SEO health and brand trust, the automation explicitly avoids making unsupported claims.
          </Text>
          <Stack gap={2}>
            {safetyRules.map((rule, index) => (
              <Box key={index} display="flex" align="center" gap={2}>
                <Icon icon={AlertTriangle} size="xs" color="accent" opacityVariant="muted" />
                <Text size="xs" color="dim">{rule}</Text>
              </Box>
            ))}
          </Stack>
        </Stack>
      </Box>
    </Stack>
  );
}
