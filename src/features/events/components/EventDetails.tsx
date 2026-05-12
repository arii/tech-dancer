import React from 'react';
import { MapPin, Calendar, Clock, ExternalLink, Palette, Briefcase, CheckCircle2 } from 'lucide-react';
import { Box, Stack, Text, Grid } from '@/layouts/Primitives';
import { MarkdownRenderer } from '@/components/ui/MarkdownRenderer';
import { Event } from '@/lib/content';
import { SECTION_SPACING } from '../constants';

interface EventDetailsProps {
  event: Event;
}

function Section({ id, title, children, contentWrapper = true }: { id: string; title: string; children: React.ReactNode; contentWrapper?: boolean }) {
  return (
    <Box id={id} as="section">
      <Stack gap={8}>
        <Text variant="headline" size="3xl" weight="font-black">{title}</Text>
        {contentWrapper ? (
          <Box border radius="lg" padding={8} surface="surface">
            {children}
          </Box>
        ) : (
          children
        )}
      </Stack>
    </Box>
  );
}

export function EventDetails({ event }: EventDetailsProps) {
  return (
    <Stack gap={SECTION_SPACING}>
      <Section id="overview" title="Event Overview" contentWrapper={false}>
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
      </Section>

      <Section id="schedule" title="Schedule Details">
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
      </Section>

      <Section id="location" title="Location & Venue">
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
      </Section>

      {event.theme && (
        <Section id="theme" title="Event Theme">
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
        </Section>
      )}

      {event.gear && (
        <Section id="gear" title="Gear Recommendations" contentWrapper={false}>
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
        </Section>
      )}

      <Section id="reminders" title="Event Reminders">
        <Text color="dim">Stay tuned for specific event deadline reminders and notification settings.</Text>
      </Section>

      <Section id="travel" title="Travel & Lodging">
        <Text color="dim">Travel logistics, hotel blocks, and venue access information will be populated here.</Text>
      </Section>

      <Section id="notes" title="Field Notes">
        <Text color="dim">Expert insights and community notes for {event.title}.</Text>
      </Section>
    </Stack>
  );
}
