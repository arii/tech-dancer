
/* impeccable-ignore-file */
import { Box, Text, Stack } from '@/layouts/Primitives';
import { ReactNode } from 'react';
import { Quote } from 'lucide-react';

interface ArticleCalloutProps {
  title?: string;
  children: ReactNode;
  variant?: 'info' | 'warning' | 'tip';
}

export function ArticleCallout({ title, children, variant = 'info' }: ArticleCalloutProps) {
  const styles = {
    info: 'border-cyan-500/30 bg-cyan-500/5 text-cyan-100',
    warning: 'border-amber-500/30 bg-amber-500/5 text-amber-100',
    tip: 'border-emerald-500/30 bg-emerald-500/5 text-emerald-100',
  };

  return (
    <Box className={`my-8 p-6 rounded-xl border ${styles[variant]} backdrop-blur-sm`}>
      <Stack gap={3}>
        {title && (
          <Text variant="mono" size="xs" weight="font-bold" className="uppercase tracking-widest opacity-80">
            {title}
          </Text>
        )}
        <Box className="prose-p:my-0 prose-p:text-inherit">
          {children}
        </Box>
      </Stack>
    </Box>
  );
}

interface ArticlePullQuoteProps {
  quote: string;
  author?: string;
  className?: string;
}

export function ArticlePullQuote({ quote, author, className = "" }: ArticlePullQuoteProps) {
  return (
    <Box className={`my-12 relative ${className}`}>
      <Quote className="absolute -top-4 -left-4 w-12 h-12 text-cyan-500/10 -z-10" />
      <Stack gap={4} className="border-l-2 border-cyan-400 pl-8">
        <Text variant="display" size="2xl" className="text-slate-100 italic leading-relaxed">
          &ldquo;{quote}&rdquo;
        </Text>
        {author && (
          <Text variant="mono" size="xs" className="text-cyan-400 font-bold uppercase tracking-widest">
            — {author}
          </Text>
        )}
      </Stack>
    </Box>
  );
}

interface ArticleSectionProps {
  title: string;
  id?: string;
  children: ReactNode;
}

export function ArticleSection({ title, id, children }: ArticleSectionProps) {
  return (
    <Box as="section" id={id} className="mb-16 last:mb-0">
      <Text
        as="h2"
        variant="display"
        size="2xl"
        className="text-slate-100 font-bold mb-8 border-l-2 border-cyan-400 pl-4"
      >
        {title}
      </Text>
      <Box>
        {children}
      </Box>
    </Box>
  );
}
