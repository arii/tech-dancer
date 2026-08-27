import React, { useState } from 'react';
import { Box, Stack, Text, Grid } from '@/layouts/Primitives';
import { Icon } from '@/components/ui/Icon';
import { Cpu, Search, Sparkles, Calendar, ShieldCheck, Zap, ChevronDown, ChevronUp } from 'lucide-react';

export const WorkflowExplainer: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Box surface="surface" radius="xl" border className="border-line/70 overflow-hidden">
      {/* Collapsible Header Banner */}
      <Box
        as="button"
        type="button"
        onClick={() => setIsExpanded(!isExpanded)}
        width="full"
        paddingX={6}
        paddingY={4}
        display="flex"
        align="center"
        justify="between"
        surface="muted"
        className="text-left hover:bg-surface/80 transition-colors border-b border-line/40"
      >
        <Box display="flex" align="center" gap={3}>
          <Box
            padding={2}
            radius="lg"
            className="bg-brand-cyan/10 border border-brand-cyan/30 text-brand-cyan shrink-0"
          >
            <Icon icon={Cpu} size="sm" />
          </Box>
          <Stack gap={0.5}>
            <Box display="flex" align="center" gap={2}>
              <Text variant="headline" size="sm" weight="font-bold" color="main">
                Agent Architecture & Two-Pass Intelligence
              </Text>
              <Text size="micro" weight="font-bold" radius="sm" paddingX={2} paddingY={0.5} className="bg-brand-cyan/20 text-brand-cyan">
                DEMO GUIDE
              </Text>
            </Box>
            <Text size="xs" color="dim">
              How Gemini 3.5 Flash scans visual schedule PDFs, computes backward arrival buffers, and streams calendar files.
            </Text>
          </Stack>
        </Box>

        <Box display="flex" align="center" gap={1} color="dim" className="shrink-0 text-xs font-mono font-medium">
          <span>{isExpanded ? 'Hide Architecture' : 'View Workflow'}</span>
          <Icon icon={isExpanded ? ChevronUp : ChevronDown} size="xs" />
        </Box>
      </Box>

      {/* Expanded Workflow Diagrams & Badges */}
      {isExpanded && (
        <Box padding={6} display="flex" flex="col" gap={6}>
          {/* Architecture Visual Grid */}
          <Grid cols={{ base: 1, md: 3 }} gap={4}>
            {/* Step 1 Card */}
            <Box surface="muted" padding={4} radius="lg" border className="border-line/50 flex flex-col justify-between">
              <Stack gap={2}>
                <Box display="flex" align="center" gap={2}>
                  <Box padding={1.5} radius="md" className="bg-brand-cyan/20 text-brand-cyan">
                    <Icon icon={Search} size="xs" />
                  </Box>
                  <Text size="xs" weight="font-bold" uppercase tracking="wider" color="accent">
                    Pass 1: Vision Pre-Scan
                  </Text>
                </Box>
                <Text size="xs" color="main" weight="font-bold">
                  Unstructured Schedule Discovery
                </Text>
                <Text size="micro" color="dim" leading="relaxed">
                  Gemini Flash scans multi-room PDF layouts to extract workshop tiers, competitive divisions, and theme nights, synthesizing a dynamic query form with &ldquo;Why We Ask This&rdquo; explainability.
                </Text>
              </Stack>
              <Box marginTop={3} padding={2} radius="sm" className="bg-surface/60 border border-line/40">
                <Text size="micro" variant="mono" color="dim">
                  Endpoint: <span className="text-brand-cyan">POST /discover</span>
                </Text>
              </Box>
            </Box>

            {/* Step 2 Card */}
            <Box surface="muted" padding={4} radius="lg" border className="border-line/50 flex flex-col justify-between">
              <Stack gap={2}>
                <Box display="flex" align="center" gap={2}>
                  <Box padding={1.5} radius="md" className="bg-brand-amber/20 text-brand-amber">
                    <Icon icon={Zap} size="xs" />
                  </Box>
                  <Text size="xs" weight="font-bold" uppercase tracking="wider" color="accent">
                    Pass 2: Reason & Buffer
                  </Text>
                </Box>
                <Text size="xs" color="main" weight="font-bold">
                  Temporal Logistics Math
                </Text>
                <Text size="micro" color="dim" leading="relaxed">
                  Fuses your questionnaire answers with the schedule. Executes step-down backward math (Staging &minus; Transit &minus; Hotel &minus; Warmup = Target Landing) and builds an audit matrix.
                </Text>
              </Stack>
              <Box marginTop={3} padding={2} radius="sm" className="bg-surface/60 border border-line/40">
                <Text size="micro" variant="mono" color="dim">
                  Engine: <span className="text-brand-amber">calculate_flight_buffer()</span>
                </Text>
              </Box>
            </Box>

            {/* Step 3 Card */}
            <Box surface="muted" padding={4} radius="lg" border className="border-line/50 flex flex-col justify-between">
              <Stack gap={2}>
                <Box display="flex" align="center" gap={2}>
                  <Box padding={1.5} radius="md" className="bg-brand-emerald/20 text-brand-emerald">
                    <Icon icon={Calendar} size="xs" />
                  </Box>
                  <Text size="xs" weight="font-bold" uppercase tracking="wider" color="accent">
                    In-Memory Streaming
                  </Text>
                </Box>
                <Text size="xs" color="main" weight="font-bold">
                  Zero-Disk RFC 5545 Export
                </Text>
                <Text size="micro" color="dim" leading="relaxed">
                  Outputs RFC 5545 valid .ics calendar content and packing manifest directly over HTTP. Zero server disk writes or database persistence, protecting user privacy.
                </Text>
              </Stack>
              <Box marginTop={3} padding={2} radius="sm" className="bg-surface/60 border border-line/40">
                <Text size="micro" variant="mono" color="dim">
                  Output: <span className="text-brand-emerald">text/calendar (.ics)</span>
                </Text>
              </Box>
            </Box>
          </Grid>

          {/* Standards & Badges Footer */}
          <Box display="flex" align="center" justify="between" wrap="wrap" gap={3} border="t" paddingTop={4} className="border-line/40">
            <Box display="flex" align="center" gap={4} wrap="wrap">
              <Box display="flex" align="center" gap={1.5}>
                <Icon icon={ShieldCheck} size="xs" color="accent" />
                <Text size="micro" color="dim">Zero-Disk Privacy Guarantee</Text>
              </Box>
              <Box display="flex" align="center" gap={1.5}>
                <Icon icon={Sparkles} size="xs" color="accent" />
                <Text size="micro" color="dim">P0 Explainability Compliance</Text>
              </Box>
              <Box display="flex" align="center" gap={1.5}>
                <Icon icon={Cpu} size="xs" color="accent" />
                <Text size="micro" color="dim">Google GenAI SDK (Gemini Flash)</Text>
              </Box>
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
};
