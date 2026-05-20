import { MapPin, Zap, Bell, CheckCircle2, Clock } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { Box, Stack, Text } from '@/layouts/Primitives';
import { cn } from '@/lib/utils';

interface EventCardProps {
  title: string;
  slug: string;
  location: string;
  schedule: string;
  guideStatus?: 'live' | 'coming-soon' | 'planned';
  hasTheme?: boolean;
  hasReminders?: boolean;
  variant?: 'default' | 'compact';
}

export function EventCard({
  title,
  slug,
  location,
  schedule,
  guideStatus,
  hasTheme,
  hasReminders,
  variant = 'default'
}: EventCardProps) {
  const isCompact = variant === 'compact';

  return (
    <Stack
      as="article"
      padding={isCompact ? 4 : 8}
      radius="md"
      border
      gap={isCompact ? 2 : 4}
      height="full"
      width="full"
      textAlign="left"
      className={cn(
        "group relative bg-surface hover:border-accent/40 transition-all duration-300 hover:-translate-y-0.5",
        isCompact && "sm:padding-6"
      )}
    >
      <NavLink
        to={`/events/${slug}`}
        className="absolute inset-0 z-10"
        aria-label={`View event: ${title}`}
      />

      <Box display="flex" justify="between" align="center" width="full">
        <Box display="flex" align="center" gap={2}>
          <MapPin className={cn("text-accent", isCompact ? "w-3 h-3" : "w-4 h-4")} />
          <Text variant="mono" size="micro" weight="font-bold" color="accent" uppercase tracking="widest">
            {schedule}
          </Text>
        </Box>

        {guideStatus === 'live' && (
          <Box display="flex" align="center" gap={1} className="text-success">
            <CheckCircle2 className="w-3 h-3" />
            <Text variant="mono" size="micro" weight="font-bold" uppercase tracking="tighter">
              Live Guide
            </Text>
          </Box>
        )}
        {(guideStatus === 'coming-soon' || guideStatus === 'planned') && (
          <Box display="flex" align="center" gap={1} color="dim">
            <Clock className="w-3 h-3" />
            <Text variant="mono" size="micro" weight="font-bold" uppercase tracking="tighter">
              Coming Soon
            </Text>
          </Box>
        )}
      </Box>

      <Stack gap={1}>
        <Text
          variant="body"
          size={isCompact ? "md" : "lg"}
          weight="font-bold"
          color="main"
          leading="tight"
          className="group-hover:text-accent transition-colors line-clamp-2"
        >
          {title}
        </Text>
        <Text size="xs" color="dim" className="line-clamp-1">
          {location}
        </Text>
      </Stack>

      <Box display="flex" gap={3} marginTop={isCompact ? 1 : 2}>
        {hasTheme && (
          <Box display="flex" align="center" gap={1} color="brand">
            <Zap className="w-3 h-3" />
            <Text variant="mono" size="micro" weight="font-bold" uppercase tracking="tighter">
              Theme Gear
            </Text>
          </Box>
        )}
        {hasReminders && (
          <Box display="flex" align="center" gap={1} color="accent">
            <Bell className="w-3 h-3" />
            <Text variant="mono" size="micro" weight="font-bold" uppercase tracking="tighter">
              Reminders
            </Text>
          </Box>
        )}
      </Box>
    </Stack>
  );
}
