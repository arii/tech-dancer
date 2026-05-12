import { Box, Stack, Text } from '@/layouts/Primitives';
import { Event } from '@/lib/content';
import { RelatedEvents } from './RelatedEvents';

interface EventSidebarProps {
  event: Event;
  relatedEvents?: Event[];
}

export function EventSidebar({ event, relatedEvents = [] }: EventSidebarProps) {
  return (
    <Box as="aside">
      <Stack gap={8} className="sticky top-24">
        <Box border radius="lg" padding={6} surface="surface-alt">
          <Stack gap={6}>
            <Text variant="mono" size="micro" color="accent" weight="font-bold" uppercase tracking="widest">
              Quick Intelligence
            </Text>
            <Stack gap={4}>
              <Box>
                <Text variant="mono" size="micro" color="dim" uppercase>Category</Text>
                <Text variant="body" size="sm">{event.category}</Text>
              </Box>
              <Box>
                <Text variant="mono" size="micro" color="dim" uppercase>Registry Status</Text>
                <Text variant="body" size="sm">WSDC Verified</Text>
              </Box>
            </Stack>
          </Stack>
        </Box>

        {relatedEvents.length > 0 && (
          <RelatedEvents events={relatedEvents} />
        )}
      </Stack>
    </Box>
  );
}
