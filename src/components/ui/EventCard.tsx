import { MapPin } from 'lucide-react';
import { Box, Stack, Text } from '@/layouts/Primitives';

import { NavLink } from 'react-router-dom';

interface EventCardProps {
  slug?: string;
  name: string;
  location: string;
  schedule: string;
  onClick?: () => void;
}

export function EventCard({ slug, name, location, schedule, onClick }: EventCardProps) {
  return (
    <Stack
      as="article"
      onClick={onClick}
      padding={8}
      radius="md"
      border
      gap={4}
      height="full"
      width="full"
      textAlign="left"
      cursor={(slug || onClick) ? "pointer" : "default"}
      className="bg-surface relative group hover:border-accent/40 transition-all duration-300 hover:-translate-y-0.5"
    >
      {slug && (
        <NavLink
          to={`/events/${slug}`}
          className="absolute inset-0 z-10"
          aria-label={`View details for ${name}`}
        />
      )}
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
