import { MessageCircle } from "lucide-react";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Box, Stack, Grid, Text, Button } from "@/layouts/Primitives";
import { SEO } from "@/components/SEO";
import { ReferralBanner } from "@/components/ReferralBanner";
import { PageHeader } from "@/components/ui/PageHeader";
import { COLLECTIONS } from "@/data/merch";
import { ProductCard } from "@/components/products/ProductCard";
import {
  getAllMerchProducts,
  getMerchByCollection,
} from "@/lib/productCatalog";
import { generateMerchSchema } from "@/utils/schema";
import { cn } from "@/lib/utils";
import { stroke } from "@/styles/design-tokens";
import { FilterButton } from "@/components/ui/FilterButton";

export default function Merch() {
  const [activeCollection, setActiveCollection] = useState("all");



  return (
    <Box maxWidth="6xl" marginX="auto">
      <SEO
        title="West Coast Swing Dance Merch"
        description="Shop BoomTick merch for West Coast Swing dancers, including role-pride tees, NorCal designs, rainbow pride apparel, and dance-weekend layers."
        jsonLd={generateMerchSchema(getAllMerchProducts())}
      />

      <Stack gap={6} width="full">
        <PageHeader
          label="STOREFRONT"
          title="West Coast Swing Dance Merch"
          description="BoomTick specific gear, designed by dancers for dancers. From role-specific tees to NorCal pride gear, find something fun for your next dance weekend."
        />

        {/* Hero Referral Banner */}
        <ReferralBanner layout="compact" />

        <Box paddingY={2}>
          <Text variant="body" size="sm" color="dim" align="center">
            Products open in the BoomTick Printful storefront and are fulfilled
            directly by Printful.
          </Text>
        </Box>

        {/* Collection Filters */}
        <Box paddingBottom={2} className="overflow-x-auto">
          <Stack direction="row" gap={2} padding={1} className="min-w-max">
            {COLLECTIONS.map((collection) => (
              <FilterButton
                variant="quiet"
                key={collection.id}
                label={collection.label}
                isActive={activeCollection === collection.id}
                onClick={() => setActiveCollection(collection.id)}
              />
            ))}
          </Stack>
        </Box>

        {/* Editorial Sections */}
        <Stack gap={12}>
          {COLLECTIONS.map((collection) => {
            if (
              activeCollection !== "all" &&
              activeCollection !== collection.id
            )
              return null;
            if (collection.id === "all") return null;

            const products = getMerchByCollection(collection.id);
            if (products.length === 0) return null;

            return (
              <Stack key={collection.id} gap={6} as="section">
                <Box border="b" paddingBottom={2} className="border-line">
                  <Text
                    as="h2"
                    variant="headline"
                    size="xl"
                    weight="font-bold"
                    color="main"
                    tracking="tight"
                  >
                    {collection.label}
                  </Text>
                </Box>
                <Grid cols={{ base: 1, sm: 2, lg: 3 }} gap={{ base: 5, md: 8 }}>
                  {products.map((product) => (
                    <ProductCard key={product.id} item={product} />
                  ))}
                </Grid>
              </Stack>
            );
          })}
        </Stack>

        {/* Footer Callouts */}
        <Grid cols={{ base: 1, lg: 2 }} gap={8} marginTop={8}>
          {/* Design Suggestions */}
          <Box padding={8} radius="lg" border surface="card">
            <Stack gap={6}>
              <Box
                padding={3}
                radius="full"
                width="fit"
                className="bg-accent/10 text-accent"
              >
                <MessageCircle className={cn("w-6 h-6", stroke.thick)} />
              </Box>
              <Stack gap={2}>
                <Text
                  variant="headline"
                  size="xl"
                  weight="font-bold"
                  uppercase
                  tracking="tight"
                >
                  Have a Design Idea?
                </Text>
                <Text variant="body" size="sm" color="dim">
                  We're always looking for new ways to represent the WCS
                  community. If you have a concept for a shirt or accessory, let
                  us know!
                </Text>
              </Stack>
              <Button
                as={NavLink}
                to="/contact"
                variant="outline"
                className="w-fit"
              >
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
