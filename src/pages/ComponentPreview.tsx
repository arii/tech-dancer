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

        <Box>
          <Text variant="mono" size="sm" marginBottom={4} paddingX={6}>EventHero (Particle Fallback)</Text>
          <EventHero
            title="WSDC 2026"
            location="Las Vegas, NV"
            date="Dec 28, 2025 - Jan 1, 2026"
            whyAttending="The ultimate New Year's Eve celebration for swing dancers."
          />
        </Box>

        <Box>
          <Text variant="mono" size="sm" marginBottom={4} paddingX={6} marginTop={12}>EventHero (With Image)</Text>
          <EventHero
            title="The Open"
            location="Burbank, CA"
            date="Nov 26-29, 2026"
            image="https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&q=80&w=2070"
            whyAttending="The most prestigious competition in the West Coast Swing world."
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
