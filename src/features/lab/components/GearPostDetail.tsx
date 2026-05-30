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

interface GearPostDetailProps {
  post: Post;
  onBack: () => void;
  backLabel: string;
}

export function GearPostDetail({ post, onBack, backLabel }: GearPostDetailProps) {


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
          shareAction=<ShareButton title={post.title} text={post.excerpt} />
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
