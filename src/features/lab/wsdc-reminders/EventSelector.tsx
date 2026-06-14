import { Search } from 'lucide-react';
import { Box, Stack, Text } from '@/layouts/Primitives';
import { FilterButton } from '@/components/ui/FilterButton';
import { cn } from '@/lib/utils';
import type { Event } from '@/lib/content';

interface EventSelectorProps {
  events: Event[];
  selectedEventId: string;
  onSelect: (id: string) => void;
}

export function EventSelector({ events, selectedEventId, onSelect }: EventSelectorProps) {
  return (
    <Stack gap={6}>
      <Box display="flex" align="center" gap={3}>
        <Search className="w-5 h-5 text-accent" />
        <Text variant="headline" size="lg" weight="font-bold">Select WCS Event</Text>
      </Box>

      <Stack direction="row" gap={2} wrap>
        {events.map(event => (
          <FilterButton
            key={event.slug}
            label={event.title}
            onClick={() => onSelect(event.slug)}
            isActive={selectedEventId === event.slug}
            className={cn(
              "text-xs px-4 h-9 min-h-0 normal-case",
              selectedEventId === event.slug
                ? "bg-accent text-bg border-accent"
                : "bg-surface-alt text-text-dim border-line/50"
            )}
          />
        ))}
        <FilterButton
          label="Add My Own"
          onClick={() => onSelect('custom')}
          isActive={selectedEventId === 'custom'}
          className={cn(
            "text-xs px-4 h-9 min-h-0 normal-case",
            selectedEventId === 'custom'
              ? "bg-accent text-bg border-accent"
              : "bg-surface-alt text-text-dim border-line/50"
          )}
        />
      </Stack>
    </Stack>
  );
}
