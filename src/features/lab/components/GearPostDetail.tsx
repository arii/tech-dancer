import { Resource } from '@/lib/content';
import { Box } from '@/layouts/Primitives';
import { DetailLayout } from '@/components/layout/DetailLayout';
import { VerdictCallout } from '@/components/layout/DetailElements';
import { ArtisticIllustrationDisclaimer } from '@/components/ui/ArtisticIllustrationDisclaimer';
import { ResourceSidebar } from './sidebar/ResourceSidebar';
import { ResourceGrid } from './ResourceGrid';

interface GearPostDetailProps {
  post: Resource;
  onBack: () => void;
  backLabel: string;
}

/**
 * Individual gear post detail page.
 * 
 * NOTE: Rating display in headerExtras is currently hidden pending Amazon
 * affiliate approval for dynamic content updates. This preserves data structure
 * while disabling the visual display. See ResourceGrid.tsx for details.
 */
export function GearPostDetail({ post, onBack, backLabel }: GearPostDetailProps) {
  // Rating grid is hidden for now - see ResourceGrid.tsx
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

  // Check if image is an artistic sketch illustration
  const isArtisticSketch = post.image?.includes('/sketches/');

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
      {isArtisticSketch && <ArtisticIllustrationDisclaimer />}
      {post.verdict && <VerdictCallout verdict={post.verdict} />}
    </DetailLayout>
  );
}
