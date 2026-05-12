import { MapPin, ArrowRight } from "lucide-react";
import { Box, Stack, Text } from "@/layouts/Primitives";
import { Event } from "@/lib/content";

interface EventCardProps {
  event: Event;
  onClick: () => void;
}

export function EventCard({ event, onClick }: EventCardProps) {
  return (
    <Box
      as="button"
      type="button"
      onClick={onClick}
      aria-label={`View details for ${event.title} in ${event.city}`}
      border
      radius="lg"
      padding={6}
      surface="surface"
      cursor="pointer"
      className="group text-left hover:border-accent/40 transition-all hover:-translate-y-0.5"
    >
      <Stack gap={4}>
        <Box display="flex" align="center" gap={2}>
          <MapPin className="w-4 h-4 text-accent" />
          <Text
            variant="mono"
            size="micro"
            color="accent"
            weight="font-bold"
            uppercase
            tracking="widest"
          >
            {event.schedule}
          </Text>
        </Box>
        <Stack gap={1}>
          <Text
            variant="body"
            size="lg"
            weight="font-bold"
            className="group-hover:text-accent transition-colors leading-tight"
          >
            {event.title}
          </Text>
          <Text size="sm" color="dim">
            {event.location}
          </Text>
          <Text size="sm" color="dim">
            {event.city}
          </Text>
        </Stack>
        {event.theme && (
          <Box
            border
            paddingX={3}
            paddingY={1}
            radius="full"
            className="border-accent/30 bg-accent/5 w-fit"
          >
            <Text variant="mono" size="micro" color="accent">
              Theme: {event.theme.name}
            </Text>
          </Box>
        )}
        <Box
          display="flex"
          align="center"
          gap={2}
          marginTop="auto"
          color="accent"
        >
          <Text variant="mono" size="xs" weight="font-bold">
            View Guide
          </Text>
          <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
        </Box>
      </Stack>
    </Box>
  );
}
