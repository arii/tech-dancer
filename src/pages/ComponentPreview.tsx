import { Box, Stack, Text } from '@/layouts/Primitives';
import { SEO } from '@/components/SEO';
import { EventHero } from '@/features/events/components/EventHero';
import { ThemeSpotlight } from '@/features/events/components/ThemeSpotlight';
import { CuratedGear } from '@/features/events/components/CuratedGear';
import { RelatedEvents } from '@/features/events/components/RelatedEvents';

export default function ComponentPreview() {
  return (
    <Box padding={8}>
      <SEO
        title="Component Preview"
        description="Development environment for testing UI components in isolation."
        noIndex={true}
      />
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
          <CuratedGear sections={[]} />
        </Box>

        <Box border padding={6} radius="lg">
          <Text variant="mono" size="sm" marginBottom={4}>RelatedEvents</Text>
          <RelatedEvents events={[]} />
        </Box>
      </Stack>
    </Box>
  );
}
