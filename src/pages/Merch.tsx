import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Box, Stack, Grid, Text, Button } from '@/layouts/Primitives';
import { SEO } from '@/components/SEO';
import { ReferralBanner } from '@/components/ReferralBanner';
import { PageHeader } from '@/components/ui/PageHeader';
import { COLLECTIONS } from '@/data/merch';
import { ProductCard } from '@/components/products/ProductCard';
import { getAllMerchProducts } from '@/lib/productCatalog';
import { generateMerchSchema } from '@/utils/schema';
import { PRINTFUL_REFERRAL } from '@/config/constants';
import { MerchFilterBar } from '@/components/products/MerchFilterBar';
import { CollectionSection } from '@/components/products/CollectionSection';
import { PromoStrip } from '@/components/products/PromoStrip';
import { motion, AnimatePresence } from 'motion/react';

export default function Merch() {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeCollection = searchParams.get('collection') || 'all';

  const setActiveCollection = (id: string) => {
    if (id === 'all') {
      searchParams.delete('collection');
    } else {
      searchParams.set('collection', id);
    }
    setSearchParams(searchParams);
  };

  const allProducts = getAllMerchProducts();

  // Group products by collectionId
  const groupedProducts = useMemo(() => {
    return allProducts.reduce((acc, product) => {
      const colId = product.collectionId || 'other';
      if (!acc[colId]) {
        acc[colId] = {
          id: colId,
          title: product.collectionLabel || COLLECTIONS.find(c => c.id === colId)?.label || 'More designs',
          products: [],
        };
      }
      acc[colId].products.push(product);
      return acc;
    }, {} as Record<string, { id: string; title: string; products: typeof allProducts }>);
  }, [allProducts]);

  const sections = useMemo(() => {
    const definedOrder = ["norcal-golden-gate", "rainbow-pride", "lead-follow-switch", "other"];

    const baseSections = [
      {
        id: 'featured',
        title: 'Featured Picks',
        description: 'Best intro products and our strongest designs for the social floor.',
        products: [
          allProducts.find(p => p.id === 'lead-follow-switch-love-neon'),
          allProducts.find(p => p.id === 'war-eagle-oversized'),
          allProducts.find(p => p.id === 'norcal-bestcal-golden-gate-pride'),
        ].filter((p): p is NonNullable<typeof p> => !!p),
        isFeatured: true,
      },
      ...definedOrder.map(id => {
        const group = groupedProducts[id];
        if (!group) return null;

        let description = "";
        if (id === 'lead-follow-switch') description = "Role-specific and gender-neutral designs for West Coast Swing dancers who lead, follow, switch, or just love the social floor.";
        if (id === 'norcal-golden-gate') description = "Bay Area, California, Golden Gate, and bear designs representing our Northern California roots.";
        if (id === 'rainbow-pride') description = "Pride-focused designs celebrating an inclusive dance floor and social dance identity.";
        if (id === 'other') description = "Explore more of our curated dance designs.";

        return {
          ...group,
          description,
        };
      }).filter((s): s is NonNullable<typeof s> => !!s)
    ];

    if (activeCollection === 'all') {
      return baseSections;
    }

    return baseSections.filter(s => s.id === activeCollection);
  }, [activeCollection, groupedProducts, allProducts]);

  return (
    <Box paddingX={{ base: 4, md: 8 }} display="flex" justify="center">
      <SEO
        title="West Coast Swing Dance Merch"
        description="Shop official BoomTick apparel for West Coast Swing dancers, social dancers, and NorCal locals. Curated collections for leads, follows, and switch dancers."
        jsonLd={generateMerchSchema(allProducts)}
      />

      <Stack gap={{ base: 5, md: 6 }} width="full" maxWidth="screen-xl">
        <PageHeader
          label="STOREFRONT"
          title="West Coast Swing Dance Merch"
          description="Apparel for social dancers, NorCal pride, rainbow pride, and role-fluid dance floor energy. BoomTick merch links go to the BoomTick Printful storefront. Printful handles fulfillment, shipping, and checkout."
          paddingBottom={4}
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

        <PromoStrip
          imageSrc="/assets/gear/norcal-bestcal-front.webp"
          title="Limited Edition NorCal Best Cal Tee"
          subtitle="Support local dance with our signature Golden Gate design."
          ctaLabel="Shop Now"
          href="https://boomtick.printful.me/product/norcal-bestcal"
        />

        <MerchFilterBar
          activeCollection={activeCollection}
          onCollectionChange={setActiveCollection}
        />

        <AnimatePresence mode="wait">
          <motion.div
            key={activeCollection}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <Stack gap={{ base: 16, md: 24 }}>
              {sections.length > 0 ? (
                sections.map((section) => (
                  <CollectionSection
                    key={section.id}
                    id={section.id}
                    title={section.title}
                    description={section.description}
                    products={section.products}
                    isFeatured={section.isFeatured}
                  />
                ))
              ) : (
                <Grid cols={{ base: 1, sm: 2, md: 3 }} gap={{ base: 5, md: 8 }} width="full" minWidth="0">
                  {allProducts
                    .filter(p => p.collections.includes(activeCollection) || p.collectionId === activeCollection)
                    .map((product) => (
                      <ProductCard key={product.id} item={product} />
                    ))}
                </Grid>
              )}
            </Stack>
          </motion.div>
        </AnimatePresence>

        {/* Footer Callouts */}
        <Box padding={8} radius="lg" border surface="card" marginTop={8} width="full">
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
