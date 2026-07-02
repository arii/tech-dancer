import { Post } from '@/lib/content';
import { EditorialPostView } from '@/components/editorial/EditorialPostView';

interface FullPreviewProps {
  post: Post;
  onBack: () => void;
}

export function FullPreview({ post, onBack }: FullPreviewProps) {
  return (
    <EditorialPostView
      post={post}
      onBack={onBack}
      backLabel="Exit Preview"
    />
  );
}
