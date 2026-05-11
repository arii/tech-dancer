import { Box, Stack, Text } from '@/layouts/Primitives';
import { EventHero } from '@/features/events/components/EventHero';
import { ThemeSpotlight } from '@/features/events/components/ThemeSpotlight';
import { CuratedGear } from '@/features/events/components/CuratedGear';
import { RelatedEvents } from '@/features/events/components/RelatedEvents';
import { Event } from '@/lib/content';

/**
 * Factory for mock events to keep preview data consistent and typed.
 */
const createMockEvent = (overrides: Partial<Event> = {}): Event => ({
  type: 'event',
  slug: 'mock-event',
  title: 'Mock Event',
  date: '2026-01-01',
  author: 'Mock Author',
  category: 'Mock Category',
  excerpt: 'Mock excerpt for testing.',
  location: 'Mock Location',
  city: 'Mock City',
  schedule: 'January 1-3, 2026',
  description: 'Mock description.',
  content: 'Mock content body.',
  ...overrides,
});

export default function ComponentPreview() {
  return (
    <Box padding={8}>
      <Stack gap={12}>
        <Text variant="headline" size="4xl">Component Preview</Text>

        <Box border padding={6} radius="lg">
          <Text variant="mono" size="sm" marginBottom={4}>EventHero</Text>
          <EventHero
            title="Sample Event"
            location="San Francisco, CA"
            date="Oct 24-26, 2026"
          />
        </Box>

        <Box border padding={6} radius="lg">
          <Text variant="mono" size="sm" marginBottom={4}>ThemeSpotlight</Text>
          <ThemeSpotlight
            title="Theme Title"
            description="Theme description goes here."
          />
        </Box>

        <Box border padding={6} radius="lg">
          <Text variant="mono" size="sm" marginBottom={4}>CuratedGear</Text>
          <CuratedGear
            event={createMockEvent({
              title: 'Gear Preview Event',
              curatedGear: {
                essentials: ['loop-experience']
              }
            })}
          />
        </Box>

        <Box border padding={6} radius="lg">
          <Text variant="mono" size="sm" marginBottom={4}>RelatedEvents</Text>
          <RelatedEvents events={[]} />
        </Box>
      </Stack>
    </Box>
  );
}
