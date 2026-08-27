import { useState } from 'react';
import { Box, Stack, Text, Grid } from '@/layouts/Primitives';
import { Calendar, MapPin, Check } from 'lucide-react';
import { Icon } from '@/components/ui/Icon';
import { WCSCaliforniaEvent, CALIFORNIA_2026_EVENTS } from '../data/californiaEvents';
import { cn } from '@/lib/utils';

export interface EventSelectorProps {
  selectedEventId: string;
  onSelectEvent: (event: WCSCaliforniaEvent) => void;
}

export const EventSelector: React.FC<EventSelectorProps> = ({
  selectedEventId,
  onSelectEvent
}) => {
  const selectedEvent = CALIFORNIA_2026_EVENTS.find(e => e.id === selectedEventId) || CALIFORNIA_2026_EVENTS[0];

  return (
    <Stack gap={4} width="full">
      <Stack gap={1}>
        <Text as="label" htmlFor="event-dropdown-select" variant="mono" size="xs" color="accent" weight="font-bold" uppercase tracking="widest">
          1. Select California 2026 Event Preset
        </Text>
        <Text size="sm" color="dim">
          Choose a pre-configured 2026 California West Coast Swing weekend convention or pick below.
        </Text>
      </Stack>

      {/* Select Dropdown with 44px touch target */}
      <Box width="full">
        <select
          id="event-dropdown-select"
          aria-label="Select California 2026 Event Preset"
          value={selectedEventId}
          onChange={(e) => {
            const ev = CALIFORNIA_2026_EVENTS.find(item => item.id === e.target.value);
            if (ev) onSelectEvent(ev);
          }}
          minHeight="11" paddingX={3} paddingY={2.5} className="w-full border bg-surface border border-line rounded-lg text-white focus:outline-none focus:border-brand-cyan text-sm cursor-pointer"
        >
          {CALIFORNIA_2026_EVENTS.map((event) => (
            <option key={event.id} value={event.id} className="bg-surface text-white">
              {event.name} — {event.location} ({event.dates})
            </option>
          ))}
        </select>
      </Box>

      {/* Event Preset Quick Cards */}
      <Grid cols={{ base: 1, sm: 2, lg: 3 }} gap={3} width="full">
        {CALIFORNIA_2026_EVENTS.map((event) => {
          const isSelected = event.id === selectedEventId;
          return (
            <Box
              key={event.id}
              as="button"
              type="button"
              aria-pressed={isSelected}
              onClick={() => onSelectEvent(event)}
              padding={4}
              surface={isSelected ? 'muted' : 'surface'}
              radius="lg"
              display="flex"
              align="start"
              justify="between"
              cursor="pointer"
              className={cn(
                "min-h-11 border text-left transition-all duration-200 hover:border-brand-cyan/50 tap-target",
                isSelected ? "border-brand-cyan ring-1 ring-brand-cyan/40 bg-brand-cyan/5" : "border-line hover:bg-surface"
              )}
            >
              <Stack gap={1} flex={1}>
                <Box display="flex" align="center" gap={1.5}>
                  <Text weight="font-bold" size="sm" color={isSelected ? "main" : "dim"}>
                    {event.name}
                  </Text>
                  {isSelected && (
                    <Box display="flex" align="center" justify="center" width={4} height={4} radius="full" className="bg-brand-cyan text-black shrink-0">
                      <Icon icon={Check} size="xs" />
                    </Box>
                  )}
                </Box>
                <Box display="flex" align="center" gap={1} color="dim">
                  <Icon icon={MapPin} size="xs" color="accent" />
                  <Text size="micro" color="dim">{event.location}</Text>
                </Box>
                <Box display="flex" align="center" gap={1} color="dim">
                  <Icon icon={Calendar} size="xs" color="dim" />
                  <Text size="micro" color="dim">{event.dates}</Text>
                </Box>
              </Stack>
            </Box>
          );
        })}
      </Grid>

      {/* Selected Event Detail Banner */}
      {selectedEvent && (
        <Box padding={4} surface="muted" radius="lg" border className="border-brand-cyan/30 bg-brand-cyan/5">
          <Stack gap={2}>
            <Box display="flex" align="center" justify="between" wrap="wrap" gap={2}>
              <Text weight="font-black" size="md" color="main">
                {selectedEvent.name} ({selectedEvent.year})
              </Text>
              <Text
                as="a"
                href={selectedEvent.websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                size="xs"
                color="accent"
                className="hover:underline font-semibold" minHeight="8" display="inline-flex" align="center"
              >
                Official Website →
              </Text>
            </Box>
            <Text size="sm" color="dim" leading="relaxed">
              {selectedEvent.description}
            </Text>
            <Box display="flex" wrap="wrap" gap={1.5} marginTop={1}>
              {selectedEvent.availableTracks.map(track => (
                <Text key={track} size="micro" weight="font-bold" paddingX={2} paddingY={0.5} radius="sm" className="bg-brand-purple/10 text-brand-purple border border-brand-purple/20">
                  {track}
                </Text>
              ))}
            </Box>
          </Stack>
        </Box>
      )}
    </Stack>
  );
};

