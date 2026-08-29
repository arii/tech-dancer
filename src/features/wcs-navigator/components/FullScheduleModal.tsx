import { useState, useMemo, FC, ChangeEvent } from 'react';
import { createPortal } from 'react-dom';
import { Box, Stack, Text, Grid, Button } from '@/layouts/Primitives';
import { AuditSession } from '../types';
import { X, Clock, MapPin, Search, Check, Plus } from 'lucide-react';
import { Icon } from '@/components/ui/Icon';

export interface FullScheduleModalProps {
  isOpen: boolean;
  onClose: () => void;
  sessions: AuditSession[];
  onToggleSession: (sessionId: string) => void;
  eventName?: string;
}

export const FullScheduleModal: FC<FullScheduleModalProps> = ({
  isOpen,
  onClose,
  sessions,
  onToggleSession,
  eventName = 'Event Schedule',
}) => {
  const [activeDay, setActiveDay] = useState<'all' | 'friday' | 'saturday' | 'sunday'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredSessions = useMemo(() => {
    return sessions.filter((s) => {
      const matchesDay =
        activeDay === 'all' ||
        (activeDay === 'friday' && s.time.toLowerCase().includes('fri')) ||
        (activeDay === 'saturday' && s.time.toLowerCase().includes('sat')) ||
        (activeDay === 'sunday' && s.time.toLowerCase().includes('sun'));

      const matchesSearch =
        !searchQuery.trim() ||
        s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.decisionBadge.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesDay && matchesSearch;
    });
  }, [sessions, activeDay, searchQuery]);

  if (!isOpen || typeof document === 'undefined') return null;

  const getCategoryTheme = (session: AuditSession) => {
    const title = session.title.toLowerCase();
    if (title.includes('prelim') || title.includes('strictly') || title.includes('competition') || title.includes('jack & jill')) {
      return {
        badge: '🏆 Competition',
        style: 'bg-surface/20 border-amber-500/40 text-amber-500',
      };
    }
    if (title.includes('social') || title.includes('party') || title.includes('glow') || title.includes('gala') || title.includes('survivor')) {
      return {
        badge: '🌙 Social Dancing',
        style: 'bg-surface/20 border-accent/40 text-accent',
      };
    }
    if (title.includes('break') || title.includes('lunch') || title.includes('dinner')) {
      return {
        badge: '🍽️ Meal / Rest Break',
        style: 'bg-surface/20 border-emerald-500/40 text-emerald-500',
      };
    }
    return {
      badge: '🧠 Workshop',
      style: 'bg-cyan-950/25 border-cyan-500/40 text-brand-cyan',
    };
  };

  return createPortal(
    <Stack
      position="fixed"
      inset
      zIndex={50}
      align="center"
      justify="center"
      padding={{ base: 4, sm: 6, md: 8 }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="full-schedule-title"
      className="bg-surface-alt/90 backdrop-blur-xl animate-fade-in"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <Stack
        direction="col"
        width="full"
        maxWidth="4xl"
        maxHeight="full"
        surface="surface"
        border
        radius="2xl"
        shadow="2xl"
        overflow="hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <Box
          display="flex"
          align="center"
          justify="between"
          padding={4}
          border="b"
          borderColor="line"
          className="bg-surface-alt/70"
        >
          <Stack gap={0.5}>
            <Text id="full-schedule-title" weight="font-bold" size="base" color="main">
              Full Event Timetable &amp; Schedule Customizer
            </Text>
            <Text size="xs" color="dim">
              {eventName} • Click any item to add or remove from your personal itinerary.
            </Text>
          </Stack>

          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            aria-label="Close schedule browser"
            className="text-text-dim hover:text-white"
          >
            <Icon icon={X} size="sm" />
          </Button>
        </Box>

        {/* Filter Bar */}
        <Box
          display="flex"
          wrap
          align="center"
          justify="between"
          gap={3}
          paddingX={4}
          paddingY={3}
          border="b"
          borderColor="line"
          className="bg-surface/50"
        >
          {/* Day Tabs */}
          <Stack direction="row" gap={1.5}>
            {(['all', 'friday', 'saturday', 'sunday'] as const).map((day) => (
              <button
                key={day}
                type="button"
                onClick={() => setActiveDay(day)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium capitalize transition-colors cursor-pointer ${
                  activeDay === day
                    ? 'bg-brand-cyan text-black font-bold'
                    : 'bg-surface-alt/80 text-text-dim hover:text-white border border-line/60'
                }`}
              >
                {day === 'all' ? 'All Days' : day}
              </button>
            ))}
          </Stack>

          {/* Search Box */}
          <Box position="relative" width={{ default: "full", sm: "fit" }} className="w-full sm:w-64">
            <Search className="w-4 h-4 text-text-dim absolute left-2.5 top-2.5 pointer-events-none" />
            <Box
              as="input"
              type="text"
              placeholder="Search sessions or instructors..."
              value={searchQuery}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
              width="full"
              paddingLeft={8}
              paddingRight={3}
              paddingY={1.5}
              radius="lg"
              border
              className="bg-surface-alt border-line text-xs font-mono text-white placeholder:text-text-dim/60 focus:outline-none focus:border-brand-cyan/60"
            />
          </Box>
        </Box>

        {/* Sessions Scrollable Feed */}
        <Box flex={1} overflow="auto" padding={4} className="space-y-3">
          {filteredSessions.length === 0 ? (
            <Box padding={8} className="text-center">
              <Text size="sm" color="dim">
                No sessions match your active day and search query.
              </Text>
            </Box>
          ) : (
            <Grid cols={{ default: 1, md: 2 }} gap={3}>
              {filteredSessions.map((session) => {
                const isIncluded = session.status === 'included';
                const { badge, style } = getCategoryTheme(session);

                return (
                  <Box
                    key={session.id}
                    padding={4}
                    radius="xl"
                    border
                    className={`transition-all ${style} ${
                      isIncluded ? 'ring-1 ring-white/20' : 'opacity-80 hover:opacity-100'
                    }`}
                  >
                    <Stack gap={2} justify="between" height="full">
                      <Box display="flex" align="center" justify="between" gap={2}>
                        <Box as="span" paddingX={2} paddingY={0.5} radius="md" border borderColor="line" className="text-xs font-mono font-bold bg-surface-alt/40">
                          {badge}
                        </Box>
                        <Box
                          as="span"
                          paddingX={2}
                          paddingY={0.5}
                          radius="full"
                          className={`text-xs font-mono ${
                            isIncluded
                              ? 'bg-emerald-500/20 text-emerald-500 font-bold'
                              : 'bg-white/5 text-text-dim'
                          }`}
                        >
                          {isIncluded ? '✓ In Itinerary' : 'Excluded'}
                        </Box>
                      </Box>

                      <h4 className="font-bold text-sm text-white leading-snug">
                        {session.title}
                      </h4>

                      <Stack direction="row" align="center" gap={3} className="text-xs font-mono text-text-dim">
                        <Stack direction="row" align="center" gap={1}>
                          <Clock className="w-3.5 h-3.5 text-brand-cyan shrink-0" />
                          <span>{session.time}</span>
                        </Stack>
                        <Stack direction="row" align="center" gap={1}>
                          <MapPin className="w-3.5 h-3.5 text-text-dim shrink-0" />
                          <span>{session.location}</span>
                        </Stack>
                      </Stack>
                    </Stack>

                    <Box marginTop={3} paddingTop={2} border="t" borderColor="line" display="flex" justify="end">
                      <button
                        type="button"
                        onClick={() => onToggleSession(session.id)}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-colors cursor-pointer ${
                          isIncluded
                            ? 'bg-red-950/40 hover:bg-red-900/60 text-red-300 border border-red-500/30'
                            : 'bg-brand-cyan/20 hover:bg-brand-cyan/30 text-brand-cyan border border-brand-cyan/40'
                        }`}
                      >
                        {isIncluded ? (
                          <>
                            <Icon icon={X} size="xs" />
                            <span>Remove from Schedule</span>
                          </>
                        ) : (
                          <>
                            <Plus className="w-3.5 h-3.5" />
                            <span>Add to Schedule</span>
                          </>
                        )}
                      </button>
                    </Box>
                  </Box>
                );
              })}
            </Grid>
          )}
        </Box>

        {/* Modal Footer */}
        <Box
          display="flex"
          align="center"
          justify="between"
          padding={4}
          border="t"
          borderColor="line"
          className="bg-surface-alt/70"
        >
          <Text size="xs" color="dim" variant="mono">
            {sessions.filter((s) => s.status === 'included').length} of {sessions.length} sessions active in your itinerary
          </Text>

          <Button variant="primary" size="sm" onClick={onClose}>
            <Stack direction="row" align="center" gap={1.5}>
              <Check className="w-4 h-4" />
              <span>Done Customizing</span>
            </Stack>
          </Button>
        </Box>
      </Stack>
    </Stack>,
    document.body
  );
};

export default FullScheduleModal;
