import { Bell } from 'lucide-react';
import { Box, Stack, Text } from '@/layouts/Primitives';
import WSDCReminders from '@/features/lab/wsdc-reminders/WSDCReminders';
import { Event } from '@/lib/content';

interface ReminderSignupsProps {
  id?: string;
  event: Event;
}

export function ReminderSignups({ id, event }: ReminderSignupsProps) {
  return (
    <Box id={id} as="section">
      <Stack gap={8}>
        <Stack gap={2}>
          <Box display="flex" align="center" gap={3}>
            <Bell className="w-6 h-6 text-accent" />
            <Text variant="headline" size="3xl" weight="font-black">Reminder Signups</Text>
          </Box>
          <Text variant="body" color="dim">
            Never miss a deadline. Sync this event's critical dates directly to your calendar to ensure you secure early bird pricing and hotel availability.
          </Text>
        </Stack>

        <Box border radius="xl" padding={8} surface="surface">
          <WSDCReminders initialEventId={event.slug} />
        </Box>
      </Stack>
    </Box>
  );
}
