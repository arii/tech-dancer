import { Box, Stack, Text } from '@/layouts/Primitives';
import { PageHeader } from '@/components/ui/PageHeader';
import { SEO } from '@/components/SEO';

export default function Privacy() {
  return (
    <Box as="section" height="full" padding="panel">
      <SEO title="Privacy Policy" />
      <Stack gap={12} maxWidth="3xl" marginX="auto">
        <PageHeader label="LEGAL" title="Privacy Policy" />
        <Text variant="body" size="lg">
          We value your privacy. This site does not track personal data beyond what is necessary for functional performance. Any email addresses collected for the newsletter are kept confidential and never sold to third parties.
        </Text>
      </Stack>
    </Box>
  );
}
