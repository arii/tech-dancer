import { Stack, Text } from '@/layouts/Primitives';
import { LucideIcon } from 'lucide-react';

interface EventCardProps {
  name: string;
  date: string;
  status: string;
  icon: LucideIcon;
}

export function EventCard({ name, date, status, icon: Icon }: EventCardProps) {
  return (
    <Stack
      height="full"
      padding={{ base: 6, lg: 8 }}
      gap={4}
      className="bg-surface/50"
    >
      <Stack direction="row" align="center" gap={3}>
        <Icon size={20} className="text-accent" />
        <Text variant="mono" size="xs" color="dim" uppercase tracking="widest">
          {status}
        </Text>
      </Stack>
      <Text variant="display" size="xl" weight="font-black" className="text-white leading-snug">
        {name}
      </Text>
      <Text variant="body" size="base" color="dim">
        {date}
      </Text>
    </Stack>
  );
}
