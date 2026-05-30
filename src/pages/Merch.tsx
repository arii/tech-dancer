import { MessageCircle } from 'lucide-react';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Box, Stack, Grid, Text, Button } from '@/layouts/Primitives';
import { SEO } from '@/components/SEO';
import { ReferralBanner } from '@/components/ReferralBanner';
import { PageHeader } from '@/components/ui/PageHeader';
import { COLLECTIONS } from '@/data/merch';
import { ProductCard } from '@/components/products/ProductCard';
import { getAllMerchProducts, getMerchByCollection } from '@/lib/productCatalog';
import { generateMerchSchema } from '@/utils/schema';
import { cn } from '@/lib/utils';
import { stroke } from '@/styles/design-tokens';
import { FilterButton } from '@/components/ui/FilterButton';

export default function Merch() {
  const [activeCollection, setActiveCollection] = useState('all');

  const filteredProducts = getMerchByCollection(activeCollection);

  return (
    <Box>
      <SEO
        title="Shop WCS Dance Merch | Role Pride & NorCal Apparel | BoomTick"
        description="Elevate your social dance style with BoomTick's curated West Coast Swing merch. Featuring role-pride tees, NorCal BestCal designs, and rainbow pride apparel."
        jsonLd={generateMerchSchema(getAllMerchProducts())}
      />

      <Stack gap={{ base: 6, md: 8 }} width="full">
        {/* Hero Section */}
        <Box as="section" marginX="auto" maxWidth="7xl" width="full">
          <Grid cols={{ base: 1, md: 2 }} gap={{ base: 6, md: 12 }} align="center">
            <PageHeader
              label="STORE"
              title="West Coast Swing Dance Merch"
              description="Role-pride apparel, NorCal love, rainbow pride, and social dance floor energy."
              border="none"
              paddingBottom={0}
              descriptionMaxWidth="full"
              cta={
                <Stack gap={6}>
                  <Stack direction={{ base: 'col', sm: 'row' }} gap={4}>
                    <Button
                      as="a"
                      href="https://boomtick.printful.me"
                      target="_blank"
                      rel="sponsored noopener noreferrer"
                      variant="primary"
                      className="w-full sm:w-fit"
                    >
                      Shop Printful Store
                    </Button>
                    <Button
                      as="a"
                      href="#featured"
                      variant="outline"
                      className="w-full sm:w-fit"
                    >
                      Browse Featured Picks
                    </Button>
                  </Stack>
                  <Text variant="body" size="micro" color="dim" leading="relaxed">
                    Heads up: merch opens in the BoomTick Printful store. Printful handles colors, sizing, checkout, shipping, and fulfillment.
                  </Text>
                </Stack>
              }
            />
            <Box display={{ base: 'none', md: 'block' }}>
              <ReferralBanner layout="expanded" />
            </Box>
          </Grid>
        </Box>

        {/* Collection Filters */}
        <Stack gap={4} marginTop={2}>
          <Stack gap={1.5}>
            <Text variant="headline" size="sm" weight="font-bold" uppercase tracking="tight">
              Browse by vibe
            </Text>
            <Text variant="body" size="sm" color="dim">
              Find the design that matches your dance-floor personality.
            </Text>
          </Stack>
          <Box id="featured" border="b" paddingBottom={3} className="border-line overflow-x-auto">
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

        {/* Product Grid */}
        <Grid cols={{ base: 1, sm: 2, lg: 3, xl: 4 }} gap={4} mdGap={6}>
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} item={product} />
          ))}
        </Grid>

        {/* Footer Callouts */}
        <Grid cols={{ base: 1, lg: 2 }} gap={8} marginTop={8}>
          {/* Design Suggestions */}
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
              <Button as={NavLink} to="/contact" variant="outline" className="w-fit">
                Submit Suggestion
              </Button>
            </Stack>
          </Box>

          {/* Detailed Referral Box */}
          <ReferralBanner layout="compact" />
        </Grid>
      </Stack>
    </Box>
  );
}
