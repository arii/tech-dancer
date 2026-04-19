import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { Clock, Tag, ArrowRight, Search } from 'lucide-react';
import { Box, Stack, Text, Grid } from '@/components/layout/Primitives';
import { useBlog } from './useBlog';

export default function BlogFeed() {
  const navigate = useNavigate();
  const { posts, categories, activeCategory, setActiveCategory, searchTerm, setSearchTerm } = useBlog();

  return (
    <Box as="section" padding="panel">
      <Stack gap={16}>
        {/* Global Search Hub */}
        <Stack gap={12}>
          <Stack gap={6}>
            <Text variant="mono" color="brand" weight="font-bold">JOURNAL</Text>
            <Text variant="headline" size="fluid-9" className="leading-none">Folio.</Text>
          </Stack>

          <Box position="relative" maxWidth="4xl">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-accent-brand" />
            <Box 
              as="input" 
              type="text"
              placeholder="GLOBAL SEARCH HUB // FILTER BY KEYWORD"
              value={searchTerm}
              onChange={(e: any) => setSearchTerm(e.target.value)}
              width="full"
              surface="default"
              border
              paddingY={6}
              paddingLeft={16}
              paddingRight={6}
              variant="display"
              size="2xl"
              className="placeholder:opacity-30 focus:border-accent-brand focus:ring-1 focus:ring-accent-brand transition-all outline-none"
            />
          </Box>
        </Stack>

        <Stack gap={12}>
          <Box display="flex" wrap gap={3}>
            {categories.map((cat) => (
              <Box 
                key={cat}
                as="button"
                onClick={() => setActiveCategory(cat)}
                paddingX={6}
                paddingY={2}
                border
                variant="mono"
                size="micro"
                weight="font-bold"
                surface={activeCategory === cat ? "accent" : "default"}
                cursor="pointer"
                className="hover:border-accent-brand transition-colors uppercase tracking-[2px]"
              >
                {cat}
              </Box>
            ))}
          </Box>

          <Grid cols={{ base: 1, md: 2, lg: 3 }} gap={12}>
            <AnimatePresence mode="popLayout">
              {posts.map((post, i) => (
                <Box 
                  key={post.slug}
                  as={motion.div}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => navigate(`/blog/${post.slug}`)}
                  cursor="pointer"
                  className="group"
                >
                  <Stack gap={6}>
                    <Box 
                      aspect="video" 
                      overflow="hidden" 
                      border 
                      className="transition-all duration-700 bg-muted"
                    >
                      {post.image ? (
                        <motion.img 
                          whileHover={{ scale: 1.05 }}
                          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                          src={post.image}
                          alt={post.title}
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      ) : (
                        <Box height="full" width="full" display="flex" align="center" justify="center">
                          <Tag className="w-12 h-12 text-line opacity-20" />
                        </Box>
                      )}
                    </Box>
                    <Stack gap={4}>
                      <Box display="flex" align="center" gap={4}>
                        <Box display="flex" align="center" gap={2} color="brand">
                          <Tag className="w-3 h-3" />
                          <Text variant="mono" size="micro" weight="font-bold">{post.category}</Text>
                        </Box>
                        <Box display="flex" align="center" gap={2} color="dim">
                          <Clock className="w-3 h-3" />
                          <Text variant="mono" size="micro">{post.date}</Text>
                        </Box>
                      </Box>
                      <Text variant="display" size="2xl" className="group-hover:text-accent-brand transition-colors leading-[1.1]">
                        {post.title}
                      </Text>
                      <Text variant="body" size="sm" color="dim" className="line-clamp-3">
                        {post.excerpt}
                      </Text>
                      <Box 
                        display="flex" 
                        align="center" 
                        gap={2} 
                        color="dim" 
                        className="group-hover:text-accent-brand transition-colors pt-2"
                      >
                        <Text variant="mono" size="xs" weight="font-bold">Read Post</Text>
                        <ArrowRight className="w-4 h-4" />
                      </Box>
                    </Stack>
                  </Stack>
                </Box>
              ))}
            </AnimatePresence>
          </Grid>
        </Stack>
      </Stack>
    </Box>
  );
}
