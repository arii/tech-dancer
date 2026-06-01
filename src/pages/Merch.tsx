/* impeccable-ignore-file */
import { MessageCircle } from 'lucide-react';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Box, Stack, Grid, Text, Button } from '@/layouts/Primitives';
import { SEO } from '@/components/SEO';
import { ReferralBanner } from '@/components/ReferralBanner';
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
        title="Shop WCS Dance Merch | BoomTick"
        description="BoomTick merch for West Coast Swing dancers, NorCal pride, rainbow pride, and role-fluid social dance energy. Shop lead, follow, switch, and WCS-inspired apparel."
        jsonLd={generateMerchSchema(getAllMerchProducts())}
      />

      <Stack gap={10} width="full">
        {/* Hero Section */}
        <Box as="section" marginX="auto" maxWidth="7xl" paddingX={{ base: 4, md: 6 }} paddingY={{ base: 4, md: 10 }}>
          <Grid cols={{ base: 1, md: 2 }} gap={{ base: 6, md: 8 }} align="center">
            <Stack gap={{ base: 5, md: 6 }}>
              <Stack gap={2}>
                <Text variant="mono" size="xs" color="accent" weight="font-bold" uppercase tracking="widest">
                  OFFICIAL STOREFRONT
                </Text>
                <Text as="h1" variant="headline" size={{ base: '4xl', md: '5xl' }} weight="font-bold" tracking="tight">
                  Dance Merch
                </Text>
                <Text variant="body" size="lg" color="dim" leading="relaxed">
                  Role-pride apparel, NorCal love, rainbow pride, and social dance floor energy. Made for the WCS community.
                </Text>
              </Stack>

              <Stack direction={{ base: 'column', sm: 'row' }} gap={4}>
                <Button
                  as="a"
                  href="https://boomtick.printful.me"
                  target="_blank"
                  rel="sponsored noopener noreferrer"
                  variant="primary"
                  size="lg"
                  width={{ base: 'full', sm: 'fit' }}
                >
                  Shop Printful Store
                </Button>
                <Button
                  onClick={() => document.getElementById('browse')?.scrollIntoView({ behavior: 'smooth' })}
                  variant="outline"
                  size="lg"
                  width={{ base: 'full', sm: 'fit' }}
                >
                  Browse Picks
                </Button>
              </Stack>

              <Text size="micro" color="dim" italic>
                Heads up: merch opens in the BoomTick Printful store. Printful handles colors, sizing, checkout, shipping, and fulfillment.
              </Text>
            </Stack>

            <Box display={{ base: 'none', md: 'block' }}>
              <ReferralBanner layout="compact" />
            </Box>
          </Grid>
        </Box>

        {/* Browse Section */}
        <Stack id="browse" gap={6} scrollMarginTop={20}>
          <Stack gap={4}>
            <Stack gap={1}>
              <Text variant="headline" size="2xl" weight="font-bold" uppercase tracking="tight">
                Browse by vibe
              </Text>
              <Text variant="body" size="sm" color="dim">
                Find the design that matches your dance-floor personality.
              </Text>
            </Stack>

            <Box border="b" paddingBottom={4} overflow="x-auto" className="border-line">
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
          <Grid cols={{ base: 1, sm: 2, lg: 3, xl: 4 }} gap={6}>
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} item={product} />
            ))}
          </Grid>
        </Stack>

        {/* Mobile Promo Card */}
        <Box display={{ base: 'block', md: 'none' }} paddingX={4} marginTop={4}>
          <ReferralBanner layout="compact" />
        </Box>

        {/* Footer Callouts */}
        <Grid cols={{ base: 1, lg: 2 }} gap={8} marginTop={8} paddingTop={12} className="border-t border-line">
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

          <Box padding={8} radius="lg" border surface="card" display="flex" align="center" justify="center">
            <Stack gap={4} align="center" textAlign="center">
              <Text variant="headline" size="lg" weight="font-bold">
                Storefront Notice
              </Text>
              <Text variant="body" size="sm" color="dim">
                BoomTick merch links open in the BoomTick Printful storefront. Printful manages product options, sizing, checkout, fulfillment, shipping, and applicable return policies.
              </Text>
            </Stack>
          </Box>
        </Grid>
      </Stack>
    </Box>
  );
}
