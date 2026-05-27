import { Box, Stack, Text } from '@/layouts/Primitives';
import { calculateTimeline } from '@/features/lab/wsdc-reminders/lib/timeline-utils';
import { Event } from '@/lib/content';


export function EventHeaderExtras({ author }: { author: string }) {
  return (
    <Stack gap={2} marginTop={4}>
      <Text variant="mono" size="xs" color="dim">{author}</Text>
    </Stack>
  );
}

export function EventBodyExtras() {
  return null;
}

interface EventSidebarProps {
  event?: Event;
  startDate?: string;
  earlyBirdDate?: string;
  hotelCutoffDate?: string;
  inline?: boolean;
}

export function EventSidebar({ event, startDate, earlyBirdDate, hotelCutoffDate, inline = false }: EventSidebarProps) {
  const finalStartDate = event?.startDate || startDate;
  const finalEarlyBirdDate = event?.earlyBirdDate || earlyBirdDate;
  const finalHotelCutoffDate = event?.hotelCutoffDate || hotelCutoffDate;
  const reminders = finalStartDate
    ? calculateTimeline(
        {
          title: event?.title || 'Event',
          startDate: finalStartDate,
          earlyBirdDate: finalEarlyBirdDate,
          hotelCutoffDate: finalHotelCutoffDate,
        },
        {
          filterIds: ['flight-track', 'early-bird', 'hotel-block', 'comp-window', 'cancel-safety'],
        },
      ).slice(0, inline ? 3 : 4)
    : [];

  if (!event && reminders.length === 0) {
    return null;
  }

  return (
    <Stack gap={4}>
      {event && (
        <Box border radius="xl" padding={4} surface="muted">
          <Stack gap={3}>
            <Text variant="mono" size="xs" weight="font-semibold" color="dim" uppercase className="tracking-wide">
              {inline ? 'Quick event notes' : 'Event snapshot'}
            </Text>
            <Stack gap={2}>
              <Box>
                <Text variant="mono" size="micro" color="dim" uppercase className="tracking-wide">Category</Text>
                <Text size="sm">{event.category}</Text>
              </Box>
              <Box>
                <Text variant="mono" size="micro" color="dim" uppercase className="tracking-wide">City</Text>
                <Text size="sm">{event.city}</Text>
              </Box>
              <Box>
                <Text variant="mono" size="micro" color="dim" uppercase className="tracking-wide">Schedule</Text>
                <Text size="sm">{event.schedule}</Text>
              </Box>
            </Stack>
          </Stack>
        </Box>
      )}

      {reminders.length > 0 && (
        <Box border radius="xl" padding={4} surface="muted">
          <Stack gap={3}>
            <Text variant="mono" size="xs" weight="font-semibold" color="dim" uppercase className="tracking-wide">
              {inline ? 'Inline reminders' : 'Quick reminders'}
            </Text>
            <Stack gap={2}>
              {reminders.map((reminder) => (
                <Box key={reminder.id} border radius="lg" padding={3} surface="surface">
                  <Stack gap={1}>
                    <Text size="sm" weight="font-semibold">{reminder.label}</Text>
                    <Text variant="mono" size="tiny" color="dim" uppercase className="tracking-wide">{reminder.date.toLocaleDateString()}</Text>
                  </Stack>
                </Box>
              ))}
            </Stack>
          </Stack>
        </Box>
      )}
    </Stack>
  );
}
