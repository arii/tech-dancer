// impeccable-ignore-file
import React, { useState, useEffect, useRef } from 'react';
import { Box, Stack, Text } from '@/layouts/Primitives';
import { Button } from '@/layouts/Button';
import { AgentDecisionTrace } from '../types';
import { FlightBufferTimeline } from './FlightBufferTimeline';
import { FilteringAuditMatrix } from './FilteringAuditMatrix';
import { ThemeDressCodeCard } from './ThemeDressCodeCard';
import { downloadIcsFile } from '../utils/icsDownloader';
import { Download, Brain, Sparkles, CheckCircle2, X } from 'lucide-react';
import { Icon } from '@/components/ui/Icon';

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

export const AgentMindTrace: React.FC<AgentMindTraceProps> = ({ trace, className }) => {
  const [showToast, setShowToast] = useState(false);
  const toastTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (toastTimeoutRef.current) {
        clearTimeout(toastTimeoutRef.current);
      }
    };
  }, []);

  const handleDownloadCalendar = () => {
    const icsString = trace?.icsContent || DEFAULT_ICS;
    downloadIcsFile(icsString, 'wcs-navigator-schedule.ics');

    // Trigger instant visual toast notification feedback
    setShowToast(true);
    if (toastTimeoutRef.current) {
      clearTimeout(toastTimeoutRef.current);
    }
    toastTimeoutRef.current = setTimeout(() => {
      setShowToast(false);
    }, 4500);
  };

  return (
    <Stack gap={8} className={className}>
      {/* 1-Click Instant Download Visual Toast Feedback */}
      {showToast && (
        <Box
          role="status"
          aria-live="polite"
          className="fixed bottom-6 right-4 sm:right-6 md:right-8 z-50 max-w-sm w-full bg-surface/95 backdrop-blur-xl border border-accent/40 rounded-xl p-4 shadow-2xl transition-all duration-300 transform translate-y-0 opacity-100"
        >
          <Box display="flex" align="start" justify="between" gap={3}>
            <Box display="flex" align="start" gap={3}>
              <Box padding={1.5} radius="full" className="bg-accent/20 text-accent shrink-0 mt-0.5">
                <Icon icon={CheckCircle2} size="sm" color="accent" />
              </Box>
              <Stack gap={0.5}>
                <Text weight="font-bold" size="sm" color="main">
                  Calendar Downloaded (.ics)
                </Text>
                <Text size="xs" color="dim" leading="relaxed">
                  <span className="text-white font-mono font-semibold">wcs-navigator-schedule.ics</span> is ready to import into Apple Calendar, Google Calendar, or Outlook.
                </Text>
              </Stack>
            </Box>

            <button
              type="button"
              aria-label="Dismiss download notification"
              onClick={() => setShowToast(false)}
              className="min-h-[44px] min-w-[44px] -mr-2 -mt-2 flex items-center justify-center text-dim hover:text-white transition-colors cursor-pointer"
            >
              <Icon icon={X} size="xs" />
            </button>
          </Box>
        </Box>
      )}

      {/* Header Banner */}
      <Box padding={6} radius="lg" surface="card" border className="border-accent/30 bg-gradient-to-r from-accent/10 via-surface to-surface relative overflow-hidden">
        <Box display="flex" align="start" justify="between" wrap gap={4}>
          <Stack gap={2} maxWidth="2xl">
            <Box display="flex" align="center" gap={2}>
              <Box padding={1} radius="md" className="bg-accent/10 text-accent border border-accent/20">
                <Brain className="w-5 h-5" />
              </Box>
              <Box as="span" className="text-xs font-mono font-bold uppercase tracking-wider text-accent">
                Your Weekend Plan
              </Box>
            </Box>
            <Box as="h2" className="text-2xl font-black text-text-main tracking-tight">
              Personalized Schedule &amp; Travel Buffer
            </Box>
            <Box as="p" className="text-sm text-text-dim leading-relaxed">
              Here is your customized weekend plan: arrival buffer timeline, workshop schedule, and party themes &amp; dress codes.
            </Box>
          </Stack>

          <Button
            onClick={handleDownloadCalendar}
            variant="accent"
            size="md"
            icon={Download}
            className="min-h-[44px]"
          >
            Download Calendar (.ics)
          </Button>
        </Box>

        <Box display="flex" align="center" gap={2} marginTop={4} className="text-xs font-mono text-text-dim">
          <Sparkles className="w-3.5 h-3.5 text-accent shrink-0" />
          <Box as="span">Ready to add directly to Apple Calendar, Google Calendar, or Outlook</Box>
        </Box>
      </Box>

      {/* 1. Flight & Buffer Timeline */}
      <FlightBufferTimeline buffer={trace?.bufferTimeline} />

      {/* 3. Filtering Audit Matrix */}
      <FilteringAuditMatrix sessions={trace?.sessions} />

      {/* 4. Event Themes & Dress Codes */}
      <ThemeDressCodeCard themes={trace?.themeDressCodes} />

      {/* Footer Download Trigger Callout */}
      <Box padding={6} radius="lg" surface="card" border className="text-center border-line">
        <Stack gap={3} align="center">
          <Box as="h3" className="text-lg font-bold text-text-main">
            Ready to Sync Your Schedule?
          </Box>
          <Box as="p" className="text-xs text-text-dim maxWidth-md">
            Download your customized calendar (.ics) with travel buffer reminders, workshops, and competition call times.
          </Box>
          <Button
            onClick={handleDownloadCalendar}
            variant="accent"
            size="lg"
            icon={Download}
            className="min-h-[48px]"
          >
            Download Calendar (.ics)
          </Button>
        </Stack>
      </Box>
    </Stack>
  );
};

