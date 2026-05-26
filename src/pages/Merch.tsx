import { MessageCircle } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { Box, Stack, Grid, Text, Button } from '@/layouts/Primitives';
import { SEO } from '@/components/SEO';
import { ReferralBanner } from '@/components/ReferralBanner';
import { COLLECTIONS } from '@/data/merch';
import { ProductCard } from '@/components/products/ProductCard';
import { getAllMerchProducts } from '@/lib/productCatalog';
import { generateMerchSchema } from '@/utils/schema';
import { cn } from '@/lib/utils';
import { stroke } from '@/styles/design-tokens';
import FolioGrid from '@/components/ui/FolioGrid';

export default function Merch() {
  const products = getAllMerchProducts();

  const categories = COLLECTIONS.map(c => ({ id: c.id, label: c.label }));

  return (
    <Box>
      <SEO
        title="West Coast Swing Dance Merch"
        description="Shop official BoomTick apparel for West Coast Swing dancers, social dancers, and NorCal locals. Curated collections for leads, follows, and switch dancers."
        jsonLd={generateMerchSchema(products)}
      />

      <FolioGrid
        items={products}
        categoryTitle="West Coast Swing Dance Merch"
        label="STOREFRONT"
        description="High-quality apparel designed for the social dance floor. From role-specific tees to NorCal pride gear, find something fun for your next dance weekend."
        basePath="/merch"
        searchPlaceholder="Search products..."
        categories={categories}
        categoryParam="collection"
        renderItem={(product) => (
          <ProductCard key={product.id} item={product} />
        )}
      >
        {/* Hero Referral Banner */}
        <Box marginTop={8}>
            <ReferralBanner layout="expanded" />
        </Box>
      </FolioGrid>

      {/* Footer Callouts */}
      <Grid cols={{ base: 1, lg: 2 }} gap={8} marginTop={12}>
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
    </Box>
  );
}
