import { MapPin, Bell, Briefcase } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { Box, Stack, Text } from '@/layouts/Primitives';
import { Event } from '@/lib/content';
import { pickRest } from '@/lib/utils';
import { CONTENT_METADATA_KEYS } from '@/lib/constants';

interface EventCardProps {
  event: Event;
  [key: string]: unknown;
}

export function EventCard(props: EventCardProps) {
  const { event } = props;
  const {
    title,
    slug,
    location,
    schedule,
    earlyBirdDate,
    hotelCutoffDate,
    registrationDeadline,
    packingReminderDate,
    theme,
    themeName,
  } = event;
  const hasReminders = !!(earlyBirdDate || hotelCutoffDate || registrationDeadline || packingReminderDate);
  const hasTheme = !!(theme || themeName);

  const rest = pickRest(props, ['event', ...CONTENT_METADATA_KEYS] as (keyof EventCardProps)[]);
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
        to={`/resources/events/${slug}`}
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
        <Box display="flex" align="center" justify="between">
          <Text size="sm" color="dim">
            {location}
          </Text>
          <Box display="flex" gap={2}>
            {hasReminders && (
              <Box color="accent" title="Reminders available">
                <Bell className="w-3.5 h-3.5" />
              </Box>
            )}
            {hasTheme && (
              <Box color="dim" title="Theme gear available">
                <Briefcase className="w-3.5 h-3.5" />
              </Box>
            )}
          </Box>
        </Box>
      </Stack>
    </Stack>
  );
}
