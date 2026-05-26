import { Resource } from '@/lib/content';
import { Box, Stack, Text } from '@/layouts/Primitives';
import { DetailLayout } from '@/components/layout/DetailLayout';
import { VerdictCallout } from '@/components/layout/DetailElements';
import { ArtisticIllustrationDisclaimer } from '@/components/ui/ArtisticIllustrationDisclaimer';
import { ResourceSidebar } from './sidebar/ResourceSidebar';
import { ResourceGrid } from './ResourceGrid';
import { ExternalLink } from 'lucide-react';

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
  
  // Shop link for Printful merch
  const shopLink = post.shopUrl ? (
    <Box marginTop={6} padding={4} radius="lg" className="border-line bg-surface-alt">
      <Stack gap={3}>
        <Text as="h3" size="sm" weight="font-semibold" color="white">
          Where to Buy
        </Text>
        <Stack align="center" gap={2}>
          <a 
            href={post.shopUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-sm text-accent hover:opacity-80 transition-opacity"
          >
            Shop Printful Store
          </a>
          <ExternalLink className="w-4 h-4 text-accent" />
        </Stack>
        <Text size="xs" color="dim">
          This item is BoomTick merch from Printful. Use the{' '}
          <a 
            href="https://www.printful.com/give-5-get-5/GZB6C4"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent hover:opacity-80 transition-opacity underline"
          >
            Printful referral link
          </a>
          {' '}for $5 off your order.
        </Text>
      </Stack>
    </Box>
  ) : null;

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
      {shopLink}
    </DetailLayout>
  );
}
