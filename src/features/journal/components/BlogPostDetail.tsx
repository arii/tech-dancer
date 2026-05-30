
import { Share2 } from 'lucide-react';
import { Stack, Text } from '@/layouts/Primitives';

import { ArticleLayout } from '@/components/article/ArticleLayout';
import { PostHeader } from '@/components/article/PostHeader';
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

  const shareAction = (
    <Stack
      as="button"
      direction="row"
      onClick={share}
      align="center"
      gap={1.5}
      className="text-text-dim/60 hover:text-accent transition-colors group/share"
    >
      <Share2 className="w-3.5 h-3.5" />
      <Text variant="mono" size="micro" weight="font-bold" className="uppercase tracking-wider">SHARE</Text>
    </Stack>
  );

  return (
    <ArticleLayout
      onBack={onBack}
      backLabel={backLabel}
      hero={
        <PostHeader
          category={post.category}
          date={post.date}
          readTime={rt}
          title={post.title}
          dek={post.dek || post.excerpt}
          tags={post.tags}
          author={post.author}
          authorAvatar={post.authorAvatar}
          shareAction={shareAction}
          visual={heroVisual}
        />
      }
      sidebar={
        <ArticleSidebar
          snapshot={post.sidebar?.snapshot}
          gearMentioned={post.sidebar?.gearMentioned}
          relatedGuides={post.sidebar?.relatedGuides}
          custom={
            <Stack gap={6}>
              {post.sidebar?.custom}
              {(post.tags?.some(tag => tag.toLowerCase().includes('gear') || tag.toLowerCase().includes('review')) || post.affiliateProvider) && (
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
      <MarkdownRenderer content={post.content} />
    </ArticleLayout>
  );
}
