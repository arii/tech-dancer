import { Box, Stack, Text } from '@/layouts/Primitives';
import { SectionHeader } from '@/components/ui/SectionHeader';
import WSDCReminders from '@/features/lab/wsdc-reminders/WSDCReminders';
import { Event } from '@/lib/content';

interface ReminderSignupsProps {
  event: Event;
  id?: string;
}

export function ReminderSignups({ event, id }: ReminderSignupsProps) {
  return (
    <Box id={id} as="section">
      <Stack gap={8}>
        <SectionHeader
          eyebrow="Logistics & Deadlines"
          title="Action Timeline"
        />

        <Box border radius="lg" padding={8} surface="surface">
          <Stack gap={6}>
            <Text variant="body" color="dim">
              Stay ahead of the curve. Use our strategic timeline to track flight prices,
              secure early-bird discounts, and manage your hotel bookings before the blocks close.
            </Text>

            <WSDCReminders
              initialEventId={event.slug}
              startDate={event.startDate}
              earlyBirdDate={event.earlyBirdDate}
              hotelCutoffDate={event.hotelCutoffDate}
              registrationDeadline={event.registrationDeadline}
            />
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
}
