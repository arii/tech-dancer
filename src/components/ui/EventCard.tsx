import { Box, Text } from '@/layouts/Primitives';

interface EventCardProps {
  name: string;
  location: string;
  date: string;
}

export function EventCard({ name, location, date }: EventCardProps) {
  return (
    <Box
      padding={6}
      radius="lg"
      border
      className="bg-surface-alt"
    >
      <Text as="h4" weight="font-bold" display="block" marginBottom={2}>
        {name}
      </Text>
      <Text size="sm" color="dim" display="block">
        {location}
      </Text>
      <Text size="sm" display="block" marginTop={1} className="text-accent-purple">
        {date}
      </Text>
    </Box>
  );
}
