import { Box, Stack, Text, Button } from '@/layouts/Primitives';

export function BlogHero() {
  return (
    <Box as="section" width="full" paddingY={{ base: 12, md: 20 }}>
      <Stack gap={6} align="center" textAlign="center" maxWidth="3xl" marginX="auto">
        <Text variant="mono" size="xs" color="accent" weight="font-black" uppercase tracking="widest">
          INSIGHTS
        </Text>
        <Text as="h1" variant="display" size={{ base: "4xl", md: "6xl" }} weight="font-black" leading="tight" tracking="tighter">
          The Rhythmic Architecture of Modern Dance
        </Text>
        <Text variant="body" size="lg" color="dim" leading="relaxed">
          Exploring the intersection of West Coast Swing, gear engineering, and data-driven research.
        </Text>
        <Stack direction={{ base: "column", sm: "row" }} gap={4} marginTop={4}>
          <Button variant="primary" size="lg">
            Start Here
          </Button>
          <Button variant="outline" size="lg" onClick={() => document.getElementById('categories')?.scrollIntoView({ behavior: 'smooth' })}>
            Browse Categories
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}
