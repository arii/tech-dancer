import { motion } from 'motion/react';
import { NavLink } from 'react-router-dom';
import { ArrowRight, Calendar, MapPin } from 'lucide-react';
import { Box, Stack, Grid, Text } from '@/layouts/Primitives';
import { useHome } from './useHome';
import { SEO } from '@/components/SEO';
import { STATIC_SCHEMAS } from '@/config/constants';

export default function Home() {
  const { recentPosts, upcomingEvents, homeHeroLinks } = useHome();

  return (
    <Box as="section">
      <SEO
        title="Home"
        description="The West Coast Swing Lifestyle Blog. Training tips, travel guides, gear picks, and data for dancers who want to get better and go further."
        schema={STATIC_SCHEMAS.HOME}
      />

      <Box as="section" paddingX={{ base: 4, sm: 6, md: 10 }} paddingTop={{ base: 6, md: 14 }} paddingBottom={12} maxWidth="4xl">
        <Box as={motion.div} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <Text variant="sans" size="xs" weight="font-bold" uppercase color="dim" className="tracking-widest" marginBottom={4}>
            Welcome to boomtick.blog
          </Text>
          <Text as="h1" variant="display" size="5xl" weight="font-black" marginBottom={4} className="leading-tight">
            The West Coast Swing Lifestyle Blog
          </Text>
          <Text variant="body" size="lg" color="dim" className="leading-7 max-w-xl">
            Training tips, travel guides, gear picks, and data for dancers who want to get better and go further.
          </Text>
        </Box>
      </Box>

      <Box as="section" paddingX={{ base: 4, sm: 6, md: 10 }} paddingBottom={16}>
        <Grid as={motion.div} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.15 }} cols={{ base: 1, lg: 2 }} border className="border-line rounded-2xl overflow-hidden min-h-64">
          <Box position="relative" surface="default" padding={{ base: 5, sm: 8 }} display="flex" className="min-h-64 group">
            <Stack justify="end" width="full" className="z-10 relative">
              <Text as="h2" variant="display" size="3xl" weight="font-black" uppercase marginBottom={3} className="tracking-tight">
                Train smarter.
              </Text>
              <Text variant="body" size="sm" color="dim" marginBottom={5} className="max-w-xs leading-6">
                Drills, breakdowns, and mindset for West Coast Swing dancers at every level.
              </Text>
              <Stack gap={2}>
                {homeHeroLinks[0].map((link) => (
                  <Box as={NavLink} key={link.label} to={link.href} className="text-sm font-semibold text-accent hover:text-accent transition-colors">
                    {link.label}
                  </Box>
                ))}
              </Stack>
            </Stack>
          </Box>

          <Box position="relative" surface="default" padding={{ base: 5, sm: 8 }} display="flex" className="min-h-64 group border-t 0 border-line">
            <Stack justify="end" width="full" className="z-10 relative">
              <Text as="h2" variant="display" size="3xl" weight="font-black" uppercase marginBottom={3} className="tracking-tight">
                Travel better.
              </Text>
              <Text variant="body" size="sm" color="dim" marginBottom={5} className="max-w-xs leading-6">
                Make the most of every dance weekend — what to pack, where to stay, and how to arrive ready to move.
              </Text>
              <Stack gap={2}>
                {homeHeroLinks[1].map((link) => (
                  <Box as={NavLink} key={link.label} to={link.href} className="text-sm font-semibold text-accent hover:text-accent transition-colors">
                    {link.label}
                  </Box>
                ))}
              </Stack>
            </Stack>
          </Box>
        </Grid>
      </Box>

      <Box as="section" paddingX={{ base: 4, sm: 6, md: 10 }} paddingBottom={16}>
        <Stack direction={{ base: 'col', sm: 'row' }} align={{ sm: 'end' }} justify="between" gap={3} marginBottom={6}>
          <Box>
            <Text variant="sans" size="xs" weight="font-bold" uppercase color="dim" marginBottom={1} className="tracking-widest">Latest Updates</Text>
            <Text as="h2" variant="display" size="2xl" weight="font-black">Recent Posts</Text>
          </Box>
          <Box as={NavLink} to="/blog" display="flex" align="center" gap={1} color="dim" className="text-xs font-bold uppercase tracking-widest hover:text-accent transition-colors">
            View all posts <ArrowRight size={13} />
          </Box>
        </Stack>

        <Stack border paddingX={1} surface="muted" className="border-line rounded-2xl divide-y divide-line/80">
          {recentPosts.map((post, i) => (
            <Box as={motion.a} href={`/blog/${post.slug}`} key={post.slug} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 * i + 0.3 }} display="flex" direction={{ base: 'col', sm: 'row' }} align={{ sm: 'start' }} gap={{ base: 3, sm: 4 }} paddingX={{ base: 3, sm: 5 }} paddingY={{ base: 5, sm: 6 }} className="group hover:bg-surface transition-colors">
              <Stack direction="row" align="center" wrap gap={2} className="44 shrink-0">
                <Text variant="sans" size="xs" weight="font-bold" border paddingX={2} className="rounded uppercase">
                  {post.category}
                </Text>
                <Text variant="mono" size="xs" color="dim" className="whitespace-nowrap">{post.date}</Text>
              </Stack>
              <Box>
                <Text as="h3" variant="display" size="base" weight="font-bold" marginBottom={1} className="group-hover:text-accent transition-colors">{post.title}</Text>
                <Text variant="body" size="sm" color="dim" className="leading-7">{post.excerpt}</Text>
              </Box>
            </Box>
          ))}
        </Stack>
      </Box>

      <Box as="section" paddingX={{ base: 4, sm: 6, md: 10 }} paddingBottom={16}>
        <Box marginBottom={6}>
          <Text variant="sans" size="xs" weight="font-bold" uppercase color="dim" marginBottom={1} className="tracking-widest">On the Circuit</Text>
          <Text as="h2" variant="display" size="2xl" weight="font-black">Where Dancers Go</Text>
        </Box>
        <Grid cols={{ base: 1, sm: 2, lg: 3 }} gap={4}>
          {upcomingEvents.map((evt, i) => (
            <Box as={motion.div} key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.1 * i + 0.4 }} surface="default" border padding={{ base: 4, sm: 5 }} className="rounded-xl border-line hover:border-accent transition-colors">
              <Text as="h3" variant="display" size="sm" weight="font-bold" marginBottom={2}>{evt.name}</Text>
              <Box display="flex" align="center" gap={1} color="dim" marginBottom={1} className="text-xs">
                <MapPin size={12} className="shrink-0 text-accent" />{evt.location}
              </Box>
              <Box display="flex" align="center" gap={1} color="dim" className="text-xs">
                <Calendar size={12} className="shrink-0" />{evt.cadence}
              </Box>
            </Box>
          ))}
        </Grid>
      </Box>

      <Box as="section" paddingX={{ base: 4, sm: 6, md: 10 }} paddingBottom={16}>
        <Stack direction={{ base: 'col', sm: 'row' }} align={{ sm: 'center' }} gap={4} surface="muted" border padding={{ base: 5, sm: 6 }} className="rounded-2xl border-line">
          <Box flex={1}>
            <Text variant="sans" size="xs" weight="font-bold" uppercase color="brand" marginBottom={2} className="tracking-widest">Data Lab</Text>
            <Text as="h3" variant="display" size="lg" weight="font-black" marginBottom={1}>WCS Competition Analytics</Text>
            <Text variant="body" size="sm" color="dim" className="leading-7">
              Objective data on competition trends, scoring patterns, and point progression — because the numbers tell a story too.
            </Text>
          </Box>
          <Box as={NavLink} to="/research" display="inline-flex" align="center" justify="center" gap={2} border paddingX={5} paddingY={2} className="shrink-0 rounded-lg text-sm font-bold text-accent hover:bg-line transition-colors">
            Explore Data <ArrowRight size={14} />
          </Box>
        </Stack>
      </Box>

    </Box>
  );
}
