import { Box, Text } from '@/layouts/Primitives';
import { EventSection } from './EventSection';

interface EventTravelProps {
  id?: string;
  notes?: string;
}

export function EventTravel({ id, notes }: EventTravelProps) {
  if (!notes) return null;

  return (
    <EventSection
      id={id}
      eyebrow="Logistics"
      title="Travel & Venue Notes"
      description="Quick context for getting there, settling in, and planning your weekend."
    >
      <Box radius="xl" padding={6} className="border border-line bg-surface-alt">
        <Text variant="body" size="base" className="whitespace-pre-wrap leading-relaxed">
          {notes}
        </Text>
      </Box>
    </EventSection>
  );
}
