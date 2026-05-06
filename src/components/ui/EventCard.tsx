import { useId } from 'react';
import { MapPin } from 'lucide-react';
import { Box, Stack, Text } from '@/layouts/Primitives';

interface EventCardProps {
  name: string;
  location: string;
  schedule: string;
}

export function EventCard({ name, location, schedule }: EventCardProps) {
  const id = useId();
  const nameId = `name-${id}`;
  const locId = `loc-${id}`;
  const schedId = `sched-${id}`;

  return (
    <Stack
      padding={8}
      radius="md"
      border
      gap={4}
      height="full"
      aria-labelledby={`${nameId} ${locId} ${schedId}`}
      className="bg-surface hover:border-accent/40 transition-all duration-300"
    >
      <Box display="flex" align="center" gap={2}>
        <MapPin className="w-4 h-4 text-accent" />
        <Text id={schedId} variant="mono" size="micro" weight="font-bold" color="accent" uppercase tracking="widest">
          {schedule}
        </Text>
      </Box>

      <Stack gap={1}>
        <Text id={nameId} as="h4" variant="body" size="lg" weight="font-bold" className="text-text-main leading-tight">
          {name}
        </Text>
        <Text id={locId} size="sm" color="dim">
          {location}
        </Text>
      </Stack>
    </Stack>
  );
}
