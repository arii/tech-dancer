import { useState, useMemo } from 'react';
import { Box, Stack, Grid, Text, Button } from '@/layouts/Primitives';
import { SEO } from '@/components/SEO';
import { ReferralBanner } from '@/components/ReferralBanner';
import { PageHeader } from '@/components/ui/PageHeader';
import { COLLECTIONS } from '@/data/merch';
import { ProductCard, EDITORIAL_CLAMP } from '@/components/products/ProductCard';
import { getAllMerchProducts, getMerchByCollection } from '@/lib/productCatalog';
import { generateMerchSchema } from '@/utils/schema';
import { FilterButton } from '@/components/ui/FilterButton';
import { PRINTFUL_REFERRAL } from '@/config/constants';

export default function Merch() {
  const [activeCollection, setActiveCollection] = useState("all");


  const allProducts = getAllMerchProducts();
  const filteredProducts = getMerchByCollection(activeCollection);

  // Group products for editorial sections when "all" is active
  const sections = useMemo(() => {
    if (activeCollection !== 'all') return null;

    const featuredIds = [
      'lead-follow-switch-love-neon',
      'war-eagle-oversized',
      'norcal-bestcal-golden-gate-pride'
    ];

    return [
      {
        id: 'featured',
        title: 'Featured Picks',
        description: 'Best intro products and our strongest designs for the social floor.',
        products: featuredIds.map(id => allProducts.find(p => p.id === id)).filter((p): p is NonNullable<typeof p> => !!p),
      },
      {
        id: 'lead-follow-switch',
        title: 'Lead, Follow, and Switch Dance Shirts',
        description: 'Role-specific and gender-neutral designs for West Coast Swing dancers who lead, follow, switch, or just love the social floor.',
        products: allProducts.filter(p => p.collections.includes('lead-follow-switch') && !featuredIds.includes(p.id)),
      },
      {
        id: 'norcal-bestcal',
        title: 'NorCal BestCal Pride Apparel',
        description: 'Bay Area, California, Golden Gate, and bear designs representing our Northern California roots.',
        products: allProducts.filter(p => p.collections.includes('norcal-bestcal') && !featuredIds.includes(p.id)),
      },
      {
        id: 'rainbow-pride',
        title: 'Rainbow Pride Dance Apparel',
        description: 'Pride-focused designs celebrating an inclusive dance floor and social dance identity.',
        products: allProducts.filter(p => p.collections.includes('rainbow-pride') && !featuredIds.includes(p.id)),
      }
    ];
  }, [activeCollection, allProducts]);

  return (
    <Box paddingX={{ base: 4, md: 8 }} display="flex" justify="center">
      <SEO
        title="West Coast Swing Dance Merch"
        description="Shop official BoomTick apparel for West Coast Swing dancers, social dancers, and NorCal locals. Curated collections for leads, follows, and switch dancers."
        jsonLd={generateMerchSchema(allProducts)}
      />

      <Stack gap="section-spacing" width="full" maxWidth="screen-xl">
        <PageHeader
          label="STOREFRONT"
          title="West Coast Swing Dance Merch"
          description="Apparel for social dancers, NorCal pride, rainbow pride, and role-fluid dance floor energy. BoomTick merch links go to the BoomTick Printful storefront. Printful handles fulfillment, shipping, and checkout."
          cta={
            <Stack direction={{ base: 'col', sm: 'row' }} gap={4} align={{ base: 'stretch', sm: 'center' }}>
              <Button as="a" href="https://boomtick.printful.me/" target="_blank" rel="sponsored noopener noreferrer" variant="primary" width={{ base: 'full', sm: 'auto' }}>
                 Shop Printful Store
              </Button>
              <Button as="a" href={PRINTFUL_REFERRAL.URL} target="_blank" rel="sponsored noopener noreferrer" variant="outline" width={{ base: 'full', sm: 'auto' }}>
                 Claim $5 Discount
              </Button>
            </Stack>
          }
        />

        {/* Collection Filters */}
        <Stack gap={3}>
          <Text variant="headline" size="sm" weight="font-bold" uppercase tracking="wider" color="dim">
            Shop by Style
          </Text>
          <Box border="b" paddingBottom={2} overflowX="auto" noScrollbar>
            <Stack direction="row" gap={2} paddingY={2} paddingX={1} minWidth="max">
              {COLLECTIONS.map((collection) => (
                <FilterButton
                  key={collection.id}
                  label={collection.label}
                  isActive={activeCollection === collection.id}
                  variant="compact"
                  onClick={() => setActiveCollection(collection.id)}
                />
              ))}
            </Stack>
          </Box>
        </Stack>

        {/* Product Sections or Grid */}
        {activeCollection === 'all' && sections ? (
          <Stack gap="section-spacing">
            {sections.map((section) => (
              <Stack key={section.id} gap="section-spacing">
                <Stack gap={4}>
                  <Text as="h2" variant="headline" size="2xl" weight="font-bold" tracking="tight">
                    {section.title}
                  </Text>
                  <Text variant="body" color="dim">
                    {section.description}
                  </Text>
                </Stack>
                {section.id === 'featured' ? (
                  <Grid cols={{ base: 1, sm: 2, md: 4 }} gap={6} width="full" align="stretch">
                    <ProductCard
                      item={section.products[0]}
                      isFeatured
                      span={{ base: 1, sm: 2, md: 2 }}
                      className="md:row-span-1"
                    />
                    {section.products.slice(1, 3).map((product) => (
                      <ProductCard
                        key={`${section.id}-${product.id}`}
                        item={product}
                        span={{ base: 1, sm: 1, md: 1 }}
                        clampTitle={EDITORIAL_CLAMP}
                        clampDescription={EDITORIAL_CLAMP}
                      />
                    ))}
                  </Grid>
                ) : (
                  <Grid cols={{ base: 1, sm: 2, md: 3 }} gap={6} width="full" minWidth="0" align="stretch">
                    {section.products.map((product) => (
                      <ProductCard
                        key={`${section.id}-${product.id}`}
                        item={product}
                      />
                    ))}
                  </Grid>
                )}
              </Stack>
            ))}
          </Stack>
        ) : (
          <Grid cols={{ base: 1, sm: 2, md: 3 }} gap={6} width="full" minWidth="0" align="stretch">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} item={product} />
            ))}
          </Grid>
        )}

        {/* Footer Callouts */}
        <Box padding={{ base: 6, md: 8 }} radius="md" border surface="card" width="full">
           <Stack gap={6}>
              <Text variant="headline" size="xl" weight="font-bold" uppercase tracking="tight">
                Referral Discount
              </Text>
              <ReferralBanner layout="expanded" />
           </Stack>
        </Box>
      </Stack>
    </Box>
  );
}
