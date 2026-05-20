import { MapPin } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { Box, Stack, Text } from '@/layouts/Primitives';

interface EventCardProps {
  title: string;
  slug: string;
  location: string;
  schedule: string;
}

export function EventCard({ title, slug, location, schedule }: EventCardProps) {
  return (
    <Stack
      as="article"
      padding={10}
      radius="xl"
      border
      gap={6}
      height="full"
      width="full"
      textAlign="left"
      className="group relative bg-surface hover:bg-surface-alt hover:border-accent/40 transition-all duration-500 hover:-translate-y-1"
    >
      <NavLink
        to={`/events/${slug}`}
        className="absolute inset-0 z-10"
        aria-label={`View event: ${title}`}
      />
      <Box display="flex" justify="between" align="center" width="full">
        <Box display="flex" align="center" gap={2.5}>
          <Box radius="full" padding={2} className="bg-accent/10">
            <MapPin className="w-4 h-4 text-accent" />
          </Box>
          <Text variant="mono" size="xs" weight="font-bold" color="accent" uppercase tracking="widest">
            {schedule}
          </Text>
        </Box>
        <Box
          paddingX={3}
          paddingY={1}
          radius="full"
          className="bg-accent-purple/10 border border-accent-purple/20"
        >
          <Text
            variant="mono"
            size="micro"
            weight="font-bold"
            className="text-accent-purple uppercase tracking-widest"
          >
            Guide
          </Text>
        </Box>
      </Box>

      <Stack gap={2}>
        <Text
          variant="display"
          size="xl"
          weight="font-black"
          color="main"
          leading="tight"
          className="group-hover:text-accent transition-colors"
        >
          {title}
        </Text>
        <Text size="sm" color="dim" weight="font-medium" className="opacity-80">
          {location}
        </Text>
      </Stack>

      <Stack
        marginTop="auto"
        direction="row"
        align="center"
        gap={2}
        className="text-accent-purple font-mono font-bold uppercase tracking-widest transition-all"
      >
        <Text size="xs">View Resource Journey</Text>
        <Text size="lg" weight="font-bold" className="group-hover:translate-x-2 transition-transform">→</Text>
      </Stack>
    </Stack>
  );
}
