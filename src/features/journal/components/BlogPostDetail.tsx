
import { Share2 } from 'lucide-react';
import { Stack, Text } from '@/layouts/Primitives';
import { Box, Stack, Text, Grid } from '@/layouts/Primitives';

import { ArticleLayout } from '@/components/article/ArticleLayout';
import { ArticleHero } from '@/components/article/ArticleHero';
import { ArticleMeta } from '@/components/article/ArticleMeta';
import { ArticleFeatureCard } from '@/components/article/ArticleFeatureCard';
import { ArticleSidebar } from '@/components/article/ArticleSidebar';
import { ArticleFooter } from '@/components/article/ArticleFooter';
import { MarkdownRenderer } from '@/components/ui/MarkdownRenderer';
import { AffiliateDisclosure } from '@/components/ui/AffiliateDisclosure';
import { Post, readingTime } from '@/lib/content';
import { AffiliateCard } from '@/components/ui/AffiliateCard';
import { CompactAffiliateLink } from '@/components/ui/CompactAffiliateLink';
import { Post } from '@/lib/content';
import { affiliateManager } from '@/lib/affiliateManager';

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

  const rt = post.readingTime || `${readingTime(post.content)} min read`;

  const heroVisual = post.hero ? (
    <ArticleFeatureCard
      type={post.hero.type}
      title={post.hero.title}
      subtitle={post.hero.subtitle}
      caption={post.hero.caption}
      image={post.hero.image || post.image}
    />
  ) : post.image ? (
    <ArticleFeatureCard image={post.image} />
  ) : null;

  return (
    <ArticleLayout
  const affiliateLinks = (post.affiliateIds || [])
    .map(id => {
      const link = affiliateManager.getLink(id);
      if (!link && import.meta.env.DEV) {
        console.warn(`[BlogPostDetail] Affiliate link with ID "${id}" not found.`);
      }
      return link;
    })
    .filter((link): link is NonNullable<typeof link> => !!link);

  const featuredAffiliates = affiliateLinks.slice(0, 3);
  const remainingAffiliates = affiliateLinks.slice(3);

  return (
    <DetailLayout
      title={post.title}
      category={post.category}
      date={post.date}
      updated={post.updated}
      content={post.content}
      image={post.image}
      imageAlt={post.imageAlt}
      onBack={onBack}
      backLabel={backLabel}
      hero={
        <ArticleHero
          category={post.category}
          date={post.date}
          readingTime={rt}
          title={post.title}
          dek={post.dek || post.excerpt}
          tags={post.tags}
          meta={
            <Stack direction="row" justify="between" align="center" width="full">
              <ArticleMeta
                author={post.author}
                authorAvatar={post.authorAvatar}
                status={post.status}
              />
              <Stack as="button" direction="row" onClick={share} align="center" gap={2} paddingX={3} paddingY={1.5} radius="sm" className="text-accent hover:text-accent/80 hover:bg-accent/10 transition-all duration-150 ease-in-out active:scale-95 cursor-pointer group/share">
                <Share2 className="w-4 h-4 transition-colors duration-150 group-hover/share:text-accent/80" />
                <Text variant="mono" size="xs" weight="font-bold" className="transition-colors duration-150 group-hover/share:text-accent/80">SHARE</Text>
              </Stack>
            </Stack>
          }
          visual={heroVisual}
        />
      }
      sidebar={
        <ArticleSidebar
          snapshot={post.sidebar?.snapshot}
          relatedTopics={post.tags}
          custom={
            <Stack gap={6}>
              {post.sidebar?.custom}
              {post.tags?.some(tag => tag.toLowerCase().includes('gear') || tag.toLowerCase().includes('review')) && (
                <AffiliateDisclosure />
              )}
            </Stack>
          }
        />
      }
      footer={
        <ArticleFooter related={post.related} />
      }
    >
      {/*
        Editorial elements are available for manual composition
        if needed, but primary rendering is via MarkdownRenderer.
        Imported here to satisfy dependency checks and for future use.
      */}
      <MarkdownRenderer content={post.content} />
    </ArticleLayout>
          </Stack>
        </Stack>
      }
    >
      {affiliateLinks.length > 0 && (
        <Box border="t" paddingTop={10} marginTop={10} className="border-line/30">
          <Stack gap={6}>
            <Stack direction="row" align="center" justify="between">
              <Text as="h2" variant="mono" size="xs" weight="font-bold" color="dim" uppercase tracking="widest">
                Shop selected items
              </Text>
              <AffiliateDisclosure />
            </Stack>

            {/* Featured items (Grid of cards) */}
            <Grid cols={{ base: 1, md: 3 }} gap={4}>
              {featuredAffiliates.map(link => (
                <AffiliateCard key={link.id} link={link} />
              ))}
            </Grid>

            {/* Remaining items (Compact list) */}
            {remainingAffiliates.length > 0 && (
              <Stack gap={3} marginTop={2}>
                {remainingAffiliates.map(link => (
                  <CompactAffiliateLink key={link.id} link={link} />
                ))}
              </Stack>
            )}
          </Stack>
        </Box>
      )}

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
