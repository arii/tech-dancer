import { MessageCircle, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Box, Stack, Grid, Text, Button } from '@/layouts/Primitives';
import { SEO } from '@/components/SEO';
import { ReferralBanner } from '@/components/ReferralBanner';
import { PageHeader } from '@/components/ui/PageHeader';
import { ASSET_PREFIX } from '@/config/constants';
import { MERCH_PRODUCTS, COLLECTIONS, MerchProduct } from '@/data/merch';
import { generateMerchSchema } from '@/utils/schema';
import { cn } from '@/lib/utils';
import { stroke } from '@/styles/design-tokens';
import { FilterButton } from '@/components/ui/FilterButton';

export default function Merch() {
  const [activeCollection, setActiveCollection] = useState('all');

  const filteredProducts = activeCollection === 'all'
    ? MERCH_PRODUCTS
    : MERCH_PRODUCTS.filter((p) => p.collections.includes(activeCollection));

  return (
    <Box>
      <SEO
        title="West Coast Swing Dance Merch"
        description="Shop official BoomTick apparel for West Coast Swing dancers, social dancers, and NorCal locals. Curated collections for leads, follows, and switch dancers."
        jsonLd={generateMerchSchema(MERCH_PRODUCTS)}
      />

      <Stack gap={8} width="full">
        <PageHeader
          label="STOREFRONT"
          title="West Coast Swing Dance Merch"
          description="High-quality apparel designed for the social dance floor. From role-specific tees to NorCal pride gear, find your next weekend loadout here."
        />

        {/* Hero Referral Banner */}
        <ReferralBanner layout="expanded" />

        {/* Collection Filters */}
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

        {/* Product Grid */}
        <Grid cols={{ base: 1, md: 2, lg: 3 }} gap={8}>
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
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

function ProductCard({ product }: { product: MerchProduct }) {
  return (
    <Stack
      as="article"
      gap={3}
      height="full"
      padding={6}
      radius="lg"
      border
      data-testid="product-card"
      className="group relative bg-surface transition-all duration-300 hover:bg-surface/80 hover:border-accent/30 hover:-translate-y-0.5"
    >
      <Box
        as="a"
        href={product.printfulUrl}
        target="_blank"
        rel="sponsored noopener noreferrer"
        aria-label={`Buy ${product.title} on Printful`}
        className="absolute inset-0 z-10"
      />

      {/* Image zone */}
      <Box
        position="relative"
        aspect="square"
        overflow="hidden"
        radius="md"
        className="bg-surface-alt/20"
      >
        <Box
          as="img"
          src={`${ASSET_PREFIX}${product.imageUrl}`}
          alt={product.title}
          width="full"
          height="full"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* Category badge */}
        <Box
          position="absolute"
          top={3}
          right={3}
          paddingX={2}
          paddingY={1}
          radius="full"
          opacity={80}
          className="bg-accent text-white backdrop-blur-md shadow-sm"
        >
          <Text variant="mono" size="micro" weight="font-black" uppercase tracking="wide">
            {product.price.includes('$') ? product.price : `$${product.price}`}
          </Text>
        </Box>

        {product.roles && (
          <Box position="absolute" bottom={3} left={3}>
            <Stack direction="row" gap={1}>
              {product.roles.map((role) => (
                <Box
                  key={role}
                  paddingX={2}
                  paddingY={0.5}
                  radius="full"
                  surface={
                    role === 'lead' ? 'accent' :
                    role === 'follow' ? 'warning' :
                    role === 'switch' ? 'alt' : 'default'
                  }
                  bgOpacity={80}
                  className="font-mono font-bold uppercase tracking-wider backdrop-blur-md"
                >
                  <Text size="micro" as="span" inherit>
                    {role}
                  </Text>
                </Box>
              ))}
            </Stack>
          </Box>
        )}
      </Box>

      <Stack gap={2}>
        <Text
          as="h3"
          variant="body"
          size="lg"
          weight="font-bold"
          color="main"
          leading="tight"
          clamp={2}
          className="group-hover:text-accent transition-colors"
        >
          {product.title}
        </Text>

        <Text variant="body" size="sm" color="dim" leading="relaxed" clamp={3}>
          {product.description}
        </Text>
      </Stack>

      <Box display="flex" align="center" justify="between" marginTop="auto" paddingTop={3} border="t" className="border-line/30">
        <Stack direction="row" gap={2} wrap="wrap">
          {product.tags.slice(0, 2).map((tag) => (
            <Text key={tag} variant="mono" size="micro" color="dim" uppercase tracking="tighter" className="opacity-60">
              {tag}
            </Text>
          ))}
        </Stack>
        <Box display="flex" align="center" gap={1}>
          <Text variant="mono" size="sm" weight="font-bold" color="accent" tracking="wide">
            SEE COLORS
          </Text>
          <ArrowRight className="w-3 h-3 text-accent" />
        </Box>
      </Box>
    </Stack>
  );
}
