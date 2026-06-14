import { Box, Stack, Text, Button } from '@/layouts/Primitives';
import { SEO } from '@/components/SEO';
import { Link } from 'react-router-dom';

export default function RemovedPage() {
  return (
    <Box paddingY={20} paddingX={4}>
      <SEO
        title="Page Removed"
        description="This page has been decommissioned as part of our site reorganization."
        noindex={true}
      />
      <Stack align="center" gap={8} textAlign="center" maxWidth="md" marginX="auto">
        <Text as="h1" size="4xl" weight="bold">
          Page Decommissioned
        </Text>
        <Text size="lg" color="dim">
          The page you are looking for has been removed as part of a site-wide reorganization.
          We've shifted our focus to provide better training notes, blog insights, and practical tools.
        </Text>
        <Stack direction={{ base: 'column', sm: 'row' }} gap={4} marginTop={4}>
          <Button as={Link} to="/" surface="primary" size="lg">
            Return Home
          </Button>
          <Button as={Link} to="/blog" surface="secondary" size="lg">
            View Blog
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}
