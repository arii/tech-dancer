import { Box, Stack, Text, Grid } from '@/layouts/Primitives';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { SEO } from '@/components/SEO';
import { BASE_URL } from '@/config/constants';
import { EcommerceExperimentList } from './EcommerceExperimentList';
import { EcommerceGuardrails } from './EcommerceGuardrails';
import { EcommercePipeline } from './EcommercePipeline';
import { EcommerceVisualQA } from './EcommerceVisualQA';

export function EcommerceAutomationTool() {
  return (
    <Stack gap={8}>
      <SEO
        title="Ecommerce Automation Experiments | DevAI Portfolio"
        description="Experiments in API-driven Printful sync, SEO-safe product metadata generation, and human-in-the-loop catalog review."
        canonical={`${BASE_URL}/research/ecommerce-automation`}
      />
      <Box paddingBottom={8} border="b">
        <Stack gap={4}>
          <Box display="flex" align="center" gap={3}>
            <Text variant="mono" size="xs" weight="font-bold" color="accent" uppercase tracking="widest">Business Automation</Text>
            <StatusBadge label="In Progress" />
          </Box>
          <Stack gap={2}>
            <Text variant="display" size="4xl" weight="font-black" as="h1">Ecommerce Automation Experiments</Text>
            <Text variant="body" size="lg" color="dim" maxWidth="3xl">
              Building reviewable automation experiments for asset generation, metadata packets, product-image QA, and human-approved storefront sync.
              Focusing on niche-aware SEO for <strong>West Coast Swing</strong>, <strong>NorCal</strong>, <strong>rainbow pride</strong>, and <strong>role-fluid dance</strong> communities.
            </Text>
          </Stack>
        </Stack>
      </Box>

      <Grid cols={{ base: 1, md: 2 }} gap={8}>
        <EcommerceExperimentList />
        <Stack gap={8}>
          <EcommerceGuardrails />
          <EcommercePipeline />
        </Stack>
      </Grid>

      <EcommerceVisualQA />
    </Stack>
  );
}
