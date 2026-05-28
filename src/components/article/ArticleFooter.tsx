
/* impeccable-ignore-file */
import { Box, Stack, Text, Grid } from '@/layouts/Primitives';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

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
      <Box className="rounded-2xl border border-slate-800/80 bg-slate-900/40 p-8 lg:p-12 text-center relative overflow-hidden">
        {/* Background Accents */}
        <Box className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 blur-[100px] -mr-32 -mt-32 rounded-full" />
        <Box className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-500/5 blur-[100px] -ml-32 -mb-32 rounded-full" />

        <Stack gap={6} align="center" className="relative z-10 max-w-2xl mx-auto">
          <Stack gap={2}>
            <Text variant="mono" size="xs" weight="font-bold" className="text-cyan-400 uppercase tracking-[0.2em]">
              Stay Connected
            </Text>
            <Text variant="display" size="2xl" className="text-slate-100">
              Fresh insights, delivered weekly.
            </Text>
          </Stack>
          <Text className="text-slate-400 leading-relaxed">
            Get the latest WCS competition data, gear reviews, and technical guides sent straight to your inbox. No fluff, just the good stuff.
          </Text>

          <Stack direction={{ base: 'column', sm: 'row' }} gap={3} className="w-full max-w-md mt-4">
            <Box
              as="input"
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-5 py-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 focus:outline-none focus:border-cyan-500/50 transition-colors"
            />
            <Box
              as="button"
              className="px-6 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold transition-colors whitespace-nowrap"
            >
              Subscribe
            </Box>
          </Stack>

          <Text variant="mono" size="micro" className="text-slate-600">
            Join 2,500+ dancers and tech enthusiasts.
          </Text>
        </Stack>
      </Box>

      {/* Related Content */}
      {related && related.length > 0 && (
        <Stack gap={8}>
          <Text variant="mono" size="xs" weight="font-bold" className="text-slate-500 uppercase tracking-widest">
            Next Steps
          </Text>
          <Grid cols={{ base: 1, md: 2 }} gap={6}>
            {related.map((post, i) => (
              <Box
                key={i}
                as={Link}
                to={post.href}
                className="group p-6 rounded-2xl border border-slate-800/80 bg-slate-950/40 hover:border-cyan-500/30 transition-all"
              >
                <Stack direction="row" justify="between" align="center" gap={4}>
                  <Stack gap={1}>
                    {post.category && (
                      <Text variant="mono" size="micro" className="text-cyan-400 font-bold uppercase">
                        {post.category}
                      </Text>
                    )}
                    <Text weight="font-bold" className="text-slate-200 group-hover:text-slate-100 transition-colors">
                      {post.title}
                    </Text>
                  </Stack>
                  <ArrowRight className="w-5 h-5 text-slate-600 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all" />
                </Stack>
              </Box>
            ))}
          </Grid>
        </Stack>
      )}
    </Stack>
  );
}
