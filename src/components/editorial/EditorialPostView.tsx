import { ReactNode } from 'react';
import { Post, readingTime } from '@/lib/content';
import { EditorialLayout } from './EditorialLayout';
import { EditorialHeader } from './EditorialHeader';
import { Box } from '@/layouts/Primitives';
import { MarkdownRenderer } from '@/components/ui/MarkdownRenderer';

interface EditorialPostViewProps {
  post: Post;
  onBack: () => void;
  backLabel: string;
  hero?: ReactNode;
  sidebar?: ReactNode;
  footer?: ReactNode;
  children?: ReactNode;
  onShare?: () => void;
  isShared?: boolean;
}

export function EditorialPostView({
  post,
  onBack,
  backLabel,
  hero,
  sidebar,
  footer,
  children,
  onShare,
  isShared
}: EditorialPostViewProps) {
  const rt = `${readingTime(post.content)} min read`;

  return (
    <EditorialLayout
      onBack={onBack}
      backLabel={backLabel}
      header={
        <EditorialHeader
          category={post.category}
          date={post.date}
          readTime={rt}
          title={post.title}
          dek={post.excerpt}
          author={post.author}
          authorAvatarSrc={post.authorImage}
          tags={post.tags}
          onShare={onShare}
          isShared={isShared}
          hero={hero}
        />
      }
      sidebar={sidebar}
      footer={footer}
    >
      <Box className="prose-editorial">
        <MarkdownRenderer content={post.content} />
      </Box>
      {children}
    </EditorialLayout>
  );
}
