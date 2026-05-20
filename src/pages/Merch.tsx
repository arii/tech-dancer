import { ExternalLink, MessageCircle } from 'lucide-react';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Box, Stack, Grid, Text, Button } from '@/layouts/Primitives';
import { SEO } from '@/components/SEO';
import { ReferralBanner } from '@/components/ReferralBanner';
import { ASSET_PREFIX } from '@/config/constants';
import { MERCH_PRODUCTS, COLLECTIONS, MerchProduct } from '@/data/merch';
import { generateMerchSchema } from '@/utils/schema';
import { cn } from '@/lib/utils';
import { stroke } from '@/styles/design-tokens';

export default function Merch() {
  const [activeCollection, setActiveCollection] = useState('all');

  const filteredProducts = activeCollection === 'all'
    ? MERCH_PRODUCTS
    : MERCH_PRODUCTS.filter((p) => p.collections.includes(activeCollection));

  return (
    <Box>
      <SEO
        title="West Coast Swing Dance Merch & NorCal Apparel"
        description="Shop official BoomTick apparel for West Coast Swing dancers, social dancers, and NorCal locals. Curated collections for leads, follows, and switch dancers."
        canonical="/merch"
        jsonLd={generateMerchSchema(MERCH_PRODUCTS)}
      />

      <Stack gap={12} width="full">
        {/* Hero Section */}
        <Stack gap={6} align="start" maxWidth="3xl">
          <Text variant="mono" size="sm" color="accent" weight="font-bold" uppercase tracking="widest">
            Storefront
          </Text>
          <Text as="h1" variant="hero" size="fluid-9">
            West Coast Swing <br />
            <span className="text-accent">Dance Merch</span>
          </Text>
          <Text variant="sans" size="xl" color="dim" className="leading-relaxed">
            High-quality apparel designed for the social dance floor. From role-specific tees to NorCal pride gear, find your next weekend loadout here.
          </Text>

          {/* Hero Referral Banner */}
          <ReferralBanner variant="hero" />
        </Stack>

        {/* Collection Filters */}
        <Box border="b" paddingBottom={4} className="border-line overflow-x-auto">
          <Stack direction="row" gap={2} className="min-w-max">
            {COLLECTIONS.map((collection) => (
              <Button
                key={collection.id}
                variant={activeCollection === collection.id ? 'primary' : 'ghost'}
                onClick={() => setActiveCollection(collection.id)}
                className="whitespace-nowrap"
              >
                {collection.label}
              </Button>
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
        <Grid cols={{ base: 1, lg: 2 }} gap={8} marginTop={12}>
          {/* Design Suggestions */}
          <Box padding={8} radius="md" className="bg-surface border border-line">
            <Stack gap={4}>
              <Box padding={3} radius="full" width="fit" className="bg-accent/10 text-accent">
                <MessageCircle className={cn("w-6 h-6", stroke.thick)} />
              </Box>
              <Stack gap={2}>
                <Text variant="sans" size="xl" weight="font-bold">
                  Have a Design Idea?
                </Text>
                <Text variant="sans" size="sm" color="dim">
                  We're always looking for new ways to represent the WCS community. If you have a concept for a shirt or accessory, let us know!
                </Text>
              </Stack>
              <Button as={NavLink} to="/contact" variant="ghost" className="w-fit border-line hover:bg-surface-alt">
                Submit Suggestion
              </Button>
            </Stack>
          </Box>

          {/* Detailed Referral Box */}
          <ReferralBanner variant="footer" />
        </Grid>
      </Stack>
    </Box>
  );
}

function ProductCard({ product }: { product: MerchProduct }) {
  return (
    <Stack
      gap={0}
      radius="md"
      className="bg-surface border border-line group overflow-hidden transition-all hover:border-accent/50"
    >
      <Box aspect="square" position="relative" className="overflow-hidden bg-surface-alt">
        <Box
          as="img"
          src={`${ASSET_PREFIX}${product.imageUrl}`}
          alt={`${product.title} for West Coast Swing`}
          width="full"
          height="full"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {product.roles && (
          <Box position="absolute" className="top-4 left-4">
            <Stack direction="row" gap={1}>
              {product.roles.map((role) => (
                <Box
                  key={role}
                  paddingX={2}
                  paddingY={0.5}
                  radius="full"
                  className={cn(
                    "text-micro font-mono font-bold uppercase tracking-wider border",
                    role === 'lead' && "bg-blue-500/10 text-blue-400 border-blue-500/20",
                    role === 'follow' && "bg-pink-500/10 text-pink-400 border-pink-500/20",
                    role === 'switch' && "bg-purple-500/10 text-purple-400 border-purple-500/20"
                  )}
                >
                  {role}
                </Box>
              ))}
            </Stack>
          </Box>
        )}
      </Box>

      <Stack padding={6} gap={4} flex={1}>
        <Stack gap={2}>
          <Text variant="sans" size="lg" weight="font-bold" className="group-hover:text-accent transition-colors">
            {product.title}
          </Text>
          <Text variant="sans" size="sm" color="dim" className="line-clamp-2">
            {product.description}
          </Text>
        </Stack>

        <Stack direction="row" gap={2} wrap="wrap">
          {product.tags.slice(0, 3).map((tag) => (
            <Text key={tag} variant="mono" size="micro" color="dim" className="opacity-60">
              #{tag.replace(/\s+/g, '-').toLowerCase()}
            </Text>
          ))}
        </Stack>

        <Stack direction="row" align="center" justify="between" marginTop="auto" paddingTop={4} className="border-t border-line">
          <Text variant="sans" size="lg" weight="font-bold">
            From ${product.price}
          </Text>
          <Button
            as="a"
            href={product.printfulUrl}
            target="_blank"
            rel="sponsored noopener noreferrer"
            variant="ghost"
            size="sm"
            className="text-accent hover:bg-accent/10"
          >
            See Colors
            <Box as="span" marginLeft={2} display="inline-block">
              <ExternalLink className="w-3 h-3" />
            </Box>
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
}
