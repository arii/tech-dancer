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
import { ASSET_PREFIX } from '@/config/constants';
import { TOOL_ID_ECOMMERCE_AUTOMATION } from '@/config/devai-tool-ids';
import { ResearchToolShell } from '@/components/research/ResearchToolShell';

import { BASE_URL } from '@/config/constants';

export function EcommerceAutomationTool() {
  const features = [
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
    }
  ];

  const safetyRules = [
    'No fake reviews or manufactured ratings',
    'No unsupported stock status claims',
    'No hard-coded shipping or return promises',
    'No stale or dynamic price claims in copy'
  ];

  return (
        <ResearchToolShell
      title="Ecommerce Automation Experiments"
      description={
        <>
          Building reviewable automation experiments for asset generation, metadata packets, product-image QA, and human-approved storefront sync. Focusing on niche-aware SEO for <strong>West Coast Swing</strong>, <strong>NorCal</strong>, <strong>rainbow pride</strong>, and <strong>role-fluid dance</strong> communities. <StatusBadge label="In Progress" />
        </>
      }
      toolId={TOOL_ID_ECOMMERCE_AUTOMATION}
      features={features}
      seo={{
        title: "Ecommerce Automation Experiments | DevAI Portfolio",
        description: "Experiments in API-driven Printful sync, SEO-safe product metadata generation, and human-in-the-loop catalog review.",
        canonical: `${BASE_URL}/research/ecommerce-automation`
      }}
    >
      <Stack gap={8}>
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

        <Stack gap={6}>
          <Text variant="headline" size="xl" weight="font-black" as="h2">Pipeline Architecture</Text>
          <Box border radius="xl" padding={{ base: 6, sm: 8 }} surface="surface" overflowX="auto">
            <Stack gap={6} align="center" minWidth="max-content">
              <Box
                display="flex"
                align="center"
                justify="center"
                gap={3}
                width="full"
              >
                {[
                  { label: 'Templates', active: false },
                  { label: 'Metadata Packet', active: false },
                  { label: 'AI Recommendations', active: true },
                  { label: 'Dry-run Plan', active: true },
                  { label: 'Human Review', active: true },
                  { label: 'Approved Sync', active: false },
                ].map((step, index, arr) => (
                  <Box
                    key={step.label}
                    display="flex"
                    align="center"
                    gap={3}
                    shrink={0}
                  >
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

        <Stack gap={6}>
          <Text variant="headline" size="xl" weight="font-black" as="h2">Visual Image QA Examples</Text>
          <Grid cols={{ base: 1, sm: 2, lg: 3 }} gap={6}>
            <Box border radius="lg" overflow="hidden" surface="default">
              <Box padding={4} aspect="square" display="flex" align="center" justify="center">
                <img
                  src={`${ASSET_PREFIX}/assets/gear/norcal-bestcal-front.webp`}
                  alt="NorCal BestCal Front Mockup"
                  className="max-w-full max-h-full object-contain"
                />
              </Box>
              <Box padding={4} border="t">
                <Text size="xs" weight="bold">FRONT QA CHECK</Text>
                <Text size="micro" color="dim">Center alignment and color profile validation.</Text>
              </Box>
            </Box>
            <Box border radius="lg" overflow="hidden" surface="default">
              <Box padding={4} aspect="square" display="flex" align="center" justify="center">
                <img
                  src={`${ASSET_PREFIX}/assets/gear/norcal-bestcal-back.webp`}
                  alt="NorCal BestCal Back Mockup"
                  className="max-w-full max-h-full object-contain"
                />
              </Box>
              <Box padding={4} border="t">
                <Text size="xs" weight="bold">BACK QA CHECK</Text>
                <Text size="micro" color="dim">Print area boundaries and text legibility.</Text>
              </Box>
            </Box>
            <Box border radius="lg" overflow="hidden" surface="default" display="flex" align="center" justify="center" padding={8}>
               <Stack gap={4} align="center" textAlign="center">
                  <Icon icon={CheckCircle2} size="xl" color="accent" />
                  <Stack gap={2}>
                    <Text size="sm" weight="bold">PASSING QUALITY</Text>
                    <Text size="micro" color="dim">Automated crop analysis confirms centering within precise tolerance.</Text>
                  </Stack>
               </Stack>
            </Box>
          </Grid>
        </Stack>
      </Stack>
    </ResearchToolShell>
  );
}
