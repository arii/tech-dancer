import { useState, useMemo } from 'react';
import { Box, Stack, Grid, Text } from '@/layouts/Primitives';
import { AuditSession } from '../types';
import { CheckCircle, XCircle, Clock, MapPin, Layers } from 'lucide-react';
import { Icon } from '@/components/ui/Icon';

export interface FilteringAuditMatrixProps {
  sessions?: AuditSession[];
  className?: string;
}

type TabType = 'all' | 'included' | 'filtered';

const DEFAULT_SESSIONS: AuditSession[] = [
  {
    id: 's1',
    title: 'Novice Jack & Jill Prelims',
    time: 'Fri 4:00 PM - 6:00 PM',
    location: 'Grand Ballroom A',
    status: 'included',
    decisionBadge: 'Matched Division: Novice',
    justification: 'Matches user profile skill level (Novice WSDC)',
  },
  {
    id: 's2',
    title: 'WCS Foundations Technique Workshop',
    time: 'Sat 10:00 AM - 11:30 AM',
    location: 'Studio B',
    status: 'included',
    decisionBadge: 'Matched Track: Technique',
    justification: 'Fits persona focus on foundational mechanics',
  },
  {
    id: 's3',
    title: 'Open Strictly Swing Finals',
    time: 'Sat 9:00 PM - 10:30 PM',
    location: 'Grand Ballroom A',
    status: 'included',
    decisionBadge: 'Matched Track: Spectator',
    justification: 'User requested peak competition viewing window',
  },
  {
    id: 's4',
    title: 'Friday Neon Glow Late Night Social',
    time: 'Fri 11:00 PM - 4:00 AM',
    location: 'Grand Ballroom A',
    status: 'included',
    decisionBadge: 'Matched Track: Social Energy',
    justification: 'Matches late-night social energy preference',
  },
  {
    id: 's5',
    title: 'All-Levels Musicality Masterclass',
    time: 'Sat 1:30 PM - 2:45 PM',
    location: 'Junior Ballroom',
    status: 'included',
    decisionBadge: 'Matched Track: Musicality',
    justification: 'All-levels open topic class fitting Saturday afternoon slot',
  },
  {
    id: 's6',
    title: 'Advanced & All-Star Jack & Jill',
    time: 'Sat 2:00 PM - 4:00 PM',
    location: 'Grand Ballroom B',
    status: 'filtered',
    decisionBadge: 'Skill level mismatch',
    justification: 'User selected Novice (Intermediate+ sessions excluded)',
  },
  {
    id: 's7',
    title: 'Champion Routine Intensive (Invitation Only)',
    time: 'Fri 1:00 PM - 3:30 PM',
    location: 'Executive Room 3',
    status: 'filtered',
    decisionBadge: 'Prerequisite Required',
    justification: 'Requires Champion level WSDC points and instructor invitation',
  },
  {
    id: 's8',
    title: 'Late Night Blues Social',
    time: 'Sun 2:00 AM - 5:00 AM',
    location: 'Ballroom C',
    status: 'filtered',
    decisionBadge: 'Time Constraint',
    justification: 'Outside user preferred max curfew (1:00 AM)',
  },
  {
    id: 's9',
    title: 'Advanced Turns & Rotational Speed',
    time: 'Fri 4:30 PM - 5:30 PM',
    location: 'Studio C',
    status: 'filtered',
    decisionBadge: 'Conflict with Jack & Jill Prelims',
    justification: 'Scheduled at 4:30 PM, directly overlapping with Novice prelim roll call',
  },
  {
    id: 's10',
    title: 'Intermediate Strictly Swing Finals',
    time: 'Sat 7:00 PM - 8:30 PM',
    location: 'Grand Ballroom A',
    status: 'filtered',
    decisionBadge: 'Division Mismatch',
    justification: 'Requires active Intermediate division competitor registration',
  },
  {
    id: 's11',
    title: 'Early Bird Morning Yoga for Dancers',
    time: 'Sat 8:00 AM - 9:00 AM',
    location: 'Studio A',
    status: 'filtered',
    decisionBadge: 'Time Constraint',
    justification: 'Scheduled early morning during rest buffer after late-night social dancing',
  },
  {
    id: 's12',
    title: 'Fast Music Survival Intensive',
    time: 'Sat 1:30 PM - 2:45 PM',
    location: 'Studio B',
    status: 'filtered',
    decisionBadge: 'Schedule Overlap',
    justification: 'Simultaneous room conflict with All-Levels Musicality Masterclass',
  },
];

export const FilteringAuditMatrix: React.FC<FilteringAuditMatrixProps> = ({
  sessions = DEFAULT_SESSIONS,
  className,
}) => {
  // Default to 'included' so only matched sessions are visible by default
  const [activeTab, setActiveTab] = useState<TabType>('included');

  const includedSessions = useMemo(
    () => sessions.filter((s) => s.status === 'included'),
    [sessions]
  );
  const filteredSessions = useMemo(
    () => sessions.filter((s) => s.status === 'filtered'),
    [sessions]
  );

  const displayedSessions = useMemo(() => {
    if (activeTab === 'included') return includedSessions;
    if (activeTab === 'filtered') return filteredSessions;
    return sessions;
  }, [activeTab, sessions, includedSessions, filteredSessions]);

  return (
    <Stack gap={4} className={className}>
      <Box display="flex" align="center" justify="between" wrap gap={2}>
        <Stack gap={1}>
          <Box as="h3" className="text-lg font-bold text-text-main">
            Your Workshops &amp; Schedule
          </Box>
          <Box as="p" className="text-xs text-text-dim">
            Personalized workshop recommendations, division calls, and social dance times tailored to your profile
          </Box>
        </Stack>
      </Box>

      {/* Minimal Sleek Tabs Bar */}
      <Box
        display="flex"
        gap={2}
        paddingBottom={0}
        wrap
        className="border-b border-line/60 overflow-x-auto"
        role="tablist"
        aria-label="Filter sessions by status"
      >
        <Box
          as="button"
          type="button"
          role="tab"
          aria-selected={activeTab === 'included'}
          onClick={() => setActiveTab('included')}
          display="flex"
          align="center"
          gap={1.5}
          paddingY={2}
          paddingX={3}
          cursor="pointer"
          className={`font-semibold text-xs transition-all border-b-2 -mb-px pb-2.5 min-h-11 ${
            activeTab === 'included'
              ? 'border-text-main text-text-main font-bold'
              : 'border-transparent text-text-dim hover:text-text-main'
          }`}
        >
          <Icon icon={CheckCircle} size="xs" />
          <span>Matched ({includedSessions.length})</span>
        </Box>

        <Box
          as="button"
          type="button"
          role="tab"
          aria-selected={activeTab === 'filtered'}
          onClick={() => setActiveTab('filtered')}
          display="flex"
          align="center"
          gap={1.5}
          paddingY={2}
          paddingX={3}
          cursor="pointer"
          className={`font-semibold text-xs transition-all border-b-2 -mb-px pb-2.5 min-h-11 ${
            activeTab === 'filtered'
              ? 'border-text-dim text-text-dim font-bold'
              : 'border-transparent text-text-dim/60 hover:text-text-main'
          }`}
        >
          <Icon icon={XCircle} size="xs" />
          <span>Filtered Out ({filteredSessions.length})</span>
        </Box>

        <Box
          as="button"
          type="button"
          role="tab"
          aria-selected={activeTab === 'all'}
          onClick={() => setActiveTab('all')}
          display="flex"
          align="center"
          gap={1.5}
          paddingY={2}
          paddingX={3}
          cursor="pointer"
          className={`font-semibold text-xs transition-all border-b-2 -mb-px pb-2.5 min-h-11 ${
            activeTab === 'all'
              ? 'border-text-main text-text-main font-bold'
              : 'border-transparent text-text-dim hover:text-text-main'
          }`}
        >
          <Icon icon={Layers} size="xs" />
          <span>Full Schedule ({sessions.length})</span>
        </Box>
      </Box>

      {/* Session Cards Grid */}
      {displayedSessions.length > 0 ? (
        <Grid cols={{ default: 1, md: 2 }} gap={4} className="min-w-0">
          {displayedSessions.map((session) => {
            const isIncluded = session.status === 'included';

            return (
              <Box
                key={session.id}
                padding={5}
                radius="lg"
                border
                className={`transition-all bg-surface/30 flex flex-col justify-between min-w-0 ${
                  isIncluded
                    ? 'border-line/60 hover:border-line'
                    : 'border-line/30 opacity-75'
                } ${
                  activeTab === 'all' && isIncluded
                    ? 'ring-1 ring-brand-cyan/40 bg-brand-cyan/[0.03]'
                    : ''
                }`}
              >
                <Stack gap={3.5} className="min-w-0">
                  <Box display="flex" align="start" justify="between" wrap gap={2} className="min-w-0">
                    <Box flex={1} minWidth={0}>
                      <Stack gap={1}>
                      {activeTab === 'all' && (
                        <Text
                          as="span"
                          variant="mono"
                          size="xs"
                          weight="font-bold"
                          uppercase
                          tracking="widest"
                          paddingX={1.5}
                          paddingY={0.5}
                          radius="sm"
                          className={`w-fit ${
                            isIncluded
                              ? 'bg-brand-cyan/20 text-brand-cyan'
                              : 'bg-white/[0.05] text-text-dim'
                          }`}
                        >
                          {isIncluded ? '★ Selected for Your Plan' : 'Filtered Out'}
                        </Text>
                      )}
                      <Box as="h4" className="text-sm font-bold text-text-main leading-snug break-words min-w-0">
                        {session.title}
                      </Box>
                      </Stack>
                    </Box>

                    {/* Rationale Tag (Clean unbordered monospace) */}
                    <Text
                      variant="mono"
                      size="micro"
                      className="text-xs font-mono text-text-dim uppercase tracking-wider break-words max-w-full"
                    >
                      {session.decisionBadge}
                    </Text>
                  </Box>

                  <Stack gap={1} className="text-xs text-text-dim font-mono min-w-0">
                    <Box display="flex" align="center" gap={2} className="min-w-0">
                      <Clock className="w-3.5 h-3.5 text-text-dim shrink-0" />
                      <span className="break-words min-w-0">{session.time}</span>
                    </Box>
                    <Box display="flex" align="center" gap={2} className="min-w-0">
                      <MapPin className="w-3.5 h-3.5 text-text-dim shrink-0" />
                      <span className="break-words min-w-0">{session.location}</span>
                    </Box>
                  </Stack>

                  {/* Justification Text */}
                  <Box
                    padding={3}
                    radius="md"
                    className="text-xs text-text-dim bg-surface/40 border border-line/30 leading-relaxed break-words min-w-0"
                  >
                    <strong className="font-semibold text-text-main">
                      {isIncluded ? 'Selection Reason:' : 'Filter Reason:'}
                    </strong>{' '}
                    {session.justification}
                  </Box>
                </Stack>
              </Box>
            );
          })}
        </Grid>
      ) : (
        <Box padding={8} textAlign="center" surface="surface" radius="lg" border className="border-line">
          <Text size="sm" color="dim">
            No sessions match the selected tab filter.
          </Text>
        </Box>
      )}
    </Stack>
  );
};

