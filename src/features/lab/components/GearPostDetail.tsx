import { Resource } from '@/lib/content';
import { DetailLayout } from '@/components/layout/DetailLayout';
import { VerdictCallout } from '@/components/layout/DetailElements';
import { ResourceSidebar } from './sidebar/ResourceSidebar';
import { ResourceGrid } from './ResourceGrid';

interface GearPostDetailProps {
  post: Resource;
  onBack: () => void;
  backLabel: string;
}

export function GearPostDetail({ post, onBack, backLabel }: GearPostDetailProps) {
  const headerExtras = (
    <ResourceGrid
      rating={post.rating || 0}
      durability={post.durability}
      value={post.value}
      priceCategory={post.priceCategory}
      updatedDate={post.updatedDate}
      date={post.date}
    />
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
      imageBack={post.imageBack}
      showImagePair
      imageFit="contain"
    >
      {post.verdict && <VerdictCallout verdict={post.verdict} />}
    </DetailLayout>
  );
}
