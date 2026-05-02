import { Share2 } from 'lucide-react';
import { Box, Stack, Text, Button } from '@/layouts/Primitives';
import { NavLink } from 'react-router-dom';

import { DetailLayout } from '@/components/layout/DetailLayout';
import { Post } from '@/lib/content';

interface BlogPostDetailProps {
  post: Post;
  onBack: () => void;
  backLabel: string;
}

export function BlogPostDetail({ post, onBack, backLabel }: BlogPostDetailProps) {
  const share = () => {
    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: post.excerpt,
        url: window.location.href,
      }).catch(console.error);
    }
  };

  const shareTwitter = () => {
      window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(window.location.href)}`);
  };

  const shareLinkedIn = () => {
      window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`);
  };

  return (
    <DetailLayout
      title={post.title}
      category={post.category}
      date={post.date}
      content={post.content}
      image={post.image}
      onBack={onBack}
      backLabel={backLabel}
      headerExtras={
        <Stack direction="row" gap={4} marginTop={6} justify="between" align="center" wrap>
          <Stack direction="row" align="center" gap={2} color="dim">
             <Box width={8} height={8} radius="full" surface="muted" />
             <Text variant="mono" size="xs">{post.author}</Text>
          </Stack>
          <Stack direction="row" align="center" gap={4}>
              <Stack as="button" direction="row" onClick={shareTwitter} align="center" gap={2} className="text-text-dim hover:text-accent transition-colors">
                <Text variant="mono" size="xs" weight="font-bold">Twitter</Text>
              </Stack>
              <Stack as="button" direction="row" onClick={shareLinkedIn} align="center" gap={2} className="text-text-dim hover:text-accent transition-colors">
                <Text variant="mono" size="xs" weight="font-bold">LinkedIn</Text>
              </Stack>
              <Stack as="button" direction="row" onClick={share} align="center" gap={2} className="text-accent hover:opacity-70 transition-opacity">
                <Share2 className="w-4 h-4" />
                <Text variant="mono" size="xs" weight="font-bold">Share</Text>
              </Stack>
          </Stack>
        </Stack>
      }
      relatedContent={
        <Box border="t" paddingTop={12} marginTop={12} className="border-line/30">
          <Stack gap={12}>
             <Stack gap={6} align="center" textAlign="center" surface="default" padding={8} radius="md" border>
                <Text as="h3" variant="display" size="2xl" className="text-accent-navy">Need an Expert?</Text>
                <Text variant="body" size="base" color="dim" maxWidth="md">
                    Looking for insights on robotics, data analysis, or a fresh perspective on West Coast Swing? Let's work together.
                </Text>
                <Button as={NavLink} to="/contact" variant="professional" className="min-h-12 w-full sm:w-auto mt-2">
                    <Text variant="sans" size="sm" weight="font-semibold">Hire Me</Text>
                </Button>
             </Stack>

             <Stack gap={6}>
                 <Text as="h4" variant="mono" size="xs" color="dim" uppercase tracking="widest">You might also like...</Text>
                 <Stack direction={{ base: 'col', sm: 'row' }} gap={4}>
                    <Box as={NavLink} to="/blog" display="flex" align="center" justify="center" padding={4} border surface="default" radius="md" className="group hover:border-accent hover:shadow-sm transition-all w-full cursor-pointer">
                        <Text variant="sans" size="sm" weight="font-semibold" className="text-text-main group-hover:text-accent transition-colors">More Blog Posts</Text>
                    </Box>
                    <Box as={NavLink} to="/gear" display="flex" align="center" justify="center" padding={4} border surface="default" radius="md" className="group hover:border-accent hover:shadow-sm transition-all w-full cursor-pointer">
                        <Text variant="sans" size="sm" weight="font-semibold" className="text-text-main group-hover:text-accent transition-colors">Gear Reviews</Text>
                    </Box>
                 </Stack>
             </Stack>
          </Stack>
        </Box>
      }
    >
      {post.tags && post.tags.length > 0 && (
        <Box border="t" paddingTop={12} marginTop={12} className="border-line/30">
          <Stack gap={4}>
            <Text variant="mono" size="tiny" color="dim" uppercase tracking="widest">Discovery Tags</Text>
            <Stack direction="row" wrap gap={2}>
              {post.tags.map(tag => (
                <Box key={tag} paddingX={3} paddingY={1} surface="muted" border className="hover:border-accent transition-colors">
                  <Text variant="mono" size="micro">{tag.toUpperCase()}</Text>
                </Box>
              ))}
            </Stack>
          </Stack>
        </Box>
      )}
    </DetailLayout>
  );
}
