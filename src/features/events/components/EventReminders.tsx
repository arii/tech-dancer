import { useMemo } from 'react';
import { Box, Stack, Text, Button } from '@/layouts/Primitives';
import { Event } from '@/lib/content';

interface EventRemindersProps {
  event: Event;
  id?: string;
}

interface ReminderRow {
  id: string;
  label: string;
  date: string;
  note: string;
}

function formatDate(date: string): string {
  return new Date(`${date}T00:00:00`).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
}

export function EventReminders({ event, id = 'reminders' }: EventRemindersProps) {
  const reminderRows = useMemo<ReminderRow[]>(() => {
    const rows: ReminderRow[] = [];

    if (event.earlyBirdDate) {
      rows.push({
        id: 'early-bird',
        label: 'Early-bird discount',
        date: formatDate(event.earlyBirdDate),
        note: 'Get notified before discounted pricing expires.'
      });
    }

    if (event.registrationDeadline) {
      rows.push({
        id: 'registration',
        label: 'Registration deadline',
        date: formatDate(event.registrationDeadline),
        note: 'Lock in your spot before registration closes.'
      });
    }

    if (event.hotelCutoffDate) {
      rows.push({
        id: 'hotel',
        label: 'Hotel cutoff',
        date: formatDate(event.hotelCutoffDate),
        note: 'Book your event hotel rate before it ends.'
      });
    }

    if (event.packingReminderDate) {
      rows.push({
        id: 'packing',
        label: 'Packing reminder',
        date: formatDate(event.packingReminderDate),
        note: 'Prepare outfits and essentials before you travel.'
      });
    }

    return rows;
  }, [event.earlyBirdDate, event.registrationDeadline, event.hotelCutoffDate, event.packingReminderDate]);

  if (reminderRows.length === 0) {
    return null;
  }

  return (
    <Box id={id} as="section" data-testid="reminders">
      <Stack gap={6}>
        <Stack gap={2}>
          <Text variant="headline" size="2xl" weight="font-black">
            Reminder signups
          </Text>
          <Text variant="body" color="muted">
            Get notified about early-bird discounts and key event deadlines so you can focus on dancing.
          </Text>
        </Stack>

        <Stack gap={3}>
          {reminderRows.map((row) => (
            <Box key={row.id} border="default" radius="lg" p={4}>
              <Stack gap={1}>
                <Text variant="body" weight="font-semibold">{row.label}</Text>
                <Text variant="body" size="sm" color="muted">{row.date}</Text>
                <Text variant="body" size="sm" color="muted">{row.note}</Text>
              </Stack>
            </Box>
          ))}
        </Stack>

        <Stack gap={2}>
          <Text variant="body" size="sm" color="muted">
            Notification options: email, browser push, SMS, and calendar/iCal.
          </Text>
          <Button variant="primary" aria-label="Sign up for reminders">
            Sign up for reminders
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}
