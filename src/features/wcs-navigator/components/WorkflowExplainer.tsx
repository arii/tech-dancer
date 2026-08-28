import { Search, Calendar, ShieldCheck, Zap, Sparkles, Cpu } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { Box, Stack, Grid, Text } from '@/layouts/Primitives';
import { Icon } from '@/components/ui/Icon';

export interface WorkflowExplainerProps {
  onClose?: () => void;
}

export const WorkflowExplainer = ({ onClose }: WorkflowExplainerProps) => {
  return (
    <Box width="full" radius="xl" border shadow="sm" padding={6} className="overflow-hidden border-line/60 bg-surface/40 animate-in fade-in">
      {/* Single Consolidated Header Row */}
      <Box display="flex" align="start" justify="between" paddingBottom={4} marginBottom={6} className="border-b border-line/50" wrap gap={4}>
        <Stack gap={1}>
          <Box display="flex" align="center" gap={2}>
            <Box as="span" paddingX={2} paddingY={0.5} radius="sm" className="text-xs font-bold font-mono tracking-wider bg-brand-cyan/20 text-brand-cyan">
              GUIDE
            </Box>
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
          <Stack
            as="button"
            type="button"
            direction="row"
            align="center"
            gap={1.5}
            paddingY={1}
            aria-label="Hide Details"
            onClick={onClose}
            className="text-xs font-mono text-text-dim hover:text-text-main cursor-pointer transition-colors shrink-0"
          >
            <span>Hide Details</span>
            <span>✕</span>
          </Stack>
        )}
      </Box>

      {/* Three-Step Grid Content Rows */}
      <Stack gap={6}>
        <Grid cols={{ default: 1, md: 3 }} gap={5}>
          {/* Step 1 Card */}
          <div className="flex flex-col justify-between h-full p-6 rounded-xl bg-slate-900/70 border border-white/10 backdrop-blur-md hover:border-brand-cyan/40 transition-all">
            <div className="space-y-3">
              <div className="flex items-center gap-2 mb-3">
                <Box padding={1.5} radius="md" className="bg-brand-cyan/20 text-brand-cyan shrink-0">
                  <Icon icon={Search} size="xs" />
                </Box>
                <span className="text-xs font-mono font-bold text-brand-cyan uppercase tracking-wider">
                  Step 1: Schedule Reading
                </span>
              </div>
              <h3 className="text-base font-bold text-white">
                Schedule Discovery
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Reads multi-room convention timetables to identify workshop levels, competitive divisions, and late-night social themes.
              </p>
            </div>
            <div className="mt-5 p-3 rounded-lg bg-white/[0.03] border border-white/10 text-xs text-slate-300">
              Extracts: <strong className="text-white font-mono">Workshops, Prelims &amp; Socials</strong>
            </div>
          </div>

          {/* Step 2 Card */}
          <div className="flex flex-col justify-between h-full p-6 rounded-xl bg-slate-900/70 border border-white/10 backdrop-blur-md hover:border-brand-cyan/40 transition-all">
            <div className="space-y-3">
              <div className="flex items-center gap-2 mb-3">
                <Box padding={1.5} radius="md" className="bg-brand-amber/20 text-brand-amber shrink-0">
                  <Icon icon={Zap} size="xs" />
                </Box>
                <span className="text-xs font-mono font-bold text-brand-amber uppercase tracking-wider">
                  Step 2: Buffer Calculation
                </span>
              </div>
              <h3 className="text-base font-bold text-white">
                Travel &amp; Rest Planning
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Calculates backward transit, hotel check-in, and warm-up buffers before your first event so you never rush into competition calls.
              </p>
            </div>
            <div className="mt-5 p-3 rounded-lg bg-white/[0.03] border border-white/10 text-xs text-slate-300">
              Calculates: <strong className="text-white font-mono">Arrival Deadline &amp; Rest Times</strong>
            </div>
          </div>

          {/* Step 3 Card */}
          <div className="flex flex-col justify-between h-full p-6 rounded-xl bg-slate-900/70 border border-white/10 backdrop-blur-md hover:border-brand-cyan/40 transition-all">
            <div className="space-y-3">
              <div className="flex items-center gap-2 mb-3">
                <Box padding={1.5} radius="md" className="bg-brand-emerald/20 text-brand-emerald shrink-0">
                  <Icon icon={Calendar} size="xs" />
                </Box>
                <span className="text-xs font-mono font-bold text-brand-emerald uppercase tracking-wider">
                  Step 3: Calendar Sync
                </span>
              </div>
              <h3 className="text-base font-bold text-white">
                Ready-to-Use Calendar
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Generates an .ics calendar file formatted with your selected workshops, competition alarms, and packing checklist.
              </p>
            </div>
            <div className="mt-5 p-3 rounded-lg bg-white/[0.03] border border-white/10 text-xs text-slate-300">
              Format: <strong className="text-white font-mono">Apple &amp; Google Calendar (.ics)</strong>
            </div>
          </div>
        </Grid>

        {/* Standards & Badges Footer with Generous Spacing */}
        <Box display="flex" wrap align="center" justify="center" gap={8} paddingTop={4} marginTop={2} className="border-t border-line/30 text-text-dim text-xs">
          <Stack direction="row" align="center" gap={2}>
            <Icon icon={ShieldCheck} size="xs" color="accent" />
            <span>Private &amp; Secure</span>
          </Stack>
          <Stack direction="row" align="center" gap={2}>
            <Icon icon={Sparkles} size="xs" color="accent" />
            <span>Personalized Recommendations</span>
          </Stack>
          <Stack direction="row" align="center" gap={2}>
            <Icon icon={Cpu} size="xs" color="accent" />
            <span>Instant Calendar Download</span>
          </Stack>
          <Stack direction="row" align="center" gap={2} className="hover:text-brand-cyan transition-colors">
            <Icon icon={Cpu} size="xs" color="accent" />
            <NavLink to="/blog/2026-08-28-wcs-navigator-architecture" className="underline underline-offset-2">
              Architecture Deep Dive
            </NavLink>
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
};

