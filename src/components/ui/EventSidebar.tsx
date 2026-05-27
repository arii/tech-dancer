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
    <Stack gap={6} className="w-full">
      {event && (
        <Box border radius="xl" padding={6} surface="surface" bgOpacity={40} className="backdrop-blur-sm border-white/5">
          <Stack gap={5}>
            <Text variant="mono" size="micro" weight="font-bold" color="accent" uppercase className="tracking-widest opacity-80">
              Event snapshot
            </Text>
            <Stack gap={4}>
              <Box>
                <Box marginBottom={1}>
                  <Text variant="mono" size="micro" color="dim" uppercase className="tracking-widest opacity-60">
                    Category
                  </Text>
                </Box>
                <Text size="sm" weight="font-medium">{event.category}</Text>
              </Box>
              <Box>
                <Box marginBottom={1}>
                  <Text variant="mono" size="micro" color="dim" uppercase className="tracking-widest opacity-60">
                    City
                  </Text>
                </Box>
                <Text size="sm" weight="font-medium">{event.city}</Text>
              </Box>
              <Box>
                <Box marginBottom={1}>
                  <Text variant="mono" size="micro" color="dim" uppercase className="tracking-widest opacity-60">
                    Schedule
                  </Text>
                </Box>
                <Text size="sm" weight="font-medium">{event.schedule}</Text>
              </Box>
            </Stack>
          </Stack>
        </Box>
      )}

      {reminders.length > 0 && (
        <Box border radius="xl" padding={6} surface="surface" bgOpacity={40} className="backdrop-blur-sm border-white/5">
          <Stack gap={5}>
            <Text variant="mono" size="micro" weight="font-bold" color="accent" uppercase className="tracking-widest opacity-80">
              Important Dates
            </Text>
            <Stack gap={4}>
              {reminders.map((reminder) => {
                const Icon = reminder.icon;

                return (
                  <Box key={reminder.id} paddingLeft={4} className="relative border-l border-white/10 hover:border-accent/40 transition-colors">
                    <Stack gap={1}>
                      <Box display="flex" align="center" gap={2}>
                        {Icon && <Icon className="h-3.5 w-3.5 text-accent opacity-80" />}
                        <Text size="xs" weight="font-bold" color="white" className="tracking-tight">
                          {reminder.label}
                        </Text>
                      </Box>
                      <Text variant="mono" size="micro" color="accent" uppercase className="tracking-widest opacity-80">
                        {reminder.date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                      </Text>
                      <Text size="xs" color="dim" className="leading-relaxed opacity-80">
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
