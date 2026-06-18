
import { Box, Stack, Text } from '@/layouts/Primitives';
import { ActionButton } from './ActionButton';

export function NewsletterModule() {
  return (
    <Box padding={8} surface="muted" radius="xl" border className="border-line/20">
      <Stack gap={6} align="center" textAlign="center">
        <Stack gap={2}>
          <Text variant="display" size="2xl" weight="font-black">Never miss a new post.</Text>
          <Text variant="body" size="lg" color="dim" maxWidth="prose">
            Get the latest gear reviews, travel guides, and dance tips delivered straight to your inbox.
          </Text>
        </Stack>

        <Stack as="form" direction={{ base: 'col', sm: 'row' }} width="full" maxWidth="md" gap={2}>
          <Box
            as="input"
            type="email"
            placeholder="Email Address"
            required
            // impeccable-ignore
            className="flex-1 px-4 py-3 bg-surface border border-line rounded-lg focus:outline-none focus:border-accent transition-colors text-text-main"
          />
          <ActionButton type="submit" variant="primary" paddingX={8}>
            Subscribe
          </ActionButton>
        </Stack>
      </Stack>
    </Box>
  );
}
