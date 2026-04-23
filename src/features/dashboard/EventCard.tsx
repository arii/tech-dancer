import { Box, Stack, Text } from '@/layouts/Primitives';
import { LucideIcon } from 'lucide-react';

interface EventCardProps {
  name: string;
  date: string;
  status: string;
  icon: LucideIcon;
}

export function EventCard({ name, date, status, icon: Icon }: EventCardProps) {
  return (
    <Box
      display="flex"
      direction="col"
      height="full"
      surface="default"
      opacity={50}
      border={true}
      padding={6}
      paddingLarge={8}
    >
      <Stack gap={4}>
        <Box display="flex" align="center" gap={3}>
          <Icon className="w-5 h-5 text-accent" />
          <Text variant="mono" size="xs" color="dim" uppercase >
            {status}
          </Text>
        </Box>
        <Text variant="displayLower" size="xl" weight="font-black" className="text-accent-navy leading-snug">
          {name}
        </Text>
        <Text variant="body" size="base" color="dim">
          {date}
        </Text>
      </Stack>
    </Box>
  );
}
