
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
import { useShare } from '@/hooks/useShare';

interface GearPostDetailProps {
  post: Post;
  onBack: () => void;
  backLabel: string;
}

export function GearPostDetail({ post, onBack, backLabel }: GearPostDetailProps) {
  const { share } = useShare();

  const handleShare = () => {
    share({
      title: post.title,
      text: post.excerpt,
    });
  };

  const shareAction = (
    <Stack as="button" direction="row" onClick={handleShare} align="center" gap={1.5} className="text-text-dim/60 hover:text-accent transition-colors">
      <Share2 className="w-3.5 h-3.5" />
      <Text variant="mono" size="micro" weight="font-bold" uppercase tracking="utility">SHARE</Text>
    </Stack>
  );

  const rt = post.readingTime || `${readingTime(post.content)} min read`;

  return (
    <ArticleLayout
      onBack={onBack}
      backLabel={backLabel}
      hero={
        <PostHeader
          category={post.category || "Gear Review"}
          date={post.date}
          readTime={rt}
          title={post.title}
          dek={post.dek || post.excerpt}
          author={post.author}
          authorAvatar={post.authorAvatar}
          shareAction={shareAction}
          visual={post.image ? <ArticleFeatureCard image={post.image} /> : null}
          tags={post.tags}
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
              <AffiliateDisclosure />
            </Stack>
          }
        />
      }
      footer={<ArticleFooter related={post.related} />}
    >
      <MarkdownRenderer content={post.content} />
    </ArticleLayout>
  );
}
