import { MapPin } from 'lucide-react';
import { Box, Stack, Text } from '@/layouts/Primitives';

interface EventCardProps {
  name: string;
  location: string;
  schedule: string;
}

export function EventCard({ name, location, schedule, slug, basePath = "/events" }: EventCardProps & { slug?: string, basePath?: string }) {
  return (
    <Stack
      as="article"
      padding={8}
      radius="md"
      border
      gap={4}
      height="full"
      className="group relative bg-surface hover:border-accent/40 transition-all duration-300 hover:-translate-y-0.5"
    >
      {slug && (
        <Box
          as={NavLink}
          to={`${basePath}/${slug}`}
          aria-label={`View event details for ${name} at ${location}`}
          className="absolute inset-0 z-10"
        />
      )}
      <Box display="flex" align="center" gap={2}>
        <MapPin className="w-4 h-4 text-accent" />
        <Text variant="mono" size="micro" weight="font-bold" color="accent" uppercase tracking="widest">
          {schedule}
        </Text>
      </Box>

      <Stack gap={1}>
        <Text as="h4" variant="body" size="lg" weight="font-bold" className="text-text-main leading-tight">
          {name}
        </Text>
        <Text size="sm" color="dim">
          {location}
        </Text>
      </Stack>
    </Stack>
  );
}
