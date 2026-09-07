import { useMemo } from 'react';
import { ShoppingBag, ExternalLink, ArrowLeft, CheckCircle2, Palette, Ruler } from 'lucide-react';
import { Resource, readingTime } from '@/lib/content';
import { EditorialLayout } from '@/components/editorial/EditorialLayout';
import { EditorialHeader } from '@/components/editorial/EditorialHeader';
import { EditorialHero } from '@/components/editorial/EditorialHero';
import { MarkdownRenderer } from '@/components/ui/MarkdownRenderer';
import { ResourceSidebar } from './sidebar/ResourceSidebar';
import { VerdictCallout } from '@/components/layout/DetailElements';
import { Stack, Text, Box, Grid } from '@/layouts/Primitives';
import { MERCH_PRODUCTS, COLLECTIONS } from '@/data/merch';
import { MerchImageGallery, type MerchGalleryImage } from '@/components/products/MerchImageGallery';
import { MerchCollectionCrossLinks } from '@/components/products/MerchCollectionCrossLinks';

interface GearPostDetailProps {
  post: Resource;
  onBack: () => void;
  backLabel: string;
  isMerch?: boolean;
}

export function GearPostDetail({ post, onBack, backLabel, isMerch: forcedIsMerch }: GearPostDetailProps) {
  const matchedMerch = useMemo(() => {
    return MERCH_PRODUCTS.find(
      (p) =>
        (post.slug && (p.gearSlug === post.slug || p.id === post.slug)) ||
        (post.shopUrl && p.printfulUrl === post.shopUrl)
    );
  }, [post]);

  const isMerchItem = useMemo(() => {
    if (typeof forcedIsMerch === 'boolean') return forcedIsMerch;
    if (matchedMerch) return true;
    return (
      post.provider === 'printful' ||
      post.tags?.includes('merch') ||
      post.category?.toLowerCase() === 'fashion' ||
      post.category?.toLowerCase() === 'apparel' ||
      post.category?.toLowerCase() === 'accessories'
    );
  }, [forcedIsMerch, matchedMerch, post]);

  const rt = `${readingTime(post.content)} min read`;

  // Render dedicated E-Commerce layout for Merch & Apparel items
  if (isMerchItem) {
    const priceDisplay = matchedMerch?.price
      ? `$${matchedMerch.price}`
      : (post as unknown as { price?: string }).price
      ? `$${(post as unknown as { price?: string }).price}`
      : '$24.00';

    const effectiveShopUrl = matchedMerch?.printfulUrl || post.shopUrl;

    const galleryImages: MerchGalleryImage[] = matchedMerch?.images
      ? matchedMerch.images.map((img) => ({
          src: img.src,
          side: img.side,
          alt: img.alt,
        }))
      : [
          ...(post.image ? [{ src: post.image, side: 'front', alt: `${post.title} - Front View` }] : []),
          ...(post.imageBack ? [{ src: post.imageBack, side: 'back', alt: `${post.title} - Back View` }] : []),
        ];

    const primaryCollectionId = matchedMerch?.collections?.[0];
    const collectionMeta = COLLECTIONS.find((c) => c.id === primaryCollectionId);

    return (
      <Box
        width="full"
        margin="auto"
        paddingX={{ base: 4, sm: 6, lg: 8 }}
        paddingY={{ base: 6, sm: 10 }}
        className="max-w-7xl"
      >
        <Stack gap={8} width="full">
          {/* Top Breadcrumb Navigation */}
          <Box>
            <Box
              as="button"
              type="button"
              onClick={onBack}
              display="inline-flex"
              align="center"
              gap={2}
              paddingX={3}
              paddingY={2}
              radius="md"
              className="min-h-11 cursor-pointer bg-surface/50 hover:bg-surface border border-line/20 hover:border-accent/40 text-text-dim hover:text-text-main transition-all font-mono text-xs font-bold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              aria-label={backLabel}
            >
              <ArrowLeft className="w-4 h-4 text-accent" />
              <span>{backLabel}</span>
            </Box>
          </Box>

          {/* Main 2-Column Product Detail Layout */}
          <Grid cols={{ base: 1, lg: 12 }} gap={{ base: 8, lg: 10 }} align="start">
            {/* Left Column: Interactive Visual Viewer */}
            <Box span={{ base: 1, lg: 7 }}>
              <MerchImageGallery
                title={post.title}
                images={galleryImages}
                fallbackImage={post.image}
                fallbackImageBack={post.imageBack}
              />
            </Box>

            {/* Right Column: Title, Metadata, CTA, Order Guarantees & Overview */}
            <Box span={{ base: 1, lg: 5 }}>
              <Stack gap={6} className="lg:sticky lg:top-24">
                {/* Header Category & Tags */}
                <Stack gap={2}>
                  <Stack direction="row" align="center" gap={2} wrap>
                    {collectionMeta && (
                      <Box
                        paddingX={2.5}
                        paddingY={1}
                        radius="full"
                        className="bg-accent/15 border border-accent/30 text-accent font-mono text-xs font-bold"
                      >
                        {collectionMeta.label}
                      </Box>
                    )}
                    {matchedMerch?.roles && matchedMerch.roles.length > 0 && (
                      <Stack direction="row" gap={1.5}>
                        {matchedMerch.roles.map((r) => (
                          <Box
                            key={r}
                            paddingX={2.5}
                            paddingY={1}
                            radius="full"
                            className="bg-accent/15 border border-accent/40 text-accent font-mono text-xs font-bold uppercase"
                          >
                            {r}
                          </Box>
                        ))}
                      </Stack>
                    )}
                    <Text variant="mono" size="xs" color="dim" uppercase tracking="wider">
                      {post.category || 'Official Merch'}
                    </Text>
                  </Stack>

                  <Text as="h1" variant="headline" size="3xl" weight="font-bold" color="main" leading="tight">
                    {post.title}
                  </Text>
                </Stack>

                {/* Price Display & Fulfillment Tag */}
                <Stack direction="row" align="baseline" justify="between" paddingY={3} className="border-y border-line/20">
                  <Stack direction="row" align="baseline" gap={2}>
                    <Text variant="display" size="3xl" weight="font-black" color="main">
                      {priceDisplay}
                    </Text>
                    <Text variant="mono" size="xs" color="dim">
                      USD
                    </Text>
                  </Stack>

                  <Box
                    paddingX={2.5}
                    paddingY={1}
                    radius="md"
                    className="bg-surface-alt/60 border border-line/20"
                  >
                    <Text variant="mono" size="micro" color="dim" weight="font-medium">
                      Direct Printful Fulfillment
                    </Text>
                  </Box>
                </Stack>

                {/* Short Excerpt Summary */}
                <Text variant="body" size="base" color="dim" leading="relaxed">
                  {matchedMerch?.description || post.excerpt}
                </Text>

                {/* Quick Attributes (Colors & Sizes) */}
                <Box padding={4} radius="lg" className="bg-surface/40 border border-line/20">
                  <Stack gap={3}>
                    {matchedMerch?.color && (
                      <Stack gap={1.5}>
                        <Stack direction="row" align="center" gap={1.5}>
                          <Palette className="w-3.5 h-3.5 text-accent" />
                          <Text variant="mono" size="xs" color="dim" weight="font-bold">
                            Colorways
                          </Text>
                        </Stack>
                        <Stack direction="row" wrap gap={1.5}>
                          {matchedMerch.color.split('/').map((c) => (
                            <Box
                              key={c}
                              paddingX={2.5}
                              paddingY={1}
                              surface="alt"
                              border
                              radius="full"
                              className="border-line/20"
                            >
                              <Text variant="mono" size="micro" weight="font-medium" color="main">
                                {c.trim()}
                              </Text>
                            </Box>
                          ))}
                        </Stack>
                      </Stack>
                    )}

                    {matchedMerch?.size && (
                      <Stack gap={1.5}>
                        <Stack direction="row" align="center" gap={1.5}>
                          <Ruler className="w-3.5 h-3.5 text-accent" />
                          <Text variant="mono" size="xs" color="dim" weight="font-bold">
                            Available Sizes
                          </Text>
                        </Stack>
                        <Stack direction="row" wrap gap={1.5}>
                          {matchedMerch.size.split('/').map((s) => (
                            <Box
                              key={s}
                              paddingX={2.5}
                              paddingY={1}
                              surface="alt"
                              border
                              radius="sm"
                              className="border-line/20"
                            >
                              <Text variant="mono" size="micro" weight="font-bold" color="main">
                                {s.trim()}
                              </Text>
                            </Box>
                          ))}
                        </Stack>
                      </Stack>
                    )}
                  </Stack>
                </Box>

                {/* Primary Direct Checkout CTA Button */}
                {effectiveShopUrl && (
                  <Stack gap={2}>
                    <Box
                      as="a"
                      href={effectiveShopUrl}
                      target="_blank"
                      rel="sponsored noopener noreferrer"
                      display="flex"
                      align="center"
                      justify="center"
                      paddingY={3.5}
                      paddingX={6}
                      gap={2.5}
                      radius="md"
                      className="min-h-12 bg-accent text-bg hover:bg-accent-sky transition-all font-mono font-black text-sm text-center shadow-md hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                    >
                      <ShoppingBag className="w-4 h-4 text-bg" />
                      <span>Order on Printful Store</span>
                      <ExternalLink className="w-4 h-4 text-bg opacity-80" />
                    </Box>

                    <Stack direction="row" align="center" gap={1.5} justify="center">
                      <CheckCircle2 className="w-3.5 h-3.5 text-accent" />
                      <Text variant="mono" size="micro" color="dim">
                        Custom printed on-demand • Global tracked delivery
                      </Text>
                    </Stack>
                  </Stack>
                )}

                {/* Markdown Content Overview */}
                <Stack gap={4} paddingTop={6} className="border-t border-line/20">
                  <Text variant="mono" size="xs" weight="font-bold" color="accent" uppercase tracking="wider">
                    Design & Overview
                  </Text>

                  <Box className="prose-editorial">
                    {post.verdict && <VerdictCallout verdict={post.verdict} />}
                    <MarkdownRenderer content={post.content} />
                  </Box>
                </Stack>
              </Stack>
            </Box>
          </Grid>

          {/* Bottom Related Collection Cross-Links Section */}
          <MerchCollectionCrossLinks
            currentProductId={matchedMerch?.id}
            currentGearSlug={post.slug}
            collections={matchedMerch?.collections || [primaryCollectionId].filter((x): x is string => !!x)}
            tags={post.tags}
          />
        </Stack>
      </Box>
    );
  }

  // Standard Editorial Layout for non-merch gear & articles
  return (
    <EditorialLayout
      onBack={onBack}
      backLabel={backLabel}
      header={
        <EditorialHeader
          category={post.category}
          date={post.date}
          readTime={rt}
          title={post.title}
          dek={post.excerpt}
          author={post.author}
          authorAvatarSrc={post.authorImage}
          tags={post.tags}
          hero={
            post.image ? (
              <Stack gap={4}>
                {post.imageBack ? (
                  <Stack direction={{ base: 'col', md: 'row' }} gap={{ base: 4, md: 3 }} width="full">
                    <Stack gap={2} flex={1} width="full">
                      <Text variant="mono" size="xs" weight="font-bold" color="dim">Front View</Text>
                      <EditorialHero src={post.image} alt={`${post.title} - front`} />
                    </Stack>
                    <Stack gap={2} flex={1} width="full">
                      <Text variant="mono" size="xs" weight="font-bold" color="dim">Back View</Text>
                      <EditorialHero src={post.imageBack} alt={`${post.title} - back`} />
                    </Stack>
                  </Stack>
                ) : (
                  <EditorialHero src={post.image} alt={post.title} />
                )}
                {post.image?.includes('/sketches/') && (
                  <Text variant="mono" size="xs" color="dim" className="italic">
                    Illustration
                  </Text>
                )}
              </Stack>
            ) : undefined
          }
        />
      }
      sidebar={
        <ResourceSidebar
          slug={post.slug}
          affiliateIds={post.affiliateIds}
          shopUrl={post.shopUrl}
          provider={post.provider}
          specs={post.specs}
        />
      }
    >
      <Box className="prose-editorial">
        {post.verdict && <VerdictCallout verdict={post.verdict} />}
        <MarkdownRenderer content={post.content} />
      </Box>
    </EditorialLayout>
  );
}
