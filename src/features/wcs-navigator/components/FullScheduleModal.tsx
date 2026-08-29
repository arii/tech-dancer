import React, { useState, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { Box, Stack, Text, Button } from '@/layouts/Primitives';
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

export const FullScheduleModal: React.FC<FullScheduleModalProps> = ({
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
        style: 'bg-amber-950/25 border-amber-500/40 text-amber-300',
      };
    }
    if (title.includes('social') || title.includes('party') || title.includes('glow') || title.includes('gala') || title.includes('survivor')) {
      return {
        badge: '🌙 Social Dancing',
        style: 'bg-purple-950/25 border-purple-500/40 text-purple-300',
      };
    }
    if (title.includes('break') || title.includes('lunch') || title.includes('dinner')) {
      return {
        badge: '🍽️ Meal / Rest Break',
        style: 'bg-emerald-950/25 border-emerald-500/40 text-emerald-300',
      };
    }
    return {
      badge: '🧠 Workshop',
      style: 'bg-cyan-950/25 border-cyan-500/40 text-cyan-300',
    };
  };

  return createPortal(
    <Box
      role="dialog"
      aria-modal="true"
      aria-labelledby="full-schedule-title"
      position="fixed"
      inset
      zIndex={50}
      display="flex"
      align="center"
      justify="center"
      padding={{ default: 4, sm: 6, md: 8 }}
      className="bg-surface/90 backdrop-blur-xl animate-fade-in"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <Stack
        direction="col"
        width="full"
        maxWidth="4xl"
        maxHeight="screen"
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
          <Stack direction="row" align="center" gap={1.5}>
            {(['all', 'friday', 'saturday', 'sunday'] as const).map((day) => (
              <Box
                as="button"
                key={day}
                type="button"
                onClick={() => setActiveDay(day)}
                paddingX={3}
                paddingY={1.5}
                radius="lg"
                className={`text-xs font-medium capitalize transition-colors cursor-pointer ${
                  activeDay === day
                    ? 'bg-brand-cyan text-black font-bold'
                    : 'bg-surface-alt/80 text-text-dim hover:text-white border border-line/60'
                }`}
              >
                {day === 'all' ? 'All Days' : day}
              </Box>
            ))}
          </Stack>

          {/* Search Box */}
          <Box display="flex" align="center" gap={2} className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-text-dim absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <Box
              as="input"
              type="text"
              placeholder="Search sessions or instructors..."
              value={searchQuery}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
              paddingLeft={8}
              paddingRight={3}
              paddingY={1.5}
              radius="lg"
              width="full"
              className="bg-surface-alt border border-line text-xs text-text-main placeholder:text-text-dim/60 focus:outline-none focus:border-brand-cyan/60"
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
            <Stack gap={2.5} width="full">
              {filteredSessions.map((session) => {
                const isIncluded = session.status === 'included';
                const { badge, style } = getCategoryTheme(session);

                return (
                  <Box
                    key={session.id}
                    padding={{ default: 4, sm: 5 }}
                    radius="xl"
                    border
                    className={`transition-all ${style} ${
                      isIncluded ? 'ring-1 ring-white/20' : 'opacity-75 hover:opacity-100'
                    } flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-6`}
                  >
                    {/* Left: Time & Badge Column */}
                    <Stack
                      direction={{ base: 'row', sm: 'col' }}
                      align={{ base: 'center', sm: 'start' }}
                      justify={{ base: 'between', sm: 'center' }}
                      gap={2}
                      paddingBottom={{ base: 2.5, sm: 0 }}
                      paddingRight={{ base: 0, sm: 6 }}
                      border={{ base: 'b', sm: 'r' }}
                      borderColor="line"
                      className="sm:w-52 shrink-0"
                    >
                      <Stack direction="row" align="center" gap={2}>
                        <Clock className="w-4 h-4 text-brand-cyan shrink-0" />
                        <Text variant="mono" size="sm" weight="font-bold" color="main" tracking="wide" className="whitespace-nowrap">
                          {session.time}
                        </Text>
                      </Stack>
                      <Stack direction="row" align="center" gap={1.5}>
                        <Text variant="mono" size="xs" weight="font-semibold" paddingX={2} paddingY={0.5} radius="md" className="bg-white/10">
                          {badge}
                        </Text>
                        <Box
                          as="span"
                          paddingX={2}
                          paddingY={0.5}
                          radius="full"
                          className={`text-xs font-mono ${
                            isIncluded
                              ? 'bg-emerald-500/20 text-emerald-300 font-bold'
                              : 'bg-white/5 text-text-dim'
                          }`}
                        >
                          {isIncluded ? '✓ In Itinerary' : 'Excluded'}
                        </Box>
                      </Stack>
                    </Stack>

                    {/* Center: Title & Location */}
                    <Stack gap={1.5} justify="center" flex={1} minWidth={0}>
                      <Text as="h4" weight="font-bold" size="base" color="main" leading="snug">
                        {session.title}
                      </Text>
                      <Stack direction="row" align="center" gap={2} className="text-xs text-text-dim">
                        <MapPin className="w-3.5 h-3.5 text-brand-cyan shrink-0" />
                        <Text as="span" size="xs" color="main" weight="font-medium">{session.location}</Text>
                      </Stack>
                    </Stack>

                    {/* Right: Quieter Modal Action Button */}
                    <Stack direction="row" align="center" justify="end" paddingTop={{ base: 2, sm: 0 }} border={{ base: 't', sm: 'none' }} borderColor="line" className="shrink-0">
                      <button
                        type="button"
                        onClick={() => onToggleSession(session.id)}
                        className={`min-h-11 flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-mono font-medium transition-colors cursor-pointer ${
                          isIncluded
                            ? 'bg-surface-alt/70 hover:bg-surface text-text-dim hover:text-error border border-line/60'
                            : 'bg-brand-cyan/15 hover:bg-brand-cyan/25 text-brand-cyan border border-brand-cyan/30 font-bold'
                        }`}
                      >
                        {isIncluded ? (
                          <>
                            <Icon icon={X} size="xs" />
                            <span>Remove</span>
                          </>
                        ) : (
                          <>
                            <Plus className="w-3.5 h-3.5" />
                            <span>Add to Schedule</span>
                          </>
                        )}
                      </button>
                    </Stack>
                  </Box>
                );
              })}
            </Stack>
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
    </Box>,
    document.body
  );
};

export default FullScheduleModal;
