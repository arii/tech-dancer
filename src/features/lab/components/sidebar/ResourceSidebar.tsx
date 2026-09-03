import { ExternalLink, ShoppingBag, Palette, Ruler, Sparkles, CheckCircle2 } from 'lucide-react';
import { Box, Stack, Text, Grid } from '@/layouts/Primitives';
import { affiliateManager } from '@/lib/affiliateManager';
import { SpecsTable } from '@/components/layout/DetailElements';
import { ResourceGrid } from '../ResourceGrid';
import { DISCLOSURE_TEXT } from '@/components/ui/AffiliateDisclosure';
import { MERCH_PRODUCTS } from '@/data/merch';

interface ResourceHeaderExtrasProps {
  author: string;
  rating?: number;
  durability?: number;
  value?: number;
  priceCategory: string;
}

export function ResourceHeaderExtras({ author, rating: _rating, durability, value, priceCategory }: ResourceHeaderExtrasProps) {
  return (
    <Stack gap={6} marginTop={6}>
      <Stack direction="row" align="center" gap={2} color="dim">
        <Box width={8} height={8} radius="full" surface="muted" />
        <Text variant="mono" size="xs">{author}</Text>
      </Stack>

      <ResourceGrid
        rating={0}
        durability={durability}
        value={value}
        priceCategory={priceCategory}
      />
    </Stack>
  );
}

export function ResourceBodyExtras({ heading }: { heading?: string }) {
  if (!heading) return null;
  return (
    <Box marginBottom={6}>
      <Text variant="headline" size="2xl" color="main">{heading}</Text>
    </Box>
  );
}

interface ResourceSidebarProps {
  slug?: string;
  affiliateIds?: string[];
  affiliateLink?: string; // For manual entry in BlogDrafter
  shopUrl?: string;
  provider?: string;
  specs?: Record<string, string>;
}

export function ResourceSidebar({ slug, affiliateIds, affiliateLink, shopUrl, provider, specs }: ResourceSidebarProps) {
  const affiliateLinks = (affiliateIds || [])
    .map(id => affiliateManager.getLink(id))
    .filter((link): link is NonNullable<typeof link> => !!link);

  // Look up matched merch product if this is a merch gear page
  const matchedMerch = MERCH_PRODUCTS.find(
    (p) => (slug && (p.gearSlug === slug || p.id === slug)) || (shopUrl && p.printfulUrl === shopUrl)
  );

  const effectiveShopUrl = shopUrl || matchedMerch?.printfulUrl;
  const hasWhereToBuy = affiliateLinks.length > 0 || !!affiliateLink || !!effectiveShopUrl;

  const combinedSpecs: Record<string, string> = {
    ...(matchedMerch?.price ? { Price: `$${matchedMerch.price} USD` } : {}),
    ...(matchedMerch?.color ? { Colors: matchedMerch.color.replace(/\//g, ', ') } : {}),
    ...(matchedMerch?.size ? { Sizes: matchedMerch.size.replace(/\//g, ', ') } : {}),
    ...(matchedMerch?.material ? { Material: matchedMerch.material } : {}),
    ...(matchedMerch ? { Fulfillment: 'Print-on-Demand (Printful)' } : {}),
    ...(specs || {}),
  };

  return (
    <Stack gap={8}>
      {/* Product Purchase & Summary Card for Merch items */}
      {matchedMerch && (
        <Box
          surface="default"
          border
          padding={5}
          radius="lg"
          className="border-accent/40 bg-accent/5 shadow-sm"
        >
          <Stack gap={4}>
            <Stack direction="row" justify="between" align="baseline">
              <Text variant="mono" size="tiny" weight="font-bold" color="accent" uppercase tracking="widest">
                Official Merch
              </Text>
              <Text variant="display" size="2xl" weight="font-black" color="main">
                ${matchedMerch.price}
              </Text>
            </Stack>

            <Text variant="body" size="sm" color="dim" leading="relaxed">
              {matchedMerch.description}
            </Text>

            {/* Colors */}
            <Stack gap={1.5}>
              <Stack direction="row" align="center" gap={1.5}>
                <Palette className="w-3.5 h-3.5 text-accent" />
                <Text variant="mono" size="micro" color="dim" uppercase weight="font-bold">Available Colors</Text>
              </Stack>
              <Stack direction="row" wrap gap={1.5}>
                {matchedMerch.color.split('/').map((c) => (
                  <Box
                    key={c}
                    paddingX={2}
                    paddingY={0.5}
                    surface="muted"
                    border
                    radius="full"
                    className="border-line/60"
                  >
                    <Text variant="mono" size="micro" weight="font-medium">{c.trim()}</Text>
                  </Box>
                ))}
              </Stack>
            </Stack>

            {/* Sizes */}
            <Stack gap={1.5}>
              <Stack direction="row" align="center" gap={1.5}>
                <Ruler className="w-3.5 h-3.5 text-accent" />
                <Text variant="mono" size="micro" color="dim" uppercase weight="font-bold">Available Sizes</Text>
              </Stack>
              <Stack direction="row" wrap gap={1.5}>
                {matchedMerch.size.split('/').map((s) => (
                  <Box
                    key={s}
                    paddingX={2}
                    paddingY={0.5}
                    surface="muted"
                    border
                    radius="sm"
                    className="border-line/60"
                  >
                    <Text variant="mono" size="micro" weight="font-bold">{s.trim()}</Text>
                  </Box>
                ))}
              </Stack>
            </Stack>

            {/* Direct Purchase Button */}
            {effectiveShopUrl && (
              <Box
                as="a"
                href={effectiveShopUrl}
                target="_blank"
                rel="sponsored noopener noreferrer"
                display="flex"
                align="center"
                justify="center"
                paddingY={3}
                paddingX={4}
                radius="md"
                className="bg-accent text-background hover:bg-accent/90 transition-all font-bold gap-2 text-center group mt-2"
              >
                <ShoppingBag className="w-4 h-4 transition-transform group-hover:scale-110" />
                <Text variant="mono" size="xs" weight="font-bold" color="inherit">
                  Order on Printful Store
                </Text>
                <ExternalLink className="w-3.5 h-3.5 opacity-80" />
              </Box>
            )}

            <Stack direction="row" align="center" gap={1.5} justify="center" opacityVariant="subtle">
              <CheckCircle2 className="w-3 h-3 text-accent" />
              <Text variant="mono" size="micro" color="dim">Direct fulfillment & global shipping</Text>
            </Stack>
          </Stack>
        </Box>
      )}

      {/* Technical Specs Table */}
      {Object.keys(combinedSpecs).length > 0 && <SpecsTable specs={combinedSpecs} />}

      {/* Standard Where to Buy fallback for non-merch gear or Amazon links */}
      {hasWhereToBuy && !matchedMerch && (
        <Stack gap={4}>
          <Text variant="mono" size="tiny" weight="font-bold" color="dim" uppercase className="tracking-widest border-b border-line" paddingBottom={2}>
            Where to Buy
          </Text>
          <Grid cols={1} gap={3}>
            {effectiveShopUrl && (
              <Box
                as="a"
                href={effectiveShopUrl}
                target="_blank"
                rel="sponsored noopener noreferrer"
                display="flex"
                align="center"
                justify="between"
                padding={4}
                surface="default"
                border
                className="hover:border-accent group transition-all bg-accent/5"
              >
                <Text variant="mono" size="xs" weight="font-bold">
                  {provider === 'printful' || effectiveShopUrl.includes('printful') ? 'Buy on Printful' : 'Buy Now'}
                </Text>
                <ExternalLink className="w-4 h-4 text-accent opacity-medium group-hover:opacity-full" />
              </Box>
            )}
            {affiliateLinks.map(link => (
              <Box
                key={link.id}
                as="a"
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                display="flex"
                align="center"
                justify="between"
                padding={4}
                surface="default"
                border
                className="hover:border-accent group transition-all"
              >
                <Text variant="mono" size="xs" weight="font-bold">{link.name || link.label || link.url}</Text>
                <ExternalLink className="w-4 h-4 text-accent opacity-medium group-hover:opacity-full" />
              </Box>
            ))}
            {affiliateLink && (
              <Box
                as="a"
                href={affiliateLink}
                target="_blank"
                rel="noopener noreferrer"
                display="flex"
                align="center"
                justify="between"
                padding={4}
                surface="default"
                border
                className="hover:border-accent group transition-all"
              >
                <Text variant="mono" size="xs" weight="font-bold">Buy on Amazon</Text>
                <ExternalLink className="w-4 h-4 text-accent opacity-medium group-hover:opacity-full" />
              </Box>
            )}
          </Grid>
          <Text variant="mono" size="micro" color="dim" emphasis="low" className="leading-tight not-italic">
            {DISCLOSURE_TEXT}
          </Text>
        </Stack>
      )}
    </Stack>
  );
}
