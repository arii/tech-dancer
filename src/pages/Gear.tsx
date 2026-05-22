import { Box, Stack, Grid } from '@/layouts/Primitives';
import { SEO } from '@/components/SEO';
import { PageHeader } from '@/components/ui/PageHeader';
import { ResourceCard } from '@/components/resources/ResourceCard';
import { ResourceCardItem } from '@/lib/types/resources';
import { AFFILIATE_GEAR } from '@/data/affiliateGear';
import { AffiliateDisclosure } from '@/components/resources/AffiliateDisclosure';

export default function Gear() {
  const formatGearItem = (item: any): ResourceCardItem => ({
    id: item.id,
    title: item.name,
    description: item.description,
    href: item.url,
    kind: 'affiliate-product',
    source: 'affiliate',
    category: 'gear',
    image: item.image,
  });

  return (
    <Box>
      <SEO
        title="Recommended Dance Gear"
        description="Useful gear for dance weekends, practice sessions, travel days, and long nights on the social floor."
      />
      <Stack gap={8} width="full">
        <PageHeader
          label="RECOMMENDED"
          title="Gear Recommendations"
          description="Useful gear for dance weekends, practice sessions, travel days, and long nights on the social floor."
        />

        <AffiliateDisclosure />

        <Grid cols={{ base: 1, md: 2, lg: 3 }} gap={6}>
          {AFFILIATE_GEAR.map(item => (
            <ResourceCard key={item.id} item={formatGearItem(item)} />
          ))}
        </Grid>
      </Stack>
    </Box>
  );
}
