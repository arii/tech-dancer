import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, Clock, Tag, Share2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { Box, Stack, Text } from '@/layouts/Primitives';
import { getPosts } from '@/lib/content';

export default function BlogPost() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const posts = getPosts();
  const post = posts.find((p) => p.slug === slug);

  if (!post) {
    return (
      <Box padding="panel" textAlign="center">
        <Stack gap={8} align="center">
          <Text variant="display" size="2xl">Post Not Found</Text>
          <Box as="button" onClick={() => navigate('/blog')} className="hover:text-accent-brand transition-colors">
            <Text variant="mono" size="xs">Back to Journal</Text>
          </Box>
        </Stack>
      </Box>
    );
  }

  return (
    <Box as="article" padding="panel">
      <Stack gap={12} maxWidth="5xl" marginX="auto" className="w-full">
        <Box 
          as="button" 
          onClick={() => navigate('/blog')}
          display="flex" 
          align="center" 
          gap={2} 
          color="dim" 
          className="hover:text-accent-brand transition-colors"
          cursor="pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <Text variant="mono" size="xs" weight="font-bold">Back to Folio</Text>
        </Box>

        <Stack gap={8}>
          <Box display="flex" align="center" gap={4}>
            <Box display="flex" align="center" gap={2} color="brand">
              <Tag className="w-3 h-3" />
              <Text variant="mono" size="micro" weight="font-bold">{post.category.toUpperCase()}</Text>
            </Box>
            <Box display="flex" align="center" gap={2} color="dim">
              <Clock className="w-3 h-3" />
              <Text variant="mono" size="micro">{post.date}</Text>
            </Box>
          </Box>

          <Text variant="headline" size="fluid-8" className="tracking-tighter leading-none">
            {post.title}
          </Text>

          {post.image && (
            <Box 
              as={motion.div}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              aspect="video" 
              overflow="hidden" 
              border 
              className="bg-muted"
            >
              <img 
                src={post.image} 
                alt={post.title} 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </Box>
          )}

          <Box className="prose prose-sm md:prose-base prose-slate max-w-none w-full overflow-hidden break-words prose-headings:font-display prose-p:font-sans prose-p:text-text-dim prose-strong:text-text-main">
            <ReactMarkdown>{post.content}</ReactMarkdown>
          </Box>

          <Box border="t" paddingTop={12} display="flex" justify="between" align="center">
            <Stack gap={2}>
              <Text variant="mono" size="micro" color="dim">PUBLISHED BY</Text>
              <Text variant="mono" size="xs" weight="font-bold">{post.author || 'Ariel'}</Text>
            </Stack>
            <Box as="button" display="flex" align="center" gap={2} color="dim" className="hover:text-accent-brand transition-colors">
              <Share2 className="w-4 h-4" />
              <Text variant="mono" size="xs">Share Study</Text>
            </Box>
          </Box>
        </Stack>
      </Stack>
    </Box>
  );
}
