import { motion } from 'motion/react';
import { Box, Stack, Text, Grid } from '@/layouts/Primitives';
import { motionTokens } from '@/styles/motion';
import { Quote } from 'lucide-react';

const STORIES = [
  {
    quote: "The packing checklist saved me! I actually remembered my dance socks for once.",
    author: "Alex R.",
    role: "Open Dancer",
    image: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&q=80&w=200&h=200"
  },
  {
    quote: "Using the video review process helped me jump from Novice to Intermediate in three months.",
    author: "Sarah L.",
    role: "Intermediate Competitor",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200&h=200"
  },
  {
    quote: "The hotel strategy guide is the reason I managed to stay on-site during a sold-out weekend.",
    author: "James T.",
    role: "Social Dancer",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200&h=200"
  }
];

export function CommunityStories() {
  return (
    <Stack gap={10} paddingY={12}>
      <Stack gap={2} align="center" textAlign="center" marginX="auto" maxWidth="2xl">
        <Text variant="mono" size="xs" weight="font-bold" color="accent" uppercase tracking="widest">
          Voices
        </Text>
        <Text as="h2" variant="headline" size="3xl" weight="font-black">
          Community Stories
        </Text>
        <Text variant="body" color="dim">
          Hear how other dancers are using these resources to elevate their convention experience.
        </Text>
      </Stack>

      <Grid cols={{ base: 1, md: 3 }} gap={8}>
        {STORIES.map((story, idx) => (
          <Stack
            key={idx}
            gap={6}
            padding={8}
            radius="2xl"
            border
            className="border-line bg-surface/30 relative"
            as={motion.div}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ ...motionTokens.page.transition, delay: idx * 0.1 }}
          >
            <Box color="accent" opacityVariant="low">
              <Quote className="w-10 h-10" />
            </Box>
            <Text variant="body" italic color="main" leading="relaxed">
              "{story.quote}"
            </Text>
            <Box display="flex" align="center" gap={4} marginTop="auto">
              <img
                src={story.image}
                alt={story.author}
                className="w-10 h-10 rounded-full object-cover grayscale"
              />
              <Stack gap={0}>
                <Text variant="body" size="sm" weight="font-bold">
                  {story.author}
                </Text>
                <Text variant="mono" size="micro" color="dim" uppercase>
                  {story.role}
                </Text>
              </Stack>
            </Box>
          </Stack>
        ))}
      </Grid>
    </Stack>
  );
}
