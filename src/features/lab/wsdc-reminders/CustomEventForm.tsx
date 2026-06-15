import { Box, Stack, Text, Grid } from '@/layouts/Primitives';
import { EventAnchors } from './types';

interface CustomEventFormProps {
  customEvent: EventAnchors;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function CustomEventForm({ customEvent, onChange }: CustomEventFormProps) {
  return (
    <Box border radius="lg" padding={6} surface="alt">
      <Grid cols={{ base: 1, md: 2 }} gap={4}>
        <Stack gap={2}>
          <Text size="xs" weight="font-bold" color="dim" uppercase tracking="widest">Event Title</Text>
          <Box as="input"
            name="title"
            value={customEvent.title}
            onChange={onChange}
            placeholder="e.g. My Local Workshop"
            paddingX={4}
            height={11}
            minHeight={11}
            className="w-full rounded-md border border-line bg-surface text-sm focus:border-accent outline-none"
          />
        </Stack>
        <Stack gap={2}>
          <Text size="xs" weight="font-bold" color="dim" uppercase tracking="widest">Event Website (Optional)</Text>
          <Box as="input"
            name="url"
            value={customEvent.url}
            onChange={onChange}
            placeholder="https://..."
            paddingX={4}
            height={11}
            minHeight={11}
            className="w-full rounded-md border border-line bg-surface text-sm focus:border-accent outline-none"
          />
        </Stack>
        <Stack gap={2}>
          <Text size="xs" weight="font-bold" color="dim" uppercase tracking="widest">Start Date</Text>
          <Box as="input"
            type="date"
            name="startDate"
            value={customEvent.startDate}
            onChange={onChange}
            paddingX={4}
            height={11}
            minHeight={11}
            className="w-full rounded-md border border-line bg-surface text-sm focus:border-accent outline-none"
          />
        </Stack>
        <Stack gap={2}>
          <Text size="xs" weight="font-bold" color="dim" uppercase tracking="widest">Early Bird Deadline</Text>
          <Box as="input"
            type="date"
            name="earlyBirdDate"
            value={customEvent.earlyBirdDate}
            onChange={onChange}
            paddingX={4}
            height={11}
            minHeight={11}
            className="w-full rounded-md border border-line bg-surface text-sm focus:border-accent outline-none"
          />
        </Stack>
        <Stack gap={2}>
          <Text size="xs" weight="font-bold" color="dim" uppercase tracking="widest">Hotel Cutoff Date</Text>
          <Box as="input"
            type="date"
            name="hotelCutoffDate"
            value={customEvent.hotelCutoffDate}
            onChange={onChange}
            paddingX={4}
            height={11}
            minHeight={11}
            className="w-full rounded-md border border-line bg-surface text-sm focus:border-accent outline-none"
          />
        </Stack>
      </Grid>
    </Box>
  );
}
