

import { Box, Stack, Text, Grid } from '@/layouts/Primitives';
import { EmailForm } from '@/features/email-capture/EmailForm';
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
      <ArticleCard padding={{ base: 8, lg: 12 }} textAlign="center" position="relative" overflow="hidden" surface="surface-alt">
        {/* Background Accents */}
        <Box position="absolute" top={0} right={0} width={64} height={64} className="bg-accent/5 rounded-full blur-3xl" marginRight={-32} marginTop={-32} />
        <Box position="absolute" bottom={0} left={0} width={64} height={64} className="bg-accent-purple/5 rounded-full blur-3xl" marginLeft={-32} marginBottom={-32} />

        <Stack gap={6} align="center" position="relative" zIndex={10} maxWidth="2xl" marginX="auto">
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


<Box width="full" maxWidth="md" marginTop={4}>
            <EmailForm />
          </Box>
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
                padding={6} className="group bg-bg/40 hover:border-cyan-500/30 transition-all"
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
