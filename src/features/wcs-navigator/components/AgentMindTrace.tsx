import { Box, Stack } from '@/layouts/Primitives';
import { Button } from '@/layouts/Button';
import { AgentDecisionTrace } from '../types';
import { ExecutionProgressBar } from './ExecutionProgressBar';
import { FlightBufferTimeline } from './FlightBufferTimeline';
import { FilteringAuditMatrix } from './FilteringAuditMatrix';
import { PackingManifestCard } from './PackingManifestCard';
import { downloadIcsFile } from '../utils/icsDownloader';
import { Download, Brain, Sparkles } from 'lucide-react';

export interface AgentMindTraceProps {
  trace?: Partial<AgentDecisionTrace>;
  className?: string;
}

const DEFAULT_ICS = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//WCS Navigator//Agent Mind Calendar//EN
CALSCALE:GREGORIAN
METHOD:PUBLISH
X-WR-CALNAME:WCS Navigator Schedule
BEGIN:VEVENT
SUMMARY:Novice Jack & Jill Prelims
DTSTART:20261016T230000Z
DTEND:20261017T010000Z
LOCATION:Grand Ballroom A
DESCRIPTION:Matched Division: Novice. Staging buffer applied.
END:VEVENT
BEGIN:VEVENT
SUMMARY:WCS Foundations Technique Workshop
DTSTART:20261017T170000Z
DTEND:20261017T183000Z
LOCATION:Studio B
DESCRIPTION:Matched Track: All-Levels Workshop.
END:VEVENT
END:VCALENDAR`;

export function AgentMindTrace({ trace, className }: AgentMindTraceProps) {
  const handleDownloadCalendar = () => {
    const icsString = trace?.icsContent || DEFAULT_ICS;
    downloadIcsFile(icsString, 'wcs-navigator-schedule.ics');
  };

  return (
    <Stack gap={8} className={className}>
      {/* Header Banner */}
      <Box padding={6} radius="lg" surface="card" border className="border-accent/30 bg-gradient-to-r from-accent/10 via-surface to-surface relative overflow-hidden">
        <Box display="flex" align="start" justify="between" wrap gap={4}>
          <Stack gap={2} maxWidth="2xl">
            <Box display="flex" align="center" gap={2}>
              <Box padding={1} radius="md" className="bg-accent/10 text-accent border border-accent/20">
                <Brain className="w-5 h-5" />
              </Box>
              <Box as="span" className="text-xs font-mono font-bold uppercase tracking-wider text-accent">
                Agent Mind Decision Explainer
              </Box>
            </Box>
            <Box as="h2" className="text-2xl font-black text-text-main tracking-tight">
              WCS Navigator Reasoning &amp; Logistics Trace
            </Box>
            <Box as="p" className="text-sm text-text-dim leading-relaxed">
              Complete explainability breakdown of the agent&apos;s decision-making process: live step updates, travel buffer backward calculations, filter matrix, and packing manifest.
            </Box>
          </Stack>

          <Button
            onClick={handleDownloadCalendar}
            variant="accent"
            size="md"
            icon={Download}
          >
            Download Calendar (.ics)
          </Button>
        </Box>

        <Box display="flex" align="center" gap={2} marginTop={4} className="text-xs font-mono text-text-dim">
          <Sparkles className="w-3.5 h-3.5 text-accent shrink-0" />
          <Box as="span">In-memory RFC 5545 stream ready for Apple &amp; Google Calendar</Box>
        </Box>
      </Box>

      {/* 1. Live Execution Progress Bar */}
      <ExecutionProgressBar tasks={trace?.subTasks} />

      {/* 2. Flight & Buffer Timeline */}
      <FlightBufferTimeline buffer={trace?.bufferTimeline} />

      {/* 3. Filtering Audit Matrix */}
      <FilteringAuditMatrix sessions={trace?.sessions} />

      {/* 4. Packing Manifest Cards */}
      <PackingManifestCard items={trace?.packingManifest} />

      {/* Footer Download Trigger Callout */}
      <Box padding={6} radius="lg" surface="card" border className="text-center border-line">
        <Stack gap={3} align="center">
          <Box as="h3" className="text-lg font-bold text-text-main">
            Ready to Sync Your Schedule?
          </Box>
          <Box as="p" className="text-xs text-text-dim maxWidth-md">
            Clicking download generates a direct in-memory .ics file formatted with all buffer margins and session details.
          </Box>
          <Button
            onClick={handleDownloadCalendar}
            variant="accent"
            size="lg"
            icon={Download}
          >
            Download Calendar (.ics)
          </Button>
        </Stack>
      </Box>
    </Stack>
  );
}
