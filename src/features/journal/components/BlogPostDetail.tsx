// impeccable-ignore-file
import { useState } from 'react';
import { Box, Stack, Text } from '@/layouts/Primitives';
import { AffiliateDisclosure } from '@/components/ui/AffiliateDisclosure';
import { AffiliateCard } from '@/components/ui/AffiliateCard';
import { affiliateManager } from '@/lib/affiliateManager';
import { Post, getPosts } from '@/lib/content';
import { EditorialHero } from '@/components/editorial/EditorialHero';
import { EditorialRelated } from '@/components/editorial/EditorialRelated';
import { ArticleNavigation } from '@/components/editorial/ArticleNavigation';
import { useArticleNavigation } from '@/lib/hooks/useArticleNavigation';
import { EditorialPostView } from '@/components/editorial/EditorialPostView';

interface BlogPostDetailProps {
  post: Post;
  onBack: () => void;
  backLabel: string;
}

export function BlogPostDetail({ post, onBack, backLabel }: BlogPostDetailProps) {
  const [isCopied, setIsCopied] = useState(false);

  const share = async () => {
    const shareData = {
      title: post.title,
      text: post.excerpt,
      url: window.location.href,
    };

    if (navigator.share && navigator.canShare?.(shareData)) {
      try {
        await navigator.share(shareData);
        return;
      } catch (err) {
        if ((err as Error).name !== 'AbortError') console.error('Share failed:', err);
        return;
      }
    }

    try {
      await navigator.clipboard.writeText(window.location.href);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error('Clipboard fallback failed:', err);
    }
  };

  const relatedItems = getPosts()
    .filter(p => p.slug !== post.slug && (p.category === post.category || p.tags.some(t => post.tags.includes(t))))
    .slice(0, 3)
    .map(p => ({
      title: p.title,
      href: `/blog/${p.slug}`,
      category: p.category
    }));

  const affiliateLinks = (post.affiliateIds || [])
    .map(id => affiliateManager.getLink(id))
    .filter((link): link is NonNullable<typeof link> => !!link);

  const allPosts = getPosts();
  const { previous, next } = useArticleNavigation(allPosts, post.slug, '/blog');

  const hero = post.image ? (
    <Stack gap={4}>
      {post.imageBack ? (
        <Stack direction="row" gap={2} paddingBottom={2} className="overflow-x-auto snap-x snap-mandatory">
          <Stack gap={2} minWidth="85%" flex={1} className="snap-center md:min-w-0">
            <Text variant="mono" size="xs" weight="font-bold" tracking="widest" uppercase color="dim">Front</Text>
            <EditorialHero src={post.image} alt={post.imageAlt || `${post.title} - front`} aspectRatio="square" objectFit={post.imageFit} />
          </Stack>
          <Stack gap={2} minWidth="85%" flex={1} className="snap-center md:min-w-0">
            <Text variant="mono" size="xs" weight="font-bold" tracking="widest" uppercase color="dim">Back</Text>
            <EditorialHero src={post.imageBack} alt={`${post.title} - back`} aspectRatio="square" objectFit={post.imageFit} />
          </Stack>
        </Stack>
      ) : (
        <EditorialHero src={post.image} alt={post.imageAlt || post.title} aspectRatio={{ base: "square", md: "video" }} objectFit={post.imageFit} />
      )}
      {post.image?.includes('/sketches/') && (
        <Text variant="mono" size="xs" color="dim" className="italic">
          Illustration
        </Text>
      )}
    </Stack>
  ) : undefined;

  const sidebar = affiliateLinks.length > 0 ? (
    <Box width="full">
      <Stack gap={6} width="full">
        <AffiliateDisclosure compact={true} />
        <Text as="h2" variant="mono" size="xs" weight="font-bold" color="dim" uppercase tracking="widest">
          Shop selected items
        </Text>
        <Stack gap={3} width="full">
          {affiliateLinks.map(link => (
            <Box key={link.id} width="full">
              <AffiliateCard link={link} />
            </Box>
          ))}
        </Stack>
      </Stack>
    </Box>
  ) : undefined;

  const footer = (
    <Stack gap={12}>
      <ArticleNavigation previous={previous} next={next} />
      <EditorialRelated items={relatedItems} />
    </Stack>
  );

  return (
    <EditorialPostView
      post={post}
      onBack={onBack}
      backLabel={backLabel}
      hero={hero}
      sidebar={sidebar}
      footer={footer}
      onShare={share}
      isShared={isCopied}
    />
  );
}
