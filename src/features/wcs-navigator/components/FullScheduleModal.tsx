// impeccable-ignore-file
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
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8 bg-slate-950/90 backdrop-blur-xl animate-fade-in"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <Box
        className="w-full max-w-4xl max-h-[90vh] flex flex-col bg-surface border border-line rounded-2xl shadow-2xl overflow-hidden"
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
          <Box display="flex" align="center" gap={2} className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-text-dim absolute left-2.5 top-2.5 pointer-events-none" />
            <input
              type="text"
              placeholder="Search sessions or instructors..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 rounded-lg bg-surface-alt border border-line text-xs font-mono text-white placeholder:text-text-dim/60 focus:outline-none focus:border-brand-cyan/60"
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
                    padding={3.5}
                    radius="xl"
                    border
                    className={`transition-all ${style} ${
                      isIncluded ? 'ring-1 ring-white/20' : 'opacity-75 hover:opacity-100'
                    } flex flex-col sm:flex-row sm:items-center justify-between gap-3`}
                  >
                    {/* Left: Time & Badge Column */}
                    <div className="sm:w-44 shrink-0 flex sm:flex-col items-center sm:items-start justify-between sm:justify-center gap-1.5 border-b sm:border-b-0 sm:border-r border-white/10 pb-2 sm:pb-0 sm:pr-4">
                      <span className="font-mono text-xs sm:text-sm font-bold text-white tracking-wide flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-brand-cyan shrink-0" />
                        <span>{session.time}</span>
                      </span>
                      <div className="flex items-center gap-1.5">
                        <span className="text-[11px] font-mono font-semibold px-2 py-0.5 rounded-md bg-white/10">
                          {badge}
                        </span>
                        <span
                          className={`text-[11px] font-mono px-2 py-0.5 rounded-full ${
                            isIncluded
                              ? 'bg-emerald-500/20 text-emerald-300 font-bold'
                              : 'bg-white/5 text-text-dim'
                          }`}
                        >
                          {isIncluded ? '✓ In Itinerary' : 'Excluded'}
                        </span>
                      </div>
                    </div>

                    {/* Center: Title & Location */}
                    <div className="flex-1 min-w-0 flex flex-col justify-center gap-1">
                      <h4 className="font-bold text-sm sm:text-base text-white leading-snug">
                        {session.title}
                      </h4>
                      <div className="flex items-center gap-2 text-xs text-slate-300">
                        <MapPin className="w-3.5 h-3.5 text-text-dim shrink-0" />
                        <span className="font-medium text-slate-200">{session.location}</span>
                      </div>
                    </div>

                    {/* Right: Quieter Modal Action Button */}
                    <div className="shrink-0 flex items-center justify-end border-t sm:border-t-0 border-white/10 pt-2 sm:pt-0">
                      <button
                        type="button"
                        onClick={() => onToggleSession(session.id)}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                          isIncluded
                            ? 'bg-surface-alt/70 hover:bg-surface text-text-dim hover:text-red-400 border border-line/60'
                            : 'bg-brand-cyan/15 hover:bg-brand-cyan/25 text-brand-cyan border border-brand-cyan/30'
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
                    </div>
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
      </Box>
    </Box>,
    document.body
  );
};

export default FullScheduleModal;
