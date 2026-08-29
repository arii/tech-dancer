import { useState, useEffect, useRef, useMemo, useCallback, FC } from 'react';
import { Box, Stack, Text, Grid } from '@/layouts/Primitives';
import { AgentDecisionTrace, AuditSession, ThemeDressCode, FlightBuffer } from '../types';
import { DiscoveryResponse, QuestionAnswerValue } from '../types/navigator';
import { ServiceTelemetry } from '../services/wcsApiClient';
import { FlightBufferTimeline } from './FlightBufferTimeline';
import { FullScheduleModal } from './FullScheduleModal';
import { DecisionDebugInspector } from './DecisionDebugInspector';
import { downloadIcsFile } from '../utils/icsDownloader';
import { useNavigatorStorage } from '../hooks/useNavigatorStorage';
import {
  Download,
  CheckCircle2,
  X,
  FileText,
  Clock,
  MapPin,
  Calendar,
  Sparkles,
  Shirt,
  ListFilter,
  RotateCcw,
  Cpu,
} from 'lucide-react';
import { Icon } from '@/components/ui/Icon';

export interface AgentMindTraceProps {
  trace?: Partial<AgentDecisionTrace>;
  visualScheduleMarkdown?: string;
  className?: string;
  activeEventName?: string;
  selectedDivision?: string;
  selectedRole?: string;
  telemetry?: ServiceTelemetry;
  answers?: Record<string, QuestionAnswerValue>;
  discoveryData?: DiscoveryResponse;
}

function buildDynamicIcs(
  eventName: string,
  sessions: AuditSession[],
  buffer?: FlightBuffer
): string {
  const stagingTime = buffer?.earliestStagingTime || '5:15 PM';

  const events = [
    [
      'BEGIN:VEVENT',
      `UID:flight-landing-${Date.now()}@wcs-navigator.boomtick.blog`,
      'SUMMARY:✈️ Target Flight Landing Deadline',
      `DESCRIPTION:Recommended latest flight touchdown before ${stagingTime}. Computed by WCS Navigator.`,
      'DTSTART:20261009T212500Z',
      'DTEND:20261009T215500Z',
      'BEGIN:VALARM',
      'TRIGGER:-PT15M',
      'ACTION:DISPLAY',
      'DESCRIPTION:Reminder: Flight landing deadline for WCS convention',
      'END:VALARM',
      'END:VEVENT',
    ].join('\r\n'),
    ...sessions.map((s, i) =>
      [
        'BEGIN:VEVENT',
        `UID:session-${i}-${Date.now()}@wcs-navigator.boomtick.blog`,
        `SUMMARY:${s.title}`,
        `DESCRIPTION:Scheduled at ${s.time} in ${s.location}. ${s.justification}`,
        `LOCATION:${s.location}`,
        'DTSTART:20261010T170000Z',
        'DTEND:20261010T181500Z',
        'BEGIN:VALARM',
        'TRIGGER:-PT15M',
        'ACTION:DISPLAY',
        `DESCRIPTION:Reminder: ${s.title}`,
        'END:VALARM',
        'END:VEVENT',
      ].join('\r\n')
    ),
  ];

  return [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//WCS Navigator//Event Calendar Generator//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    `X-WR-CALNAME:${eventName} Custom Schedule`,
    ...events,
    'END:VCALENDAR',
  ].join('\r\n');
}

export const AgentMindTrace: FC<AgentMindTraceProps> = ({
  trace,
  visualScheduleMarkdown,
  className,
  activeEventName = 'South Bay Dance Fling 2026',
  selectedDivision = 'novice',
  selectedRole,
  telemetry,
  answers = {},
  discoveryData,
}) => {
  const { getSavedSchedule, saveCustomSchedule, clearCustomSchedule } =
    useNavigatorStorage(activeEventName);

  const [isFullScheduleOpen, setIsFullScheduleOpen] = useState(false);
  const [isDebugInspectorOpen, setIsDebugInspectorOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState({ title: '', message: '', file: '' });

  // Maintain custom session inclusions with localStorage persistence without setState in useEffect
  const [customOverrides, setCustomOverrides] = useState<Record<string, 'included' | 'filtered'>>({});

  const allSessions = useMemo(() => {
    const raw = trace?.sessions || [];
    const savedIncludedIds = getSavedSchedule(activeEventName);

    return raw.map((s) => {
      if (customOverrides[s.id]) {
        return { ...s, status: customOverrides[s.id] };
      }
      if (savedIncludedIds && savedIncludedIds.length > 0) {
        return {
          ...s,
          status: savedIncludedIds.includes(s.id) ? ('included' as const) : ('filtered' as const),
        };
      }
      return s;
    });
  }, [trace?.sessions, customOverrides, activeEventName, getSavedSchedule]);

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

  // Toggle session inclusion in custom schedule
  const handleToggleSession = useCallback(
    (sessionId: string) => {
      const currentSession = allSessions.find((s) => s.id === sessionId);
      const nextStatus = currentSession?.status === 'included' ? ('filtered' as const) : ('included' as const);

      setCustomOverrides((prev) => ({
        ...prev,
        [sessionId]: nextStatus,
      }));

      const updatedIncludedIds = allSessions
        .map((s) => (s.id === sessionId ? { ...s, status: nextStatus } : s))
        .filter((s) => s.status === 'included')
        .map((s) => s.id);

      saveCustomSchedule(activeEventName, updatedIncludedIds);

      const actionLabel = nextStatus === 'included' ? 'Added to' : 'Removed from';
      showFeedbackToast(
        'Itinerary Updated',
        `${actionLabel} your schedule: ${currentSession?.title || 'Session'}`,
        'schedule.ics'
      );
    },
    [activeEventName, allSessions, saveCustomSchedule]
  );

  const handleResetToAiPlan = useCallback(() => {
    clearCustomSchedule(activeEventName);
    setCustomOverrides({});
    showFeedbackToast(
      'Schedule Reset',
      'Restored original AI recommended schedule.',
      'wcs-schedule.ics'
    );
  }, [activeEventName, clearCustomSchedule]);

  // Active included sessions
  const includedSessions = useMemo(() => {
    return allSessions.filter((s) => s.status === 'included');
  }, [allSessions]);

  const handleDownloadCalendar = () => {
    const icsString = buildDynamicIcs(activeEventName, includedSessions, trace?.bufferTimeline);
    downloadIcsFile(
      icsString,
      `${activeEventName.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-schedule.ics`
    );
    showFeedbackToast(
      'Calendar Downloaded (.ics)',
      'is ready to import into Apple Calendar, Google Calendar, or Outlook.',
      'wcs-schedule.ics'
    );
  };

  const handleDownloadVisualSchedule = () => {
    const themes = trace?.themeDressCodes || [];
    const buffer = trace?.bufferTimeline;

    const dynamicMarkdown = [
      `# 🕺 Custom Weekend Itinerary: ${activeEventName}`,
      `> Generated by WCS Navigator for **${selectedDivision.toUpperCase()} ${selectedRole.toUpperCase()}**`,
      '',
      '## ✈️ Travel & Arrival Buffer Target',
      `- **Earliest Event Staging Call:** ${buffer?.earliestStagingTime || '5:15 PM Friday'}`,
      `- **Recommended Flight Touchdown:** ${buffer?.latestFlightArrivalDeadline || '2:15 PM Friday'}`,
      `- **Buffer Breakdown:** ${buffer?.transitMinutes || 30}m Transit + ${buffer?.hotelSettleMinutes || 90}m Hotel Settle + ${buffer?.warmupMinutes || 60}m Warmup`,
      '',
      '## 📅 Customized Schedule & Sessions',
      ...includedSessions.map(
        (s) => `### ✅ ${s.title}\n- **Time:** ${s.time}\n- **Location:** ${s.location}\n- **Note:** ${s.justification}\n`
      ),
      '',
      '## 🎭 Party Themes & Dress Codes',
      ...themes.map(
        (t) => `### 🌟 ${t.day}: ${t.themeTitle}\n- **Atmosphere:** ${t.vibe}\n- **Outfits:** ${t.recommendedAttire.join(', ')}\n`
      ),
    ].join('\n');

    const content = visualScheduleMarkdown || dynamicMarkdown;
    const blob = new Blob([content], { type: 'text/markdown;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'wcs-visual-schedule.md');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    showFeedbackToast(
      'Mobile Schedule Downloaded (.md)',
      'is ready to view on your device.',
      'wcs-visual-schedule.md'
    );
  };

  // Group sessions by day
  const sessionsByDay = useMemo(() => {
    const friday = includedSessions.filter((s) => s.time.toLowerCase().includes('fri'));
    const saturday = includedSessions.filter((s) => s.time.toLowerCase().includes('sat'));
    const sunday = includedSessions.filter((s) => s.time.toLowerCase().includes('sun'));

    return { friday, saturday, sunday };
  }, [includedSessions]);

  const themesByDay = useMemo(() => {
    const rawThemes = trace?.themeDressCodes || [];
    const friday = rawThemes.find((t) => t.day.toLowerCase().includes('fri'));
    const saturday = rawThemes.find((t) => t.day.toLowerCase().includes('sat'));
    const sunday = rawThemes.find((t) => t.day.toLowerCase().includes('sun'));

    return { friday, saturday, sunday };
  }, [trace?.themeDressCodes]);

  const getSessionCategory = (session: AuditSession) => {
    const title = session.title.toLowerCase();
    if (title.includes('prelim') || title.includes('strictly') || title.includes('competition') || title.includes('jack & jill')) {
      return {
        badge: '🏆 Competition',
        style: 'bg-surface/20 border-amber-500/35 text-amber-500',
      };
    }
    if (title.includes('social') || title.includes('party') || title.includes('glow') || title.includes('gala') || title.includes('survivor')) {
      return {
        badge: '🌙 Social Dancing',
        style: 'bg-surface/20 border-accent/35 text-accent',
      };
    }
    if (title.includes('break') || title.includes('lunch') || title.includes('dinner')) {
      return {
        badge: '🍽️ Meal / Rest Break',
        style: 'bg-surface/20 border-emerald-500/35 text-emerald-500',
      };
    }
    return {
      badge: '🧠 Workshop',
      style: 'bg-cyan-950/20 border-cyan-500/35 text-brand-cyan',
    };
  };

  const renderSessionCard = (session: AuditSession) => {
    const { badge, style } = getSessionCategory(session);

    return (
      <Box
        key={session.id}
        padding={4}
        radius="xl"
        border
        className={`transition-all ${style} hover:border-white/30`}
      >
        <Stack gap={2} justify="between" height="full">
          <Stack gap={2}>
            <Box display="flex" align="center" justify="between" gap={2}>
              <Box as="span" paddingX={2} paddingY={0.5} radius="md" border borderColor="line" className="text-xs font-mono font-bold bg-surface-alt/40">
                {badge}
              </Box>
              <Box
                as="button"
                type="button"
                onClick={() => handleToggleSession(session.id)}
                aria-label={`Remove ${session.title}`}
                title="Remove from my schedule"
                padding={1}
                radius="sm"
                className="text-text-dim hover:text-error transition-colors cursor-pointer"
              >
                <Icon icon={X} size="xs" />
              </Box>
            </Box>

            <Text as="h4" weight="font-bold" size="sm" color="main" leading="snug">
              {session.title}
            </Text>

            <Stack direction="row" align="center" gap={4} paddingTop={0.5} className="text-xs font-mono text-text-dim">
              <Stack direction="row" align="center" gap={1.5}>
                <Clock className="w-3.5 h-3.5 text-brand-cyan shrink-0" />
                <span>{session.time}</span>
              </Stack>
              <Stack direction="row" align="center" gap={1.5}>
                <MapPin className="w-3.5 h-3.5 text-text-dim shrink-0" />
                <span>{session.location}</span>
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      </Box>
    );
  };

  const renderThemeCard = (theme?: ThemeDressCode) => {
    if (!theme) return null;

    return (
      <Box
        display="flex"
        flexWrap="wrap"
        align="center"
        justify="between"
        gap={2}
        padding={3}
        radius="xl"
        marginY={1}
        className="bg-surface-alt/60 border border-white/10 text-xs"
      >
        <Stack direction="row" align="center" gap={2}>
          <Shirt className="w-3.5 h-3.5 text-text-dim shrink-0" />
          <span className="font-bold text-xs text-white font-mono">
            {theme.day} Theme: {theme.themeTitle}
          </span>
          <Text as="span" variant="mono" size="xs" color="dim">
            ({theme.vibe})
          </Text>
        </Stack>
        <Box display="flex" wrap gap={1.5} align="center">
          {theme.recommendedAttire.map((attire, i) => (
            <Text
              as="span"
              key={i}
              variant="mono"
              size="xs"
              color="dim"
              paddingX={2}
              paddingY={0.5}
              className="rounded-full bg-white/[0.04] border border-white/10"
            >
              {attire}
            </Text>
          ))}
        </Box>
      </Box>
    );
  };

  return (
    <Stack gap={6} className={className} width="full">
      {/* Toast Notification */}
      {showToast && (
        <Box
          role="status"
          aria-live="polite"
          padding={4}
          radius="xl"
          border
          shadow="2xl"
          className="fixed bottom-6 right-4 sm:right-6 md:right-8 z-50 max-w-sm w-full bg-surface-alt/95 backdrop-blur-xl border-brand-cyan/40 motion-safe:transition-all"
        >
          <Box display="flex" align="start" justify="between" gap={3}>
            <Box display="flex" align="start" gap={3}>
              <Box padding={1.5} radius="full" className="bg-brand-cyan/20 text-brand-cyan shrink-0">
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
            <button
              type="button"
              aria-label="Dismiss notification"
              onClick={() => setShowToast(false)}
              className="text-text-dim hover:text-white"
            >
              <Icon icon={X} size="xs" />
            </button>
          </Box>
        </Box>
      )}

      {/* Clean Context Header & Action Bar */}
      <Box
        display="flex"
        flexWrap="wrap"
        align="center"
        justify="between"
        gap={4}
        padding={4}
        radius="xl"
        border
        className="bg-surface-alt/80 border-line/70 backdrop-blur-md"
      >
        <Stack direction="row" align="center" gap={2} flexWrap="wrap" className="text-xs font-mono">
          <Stack as="span" direction="row" align="center" gap={1.5} paddingX={3} paddingY={1} radius="full" border className="bg-brand-cyan/15 text-brand-cyan font-bold border-brand-cyan/30">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Profile: {selectedRole ? `${selectedDivision.toUpperCase()} • ${selectedRole.toUpperCase()}` : selectedDivision.toUpperCase()}</span>
          </Stack>
          <span className="text-text-dim">•</span>
          <span className="text-text-dim">✈️ Landing Target: <strong className="text-text-main">{trace?.bufferTimeline?.latestFlightArrivalDeadline || '2:15 PM Fri'}</strong></span>
          <span className="text-text-dim">•</span>
          <span className="text-text-dim">📋 Active: <strong className="text-text-main">{includedSessions.length} sessions</strong></span>
        </Stack>

        {/* Action Buttons */}
        <Stack direction="row" align="center" gap={2.5} flexWrap="wrap">
          {/* Decision Logic & Debug Inspector Trigger */}
          <Stack
            as="button"
            direction="row"
            align="center"
            gap={1.5}
            paddingX={3}
            paddingY={2}
            radius="lg"
            border
            type="button"
            onClick={() => setIsDebugInspectorOpen(!isDebugInspectorOpen)}
            className={`text-xs font-mono transition-all cursor-pointer ${
              isDebugInspectorOpen
              ? 'bg-brand-cyan text-black border-brand-cyan shadow-sm font-bold'
                : 'bg-surface hover:bg-surface-alt border-line/70 text-text-main hover:text-brand-cyan'
            }`}
          >
            <Cpu className="w-3.5 h-3.5 text-brand-amber" />
            <span>Decision Logic & Debug ({telemetry?.durationMs || 0}ms)</span>
          </Stack>

          {/* Full Schedule Browser Trigger */}
          <Stack
            as="button"
            direction="row"
            align="center"
            gap={1.5}
            paddingX={3.5}
            paddingY={2}
            radius="lg"
            border
            type="button"
            onClick={() => setIsFullScheduleOpen(true)}
            className="bg-surface hover:bg-surface-alt border-line/70 text-text-main hover:text-brand-cyan text-xs font-mono transition-colors cursor-pointer"
          >
            <ListFilter className="w-3.5 h-3.5 text-brand-cyan" />
            <span>View All Schedule ({allSessions.length})</span>
          </Stack>

          {/* Reset Customizations */}
          <Stack
            as="button"
            direction="row"
            align="center"
            gap={1}
            paddingX={2.5}
            paddingY={2}
            radius="lg"
            border
            type="button"
            onClick={handleResetToAiPlan}
            title="Reset to AI Recommended Plan"
            className="bg-surface-alt/60 hover:bg-surface-alt border-line/50 text-text-dim hover:text-white text-xs font-mono transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset</span>
          </Stack>

          {/* Download Calendar (.ics) */}
          <Stack
            as="button"
            direction="row"
            align="center"
            gap={2}
            paddingX={4}
            paddingY={2}
            radius="lg"
            type="button"
            onClick={handleDownloadCalendar}
            className="bg-brand-cyan hover:bg-brand-cyan/90 text-black font-bold text-xs font-mono shadow-glow hover:opacity-90 transition-all cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Add to Calendar (.ics)</span>
          </Stack>

          {/* Markdown (.md) */}
          <Stack
            as="button"
            direction="row"
            align="center"
            gap={1.5}
            paddingX={3}
            paddingY={2}
            radius="lg"
            border
            type="button"
            onClick={handleDownloadVisualSchedule}
            className="bg-surface-alt hover:bg-surface border-line/70 text-text-dim hover:text-white text-xs font-mono transition-colors cursor-pointer"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>.md</span>
          </Stack>
        </Stack>
      </Box>

      {/* Expandable Decision Logic & Taskmaker Debug Inspector */}
      {isDebugInspectorOpen && (
        <DecisionDebugInspector
          eventName={activeEventName}
          confirmedDivision={selectedDivision}
          confirmedRole={selectedRole}
          answers={answers}
          telemetry={telemetry}
          discoveryData={discoveryData}
          decisionTrace={trace as AgentDecisionTrace}
          bufferTimeline={trace?.bufferTimeline}
        />
      )}

      {/* UNIFIED CHRONOLOGICAL DAY-BY-DAY FEED */}
      <Stack gap={6} width="full">
        {/* FRIDAY SECTION */}
        <Stack gap={4} width="full" padding={5} radius="xl" border className="bg-surface-alt/30 border-line/40">
          <Stack direction="row" align="center" justify="between" paddingBottom={2} className="border-b border-line/30">
            <Stack direction="row" align="center" gap={2}>
              <Calendar className="w-4 h-4 text-brand-cyan" />
              <h3 className="font-bold text-base text-text-main">
                Friday — Arrival, Warmup &amp; Prelims
              </h3>
            </Stack>
            <span className="text-xs font-mono text-text-dim">Day 1</span>
          </Stack>

          {/* Event-Based Local Transit & Logistics */}
          <FlightBufferTimeline activeEventName={activeEventName} />

          {/* Friday Sessions */}
          {sessionsByDay.friday.length > 0 ? (
            <Grid cols={{ default: 1, md: 2 }} gap={3}>
              {sessionsByDay.friday.map(renderSessionCard)}
            </Grid>
          ) : (
            <Box padding={4} className="text-center bg-surface/30 rounded-xl border border-line/30">
              <Text size="xs" color="dim">No Friday sessions currently in your itinerary. Use "View All Schedule" to add sessions.</Text>
            </Box>
          )}

          {/* Friday Night Theme */}
          {renderThemeCard(themesByDay.friday)}
        </Stack>

        {/* SATURDAY SECTION */}
        <Stack gap={4} width="full" padding={5} radius="xl" border className="bg-surface-alt/30 border-line/40">
          <Stack direction="row" align="center" justify="between" paddingBottom={2} className="border-b border-line/30">
            <Stack direction="row" align="center" gap={2}>
              <Calendar className="w-4 h-4 text-brand-cyan" />
              <h3 className="font-bold text-base text-text-main">
                Saturday — Daytime Workshops &amp; Champions Gala
              </h3>
            </Stack>
            <span className="text-xs font-mono text-text-dim">Day 2</span>
          </Stack>

          {/* Saturday Sessions */}
          {sessionsByDay.saturday.length > 0 ? (
            <Grid cols={{ default: 1, md: 2 }} gap={3}>
              {sessionsByDay.saturday.map(renderSessionCard)}
            </Grid>
          ) : (
            <Box padding={4} className="text-center bg-surface/30 rounded-xl border border-line/30">
              <Text size="xs" color="dim">No Saturday sessions currently in your itinerary. Use "View All Schedule" to add sessions.</Text>
            </Box>
          )}

          {/* Saturday Evening Theme */}
          {renderThemeCard(themesByDay.saturday)}
        </Stack>

        {/* SUNDAY SECTION */}
        <Stack gap={4} width="full" padding={5} radius="xl" border className="bg-surface-alt/30 border-line/40">
          <Stack direction="row" align="center" justify="between" paddingBottom={2} className="border-b border-line/30">
            <Stack direction="row" align="center" gap={2}>
              <Calendar className="w-4 h-4 text-brand-cyan" />
              <h3 className="font-bold text-base text-text-main">
                Sunday — Intensive Masterclasses &amp; Survivor Social
              </h3>
            </Stack>
            <span className="text-xs font-mono text-text-dim">Day 3</span>
          </Stack>

          {/* Sunday Sessions */}
          {sessionsByDay.sunday.length > 0 ? (
            <Grid cols={{ default: 1, md: 2 }} gap={3}>
              {sessionsByDay.sunday.map(renderSessionCard)}
            </Grid>
          ) : (
            <Box padding={4} className="text-center bg-surface/30 rounded-xl border border-line/30">
              <Text size="xs" color="dim">No Sunday sessions currently in your itinerary. Use "View All Schedule" to add sessions.</Text>
            </Box>
          )}

          {/* Sunday Night Theme */}
          {renderThemeCard(themesByDay.sunday)}
        </Stack>
      </Stack>

      {/* Full Schedule Browser Modal */}
      <FullScheduleModal
        isOpen={isFullScheduleOpen}
        onClose={() => setIsFullScheduleOpen(false)}
        sessions={allSessions}
        onToggleSession={handleToggleSession}
        eventName={activeEventName}
      />
    </Stack>
  );
};

export default AgentMindTrace;


