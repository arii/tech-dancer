

import { Box, Stack, Text, Grid } from '@/layouts/Primitives';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ArticleCard } from './ArticleCard';

interface RelatedPost {
  title: string;
  href: string;
  category?: string;
  image?: string;
}

interface ArticleFooterProps {
  related?: RelatedPost[];
}

export function ArticleFooter({ related }: ArticleFooterProps) {
  return (
    <Stack gap={16}>
      {/* Subscribe Section */}
      <ArticleCard className="p-8 lg:p-12 text-center relative overflow-hidden bg-surface/40">
        {/* Background Accents */}
        <Box className="absolute top-0 right-0 w-64 h-64 bg-accent/5 blur-[100px] -mr-32 -mt-32 rounded-full" />
        <Box className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-500/5 blur-[100px] -ml-32 -mb-32 rounded-full" />

        <Stack gap={6} align="center" className="relative z-10 max-w-2xl mx-auto">
          <Stack gap={2}>
            <Text variant="mono" size="xs" weight="font-bold" color="accent" className="uppercase tracking-widest">
              Stay Connected
            </Text>
            <Text variant="display" size="2xl" color="main">
              Fresh insights, delivered weekly.
            </Text>
          </Stack>
          <Text color="dim" className="leading-relaxed">
            Get the latest WCS competition data, gear reviews, and technical guides sent straight to your inbox. No fluff, just the good stuff.
          </Text>

          <Stack direction={{ base: 'column', sm: 'row' }} gap={3} className="w-full max-w-md mt-4">
            <Box
              as="input"
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-5 py-3 rounded-xl bg-bg border border-line text-text-body focus:outline-none focus:border-cyan-500/50 transition-colors"
            />
            <Box
              as="button"
              className="px-6 py-3 rounded-xl bg-accent hover:bg-cyan-400 text-bg font-bold transition-colors whitespace-nowrap"
            >
              Subscribe
            </Box>
          </Stack>

        </Stack>
      </ArticleCard>

      {/* Related Content */}
      {related && related.length > 0 && (
        <Stack gap={8}>
          <Text variant="mono" size="xs" weight="font-bold" className="text-text-dim uppercase tracking-widest">
            Next Steps
          </Text>
          <Grid cols={{ base: 1, md: 2 }} gap={6}>
            {related.map((post, i) => (
              <ArticleCard
                key={i}
                as={Link}
                to={post.href}
                className="group p-6 bg-bg/40 hover:border-cyan-500/30 transition-all"
              >
                <Stack direction="row" justify="between" align="center" gap={4}>
                  <Stack gap={1}>
                    {post.category && (
                      <Text variant="mono" size="micro" color="accent" weight="font-bold" className="uppercase">
                        {post.category}
                      </Text>
                    )}
                    <Text weight="font-bold" color="body" className="group-hover:text-text-main transition-colors">
                      {post.title}
                    </Text>
                  </Stack>
                  <ArrowRight className="w-5 h-5 text-text-dim group-hover:text-accent group-hover:translate-x-1 transition-all" />
                </Stack>
              </ArticleCard>
            ))}
          </Grid>
        </Stack>
      )}
    </Stack>
  );
}
