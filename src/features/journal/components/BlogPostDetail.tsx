
import { Share2 } from 'lucide-react';
import { Stack, Text } from '@/layouts/Primitives';

import { ArticleLayout } from '@/components/article/ArticleLayout';
import { ArticleHero } from '@/components/article/ArticleHero';
import { ArticleMeta } from '@/components/article/ArticleMeta';
import { ArticleFeatureCard } from '@/components/article/ArticleFeatureCard';
import { ArticleSidebar } from '@/components/article/ArticleSidebar';
import { ArticleFooter } from '@/components/article/ArticleFooter';
import { MarkdownRenderer } from '@/components/ui/MarkdownRenderer';
import { AffiliateDisclosure } from '@/components/ui/AffiliateDisclosure';
import { Post, readingTime } from '@/lib/content';

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
              <Stack as="button" direction="row" onClick={share} align="center" gap={2} paddingX={3} paddingY={1.5} radius="sm" className="text-cyan-400 hover:text-cyan-300 hover:bg-cyan-400/8 transition-all duration-150 ease-in-out active:scale-95 cursor-pointer group/share">
                <Share2 className="w-4 h-4 transition-colors duration-150 group-hover/share:text-cyan-300" />
                <Text variant="mono" size="xs" weight="font-bold" className="transition-colors duration-150 group-hover/share:text-cyan-300">SHARE</Text>
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
  );
}
