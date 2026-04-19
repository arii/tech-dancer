/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, AnimatePresence } from 'motion/react';
import { Calendar, Search, ArrowLeft, ArrowRight, BookOpen, Plane, Cpu, ShoppingBag, X } from 'lucide-react';
import { useState, useEffect, useMemo } from 'react';
import Markdown from 'react-markdown';
import { getAllContent, ContentItem } from '@/lib/content';
import { Box, Stack, Text, Grid } from '@/components/layout/Primitives';
import { cn } from '@/lib/utils';

export default function Blog() {
  const [selectedPost, setSelectedPost] = useState<ContentItem | null>(null);
  const [posts, setPosts] = useState<ContentItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  useEffect(() => {
    const loadedPosts = getAllContent('posts');
    setPosts(loadedPosts);
  }, []);

  const categories = useMemo(() => {
    const cats = posts.map(p => p.category);
    return Array.from(new Set(cats));
  }, [posts]);

  const filteredPosts = useMemo(() => {
    return posts.filter(post => {
      const matchesSearch = 
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.content.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = activeCategory ? post.category === activeCategory : true;
      
      return matchesSearch && matchesCategory;
    });
  }, [posts, searchQuery, activeCategory]);

  if (selectedPost) {
    return (
      <Box as="section" padding="panel">
        <motion.button 
          whileHover={{ x: -4 }}
          onClick={() => setSelectedPost(null)}
          className="flex items-center gap-2 text-accent-brand font-bold uppercase tracking-widest text-[10px] font-mono mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Folio
        </motion.button>

        <Box maxWidth="4xl" marginX="auto">
          <Stack gap={12}>
            <Stack direction="row" align="center" gap={6}>
              <Box border color="brand" paddingX={3} paddingY={1}>
                <Text variant="mono" weight="font-bold" size="micro">{selectedPost.category}</Text>
              </Box>
              <Stack direction="row" align="center" gap={2}>
                <Calendar className="w-3 h-3 text-text-dim" />
                <Text variant="mono" size="micro" color="dim">{selectedPost.date}</Text>
              </Stack>
            </Stack>

            <Text as="h1" variant="headline" size="text-4xl md:text-8xl">
              {selectedPost.title}
            </Text>

            <Box border surface="dim" padding={0} overflow="hidden" aspectRatio="21/9" shadow="industrial">
              <img src={selectedPost.image} alt={selectedPost.title} className="w-full h-full object-cover grayscale" />
            </Box>

            <Box border surface="default" padding={8} className="markdown-body prose prose-invert max-w-none text-text-body leading-relaxed space-y-8">
              <Markdown>{selectedPost.content}</Markdown>
            </Box>
          </Stack>
        </Box>
      </Box>
    );
  }

  return (
    <Box as="section" padding="panel">
      {/* Global Search Hub */}
      <Box border surface marginBottom={16} padding={0} className="relative z-10 overflow-hidden" shadow="industrial">
        <Stack direction={{ base: "col", md: "row" }} gap={0}>
          <Box flex={1} padding={8} border={{ b: true, md: { b: false, r: true } }} className="relative">
            <Search className="absolute left-10 top-1/2 -translate-y-1/2 w-6 h-6 text-accent-brand/40" />
            <input 
              type="text"
              placeholder="GLOBAL_SEARCH_HUB: KEYWORDS_QUERY"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent border-none focus:outline-none pl-12 text-2xl font-display font-bold uppercase tracking-tight placeholder:text-text-dim/20"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-8 top-1/2 -translate-y-1/2 text-text-dim hover:text-accent-brand"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </Box>
          <Box padding={8} className="bg-surface/50">
            <Stack direction="row" gap={3} flex="wrap">
              <button 
                onClick={() => setActiveCategory(null)}
                className={cn(
                  "px-4 py-2 text-[10px] font-mono font-bold uppercase tracking-widest border transition-all",
                  activeCategory === null ? "bg-accent-brand text-white border-accent-brand" : "border-line text-text-dim hover:border-accent-brand"
                )}
              >
                All_Systems
              </button>
              {categories.map(cat => (
                <button 
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={cn(
                    "px-4 py-2 text-[10px] font-mono font-bold uppercase tracking-widest border transition-all",
                    activeCategory === cat ? "bg-accent-brand text-white border-accent-brand" : "border-line text-text-dim hover:border-accent-brand"
                  )}
                >
                  {cat?.replace(/\s/g, '_')}
                </button>
              ))}
            </Stack>
          </Box>
        </Stack>
      </Box>

      {/* Folio Grid */}
      <Grid cols={1} md={2} lg={3} gap={1} border className="bg-line">
        <AnimatePresence mode="popLayout">
          {filteredPosts.map((post) => (
            <motion.div
              layout
              key={post.slug}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                setSelectedPost(post);
                window.scrollTo(0, 0);
              }}
              className="bg-bg p-8 hover:bg-card-bg transition-colors cursor-pointer group flex flex-col h-full border-r border-b border-line scanline-hover"
            >
              <Stack gap={6} flex={1}>
                <Stack direction="row" justify="between" align="start">
                  <Box border color="brand" paddingX={2} paddingY={0.5}>
                    <Text variant="mono" size="micro" weight="font-bold">{post.category}</Text>
                  </Box>
                  <Text variant="mono" size="micro" color="dim">{post.date}</Text>
                </Stack>
                
                <Box border surface="dim" overflow="hidden" aspectRatio="video" className="grayscale group-hover:grayscale-0 transition-all duration-700">
                  <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
                </Box>

                <Stack gap={3}>
                  <Text as="h2" variant="headline" size="3xl" className="group-hover:text-accent-brand transition-colors leading-tight">
                    {post.title}
                  </Text>
                  <Text variant="body" size="sm" className="line-clamp-3 opacity-80 leading-relaxed">
                    {post.excerpt}
                  </Text>
                </Stack>
              </Stack>
              
              <Box marginTop={8} className="flex items-center gap-2 text-accent-brand transition-transform group-hover:translate-x-1">
                <Text variant="label" size="micro" weight="font-bold">Access_Article</Text>
                <ArrowRight className="w-3 h-3" />
              </Box>
            </motion.div>
          ))}
        </AnimatePresence>
      </Grid>

      {filteredPosts.length === 0 && (
        <Box padding={20} className="text-center">
          <Text variant="mono" color="brand" size="xl">NO_RESULTS_FOUND_IN_REGISTRY</Text>
        </Box>
      )}
    </Box>
  );
}
