import { SEO } from '@/components/SEO';
import FolioGrid from '@/components/ui/FolioGrid';
import { getPosts } from '@/lib/content';
import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';

export default function BlogFeed() {
  const { data: posts = [] } = useQuery({
    queryKey: ['posts'],
    queryFn: getPosts,
    initialData: getPosts,
  });

  const categories = useMemo(() => {
    const cats = Array.from(new Set(posts.map(p => p.category)));
    return ['All', ...cats];
  }, [posts]);

  return (
    <>
      <SEO
        title="Blog"
        description="A searchable, categorized folio of posts covering travel, lifestyle, gear reviews, technical portfolio pieces, and everything about West Coast Swing."
      />
      <FolioGrid
        items={posts}
        categoryTitle="Blog Posts"
        as="h1"
        label="INSIGHTS"
        description="A searchable, categorized folio of posts covering travel, lifestyle, gear reviews, technical portfolio pieces, and everything about West Coast Swing."
        basePath="/blog"
        searchPlaceholder="Search posts..."
        categories={categories}
      />
    </>
  );
}
