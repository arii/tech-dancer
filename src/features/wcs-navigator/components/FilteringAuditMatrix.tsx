import React, { useState, useMemo } from 'react';
import { Box, Stack, Grid, Text } from '@/layouts/Primitives';
import { AuditSession } from '../types';
import { CheckCircle, XCircle, Clock, MapPin, Filter, Layers, AlertCircle } from 'lucide-react';
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
  const [activeTab, setActiveTab] = useState<TabType>('all');

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
            Filtering Audit Matrix
          </Box>
          <Box as="p" className="text-xs text-text-dim">
            Transparent session inclusion vs rejection decision trace evaluated by Gemini Flash
          </Box>
        </Stack>
      </Box>

      {/* Tabs Bar with 44px min touch target */}
      <Box
        display="flex"
        gap={2}
        paddingBottom={2}
        wrap
        className="border-b border-line"
        role="tablist"
        aria-label="Filter sessions by status"
      >
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === 'all'}
          onClick={() => setActiveTab('all')}
          className={`flex items-center gap-2 px-4 py-2.5 min-h-[44px] rounded-lg font-medium text-xs transition-colors cursor-pointer border ${
            activeTab === 'all'
              ? 'bg-brand-purple/15 text-brand-purple border-brand-purple/40 font-bold shadow-sm'
              : 'text-text-dim border-transparent hover:text-text-main hover:bg-surface'
          }`}
        >
          <Icon icon={Layers} size="sm" />
          <span>All ({sessions.length})</span>
        </button>

        <button
          type="button"
          role="tab"
          aria-selected={activeTab === 'included'}
          onClick={() => setActiveTab('included')}
          className={`flex items-center gap-2 px-4 py-2.5 min-h-[44px] rounded-lg font-medium text-xs transition-colors cursor-pointer border ${
            activeTab === 'included'
              ? 'bg-accent/15 text-accent border-accent/40 font-bold shadow-sm'
              : 'text-text-dim border-transparent hover:text-text-main hover:bg-surface'
          }`}
        >
          <Icon icon={CheckCircle} size="sm" />
          <span>Matched &amp; Scheduled ({includedSessions.length})</span>
        </button>

        <button
          type="button"
          role="tab"
          aria-selected={activeTab === 'filtered'}
          onClick={() => setActiveTab('filtered')}
          className={`flex items-center gap-2 px-4 py-2.5 min-h-[44px] rounded-lg font-medium text-xs transition-colors cursor-pointer border ${
            activeTab === 'filtered'
              ? 'bg-brand-terminal-red/15 text-brand-terminal-red border-brand-terminal-red/40 font-bold shadow-sm'
              : 'text-text-dim border-transparent hover:text-text-main hover:bg-surface'
          }`}
        >
          <Icon icon={XCircle} size="sm" />
          <span>Filtered Out ({filteredSessions.length})</span>
        </button>
      </Box>

      {/* Session Cards Grid */}
      {displayedSessions.length > 0 ? (
        <Grid cols={{ default: 1, md: 2 }} gap={4}>
          {displayedSessions.map((session) => {
            const isIncluded = session.status === 'included';

            return (
              <Box
                key={session.id}
                padding={4}
                radius="md"
                surface="card"
                border
                className={`transition-all ${
                  isIncluded
                    ? 'border-accent/30 hover:border-accent/60 bg-gradient-to-br from-surface to-accent/5'
                    : 'border-line opacity-85 hover:opacity-100 bg-surface/60'
                }`}
              >
                <Stack gap={3}>
                  <Box display="flex" align="start" justify="between" gap={2}>
                    <Box as="h4" className="text-sm font-bold text-text-main leading-snug">
                      {session.title}
                    </Box>

                    {/* Rationale Tag / Decision Badge */}
                    <Box
                      className={`px-2.5 py-1 min-h-[28px] rounded-full text-xs font-mono font-bold shrink-0 border flex items-center gap-1.5 ${
                        isIncluded
                          ? 'bg-accent/10 text-accent border-accent/30'
                          : 'bg-brand-terminal-red/10 text-brand-terminal-red border-brand-terminal-red/30'
                      }`}
                    >
                      <Icon
                        icon={isIncluded ? CheckCircle : AlertCircle}
                        size="xs"
                      />
                      <span>{session.decisionBadge}</span>
                    </Box>
                  </Box>

                  <Stack gap={1} className="text-xs text-text-dim font-mono">
                    <Box display="flex" align="center" gap={2}>
                      <Clock className="w-3.5 h-3.5 text-accent shrink-0" />
                      <Box as="span">{session.time}</Box>
                    </Box>
                    <Box display="flex" align="center" gap={2}>
                      <MapPin className="w-3.5 h-3.5 text-accent shrink-0" />
                      <Box as="span">{session.location}</Box>
                    </Box>
                  </Stack>

                  {/* Justification Box with Rationale Explanation */}
                  <Box
                    padding={3}
                    radius="md"
                    className={`text-xs ${
                      isIncluded
                        ? 'bg-accent/5 text-text-main border border-accent/10'
                        : 'bg-surface text-text-dim border border-line'
                    }`}
                  >
                    <Box display="flex" align="start" gap={2}>
                      <Filter className="w-3.5 h-3.5 shrink-0 opacity-70 mt-0.5" />
                      <Box as="span">
                        <strong className="font-semibold text-text-main">
                          {isIncluded ? 'Match Rationale:' : 'Exclusion Rationale:'}
                        </strong>{' '}
                        {session.justification}
                      </Box>
                    </Box>
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

