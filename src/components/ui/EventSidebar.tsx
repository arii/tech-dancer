import { Box, Stack, Text } from '@/layouts/Primitives';
import { calculateTimeline } from '@/features/lab/wsdc-reminders/lib/timeline-utils';
import { Event } from '@/lib/content';

export function EventHeaderExtras({ author }: { author: string }) {
  return (
    <Stack gap={6} marginTop={6}>
      <Stack direction="row" align="center" gap={2} color="dim">
        <Box width={8} height={8} radius="full" surface="muted" />
        <Text variant="mono" size="xs">{author}</Text>
      </Stack>
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
}

export function EventSidebar({ event, startDate, earlyBirdDate, hotelCutoffDate }: EventSidebarProps) {
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
      ).slice(0, 4)
    : [];

  if (!event && reminders.length === 0) {
    return null;
  }

  return (
    <Stack gap={4}>
      {event && (
        <Box border radius="xl" padding={5} surface="surface">
          <Stack gap={4}>
            <Text variant="mono" size="xs" weight="font-bold" color="accent" uppercase className="tracking-wider">
              Event snapshot
            </Text>
            <Stack gap={3}>
              <Box>
                <Text variant="mono" size="micro" color="dim" uppercase className="tracking-wide">
                  Category
                </Text>
                <Text size="sm">{event.category}</Text>
              </Box>
              <Box>
                <Text variant="mono" size="micro" color="dim" uppercase className="tracking-wide">
                  City
                </Text>
                <Text size="sm">{event.city}</Text>
              </Box>
              <Box>
                <Text variant="mono" size="micro" color="dim" uppercase className="tracking-wide">
                  Schedule
                </Text>
                <Text size="sm">{event.schedule}</Text>
              </Box>
            </Stack>
          </Stack>
        </Box>
      )}

      {reminders.length > 0 && (
        <Box border radius="xl" padding={5} surface="surface">
          <Stack gap={4}>
            <Text variant="mono" size="xs" weight="font-bold" color="accent" uppercase className="tracking-wider">
              Quick reminders
            </Text>
            <Stack gap={3}>
              {reminders.map((reminder) => {
                const Icon = reminder.icon;

                return (
                  <Box key={reminder.id} border radius="lg" padding={3} surface="muted">
                    <Stack gap={2}>
                      <Box display="flex" align="center" gap={2}>
                        {Icon && <Icon className="h-4 w-4 text-accent" />}
                        <Text size="sm" weight="font-bold" color="white">
                          {reminder.label}
                        </Text>
                      </Box>
                      <Text variant="mono" size="tiny" color="dim" uppercase className="tracking-wide">
                        {reminder.date.toLocaleDateString()}
                      </Text>
                      <Text size="xs" color="dim" className="leading-relaxed">
                        {reminder.description}
                      </Text>
                    </Stack>
                  </Box>
                );
              })}
            </Stack>
          </Stack>
        </Box>
      )}
    </Stack>
  );
}
