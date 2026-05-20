import { Resource } from '@/lib/content';
import { DetailLayout } from '@/components/layout/DetailLayout';
import { VerdictCallout } from '@/components/layout/DetailElements';
import { ArticleActions } from '@/components/layout/ArticleActions';
import { Stack } from '@/layouts/Primitives';
import { ResourceSidebar } from './sidebar/ResourceSidebar';
import { ResourceScoreGrid } from './ResourceScoreGrid';

interface GearPostDetailProps {
  post: Resource;
  onBack: () => void;
  backLabel: string;
}

export function GearPostDetail({ post, onBack, backLabel }: GearPostDetailProps) {
  const headerExtras = (
    <Stack gap={6}>
      <ResourceScoreGrid
        rating={post.rating || 0}
        durability={post.durability}
        value={post.value}
        priceCategory={post.priceCategory}
        updatedDate={post.updatedDate}
        date={post.date}
      />
      <ArticleActions title={post.title} description={post.excerpt} />
    </Stack>
  );

  return (
    <DetailLayout
      title={post.title}
      category={post.category}
      date={post.date}
      content={post.content}
      image={post.image}
      onBack={onBack}
      backLabel={backLabel}
      sidebar={<ResourceSidebar affiliateIds={post.affiliateIds} specs={post.specs} />}
      headerExtras={headerExtras}
    >
      {post.verdict && <VerdictCallout verdict={post.verdict} />}
    </DetailLayout>
  );
}
