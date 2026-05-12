import { MapPin, Calendar, Clock, ExternalLink, Briefcase } from 'lucide-react';
import { Box, Stack, Text, Grid } from '@/layouts/Primitives';
import { MarkdownRenderer } from '@/components/ui/MarkdownRenderer';
import { Event } from '@/lib/content';
import { SECTION_SPACING } from '../constants';
import { ResolvedGearSection } from '../useEventDetail';
import { AffiliateLink } from '@/types';
import { AffiliateCard } from '@/components/ui/AffiliateCard';
import { ThemeSpotlight } from './ThemeSpotlight';

interface EventDetailsProps {
  event: Event;
  themeOutfits?: AffiliateLink[];
  themeAccessories?: AffiliateLink[];
  gearSections?: ResolvedGearSection[];
}

export function EventDetails({
  event,
  themeOutfits = [],
  themeAccessories = [],
  gearSections = []
}: EventDetailsProps) {
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
            <ThemeSpotlight
              title={event.theme.name || "Event Theme"}
              description={event.theme.description || ""}
              image={event.theme.image}
              outfits={themeOutfits}
              accessories={themeAccessories}
            />
          </Stack>
        </Box>
      )}

      {gearSections.length > 0 && (
        <Box id="gear" as="section">
          <Stack gap={8}>
            <Text variant="headline" size="3xl" weight="font-black">Gear Recommendations</Text>
            <Grid cols={{ base: 1, md: 2 }} gap={6}>
              {gearSections.map((section, idx) => (
                <Box key={idx} border radius="lg" padding={6} surface="surface">
                  <Stack gap={4}>
                    <Box display="flex" gap={3} align="center">
                      <Briefcase className="w-5 h-5 text-accent" />
                      <Text variant="mono" size="xs" color="dim" uppercase tracking="widest">{section.label}</Text>
                    </Box>
                    <Grid cols={{ base: 1, sm: 2 }} gap={4}>
                      {section.items.map(link => (
                        <AffiliateCard key={link.id} link={link} />
                      ))}
                    </Grid>
                  </Stack>
                </Box>
              ))}
            </Grid>
          </Stack>
        </Box>
      )}
    </Stack>
  );
}
