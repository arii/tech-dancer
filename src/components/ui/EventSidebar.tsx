import { Plane, Calendar, Hotel, Users, ShieldAlert } from 'lucide-react';
import { Box, Stack, Text } from '@/layouts/Primitives';
import { Event } from '@/lib/content';
import { parseDate, addDays } from '@/lib/utils';

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

  return (
    <Box as="aside">
      <Stack gap={8} className="sticky top-24">
        {event && (
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
        )}

        {finalStartDate && (
          <Stack gap={4}>
            <Text variant="mono" size="tiny" weight="font-bold" color="dim" uppercase className="tracking-widest border-b border-line" paddingBottom={2}>
              Travel Reminders
            </Text>
            <Stack gap={4}>
              {getReminders(finalStartDate, finalEarlyBirdDate, finalHotelCutoffDate).map((reminder) => (
                <Box
                  key={reminder.label}
                  border
                  padding={4}
                  surface="muted"
                  className="hover:border-accent transition-colors"
                >
                  <Stack gap={2}>
                    <Box display="flex" align="center" gap={2} color="brand">
                      <reminder.icon className="w-4 h-4" />
                      <Text variant="mono" size="xs" weight="font-bold">{reminder.label.toUpperCase()}</Text>
                    </Box>
                    <Text variant="mono" size="tiny" color="dim">
                      Target: {reminder.date!.toLocaleDateString()}
                    </Text>
                    <Text variant="body" size="xs" color="dim">
                      {reminder.description}
                    </Text>
                  </Stack>
                </Box>
              ))}
            </Stack>
          </Stack>
        )}
      </Stack>
    </Box>
  );
}

function getReminders(startDate: string, earlyBirdDate?: string, hotelCutoffDate?: string) {
  const start = parseDate(startDate);

  return [
    {
      label: 'Flight Tracking',
      date: addDays(start, -90),
      icon: Plane,
      description: 'Book flights ~90 days out for best rates.'
    },
    {
      label: 'Early Bird',
      date: earlyBirdDate ? addDays(parseDate(earlyBirdDate), -2) : null,
      icon: Calendar,
      description: 'Register before early bird rates expire.'
    },
    {
      label: 'Hotel Cutoff',
      date: hotelCutoffDate ? parseDate(hotelCutoffDate) : null,
      icon: Hotel,
      description: 'Room block availability deadline.'
    },
    {
      label: 'Comp Signups',
      date: addDays(start, -14),
      icon: Users,
      description: 'Registration for competitions typically closes 14 days prior.'
    },
    {
      label: 'Cancel Safety',
      date: addDays(start, -5),
      icon: ShieldAlert,
      description: 'Last chance to cancel without full penalty.'
    }
  ].filter(r => r.date !== null).sort((a, b) => a.date!.getTime() - b.date!.getTime());
}
