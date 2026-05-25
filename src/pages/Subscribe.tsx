import { SEO } from '@/components/SEO';
import { Box, Stack, Text } from '@/layouts/Primitives';
import { EmailForm } from '@/features/email-capture/EmailForm';

export default function Subscribe() {
  return (
    <Box as="section" maxWidth="2xl" marginX="auto" paddingY={10}>
      <SEO title="Subscribe" description="Subscribe to BoomTick updates: event guides, gear picks, and training notes." />
      <Stack gap={4}>
        <Text as="h1" variant="headline" size="3xl" weight="font-black">Subscribe to BoomTick</Text>
        <Text variant="body" size="base" color="dim">Get practical West Coast Swing travel guides, gear picks, and training notes in your inbox.</Text>
        <EmailForm source="subscribe-page" />
      </Stack>
    </Box>
  );
}
