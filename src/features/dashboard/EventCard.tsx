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
      className="flex flex-col h-full bg-surface/50 border border-line p-6 lg:p-8"
    >
      <Stack gap={4}>
        <Box className="flex items-center gap-3">
          <Icon className="w-5 h-5 text-accent" />
          <Text variant="mono" size="xs" color="dim" uppercase className="tracking-widest">
            {status}
          </Text>
        </Box>
        <Text variant="display" size="xl" weight="font-black" className="text-accent-navy leading-snug">
          {name}
        </Text>
        <Text variant="body" size="base" color="dim">
          {date}
        </Text>
      </Stack>
    </Box>
  );
}
