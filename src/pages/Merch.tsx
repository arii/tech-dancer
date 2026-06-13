import { useState, useMemo } from 'react';
import { Box, Stack, Grid, Text, Button } from '@/layouts/Primitives';
import { SEO } from '@/components/SEO';
import { ReferralBanner } from '@/components/ReferralBanner';
import { PageHeader } from '@/components/ui/PageHeader';
import { COLLECTIONS } from '@/data/merch';
import { ProductCard } from '@/components/products/ProductCard';
import { getAllMerchProducts, getMerchByCollection } from '@/lib/productCatalog';
import { FilterButton } from '@/components/ui/FilterButton';

export default function Merch() {
  const [activeCollection, setActiveCollection] = useState("all");
  const allProducts = getAllMerchProducts();
  const filteredProducts = getMerchByCollection(activeCollection);

  const sections = useMemo(() => {
    if (activeCollection !== 'all') return null;
    return [
      {
        id: 'featured',
        title: 'Featured Picks',
        description: 'Best intro products and our strongest designs for the social floor.',
        products: [
          allProducts.find(p => p.id === 'lead-follow-switch-love-neon'),
          allProducts.find(p => p.id === 'war-eagle-oversized'),
          allProducts.find(p => p.id === 'norcal-bestcal-golden-gate-pride'),
        ].filter((p): p is any => !!p),
      },
      {
        id: 'lead-follow-switch',
        title: 'Roles & Rhythm',
        description: 'Role-specific and gender-neutral designs for Leads, Follows, and Switches.',
        products: allProducts.filter(p => p.collections.includes('lead-follow-switch')),
      },
      {
        id: 'norcal-bestcal',
        title: 'NorCal BestCal',
        description: 'Bay Area, California, Golden Gate, and bear designs representing our Northern California roots.',
        products: allProducts.filter(p => p.collections.includes('norcal-bestcal')),
      }
    ];
  }, [activeCollection, allProducts]);

  return (
    <Box as="section">
      <SEO title="West Coast Swing Merch" description="Shop official BoomTick apparel." />

      <Stack gap={12} width="full" maxWidth="screen-xl" marginX="auto">
        <Box borderBottom paddingBottom={8}>
          <PageHeader
            label="STOREFRONT"
            title="Dance gear that says something."
            description="High-fidelity apparel for the social dance floor. Curated for Leads, Follows, and Northern California locals."
            border="none" paddingBottom={0}
            cta={
              <Stack direction="row" gap={4} marginTop={4}>
                <Button as="a" href="https://boomtick.printful.me/" target="_blank" rel="sponsored noopener" variant="primary" paddingX={8}>
                   Shop Collection
                </Button>
              </Stack>
            }
          />
        </Box>

        <Stack gap={4}>
          <Text variant="mono" size="xs" weight="font-bold" uppercase tracking="widest" color="dim">Collections</Text>
          <Box display="flex" gap={2} wrap>
            {COLLECTIONS.map((c) => (
              <FilterButton key={c.id} label={c.label} isActive={activeCollection === c.id} onClick={() => setActiveCollection(c.id)} />
            ))}
          </Box>
        </Stack>

        {activeCollection === 'all' && sections ? (
          <Stack gap={16}>
            {sections.map((s) => (
              <Stack key={s.id} gap={8}>
                <Stack gap={1}>
                  <Text variant="display" size="3xl" weight="font-black">{s.title}</Text>
                  <Text variant="body" color="dim" className="border-l border-accent/20" paddingLeft={4}>{s.description}</Text>
                </Stack>
                <Grid cols={{ base: 1, sm: 2, lg: 3 }} gap={8}>
                  {s.products.map((p: any) => <ProductCard key={p.id} item={p} />)}
                </Grid>
              </Stack>
            ))}
          </Stack>
        ) : (
          <Grid cols={{ base: 1, sm: 2, md: 3 }} gap={8}>
            {filteredProducts.map((p) => <ProductCard key={p.id} item={p} />)}
          </Grid>
        )}

        <Box padding={12} radius="xl" border surface="alt" className="border-accent/10 relative overflow-hidden">
          <Box position="absolute" top={0} left={0} width="full" height={1} className="bg-gradient-to-r from-transparent via-accent/50 to-transparent" />
          <Grid cols={{ base: 1, lg: 2 }} gap={12} align="center">
            <Stack gap={4}>
              <Text variant="display" size="2xl" weight="font-black">Referral Program</Text>
              <Text variant="body" color="dim">Love the gear? Invite your friends and get  off your next order.</Text>
            </Stack>
            <ReferralBanner layout="expanded" />
          </Grid>
        </Box>
      </Stack>
    </Box>
  );
}
