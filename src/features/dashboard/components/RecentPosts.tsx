import { ContentCard } from '@/components/ui/ContentCard';
import { useHome } from '../useHome';

export default function RecentPosts() {
  const { recentPosts } = useHome();

  return (
    <>
      {recentPosts.map((post) => (
        <ContentCard
          key={post.slug}
          {...post}
          basePath="/blog"
          aspect="video"
        />
      ))}
    </>
  );
}
