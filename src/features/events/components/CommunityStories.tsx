import { Box, Stack, Text, Grid } from '@/layouts/Primitives';
import { Heart } from 'lucide-react';

const STORIES = [
  {
    quote: "Pumpkin costume dancing at Halloween Swing Thing.",
    context: "October Traditions"
  },
  {
    quote: "Fresh cotton candy after finals.",
    context: "Late Night Snacks"
  },
  {
    quote: "Best theme outfits from recent events.",
    context: "Community Vibe"
  }
];

export function CommunityStories() {
  return (
    <Box as="section" marginTop={{ base: 16, lg: 32 }} marginBottom={16}>
      <Stack gap={12}>
        <Stack gap={4}>
          <Text variant="mono" size="xs" color="brand" weight="font-black" uppercase tracking="widest">
            Community Stories
          </Text>
          <Text variant="headline" size="3xl" weight="font-black">
            What Dancers Love
          </Text>
        </Stack>

        <Grid cols={{ base: 1, md: 3 }} gap={8}>
          {STORIES.map((story, i) => (
            <Stack
              key={i}
              gap={6}
              padding={8}
              radius="xl"
              surface="alt"
              className="relative overflow-hidden group"
            >
              <Heart className="absolute -top-4 -right-4 w-24 h-24 text-accent/5 transition-transform group-hover:scale-110" />

              <Text variant="body" size="lg" weight="font-bold" color="main" className="leading-relaxed italic">
                "{story.quote}"
              </Text>

              <Box display="flex" align="center" gap={3}>
                <Box width={4} height="1px" className="bg-accent" />
                <Text variant="mono" size="micro" color="dim" weight="font-bold" uppercase tracking="widest">
                  {story.context}
                </Text>
              </Box>
            </Stack>
          ))}
        </Grid>
      </Stack>
    </Box>
  );
}
