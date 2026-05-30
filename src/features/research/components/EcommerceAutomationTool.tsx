import {
  ShoppingBag,
  Cpu,
  ShieldCheck,
  Search,
  Eye,
  CheckCircle2,
  AlertTriangle,
  ArrowRight
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
      icon: Cpu,
      title: 'API Template Ingestion',
      description: 'Pull Printful templates, products, and color variants directly through API scripts to ensure data accuracy.'
    },
    {
      icon: Search,
      title: 'Metadata Agent Packets',
      description: 'Generate structured data packets for AI agents to perform title and description reviews.'
    },
    {
      icon: ShoppingBag,
      title: 'SEO Copy Generation',
      description: 'Optimized copy for West Coast Swing, NorCal, rainbow pride, and role-fluid dance merch niches.'
    },
    {
      icon: Eye,
      title: 'Mockup & Crop Audit',
      description: 'Automated auditing of front/back product mockups and responsive image crops for visual quality.'
    },
    {
      icon: CheckCircle2,
      title: 'Color Option Curation',
      description: 'Human-in-the-loop selection of the best product colors rather than publishing every generic option.'
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
              I am extending the same DevAI workflow patterns into ecommerce operations for BoomTick merch.
              This demonstrates practical business automation through API integration and human-in-the-loop curation.
            </Text>
          </Stack>
        </Stack>
      </Box>

      <Grid cols={{ base: 1, md: 2 }} gap={8}>
        <Stack gap={6}>
          <Text variant="headline" size="xl" weight="font-black">Experiment Goals</Text>
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
            <Box border radius="xl" padding={6} surface="muted" className="border-accent/10">
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
                      <AlertTriangle className="w-3 h-3 text-accent/50" />
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
                  <Text variant="mono" size="micro" paddingX={2} paddingY={1} border radius="sm" surface="muted">Printful API</Text>
                  <ArrowRight className="w-3 h-3 text-dim" />
                  <Text variant="mono" size="micro" paddingX={2} paddingY={1} border radius="sm" surface="muted">Metadata Packet</Text>
                  <ArrowRight className="w-3 h-3 text-dim" />
                  <Text variant="mono" size="micro" paddingX={2} paddingY={1} border radius="sm" surface="accent" className="bg-accent/10">AI Recommendation</Text>
                  <ArrowRight className="w-3 h-3 text-dim" />
                  <Text variant="mono" size="micro" paddingX={2} paddingY={1} border radius="sm" surface="muted">Human Review</Text>
                  <ArrowRight className="w-3 h-3 text-dim" />
                  <Text variant="mono" size="micro" paddingX={2} paddingY={1} border radius="sm" surface="muted">Storefront Update</Text>
                </Box>
                <Text size="micro" color="dim" uppercase weight="font-bold" tracking="widest">SEO-SAFE MERCH PIPELINE</Text>
              </Stack>
            </Box>
          </Stack>
        </Stack>
      </Grid>
    </Stack>
  );
}
