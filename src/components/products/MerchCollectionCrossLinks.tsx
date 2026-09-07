import { Link } from 'react-router-dom';
import { Box, Grid, Stack, Text } from '@/layouts/Primitives';
import { MERCH_PRODUCTS, COLLECTIONS, type MerchProduct } from '@/data/merch';
import { ASSET_PREFIX } from '@/config/constants';
import { ArrowRight, ShoppingBag } from 'lucide-react';

interface MerchCollectionCrossLinksProps {
  currentProductId?: string;
  currentGearSlug?: string;
  collections?: string[];
  tags?: string[];
}

function resolveImageSrc(src: string) {
  if (!src) return `${ASSET_PREFIX}/icon.svg`;
  if (src.startsWith('http')) return src;
  if (src.startsWith('/')) return `${ASSET_PREFIX}${src}`;
  return `${ASSET_PREFIX}/${src}`;
}

export function MerchCollectionCrossLinks({
  currentProductId,
  currentGearSlug,
  collections = [],
  tags = [],
}: MerchCollectionCrossLinksProps) {
  // Find related products matching collections or tags, excluding current product
  const relatedProducts = MERCH_PRODUCTS.filter((product) => {
    if (currentProductId && product.id === currentProductId) return false;
    if (currentGearSlug && product.gearSlug === currentGearSlug) return false;

    const matchesCollection = collections.some((c) => product.collections.includes(c));
    const matchesTag = tags.some((t) => product.tags.some((pt) => pt.toLowerCase() === t.toLowerCase()));

    return matchesCollection || matchesTag;
  });

  // Fallback to top merch if not enough related items
  const displayProducts: MerchProduct[] = (() => {
    if (relatedProducts.length >= 3) return relatedProducts.slice(0, 3);
    const fallbacks = MERCH_PRODUCTS.filter(
      (p) => p.id !== currentProductId && p.gearSlug !== currentGearSlug && !relatedProducts.includes(p)
    );
    return [...relatedProducts, ...fallbacks].slice(0, 3);
  })();

  if (displayProducts.length === 0) return null;

  // Determine collection name for section title
  const primaryCollectionId = collections[0];
  const collectionMeta = COLLECTIONS.find((c) => c.id === primaryCollectionId);
  const collectionTitle = collectionMeta ? `${collectionMeta.label} Collection` : 'Related Apparel & Merch';

  return (
    <Stack gap={6} width="full" className="border-t border-line/30 paddingTop={10} marginTop={10}">
      <Stack direction={{ base: 'col', sm: 'row' }} justify="between" align={{ base: 'start', sm: 'center' }} gap={2}>
        <Stack gap={1}>
          <Text variant="mono" size="xs" weight="font-bold" color="accent" uppercase tracking="wider">
            Complete the Look
          </Text>
          <Text variant="headline" size="2xl" color="main" weight="font-bold">
            More from the {collectionTitle}
          </Text>
        </Stack>

        <Box
          as={Link}
          to="/merch"
          display="inline-flex"
          align="center"
          gap={1.5}
          className="text-accent hover:text-accent-sky font-mono text-xs font-bold transition-colors group min-h-11"
        >
          <span>View Full Catalog</span>
          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
        </Box>
      </Stack>

      <Grid cols={{ base: 1, sm: 2, md: 3 }} gap={4}>
        {displayProducts.map((item) => {
          const itemImg = item.images?.[0]?.src || item.imageUrl;
          return (
            <Box
              key={item.id}
              as={Link}
              to={`/gear/${item.gearSlug}`}
              state={{ from: 'merch' }}
              surface="default"
              border
              radius="lg"
              overflow="hidden"
              display="flex"
              direction="col"
              justify="between"
              padding={4}
              className="border-line/20 hover:border-accent/50 bg-surface/30 hover:bg-surface/70 transition-all group shadow-xs hover:shadow-md"
            >
              <Stack gap={3}>
                <Box
                  position="relative"
                  width="full"
                  aspect="square"
                  radius="md"
                  overflow="hidden"
                  className="bg-surface-alt/40 border border-line/15"
                >
                  <Box
                    as="img"
                    src={resolveImageSrc(itemImg)}
                    alt={item.title}
                    width="full"
                    height="full"
                    padding={3}
                    loading="lazy"
                    decoding="async"
                    onError={(e) => {
                      e.currentTarget.src = `${ASSET_PREFIX}/icon.svg`;
                    }}
                    className="object-contain object-center transition-transform duration-300 group-hover:scale-105"
                  />
                  {item.roles && item.roles.length > 0 && (
                    <Box position="absolute" className="top-2 left-2 flex gap-1">
                      {item.roles.map((r) => (
                        <Box
                          key={r}
                          paddingX={2}
                          paddingY={0.5}
                          radius="full"
                          className="bg-bg/80 backdrop-blur-xs border border-accent/30 text-accent font-mono text-[10px] font-bold uppercase"
                        >
                          {r}
                        </Box>
                      ))}
                    </Box>
                  )}
                </Box>

                <Stack gap={1}>
                  <Text
                    variant="body"
                    size="xs"
                    weight="font-bold"
                    color="main"
                    className="line-clamp-2 group-hover:text-accent transition-colors"
                  >
                    {item.title}
                  </Text>
                  <Text variant="mono" size="micro" color="dim" className="line-clamp-1">
                    {item.color}
                  </Text>
                </Stack>
              </Stack>

              <Stack direction="row" justify="between" align="center" marginTop={4} className="pt-2 border-t border-line/15">
                <Text variant="mono" size="sm" weight="font-bold" color="main">
                  ${item.price}
                </Text>
                <Box
                  display="inline-flex"
                  align="center"
                  gap={1}
                  className="text-accent font-mono text-xs font-bold group-hover:underline"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>View Item</span>
                </Box>
              </Stack>
            </Box>
          );
        })}
      </Grid>
    </Stack>
  );
}
