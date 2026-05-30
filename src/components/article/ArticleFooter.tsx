
import { Box, Stack, Text, Grid } from '@/layouts/Primitives';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface RelatedPost {
  title: string;
  href: string;
  category?: string;
  image?: string;
}

interface NewsletterBlockProps {
  compact?: boolean;
}

export function NewsletterBlock({ compact = false }: NewsletterBlockProps) {
  return (
    <Box className={`rounded-2xl bg-surface/30 border border-line/40 overflow-hidden relative ${compact ? 'p-6 lg:p-8' : 'p-8 lg:p-12'}`}>
      <Box className="absolute top-0 right-0 w-64 h-64 bg-accent/5 blur-[100px] -mr-32 -mt-32 rounded-full" />

      <Stack gap={6} align={compact ? "start" : "center"} className={`relative z-10 ${compact ? '' : 'max-w-2xl mx-auto text-center'}`}>
        <Stack gap={2}>
          <Text variant="mono" size="xs" weight="font-extrabold" className="text-accent uppercase tracking-[0.18em]">
            Stay Connected
          </Text>
          <Text variant="display" size={compact ? "xl" : "2xl"} color="main" weight="font-bold" className="leading-tight tracking-tight">
            Fresh insights, delivered weekly.
          </Text>
        </Stack>

        {!compact && (
          <Text color="dim" weight="font-medium" className="leading-relaxed opacity-80">
            Get the latest WCS competition data, gear reviews, and technical guides sent straight to your inbox. No fluff, just the good stuff.
          </Text>
        )}

        <Stack direction={{ base: 'column', sm: 'row' }} gap={3} className={`w-full ${compact ? '' : 'max-w-md'} mt-2`}>
          <Box
            as="input"
            type="email"
            placeholder="Enter your email"
            className="flex-1 px-5 py-3 rounded-xl bg-bg/60 border border-line/80 text-text-body focus:outline-none focus:border-accent/50 transition-colors placeholder:text-text-dim/40"
          />
          <Box
            as="button"
            className="px-6 py-3 rounded-xl bg-accent hover:bg-cyan-400 text-bg font-bold transition-all active:scale-95 whitespace-nowrap"
          >
            Subscribe
          </Box>
        </Stack>
      </Stack>
    </Box>
  );
}

interface RelatedContentProps {
  title?: string;
  items: RelatedPost[];
}

export function RelatedContent({ title = "Keep Reading", items }: RelatedContentProps) {
  return (
    <Stack gap={8}>
      <Text variant="mono" size="xs" weight="font-extrabold" className="text-text-dim/60 uppercase tracking-[0.2em]">
        {title}
      </Text>
      <Grid cols={{ base: 1, md: 2 }} gap={4}>
        {items.map((post, i) => (
          <Box
            key={i}
            as={Link}
            to={post.href}
            className="group p-6 rounded-2xl border border-line/60 bg-surface/20 hover:border-accent/40 hover:bg-surface/40 transition-all"
          >
            <Stack direction="row" justify="between" align="center" gap={4}>
              <Stack gap={1.5}>
                {post.category && (
                  <Text variant="mono" size="micro" color="accent" weight="font-extrabold" className="uppercase tracking-wider">
                    {post.category}
                  </Text>
                )}
                <Text size="md" weight="font-bold" color="main" className="group-hover:text-accent transition-colors leading-snug tracking-tight">
                  {post.title}
                </Text>
              </Stack>
              <ArrowRight className="w-5 h-5 text-text-dim/40 group-hover:text-accent group-hover:translate-x-1 transition-all" />
            </Stack>
          </Box>
        ))}
      </Grid>
    </Stack>
  );
}

interface ArticleFooterProps {
  related?: RelatedPost[];
}

export function ArticleFooter({ related }: ArticleFooterProps) {
  return (
    <Stack gap={24}>
      {related && related.length > 0 && (
        <RelatedContent items={related} />
      )}
      <NewsletterBlock />
    </Stack>
  );
}
