import { Box, Stack, Text } from '@/layouts/Primitives';
import { PageHeader } from '@/components/ui/PageHeader';
import { SEO } from '@/components/SEO';

export default function Terms() {
  return (
    <Box as="section" height="full" padding="panel">
      <SEO title="Terms of Use" />
      <Stack gap={12} maxWidth="3xl" marginX="auto">
        <PageHeader label="LEGAL" title="Terms of Use" />
        <Text variant="body" size="lg">
          By using this site, you agree to the terms and conditions. All content is for informational purposes. Portions of this site may contain affiliate links where we earn a small commission at no extra cost to you.
        </Text>
      </Stack>
    </Box>
  );
}
