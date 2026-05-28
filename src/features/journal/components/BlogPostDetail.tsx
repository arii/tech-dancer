import { Share2 } from 'lucide-react';
import { Box, Stack, Text } from '@/layouts/Primitives';

import { DetailLayout } from '@/components/layout/DetailLayout';
import { AffiliateDisclosure } from '@/components/ui/AffiliateDisclosure';
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
        <Stack gap={6}>
          <Stack direction="row" gap={4} marginTop={6}>
            <Stack direction="row" align="center" gap={2} color="dim">
               <Box width={8} height={8} radius="full" surface="muted" />
               <Text variant="mono" size="xs">{post.author}</Text>
            </Stack>
            <Box flex />
            <Stack as="button" direction="row" onClick={share} align="center" gap={2} paddingX={3} paddingY={1.5} radius="sm" className="text-accent hover:text-accent-sky hover:bg-accent-sky/8 transition-all duration-150 ease-in-out active:scale-95 cursor-pointer group/share">
              <Share2 className="w-4 h-4 transition-colors duration-150 group-hover/share:text-accent-sky" />
              <Text variant="mono" size="xs" weight="font-bold" className="transition-colors duration-150 group-hover/share:text-accent-sky">SHARE</Text>
            </Stack>
          </Stack>
          <AffiliateDisclosure />
        </Stack>
      }
    >
      {post.tags && post.tags.length > 0 && (
        <Box border="t" paddingTop={12} marginTop={12} className="border-line/30">
          <Stack gap={4}>
            <Text variant="mono" size="tiny" color="dim" uppercase tracking="widest">Tags</Text>
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
