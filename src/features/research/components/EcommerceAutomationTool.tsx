import {
  ShieldCheck,
  Search,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Palette,
  CloudUpload
} from 'lucide-react';
import {
  Box,
  Stack,
  Text,
  Grid
} from '@/layouts/Primitives';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { Icon } from '@/components/ui/Icon';

export function EcommerceAutomationTool() {
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
      description: 'Auditing front/back product mockups and image crops for visual fidelity before live publishing.'
    },
    {
      icon: Palette,
      title: 'Color Option Curation',
      description: 'Curating the best product colors for each design rather than publishing every available Printful option.'
    },
    {
      icon: CloudUpload,
      title: 'Human-in-the-Loop Updates',
      description: 'Executing human-approved storefront updates via API once all metadata and image QA checks pass.'
    }
  ];

  const safetyRules = [
    'No fake reviews or manufactured ratings',
    'No unsupported stock status claims',
    'No hard-coded shipping or return promises',
    'No stale or dynamic price claims in copy'
  ];

  return (
    <Stack gap={8}>
      <Box paddingBottom={8} borderBottom>
        <Stack gap={4}>
          <Box display="flex" align="center" gap={3}>
            <Text variant="mono" size="xs" weight="font-bold" color="accent" uppercase tracking="widest">Business Automation</Text>
            <StatusBadge label="In Progress" />
          </Box>
          <Stack gap={2}>
            <Text variant="display" size="4xl" weight="font-black">Ecommerce Automation Experiments</Text>
            <Text variant="body" size="lg" color="dim" maxWidth="3xl">
              Building reviewable automation experiments for asset generation, metadata packets, product-image QA, and human-approved storefront sync.
              Focusing on niche-aware SEO for <strong>West Coast Swing</strong>, <strong>NorCal</strong>, <strong>rainbow pride</strong>, and <strong>role-fluid dance</strong> communities.
            </Text>
          </Stack>
        </Stack>
      </Box>

      <Grid cols={{ base: 1, md: 2 }} gap={8}>
        <Stack gap={6}>
          <Text variant="headline" size="xl" weight="font-black">Active Experiments</Text>
          <Stack gap={4}>
            {workflowItems.map((item, index) => (
              <Box key={index} border radius="lg" padding={4} surface="default">
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

        <Stack gap={8}>
          <Stack gap={6}>
            <Text variant="headline" size="xl" weight="font-black">SEO & Policy Safety</Text>
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
                      <Icon icon={AlertTriangle} size="xs" color="accent" opacity={0.5} />
                      <Text size="xs" color="dim">{rule}</Text>
                    </Box>
                  ))}
                </Stack>
              </Stack>
            </Box>
          </Stack>

          <Stack gap={6}>
            <Text variant="headline" size="xl" weight="font-black">Pipeline Architecture</Text>
            <Box border radius="xl" padding={6} surface="surface">
              <Stack gap={4} align="center">
                <Box display="flex" align="center" gap={2} wrap="wrap" justify="center">
                  <Text variant="mono" size="micro" paddingX={2} paddingY={1} border radius="sm" surface="muted">Templates</Text>
                  <Icon icon={ArrowRight} size="xs" color="dim" />
                  <Text variant="mono" size="micro" paddingX={2} paddingY={1} border radius="sm" surface="muted">Metadata Packet</Text>
                  <Icon icon={ArrowRight} size="xs" color="dim" />
                  <Text variant="mono" size="micro" paddingX={2} paddingY={1} border radius="sm" surface="accent">AI Recommendations</Text>
                  <Icon icon={ArrowRight} size="xs" color="dim" />
                  <Text variant="mono" size="micro" paddingX={2} paddingY={1} border radius="sm" surface="accent">Human Review</Text>
                  <Icon icon={ArrowRight} size="xs" color="dim" />
                  <Text variant="mono" size="micro" paddingX={2} paddingY={1} border radius="sm" surface="muted">API Sync</Text>
                  <Icon icon={ArrowRight} size="xs" color="dim" />
                  <Text variant="mono" size="micro" paddingX={2} paddingY={1} border radius="sm" surface="muted">SEO-Safe Merch Page</Text>
                </Box>
                <Text size="micro" color="dim" uppercase weight="font-bold" tracking="widest">MULTI-PLATFORM SYNC PIPELINE</Text>
              </Stack>
            </Box>
          </Stack>
        </Stack>
      </Grid>
    </Stack>
  );
}
