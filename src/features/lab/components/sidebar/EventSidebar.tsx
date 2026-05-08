import { Plane, Calendar, Hotel, Users, ShieldAlert } from 'lucide-react';
import { Box, Stack, Text } from '@/layouts/Primitives';

interface EventSidebarProps {
  startDate?: string;
  earlyBirdDate?: string;
  hotelCutoffDate?: string;
}

export function EventSidebar({ startDate, earlyBirdDate, hotelCutoffDate }: EventSidebarProps) {
  if (!startDate) return null;

  const start = new Date(startDate);

  const reminders = [
    {
      label: 'Flight Tracking',
      date: new Date(start.getTime() - 90 * 24 * 60 * 60 * 1000),
      icon: Plane,
      description: 'Book flights ~90 days out for best rates.'
    },
    {
      label: 'Early Bird',
      date: earlyBirdDate ? new Date(new Date(earlyBirdDate).getTime() - 2 * 24 * 60 * 60 * 1000) : null,
      icon: Calendar,
      description: 'Register before early bird rates expire.'
    },
    {
      label: 'Hotel Cutoff',
      date: hotelCutoffDate ? new Date(hotelCutoffDate) : null,
      icon: Hotel,
      description: 'Room block availability deadline.'
    },
    {
      label: 'Comp Signups',
      date: new Date(start.getTime() - 14 * 24 * 60 * 60 * 1000),
      icon: Users,
      description: 'Registration for competitions typically closes 14 days prior.'
    },
    {
      label: 'Cancel Safety',
      date: new Date(start.getTime() - 5 * 24 * 60 * 60 * 1000),
      icon: ShieldAlert,
      description: 'Last chance to cancel without full penalty.'
    }
  ].filter(r => r.date !== null);

  return (
    <Stack gap={8}>
      <Stack gap={4}>
        <Text variant="mono" size="tiny" weight="font-bold" color="dim" uppercase className="tracking-widest border-b border-line" paddingBottom={2}>
          Travel Reminders
        </Text>
        <Stack gap={4}>
          {reminders.sort((a, b) => a.date!.getTime() - b.date!.getTime()).map((reminder) => (
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
    </Stack>
  );
}
