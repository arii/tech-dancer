import { useState, useMemo } from 'react';
import { Box, Stack, Grid } from '@/layouts/Primitives';
import { AuditSession } from '../types';
import { CheckCircle, XCircle, Clock, MapPin, Filter } from 'lucide-react';

export interface FilteringAuditMatrixProps {
  sessions?: AuditSession[];
  className?: string;
}

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
    decisionBadge: 'Matched Track: All-Levels Workshop',
    justification: 'Fits persona focus on foundational mechanics',
  },
  {
    id: 's3',
    title: 'Open Strictly Swing Finals',
    time: 'Sat 9:00 PM - 10:30 PM',
    location: 'Grand Ballroom A',
    status: 'included',
    decisionBadge: 'Matched Track: Social Spectator',
    justification: 'User requested peak competition viewing window',
  },
  {
    id: 's4',
    title: 'Advanced & All-Star Jack & Jill',
    time: 'Sat 2:00 PM - 4:00 PM',
    location: 'Grand Ballroom B',
    status: 'filtered',
    decisionBadge: 'Filtered: Division Mismatch',
    justification: 'User selected Novice (Intermediate+ sessions excluded)',
  },
  {
    id: 's5',
    title: 'Champion Routine Intensive (Invitation Only)',
    time: 'Fri 1:00 PM - 3:30 PM',
    location: 'Executive Room 3',
    status: 'filtered',
    decisionBadge: 'Filtered: Prerequisite Required',
    justification: 'Requires Champion level WSDC points',
  },
  {
    id: 's6',
    title: 'Late Night Blues Social',
    time: 'Sun 2:00 AM - 5:00 AM',
    location: 'Ballroom C',
    status: 'filtered',
    decisionBadge: 'Filtered: Time Constraint',
    justification: 'Outside user preferred max curfew (1:00 AM)',
  },
];

export function FilteringAuditMatrix({ sessions = DEFAULT_SESSIONS, className }: FilteringAuditMatrixProps) {
  const [activeTab, setActiveTab] = useState<'included' | 'filtered'>('included');

  const includedSessions = useMemo(() => sessions.filter((s) => s.status === 'included'), [sessions]);
  const filteredSessions = useMemo(() => sessions.filter((s) => s.status === 'filtered'), [sessions]);

  const displayedSessions = activeTab === 'included' ? includedSessions : filteredSessions;

  return (
    <Stack gap={4} className={className}>
      <Box display="flex" align="center" justify="between" wrap gap={2}>
        <Stack gap={1}>
          <Box as="h3" className="text-lg font-bold text-text-main">
            Filtering Audit Matrix
          </Box>
          <Box as="p" className="text-xs text-text-dim">
            Transparent session inclusion vs rejection decision trace
          </Box>
        </Stack>
      </Box>

      {/* Tabs Bar */}
      <Box display="flex" gap={2} paddingBottom={2} className="border-b border-line">
        <button
          type="button"
          onClick={() => setActiveTab('included')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-xs transition-colors cursor-pointer ${
            activeTab === 'included'
              ? 'bg-accent/10 text-accent border border-accent/30'
              : 'text-text-dim hover:text-text-main hover:bg-surface'
          }`}
        >
          <CheckCircle className="w-4 h-4 text-accent" />
          Included Sessions ({includedSessions.length})
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('filtered')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-xs transition-colors cursor-pointer ${
            activeTab === 'filtered'
              ? 'bg-surface text-text-dim border border-line font-semibold'
              : 'text-text-dim hover:text-text-main hover:bg-surface'
          }`}
        >
          <XCircle className="w-4 h-4 text-text-dim" />
          Filtered Out Sessions ({filteredSessions.length})
        </button>
      </Box>

      {/* Session Cards Grid */}
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
                isIncluded ? 'border-accent/30 hover:border-accent/60' : 'border-line opacity-85 hover:opacity-100'
              }`}
            >
              <Stack gap={3}>
                <Box display="flex" align="start" justify="between" gap={2}>
                  <Box as="h4" className="text-sm font-bold text-text-main leading-snug">
                    {session.title}
                  </Box>
                  <Box
                    className={`px-2.5 py-1 rounded-full text-xs font-mono font-semibold shrink-0 border ${
                      isIncluded
                        ? 'bg-accent/10 text-accent border-accent/20'
                        : 'bg-surface text-text-dim border-line'
                    }`}
                  >
                    {session.decisionBadge}
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

                <Box
                  padding={3}
                  radius="md"
                  className={`text-xs ${
                    isIncluded ? 'bg-accent/5 text-text-main border border-accent/10' : 'bg-surface text-text-dim border border-line'
                  }`}
                >
                  <Box display="flex" align="start" gap={2}>
                    <Filter className="w-3.5 h-3.5 shrink-0 opacity-70" />
                    <Box as="span">
                      <strong className="font-semibold">Justification:</strong> {session.justification}
                    </Box>
                  </Box>
                </Box>
              </Stack>
            </Box>
          );
        })}
      </Grid>
    </Stack>
  );
}
