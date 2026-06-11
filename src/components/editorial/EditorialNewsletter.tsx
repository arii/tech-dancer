import { Box, Stack, Text, Grid } from '@/layouts/Primitives';
import { EmailForm } from '@/features/email-capture/EmailForm';

/**
 * Standard Editorial Newsletter Block.
 */
export function EditorialNewsletter() {
  return (
    <Box
      padding={{ base: 6, md: 12 }}
      surface="alt"
    >
      <Grid cols={{ base: 1, md: 2 }} gap={12} align="center">
        <Stack gap={6}>
          <Stack gap={2}>
            <Text variant="mono" size="xs" color="accent" weight="font-black" uppercase tracking="widest">
              Join the Inner Circle
            </Text>
            <Text variant="display" size="2xl" weight="font-black" leading="tight">
              Get the latest WCS insights and gear notes.
            </Text>
          </Stack>
          <Text variant="body" size="sm" color="dim" leading="relaxed" maxWidth="md">
            Weekly editorial updates on West Coast Swing, gear guides, and event resources.
            No spam, ever.
          </Text>
        </Stack>

        <Box>
          <EmailForm />
        </Box>
      </Grid>
    </Box>
  );
}
