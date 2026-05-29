
import { Box, Text, Stack } from '@/layouts/Primitives';
import { Quote } from 'lucide-react';

interface ArticlePullQuoteProps {
  quote: string;
  author?: string;
  className?: string;
}

export function ArticlePullQuote({ quote, author, className = "" }: ArticlePullQuoteProps) {
  return (
    <Box className={`my-12 relative ${className}`}>
      <Quote className="absolute -top-4 -left-4 w-12 h-12 text-cyan-500/10 -z-10" />
      <Stack gap={4} className="border-l border-accent pl-8">
        <Text variant="display" size="2xl" color="main" className="italic leading-relaxed">
          &ldquo;{quote}&rdquo;
        </Text>
        {author && (
          <Text variant="mono" size="xs" color="accent" weight="font-bold" className="uppercase tracking-widest">
            — {author}
          </Text>
        )}
      </Stack>
    </Box>
  );
}
