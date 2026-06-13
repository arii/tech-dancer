import { Box, Stack, Text } from '@/layouts/Primitives';
import { EmailForm } from '@/features/email-capture/EmailForm';

export function BlogNewsletter() {
  return (
    <Box
      as="section"
      marginTop={{ base: 16, lg: 32 }}
      padding={{ base: 8, md: 12, lg: 16 }}
      surface="alt"
      border
      radius="xl"
      position="relative"
      overflow="hidden"
      className="border-accent/20"
    >
      <Box
        position="absolute"
        top={0}
        left={0}
        width="0.5"
        height="full"
        className="bg-accent"
      />

      <Stack
        direction={{ base: 'col', lg: 'row' }}
        align={{ base: 'start', lg: 'center' }}
        justify="between"
        gap={12}
        maxWidth="6xl"
        marginX="auto"
      >
        <Stack gap={4} flex={1}>
          <Text
            as="h2"
            variant="headline"
            size="3xl"
            weight="font-black"
            color="main"
            className="uppercase tracking-tighter"
          >
            Stay Updated
          </Text>
          <Text variant="body" size="lg" color="dim" maxWidth="prose">
            Monthly event guides, gear reviews, and engineering experiments delivered to your inbox.
          </Text>
        </Stack>

        <Stack gap={4} width={{ base: 'full', lg: 'auto' }}>
          <EmailForm />
          <Text variant="sans" size="xs" color="dim">
            No spam. Unsubscribe anytime.
          </Text>
        </Stack>
      </Stack>
    </Box>
  );
}
