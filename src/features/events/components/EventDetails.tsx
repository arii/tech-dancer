import { MapPin, Calendar, Clock, ExternalLink, Palette, Briefcase, CheckCircle2 } from 'lucide-react';
import { Box, Stack, Text, Grid } from '@/layouts/Primitives';
import { MarkdownRenderer } from '@/components/ui/MarkdownRenderer';
import { Event } from '@/lib/content';
import { SECTION_SPACING } from '../constants';

interface EventDetailsProps {
  event: Event;
}

export function EventDetails({ event }: EventDetailsProps) {
  return (
    <Stack gap={SECTION_SPACING}>
      <Box id="overview" as="section">
        <Stack gap={8}>
          <Text variant="headline" size="3xl" weight="font-black">Event Overview</Text>
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
        <Stack gap={8}>
          <Text variant="headline" size="3xl" weight="font-black">Schedule Details</Text>
          <Box border radius="lg" padding={8} surface="surface">
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
        <Stack gap={8}>
          <Text variant="headline" size="3xl" weight="font-black">Location & Venue</Text>
          <Box border radius="lg" padding={8} surface="surface">
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

      {event.theme && (
        <Box id="theme" as="section">
          <Stack gap={8}>
            <Text variant="headline" size="3xl" weight="font-black">Event Theme</Text>
            <Box border radius="lg" padding={8} surface="surface">
              <Stack gap={6}>
                <Box display="flex" gap={4}>
                  <Palette className="w-5 h-5 text-accent shrink-0" />
                  <Stack gap={1}>
                    <Text variant="mono" size="xs" color="dim" uppercase tracking="widest">Theme Name</Text>
                    <Text variant="body" size="lg" weight="font-bold">{event.theme.name}</Text>
                  </Stack>
                </Box>
                <Box paddingLeft={9}>
                  <Text variant="body" color="dim">{event.theme.description}</Text>
                </Box>
              </Stack>
            </Box>
          </Stack>
        </Box>
      )}

      {event.gear && (
        <Box id="gear" as="section">
          <Stack gap={8}>
            <Text variant="headline" size="3xl" weight="font-black">Gear Recommendations</Text>
            <Grid cols={{ base: 1, md: 2 }} gap={6}>
              <Box border radius="lg" padding={6} surface="surface">
                <Stack gap={4}>
                  <Box display="flex" gap={3} align="center">
                    <Briefcase className="w-5 h-5 text-accent" />
                    <Text variant="mono" size="xs" color="dim" uppercase tracking="widest">Recommendations</Text>
                  </Box>
                  <Stack gap={2}>
                    {event.gear.recommendations.map((item, idx) => (
                      <Box key={idx} display="flex" gap={2} align="center">
                        <CheckCircle2 className="w-4 h-4 text-accent/60" />
                        <Text variant="body" size="sm">{item}</Text>
                      </Box>
                    ))}
                  </Stack>
                </Stack>
              </Box>
              <Box border radius="lg" padding={6} surface="surface">
                <Stack gap={4}>
                  <Box display="flex" gap={3} align="center">
                    <CheckCircle2 className="w-5 h-5 text-accent" />
                    <Text variant="mono" size="xs" color="dim" uppercase tracking="widest">Essentials</Text>
                  </Box>
                  <Stack gap={2}>
                    {event.gear.essentials.map((item, idx) => (
                      <Box key={idx} display="flex" gap={2} align="center">
                        <CheckCircle2 className="w-4 h-4 text-accent/60" />
                        <Text variant="body" size="sm">{item}</Text>
                      </Box>
                    ))}
                  </Stack>
                </Stack>
              </Box>
            </Grid>
          </Stack>
        </Box>
      )}

      <Box id="reminders" as="section">
        <Stack gap={8}>
          <Text variant="headline" size="3xl" weight="font-black">Event Reminders</Text>
          <Box border radius="lg" padding={8} surface="surface">
            <Text color="dim">Stay tuned for specific event deadline reminders and notification settings.</Text>
          </Box>
        </Stack>
      </Box>

      <Box id="travel" as="section">
        <Stack gap={8}>
          <Text variant="headline" size="3xl" weight="font-black">Travel & Lodging</Text>
          <Box border radius="lg" padding={8} surface="surface">
            <Text color="dim">Travel logistics, hotel blocks, and venue access information will be populated here.</Text>
          </Box>
        </Stack>
      </Box>

      <Box id="notes" as="section">
        <Stack gap={8}>
          <Text variant="headline" size="3xl" weight="font-black">Field Notes</Text>
          <Box border radius="lg" padding={8} surface="surface">
            <Text color="dim">Expert insights and community notes for {event.title}.</Text>
          </Box>
        </Stack>
      </Box>
    </Stack>
  );
}
