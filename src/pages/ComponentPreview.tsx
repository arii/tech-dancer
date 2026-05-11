import { Box, Stack, Text } from '@/layouts/Primitives';
import { EventHero } from '@/features/events/components/EventHero';
import { ThemeSpotlight } from '@/features/events/components/ThemeSpotlight';
import { CuratedGear } from '@/features/events/components/CuratedGear';
import { RelatedEvents } from '@/features/events/components/RelatedEvents';

export default function ComponentPreview() {
  return (
    <Box padding={8}>
      <Stack gap={12}>
        <Text variant="headline" size="4xl">Component Preview</Text>

        <Box border padding={6} radius="lg">
          <Text variant="mono" size="sm" marginBottom={4}>EventHero (with image and whyAttending)</Text>
          <EventHero
            title="Sample Event"
            location="San Francisco, CA"
            date="Oct 24-26, 2026"
            whyAttending="This is the biggest event in the West Coast Swing calendar, known for its incredible atmosphere and high-level competition."
            image="https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&q=80&w=1200"
          />
        </Box>

        <Box border padding={6} radius="lg">
          <Text variant="mono" size="sm" marginBottom={4}>EventHero (with particle fallback)</Text>
          <EventHero
            title="Another Great Event"
            location="Austin, TX"
            date="Dec 12-14, 2026"
            whyAttending="Experience the local flavor and community of Texas Westie."
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
          <CuratedGear items={[]} />
        </Box>

        <Box border padding={6} radius="lg">
          <Text variant="mono" size="sm" marginBottom={4}>RelatedEvents</Text>
          <RelatedEvents events={[]} />
        </Box>
      </Stack>
    </Box>
  );
}
