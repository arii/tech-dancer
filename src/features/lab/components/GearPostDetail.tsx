import { ExternalLink, Star, Shield } from 'lucide-react';
import { Box, Stack, Text } from '@/layouts/Primitives';
import { Resource } from '@/lib/content';
import { affiliateManager } from '@/lib/affiliateManager';
import { DetailLayout } from '@/components/layout/DetailLayout';
import { ScoreGrid, ScoreItem, SpecsTable, VerdictCallout } from '@/components/layout/DetailElements';

interface GearPostDetailProps {
  post: Resource;
  onBack: () => void;
  backLabel: string;
}

export function GearPostDetail({ post, onBack, backLabel }: GearPostDetailProps) {
  const affiliateLinks = (post.affiliateIds || [])
    .map(id => affiliateManager.getLink(id))
    .filter((link): link is NonNullable<typeof link> => !!link);

  const headerExtras = (
    <ScoreGrid>
      <ScoreItem label="Overall" value={post.rating || 'N/A'} icon={Star} color="text-yellow-500" />
      <ScoreItem label="Durability" value={post.durability ? `${post.durability}/5` : '—'} />
      <ScoreItem label="Value" value={post.value ? `${post.value}/5` : '—'} />
      <ScoreItem label="Price" value={post.priceCategory || '$$'} color="text-amber-600" />
      <Stack gap={1} align="center" display={{ base: "none", md: "flex" }}>
        <Text variant="mono" size="tiny" color="dim" uppercase={true}>Updated</Text>
        <Text variant="mono" size="tiny" weight="font-bold" uppercase={true}>{post.updatedDate || post.date}</Text>
      </Stack>
    </ScoreGrid>
  );

  const sidebar = (
    <>
      {post.specs && Object.keys(post.specs).length > 0 && (
        <SpecsTable specs={post.specs} />
      )}

      {affiliateLinks.length > 0 && (
        <Stack gap={4} marginTop={8}>
          <Text variant="mono" size="tiny" weight="font-bold" color="dim" uppercase={true} paddingBottom={2} border="b" className="tracking-widest border-line">Where to Buy</Text>
          {affiliateLinks.map(link => (
            <Box
              key={link.id}
              as="a"
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              display="flex"
              align="center"
              justify="between"
              padding={4}
              surface="default"
              border
              className="hover:border-accent group transition-all"
            >
              <Text variant="mono" size="xs" weight="font-bold">{link.label}</Text>
              <ExternalLink className="w-4 h-4 text-accent opacity-30 group-hover:opacity-100" />
            </Box>
          ))}
          <Text variant="mono" size="micro" color="dim" emphasis="low" className="leading-tight italic">
            * Affiliate link support helps maintain this repository.
          </Text>
        </Stack>
      )}
    </>
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
      sidebar={sidebar}
      headerExtras={headerExtras}
    >
      {post.verdict && <VerdictCallout verdict={post.verdict} />}
    </DetailLayout>
  );
}
