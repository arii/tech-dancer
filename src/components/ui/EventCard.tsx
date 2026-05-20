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

const VARIANT_CONFIGS = {
  default: {
    padding: 8,
    gap: 4,
    titleSize: "lg" as const,
    iconClass: "w-4 h-4",
    footerMarginTop: 2,
  },
  compact: {
    padding: { base: 4, sm: 6 },
    gap: 2,
    titleSize: "md" as const,
    iconClass: "w-3 h-3",
    footerMarginTop: 1,
  },
} as const;

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
  const config = VARIANT_CONFIGS[variant];

  return (
    <Stack
      as="article"
      padding={config.padding}
      radius="md"
      border
      gap={config.gap}
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
          <MapPin className={cn("text-accent", config.iconClass)} />
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
          size={config.titleSize}
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

      <Box display="flex" gap={3} marginTop={config.footerMarginTop}>
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
