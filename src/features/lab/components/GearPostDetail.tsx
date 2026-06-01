import { Resource, readingTime } from '@/lib/content';
import { VerdictCallout } from '@/components/layout/DetailElements';
import { ResourceSidebar } from './sidebar/ResourceSidebar';
import { ArticleLayout } from '@/components/article/ArticleLayout';
import { ArticleHero } from '@/components/article/ArticleHero';
import { ArticleMeta } from '@/components/article/ArticleMeta';
import { ArticleFeatureCard } from '@/components/article/ArticleFeatureCard';
import { ArticleFooter } from '@/components/article/ArticleFooter';
import { MarkdownRenderer } from '@/components/ui/MarkdownRenderer';

interface GearPostDetailProps {
  post: Resource;
  onBack: () => void;
  backLabel: string;
}

export function GearPostDetail({ post, onBack, backLabel }: GearPostDetailProps) {
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
            <ArticleMeta
              author={post.author}
              authorAvatar={post.authorAvatar}
              status={post.status}
            />
          }
          visual={heroVisual}
        />
      }
      sidebar={
        <ResourceSidebar affiliateIds={post.affiliateIds} specs={post.specs} />
      }
      footer={
        <ArticleFooter related={post.related} />
      }
    >
      {post.verdict && <VerdictCallout verdict={post.verdict} />}
      <MarkdownRenderer content={post.content} />
    </ArticleLayout>
  );
}
