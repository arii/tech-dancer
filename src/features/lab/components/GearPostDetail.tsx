import { Star } from 'lucide-react';
import { Box } from '@/layouts/Primitives';
import { Resource } from '@/lib/content';
import { DetailLayout } from '@/components/layout/DetailLayout';
import { ScoreGrid, ScoreItem, VerdictCallout } from '@/components/layout/DetailElements';
import { ResourceSidebar } from './sidebar/ResourceSidebar';

interface GearPostDetailProps {
  post: Resource;
  onBack: () => void;
  backLabel: string;
}

export function GearPostDetail({ post, onBack, backLabel }: GearPostDetailProps) {
  const headerExtras = (
    <ScoreGrid>
      <ScoreItem label="Overall" value={post.rating ?? 'N/A'} icon={Star} intent="warning" />
      {post.durability !== undefined && post.durability > 0 && <ScoreItem label="Durability" value={`${post.durability}/5`} />}
      {post.value !== undefined && post.value > 0 && <ScoreItem label="Value" value={`${post.value}/5`} />}
      <ScoreItem label="Price" value={post.priceCategory || '$$'} intent="warning" />
      <ScoreItem label="Updated" value={post.updatedDate || post.date} />
    </ScoreGrid>
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
