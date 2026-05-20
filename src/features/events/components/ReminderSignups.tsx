import { Bell } from 'lucide-react';
import { Box, Stack, Text } from '@/layouts/Primitives';
import { EmailForm } from '@/features/email-capture/EmailForm';
import WSDCReminders from '@/features/lab/wsdc-reminders/WSDCReminders';
import { Event } from '@/lib/content';

interface ReminderSignupsProps {
  event: Event;
  id?: string;
}

export function ReminderSignups({ event, id }: ReminderSignupsProps) {
  return (
    <Box id={id} as="section" data-testid="reminders">
      <Stack gap={12}>
        {/* Step Header */}
        <Stack gap={3}>
          <Text variant="mono" size="xs" color="accent" weight="font-bold" uppercase tracking="widest">
            Step 5: Stay on Track
          </Text>
          <Text variant="headline" size="3xl" weight="font-black">
            Action Timeline & Alerts
          </Text>
        </Stack>

        {/* CTA Section */}
        <Box border radius="xl" padding={8} surface="accent" className="bg-accent/5 border-accent/20">
          <Stack direction={{ base: 'col', md: 'row' }} gap={8} align="center" justify="between">
            <Stack gap={2} flex={1}>
              <Box display="flex" align="center" gap={3}>
                <Bell className="w-5 h-5 text-accent" />
                <Text variant="headline" size="lg" weight="font-bold">Never Miss a Deadline</Text>
              </Box>
              <Text size="sm" color="dim" maxWidth="xl">
                Get strategic alerts for {event.title} and other WSDC events. We'll ping you before early birds expire and hotel blocks close.
              </Text>
            </Stack>
            <EmailForm />
          </Stack>
        </Box>

        {/* Reminders Tool */}
        <WSDCReminders initialEventId={event.slug} />
      </Stack>
    </Box>
  );
}
