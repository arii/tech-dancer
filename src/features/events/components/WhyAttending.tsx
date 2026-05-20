import { Quote } from 'lucide-react';
import { Box, Stack, Text } from '@/layouts/Primitives';

interface WhyAttendingProps {
  id?: string;
  content: string;
  author: string;
}

export function WhyAttending({ id, content, author }: WhyAttendingProps) {
  return (
    <Box
      id={id}
      data-testid="why-attending-section"
      padding={{ base: 8, md: 12 }}
      radius="xl"
      surface="surface-alt"
      border
      className="border-accent/10 relative overflow-hidden"
    >
      {/* Decorative large quote icon */}
      <Quote
        className="absolute -top-4 -right-4 w-32 h-32 text-accent/5 -rotate-12 pointer-events-none"
        aria-hidden="true"
      />

      <Stack gap={6} relative zIndex={10}>
        <Stack gap={2}>
          <Text variant="mono" size="xs" color="accent" weight="font-bold" uppercase tracking="widest">
            The Personal Take
          </Text>
          <Text variant="display" size="2xl" weight="font-black">
            Why I'm Attending
          </Text>
        </Stack>

        <Stack gap={4}>
          <Text
            variant="hero"
            size={{ base: "lg", md: "xl" }}
            color="white"
            className="italic leading-relaxed opacity-90"
          >
            "{content}"
          </Text>

          <Box display="flex" align="center" gap={3}>
            <Box width={8} height={0.5} className="bg-accent" />
            <Text variant="mono" size="xs" color="dim" weight="font-bold" uppercase>
              {author}
            </Text>
          </Box>
        </Stack>
      </Stack>
    </Box>
  );
}
