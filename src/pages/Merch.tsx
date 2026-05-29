import { MessageCircle } from 'lucide-react';
import { useMemo, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Box, Stack, Grid, Text, Button } from '@/layouts/Primitives';
import { SEO } from '@/components/SEO';
import { ReferralBanner } from '@/components/ReferralBanner';
import { PageHeader } from '@/components/ui/PageHeader';
import { COLLECTIONS } from '@/data/merch';
import { ProductCard } from '@/components/products/ProductCard';
import { getAllMerchProducts, getMerchByCollection } from '@/lib/productCatalog';
import type { ProductCatalogItem } from '@/data/products/catalog';
import { generateMerchSchema } from '@/utils/schema';
import { cn } from '@/lib/utils';
import { stroke } from '@/styles/design-tokens';
import { FilterButton } from '@/components/ui/FilterButton';

const FEATURED_PRODUCT_IDS = [
  'lead-follow-switch-love-neon',
  'norcal-bestcal-golden-gate-pride',
  'love-lead-follow-switch-unisex',
];

const EDITORIAL_SECTIONS = [
  {
    id: 'lead-follow-switch',
    title: 'Lead, Follow, and Switch Dance Shirts',
    description: 'Role-friendly West Coast Swing shirts for dancers who lead, follow, switch, or celebrate gender-neutral dance roles on the social floor.',
  },
  {
    id: 'norcal-bestcal',
    title: 'NorCal BestCal Pride Apparel',
    description: 'NorCal pride apparel for California dance weekends, Golden Gate energy, and partner dance friends who call the Bay Area home.',
  },
  {
    id: 'rainbow-pride',
    title: 'Rainbow Pride Dance Apparel',
    description: 'Rainbow pride dance shirts and social dance apparel for inclusive West Coast Swing weekends, Pride events, and chosen-family dance floors.',
  },
] as const;

function ProductSection({ title, description, products }: { title: string; description: string; products: ProductCatalogItem[] }) {
  if (!products.length) return null;

  return (
    <Stack gap={4}>
      <Stack gap={2}>
        <Text as="h2" variant="headline" size="2xl" weight="font-black" leading="tight" tracking="tight">
          {title}
        </Text>
        <Text variant="body" size="sm" color="dim" leading="relaxed" maxWidth="3xl">
          {description}
        </Text>
      </Stack>
      <Grid cols={{ base: 1, sm: 2, md: 3 }} gap={{ base: 5, md: 8 }}>
        {products.map((product) => (
          <ProductCard key={product.id} item={product} />
        ))}
      </Grid>
    </Stack>
  );
}

export default function Merch() {
  const [activeCollection, setActiveCollection] = useState('all');
  const allProducts = getAllMerchProducts();
  const filteredProducts = getMerchByCollection(activeCollection);
  const activeCollectionLabel = COLLECTIONS.find((collection) => collection.id === activeCollection)?.label ?? 'All';
  const featuredProducts = useMemo(
    () => FEATURED_PRODUCT_IDS
      .map((id) => allProducts.find((product) => product.id === id))
      .filter((product): product is ProductCatalogItem => Boolean(product)),
    [allProducts]
  );

  return (
    <Box>
      <SEO
        title="West Coast Swing Dance Merch"
        description="Shop official BoomTick apparel for West Coast Swing dancers, partner dance weekends, lead/follow/switch roles, NorCal pride, and rainbow pride dance floors."
        jsonLd={generateMerchSchema(allProducts)}
      />

      <Stack gap={{ base: 7, md: 9 }} width="full">
        <PageHeader
          label="STOREFRONT"
          title="West Coast Swing Dance Merch"
          description="Apparel for West Coast Swing dancers, partner dance weekends, NorCal pride, rainbow pride, and lead/follow/switch social-floor energy."
          cta={(
            <Stack direction={{ base: 'col', sm: 'row' }} gap={3}>
              <Button as="a" href="https://boomtick.printful.me" target="_blank" rel="sponsored noopener noreferrer" variant="default" fullWidth>
                Shop Printful Store
              </Button>
              <Button variant="outline" onClick={() => setActiveCollection('rainbow-pride')} fullWidth>
                View Pride Picks
              </Button>
              <Button variant="outline" onClick={() => setActiveCollection('lead-follow-switch')} fullWidth>
                Lead / Follow / Switch
              </Button>
            </Stack>
          )}
        />

        <Box padding={{ base: 4, md: 5 }} radius="lg" border surface="card" className="border-line/40">
          <Text variant="body" size="sm" color="dim" leading="relaxed">
            BoomTick merch links go to the BoomTick Printful storefront. Printful handles available colors, sizing, fulfillment, shipping, and checkout details before purchase.
          </Text>
        </Box>

        <Grid cols={{ base: 1, lg: 2 }} gap={6}>
          <ReferralBanner layout="compact" />
          <Box padding={{ base: 5, md: 6 }} radius="lg" border surface="card">
            <Stack gap={3}>
              <Text as="h2" variant="headline" size="xl" weight="font-black" tracking="tight">
                Featured collection: NorCal + Rainbow Pride
              </Text>
              <Text variant="body" size="sm" color="dim" leading="relaxed">
                Bright dance weekend outfits, California pride graphics, and inclusive social dance shirts curated for BoomTick readers.
              </Text>
              <Button variant="outline" onClick={() => setActiveCollection('rainbow-pride')} width="fit">
                Browse Pride Apparel
              </Button>
            </Stack>
          </Box>
        </Grid>

        <Stack gap={3}>
          <Stack gap={1}>
            <Text as="h2" variant="headline" size="xl" weight="font-black" tracking="tight">
              Browse merch
            </Text>
            <Text variant="body" size="sm" color="dim">
              Showing {filteredProducts.length} {activeCollectionLabel.toLowerCase()} product{filteredProducts.length === 1 ? '' : 's'}.
            </Text>
          </Stack>
          <Box border="b" paddingBottom={4} className="border-line overflow-x-auto">
            <Stack direction="row" gap={2} padding={1} className="min-w-max">
              {COLLECTIONS.map((collection) => (
                <FilterButton
                  key={collection.id}
                  label={collection.label}
                  isActive={activeCollection === collection.id}
                  onClick={() => setActiveCollection(collection.id)}
                />
              ))}
            </Stack>
          </Box>
        </Stack>

        {activeCollection === 'all' && (
          <ProductSection
            title="Featured West Coast Swing Merch"
            description="Back-first role tees, pride graphics, and gender-neutral dance-role shirts selected as the strongest BoomTick storefront picks."
            products={featuredProducts}
          />
        )}

        <ProductSection
          title={activeCollection === 'all' ? 'All West Coast Swing Merch' : `${activeCollectionLabel} Merch`}
          description={activeCollection === 'all'
            ? 'Shop West Coast Swing merch, social dance shirts, NorCal pride apparel, rainbow pride dance shirts, and dance weekend outfit staples.'
            : 'Filtered storefront picks with Printful colors, sizing, fulfillment, shipping, and checkout confirmed on the product page.'}
          products={filteredProducts}
        />

        {activeCollection === 'all' && EDITORIAL_SECTIONS.map((section) => (
          <ProductSection
            key={section.id}
            title={section.title}
            description={section.description}
            products={getMerchByCollection(section.id).slice(0, 3)}
          />
        ))}

        <Grid cols={{ base: 1, lg: 2 }} gap={8} marginTop={8}>
          <Box padding={8} radius="lg" border surface="card">
            <Stack gap={6}>
              <Box padding={3} radius="full" width="fit" className="bg-accent/10 text-accent">
                <MessageCircle className={cn("w-6 h-6", stroke.thick)} />
              </Box>
              <Stack gap={2}>
                <Text variant="headline" size="xl" weight="font-bold" uppercase tracking="tight">
                  Have a Design Idea?
                </Text>
                <Text variant="body" size="sm" color="dim">
                  We're always looking for new ways to represent the WCS community. If you have a concept for a shirt or accessory, let us know!
                </Text>
              </Stack>
              <Button as={NavLink} to="/contact" variant="outline" width="fit">
                Submit Suggestion
              </Button>
            </Stack>
          </Box>

          <ReferralBanner layout="compact" />
        </Grid>
      </Stack>
    </Box>
  );
}
