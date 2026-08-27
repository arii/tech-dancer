import { useState } from 'react';
import { Cpu, Search, Calendar, ShieldCheck, Zap, ChevronDown, ChevronUp, Sparkles } from 'lucide-react';
import { Box, Stack, Grid, Text } from '@/layouts/Primitives';
import { Icon } from '@/components/ui/Icon';

export const WorkflowExplainer = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Box width="full" surface="surface" border radius="2xl" shadow="md" className="overflow-hidden border-line/70">
      {/* Collapsible Header Banner (Balanced Vertical Alignment) */}
      <Box
        as="button"
        id="workflow-explainer-trigger"
        type="button"
        aria-expanded={isExpanded}
        aria-controls="workflow-explainer-content"
        onClick={() => setIsExpanded(!isExpanded)}
        display="flex"
        align="center"
        justify="between"
        paddingX={6}
        paddingY={4}
        minHeight={14}
        surface="muted"
        border
        cursor="pointer"
        className="w-full text-left transition-colors border-b border-line/40"
      >
        <Box display="flex" align="center" gap={3}>
          <Box padding={2} radius="xl" border className="bg-brand-cyan/10 border-brand-cyan/30 text-brand-cyan shrink-0">
            <Icon icon={Cpu} size="sm" />
          </Box>
          <Stack gap={0.5}>
            <Box display="flex" align="center" gap={2}>
              <Text weight="font-bold" size="sm" color="main">
                How WCS Navigator Works
              </Text>
              <Text variant="mono" size="micro" weight="font-bold" radius="sm" paddingX={2} paddingY={0.5} border className="bg-brand-cyan/20 text-brand-cyan border-brand-cyan/30">
                GUIDE
              </Text>
            </Box>
            <Text size="xs" color="dim">
              How your convention schedule is read, filtered by your dance level, and synced to your calendar.
            </Text>
          </Stack>
        </Box>

        <Box display="flex" align="center" gap={1.5} className="text-xs font-mono font-medium text-text-dim hover:text-white shrink-0">
          <span>{isExpanded ? 'Hide Details' : 'How It Works'}</span>
          <Icon icon={isExpanded ? ChevronUp : ChevronDown} size="xs" />
        </Box>
      </Box>

      {/* Expanded Workflow Cards & Standards (Generous 24px / p-6 Padding) */}
      {isExpanded && (
        <Box
          id="workflow-explainer-content"
          role="region"
          aria-labelledby="workflow-explainer-trigger"
          padding={6}
        >
          <Stack gap={6}>
            {/* Vertical Stack Cards (No Split Columns) */}
            <Grid cols={{ default: 1, md: 3 }} gap={5}>
              {/* Step 1 Card */}
              <Box
                padding={5}
                radius="xl"
                surface="muted"
                border
                display="flex"
                direction="col"
                justify="between"
                className="border-line/60 hover:border-accent/40 transition-all"
              >
                <Stack gap={2}>
                  <Box display="flex" align="center" gap={2}>
                    <Box padding={1.5} radius="lg" className="bg-brand-cyan/20 text-brand-cyan">
                      <Icon icon={Search} size="xs" />
                    </Box>
                    <Text variant="mono" size="xs" weight="font-bold" color="accent" uppercase tracking="wider" className="text-brand-cyan">
                      Step 1: Schedule Reading
                    </Text>
                  </Box>
                  <Text weight="font-bold" size="sm" color="main">
                    Schedule Discovery
                  </Text>
                  <Text size="xs" color="dim" leading="relaxed">
                    Reads multi-room convention timetables to identify workshop levels, competitive divisions, and late-night social themes.
                  </Text>
                </Stack>
                <Box marginTop={4} padding={2.5} radius="lg" surface="card" border className="border-line/40">
                  <Text size="xs" color="dim">
                    Extracts: <strong className="text-brand-cyan">Workshops, Prelims &amp; Socials</strong>
                  </Text>
                </Box>
              </Box>

              {/* Step 2 Card */}
              <Box
                padding={5}
                radius="xl"
                surface="muted"
                border
                display="flex"
                direction="col"
                justify="between"
                className="border-line/60 hover:border-accent/40 transition-all"
              >
                <Stack gap={2}>
                  <Box display="flex" align="center" gap={2}>
                    <Box padding={1.5} radius="lg" className="bg-brand-amber/20 text-brand-amber">
                      <Icon icon={Zap} size="xs" />
                    </Box>
                    <Text variant="mono" size="xs" weight="font-bold" color="accent" uppercase tracking="wider" className="text-brand-amber">
                      Step 2: Buffer Calculation
                    </Text>
                  </Box>
                  <Text weight="font-bold" size="sm" color="main">
                    Travel &amp; Rest Planning
                  </Text>
                  <Text size="xs" color="dim" leading="relaxed">
                    Calculates backward transit, hotel check-in, and warm-up buffers before your first event so you never rush into competition calls.
                  </Text>
                </Stack>
                <Box marginTop={4} padding={2.5} radius="lg" surface="card" border className="border-line/40">
                  <Text size="xs" color="dim">
                    Calculates: <strong className="text-brand-amber">Arrival Deadline &amp; Rest Times</strong>
                  </Text>
                </Box>
              </Box>

              {/* Step 3 Card */}
              <Box
                padding={5}
                radius="xl"
                surface="muted"
                border
                display="flex"
                direction="col"
                justify="between"
                className="border-line/60 hover:border-accent/40 transition-all"
              >
                <Stack gap={2}>
                  <Box display="flex" align="center" gap={2}>
                    <Box padding={1.5} radius="lg" className="bg-brand-emerald/20 text-brand-emerald">
                      <Icon icon={Calendar} size="xs" />
                    </Box>
                    <Text variant="mono" size="xs" weight="font-bold" color="accent" uppercase tracking="wider" className="text-brand-emerald">
                      Step 3: Calendar Sync
                    </Text>
                  </Box>
                  <Text weight="font-bold" size="sm" color="main">
                    Ready-to-Use Calendar
                  </Text>
                  <Text size="xs" color="dim" leading="relaxed">
                    Generates an .ics calendar file formatted with your selected workshops, competition alarms, and packing checklist.
                  </Text>
                </Stack>
                <Box marginTop={4} padding={2.5} radius="lg" surface="card" border className="border-line/40">
                  <Text size="xs" color="dim">
                    Format: <strong className="text-brand-emerald">Apple &amp; Google Calendar (.ics)</strong>
                  </Text>
                </Box>
              </Box>
            </Grid>

            {/* Standards & Badges Footer with Generous Padding */}
            <Box paddingTop={4} border className="border-t border-line/50">
              <Box display="flex" align="center" justify="between" wrap gap={4}>
                <Box display="flex" align="center" gap={6} wrap>
                  <Box display="flex" align="center" gap={2}>
                    <Icon icon={ShieldCheck} size="xs" color="accent" />
                    <Text size="xs" color="dim">Private &amp; Secure</Text>
                  </Box>
                  <Box display="flex" align="center" gap={2}>
                    <Icon icon={Sparkles} size="xs" color="accent" />
                    <Text size="xs" color="dim">Personalized Recommendations</Text>
                  </Box>
                  <Box display="flex" align="center" gap={2}>
                    <Icon icon={Cpu} size="xs" color="accent" />
                    <Text size="xs" color="dim">Instant Calendar Download</Text>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Stack>
        </Box>
      )}
    </Box>
  );
};

