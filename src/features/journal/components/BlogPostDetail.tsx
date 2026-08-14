// impeccable-ignore-file
import { useState } from 'react';
import { Box, Stack, Text, Grid } from '@/layouts/Primitives';
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
        <Grid cols={{ base: 1, md: 2 }} gap={4}>
          <Stack gap={2}>
            <Text variant="mono" size="xs" weight="font-bold" tracking="widest" uppercase color="dim">Front</Text>
            <EditorialHero src={post.image} alt={post.imageAlt || `${post.title} - front`} aspectRatio="square" objectFit={post.imageFit} />
          </Stack>
          <Stack gap={2}>
            <Text variant="mono" size="xs" weight="font-bold" tracking="widest" uppercase color="dim">Back</Text>
            <EditorialHero src={post.imageBack} alt={`${post.title} - back`} aspectRatio="square" objectFit={post.imageFit} />
          </Stack>
        </Grid>
      ) : (
        <EditorialHero src={post.image} alt={post.imageAlt || post.title} aspectRatio={{ base: "video", lg: "auto" }} objectFit={post.imageFit} />
      )}
      {post.image?.includes('/sketches/') && (
        <Text variant="mono" size="xs" color="dim" className="italic">
          Illustration
        </Text>
      )}
    </Stack>
  ) : undefined;

  const sidebar = affiliateLinks.length > 0 ? (
    <Stack gap={8}>
      <AffiliateDisclosure compact={true} />
      <Text as="h2" variant="mono" size="xs" weight="font-bold" color="dim" uppercase tracking="widest">
        Shop selected items
      </Text>
      <Stack gap={6}>
        {affiliateLinks.map(link => (
          <AffiliateCard key={link.id} link={link} />
        ))}
      </Stack>
    </Stack>
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
    >
      {post.tags && post.tags.length > 0 && (
        <Box border="t" paddingTop={12} marginTop={12} className="border-line/30">
          <Stack gap={4}>
            <Text variant="mono" size="tiny" color="dim" uppercase tracking="widest">Tags</Text>
            <Stack direction="row" wrap gap={3}>
              {post.tags.map(tag => (
                <Box
                  key={tag}
                  paddingX={{ base: 5, sm: 5 }}
                  paddingY={{ base: 3, sm: 2 }}
                  minWidth={{ base: 11, sm: "auto" }}
                  minHeight={{ base: 11, sm: "auto" }}
                  display="flex"
                  align="center"
                  justify="center"
                  surface="muted"
                  border
                  className="hover:border-accent transition-colors"
                >
                  <Text variant="mono" size="micro">{tag.toUpperCase()}</Text>
                </Box>
              ))}
            </Stack>
          </Stack>
        </Box>
      )}
    </EditorialPostView>
  );
}
