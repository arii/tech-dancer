import { MapPin } from 'lucide-react';
import { Box, Stack, Text } from '@/layouts/Primitives';

interface EventCardProps {
  name: string;
  location: string;
  schedule: string;
  onClick?: () => void;
}

export function EventCard({ name, location, schedule, onClick }: EventCardProps) {
  return (
    <Stack
      as={onClick ? "button" : "div"}
      type={onClick ? "button" : undefined}
      onClick={onClick}
      padding={8}
      radius="md"
      border
      gap={4}
      height="full"
      width="full"
      textAlign="left"
      cursor={onClick ? "pointer" : "default"}
      className="bg-surface hover:border-accent/40 transition-all duration-300 hover:-translate-y-0.5"
    >
      <Box display="flex" align="center" gap={2}>
        <MapPin className="w-4 h-4 text-accent" />
        <Text variant="mono" size="micro" weight="font-bold" color="accent" uppercase tracking="widest">
          {schedule}
        </Text>
      </Box>

      <Stack gap={1}>
        <Text variant="body" size="lg" weight="font-bold" color="main" leading="tight">
          {name}
        </Text>
        <Text size="sm" color="dim">
          {location}
        </Text>
      </Stack>
    </Stack>
  );
}
