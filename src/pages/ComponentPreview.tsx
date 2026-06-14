import { Box, Stack, Text } from '@/layouts/Primitives';
import { SEO } from '@/components/SEO';

export default function ComponentPreview() {
  return (
    <Box padding={8}>
      <SEO
        title="Component Preview"
        description="Development environment for testing UI components in isolation."
        noindex={true}
      />
      <Stack gap={12}>
        <Text variant="headline" size="4xl">Component Preview</Text>

        <Box border padding={6} radius="lg">
          <Text variant="body" size="sm">
            Add components here to preview them during development.
          </Text>
        </Box>
      </Stack>
    </Box>
  );
}
