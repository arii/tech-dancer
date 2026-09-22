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
        style: 'bg-surface-alt border-amber-500 text-amber-500',
      };
    }
    if (title.includes('social') || title.includes('party') || title.includes('glow') || title.includes('gala') || title.includes('survivor')) {
      return {
        badge: '🌙 Social Dancing',
        style: 'bg-surface-alt border-accent-purple text-accent-purple',
      };
    }
    if (title.includes('break') || title.includes('lunch') || title.includes('dinner')) {
      return {
        badge: '🍽️ Meal / Rest Break',
        style: 'bg-surface-alt border-emerald-500 text-emerald-500',
      };
    }
    return {
      badge: '🧠 Workshop',
      style: 'bg-surface-alt border-accent text-accent',
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
      padding={{ base: 4, sm: 6, md: 8 }}
      className="bg-surface/90 backdrop-blur-xl animate-fade-in"
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
        shadow="standard"
        overflow="hidden"
        marginY="auto"
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
          surface="alt"
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
          surface="surface"
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
                    ? 'bg-accent text-bg font-bold'
                    : 'bg-surface-alt text-dim hover:text-main border border-line'
                }`}
              >
                {day === 'all' ? 'All Days' : day}
              </Box>
            ))}
          </Stack>

          {/* Search Box */}
          <Box position="relative" display="flex" align="center" gap={2} width={{ base: 'full', sm: 'auto' }} className="sm:w-64">
            <Box position="absolute" left={2.5} pointerEvents="none">
              <Icon icon={Search} size="sm" color="dim" />
            </Box>
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
              surface="alt"
              border
              borderColor="line"
              className="text-xs text-text-main placeholder:text-text-dim/60 focus:outline-none focus:border-accent"
            />
          </Box>
        </Box>

        {/* Sessions Scrollable Feed */}
        <Box flex={1} overflow="auto" padding={4}>
          {filteredSessions.length === 0 ? (
            <Box padding={8} textAlign="center">
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
                    padding={{ base: 4, sm: 5 }}
                    radius="xl"
                    border
                    display="flex"
                    direction={{ base: 'col', sm: 'row' }}
                    align={{ base: 'stretch', sm: 'center' }}
                    justify="between"
                    gap={{ base: 4, sm: 6 }}
                    className={`transition-all ${style} ${
                      isIncluded ? 'ring-1 ring-line' : 'opacity-75 hover:opacity-100'
                    }`}
                  >
                    {/* Left: Time & Badge Column */}
                    <Stack
                      direction={{ base: 'row', sm: 'col' }}
                      align={{ base: 'center', sm: 'start' }}
                      justify={{ base: 'between', sm: 'center' }}
                      gap={2}
                      paddingBottom={{ base: 2.5, sm: 0 }}
                      paddingRight={{ base: 0, sm: 4 }}
                      border={{ base: 'b', sm: 'r' }}
                      borderColor="line"
                      shrink={0}
                      minWidth={0}
                      className="sm:w-60 md:w-64"
                    >
                      <Stack direction="row" align="center" gap={2} minWidth={0}>
                        <Icon icon={Clock} size="sm" color="accent" className="shrink-0" />
                        <Text variant="mono" size="sm" weight="font-bold" color="main" tracking="wide" className="break-words">
                          {session.time}
                        </Text>
                      </Stack>
                      <Stack direction="row" align="center" gap={1.5} wrap shrink={0}>
                        <Text variant="mono" size="xs" weight="font-semibold" paddingX={2} paddingY={0.5} radius="md" surface="muted" shrink={0}>
                          {badge}
                        </Text>
                        <Box
                          as="span"
                          paddingX={2}
                          paddingY={0.5}
                          radius="full"
                          surface="alt"
                          className={`text-xs font-mono shrink-0 ${
                            isIncluded
                              ? 'text-emerald-500 font-bold'
                              : 'text-dim'
                          }`}
                        >
                          {isIncluded ? '✓ In Itinerary' : 'Excluded'}
                        </Box>
                      </Stack>
                    </Stack>

                    {/* Center: Title & Location */}
                    <Stack gap={1.5} justify="center" flex={1} minWidth={0}>
                      <Text as="h4" weight="font-bold" size="base" color="main" leading="snug" className="break-words">
                        {session.title}
                      </Text>
                      <Stack direction="row" align="center" gap={2} wrap>
                        <Icon icon={MapPin} size="xs" color="accent" className="shrink-0" />
                        <Text as="span" size="xs" color="dim" weight="font-medium" className="break-words">{session.location}</Text>
                      </Stack>
                    </Stack>

                    {/* Right: Quieter Modal Action Button */}
                    <Stack direction="row" align="center" justify="end" paddingTop={{ base: 2, sm: 0 }} border={{ base: 't', sm: false }} borderColor="line" shrink={0}>
                      <Stack
                        as="button"
                        direction="row"
                        align="center"
                        gap={1.5}
                        paddingX={3.5}
                        paddingY={2}
                        radius="lg"
                        type="button"
                        onClick={() => onToggleSession(session.id)}
                        className={`min-h-11 text-xs font-mono font-medium transition-colors cursor-pointer ${
                          isIncluded
                            ? 'bg-surface-alt hover:bg-surface text-dim hover:text-error border border-line'
                            : 'bg-accent/15 hover:bg-accent/25 text-accent border border-accent/30 font-bold'
                        }`}
                      >
                        {isIncluded ? (
                          <>
                            <Icon icon={X} size="xs" />
                            <Text size="xs">Remove from Schedule</Text>
                          </>
                        ) : (
                          <>
                            <Icon icon={Plus} size="xs" />
                            <Text size="xs">Add to Schedule</Text>
                          </>
                        )}
                      </Stack>
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
          surface="alt"
        >
          <Text size="xs" color="dim" variant="mono">
            {sessions.filter((s) => s.status === 'included').length} of {sessions.length} sessions active in your itinerary
          </Text>

          <Button variant="primary" size="sm" onClick={onClose}>
            <Stack direction="row" align="center" gap={1.5}>
              <Icon icon={Check} size="sm" />
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
