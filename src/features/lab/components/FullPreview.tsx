import { EditorialLayout } from '@/components/editorial/EditorialLayout';
import { EditorialHeader } from '@/components/editorial/EditorialHeader';
import { EditorialContentRenderer } from '@/components/editorial/EditorialContentRenderer';
import { Resource, readingTime } from '@/lib/content';

interface FullPreviewProps {
  post: Resource;
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
      <EditorialContentRenderer content={post.content} />
    </EditorialLayout>
  );
}
