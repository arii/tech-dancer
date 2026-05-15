import { useMemo } from 'react';
import { Download, Calendar as CalendarIcon } from 'lucide-react';
import { Box, Stack, Text, Button } from '@/layouts/Primitives';
import { calculateTimeline } from '@/features/lab/wsdc-reminders/lib/timeline-engine';
import { generateICS, downloadICS } from '@/features/lab/wsdc-reminders/lib/ics-generator';
import { TimelineRow } from '@/features/lab/wsdc-reminders/TimelineRow';
import { TimelineItem } from '@/features/lab/wsdc-reminders/types';
import { Event } from '@/lib/content';

interface EventRemindersProps {
  event: Event;
  id?: string;
}

export function EventReminders({ event, id }: EventRemindersProps) {
  const timeline = useMemo(() => {
    if (!event.startDate || !event.earlyBirdDate || !event.hotelCutoffDate) return [];

    const anchors = {
      title: event.title,
      startDate: event.startDate,
      earlyBirdDate: event.earlyBirdDate,
      hotelCutoffDate: event.hotelCutoffDate,
      url: event.url
    };

    return calculateTimeline(anchors).map(item => ({
      ...item,
      formattedDate: item.date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      })
    }));
  }, [event]);

  const handleBulkSync = () => {
    if (!timeline.length) return;
    const icsContent = generateICS(event.title, timeline, event.url);
    downloadICS(`${event.title.replace(/\s+/g, '_')}_Full_Plan.ics`, icsContent);
  };

  const handleSingleSync = (item: TimelineItem) => {
    const icsContent = generateICS(event.title, [item], event.url);
    downloadICS(`${item.label.replace(/\s+/g, '_')}.ics`, icsContent);
  };

  if (timeline.length === 0) return null;

  return (
    <Box id={id} as="section" data-testid="reminders">
      <Stack gap={8}>
        <Box display="flex" justify="between" align="end" wrap gap={4}>
          <Stack gap={2}>
            <Text variant="mono" size="xs" color="accent" weight="font-bold" uppercase tracking="widest">
              Strategic Planning
            </Text>
            <Text variant="headline" size="3xl" weight="font-black">
              Action Timeline
            </Text>
          </Stack>
          <Button onClick={handleBulkSync} variant="primary">
            <Box display="flex" align="center" gap={2}>
              <Download className="w-4 h-4" />
              <Text as="span">Sync Entire Plan</Text>
            </Box>
          </Button>
        </Box>

        <Box position="relative">
          <Box
            position="absolute"
            left={5}
            top={0}
            bottom={0}
            width="2px"
            className="bg-line/40 hidden sm:block"
          />

          <Stack gap={6}>
            {timeline.map((item) => (
              <TimelineRow
                key={item.id}
                item={item}
                formattedDate={item.formattedDate!}
                onSync={handleSingleSync}
              />
            ))}
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
}
