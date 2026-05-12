import { MapPin, Calendar, Clock, ExternalLink } from 'lucide-react';
import { Box, Stack, Text } from '@/layouts/Primitives';
import { MarkdownRenderer } from '@/components/ui/MarkdownRenderer';
import { Event } from '@/lib/content';
import { SECTION_SPACING } from '../constants';

interface EventDetailsProps {
  event: Event;
}

export function EventDetails({ event }: EventDetailsProps) {
  return (
    <Stack gap={{ base: 6, lg: SECTION_SPACING }}>
      <Box id="overview" as="section">
        <Stack gap={{ base: 3, lg: 8 }}>
          <Text variant="headline" size={{ base: "lg", lg: "3xl" }} weight="font-black">Event Overview</Text>
          <Box className="prose prose-invert max-w-none">
            <MarkdownRenderer content={event.content} />
          </Box>
          {event.link && (
            <Box
              as="a"
              href={event.link}
              target="_blank"
              rel="noopener noreferrer"
              display="inline-flex"
              align="center"
              gap={2}
              className="text-accent hover:underline"
            >
              <Text variant="mono" size="sm" weight="font-bold">Official Event Website</Text>
              <ExternalLink size={14} />
            </Box>
          )}
        </Stack>
      </Box>

      <Box id="schedule" as="section">
        <Stack gap={{ base: 3, lg: 8 }}>
          <Text variant="headline" size={{ base: "lg", lg: "3xl" }} weight="font-black">Schedule Details</Text>
          <Box border radius="lg" padding={{ base: 4, lg: 8 }} surface="surface">
            <Stack gap={6}>
              <Box display="flex" gap={4}>
                <Calendar className="w-5 h-5 text-accent shrink-0" />
                <Stack gap={1}>
                  <Text variant="mono" size="xs" color="dim" uppercase tracking="widest">Dates</Text>
                  <Text variant="body" size="lg">{event.schedule}</Text>
                </Stack>
              </Box>
              {event.startDate && (
                <Box display="flex" gap={4}>
                  <Clock className="w-5 h-5 text-accent shrink-0" />
                  <Stack gap={1}>
                    <Text variant="mono" size="xs" color="dim" uppercase tracking="widest">Starts</Text>
                    <Text variant="body" size="lg">{event.startDate}</Text>
                  </Stack>
                </Box>
              )}
            </Stack>
          </Box>
        </Stack>
      </Box>

      <Box id="location" as="section">
        <Stack gap={{ base: 3, lg: 8 }}>
          <Text variant="headline" size={{ base: "lg", lg: "3xl" }} weight="font-black">Location & Venue</Text>
          <Box border radius="lg" padding={{ base: 4, lg: 8 }} surface="surface">
            <Stack gap={6}>
              <Box display="flex" gap={4}>
                <MapPin className="w-5 h-5 text-accent shrink-0" />
                <Stack gap={1}>
                  <Text variant="mono" size="xs" color="dim" uppercase tracking="widest">Venue</Text>
                  <Text variant="body" size="lg" weight="font-bold">{event.location}</Text>
                  <Text variant="body" color="dim">{event.city}</Text>
                </Stack>
              </Box>
            </Stack>
          </Box>
        </Stack>
      </Box>
    </Stack>
  );
}
