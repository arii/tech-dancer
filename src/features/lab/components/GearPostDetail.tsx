import { ExternalLink, Shield, Star, DollarSign } from 'lucide-react';
import { Box, Stack, Text, Grid } from '@/layouts/Primitives';
import { Resource } from '@/lib/content';
import { affiliateManager } from '@/lib/affiliateManager';
import { DetailLayout } from '@/components/layout/DetailLayout';

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
    <Box border="y" paddingY={8} className="border-line/50 bg-slate-50/30">
      <Grid cols={{ base: 1, sm: 2, md: 5 }} gap={8}>
        <Stack gap={1} align="center" className="sm:border-r border-line/30">
          <Text variant="mono" size="micro" color="dim" uppercase>Overall</Text>
          <Box display="flex" align="center" gap={1}>
            <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
            <Text variant="display" size="xl" weight="font-bold">{post.rating || 'N/A'}</Text>
          </Box>
        </Stack>

        <Stack gap={1} align="center" className="md:border-r border-line/30">
          <Text variant="mono" size="micro" color="dim" uppercase>Durability</Text>
          <Text variant="display" size="xl" weight="font-bold">{post.durability ? `${post.durability}/5` : '—'}</Text>
        </Stack>

        <Stack gap={1} align="center" className="sm:border-r border-line/30">
          <Text variant="mono" size="micro" color="dim" uppercase>Value</Text>
          <Text variant="display" size="xl" weight="font-bold">{post.value ? `${post.value}/5` : '—'}</Text>
        </Stack>

        <Stack gap={1} align="center" className="md:border-r border-line/30">
          <Text variant="mono" size="micro" color="dim" uppercase>Price</Text>
          <Box display="flex" align="center" gap={0} className="text-amber-600">
            <Text variant="display" size="xl" weight="font-bold">{post.priceCategory || '$$'}</Text>
          </Box>
        </Stack>

        <Stack gap={1} align="center" className="hidden md:flex">
          <Text variant="mono" size="micro" color="dim" uppercase>Updated</Text>
          <Text variant="mono" size="micro" weight="font-bold" className="uppercase">{post.updatedDate || post.date}</Text>
        </Stack>
      </Grid>
    </Box>
  );

  const sidebar = (
    <>
      <Text variant="mono" size="micro" weight="font-bold" color="dim" uppercase className="tracking-widest border-b border-line pb-2">Technical Specs</Text>
      <Stack gap={3}>
        {post.specs ? Object.entries(post.specs).map(([key, value]) => (
          <Stack key={key} gap={1}>
            <Text variant="mono" size="micro" color="dim" className="uppercase opacity-50">{key}</Text>
            <Text variant="mono" size="xs" weight="font-bold">{value}</Text>
          </Stack>
        )) : (
          <Text variant="mono" size="xs" color="dim">No specs provided.</Text>
        )}
      </Stack>

      {affiliateLinks.length > 0 && (
        <Stack gap={4} marginTop={8}>
          <Text variant="mono" size="micro" weight="font-bold" color="dim" uppercase className="tracking-widest border-b border-line pb-2">Where to Buy</Text>
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
          <Text variant="mono" size="micro" color="dim" className="leading-tight opacity-50 italic">
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
      {post.verdict && (
        <Box border padding={8} surface="muted" marginBottom={12} className="bg-emerald-50/50 border-emerald-100">
           <Stack gap={3}>
              <Box display="flex" align="center" gap={3}>
                 <Shield className="w-6 h-6 text-emerald-600" />
                 <Text variant="display" size="2xl" weight="font-black" className="text-emerald-900">THE VERDICT</Text>
              </Box>
              <Text variant="body" size="lg" className="text-emerald-800 italic leading-relaxed font-medium">
                "{post.verdict}"
              </Text>
           </Stack>
        </Box>
      )}
    </DetailLayout>
  );
}
