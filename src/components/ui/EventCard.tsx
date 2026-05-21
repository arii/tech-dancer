import { MapPin } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { Box, Stack, Text } from '@/layouts/Primitives';
import { pickRest } from '@/lib/utils';
import { CONTENT_METADATA_KEYS } from '@/lib/constants';

interface EventCardProps {
  title: string;
  slug: string;
  location: string;
  schedule: string;
  [key: string]: unknown;
}

export function EventCard(props: EventCardProps) {
  const { title, slug, location, schedule } = props;
  const rest = pickRest(props, CONTENT_METADATA_KEYS as any);
  return (
    <Stack
      as="article"
      {...rest}
      padding={8}
      radius="md"
      border
      gap={4}
      height="full"
      width="full"
      textAlign="left"
      className="group relative bg-surface hover:border-accent/40 transition-all duration-300 hover:-translate-y-0.5"
    >
      <NavLink
        to={`/events/${slug}`}
        className="absolute inset-0 z-10"
        aria-label={`View event: ${title}`}
      />
      <Box display="flex" justify="between" align="center" width="full">
        <Box display="flex" align="center" gap={2}>
          <MapPin className="w-4 h-4 text-accent" />
          <Text variant="mono" size="micro" weight="font-bold" color="accent" uppercase tracking="widest">
            {schedule}
          </Text>
        </Box>
        <Text
          variant="mono"
          size="micro"
          weight="font-bold"
          color="dim"
          uppercase
          tracking="tighter"
          className="opacity-60"
        >
          Resource Guide
        </Text>
      </Box>

      <Stack gap={1}>
        <Text
          variant="body"
          size="lg"
          weight="font-bold"
          color="main"
          leading="tight"
          className="group-hover:text-accent transition-colors"
        >
          {title}
        </Text>
        <Text size="sm" color="dim">
          {location}
        </Text>
      </Stack>
    </Stack>
  );
}
