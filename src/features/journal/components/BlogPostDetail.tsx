import { ShareButton } from "@/components/ui/ShareButton";


import { Stack } from '@/layouts/Primitives';

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
        <PostHeader
          category={post.category}
          date={post.date}
          readTime={rt}
          title={post.title}
          dek={post.dek || post.excerpt}
          tags={post.tags}
          author={post.author}
          authorAvatar={post.authorAvatar}
          shareAction={<ShareButton title={post.title} text={post.excerpt} />}
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
