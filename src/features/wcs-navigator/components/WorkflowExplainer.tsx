import { Search, Calendar, ShieldCheck, Zap, Sparkles, Cpu } from 'lucide-react';
import { Box, Stack, Grid, Text } from '@/layouts/Primitives';
import { Icon } from '@/components/ui/Icon';

export interface WorkflowExplainerProps {
  onClose?: () => void;
}

export const WorkflowExplainer = ({ onClose }: WorkflowExplainerProps) => {
  return (
    <Box width="full" radius="xl" border shadow="sm" className="overflow-hidden border-line/60 bg-surface/40 p-6 animate-in fade-in">
      {/* Single Consolidated Header Row */}
      <Box display="flex" align="start" justify="between" className="border-b border-line/50 pb-4 mb-6" wrap gap={4}>
        <Stack gap={1}>
          <Box display="flex" align="center" gap={2}>
            <span className="px-2 py-0.5 text-xs font-bold font-mono tracking-wider bg-brand-cyan/20 text-brand-cyan rounded">
              GUIDE
            </span>
            <Text as="h2" weight="font-bold" size="md" color="main" className="text-base sm:text-lg">
              How WCS Navigator Works
            </Text>
          </Box>
          <Text size="sm" color="dim" className="text-xs sm:text-sm text-text-dim">
            How your convention schedule is read, filtered by your dance level, and synced to your calendar.
          </Text>
        </Stack>

        {/* One Unified Close Button */}
        {onClose && (
          <Box
            as="button"
            type="button"
            aria-label="Hide Details"
            onClick={onClose}
            className="text-xs font-mono text-text-dim hover:text-text-main flex items-center gap-1.5 cursor-pointer transition-colors shrink-0 py-1"
          >
            <span>Hide Details</span>
            <span>✕</span>
          </Box>
        )}
      </Box>

      {/* Three-Step Grid Content Rows */}
      <Stack gap={6}>
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
  );
};

