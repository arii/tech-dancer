import { SEO } from '@/components/SEO';
import { Box, Stack, Text } from '@/layouts/Primitives';
import { EmailForm } from '@/features/email-capture/EmailForm';
import { PageHeader } from '@/components/ui/PageHeader';

export default function Subscribe() {
  return (
    <Box minHeight="[calc(100vh-64px)]">
      <SEO
        title="Subscribe"
        description="Join the BoomTick mailing list for the latest West Coast Swing training notes, travel guides, and gear reviews."
      />

      <Stack gap={12} maxWidth="3xl" marginX="auto">
        <PageHeader
          label="NEWSLETTER"
          title="Stay Updated"
          description="Get practical West Coast Swing tips and guides delivered to your inbox. No spam, just dance."
          border="b"
        />

        <Stack gap={8} align="center" textAlign="center" paddingY={12} surface="alt" radius="xl" border>
          <Stack gap={2} maxWidth="lg">
            <Text variant="headline" size="2xl" weight="font-black">Join the Community</Text>
            <Text variant="body" size="base" color="main">
              Enter your email address to receive updates on new event guides, gear reviews, and training notes.
            </Text>
          </Stack>

          <Box width="full" maxWidth="md" paddingX={4}>
            <EmailForm />
          </Box>

          <Text variant="mono" size="micro" color="dim">
            Secure transmission. Unsubscribe at any time.
          </Text>
        </Stack>
      </Stack>
    </Box>
  );
}
