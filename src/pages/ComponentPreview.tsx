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
            theme={{
              name: "Galactic Night",
              label: "Saturday Night Theme",
              description: "A high-production space theme featuring deep blues, neon accents, and cosmic energy. Expect immersive lighting and interstellar social vibes.",
              image: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&q=80&w=1000",
              outfitIds: ["loop-quiet", "bloch-grecian"],
              accessoryIds: ["rave-fan", "neck-fan"]
            }}
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
