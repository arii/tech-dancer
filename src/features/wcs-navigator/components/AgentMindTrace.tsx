
import { useState, useEffect, useRef, useMemo } from 'react';
import { Box, Stack, Grid, Text } from '@/layouts/Primitives';
import { Button } from '@/layouts/Button';
import { AgentDecisionTrace } from '../types';
import { FlightBufferTimeline } from './FlightBufferTimeline';
import { FilteringAuditMatrix } from './FilteringAuditMatrix';
import { ThemeDressCodeCard } from './ThemeDressCodeCard';
import { ExecutionProgressBar } from './ExecutionProgressBar';
import { downloadIcsFile } from '../utils/icsDownloader';
import { Download, Brain, Sparkles, CheckCircle2, X, FileText } from 'lucide-react';
import { Icon } from '@/components/ui/Icon';

export interface AgentMindTraceProps {
  trace?: Partial<AgentDecisionTrace>;
  visualScheduleMarkdown?: string;
  className?: string;
}

const FRIDAY_AFTERNOON_REGEX = /(?:12|[1-6]):\d{2}\s*pm/i;
const SUNDAY_MORNING_REGEX = /(?:12|[1-9]|10|11):\d{2}\s*am/i;

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

export const AgentMindTrace: React.FC<AgentMindTraceProps> = ({ trace, visualScheduleMarkdown, className }) => {
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState({ title: '', message: '', file: '' });
  const [flightOffset, setFlightOffset] = useState<number>(0);
  const toastTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (toastTimeoutRef.current) {
        clearTimeout(toastTimeoutRef.current);
      }
    };
  }, []);

  const showFeedbackToast = (title: string, message: string, file: string) => {
    setToastMessage({ title, message, file });
    setShowToast(true);
    if (toastTimeoutRef.current) {
      clearTimeout(toastTimeoutRef.current);
    }
    toastTimeoutRef.current = setTimeout(() => {
      setShowToast(false);
    }, 4500);
  };

  const handleDownloadCalendar = () => {
    const icsString = trace?.icsContent || DEFAULT_ICS;
    downloadIcsFile(icsString, 'wcs-navigator-schedule.ics');
    showFeedbackToast(
      'Calendar Downloaded (.ics)',
      'is ready to import into Apple Calendar, Google Calendar, or Outlook.',
      'wcs-navigator-schedule.ics'
    );
  };

  const handleDownloadVisualSchedule = () => {
    const content = visualScheduleMarkdown || "# Your WCS Visual Schedule\nNo summary available.";
    const blob = new Blob([content], { type: 'text/markdown;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'wcs-visual-schedule.md');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    showFeedbackToast(
      'Visual Schedule Downloaded',
      'is ready to view on your device.',
      'wcs-visual-schedule.md'
    );
  };

  // Dynamically recalculate sessions when flight arrival time is adjusted (Item 5)
  const dynamicSessions = useMemo(() => {
    const rawSessions = trace?.sessions;
    if (!rawSessions) return undefined;

    if (flightOffset === 0) return rawSessions;

    return rawSessions.map((session) => {
      const lowerTime = session.time.toLowerCase();

      // Flight landed late (+30m or more): mark Friday afternoon workshops as time conflicts
      if (flightOffset > 0) {
        const isFridayAfternoon = lowerTime.includes('fri') && FRIDAY_AFTERNOON_REGEX.test(session.time);
        if (isFridayAfternoon) {
          return {
            ...session,
            status: 'filtered' as const,
            decisionBadge: 'Time Conflict (Flight Delay)',
            justification: `Flight delayed by +${flightOffset}m. Arrival/transit window overlaps with this session.`,
          };
        }
      }

      // Flight departs early (-30m or more): mark Sunday morning workshops as time conflicts
      if (flightOffset < 0) {
        const isSundayMorning = lowerTime.includes('sun') && SUNDAY_MORNING_REGEX.test(session.time);
        if (isSundayMorning) {
          return {
            ...session,
            status: 'filtered' as const,
            decisionBadge: 'Time Conflict (Early Departure)',
            justification: `Early flight departure shifted by ${flightOffset}m. Checkout/transit window overlaps with this session.`,
          };
        }
      }

      return session;
    });
  }, [trace?.sessions, flightOffset]);

  return (
    <Stack gap={8} className={className}>
      <ExecutionProgressBar tasks={trace?.subTasks} />
      {/* 1-Click Instant Download Visual Toast Feedback */}
      {showToast && (
        <Box
          role="status"
          aria-live="polite"
          padding={4}
          radius="xl"
          border
          shadow="2xl"
          className="fixed bottom-6 right-4 sm:right-6 md:right-8 z-50 max-w-sm w-full bg-surface/95 backdrop-blur-xl border-accent/40 motion-safe:transition-all motion-safe:duration-300 motion-safe:transform translate-y-0 opacity-100"
        >
          <Box display="flex" align="start" justify="between" gap={3}>
            <Box display="flex" align="start" gap={3}>
              <Box padding={1.5} radius="full" className="bg-accent/20 text-accent shrink-0">
                <Icon icon={CheckCircle2} size="sm" color="accent" />
              </Box>
              <Stack gap={0.5}>
                <Text weight="font-bold" size="sm" color="main">
                  {toastMessage.title}
                </Text>
                <Text size="xs" color="dim" leading="relaxed">
                  <span className="text-white font-mono font-semibold">{toastMessage.file}</span> {toastMessage.message}
                </Text>
              </Stack>
            </Box>

            <Box
              as="button"
              type="button"
              aria-label="Dismiss download notification"
              onClick={() => setShowToast(false)}
              minHeight="11"
              width={11}
              display="flex"
              align="center"
              justify="center"
              cursor="pointer"
              className="text-dim hover:text-white transition-colors"
            >
              <Icon icon={X} size="xs" />
            </Box>
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

          <Stack gap={3}>
            <Button
              onClick={handleDownloadCalendar}
              variant="accent"
              size="md"
              icon={Download}
            >
              Download Calendar (.ics)
            </Button>
            <Button
              onClick={handleDownloadVisualSchedule}
              variant="primary"
              size="md"
              icon={FileText}
            >
              Download Mobile Schedule
            </Button>
          </Stack>
        </Box>

        <Box display="flex" align="center" gap={2} marginTop={4} className="text-xs font-mono text-text-dim">
          <Sparkles className="w-3.5 h-3.5 text-accent shrink-0" />
          <Box as="span">Sync calendar or save a mobile-friendly Markdown summary for your lock screen</Box>
        </Box>
      </Box>

      {/* 2-Column Wide Desktop Layout Grid (lg+) */}
      <Grid cols={{ default: 1, lg: 12 }} gap={8} align="start">
        {/* Left Column (lg: 5 cols): Arrival Timeline & Travel Buffer Breakdown */}
        <Box span={{ default: 12, lg: 5 }}>
          <FlightBufferTimeline
            buffer={trace?.bufferTimeline}
            flightOffsetMinutes={flightOffset}
            onFlightOffsetChange={setFlightOffset}
          />
        </Box>

        {/* Right Column (lg: 7 cols): Matched Workshops & Schedule Matrix + Event Themes & Dress Codes */}
        <Box span={{ default: 12, lg: 7 }}>
          <Stack gap={8}>
            <FilteringAuditMatrix sessions={dynamicSessions} />
            <ThemeDressCodeCard themes={trace?.themeDressCodes} />
          </Stack>
        </Box>
      </Grid>

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
          >
            Download Calendar (.ics)
          </Button>
        </Stack>
      </Box>
    </Stack>
  );
};

