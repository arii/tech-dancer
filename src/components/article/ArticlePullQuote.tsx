
import { Box, Text, Stack } from '@/layouts/Primitives';
import { Quote } from 'lucide-react';

interface ArticlePullQuoteProps {
  quote: string;
  author?: string;
  className?: string;
}

export function ArticlePullQuote({ quote, author, className = "" }: ArticlePullQuoteProps) {
  return (
    <Box marginY={12} position="relative" className={className}>
      <Quote className="absolute -top-4 -left-4 w-12 h-12 text-accent opacity-10 -z-10" />
      <Stack gap={4} paddingLeft={8} className="border-l border-accent">
        <Text variant="display" size="2xl" color="main" leading="relaxed" className="italic">
          &ldquo;{quote}&rdquo;
        </Text>
        {author && (
          <Text variant="mono" size="xs" color="accent" weight="font-bold" uppercase tracking="widest">
            — {author}
          </Text>
        )}
      </Stack>
    </Box>
  );
}
