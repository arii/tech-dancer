import { motion } from 'motion/react';
import { ArrowLeft, Clock, Tag, Share2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { Box, Stack, Text } from '@/layouts/Primitives';
import { ContentItem } from '@/lib/content';

interface ContentDetailProps {
  post: ContentItem;
  onBack: () => void;
  backLabel: string;
  children?: React.ReactNode;
}

export function ContentDetail({ post, onBack, backLabel, children }: ContentDetailProps) {
  const title = post.title;
  const content = post.content;

  const date = 'date' in post ? post.date : '';
  const category = 'category' in post ? post.category : '';
  const image = 'image' in post ? post.image : undefined;
  const author = 'author' in post ? post.author : 'Ariel';

  return (
    <Box as="article" padding="panel">
      <Stack gap={12} maxWidth="5xl" marginX="auto" className="w-full">
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

        <Stack gap={8}>
          <Box display="flex" align="center" gap={4}>
            {category && (
              <Box display="flex" align="center" gap={2} color="brand">
                <Tag className="w-3 h-3" />
                <Text variant="mono" size="micro" weight="font-bold" className="uppercase">{category}</Text>
              </Box>
            )}
            {date && (
              <Box display="flex" align="center" gap={2} color="dim">
                <Clock className="w-3 h-3" />
                <Text variant="mono" size="micro">{date}</Text>
              </Box>
            )}
          </Box>

          <Text as="h1" variant="headline" size="fluid-8" tracking="tighter" className="leading-none">
            {title}
          </Text>

          {image && (
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
                src={image}
                alt={title}
                className="w-full h-full object-cover"
              />
            </Box>
          )}

          {children}

          <Box className="prose prose-sm md:prose-base prose-slate max-w-none w-full overflow-hidden break-words prose-headings:font-display prose-p:font-sans prose-p:text-text-dim prose-strong:text-text-main">
            <ReactMarkdown
              components={{
                a: ({node, ...props}) => <a {...props} rel="noopener noreferrer" target="_blank" />
              }}
            >
              {content}
            </ReactMarkdown>
          </Box>

          <Box border="t" paddingTop={12} display="flex" justify="between" align="center">
            <Stack gap={2}>
              <Text variant="mono" size="micro" color="dim">PUBLISHED BY</Text>
              <Text variant="mono" size="xs" weight="font-bold">{author}</Text>
            </Stack>
            <Box as="button" display="flex" align="center" gap={2} color="dim" className="hover:text-accent-brand transition-colors">
              <Share2 className="w-4 h-4" />
              <Text variant="mono" size="xs">Share Content</Text>
            </Box>
          </Box>
        </Stack>
      </Stack>
    </Box>
  );
}
