import { ContentCard } from '@/components/ui/ContentCard';
import { Post } from '@/lib/content';

export default function RecentPosts({ posts }: { posts: Post[] }) {
  return (
    <>
      {posts.map((post) => (
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
