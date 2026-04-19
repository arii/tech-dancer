import { motion } from 'motion/react';
import { Zap, ArrowRight, Shield, Calendar } from 'lucide-react';
import { Box, Stack, Text, Grid } from '@/components/layout/Primitives';
import { useHome } from './useHome';

export default function Home() {
  const { recentPosts, dancerPaths, hirePaths, handleNavigateToBlog, handleNavigateToPost, handleNavigate } = useHome();

  return (
    <Box as="section" padding="panel">
      <Stack justify="center" padding="hero" minHeight="full" gap={20}>
        <Stack gap={8}>
          <Text variant="mono" color="brand" weight="font-bold" uppercase tracking="widest">
            Welcome to tech-dancer
          </Text>
          <Text 
            as={motion.h1}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            variant="headline" 
            size="fluid-9"
            className="leading-[0.9] tracking-tighter"
          >
            The Roboticist's Guide to the <br />
            <span className="text-accent-brand italic">West Coast Swing</span>
          </Text>
          <Text variant="display" size="2xl" maxWidth="3xl" color="body" weight="font-bold">
            Engineering a better dance weekend. Providing the systems, travel hacks, and informed competition analysis you need to maximize your WCS (West Coast Swing) lifestyle.
          </Text>
          <Text variant="body" size="lg" maxWidth="2xl" color="dim">
            You’re looking at a living portfolio as a platform. Enjoy the west coast swing content or dive into the technical details.
          </Text>
        </Stack>

        <Grid cols={{ base: 1, md: 5 }} gap={8} minHeight="400px">
          {/* Path 1: Are you a dancer? (Span 3 for asymmetry) */}
          <Box 
            span={{ base: 1, md: 3 }}
            surface="muted"
            border
            position="relative"
            overflow="hidden"
            padding="card"
            className="group cursor-pointer"
          >
            {/* Scanline Effect */}
            <Box 
              position="absolute"
              inset={0}
              pointerEvents="none"
              className="opacity-0 group-hover:opacity-10 transition-opacity duration-300"
              style={{
                background: 'linear-gradient(transparent 50%, rgba(255, 255, 255, 0.1) 50%)',
                backgroundSize: '100% 4px',
                animation: 'scanline 10s linear infinite'
              }}
            />
            
            <Stack gap={8} height="full" justify="between">
              <Stack gap={4}>
                <Text variant="display" size="3xl" weight="font-bold">Are you a dancer?</Text>
                <Stack gap={3}>
                  {dancerPaths.map(item => (
                    <Box 
                      key={item.label}
                      onClick={(e) => { e.stopPropagation(); handleNavigate(item.path); }}
                      className="flex items-center gap-2 text-text-dim hover:text-accent-brand transition-colors"
                    >
                      <ArrowRight className="w-4 h-4" />
                      <Text variant="mono" size="sm" weight="font-bold" uppercase>{item.label}</Text>
                    </Box>
                  ))}
                </Stack>
              </Stack>
              <Text variant="mono" size="micro" color="dim">PATH_01 // LIFESTYLE</Text>
            </Stack>
          </Box>

          {/* Path 2: Hiring (Span 2) */}
          <Box 
            span={{ base: 1, md: 2 }}
            surface="default"
            border
            position="relative"
            overflow="hidden"
            padding="card"
            className="group cursor-pointer"
          >
            <Box 
              position="absolute"
              inset={0}
              pointerEvents="none"
              className="opacity-0 group-hover:opacity-10 transition-opacity duration-300"
              style={{
                background: 'linear-gradient(transparent 50%, rgba(255, 255, 255, 0.1) 50%)',
                backgroundSize: '100% 4px',
                animation: 'scanline 10s linear infinite'
              }}
            />

            <Stack gap={8} height="full" justify="between">
              <Stack gap={4}>
                <Text variant="display" size="2xl" weight="font-bold">Looking to hire a roboticist?</Text>
                <Stack gap={3}>
                  {hirePaths.map(item => (
                    <Box 
                      key={item.label}
                      onClick={(e) => { e.stopPropagation(); handleNavigate(item.path); }}
                      className="flex items-center gap-2 text-text-dim hover:text-accent-brand transition-colors"
                    >
                      <ArrowRight className="w-4 h-4" />
                      <Text variant="mono" size="sm" weight="font-bold" uppercase>{item.label}</Text>
                    </Box>
                  ))}
                </Stack>
              </Stack>
              <Text variant="mono" size="micro" color="dim">PATH_02 // PORTFOLIO</Text>
            </Stack>
          </Box>
        </Grid>

        <Stack gap={12}>
          <Box display="flex" justify="between" align="end" border="b" paddingBottom={4}>
            <Stack gap={1}>
              <Text variant="mono" size="xs" color="brand">JOURNAL</Text>
              <Text variant="display" size="4xl">Latest Thoughts</Text>
            </Stack>
            <Box 
              as="button" 
              onClick={handleNavigateToBlog}
              display="flex" 
              align="center" 
              gap={2} 
              color="dim" 
              className="hover:text-accent-brand transition-colors"
              cursor="pointer"
            >
              <Text variant="mono" size="xs" weight="font-bold">View All Posts</Text>
              <ArrowRight className="w-4 h-4" />
            </Box>
          </Box>

          <Grid cols={{ base: 1, md: 3 }} gap={8}>
            {recentPosts.map((post, i) => (
              <Box 
                key={post.slug}
                as={motion.div}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + (i * 0.1) }}
                cursor="pointer"
                onClick={() => handleNavigateToPost(post.slug)}
                className="group"
              >
                <Stack gap={6}>
                  <Box 
                    aspect="video" 
                    overflow="hidden" 
                    border 
                    className="grayscale group-hover:grayscale-0 transition-all duration-500 bg-muted"
                  >
                    {post.image ? (
                      <motion.img 
                        whileHover={{ scale: 1.05 }}
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <Box height="full" width="full" display="flex" align="center" justify="center">
                         <Zap className="w-12 h-12 text-line opacity-20" />
                      </Box>
                    )}
                  </Box>
                  <Stack gap={3}>
                    <Box display="flex" align="center" gap={3}>
                      <Text variant="mono" size="micro" color="brand" uppercase>{post.category}</Text>
                      <Box width={1} height={1} surface="dim" opacity={30} />
                      <Text variant="mono" size="micro" color="dim">{post.date}</Text>
                    </Box>
                    <Text variant="display" size="xl" className="group-hover:text-accent-brand transition-colors">
                      {post.title}
                    </Text>
                    <Text variant="body" size="sm" color="dim" className="line-clamp-2">
                      {post.excerpt}
                    </Text>
                  </Stack>
                </Stack>
              </Box>
            ))}
          </Grid>
        </Stack>
      </Stack>
    </Box>
  );
}
