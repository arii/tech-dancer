import { Resource, readingTime } from '@/lib/content';
import { EditorialContentRenderer } from '@/components/editorial/EditorialContentRenderer';

interface FullPreviewProps {
  post: Resource;
  onBack: () => void;
}

export function FullPreview({ post, onBack }: FullPreviewProps) {
  const rt = `${readingTime(post.content)} min read`;

  return (
    <EditorialContentRenderer
      onBack={onBack}
      backLabel="Exit Preview"
      category={post.category}
      date={post.date}
      readTime={rt}
      title={post.title}
      dek={post.excerpt}
      author={post.author}
      authorAvatarSrc={post.authorImage}
      tags={post.tags}
      content={post.content}
    />
  );
}
