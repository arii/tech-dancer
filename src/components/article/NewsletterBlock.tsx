
import { Box, Stack, Text } from '@/layouts/Primitives';
import { EmailForm } from '@/features/email-capture/EmailForm';

interface NewsletterBlockProps {
  compact?: boolean;
}

export function NewsletterBlock({ compact = false }: NewsletterBlockProps) {
  return (
    <Box
      padding={compact ? { base: 6, lg: 8 } : { base: 8, lg: 12 }}
      radius="2xl"
      surface="surface-alt"
      border
      overflow="hidden"
      position="relative"
    >
      <Box
        position="absolute"
        top={0}
        right={0}
        width={64}
        height={64}
        radius="full"
        marginRight={-32}
        marginTop={-32}
        opacity={5}
        className="bg-accent blur-3xl"
      />

      <Stack gap={6} align={compact ? "start" : "center"} position="relative" className="z-10">
        <Stack gap={2} align={compact ? "start" : "center"}>
          <Text variant="mono" size="xs" weight="font-extrabold" color="accent" uppercase tracking="utility">
            Stay Connected
          </Text>
          <Text variant="display" size={compact ? "xl" : "2xl"} color="main" weight="font-bold" leading="tight" tracking="tight">
            Fresh insights, delivered weekly.
          </Text>
        </Stack>

        {!compact && (
          <Stack marginX="auto" className="text-center" maxWidth="2xl">
            <Text color="dim" weight="font-medium" leading="relaxed" className="opacity-80">
              Get the latest WCS competition data, gear reviews, and technical guides sent straight to your inbox. No fluff, just the good stuff.
            </Text>
          </Stack>
        )}

        <Box width="full" maxWidth={compact ? 'full' : 'md'} marginX={compact ? undefined : "auto"} marginTop={2}>
          <EmailForm />
        </Box>
      </Stack>
    </Box>
  );
}
