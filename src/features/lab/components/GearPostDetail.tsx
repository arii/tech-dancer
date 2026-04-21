import { motion } from 'motion/react';
import { ArrowLeft, ExternalLink, Shield, Star, DollarSign } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { Box, Stack, Text, Grid } from '@/layouts/Primitives';
import { Resource, readingTime } from '@/lib/content';
import { affiliateManager } from '@/lib/affiliateManager';

interface GearPostDetailProps {
  post: Resource;
  onBack: () => void;
  backLabel: string;
}

export function GearPostDetail({ post, onBack, backLabel }: GearPostDetailProps) {
  const rt = readingTime(post.content);

  const affiliateLinks = (post.affiliateIds || [])
    .map(id => affiliateManager.getLink(id))
    .filter((link): link is NonNullable<typeof link> => !!link);

  return (
    <Box as="article" padding="panel">
      <Stack gap={12} maxWidth="5xl" marginX="auto" className="w-full">
        {/* Navigation */}
        <Box
          as="button"
          onClick={onBack}
          display="flex"
          align="center"
          gap={2}
          color="dim"
          className="hover:text-accent-brand transition-colors"
          cursor="pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <Text variant="mono" size="xs" weight="font-bold">{backLabel}</Text>
        </Box>

        <Stack gap={10}>
          {/* Header */}
          <Stack gap={6}>
            <Box display="flex" align="center" gap={4}>
              <Box className="px-3 py-1 bg-accent/10 border border-accent/20 rounded-sm">
                <Text variant="mono" size="micro" weight="font-bold" color="brand" className="uppercase">
                  {post.category}
                </Text>
              </Box>
              <Text variant="mono" size="micro" color="dim">{post.date} • {rt} min read</Text>
            </Box>

            <Text variant="headline" size="fluid-8" className="tracking-tighter leading-none">
              {post.title}
            </Text>
          </Stack>

          {/* Hero Image */}
          {post.image && (
            <Box
              as={motion.div}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              aspect="video"
              overflow="hidden"
              border
              className="bg-muted shadow-2xl"
            >
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </Box>
          )}

          {/* Score Grid & Verdict */}
          <Grid cols={{ base: 1, md: 3 }} gap={6}>
            <Box padding={6} border className="bg-surface/50 border-accent/10 flex flex-col items-center justify-center text-center">
              <Star className="w-6 h-6 text-yellow-500 mb-2" />
              <Text variant="display" size="3xl" weight="font-black">{post.rating || 'N/A'}</Text>
              <Text variant="mono" size="micro" color="dim" uppercase>Overall Score</Text>
            </Box>
            <Box padding={6} border className="bg-surface/50 border-accent/10 flex flex-col items-center justify-center text-center">
              <Shield className="w-6 h-6 text-blue-500 mb-2" />
              <Text variant="display" size="3xl" weight="font-black">{post.durability || '8.5'}</Text>
              <Text variant="mono" size="micro" color="dim" uppercase>Durability</Text>
            </Box>
            <Box padding={6} border className="bg-surface/50 border-accent/10 flex flex-col items-center justify-center text-center">
              <DollarSign className="w-6 h-6 text-green-500 mb-2" />
              <Text variant="display" size="3xl" weight="font-black">{post.value || '9.0'}</Text>
              <Text variant="mono" size="micro" color="dim" uppercase>Value for Money</Text>
            </Box>
          </Grid>

          {/* Verdict Callout */}
          {post.verdict && (
            <Box padding={8} className="bg-teal-50 border-l-4 border-teal-500 rounded-r-lg">
              <Stack gap={2}>
                <Text variant="mono" size="micro" weight="font-bold" className="text-teal-700 uppercase tracking-widest">The Verdict</Text>
                <Text variant="display" size="xl" className="text-teal-900">{post.verdict}</Text>
              </Stack>
            </Box>
          )}

          {/* Main Content */}
          <Grid cols={{ base: 1, lg: 3 }} gap={12}>
            <Box className="lg:col-span-2">
              <Box className="prose prose-slate max-w-none prose-headings:font-display prose-p:font-sans prose-p:text-text-dim prose-strong:text-text-main">
                <ReactMarkdown
                  components={{
                    a: ({node, ...props}) => <a {...props} rel="noopener noreferrer" target="_blank" />
                  }}
                >
                  {post.content}
                </ReactMarkdown>
              </Box>
            </Box>

            {/* Sidebar: Specs & Affiliate */}
            <Stack gap={8}>
              {post.specs && (
                <Box border padding={6} className="bg-surface/50">
                  <Text variant="mono" size="xs" weight="font-bold" className="mb-4 block uppercase border-b border-line pb-2">Technical Specs</Text>
                  <Stack gap={3}>
                    {Object.entries(post.specs).map(([key, value]) => (
                      <Box key={key} display="flex" justify="between" align="center">
                        <Text variant="mono" size="micro" color="dim" uppercase>{key}</Text>
                        <Text variant="mono" size="micro" weight="font-bold">{value}</Text>
                      </Box>
                    ))}
                  </Stack>
                </Box>
              )}

              {affiliateLinks.length > 0 && (
                <Stack gap={4}>
                  <Text variant="mono" size="xs" weight="font-bold" className="uppercase tracking-widest">Where to buy</Text>
                  {affiliateLinks.map((link) => (
                    <Box
                      key={link.id}
                      as="a"
                      href={affiliateManager.resolveUrl(link.id)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center justify-between p-4 bg-slate-900 border border-slate-800 hover:border-accent transition-colors"
                    >
                      <Stack gap={1}>
                        <Text variant="mono" size="xs" weight="font-bold" className="text-white">{link.name}</Text>
                        <Text variant="mono" size="micro" className="text-slate-400">{post.priceCategory || '$$$'}</Text>
                      </Stack>
                      <ExternalLink className="w-4 h-4 text-accent group-hover:translate-x-1 transition-transform" />
                    </Box>
                  ))}
                  <Text variant="mono" size="micro" color="dim" className="opacity-50 italic leading-tight">
                    * Affiliate link disclosure: I may earn a small commission at no extra cost to you if you purchase through these links.
                  </Text>
                </Stack>
              )}
            </Stack>
          </Grid>
        </Stack>
      </Stack>
    </Box>
  );
}
