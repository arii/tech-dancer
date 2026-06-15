import { Box } from '@/layouts/Primitives';
import { EditorialLayout } from '@/components/editorial/EditorialLayout';
import { EditorialHeader } from '@/components/editorial/EditorialHeader';
import { MarkdownRenderer } from '@/components/ui/MarkdownRenderer';
import { Post, readingTime } from '@/lib/content';

interface FullPreviewProps {
  post: Post;
  onBack: () => void;
}

export function FullPreview({ post, onBack }: FullPreviewProps) {
  const rt = `${readingTime(post.content)} min read`;

  return (
    <EditorialLayout
      onBack={onBack}
      backLabel="Exit Preview"
      header={
        <EditorialHeader
          category={post.category}
          date={post.date}
          readTime={rt}
          title={post.title}
          dek={post.excerpt}
          author={post.author}
          tags={post.tags}
        />
      }
    >
      <Box className="prose-editorial">
        <MarkdownRenderer content={post.content} />
      </Box>
    </EditorialLayout>
  );
}
