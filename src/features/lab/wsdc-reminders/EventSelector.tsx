import { Plus, Search } from 'lucide-react';
import { Box, Stack, Text, Button } from '@/layouts/Primitives';
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

      <Box display="flex" gap={2} wrap>
        {events.map(event => (
          <Button
            key={event.slug}
            variant={selectedEventId === event.slug ? 'primary' : 'outline'}
            onClick={() => onSelect(event.slug)}
            size="sm"
            className="rounded-full"
          >
            {event.title}
          </Button>
        ))}
        <Button
          variant={selectedEventId === 'custom' ? 'primary' : 'outline'}
          onClick={() => onSelect('custom')}
          size="sm"
          className="rounded-full"
        >
          <Box as="span" marginRight={1}>
            <Plus className="w-3 h-3" />
          </Box>
          Add My Own
        </Button>
      </Box>
    </Stack>
  );
}
